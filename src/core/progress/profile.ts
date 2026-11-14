/** Modelo de datos del perfil del estudiante. Todo lo persistente pasa por aquí. */
import type { TheoryCategoryId } from './curriculum';

export type Quality = 'baja' | 'media' | 'alta';
export type CameraMode = 'primera' | 'tercera';
export type Transmission = 'manual' | 'automatica';
export type StallLevel = 'facil' | 'normal' | 'realista';

export interface Settings {
  quality: Quality;
  shadows: boolean;
  sound: boolean;
  volume: number; // 0..1
  instructorText: boolean;
  /** Lee en voz alta las indicaciones del instructor (síntesis de voz del navegador). */
  instructorVoice: boolean;
  defaultCamera: CameraMode;
  reducedMotion: boolean;
  /** Cambio automático: sin embrague ni calado, para practicar otras cosas. */
  transmission: Transmission;
  /** Dificultad del calado (umbral de 400, 500 o 600 rpm). */
  stallDifficulty: StallLevel;
}

/** Estado de repetición espaciada por pregunta (sistema Leitner, cajas 0..5). */
export interface QuestionState {
  seen: number;
  correct: number;
  wrong: number;
  box: number;
  due: number; // epoch ms
  lastAt: number;
}

export interface TheoryExamRecord {
  id: string;
  date: string;
  mode: 'examen' | 'simulacro' | 'tema';
  category?: TheoryCategoryId;
  total: number;
  errors: number;
  passed: boolean;
  durationSec: number;
}

export interface LessonRecord {
  completed: boolean;
  attempts: number;
  bestScore: number; // 0..100
  lastAt: number;
}

export interface PracticalExamRecord {
  id: string;
  date: string;
  passed: boolean;
  eliminatory: number;
  deficient: number;
  minor: number;
  durationSec: number;
}

export interface Profile {
  name: string;
  createdAt: string;
  xp: number;
  settings: Settings;
  theory: {
    questions: Record<string, QuestionState>;
    exams: TheoryExamRecord[];
    answered: number;
    correct: number;
    answerTimeMs: number;
  };
  practice: {
    distanceKm: number;
    timeSec: number;
    lessons: Record<string, LessonRecord>;
    infractions: Record<string, number>;
    exams: PracticalExamRecord[];
  };
  achievements: Record<string, string>; // id -> fecha ISO
}

export const DEFAULT_SETTINGS: Settings = {
  quality: 'media',
  shadows: true,
  sound: true,
  volume: 0.7,
  instructorText: true,
  instructorVoice: false,
  defaultCamera: 'primera',
  reducedMotion: false,
  transmission: 'manual',
  stallDifficulty: 'normal',
};

export function createDefaultProfile(): Profile {
  return {
    name: 'Estudiante',
    createdAt: new Date().toISOString(),
    xp: 0,
    settings: { ...DEFAULT_SETTINGS },
    theory: { questions: {}, exams: [], answered: 0, correct: 0, answerTimeMs: 0 },
    practice: { distanceKm: 0, timeSec: 0, lessons: {}, infractions: {}, exams: [] },
    achievements: {},
  };
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const num = (v: unknown, d: number) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
const str = (v: unknown, d: string) => (typeof v === 'string' ? v : d);
const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);
const oneOf = <T extends string>(v: unknown, opts: readonly T[], d: T): T => (opts.includes(v as T) ? (v as T) : d);

/** Rellena campos que falten o tengan tipos erróneos sin perder los válidos. */
export function normalizeProfile(raw: unknown): Profile {
  const base = createDefaultProfile();
  if (!isObj(raw)) return base;
  const s = isObj(raw.settings) ? raw.settings : {};
  const t = isObj(raw.theory) ? raw.theory : {};
  const p = isObj(raw.practice) ? raw.practice : {};
  return {
    name: str(raw.name, base.name).slice(0, 40) || base.name,
    createdAt: str(raw.createdAt, base.createdAt),
    xp: Math.max(0, num(raw.xp, 0)),
    settings: {
      quality: oneOf(s.quality, ['baja', 'media', 'alta'] as const, DEFAULT_SETTINGS.quality),
      shadows: bool(s.shadows, DEFAULT_SETTINGS.shadows),
      sound: bool(s.sound, DEFAULT_SETTINGS.sound),
      volume: Math.min(1, Math.max(0, num(s.volume, DEFAULT_SETTINGS.volume))),
      instructorText: bool(s.instructorText, DEFAULT_SETTINGS.instructorText),
      instructorVoice: bool(s.instructorVoice, DEFAULT_SETTINGS.instructorVoice),
      defaultCamera: oneOf(s.defaultCamera, ['primera', 'tercera'] as const, DEFAULT_SETTINGS.defaultCamera),
      reducedMotion: bool(s.reducedMotion, DEFAULT_SETTINGS.reducedMotion),
      transmission: oneOf(s.transmission, ['manual', 'automatica'] as const, DEFAULT_SETTINGS.transmission),
      stallDifficulty: oneOf(s.stallDifficulty, ['facil', 'normal', 'realista'] as const, DEFAULT_SETTINGS.stallDifficulty),
    },
    theory: {
      questions: isObj(t.questions) ? (t.questions as Record<string, QuestionState>) : {},
      exams: Array.isArray(t.exams) ? (t.exams as TheoryExamRecord[]) : [],
      answered: num(t.answered, 0),
      correct: num(t.correct, 0),
      answerTimeMs: num(t.answerTimeMs, 0),
    },
    practice: {
      distanceKm: num(p.distanceKm, 0),
      timeSec: num(p.timeSec, 0),
      lessons: isObj(p.lessons) ? (p.lessons as Record<string, LessonRecord>) : {},
      infractions: isObj(p.infractions) ? (p.infractions as Record<string, number>) : {},
      exams: Array.isArray(p.exams) ? (p.exams as PracticalExamRecord[]) : [],
    },
    achievements: isObj(raw.achievements) ? (raw.achievements as Record<string, string>) : {},
  };
}
