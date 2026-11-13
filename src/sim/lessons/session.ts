/**
 * Sesiones guiadas del simulador (lecciones y examen práctico): tipos comunes
 * y el ejecutor de lecciones por objetivos. Puro y testeable.
 */
import type { Gear } from '../vehicle/specs';
import type { Lights, VehicleState } from '../vehicle/vehicle';
import type { Pose, RoadInfo, WorldMap } from '../world/map';
import type { Signals } from '../world/signals';
import type { LaneGraph } from '../traffic/lanes';
import type { RuleCode, RuleEvent, RulesMonitor } from '../rules/monitor';
import { Evaluator, type Fault, type Verdict } from '../rules/evaluation';
import type { Scenario } from '../scenario';

export interface SetupEnv {
  map: WorldMap;
  signals: Signals;
  graph: LaneGraph;
}

export interface SessionSetup {
  pose: (env: SetupEnv) => Pose;
  speedKmh?: number;
  gear?: Gear;
  engineOn?: boolean;
  belt?: boolean;
  handbrake?: boolean;
  lights?: Lights;
  traffic: boolean;
  /** Vehículo lento delante, en el mismo carril de autovía. */
  slowCar?: { aheadM: number; kmh: number; laneId: string };
  /** Hacer que un peatón cruce por el próximo paso de peatones. */
  forceCrossing?: boolean;
}

export interface SessionCtx {
  t: number;
  dt: number;
  v: VehicleState;
  info: RoadInfo;
  events: RuleEvent[];
  /** Roces y golpes acumulados desde el inicio (bordillos, coches…). */
  contacts: number;
  monitor: RulesMonitor;
  slowCar: { x: number; z: number; heading: number } | null;
  /** Pide forzar el cruce de un peatón en el paso indicado. */
  requestCrossing?: (crosswalkId: string) => void;
}

export type ObjectiveState = 'pendiente' | 'hecho' | 'fallado';

export interface SessionView {
  kind: 'leccion' | 'examen';
  title: string;
  objectives: { text: string; state: ObjectiveState }[];
  status: 'activa' | 'superada' | 'no-superada';
  elapsed: number;
  hint?: string;
  result?: SessionResult;
}

export interface SessionResult {
  passed: boolean;
  score: number;
  faults: Fault[];
  verdict?: Verdict;
  summary: string;
  /** Zona de salida, semilla y zonas recorridas (examen con zonas). */
  scenario?: { zone: string; seed: number; weather: string; visited: string[] };
}

export interface Session {
  kind: 'leccion' | 'examen';
  id: string;
  title: string;
  briefing: string[];
  setup: SessionSetup;
  evaluator: Evaluator;
  /** El instructor da consejos (lecciones); en el examen solo habla el examinador. */
  coaching: boolean;
  /** Avanza la sesión y devuelve las frases que deben mostrarse. */
  step(ctx: SessionCtx): string[];
  view(): SessionView;
  objectiveTexts(): string[];
  /** Escenario sorteado (zona, semilla): el examen empieza en él y planifica su ruta. */
  setScenario?(sc: Scenario): void;
}

// ---------------------------------------------------------------------------
// Lecciones
// ---------------------------------------------------------------------------
export interface LessonCtx extends SessionCtx {
  /** Conductas correctas acumuladas: por código y por «código:detalle». */
  good: Map<string, number>;
  start: Pose;
  /** Metros recorridos desde el inicio. */
  distM: number;
  /** Desplazamiento a lo largo del rumbo inicial (negativo = hacia atrás). */
  along: number;
  /** Segundos seguidos con el coche parado. */
  stillT: number;
  /** Memoria libre de la lección. */
  st: Record<string, number | boolean>;
}

export interface Objective {
  text: string;
  /** Se cumple cuando devuelve true (una vez cumplido, queda cumplido). */
  done?: (c: LessonCtx) => boolean;
  /** Se suspende si ocurre alguno de estos eventos o si `fail` devuelve true. */
  avoid?: RuleCode[];
  fail?: (c: LessonCtx) => boolean;
  /** Solo se evalúa cuando el objetivo anterior está hecho. */
  sequential?: boolean;
}

export interface LessonDef {
  id: string;
  title: string;
  briefing: string[];
  setup: SessionSetup;
  objectives: Objective[];
  /** Límite de tiempo en segundos. */
  timeLimit?: number;
}

export class LessonSession implements Session {
  readonly kind = 'leccion' as const;
  readonly evaluator = new Evaluator();
  readonly coaching = true;
  private states: ObjectiveState[];
  private status: SessionView['status'] = 'activa';
  private t0: number | null = null;
  private elapsed = 0;
  private start: Pose | null = null;
  private odo0 = 0;
  private good = new Map<string, number>();
  private st: Record<string, number | boolean> = {};
  private result?: SessionResult;
  private penalty = 0;
  private still = 0;

  constructor(readonly def: LessonDef) {
    this.states = def.objectives.map(() => 'pendiente');
  }

  get id() {
    return this.def.id;
  }
  get title() {
    return this.def.title;
  }
  get briefing() {
    return this.def.briefing;
  }
  get setup() {
    return this.def.setup;
  }

  objectiveTexts() {
    return this.def.objectives.map((o) => o.text);
  }

  step(ctx: SessionCtx): string[] {
    if (this.status !== 'activa') return [];
    const say: string[] = [];
    if (this.t0 === null) {
      this.t0 = ctx.t;
      this.start = { x: ctx.v.x, z: ctx.v.z, heading: ctx.v.heading };
      this.odo0 = ctx.v.odometerM;
    }
    this.elapsed = ctx.t - this.t0;
    this.evaluator.add(ctx.events, ctx.t, false);
    for (const e of ctx.events) {
      if (e.kind !== 'bien') continue;
      this.good.set(e.code, (this.good.get(e.code) ?? 0) + 1);
      if (e.detail) this.good.set(`${e.code}:${e.detail}`, (this.good.get(`${e.code}:${e.detail}`) ?? 0) + 1);
    }
    const s = this.start!;
    this.still = Math.abs(ctx.v.v) < 0.1 ? this.still + ctx.dt : 0;
    const lc: LessonCtx = {
      ...ctx, good: this.good, start: s, distM: ctx.v.odometerM - this.odo0, st: this.st, stillT: this.still,
      along: (ctx.v.x - s.x) * Math.sin(s.heading) + (ctx.v.z - s.z) * Math.cos(s.heading),
    };
    const objs = this.def.objectives;
    objs.forEach((o, i) => {
      if (this.states[i] !== 'pendiente') return;
      const failed = (o.avoid && ctx.events.some((e) => o.avoid!.includes(e.code))) || (o.fail && o.fail(lc));
      if (failed) {
        this.states[i] = 'fallado';
        this.penalty += 20;
        say.push(`Objetivo no cumplido: ${o.text}.`);
        return;
      }
      if (!o.done) return;
      if (o.sequential && i > 0 && this.states[i - 1] !== 'hecho') return;
      if (o.done(lc)) {
        this.states[i] = 'hecho';
        say.push(`✓ ${o.text}`);
      }
    });
    const elim = this.evaluator.count('eliminatoria');
    const allDone = objs.every((o, i) => !o.done || this.states[i] === 'hecho');
    if (elim > 0) this.finish(false, 'Falta eliminatoria: la lección se da por no superada.');
    else if (this.def.timeLimit && this.elapsed > this.def.timeLimit) this.finish(false, 'Se ha agotado el tiempo de la lección.');
    else if (allDone) {
      this.states = this.states.map((st) => (st === 'pendiente' ? 'hecho' : st)); // los «evitar» se dan por cumplidos
      const anyFail = this.states.includes('fallado');
      this.finish(!anyFail, anyFail ? 'Has completado la maniobra, pero algún objetivo no se ha cumplido.' : '¡Lección superada!');
    }
    if (this.result) say.push(this.result.summary);
    return say;
  }

  private finish(passed: boolean, summary: string) {
    const score = Math.max(0, this.evaluator.score() - this.penalty);
    this.status = passed ? 'superada' : 'no-superada';
    this.result = { passed, score: passed ? score : Math.min(score, 49), faults: [...this.evaluator.faults], summary };
  }

  view(): SessionView {
    return {
      kind: 'leccion',
      title: this.def.title,
      objectives: this.def.objectives.map((o, i) => ({ text: o.text, state: this.states[i]! })),
      status: this.status,
      elapsed: this.elapsed,
      result: this.result,
    };
  }
}
