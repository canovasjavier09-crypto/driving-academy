/**
 * Red de carriles para el tráfico: trayectorias (polilíneas) por las que
 * circulan los coches de la IA y sus conexiones en cruces y rotonda.
 *
 *  - Carril de calle: eje desplazado según el carril, en su sentido de marcha.
 *  - Conector: curva de Bézier dentro de un cruce (recto, derecha, izquierda).
 *  - Anillo: tramos de la rotonda (sentido antihorario) con entradas y salidas.
 *  - Autovía: cuatro carriles cerrados (bucles).
 * Los ramales no se usan en el tráfico de la IA.
 */
import { ROUNDABOUT, type Road, type V2, type WorldMap } from '../world/map';
import { Signals, type Arm, type Control } from '../world/signals';

export type Turn = 'recto' | 'derecha' | 'izquierda';

export interface LanePath {
  id: string;
  kind: 'calle' | 'conector' | 'anillo' | 'autovia';
  pts: V2[];
  cum: number[];
  length: number;
  /** Velocidad máxima (m/s). */
  limit: number;
  next: string[];
  closed?: boolean;
  road?: Road;
  /** Brazo por el que este carril llega a un cruce (si termina en uno). */
  arrive?: Arm;
  control?: Control;
  /** Posición de la línea de detención (s). */
  lineS?: number;
  /** Para conectores: cruce, brazo de origen y tipo de giro. */
  junctionId?: string;
  fromArm?: string;
  turn?: Turn;
  /** Pasos de peatones que atraviesa este carril (id y s del centro). */
  crosswalks: { id: string; s: number }[];
}

const kmh = (v: number) => v / 3.6;
const right = (d: V2): V2 => ({ x: -d.z, z: d.x });

function cumulative(pts: V2[], closed = false): number[] {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1]! + Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.z - pts[i - 1]!.z));
  if (closed) cum.push(cum[cum.length - 1]! + Math.hypot(pts[0]!.x - pts[pts.length - 1]!.x, pts[0]!.z - pts[pts.length - 1]!.z));
  return cum;
}

function make(id: string, kind: LanePath['kind'], pts: V2[], limit: number, extra: Partial<LanePath> = {}): LanePath {
  const cum = cumulative(pts, extra.closed);
  return { id, kind, pts, cum, length: cum[cum.length - 1]!, limit, next: [], crosswalks: [], ...extra };
}

/** Desplaza una polilínea lateralmente (positivo = derecha). */
function offsetLine(pts: V2[], o: number, closed = false): V2[] {
  const n = pts.length;
  return pts.map((p, i) => {
    const a = pts[closed ? (i - 1 + n) % n : Math.max(0, i - 1)]!;
    const b = pts[closed ? (i + 1) % n : Math.min(n - 1, i + 1)]!;
    const l = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    const r = right({ x: (b.x - a.x) / l, z: (b.z - a.z) / l });
    return { x: p.x + r.x * o, z: p.z + r.z * o };
  });
}

function bezier(p0: V2, d0: V2, p3: V2, d3: V2, n = 10): V2[] {
  const k = Math.hypot(p3.x - p0.x, p3.z - p0.z) * 0.45;
  const p1 = { x: p0.x + d0.x * k, z: p0.z + d0.z * k };
  const p2 = { x: p3.x - d3.x * k, z: p3.z - d3.z * k };
  const out: V2[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = (1 - t) ** 3, b = 3 * (1 - t) ** 2 * t, c = 3 * (1 - t) * t * t, d = t ** 3;
    out.push({ x: a * p0.x + b * p1.x + c * p2.x + d * p3.x, z: a * p0.z + b * p1.z + c * p2.z + d * p3.z });
  }
  return out;
}

const dirAt = (l: LanePath, end: boolean): V2 => {
  const n = l.pts.length;
  const a = end ? l.pts[n - 2]! : l.pts[0]!;
  const b = end ? l.pts[n - 1]! : l.pts[1]!;
  const len = Math.hypot(b.x - a.x, b.z - a.z) || 1;
  return { x: (b.x - a.x) / len, z: (b.z - a.z) / len };
};

export class LaneGraph {
  readonly lanes = new Map<string, LanePath>();
  /** Carriles que llegan a cada brazo / salen de cada brazo. */
  readonly incoming = new Map<string, LanePath[]>();
  readonly outgoing = new Map<string, LanePath[]>();
  /** Conectores de cada cruce (para saber si está ocupado). */
  readonly connectorsByJunction = new Map<string, string[]>();
  /** Tramos de anillo de la rotonda: «pasa» por delante de cada entrada. */
  readonly ringPassByArm = new Map<string, string>();
  readonly ringLinkBeforeArm = new Map<string, string>();
  /** Carriles que desembocan en cada carril (para incorporaciones). */
  readonly feeders = new Map<string, string[]>();

  constructor(readonly map: WorldMap, readonly signals: Signals) {
    this.buildStreetLanes();
    this.buildJunctions();
    this.buildRoundabout();
    this.buildHighway();
    for (const l of this.lanes.values()) {
      if (l.closed) continue;
      for (const n of l.next) {
        const list = this.feeders.get(n);
        if (list) list.push(l.id);
        else this.feeders.set(n, [l.id]);
      }
    }
  }

  get(id: string): LanePath {
    const l = this.lanes.get(id);
    if (!l) throw new Error(`Carril desconocido: ${id}`);
    return l;
  }

  private add(l: LanePath) {
    this.lanes.set(l.id, l);
    return l;
  }

  private buildStreetLanes() {
    for (const road of this.map.roads) {
      if (road.kind !== 'calle') continue;
      road.lanes.forEach((lane, idx) => {
        let pts = offsetLine(road.pts, lane.offset);
        if (lane.dir === -1) pts = pts.reverse();
        const lim = road.sections?.length ? Math.min(...road.sections.map((x) => x.limit)) : road.limit; // la IA va al límite más bajo de la vía
        const l = this.add(make(`${road.id}#${idx}`, 'calle', pts, kmh(lim), { road }));
        // Brazos de salida y llegada en el sentido de marcha
        const startArm = this.signals.armAt(road.id, lane.dir === 1);
        const endArm = this.signals.armAt(road.id, lane.dir !== 1);
        if (startArm) this.push(this.outgoing, startArm.id, l);
        if (endArm) {
          this.push(this.incoming, endArm.id, l);
          l.arrive = endArm;
          l.control = endArm.control;
          l.lineS = l.length - endArm.lineDist;
        }
        // Pasos de peatones de esta calle
        for (const atStart of [true, false]) {
          const cw = this.signals.crosswalk(`${road.id}:${atStart ? 'start' : 'end'}`);
          if (!cw) continue;
          const sRoad = atStart ? 3.5 : l.length - 3.5;
          l.crosswalks.push({ id: cw.id, s: lane.dir === 1 ? sRoad : l.length - sRoad });
        }
        l.crosswalks.sort((a, b) => a.s - b.s);
      });
    }
  }

  private push(m: Map<string, LanePath[]>, k: string, l: LanePath) {
    const list = m.get(k);
    if (list) list.push(l);
    else m.set(k, [l]);
  }

  /** Lado derecho relativo a la marcha (mayor = más a la derecha). */
  private rightness(l: LanePath, arm: Arm, outgoing: boolean): number {
    const p = outgoing ? l.pts[0]! : l.pts[l.pts.length - 1]!;
    const travel = outgoing ? arm.u : { x: -arm.u.x, z: -arm.u.z };
    const r = right(travel);
    return (p.x - arm.junction.x) * r.x + (p.z - arm.junction.z) * r.z;
  }

  private buildJunctions() {
    for (const j of this.map.junctions) {
      if (j.kind !== 'cruce') continue;
      const arms = this.signals.armsOf(j.id).filter((a) => a.road.kind === 'calle');
      const conns: string[] = [];
      for (const a of arms) {
        const ins = (this.incoming.get(a.id) ?? []).slice().sort((x, y) => this.rightness(y, a, false) - this.rightness(x, a, false));
        for (const b of arms) {
          if (b === a) continue;
          const outs = (this.outgoing.get(b.id) ?? []).slice().sort((x, y) => this.rightness(y, b, true) - this.rightness(x, b, true));
          if (!outs.length || !ins.length) continue;
          const din = { x: -a.u.x, z: -a.u.z };
          const dot = din.x * b.u.x + din.z * b.u.z;
          const r = right(din);
          const turn: Turn = dot > 0.7 ? 'recto' : r.x * b.u.x + r.z * b.u.z > 0 ? 'derecha' : 'izquierda';
          // Selección de carriles: derecha desde el carril derecho al derecho, izquierda desde el izquierdo.
          const pairs: [LanePath, LanePath][] = [];
          if (turn === 'derecha') pairs.push([ins[0]!, outs[0]!]);
          else if (turn === 'izquierda') pairs.push([ins[ins.length - 1]!, outs[outs.length - 1]!]);
          else ins.forEach((l, i) => pairs.push([l, outs[Math.min(i, outs.length - 1)]!]));
          for (const [from, to] of pairs) {
            const p0 = from.pts[from.pts.length - 1]!;
            const p3 = to.pts[0]!;
            const pts = turn === 'recto' ? [p0, p3] : bezier(p0, dirAt(from, true), p3, dirAt(to, false));
            const id = `${from.id}>${to.id}`;
            const c = this.add(make(id, 'conector', pts, turn === 'recto' ? Math.min(from.limit, to.limit) : kmh(turn === 'derecha' ? 16 : 22), {
              junctionId: j.id, fromArm: a.id, turn, next: [to.id],
            }));
            from.next.push(c.id);
            conns.push(c.id);
          }
        }
      }
      // Carriles que se quedaron sin salida por la regla de carril (esquinas): cualquier salida disponible
      // y, si no hay ninguna, cambio de sentido.
      for (const a of arms) {
        for (const from of this.incoming.get(a.id) ?? []) {
          if (from.next.length) continue;
          for (const b of arms) {
            if (b === a) continue;
            const din = { x: -a.u.x, z: -a.u.z };
            const r = right(din);
            const turn: Turn = din.x * b.u.x + din.z * b.u.z > 0.7 ? 'recto' : r.x * b.u.x + r.z * b.u.z > 0 ? 'derecha' : 'izquierda';
            for (const to of (this.outgoing.get(b.id) ?? []).slice(0, 1)) {
              const pts = bezier(from.pts[from.pts.length - 1]!, dirAt(from, true), to.pts[0]!, dirAt(to, false));
              const c = this.add(make(`${from.id}>${to.id}`, 'conector', pts, kmh(16), { junctionId: j.id, fromArm: a.id, turn, next: [to.id] }));
              from.next.push(c.id);
              conns.push(c.id);
            }
          }
          if (from.next.length) continue;
          for (const to of this.outgoing.get(a.id) ?? []) {
            const pts = bezier(from.pts[from.pts.length - 1]!, dirAt(from, true), to.pts[0]!, dirAt(to, false), 12);
            const c = this.add(make(`${from.id}>${to.id}`, 'conector', pts, kmh(10), { junctionId: j.id, fromArm: a.id, turn: 'izquierda', next: [to.id] }));
            from.next.push(c.id);
            conns.push(c.id);
          }
        }
      }
      this.connectorsByJunction.set(j.id, conns);
    }
  }

  private buildRoundabout() {
    const j = this.map.junctions.find((x) => x.kind === 'rotonda');
    if (!j) return;
    const c = { x: j.x, z: j.z };
    const R = (ROUNDABOUT.rIn + ROUNDABOUT.rOut) / 2 + 1; // carril exterior
    const arms = this.signals.armsOf(j.id).map((a) => ({ arm: a, phi: Math.atan2(a.u.z, a.u.x) }));
    // Sentido de marcha: ángulo decreciente. Ordenar por ángulo descendente.
    arms.sort((a, b) => b.phi - a.phi);
    const D = 0.42;
    const at = (phi: number): V2 => ({ x: c.x + R * Math.cos(phi), z: c.z + R * Math.sin(phi) });
    const tangent = (phi: number): V2 => ({ x: Math.sin(phi), z: -Math.cos(phi) });
    const arc = (p0: number, p1: number): V2[] => {
      const n = Math.max(3, Math.ceil((Math.abs(p1 - p0) * R) / 2));
      return Array.from({ length: n + 1 }, (_, i) => at(p0 + ((p1 - p0) * i) / n));
    };
    const limit = kmh(25);
    const conns: string[] = [];
    arms.forEach(({ arm, phi }, i) => {
      const nextArm = arms[(i + 1) % arms.length]!;
      let phiNext = nextArm.phi;
      while (phiNext >= phi) phiNext -= Math.PI * 2;
      const pass = this.add(make(`rot-pasa-${arm.id}`, 'anillo', arc(phi + D, phi - D), limit, { junctionId: j.id }));
      const link = this.add(make(`rot-tramo-${arm.id}`, 'anillo', arc(phi - D, phiNext + D), limit, { junctionId: j.id }));
      this.ringPassByArm.set(arm.id, pass.id);
      this.ringLinkBeforeArm.set(nextArm.arm.id, link.id);
      pass.next.push(link.id);
      conns.push(pass.id, link.id);
    });
    arms.forEach(({ arm, phi }) => {
      const pass = this.get(this.ringPassByArm.get(arm.id)!);
      const linkBefore = this.get(this.ringLinkBeforeArm.get(arm.id)!);
      const link = this.get(pass.next[0]!);
      linkBefore.next.push(pass.id);
      // Entrada: del carril que llega a la rotonda al inicio del tramo siguiente.
      for (const from of this.incoming.get(arm.id) ?? []) {
        const p0 = from.pts[from.pts.length - 1]!;
        const e = this.add(make(`rot-entra-${from.id}`, 'conector', bezier(p0, dirAt(from, true), at(phi - D), tangent(phi - D), 8), limit, {
          junctionId: j.id, fromArm: arm.id, turn: 'derecha', next: [link.id],
        }));
        from.next.push(e.id);
        conns.push(e.id);
      }
      // Salida: desde el final del tramo anterior hacia el carril que sale por este brazo.
      for (const to of this.outgoing.get(arm.id) ?? []) {
        const x = this.add(make(`rot-sale-${to.id}`, 'conector', bezier(at(phi + D), tangent(phi + D), to.pts[0]!, dirAt(to, false), 8), limit, {
          junctionId: j.id, turn: 'derecha', next: [to.id],
        }));
        linkBefore.next.push(x.id);
        conns.push(x.id);
      }
    });
    this.connectorsByJunction.set(j.id, conns);
  }

  private buildHighway() {
    const ring = this.map.roads.find((r) => r.kind === 'autovia');
    if (!ring) return;
    ring.lanes.forEach((lane, i) => {
      let pts = offsetLine(ring.pts, lane.offset, true);
      if (lane.dir === -1) pts = pts.reverse();
      const l = this.add(make(`autovia#${i}`, 'autovia', pts, kmh(ring.limit), { closed: true, road: ring }));
      l.next.push(l.id);
    });
  }
}

/** Punto, rumbo y tangente a una distancia s de la trayectoria. */
export function pointAt(l: LanePath, s: number): { x: number; z: number; heading: number } {
  const L = l.length;
  let ss = l.closed ? ((s % L) + L) % L : Math.max(0, Math.min(L, s));
  const n = l.pts.length;
  let lo = 0;
  let hi = l.cum.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (l.cum[mid]! <= ss) lo = mid;
    else hi = mid;
  }
  const a = l.pts[lo % n]!;
  const b = l.pts[(lo + 1) % n] ?? a;
  const segLen = l.cum[lo + 1]! - l.cum[lo]! || 1;
  ss = Math.min(segLen, ss - l.cum[lo]!);
  const t = ss / segLen;
  return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t, heading: Math.atan2(b.x - a.x, b.z - a.z) };
}

let shared: LaneGraph | null = null;
export function getLaneGraph(map: WorldMap, signals: Signals): LaneGraph {
  if (!shared || shared.map !== map) shared = new LaneGraph(map, signals);
  return shared;
}
