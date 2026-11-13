/** Motor de recomendaciones: analiza el perfil y propone qué practicar a continuación. */
import type { Profile } from './profile';
import { ALL_LESSONS, THEORY_CATEGORIES, type TheoryCategoryId } from './curriculum';
import { isDue, isFailed } from '../srs/leitner';

export interface Recommendation {
  kind: 'practica' | 'teoria' | 'errores' | 'examen';
  title: string;
  reason: string;
  route: string;
  priority: number; // menor = más urgente
}

export interface CategoryStat {
  id: TheoryCategoryId;
  name: string;
  answered: number;
  correct: number;
  accuracy: number; // 0..1
}

/**
 * Estadísticas por categoría. `categoryOf` traduce id de pregunta → categoría
 * (se inyecta para que el núcleo no dependa del banco de preguntas).
 */
export function categoryStats(p: Profile, categoryOf: (qid: string) => TheoryCategoryId | undefined): CategoryStat[] {
  const acc = new Map<TheoryCategoryId, { a: number; c: number }>();
  for (const [qid, s] of Object.entries(p.theory.questions)) {
    const cat = categoryOf(qid);
    if (!cat) continue;
    const e = acc.get(cat) ?? { a: 0, c: 0 };
    e.a += s.seen;
    e.c += s.correct;
    acc.set(cat, e);
  }
  return THEORY_CATEGORIES.map((c) => {
    const e = acc.get(c.id) ?? { a: 0, c: 0 };
    return { id: c.id, name: c.name, answered: e.a, correct: e.c, accuracy: e.a ? e.c / e.a : 0 };
  });
}

/** Siguiente lección práctica no completada, en orden del temario. */
export function nextLesson(p: Profile) {
  return ALL_LESSONS.find((l) => !p.practice.lessons[l.id]?.completed) ?? null;
}

export function recommendations(p: Profile, categoryOf: (qid: string) => TheoryCategoryId | undefined, now = Date.now()): Recommendation[] {
  const recs: Recommendation[] = [];

  const failed = Object.values(p.theory.questions).filter((s) => isFailed(s)).length;
  const due = Object.values(p.theory.questions).filter((s) => isDue(s, now)).length;
  if (failed > 0) {
    recs.push({ kind: 'errores', title: `Repasa tus ${failed} preguntas falladas`, reason: 'Las preguntas falladas se olvidan si no se repasan pronto.', route: '/teoria/errores', priority: 1 });
  } else if (due > 0) {
    recs.push({ kind: 'teoria', title: `${due} preguntas listas para repasar`, reason: 'Repetición espaciada: es el momento óptimo para recordarlas.', route: '/teoria/aprendizaje', priority: 2 });
  }

  const weak = categoryStats(p, categoryOf)
    .filter((c) => c.answered >= 5 && c.accuracy < 0.8)
    .sort((a, b) => a.accuracy - b.accuracy)[0];
  if (weak) {
    recs.push({ kind: 'teoria', title: `Refuerza: ${weak.name}`, reason: `Tu acierto en este tema es del ${Math.round(weak.accuracy * 100)} %.`, route: `/teoria/tema/${weak.id}`, priority: 3 });
  }

  const lesson = nextLesson(p);
  if (lesson) {
    recs.push({ kind: 'practica', title: `Nivel ${lesson.level}: ${lesson.title}`, reason: 'Siguiente lección práctica del temario.', route: `/simulador/leccion/${lesson.id}`, priority: 4 });
  }

  const topInfraction = Object.entries(p.practice.infractions).sort((a, b) => b[1] - a[1])[0];
  if (topInfraction && topInfraction[1] >= 3) {
    recs.push({ kind: 'practica', title: 'Corrige tu error más frecuente', reason: `Has cometido «${topInfraction[0]}» ${topInfraction[1]} veces.`, route: '/estadisticas', priority: 3 });
  }

  if (p.theory.answered >= 60 && p.theory.exams.filter((e) => e.mode === 'examen').length === 0) {
    recs.push({ kind: 'examen', title: 'Haz tu primer examen completo', reason: 'Ya has practicado suficiente para medirte en formato real.', route: '/teoria/examen', priority: 3 });
  }

  const lessonsDone = ALL_LESSONS.filter((l) => p.practice.lessons[l.id]?.completed).length;
  if (lessonsDone >= 12 && !p.practice.exams.some((e) => e.passed)) {
    recs.push({ kind: 'examen', title: 'Haz el simulacro de examen práctico', reason: `Has superado ${lessonsDone} lecciones: mide tu nivel con el examinador virtual.`, route: '/simulador/examen', priority: 3 });
  }

  if (p.theory.answered === 0) {
    recs.push({ kind: 'teoria', title: 'Empieza con el modo aprendizaje', reason: 'Responde preguntas con explicación inmediata.', route: '/teoria/aprendizaje', priority: 2 });
  }

  return recs.sort((a, b) => a.priority - b.priority);
}
