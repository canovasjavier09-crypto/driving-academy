import { describe, expect, it } from 'vitest';
import { EXAM_POOL, QUESTIONS } from './index';
import { EXAM_RULES, pickQuestions, seeded } from '../engine/engine';

describe('banco del examen teórico', () => {
  it('todas las preguntas del examen citan su norma', () => {
    expect(EXAM_POOL.length).toBeGreaterThanOrEqual(EXAM_RULES.count * 4);
    for (const q of EXAM_POOL) expect(q.reference, q.id).toBeTruthy();
  });

  it('las marcas de duda empiezan por VERIFICAR y nunca hay ids repetidos', () => {
    for (const q of QUESTIONS) if (q.verify) expect(q.verify.startsWith('VERIFICAR'), q.id).toBe(true);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });

  it('cada pregunta tiene 3 opciones distintas y una sola correcta', () => {
    for (const q of QUESTIONS) {
      expect(new Set(q.options).size, q.id).toBe(3);
      expect([0, 1, 2]).toContain(q.correct);
    }
  });

  it('un examen tiene 30 preguntas distintas de varios temas', () => {
    const qs = pickQuestions(EXAM_POOL, EXAM_RULES.count, seeded(7));
    expect(qs).toHaveLength(30);
    expect(new Set(qs.map((q) => q.id)).size).toBe(30);
    expect(new Set(qs.map((q) => q.category)).size).toBeGreaterThanOrEqual(10);
  });
});
