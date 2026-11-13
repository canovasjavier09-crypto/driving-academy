import { describe, expect, it } from 'vitest';
import { QUESTIONS, getQuestion } from '../data';
import { SIGN_IDS } from '../data/signIds';
import { THEORY_CATEGORIES } from '../../core/progress/curriculum';
import { createDefaultProfile } from '../../core/progress/profile';
import { EXAM_RULES, createSession, grade, pickQuestions, recordAnswers, remainingSec, seeded } from './engine';

describe('banco de preguntas', () => {
  it('ids únicos', () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });
  it('cada pregunta está completa y bien formada', () => {
    for (const q of QUESTIONS) {
      expect(q.text.length, q.id).toBeGreaterThan(10);
      expect(q.options).toHaveLength(3);
      expect(new Set(q.options.map((o) => o.trim().toLowerCase())).size, `${q.id} opciones repetidas`).toBe(3);
      for (const o of q.options) expect(o.trim().length, q.id).toBeGreaterThan(0);
      expect(q.explanation.length, q.id).toBeGreaterThan(30);
      expect([0, 1, 2]).toContain(q.correct);
      if (q.source === 'normativa') expect(q.reference, q.id).toBeTruthy();
      if (q.image) expect(SIGN_IDS as readonly string[], `${q.id} imagen ${q.image}`).toContain(q.image);
    }
  });
  it('todas las categorías tienen al menos 9 preguntas', () => {
    for (const c of THEORY_CATEGORIES) {
      expect(QUESTIONS.filter((q) => q.category === c.id).length, c.id).toBeGreaterThanOrEqual(9);
    }
  });
  it('hay suficientes preguntas para varios exámenes distintos', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(EXAM_RULES.count * 5);
  });
  it('las preguntas que muestran señal mencionan la imagen o la señal en el enunciado', () => {
    for (const q of QUESTIONS.filter((x) => x.image && !x.image.startsWith('marca') && !x.image.startsWith('semaforo'))) {
      if (/esta señal/i.test(q.text)) expect(q.image).toBeTruthy();
    }
    // y al revés: «esta señal» nunca sin imagen
    for (const q of QUESTIONS) if (/esta señal/i.test(q.text)) expect(q.image, q.id).toBeTruthy();
  });
});

describe('generación de exámenes', () => {
  it('30 preguntas distintas y equilibradas por tema', () => {
    const exam = pickQuestions(QUESTIONS, 30, seeded(1));
    expect(exam).toHaveLength(30);
    expect(new Set(exam.map((q) => q.id)).size).toBe(30);
    const cats = new Set(exam.map((q) => q.category));
    expect(cats.size).toBe(THEORY_CATEGORIES.length);
  });
  it('es reproducible con la misma semilla y distinto con otra', () => {
    const a = pickQuestions(QUESTIONS, 30, seeded(7)).map((q) => q.id);
    const b = pickQuestions(QUESTIONS, 30, seeded(7)).map((q) => q.id);
    const c = pickQuestions(QUESTIONS, 30, seeded(8)).map((q) => q.id);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });
  it('no falla si el banco es más pequeño que lo pedido', () => {
    expect(pickQuestions(QUESTIONS.slice(0, 5), 30, seeded(1))).toHaveLength(5);
  });
  it('baraja el orden de las opciones (la correcta no siempre es la primera)', () => {
    const s = createSession(QUESTIONS.slice(0, 60), null, seeded(3));
    const firstShown = s.order.map((o) => o[0]);
    expect(new Set(firstShown).size).toBe(3);
  });
});

describe('corrección', () => {
  const qs = QUESTIONS.slice(0, 30);
  it('aprueba con 3 fallos y suspende con 4 (sin responder cuenta como fallo)', () => {
    const s = createSession(qs, EXAM_RULES.timeSec, seeded(1));
    s.answers = qs.map((q) => q.correct);
    s.answers[0] = (qs[0]!.correct + 1) % 3;
    s.answers[1] = (qs[1]!.correct + 1) % 3;
    s.answers[2] = null;
    let r = grade(s, getQuestion);
    expect(r.errors).toBe(3);
    expect(r.unanswered).toBe(1);
    expect(r.passed).toBe(true);
    s.answers[3] = null;
    r = grade(s, getQuestion);
    expect(r.errors).toBe(4);
    expect(r.passed).toBe(false);
  });
  it('temporizador', () => {
    const s = createSession(qs, 1800, seeded(1), 0);
    expect(remainingSec(s, 60_000)).toBe(1740);
    expect(remainingSec(s, 99_999_999)).toBe(0);
  });
});

describe('registro en el perfil', () => {
  it('actualiza totales y repetición espaciada', () => {
    const p = recordAnswers(createDefaultProfile(), [
      { id: 'SEN-01', correct: true, timeMs: 4000 },
      { id: 'SEN-02', correct: false, timeMs: 10 * 60_000 },
    ]);
    expect(p.theory.answered).toBe(2);
    expect(p.theory.correct).toBe(1);
    expect(p.theory.answerTimeMs).toBe(4000 + 5 * 60_000);
    expect(p.theory.questions['SEN-02']?.box).toBe(0);
    expect(p.theory.questions['SEN-01']?.box).toBe(1);
  });
});
