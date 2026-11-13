/**
 * Examen práctico (nivel 6) con examinador virtual.
 *
 * - Empieza en el punto de salida sorteado (zona + semilla) y dura unos 25
 *   minutos: la ruta encadena varias zonas en el orden que marca la semilla.
 * - En cada cruce el examinador elige el giro que acerca a la siguiente zona
 *   (camino más corto sobre la red de carriles) y lo anuncia con antelación
 *   realista (≈ 7 s antes, mínimo 55 m) y de nuevo al llegar. Las indicaciones
 *   se pueden fallar: cuentan como falta leve.
 * - Autovía: indica la incorporación y la salida 3 (Centro ciudad).
 * - Al final pide detener el vehículo. Una falta eliminatoria termina la prueba.
 * - El veredicto aplica el criterio de calificación de la DGT (ver `rules/evaluation.ts`).
 */
import { Evaluator } from '../rules/evaluation';
import type { LaneGraph } from '../traffic/lanes';
import type { Arm } from '../world/signals';
import { zoneAt, zoneDef, ZONES, type ZoneId } from '../world/zones';
import { WEATHER_LABEL, type Scenario } from '../scenario';
import type { Session, SessionCtx, SessionResult, SessionSetup, SessionView } from './session';

export type Instruction =
  | { kind: 'giro'; want: 'recto' | 'derecha' | 'izquierda' }
  | { kind: 'rotonda'; exit: 1 | 2 | 3 }
  | { kind: 'autovia'; want: 'recto' | 'derecha' | 'izquierda' }
  | { kind: 'salida' };

const ORD = ['', 'primera', 'segunda', 'tercera'];

export function instructionText(i: Instruction): string {
  if (i.kind === 'rotonda') return `En la rotonda, tome la ${ORD[i.exit]} salida.`;
  if (i.kind === 'autovia') return i.want === 'recto' ? 'En el próximo cruce, siga recto hacia la autovía A-90.' : `En el próximo cruce, gire a la ${i.want} para incorporarse a la autovía A-90.`;
  if (i.kind === 'salida') return 'Incorpórese a la autovía y tome la salida 3, Centro ciudad.';
  if (i.want === 'recto') return 'En el próximo cruce, continúe recto.';
  return `En la próxima intersección, gire a la ${i.want}.`;
}

/** Recordatorio corto al llegar al cruce. */
function reminderText(i: Instruction): string {
  if (i.kind === 'rotonda') return `${ORD[i.exit]![0]!.toUpperCase()}${ORD[i.exit]!.slice(1)} salida.`;
  if (i.kind === 'giro' || i.kind === 'autovia') return i.want === 'recto' ? 'Aquí, recto.' : `Aquí, a la ${i.want}.`;
  return '';
}

/** Salida tomada en la rotonda (1 = primera a la derecha) a partir de los ángulos de entrada y salida. */
export function roundaboutExit(phiIn: number, phiOut: number): number {
  // Se circula en sentido de ángulo decreciente.
  let d = phiIn - phiOut;
  while (d <= 0.3) d += Math.PI * 2;
  while (d > Math.PI * 2 + 0.3) d -= Math.PI * 2;
  return Math.max(1, Math.round(d / (Math.PI / 2)));
}

/** Tipo de giro según el cambio de rumbo al atravesar un cruce (izquierda = rumbo creciente). */
export function turnFromHeading(delta: number): 'recto' | 'derecha' | 'izquierda' | null {
  const d = Math.atan2(Math.sin(delta), Math.cos(delta));
  if (Math.abs(d) < 0.5) return 'recto';
  if (d > 0.9) return 'izquierda';
  if (d < -0.9) return 'derecha';
  return null;
}

/** Duración objetivo de la ruta y límite de tiempo. */
export const EXAM_DURATION = 25 * 60;
const FINAL_AT = EXAM_DURATION - 150;
const TIME_LIMIT = 32 * 60;
/** Zonas que se recorren tras la de salida. */
const ROUTE_ZONES = 4;
/** Cruce de la ciudad del que sale el ramal de incorporación a la autovía. */
const RAMP_JUNCTION = 'j240_-60';

export class ExamSession implements Session {
  readonly kind = 'examen' as const;
  readonly evaluator = new Evaluator();
  readonly coaching = false;
  readonly title = 'Examen práctico';
  readonly briefing = [
    'Un examinador virtual te dará las indicaciones por voz y en pantalla, con antelación. Antes de salir: cinturón, retrovisores, motor y luces si hacen falta.',
    `La prueba dura unos ${EXAM_DURATION / 60} minutos y recorre varias zonas (ciudad, rotonda, autovía, carretera…). Al final te pedirá que detengas el vehículo.`,
    'Criterio orientativo de la DGT: NO APTO con 1 falta eliminatoria, 2 deficientes, 1 deficiente + 5 leves o 10 leves.',
  ];
  readonly setup: SessionSetup;
  private phase: 'preparacion' | 'recorrido' | 'final' | 'terminado' = 'preparacion';
  private t0: number | null = null;
  private elapsed = 0;
  private given = 0;
  private followed = 0;
  private pending: { armId: string; junctionId: string; ins: Instruction; reminded: boolean } | null = null;
  /** Indicación de autovía en curso (incorporación → salida). */
  private highway: { since: number; exitOk: boolean } | null = null;
  private inside: { junctionId: string; heading: number; phi: number } | null = null;
  private instructedArm = new Set<string>();
  private result?: SessionResult;
  private hint = '';
  private rand: () => number;
  private scenario: Scenario | null = null;
  private targets: ZoneId[] = [];
  private visited: ZoneId[] = [];
  private distCache = new Map<ZoneId, Map<string, number>>();

  constructor(private graph: LaneGraph, readonly id = 'examen', seed = Date.now()) {
    let a = seed >>> 0;
    this.rand = () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    this.setup = {
      pose: (env) => {
        if (this.scenario) return { x: this.scenario.spawn.x, z: this.scenario.spawn.z, heading: this.scenario.spawn.heading };
        const s = env.map.spawns.find((x) => x.id === 'centro')!;
        return { x: s.x, z: s.z, heading: s.heading };
      },
      traffic: true, engineOn: false, belt: false, handbrake: true, gear: 'N',
    };
  }

  setScenario(sc: Scenario) {
    this.scenario = sc;
    this.targets = sc.route.slice(0, ROUTE_ZONES);
    this.visited = [sc.zone];
    this.rand = (() => {
      let a = (sc.seed * 7919) >>> 0;
      return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    })();
    if (sc.zone === 'autovia') this.highway = { since: 0, exitOk: false };
  }

  objectiveTexts() {
    return ['Seguir las indicaciones del examinador por varias zonas (≈ 25 min)', 'Detener el vehículo al final', 'Sin faltas que impidan el APTO'];
  }

  // ------------------------------------------------------------ ruta
  /** Carriles de destino de una zona. */
  private targetLanes(z: ZoneId): string[] {
    if (z === 'autovia') return (this.graph.signals.armsOf(RAMP_JUNCTION).flatMap((a) => (this.graph.incoming.get(a.id) ?? []).map((l) => l.id)));
    const roads = zoneDef(z).roads;
    return [...this.graph.lanes.values()].filter((l) => l.kind === 'calle' && l.road && roads.includes(l.road.id)).map((l) => l.id);
  }

  /** Distancia (m) desde el comienzo de cada carril hasta la zona (Dijkstra inverso, en caché). */
  distTo(z: ZoneId): Map<string, number> {
    const hit = this.distCache.get(z);
    if (hit) return hit;
    const dist = new Map<string, number>();
    const queue: [string, number][] = [];
    for (const id of this.targetLanes(z)) {
      dist.set(id, 0);
      queue.push([id, 0]);
    }
    while (queue.length) {
      queue.sort((a, b) => a[1] - b[1]);
      const [id, d] = queue.shift()!;
      if (d > (dist.get(id) ?? Infinity)) continue;
      for (const prev of this.graph.feeders.get(id) ?? []) {
        const l = this.graph.lanes.get(prev);
        if (!l) continue;
        const nd = d + l.length;
        if (nd < (dist.get(prev) ?? Infinity)) {
          dist.set(prev, nd);
          queue.push([prev, nd]);
        }
      }
    }
    this.distCache.set(z, dist);
    return dist;
  }

  /** Opciones posibles desde un brazo: giros de los conectores o salidas de la rotonda. */
  options(arm: Arm): Instruction[] {
    if (arm.junction.kind === 'rotonda') return [1, 2, 3].map((exit) => ({ kind: 'rotonda', exit: exit as 1 | 2 | 3 }));
    const turns = new Set<string>();
    for (const l of this.graph.incoming.get(arm.id) ?? []) for (const n of l.next) {
      const c = this.graph.lanes.get(n);
      if (c?.turn && !n.includes('>' + l.id.split('#')[0])) turns.add(c.turn);
    }
    return [...turns].map((want) => ({ kind: 'giro', want: want as 'recto' | 'derecha' | 'izquierda' }));
  }

  /** Giro hacia el ramal de la autovía desde un brazo del cruce de incorporación. */
  private rampTurn(arm: Arm): 'recto' | 'derecha' | 'izquierda' | null {
    const ramp = this.graph.signals.armsOf(arm.junction.id).find((a) => a.road.id === 'ramal-entrada');
    if (!ramp || ramp === arm) return null;
    const din = { x: -arm.u.x, z: -arm.u.z };
    const dot = din.x * ramp.u.x + din.z * ramp.u.z;
    if (dot > 0.7) return 'recto';
    return -din.z * ramp.u.x + din.x * ramp.u.z > 0 ? 'derecha' : 'izquierda';
  }

  /** Mejor indicación desde un brazo para acercarse a la zona objetivo (o null si no hay camino). */
  plan(arm: Arm, target: ZoneId): Instruction | null {
    if (target === 'autovia' && arm.junction.id === RAMP_JUNCTION) {
      const t = this.rampTurn(arm);
      if (t) return { kind: 'autovia', want: t };
    }
    const dist = this.distTo(target);
    let best: { ins: Instruction; cost: number } | null = null;
    const ins = this.graph.incoming.get(arm.id) ?? [];
    if (arm.junction.kind === 'rotonda') {
      const phiIn = Math.atan2(arm.u.z, arm.u.x);
      for (const b of this.graph.signals.armsOf(arm.junction.id)) {
        if (b === arm) continue;
        for (const out of this.graph.outgoing.get(b.id) ?? []) {
          const cost = dist.get(out.id);
          if (cost === undefined) continue;
          const exit = roundaboutExit(phiIn, Math.atan2(b.u.z, b.u.x));
          if (exit > 3) continue;
          if (!best || cost < best.cost) best = { ins: { kind: 'rotonda', exit: exit as 1 | 2 | 3 }, cost };
        }
      }
      return best?.ins ?? null;
    }
    for (const l of ins) for (const n of l.next) {
      const c = this.graph.lanes.get(n);
      if (!c?.turn || n.includes('>' + l.id.split('#')[0])) continue; // sin cambios de sentido
      const after = dist.get(c.next[0]!);
      if (after === undefined) continue;
      const cost = c.length + after;
      if (!best || cost < best.cost) best = { ins: { kind: 'giro', want: c.turn }, cost };
    }
    return best?.ins ?? null;
  }

  private pick(opts: Instruction[]): Instruction | null {
    if (!opts.length) return null;
    const w = opts.map((o) => (o.kind === 'giro' && o.want === 'recto' ? 2 : 1));
    let r = this.rand() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < opts.length; i++) {
      r -= w[i]!;
      if (r <= 0) return opts[i]!;
    }
    return opts[opts.length - 1]!;
  }

  get currentTarget(): ZoneId | null {
    return this.targets.find((z) => !this.visited.includes(z)) ?? null;
  }

  // ------------------------------------------------------------ paso
  step(ctx: SessionCtx): string[] {
    if (this.phase === 'terminado') return [];
    const say: string[] = [];
    if (this.t0 === null) {
      this.t0 = ctx.t;
      say.push(this.highway
        ? `Examinador: cuando esté preparado, inicie la marcha. ${instructionText({ kind: 'salida' })}`
        : 'Examinador: cuando esté preparado, inicie la marcha y siga recto hasta que le indique.');
      if (this.highway) this.hint = instructionText({ kind: 'salida' });
    }
    this.elapsed = ctx.t - this.t0;
    this.evaluator.add(ctx.events, ctx.t, true);
    const v = ctx.v;
    const speed = Math.abs(v.v);

    if (this.evaluator.count('eliminatoria') > 0) {
      say.push('Examinador: por seguridad, damos por finalizada la prueba.');
      this.finish(say);
      return say;
    }
    if (this.elapsed > TIME_LIMIT) {
      say.push('Examinador: se ha agotado el tiempo de la prueba.');
      this.finish(say);
      return say;
    }

    if (this.phase === 'preparacion' && speed > 1) this.phase = 'recorrido';

    // Zonas recorridas
    const zone = zoneAt(this.graph.map, ctx.info);
    if (zone && !this.visited.includes(zone)) this.visited.push(zone);

    // Autovía: incorporación y salida 3
    const roadId = ctx.info.road?.id;
    if (this.highway) {
      if (roadId === 'ramal-salida' && !this.highway.exitOk) {
        this.highway.exitOk = true;
        this.followed++;
        this.hint = '';
      }
      if (this.highway.exitOk && roadId !== 'ramal-salida' && roadId !== 'autovia') this.highway = null;
      else if (!this.highway.exitOk && this.elapsed - this.highway.since > 6 * 60) {
        this.evaluator.add([{ code: 'no-seguir-indicaciones', kind: 'falta', detail: 'no tomó la salida 3' }], ctx.t);
        say.push('Examinador: no ha tomado la salida indicada. Tome la próxima salida 3.');
        this.highway.since = this.elapsed;
      }
    }

    // Indicaciones al acercarse a un cruce, con antelación según la velocidad
    const ap = ctx.monitor.approachArm;
    const announce = Math.max(55, speed * 7);
    // Solo con el coche en marcha (no junto al «inicie la marcha»); si se arranca muy cerca del cruce, se avisa a menos distancia.
    if (this.phase === 'recorrido' && speed > 0.5 && ap && !this.pending && ap.dist < announce && ap.dist > 8 && !this.instructedArm.has(ap.arm.id)) {
      const target = this.currentTarget;
      const planned = target ? this.plan(ap.arm, target) : null;
      const ins = planned ?? this.pick(this.options(ap.arm));
      if (ins) {
        this.instructedArm.add(ap.arm.id);
        this.pending = { armId: ap.arm.id, junctionId: ap.arm.junction.id, ins, reminded: false };
        this.given++;
        this.hint = instructionText(ins);
        say.push(`Examinador: ${this.hint}`);
      }
    }
    // Recordatorio corto al llegar
    const p0 = this.pending;
    if (p0 && !p0.reminded && ap && ap.arm.id === p0.armId && ap.dist < 25 && speed > 1) {
      p0.reminded = true;
      const r = reminderText(p0.ins);
      if (r) say.push(`Examinador: ${r}`);
    }

    // Atravesar el cruce y comprobar la indicación
    const j = ctx.info.junction;
    if (j && !this.inside) this.inside = { junctionId: j.id, heading: v.heading, phi: Math.atan2(v.z - j.z, v.x - j.x) };
    if (this.inside && (!j || j.id !== this.inside.junctionId)) {
      const inside = this.inside;
      this.inside = j ? { junctionId: j.id, heading: v.heading, phi: Math.atan2(v.z - j.z, v.x - j.x) } : null;
      const p = this.pending;
      if (p && p.junctionId === inside.junctionId) {
        let ok: boolean;
        if (p.ins.kind === 'rotonda') {
          const jj = this.graph.map.junctions.find((x) => x.id === inside.junctionId)!;
          ok = roundaboutExit(inside.phi, Math.atan2(v.z - jj.z, v.x - jj.x)) === p.ins.exit;
        } else if (p.ins.kind === 'autovia') {
          ok = roadId === 'ramal-entrada';
          if (ok) {
            this.highway = { since: this.elapsed, exitOk: false };
            say.push(`Examinador: ${instructionText({ kind: 'salida' })}`);
          }
        } else ok = p.ins.kind === 'giro' && turnFromHeading(v.heading - inside.heading) === p.ins.want;
        if (ok) this.followed++;
        else this.evaluator.add([{ code: 'no-seguir-indicaciones', kind: 'falta' }], ctx.t);
        this.pending = null;
        this.hint = this.highway && !this.highway.exitOk ? instructionText({ kind: 'salida' }) : '';
        if (!ok) say.push('Examinador: no ha seguido la indicación. Continúe; le iré indicando.');
      }
      this.instructedArm.clear();
    }

    // Final de la ruta
    if (this.phase === 'recorrido' && this.elapsed >= FINAL_AT && !this.pending && !this.highway && !ctx.info.junction) {
      this.phase = 'final';
      this.hint = 'Busque un lugar seguro, detenga el vehículo a la derecha y ponga el freno de mano.';
      say.push(`Examinador: muy bien. ${this.hint}`);
    }
    if (this.phase === 'final' && speed < 0.1 && v.handbrake && (ctx.info.surface === 'calzada' || ctx.info.surface === 'arcen') && !ctx.info.junction) {
      say.push('Examinador: hemos terminado la prueba.');
      this.finish(say);
    }
    return say;
  }

  private finish(say: string[]) {
    const reachedEnd = this.phase === 'final';
    this.phase = 'terminado';
    const verdict = this.evaluator.verdict();
    const completed = reachedEnd && this.followed > 0;
    const passed = verdict.passed && completed;
    const summary = passed
      ? `APTO. ${verdict.reason}`
      : `NO APTO. ${completed ? verdict.reason : verdict.passed ? 'No se ha completado el recorrido.' : verdict.reason}`;
    const sc = this.scenario;
    this.result = {
      // Momento de cada falta, contado desde el inicio de la prueba
      passed, score: this.evaluator.score(), faults: this.evaluator.faults.map((f) => ({ ...f, t: Math.max(0, f.t - (this.t0 ?? 0)) })), verdict, summary,
      ...(sc ? { scenario: { zone: zoneDef(sc.zone).name, seed: sc.seed, weather: WEATHER_LABEL[sc.weather], visited: this.visited.map((z) => zoneDef(z).name) } } : {}),
    };
    say.push(`Resultado: ${summary}`);
  }

  view(): SessionView {
    const total = this.targets.length + 1;
    const done = this.visited.filter((z) => z === this.scenario?.zone || this.targets.includes(z)).length;
    const next = this.currentTarget;
    const objectives: SessionView['objectives'] = [
      { text: `Recorrido: ${Math.floor(this.elapsed / 60)} de ${EXAM_DURATION / 60} min · zonas ${Math.min(done, total)}/${total}${next ? ` · siguiente: ${zoneDef(next).name}` : ''}`, state: this.phase === 'final' || this.phase === 'terminado' ? 'hecho' : 'pendiente' },
      { text: `Indicaciones: ${this.given} (${this.followed} seguidas)`, state: 'pendiente' },
      { text: 'Detener el vehículo al final', state: this.phase === 'terminado' && this.result?.passed ? 'hecho' : 'pendiente' },
      {
        text: `Faltas: ${this.evaluator.count('eliminatoria')} E · ${this.evaluator.count('deficiente')} D · ${this.evaluator.count('leve')} L`,
        state: this.evaluator.verdict().passed ? 'pendiente' : 'fallado',
      },
    ];
    return {
      kind: 'examen',
      title: this.title,
      objectives,
      status: this.phase !== 'terminado' ? 'activa' : this.result?.passed ? 'superada' : 'no-superada',
      elapsed: this.elapsed,
      hint: this.hint || undefined,
      result: this.result,
    };
  }
}

/** Zonas que puede recorrer el examen (todas). */
export const EXAM_ZONES = ZONES.map((z) => z.id);
