/**
 * Examen (formato permiso B) y simulacro aleatorio.
 * Sin explicaciones durante la prueba; corrección y revisión al final.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EXAM_POOL, QUESTIONS, getQuestion } from '../data';
import { profileStore } from '../../core/progress/store';
import { navigate } from '../../app/router';
import { EXAM_RULES, XP, createSession, grade, pickQuestions, recordAnswers, recordExam, remainingSec, type GradeResult, type TestSession } from '../engine/engine';
import { QuestionCard } from './QuestionCard';

type Mode = 'examen' | 'simulacro';

interface Config {
  count: number;
  limitSec: number | null;
  balanced: boolean;
}

const fmt = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

export function ExamPage({ mode }: { mode: Mode }) {
  const [config, setConfig] = useState<Config | null>(null);
  const [runKey, setRunKey] = useState(0);
  if (!config) return <ExamIntro mode={mode} onStart={setConfig} />;
  return <ExamRun key={runKey} mode={mode} config={config} onRestart={() => setRunKey((k) => k + 1)} onExit={() => setConfig(null)} />;
}

function ExamIntro({ mode, onStart }: { mode: Mode; onStart: (c: Config) => void }) {
  const [count, setCount] = useState(20);
  const [timed, setTimed] = useState(true);
  const isExam = mode === 'examen';
  return (
    <>
      <header className="page-head">
        <div>
          <a href="#/teoria" className="dim">← Examen teórico</a>
          <h1 style={{ marginTop: 6 }}>{isExam ? 'Examen teórico · Permiso B' : 'Simulacro aleatorio'}</h1>
          <p className="muted">{isExam ? 'Formato habitual de la prueba en España.' : 'Preguntas mezcladas al azar de todo el banco.'}</p>
        </div>
      </header>
      <div className="card" style={{ maxWidth: 640 }}>
        {isExam ? (
          <>
          <ul className="muted" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
            <li><strong>30 preguntas</strong> con 3 respuestas posibles, solo una correcta.</li>
            <li><strong>30 minutos</strong>. Al agotarse el tiempo, el examen se corrige automáticamente.</li>
            <li>Apto con un <strong>máximo de 3 fallos</strong>. Las preguntas sin responder cuentan como fallo.</li>
            <li>Puede moverse entre preguntas y cambiar respuestas hasta corregir.</li>
            <li>Las explicaciones se muestran al final, con la norma que respalda cada respuesta.</li>
            <li>Solo entran preguntas que citan su norma (RGC, Ley de Tráfico u otra); las que tienen un dato pendiente de comprobar llevan la marca <strong>VERIFICAR</strong>.</li>
          </ul>
          <p className="dim" style={{ marginTop: 12, fontSize: 13 }}>
            Formato comprobado el 12/11/2026: 30 preguntas con 3 opciones (Revista Tráfico y Seguridad Vial de la DGT, octubre de 2025). Los 30 minutos y el máximo de 3 fallos proceden del suplemento de test de la propia revista y de autoescuelas, no de una norma publicada: <strong>VERIFICAR</strong> en dgt.es. La DGT prevé añadir una pregunta con vídeo de percepción del riesgo y ampliar el tiempo en consecuencia. Las preguntas son de redacción original, no oficiales.
          </p>
          </>
        ) : (
          <div className="stack">
            <div>
              <div className="stat-label" style={{ marginBottom: 8 }}>Número de preguntas</div>
              <div className="choice-row">
                {[10, 20, 30].map((n) => (
                  <button key={n} className={`btn ${count === n ? 'selected' : ''}`} aria-pressed={count === n} onClick={() => setCount(n)}>{n}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="stat-label" style={{ marginBottom: 8 }}>Tiempo</div>
              <div className="choice-row">
                <button className={`btn ${timed ? 'selected' : ''}`} aria-pressed={timed} onClick={() => setTimed(true)}>1 min por pregunta</button>
                <button className={`btn ${!timed ? 'selected' : ''}`} aria-pressed={!timed} onClick={() => setTimed(false)}>Sin límite</button>
              </div>
            </div>
          </div>
        )}
        <div className="session-actions" style={{ justifyContent: 'flex-start' }}>
          <button
            className="btn primary"
            onClick={() =>
              onStart(isExam ? { count: EXAM_RULES.count, limitSec: EXAM_RULES.timeSec, balanced: true } : { count, limitSec: timed ? count * 60 : null, balanced: false })
            }
          >
            Comenzar
          </button>
        </div>
      </div>
    </>
  );
}

function ExamRun({ mode, config, onRestart, onExit }: { mode: Mode; config: Config; onRestart: () => void; onExit: () => void }) {
  const [session, setSession] = useState<TestSession>(() => createSession(pickQuestions(mode === 'examen' ? EXAM_POOL : QUESTIONS, config.count, Math.random, config.balanced), config.limitSec));
  const [cur, setCur] = useState(0);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [now, setNow] = useState(Date.now());
  const enteredAt = useRef(Date.now());

  const maxErrors = mode === 'examen' ? EXAM_RULES.maxErrors : Math.floor(config.count * 0.1);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const finishedRef = useRef(false);

  /** Devuelve la sesión con el tiempo de la pregunta actual acumulado (sin efectos dentro de setState). */
  const withElapsed = useCallback((s: TestSession, idx: number): TestSession => {
    const t = Date.now();
    const elapsed = t - enteredAt.current;
    enteredAt.current = t;
    const timeMs = [...s.timeMs];
    timeMs[idx] = (timeMs[idx] ?? 0) + elapsed;
    return { ...s, timeMs };
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const s = withElapsed(sessionRef.current, cur);
    const r = grade(s, getQuestion, maxErrors);
    const durationSec = Math.round((Date.now() - s.startedAt) / 1000);
    const answered = r.perQuestion
      .map((p, i) => ({ id: p.id, correct: p.correct, timeMs: s.timeMs[i] ?? 0, chosen: p.chosen }))
      .filter((p) => p.chosen !== null);
    profileStore.update((p) => {
      let next = recordAnswers(p, answered);
      next = recordExam(next, { date: new Date().toISOString(), mode, total: r.total, errors: r.errors, passed: r.passed, durationSec });
      const xp = r.correct * XP.correctAnswer + (r.passed ? XP.examPassed : XP.examFailed) + (r.passed && r.errors === 0 && r.total >= 30 ? XP.perfectExam : 0);
      return { ...next, xp: next.xp + xp };
    });
    setSession(s);
    setResult(r);
    setConfirming(false);
    window.scrollTo({ top: 0 });
  }, [cur, withElapsed, maxErrors, mode]);

  // Temporizador: se calcula a partir de la hora de inicio (robusto si la pestaña se suspende).
  useEffect(() => {
    if (result || session.limitSec == null) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [result, session.limitSec]);
  const remaining = remainingSec(session, now);
  useEffect(() => {
    if (!result && remaining === 0) finish();
  }, [remaining, result, finish]);

  // Aviso al salir con el examen en curso.
  useEffect(() => {
    if (result) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [result]);

  const goTo = useCallback(
    (i: number) => {
      if (i < 0 || i >= session.ids.length) return;
      setSession(withElapsed(sessionRef.current, cur));
      setCur(i);
    },
    [cur, withElapsed, session.ids.length],
  );

  useEffect(() => {
    if (result) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(cur + 1);
      if (e.key === 'ArrowLeft') goTo(cur - 1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [cur, goTo, result]);

  const choose = useCallback(
    (orig: number) => setSession((s) => {
      const answers = [...s.answers];
      answers[cur] = orig;
      return { ...s, answers };
    }),
    [cur],
  );

  const unanswered = session.answers.filter((a) => a === null).length;
  const q = getQuestion(session.ids[cur]!);
  const title = mode === 'examen' ? 'Examen teórico' : 'Simulacro aleatorio';

  if (result) return <ExamResult mode={mode} session={session} result={result} maxErr={maxErrors} onRestart={onRestart} onExit={onExit} />;
  if (!q) return null;

  return (
    <>
      <div className="session-bar">
        <div>
          <h1 style={{ fontSize: 22 }}>{title}</h1>
          <p className="dim num">{session.ids.length - unanswered} de {session.ids.length} respondidas</p>
        </div>
        {remaining != null && (
          <div className={`timer ${remaining <= 120 ? 'low' : ''}`} role="timer" aria-label="Tiempo restante">{fmt(remaining)}</div>
        )}
      </div>

      <QuestionCard key={q.id} q={q} order={session.order[cur]!} chosen={session.answers[cur] ?? null} reveal={false} onChoose={choose} index={cur} total={session.ids.length} />

      <div className="session-actions">
        <button className="btn" onClick={() => goTo(cur - 1)} disabled={cur === 0}>← Anterior</button>
        {cur < session.ids.length - 1 ? (
          <button className="btn primary" onClick={() => goTo(cur + 1)}>Siguiente →</button>
        ) : (
          <button className="btn primary" onClick={() => setConfirming(true)}>Corregir</button>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-row">
          <h3>Navegación</h3>
          <button className="btn small" onClick={() => setConfirming(true)}>Terminar y corregir</button>
        </div>
        <div className="qnav" role="navigation" aria-label="Ir a la pregunta">
          {session.ids.map((qid, i) => (
            <button key={qid} className={`${session.answers[i] !== null ? 'answered' : ''} ${i === cur ? 'current' : ''}`} onClick={() => goTo(i)} aria-label={`Pregunta ${i + 1}${session.answers[i] !== null ? ', respondida' : ''}`}>
              {i + 1}
            </button>
          ))}
        </div>
        {confirming && (
          <div className="notice" style={{ marginTop: 16 }} role="alertdialog" aria-label="Confirmar corrección">
            {unanswered > 0 ? `Tienes ${unanswered} pregunta(s) sin responder, que contarán como fallo. ` : ''}¿Corregir el examen ahora?
            <div className="session-actions" style={{ justifyContent: 'flex-start' }}>
              <button className="btn primary" onClick={finish}>Sí, corregir</button>
              <button className="btn" onClick={() => setConfirming(false)}>Seguir respondiendo</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function ExamResult({ mode, session, result, maxErr, onRestart, onExit }: { mode: Mode; session: TestSession; result: GradeResult; maxErr: number; onRestart: () => void; onExit: () => void }) {
  const [onlyErrors, setOnlyErrors] = useState(result.errors > 0);
  const durationSec = useMemo(() => Math.round(session.timeMs.reduce((a, b) => a + b, 0) / 1000), [session]);
  const passed = result.passed;
  const items = session.ids.map((id, i) => ({ i, q: getQuestion(id)!, chosen: session.answers[i] ?? null })).filter((x) => !onlyErrors || x.chosen !== x.q.correct);

  return (
    <>
      <div className={`card result-hero ${passed ? 'pass' : 'fail'}`}>
        <div className="stat-label">{mode === 'examen' ? 'Resultado del examen' : 'Resultado del simulacro'}</div>
        <div className="big">{passed ? 'APTO' : 'NO APTO'}</div>
        <p className="muted num">
          {result.correct} aciertos · {result.wrong} fallos · {result.unanswered} sin responder · {Math.floor(durationSec / 60)} min {durationSec % 60} s
        </p>
        <p className="dim" style={{ marginTop: 6 }}>
          {mode === 'examen' ? `Máximo permitido: ${EXAM_RULES.maxErrors} fallos.` : `Referencia: máximo un 10 % de fallos (${maxErr}).`}
        </p>
        <div className="session-actions" style={{ justifyContent: 'center' }}>
          <button className="btn primary" onClick={onRestart}>Nuevo {mode === 'examen' ? 'examen' : 'simulacro'}</button>
          {result.errors > 0 && <button className="btn" onClick={() => navigate('/teoria/errores')}>Repasar mis errores</button>}
          <button className="btn" onClick={onExit}>Salir</button>
        </div>
      </div>

      <div className="qnav" style={{ marginTop: 16 }}>
        {result.perQuestion.map((p, i) => (
          <button key={p.id} className={p.correct ? 'ok' : 'bad'} onClick={() => { setOnlyErrors(false); requestAnimationFrame(() => document.getElementById(`rev-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })); }} aria-label={`Pregunta ${i + 1}: ${p.correct ? 'acierto' : 'fallo'}`}>
            {i + 1}
          </button>
        ))}
      </div>

      <section className="section">
        <div className="card-row" style={{ marginBottom: 12 }}>
          <h2>Revisión</h2>
          {result.errors > 0 && (
            <div className="choice-row">
              <button className={`btn small ${onlyErrors ? 'selected' : ''}`} onClick={() => setOnlyErrors(true)}>Solo fallos</button>
              <button className={`btn small ${!onlyErrors ? 'selected' : ''}`} onClick={() => setOnlyErrors(false)}>Todas</button>
            </div>
          )}
        </div>
        <div className="stack">
          {items.map(({ i, q, chosen }) => (
            <div key={q.id} id={`rev-${i}`} style={{ scrollMarginTop: 16 }}>
              <QuestionCard q={q} order={session.order[i]!} chosen={chosen} reveal index={i} total={session.ids.length} keyboard={false} />
            </div>
          ))}
          {items.length === 0 && <div className="empty">¡Sin fallos! Pulsa «Todas» para revisar el examen completo.</div>}
        </div>
      </section>
    </>
  );
}
