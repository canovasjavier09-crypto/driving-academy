/**
 * Repetición espaciada (sistema Leitner).
 * Acierto: sube una caja. Fallo: vuelve a la caja 0 y se repite pronto.
 */
import type { QuestionState } from '../progress/profile';

const DAY = 86_400_000;
/** Intervalo hasta la próxima revisión por caja. */
export const BOX_INTERVALS_MS = [10 * 60_000, 1 * DAY, 3 * DAY, 7 * DAY, 14 * DAY, 30 * DAY];
export const MAX_BOX = BOX_INTERVALS_MS.length - 1;

export function emptyState(): QuestionState {
  return { seen: 0, correct: 0, wrong: 0, box: 0, due: 0, lastAt: 0 };
}

export function review(prev: QuestionState | undefined, correct: boolean, now = Date.now()): QuestionState {
  const s = prev ? { ...prev } : emptyState();
  s.seen++;
  s.lastAt = now;
  if (correct) {
    s.correct++;
    s.box = Math.min(MAX_BOX, s.box + 1);
  } else {
    s.wrong++;
    s.box = 0;
  }
  s.due = now + (BOX_INTERVALS_MS[s.box] ?? DAY);
  return s;
}

/** Una pregunta está "fallada" si su último resultado la dejó en la caja 0 tras algún error. */
export function isFailed(s: QuestionState | undefined): boolean {
  return !!s && s.wrong > 0 && s.box === 0;
}

export function isDue(s: QuestionState | undefined, now = Date.now()): boolean {
  return !!s && s.seen > 0 && s.due <= now;
}

/**
 * Ordena ids priorizando: falladas vencidas > vencidas > nunca vistas > el resto.
 * Dentro de cada grupo, se usa `rand` para barajar (inyectable para tests).
 */
export function prioritize(ids: string[], states: Record<string, QuestionState>, now = Date.now(), rand = Math.random): string[] {
  const score = (id: string) => {
    const s = states[id];
    if (!s || s.seen === 0) return 2;
    if (isDue(s, now)) return isFailed(s) ? 0 : 1;
    return 3 + s.box;
  };
  return ids
    .map((id) => ({ id, k: score(id), r: rand() }))
    .sort((a, b) => a.k - b.k || a.r - b.r)
    .map((x) => x.id);
}
