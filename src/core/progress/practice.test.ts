import { describe, expect, it } from 'vitest';
import { createDefaultProfile, normalizeProfile } from './profile';
import { newlyUnlocked } from './levels';
import { recommendations } from './recommend';
import { ALL_LESSONS } from './curriculum';

const done = { completed: true, attempts: 1, bestScore: 90, lastAt: 1 };

describe('integración de la práctica', () => {
  it('desbloquea logros de lecciones y del examen práctico', () => {
    const p = createDefaultProfile();
    p.practice.lessons['l1-mandos'] = done;
    expect(newlyUnlocked(p)).toContain('primera-leccion');
    for (const l of ALL_LESSONS) p.practice.lessons[l.id] = done;
    p.practice.exams.push({ id: 'x', date: '', passed: true, eliminatory: 0, deficient: 0, minor: 0, durationSec: 600 });
    const ids = newlyUnlocked(p);
    for (const id of ['maniobras', 'temario-completo', 'apto-practico', 'examen-limpio', 'nivel1']) expect(ids).toContain(id);
  });

  it('recomienda el simulacro práctico tras superar muchas lecciones', () => {
    const p = createDefaultProfile();
    for (const l of ALL_LESSONS.slice(0, 12)) p.practice.lessons[l.id] = done;
    expect(recommendations(p, () => undefined).some((r) => r.route === '/simulador/examen')).toBe(true);
  });

  it('los perfiles antiguos sin la voz del instructor se completan', () => {
    const raw = JSON.parse(JSON.stringify(createDefaultProfile()));
    delete raw.settings.instructorVoice;
    expect(normalizeProfile(raw).settings.instructorVoice).toBe(false);
  });
});
