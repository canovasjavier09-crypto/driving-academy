import type { Profile } from './profile';
import { ALL_LESSONS } from './curriculum';

export const LEVEL_TITLES = [
  'Aspirante',
  'Aprendiz',
  'Conductor novel',
  'Conductor urbano',
  'Conductor de carretera',
  'Conductor experto',
  'Listo para el examen',
  'Maestro del volante',
] as const;

/** XP necesaria para alcanzar el nivel n (n empieza en 1). Curva suave cuadrática. */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(100 * (level - 1) ** 1.6);
}

export function levelInfo(xp: number) {
  let level = 1;
  while (level < LEVEL_TITLES.length && xp >= xpForLevel(level + 1)) level++;
  const cur = xpForLevel(level);
  const next = level < LEVEL_TITLES.length ? xpForLevel(level + 1) : cur;
  const progress = next === cur ? 1 : (xp - cur) / (next - cur);
  return { level, title: LEVEL_TITLES[level - 1] ?? LEVEL_TITLES[0], xp, current: cur, next, progress };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  test: (p: Profile) => boolean;
}

const passedTheory = (p: Profile) => p.theory.exams.filter((e) => e.mode === 'examen' && e.passed).length;

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'primera-respuesta', title: 'Primera pregunta', description: 'Responde tu primera pregunta teórica.', test: (p) => p.theory.answered >= 1 },
  { id: 'cien-preguntas', title: 'Cien respuestas', description: 'Responde 100 preguntas.', test: (p) => p.theory.answered >= 100 },
  { id: 'primer-aprobado', title: 'Primer aprobado', description: 'Aprueba un examen teórico de 30 preguntas.', test: (p) => passedTheory(p) >= 1 },
  { id: 'racha-aprobados', title: 'Preparado para la DGT', description: 'Aprueba 5 exámenes teóricos.', test: (p) => passedTheory(p) >= 5 },
  { id: 'examen-perfecto', title: 'Examen perfecto', description: 'Aprueba un examen sin ningún fallo.', test: (p) => p.theory.exams.some((e) => e.mode === 'examen' && e.errors === 0) },
  { id: 'primer-km', title: 'Primer kilómetro', description: 'Recorre 1 km en el simulador.', test: (p) => p.practice.distanceKm >= 1 },
  { id: 'cincuenta-km', title: 'Rodaje', description: 'Recorre 50 km en el simulador.', test: (p) => p.practice.distanceKm >= 50 },
  { id: 'nivel1', title: 'Domino el embrague', description: 'Completa todas las lecciones del nivel 1.', test: (p) => ALL_LESSONS.filter((l) => l.level === 1).every((l) => p.practice.lessons[l.id]?.completed) },
  { id: 'apto-practico', title: 'APTO', description: 'Supera el simulacro de examen práctico.', test: (p) => p.practice.exams.some((e) => e.passed) },
  { id: 'primera-leccion', title: 'Primera clase', description: 'Supera tu primera lección práctica.', test: (p) => Object.values(p.practice.lessons).some((l) => l.completed) },
  { id: 'maniobras', title: 'Maestro del aparcamiento', description: 'Supera todas las lecciones de maniobras (nivel 5).', test: (p) => ALL_LESSONS.filter((l) => l.level === 5).every((l) => p.practice.lessons[l.id]?.completed) },
  { id: 'temario-completo', title: 'Temario completo', description: 'Supera las 20 lecciones prácticas.', test: (p) => ALL_LESSONS.every((l) => p.practice.lessons[l.id]?.completed) },
  { id: 'examen-limpio', title: 'Sin una falta', description: 'Supera el simulacro práctico sin ninguna falta.', test: (p) => p.practice.exams.some((e) => e.passed && e.eliminatory + e.deficient + e.minor === 0) },
];

/** Devuelve los ids de logros recién desbloqueados (no modifica el perfil). */
export function newlyUnlocked(p: Profile): string[] {
  return ACHIEVEMENTS.filter((a) => !p.achievements[a.id] && a.test(p)).map((a) => a.id);
}
