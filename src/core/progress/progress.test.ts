import { describe, expect, it } from 'vitest';
import { createDefaultProfile, normalizeProfile } from './profile';
import { levelInfo, newlyUnlocked, xpForLevel } from './levels';
import { nextLesson, recommendations } from './recommend';
import { review } from '../srs/leitner';

describe('perfil', () => {
  it('normaliza datos parciales o erróneos', () => {
    const p = normalizeProfile({ name: 'Ana', xp: -5, settings: { quality: 'ultra', volume: 3 } });
    expect(p.name).toBe('Ana');
    expect(p.xp).toBe(0);
    expect(p.settings.quality).toBe('media');
    expect(p.settings.volume).toBe(1);
  });
});

describe('niveles', () => {
  it('la curva de XP es creciente', () => {
    for (let l = 2; l < 8; l++) expect(xpForLevel(l + 1)).toBeGreaterThan(xpForLevel(l));
  });
  it('calcula nivel y progreso', () => {
    expect(levelInfo(0).level).toBe(1);
    const i = levelInfo(xpForLevel(3) + 1);
    expect(i.level).toBe(3);
    expect(i.progress).toBeGreaterThan(0);
  });
  it('desbloquea logros', () => {
    const p = createDefaultProfile();
    p.theory.answered = 1;
    expect(newlyUnlocked(p)).toContain('primera-respuesta');
  });
});

describe('recomendaciones', () => {
  it('perfil nuevo: empezar teoría y primera lección', () => {
    const p = createDefaultProfile();
    const r = recommendations(p, () => undefined);
    expect(r.some((x) => x.route === '/teoria/aprendizaje')).toBe(true);
    expect(nextLesson(p)?.id).toBe('l1-mandos');
  });
  it('prioriza preguntas falladas', () => {
    const p = createDefaultProfile();
    p.theory.questions.q1 = review(undefined, false);
    expect(recommendations(p, () => 'senales')[0]?.kind).toBe('errores');
  });
  it('detecta categoría débil', () => {
    const p = createDefaultProfile();
    p.theory.questions.q1 = { seen: 10, correct: 4, wrong: 6, box: 2, due: Infinity, lastAt: 0 };
    const r = recommendations(p, () => 'alumbrado');
    expect(r.some((x) => x.route === '/teoria/tema/alumbrado')).toBe(true);
  });
});
