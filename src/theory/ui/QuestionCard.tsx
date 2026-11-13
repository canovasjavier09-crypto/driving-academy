import { useEffect } from 'react';
import type { Question } from '../data/types';
import { THEORY_CATEGORIES } from '../../core/progress/curriculum';
import { Sign } from './Sign';

const LETTERS = ['A', 'B', 'C'];

export function SourceBadge({ q }: { q: Question }) {
  return q.source === 'normativa' ? (
    <span className="badge blue" title="Contenido basado en la norma citada. Redacción original.">Normativa · {q.reference}</span>
  ) : (
    <span className="badge" title="Contenido formativo creado para Driving Academy.">Didáctico</span>
  );
}

export function Explanation({ q, chosen }: { q: Question; chosen: number | null }) {
  const ok = chosen === q.correct;
  return (
    <div className={`explain ${chosen === null ? '' : ok ? 'ok' : 'bad'}`}>
      <div className="card-row" style={{ flexWrap: 'wrap', gap: 8 }}>
        <strong>{chosen === null ? 'Sin responder' : ok ? '✓ Correcto' : '✗ Incorrecto'}</strong>
        <SourceBadge q={q} />
      </div>
      {!ok && chosen !== null && <p style={{ marginTop: 8 }}>Tu respuesta: <strong>{q.options[chosen as 0 | 1 | 2]}</strong></p>}
      {!ok && <p style={{ marginTop: 8 }}>Respuesta correcta: <strong>{q.options[q.correct]}</strong></p>}
      <p className="muted" style={{ marginTop: 8 }}>{q.explanation}</p>
      {q.verify && (
        <p className="dim" style={{ marginTop: 8 }}>
          <span className="badge warn" title="Dato o artículo pendiente de comprobar en el texto oficial">VERIFICAR</span> {q.verify.replace(/^VERIFICAR:?\s*/, '')}
        </p>
      )}
    </div>
  );
}

interface Props {
  q: Question;
  order: number[];
  chosen: number | null;
  /** true: muestra solución y explicación (modo aprendizaje o revisión). */
  reveal: boolean;
  onChoose?: (originalIndex: number) => void;
  index?: number;
  total?: number;
  /** Atajos 1/2/3 y A/B/C. */
  keyboard?: boolean;
}

export function QuestionCard({ q, order, chosen, reveal, onChoose, index, total, keyboard = true }: Props) {
  const cat = THEORY_CATEGORIES.find((c) => c.id === q.category);
  const locked = reveal || !onChoose;

  useEffect(() => {
    if (!keyboard || locked) return;
    const h = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      const k = e.key.toLowerCase();
      const pos = ['1', '2', '3'].indexOf(k) >= 0 ? ['1', '2', '3'].indexOf(k) : ['a', 'b', 'c'].indexOf(k);
      if (pos >= 0 && order[pos] !== undefined) {
        e.preventDefault();
        onChoose?.(order[pos]!);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [keyboard, locked, order, onChoose]);

  return (
    <article className="card question" aria-live="polite">
      <div className="card-row dim" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
        <span>{cat?.name}</span>
        {index != null && total != null && <span className="num">Pregunta {index + 1} de {total}</span>}
      </div>
      <div className={`q-body ${q.image ? 'with-image' : ''}`}>
        {q.image && <div className="q-image"><Sign id={q.image} /></div>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 className="q-text">{q.text}</h2>
          <div className="q-options" role="radiogroup" aria-label="Opciones">
            {order.map((orig, pos) => {
              const isChosen = chosen === orig;
              const state = reveal ? (orig === q.correct ? 'correct' : isChosen ? 'wrong' : 'dim') : isChosen ? 'chosen' : '';
              return (
                <button
                  key={orig}
                  type="button"
                  role="radio"
                  aria-checked={isChosen}
                  className={`q-option ${state}`}
                  disabled={locked}
                  onClick={() => onChoose?.(orig)}
                >
                  <span className="q-letter">{LETTERS[pos]}</span>
                  <span>{q.options[orig]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {reveal && <Explanation q={q} chosen={chosen} />}
    </article>
  );
}
