/**
 * Peatones (sin Three.js ni DOM, testeable).
 *
 * Cada peatón rodea una manzana por la acera. Al llegar a una esquina puede
 * cruzar por el paso de peatones a la manzana vecina: espera en el bordillo
 * hasta que ningún vehículo se acerque deprisa y entonces cruza. Mientras
 * cruza, el paso queda «ocupado» y los vehículos deben detenerse.
 */
import { heightAt, JUNCTION_R, ROUNDABOUT, type Block, type Junction, type V2, type WorldMap } from '../world/map';
import type { Signals } from '../world/signals';

const SIDE = 5; // distancia del eje de la calle al centro de la acera

interface CornerCrossing {
  cw: string;
  /** Punto del arco de esquina junto a ese brazo, bordillo de salida y de llegada. */
  arcEnd: V2;
  p1: V2;
  p2: V2;
  block: number;
}

interface LoopPoint extends V2 {
  /** Esquina desde la que se puede cruzar a las manzanas vecinas. */
  corner?: CornerCrossing[];
}

export interface Pedestrian {
  id: number;
  x: number;
  z: number;
  y: number;
  heading: number;
  speed: number;
  phase: number; // para la animación de paso
  color: number;
  state: 'walk' | 'wait' | 'cross';
  /** Puntos pendientes del tramo actual. */
  route: V2[];
  block: number;
  idx: number;
  dir: 1 | -1;
  crosswalk: string | null;
  /** Tras cruzar: manzana y esquina donde continuar. */
  after: { block: number; point: V2 } | null;
  waitT: number;
  pauseT: number;
  /** Puntos que quedan del cruce (bordillo de enfrente y esquina). */
  pending: V2[];
  /** Cruza sin esperar a que no se acerque nadie (lección de peatones). */
  bold?: boolean;
}

export interface PedEnv {
  /** ¿Se acerca algún vehículo deprisa a este paso de peatones? */
  vehicleApproaching: (crosswalkId: string) => boolean;
}

const COLORS = [0x2f4b7c, 0x8c2d2d, 0x2e6b4f, 0x6b4f2e, 0x444b57, 0x9b6a9e, 0xc4a35a, 0x3f7f9f];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cornerR = (j: Junction) => (j.kind === 'rotonda' ? ROUNDABOUT.rOut : JUNCTION_R) + 1.5;
const right = (d: V2): V2 => ({ x: -d.z, z: d.x });

/** Desplaza lateralmente una polilínea (positivo = derecha). */
function offset(pts: V2[], o: number): V2[] {
  const n = pts.length;
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)]!, b = pts[Math.min(n - 1, i + 1)]!;
    const l = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    const r = right({ x: (b.x - a.x) / l, z: (b.z - a.z) / l });
    return { x: p.x + r.x * o, z: p.z + r.z * o };
  });
}

export class Pedestrians {
  peds: Pedestrian[] = [];
  private loops: LoopPoint[][] = [];
  private rand: () => number;
  /** Peatones cruzando por cada paso. */
  private crossing = new Map<string, number>();

  private map: WorldMap;

  constructor(readonly signals: Signals, count: number, seed = 5) {
    this.rand = rng(seed);
    this.map = signals.map;
    this.loops = this.map.blocks.map((b) => this.blockLoop(b));
    this.map.blocks.forEach((b, bi) => this.addCrossings(b, bi));
    for (let n = 0; n < count; n++) {
      const block = Math.floor(this.rand() * this.loops.length);
      const loop = this.loops[block]!;
      const idx = Math.floor(this.rand() * loop.length);
      const a = loop[idx]!;
      const b = loop[(idx + 1) % loop.length]!;
      const t = this.rand();
      const p: Pedestrian = {
        id: n + 1, x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t, y: 0, heading: 0,
        speed: 1.1 + this.rand() * 0.5, phase: this.rand() * 6, color: COLORS[n % COLORS.length]!,
        state: 'walk', route: [], block, idx, dir: 1, crosswalk: null, after: null, waitT: 0, pauseT: 0, pending: [],
      };
      p.route = [b];
      p.idx = (idx + 1) % loop.length;
      this.peds.push(p);
    }
  }

  private pool: Pedestrian[] = [];

  get capacity() {
    return this.peds.length + this.pool.length;
  }

  /** Ajusta cuántos peatones hay (reserva sin crear objetos); solo se retiran los que no están cruzando. */
  setActive(n: number) {
    n = Math.max(0, Math.min(this.capacity, Math.round(n)));
    while (this.peds.length > n) {
      const i = this.peds.findIndex((p) => !p.crosswalk && p.state === 'walk' && !p.bold);
      if (i < 0) break;
      this.pool.push(this.peds.splice(i, 1)[0]!);
    }
    while (this.peds.length < n && this.pool.length) this.peds.push(this.pool.pop()!);
  }

  /** ¿Hay alguien cruzando por este paso? */
  busy(id: string): boolean {
    return (this.crossing.get(id) ?? 0) > 0;
  }

  /**
   * Lecciones: un peatón llega al paso indicado y cruza en cuanto pueda (tiene
   * prioridad en el paso de cebra, así que no espera a que no venga nadie).
   */
  forceCrossing(cw: { id: string; center: V2; along: V2; halfWidth: number }) {
    const p = this.peds.find((q) => q.state === 'walk' && !q.crosswalk) ?? this.peds[0];
    if (!p) return;
    const r = { x: -cw.along.z, z: cw.along.x };
    const side = cw.halfWidth + 1.5;
    const a = { x: cw.center.x + r.x * side, z: cw.center.z + r.z * side };
    const b = { x: cw.center.x - r.x * side, z: cw.center.z - r.z * side };
    p.x = a.x;
    p.z = a.z;
    p.route = [];
    p.state = 'wait';
    p.waitT = 0;
    p.crosswalk = cw.id;
    p.pending = [b, { x: b.x + cw.along.x * 1.5, z: b.z + cw.along.z * 1.5 }];
    p.after = null;
    p.bold = true;
  }

  /** Detiene un momento al peatón (p. ej. tras un susto o un atropello). */
  startle(p: Pedestrian, seconds = 3) {
    p.pauseT = Math.max(p.pauseT, seconds);
  }

  step(dt: number, env: PedEnv) {
    for (const p of this.peds) this.move(p, dt, env);
  }

  /**
   * Recorrido por la acera de una manzana: el borde de cada calle desplazado hacia
   * dentro y, en cada esquina, un arco por la acera del cruce.
   */
  private blockLoop(b: Block): LoopPoint[] {
    const lines = b.edges.map((e) => {
      let pts = e.road.pts;
      const d0 = Math.hypot(pts[0]!.x - e.from.x, pts[0]!.z - e.from.z);
      const d1 = Math.hypot(pts[pts.length - 1]!.x - e.from.x, pts[pts.length - 1]!.z - e.from.z);
      if (d1 < d0) pts = [...pts].reverse();
      const mid = pts[Math.floor(pts.length / 2)]!;
      const nxt = pts[Math.floor(pts.length / 2) + 1] ?? pts[pts.length - 1]!;
      const t = { x: nxt.x - mid.x, z: nxt.z - mid.z };
      const sign = Math.sign((b.center.x - mid.x) * -t.z + (b.center.z - mid.z) * t.x) || 1;
      const off = offset(pts, sign * SIDE);
      return off.filter((q) => Math.hypot(q.x - e.from.x, q.z - e.from.z) > cornerR(e.from) && Math.hypot(q.x - e.to.x, q.z - e.to.z) > cornerR(e.to));
    });
    const out: LoopPoint[] = [];
    b.edges.forEach((e, k) => {
      const line = lines[k]!;
      const next = lines[(k + 1) % 4]!;
      out.push(...line);
      // Arco de esquina en e.to, del final de este lado al comienzo del siguiente.
      const J = e.to;
      const R = cornerR(J);
      const p0 = line[line.length - 1]!, p1 = next[0]!;
      const a0 = Math.atan2(p0.z - J.z, p0.x - J.x);
      let a1 = Math.atan2(p1.z - J.z, p1.x - J.x);
      while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
      while (a0 - a1 > Math.PI) a1 += 2 * Math.PI;
      const steps = 6;
      for (let s = 0; s <= steps; s++) {
        const a = a0 + ((a1 - a0) * s) / steps;
        out.push({ x: J.x + R * Math.cos(a), z: J.z + R * Math.sin(a) });
      }
    });
    return out;
  }

  /** Marca en el punto medio de cada esquina los pasos de peatones por los que se puede cruzar. */
  private addCrossings(b: Block, bi: number) {
    const loop = this.loops[bi]!;
    b.edges.forEach((e, k) => {
      const J = e.to;
      const nextRoad = b.edges[(k + 1) % 4]!.road;
      // Punto medio del arco de esa esquina
      const R = cornerR(J);
      const arc = loop.filter((q) => Math.abs(Math.hypot(q.x - J.x, q.z - J.z) - R) < 0.05);
      if (arc.length < 3) return;
      const mid = arc[Math.floor(arc.length / 2)]!;
      const options: CornerCrossing[] = [];
      for (const [road, end] of [[e.road, arc[0]!], [nextRoad, arc[arc.length - 1]!]] as const) {
        const atStart = Math.hypot(road.pts[0]!.x - J.x, road.pts[0]!.z - J.z) < Math.hypot(road.pts[road.pts.length - 1]!.x - J.x, road.pts[road.pts.length - 1]!.z - J.z);
        const cw = this.signals.crosswalk(`${road.id}:${atStart ? 'start' : 'end'}`);
        const nb = this.map.blocks.findIndex((o, oi) => oi !== bi && o.edges.some((oe) => oe.road === road));
        if (!cw || nb < 0) continue;
        const r = right(cw.along);
        const sb = Math.sign((b.center.x - cw.center.x) * r.x + (b.center.z - cw.center.z) * r.z) || 1;
        options.push({
          cw: cw.id, arcEnd: end, block: nb,
          p1: { x: cw.center.x + r.x * sb * SIDE, z: cw.center.z + r.z * sb * SIDE },
          p2: { x: cw.center.x - r.x * sb * SIDE, z: cw.center.z - r.z * sb * SIDE },
        });
      }
      if (options.length) mid.corner = options;
    });
  }

  /** Al llegar a una esquina, decide si cruza a la manzana vecina. */
  private maybeCross(p: Pedestrian, pt: LoopPoint): boolean {
    if (!pt.corner || this.rand() > 0.4) return false;
    const o = pt.corner[Math.floor(this.rand() * pt.corner.length)]!;
    const loop = this.loops[o.block]!;
    let best = loop[0]!;
    for (const q of loop) if (Math.hypot(q.x - o.p2.x, q.z - o.p2.z) < Math.hypot(best.x - o.p2.x, best.z - o.p2.z)) best = q;
    p.route = [o.arcEnd, o.p1];
    p.crosswalk = o.cw;
    p.after = { block: o.block, point: best };
    p.pending = [o.p2, best];
    return true;
  }

  private move(p: Pedestrian, dt: number, env: PedEnv) {
    p.phase += dt * p.speed * 5;
    if (p.pauseT > 0) {
      p.pauseT -= dt;
      return;
    }
    if (p.state === 'wait') {
      p.waitT += dt;
      if (p.crosswalk && ((p.bold && p.waitT > 0.8) || !env.vehicleApproaching(p.crosswalk))) {
        p.state = 'cross';
        this.crossing.set(p.crosswalk, (this.crossing.get(p.crosswalk) ?? 0) + 1);
        p.route = p.pending.slice(0, 1);
      } else if (p.waitT > 25) {
        // Se cansa de esperar: sigue por su acera.
        p.state = 'walk';
        p.crosswalk = null;
        p.after = null;
        this.nextLoopPoint(p);
      }
      return;
    }
    const target = p.route[0];
    if (!target) {
      this.nextLoopPoint(p);
      return;
    }
    const dx = target.x - p.x;
    const dz = target.z - p.z;
    const d = Math.hypot(dx, dz);
    const step = p.speed * dt;
    if (d > 1e-3) p.heading = Math.atan2(dx, dz);
    if (d > step) {
      p.x += (dx / d) * step;
      p.z += (dz / d) * step;
    } else {
      p.x = target.x;
      p.z = target.z;
      p.route.shift();
      this.arrived(p);
    }
    p.y = heightAt(p.x, p.z) + (p.state === 'cross' ? 0 : 0.15);
  }

  private arrived(p: Pedestrian) {
    if (p.crosswalk && p.state === 'walk' && p.route.length === 0) {
      // En el bordillo: esperar a que sea seguro.
      p.state = 'wait';
      p.waitT = 0;
      return;
    }
    if (p.state === 'cross' && p.route.length === 0) {
      // Fin del cruce: liberar el paso y subir a la acera de enfrente.
      if (p.crosswalk) this.crossing.set(p.crosswalk, Math.max(0, (this.crossing.get(p.crosswalk) ?? 1) - 1));
      p.state = 'walk';
      p.crosswalk = null;
      p.route = p.pending.slice(1);
      p.pending = [];
      return;
    }
    if (p.state === 'walk' && p.route.length === 0 && p.bold && !p.after) {
      // Tras un cruce forzado: volver al recorrido de acera más cercano.
      let best = { block: p.block, idx: p.idx, d: Infinity };
      this.loops.forEach((loop, b) => loop.forEach((q, i) => {
        const d = Math.hypot(q.x - p.x, q.z - p.z);
        if (d < best.d) best = { block: b, idx: i, d };
      }));
      p.block = best.block;
      p.idx = best.idx;
      p.bold = false;
      p.route = [this.loops[best.block]![best.idx]!];
      return;
    }
    if (p.state === 'walk' && p.route.length === 0 && p.after) {
      // Continúa por la nueva manzana desde la esquina a la que ha llegado.
      const loop = this.loops[p.after.block]!;
      const pt = p.after.point;
      let best = 0;
      loop.forEach((q, i) => {
        if (Math.hypot(q.x - pt.x, q.z - pt.z) < Math.hypot(loop[best]!.x - pt.x, loop[best]!.z - pt.z)) best = i;
      });
      p.block = p.after.block;
      p.idx = best;
      p.dir = this.rand() < 0.5 ? 1 : -1;
      p.after = null;
    }
  }

  private nextLoopPoint(p: Pedestrian) {
    const loop = this.loops[p.block]!;
    const here = loop[p.idx]!;
    if (Math.hypot(here.x - p.x, here.z - p.z) < 0.5 && this.maybeCross(p, here)) return;
    p.idx = (p.idx + p.dir + loop.length) % loop.length;
    p.route = [loop[p.idx]!];
  }
}

export interface VehicleView {
  x: number;
  z: number;
  heading: number;
  v: number;
}

/** ¿Algún vehículo está sobre el paso o se acerca a él con velocidad? */
export function approachingCrosswalk(cw: { center: V2; along: V2; halfWidth: number }, vehicles: Iterable<VehicleView>): boolean {
  for (const v of vehicles) {
    const dx = v.x - cw.center.x;
    const dz = v.z - cw.center.z;
    const along = dx * cw.along.x + dz * cw.along.z;
    const lat = -dx * cw.along.z + dz * cw.along.x;
    if (Math.abs(lat) > cw.halfWidth + 0.8 || Math.abs(along) > 26) continue;
    if (Math.abs(along) < 4.5 && v.v > 0.3) return true; // encima o casi
    const toward = -(Math.sin(v.heading) * cw.along.x + Math.cos(v.heading) * cw.along.z) * Math.sign(along) * v.v;
    // Llega en menos de ~4 s y no está frenando del todo
    if (toward > 1.5 && (Math.abs(along) - 4) / toward < 4) return true;
  }
  return false;
}
