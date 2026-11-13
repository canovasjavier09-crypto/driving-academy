/**
 * Sesión de estudio con corrección inmediata. La usan tres modos:
 * aprendizaje (todo el banco), por temas (una categoría) y errores (solo falladas).
 * El orden lo decide la repetición espaciada (falladas y vencidas primero).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Question } from '../data/types';
import { QUESTIONS, getQuestion } from '../data';
import { prioritize } from '../../core/srs/leitner';
import { profileStore } from '../../core/progress/store';
import { recordAnswers, XP } from '../engine/engine';
import { optionOrder } from '../engine/engine';
import { navigate } from '../../app/router';
import { QuestionCard } from './QuestionCard';

interface Props {
  title: string;
  subtitle: string;
  /** Filtro sobre el banco, evaluado una vez al empezar con el perfil de ese momento. */
  filter: (q: Question) => boolean;
  /** Si es true, al agotarse la cola se vuelve a generar (modo infinito). */
  endless: boolean;
  emptyText: string;
}

function buildQueue(filter: (q: Question) => boolean): string[] {
  const ids = QUESTIONS.filter(filter).map((q) => q.id);
  return prioritize(ids, profileStore.get().theory.questions);
}

export function LearnSession({ title, subtitle, filter, endless, emptyText }: Props) {
  const [queue, setQueue] = useState<string[]>(() => buildQueue(filter));
  const [pos, setPos] = useState(0);
  const [order, setOrder] = useState<number[]>(() => optionOrder());
  const [chosen, setChosen] = useState<number | null>(null);
  const [stats, setStats] = useState({ answered: 0, correct: 0 });
  const [finished, setFinished] = useState(false);
  const shownAt = useRef(Date.now());

  const id = queue[pos];
  const q = id ? getQuestion(id) : undefined;

  const choose = useCallback(
    (orig: number) => {
      if (!q || chosen !== null) return;
      const ok = orig === q.correct;
      setChosen(orig);
      setStats((s) => ({ answered: s.answered + 1, correct: s.correct + (ok ? 1 : 0) }));
      profileStore.update((p) => {
        const next = recordAnswers(p, [{ id: q.id, correct: ok, timeMs: Date.now() - shownAt.current }]);
        return ok ? { ...next, xp: next.xp + XP.correctAnswer } : next;
      });
    },
    [q, chosen],
  );

  const advance = useCallback(
    (repeatCurrent = false) => {
      let nextQueue = queue;
      if (repeatCurrent && id) {
        // Reinsertar 3 posiciones más adelante para volver a verla pronto.
        nextQueue = [...queue];
        nextQueue.splice(Math.min(pos + 4, nextQueue.length), 0, id);
      }
      let nextPos = pos + 1;
      if (nextPos >= nextQueue.length) {
        if (!endless) {
          setFinished(true);
          return;
        }
        nextQueue = buildQueue(filter);
        nextPos = 0;
      }
      setQueue(nextQueue);
      setPos(nextPos);
      setOrder(optionOrder());
      setChosen(null);
      shownAt.current = Date.now();
    },
    [queue, pos, id, endless, filter],
  );

  useEffect(() => {
    if (chosen === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [chosen, advance]);

  const header = (
    <header className="page-head">
      <div>
        <a href="#/teoria" className="dim">← Examen teórico</a>
        <h1 style={{ marginTop: 6 }}>{title}</h1>
        <p className="muted">{subtitle}</p>
      </div>
      <div className="badge num" aria-label="Aciertos en esta sesión">
        {stats.correct}/{stats.answered} aciertos
      </div>
    </header>
  );

  if (queue.length === 0) {
    return (
      <>
        {header}
        <div className="empty">
          <p>{emptyText}</p>
          <button className="btn primary" style={{ marginTop: 16 }} onClick={() => navigate('/teoria')}>Volver</button>
        </div>
      </>
    );
  }

  if (finished || !q) {
    const pct = stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0;
    return (
      <>
        {header}
        <div className="card result-hero pass">
          <div className="big">{pct} %</div>
          <p className="muted">Has respondido {stats.answered} preguntas y acertado {stats.correct}.</p>
          <div className="session-actions" style={{ justifyContent: 'center' }}>
            <button className="btn primary" onClick={() => { setQueue(buildQueue(filter)); setPos(0); setFinished(false); setChosen(null); setStats({ answered: 0, correct: 0 }); shownAt.current = Date.now(); }}>
              Repetir sesión
            </button>
            <button className="btn" onClick={() => navigate('/teoria')}>Volver</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {header}
      <QuestionCard key={`${q.id}-${pos}`} q={q} order={order} chosen={chosen} reveal={chosen !== null} onChoose={choose} index={endless ? undefined : pos} total={endless ? undefined : queue.length} />
      <div className="session-actions">
        <span className="dim kbd-hint" style={{ marginRight: 'auto', alignSelf: 'center' }}>
          <span className="kbd">1</span> <span className="kbd">2</span> <span className="kbd">3</span> responder · <span className="kbd">Enter</span> siguiente
        </span>
        {stats.answered > 0 && (
          <button className="btn" onClick={() => setFinished(true)}>Terminar</button>
        )}
        {chosen !== null && (
          <>
            <button className="btn" onClick={() => advance(true)}>Repetir más tarde</button>
            <button className="btn primary" onClick={() => advance()}>Siguiente →</button>
          </>
        )}
      </div>
    </>
  );
}
