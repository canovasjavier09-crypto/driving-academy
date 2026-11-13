/** Motor del módulo teórico: generación de exámenes, corrección y registro. Sin UI. */
import type { Question } from '../data/types';
import type { Profile, TheoryExamRecord } from '../../core/progress/profile';
import type { TheoryCategoryId } from '../../core/progress/curriculum';
import { review } from '../../core/srs/leitner';

/** Formato habitual del examen teórico del permiso B. */
export const EXAM_RULES = { count: 30, timeSec: 30 * 60, maxErrors: 3 } as const;

export type Rand = () => number;

/** Generador pseudoaleatorio reproducible (mulberry32). */
export function seeded(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: readonly T[], rand: Rand = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/** Orden en que se muestran las 3 opciones (índices originales). */
export function optionOrder(rand: Rand = Math.random): number[] {
  return shuffle([0, 1, 2], rand);
}

/**
 * Selecciona `count` preguntas sin repetir.
 * - `balanced`: reparte por categorías en turnos (como un examen real, que toca todos los temas).
 * - sin `balanced`: totalmente aleatorio.
 */
export function pickQuestions(pool: readonly Question[], count: number, rand: Rand = Math.random, balanced = true): Question[] {
  if (!balanced) return shuffle(pool, rand).slice(0, count);
  const byCat = new Map<TheoryCategoryId, Question[]>();
  for (const q of shuffle(pool, rand)) {
    const list = byCat.get(q.category) ?? [];
    list.push(q);
    byCat.set(q.category, list);
  }
  const cats = shuffle([...byCat.keys()], rand);
  const out: Question[] = [];
  while (out.length < count) {
    let added = false;
    for (const c of cats) {
      const next = byCat.get(c)!.pop();
      if (next) {
        out.push(next);
        added = true;
        if (out.length === count) break;
      }
    }
    if (!added) break; // banco agotado
  }
  return shuffle(out, rand);
}

export interface TestSession {
  ids: string[];
  /** order[i] = orden de visualización de las opciones de la pregunta i. */
  order: number[][];
  /** Respuesta elegida (índice ORIGINAL de la opción) o null. */
  answers: (number | null)[];
  /** Tiempo acumulado en cada pregunta (ms). */
  timeMs: number[];
  startedAt: number;
  limitSec: number | null;
}

export function createSession(questions: Question[], limitSec: number | null, rand: Rand = Math.random, now = Date.now()): TestSession {
  return {
    ids: questions.map((q) => q.id),
    order: questions.map(() => optionOrder(rand)),
    answers: questions.map(() => null),
    timeMs: questions.map(() => 0),
    startedAt: now,
    limitSec,
  };
}

export function remainingSec(s: TestSession, now = Date.now()): number | null {
  if (s.limitSec == null) return null;
  return Math.max(0, s.limitSec - Math.floor((now - s.startedAt) / 1000));
}

export interface GradeResult {
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  /** Fallos a efectos de aprobado: incorrectas + sin responder. */
  errors: number;
  passed: boolean;
  perQuestion: { id: string; chosen: number | null; correct: boolean }[];
}

export function grade(s: TestSession, getQ: (id: string) => Question | undefined, maxErrors: number = EXAM_RULES.maxErrors): GradeResult {
  const perQuestion = s.ids.map((id, i) => {
    const chosen = s.answers[i] ?? null;
    const q = getQ(id);
    return { id, chosen, correct: !!q && chosen === q.correct };
  });
  const correct = perQuestion.filter((p) => p.correct).length;
  const unanswered = perQuestion.filter((p) => p.chosen === null).length;
  const wrong = perQuestion.length - correct - unanswered;
  const errors = wrong + unanswered;
  return { total: s.ids.length, correct, wrong, unanswered, errors, passed: errors <= maxErrors, perQuestion };
}

/** Registra respuestas en el perfil: estadísticas globales y repetición espaciada. Puro. */
export function recordAnswers(p: Profile, items: { id: string; correct: boolean; timeMs: number }[], now = Date.now()): Profile {
  const questions = { ...p.theory.questions };
  let correct = 0;
  let time = 0;
  for (const it of items) {
    questions[it.id] = review(questions[it.id], it.correct, now);
    if (it.correct) correct++;
    time += Math.max(0, Math.min(it.timeMs, 5 * 60_000)); // descarta tiempos absurdos (pestaña en segundo plano)
  }
  return {
    ...p,
    theory: {
      ...p.theory,
      questions,
      answered: p.theory.answered + items.length,
      correct: p.theory.correct + correct,
      answerTimeMs: p.theory.answerTimeMs + time,
    },
  };
}

export function recordExam(p: Profile, rec: Omit<TheoryExamRecord, 'id'>): Profile {
  const id = `${rec.date}-${Math.random().toString(36).slice(2, 7)}`;
  return { ...p, theory: { ...p.theory, exams: [...p.theory.exams, { ...rec, id }].slice(-200) } };
}

/** XP otorgada (constantes centralizadas para equilibrar). */
export const XP = { correctAnswer: 2, examPassed: 60, examFailed: 15, perfectExam: 40 } as const;
