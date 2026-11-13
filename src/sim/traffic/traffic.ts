/**
 * Tráfico de la IA (sin Three.js ni DOM, testeable).
 *
 * Cada coche avanza por la red de carriles con el modelo IDM (Intelligent
 * Driver Model): acelera hasta su velocidad deseada y frena ante el obstáculo
 * más cercano de su trayectoria: otro coche, el coche del alumno, una línea
 * de detención (semáforo en rojo/ámbar, STOP, ceda el paso, rotonda) o un paso
 * de peatones ocupado. En las curvas y conectores reduce antes de llegar.
 */
import { lightColor, type Arm, type Signals } from '../world/signals';
import { JUNCTION_R, ROUNDABOUT, type Junction } from '../world/map';
import { pointAt, type LaneGraph, type LanePath } from './lanes';

export const CAR_LEN = 4.3;
const IDM = { a: 1.6, b: 2.8, s0: 2.2, T: 1.3 };
const LOOK = 80;

export interface PlayerView {
  x: number;
  z: number;
  heading: number;
  v: number;
}

export interface TrafficEnv {
  t: number;
  player: PlayerView | null;
  crosswalkBusy: (id: string) => boolean;
}

export interface AICar {
  id: number;
  lane: LanePath;
  prev: LanePath | null;
  s: number; // posición del paragolpes delantero
  v: number;
  factor: number;
  plan: LanePath[];
  color: number;
  waitT: number;
  stuckT: number;
  cleared: Set<string>;
  x: number;
  z: number;
  heading: number;
  braking: boolean;
  blinker: 'izquierda' | 'derecha' | null;
}

const COLORS = [0xd9d9d9, 0x1f1f22, 0x8f969e, 0xb3261e, 0x1d3f8a, 0xe8e3d3, 0x2e5c3a, 0x5b3b8c, 0xc79a2b, 0x40464f];

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

interface PathEntry {
  lane: LanePath;
  /** Distancia desde el morro del coche hasta el inicio de este carril. */
  d0: number;
}

export class Traffic {
  cars: AICar[] = [];
  private rand: () => number;
  private byLane = new Map<string, AICar[]>();
  private nextId = 1;
  private cityLanes: LanePath[];
  private highwayLanes: LanePath[];
  enabled = true;

  constructor(readonly graph: LaneGraph, readonly signals: Signals, opts: { city: number; highway: number; seed?: number; avoid?: { x: number; z: number } }) {
    this.rand = rng(opts.seed ?? 7);
    this.cityLanes = [...graph.lanes.values()].filter((l) => l.kind === 'calle');
    this.highwayLanes = [...graph.lanes.values()].filter((l) => l.kind === 'autovia');
    for (let i = 0; i < opts.city; i++) this.spawnCity(opts.avoid ?? null);
    for (let i = 0; i < opts.highway; i++) {
      const lane = this.highwayLanes[i % this.highwayLanes.length]!;
      const k = Math.floor(i / this.highwayLanes.length);
      const per = Math.ceil(opts.highway / this.highwayLanes.length);
      this.addCar(lane, ((k + this.rand() * 0.5) / per) * lane.length, lane.id.endsWith('#0') || lane.id.endsWith('#2') ? 0.95 : 0.82);
    }
    this.reindex();
    for (const c of this.cars) this.place(c);
  }

  private addCar(lane: LanePath, s: number, factor: number) {
    const c: AICar = {
      id: this.nextId++, lane, prev: null, s, v: lane.limit * factor * 0.6, factor, plan: [],
      color: COLORS[Math.floor(this.rand() * COLORS.length)]!, waitT: 0, stuckT: 0, cleared: new Set(),
      x: 0, z: 0, heading: 0, braking: false, blinker: null,
    };
    this.cars.push(c);
    return c;
  }

  private freeSpot(lane: LanePath, s: number, avoid: { x: number; z: number } | null): boolean {
    if (this.cars.some((c) => c.lane === lane && Math.abs(c.s - s) < 16)) return false;
    if (avoid) {
      const p = pointAt(lane, s);
      if (Math.hypot(p.x - avoid.x, p.z - avoid.z) < 45) return false;
    }
    return true;
  }

  private spawnCity(avoid: { x: number; z: number } | null, car?: AICar) {
    for (let tries = 0; tries < 60; tries++) {
      const lane = this.cityLanes[Math.floor(this.rand() * this.cityLanes.length)]!;
      if (lane.length < 40) continue;
      const s = 8 + this.rand() * (lane.length - 30);
      if (!this.freeSpot(lane, s, avoid)) continue;
      if (car) {
        Object.assign(car, { lane, prev: null, s, v: 0, plan: [], waitT: 0, stuckT: 0 });
        car.cleared.clear();
        return;
      }
      this.addCar(lane, s, 0.85 + this.rand() * 0.15);
      return;
    }
  }

  /** Coloca un coche en un carril concreto (lecciones: vehículo lento delante). */
  spawnAt(laneId: string, s: number, kmh: number): AICar {
    const lane = this.graph.get(laneId);
    // Reutiliza un coche de la reserva si lo hay; si no, recoloca uno que no esté en un cruce (nunca se supera la capacidad).
    let c = this.pool.pop() ?? null;
    if (c) this.cars.push(c);
    else c = this.cars.find((x) => x.lane.kind !== 'conector' && x.lane.kind !== 'anillo') ?? this.addCar(lane, s, 1);
    Object.assign(c, { lane, prev: null, s, plan: [], waitT: 0, stuckT: 0, factor: Math.min(1.2, kmh / 3.6 / lane.limit) });
    c.cleared.clear();
    this.pinned = c;
    c.v = kmh / 3.6;
    c.color = 0xc79a2b;
    this.reindex();
    this.place(c);
    return c;
  }

  /** Coches retirados por la calidad adaptativa (reserva: se reutilizan, no se crean ni destruyen). */
  private pool: AICar[] = [];

  /** Total de coches (activos + reserva). */
  get capacity() {
    return this.cars.length + this.pool.length;
  }

  /**
   * Ajusta cuántos coches circulan. Los que sobran pasan a la reserva (los más
   * lejanos del alumno y que no estén dentro de un cruce); al subir, se
   * recolocan lejos del alumno.
   */
  setActive(n: number, player: { x: number; z: number } | null) {
    n = Math.max(0, Math.min(this.capacity, Math.round(n)));
    if (this.cars.length > n) {
      const far = (c: AICar) => (player ? Math.hypot(c.x - player.x, c.z - player.z) : 0);
      const removable = this.cars.filter((c) => c.lane.kind !== 'conector' && c.lane.kind !== 'anillo' && c !== this.pinned).sort((a, b) => far(b) - far(a));
      for (const c of removable.slice(0, this.cars.length - n)) {
        this.cars.splice(this.cars.indexOf(c), 1);
        this.pool.push(c);
      }
    } else {
      while (this.cars.length < n && this.pool.length) {
        const c = this.pool.pop()!;
        if (c.lane.kind === 'autovia') c.s = (c.s + 300) % c.lane.length;
        else this.spawnCity(player, c);
        this.cars.push(c);
      }
    }
    this.reindex();
    for (const c of this.cars) this.place(c);
  }

  /** Coche que no debe retirarse (vehículo lento de una lección). */
  pinned: AICar | null = null;

  /** Recoloca los coches que estén cerca de un punto (al teletransportar al alumno). */
  clearAround(x: number, z: number, r: number) {
    for (const c of this.cars) {
      if (Math.hypot(c.x - x, c.z - z) >= r) continue;
      if (c.lane.kind === 'autovia') c.s = (c.s + 250) % c.lane.length;
      else this.spawnCity({ x, z }, c);
    }
    this.reindex();
    for (const c of this.cars) this.place(c);
  }

  private reindex() {
    this.byLane.clear();
    for (const c of this.cars) {
      const l = this.byLane.get(c.lane.id);
      if (l) l.push(c);
      else this.byLane.set(c.lane.id, [c]);
    }
  }

  // ------------------------------------------------------------------ rutas
  private choose(from: LanePath): LanePath {
    const opts = from.next.map((id) => this.graph.get(id));
    if (opts.length === 1) return opts[0]!;
    const w = opts.map((o) => {
      if (o.id.startsWith('rot-sale')) return 1.3; // salir de la rotonda
      if (o.id.startsWith('rot-pasa')) return 1;
      return o.turn === 'recto' ? 2 : 1;
    });
    let r = this.rand() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < opts.length; i++) {
      r -= w[i]!;
      if (r <= 0) return opts[i]!;
    }
    return opts[opts.length - 1]!;
  }

  private path(c: AICar): PathEntry[] {
    const out: PathEntry[] = [{ lane: c.lane, d0: -c.s }];
    if (c.lane.closed) {
      out.push({ lane: c.lane, d0: c.lane.length - c.s });
      return out;
    }
    let d = c.lane.length - c.s;
    let last = c.lane;
    let i = 0;
    while (d < LOOK) {
      let nxt = c.plan[i];
      if (!nxt) {
        nxt = this.choose(last);
        c.plan.push(nxt);
      }
      out.push({ lane: nxt, d0: d });
      d += nxt.length;
      last = nxt;
      i++;
    }
    return out;
  }

  // ------------------------------------------------------------------ prioridades
  private boxCars(j: Junction, exceptArm?: string): boolean {
    for (const c of this.cars) {
      // En el cruce: sobre un conector, o recién salido con la parte trasera aún dentro.
      const conn = c.lane.kind === 'conector' ? c.lane : c.prev?.kind === 'conector' && c.s < CAR_LEN + 1.5 ? c.prev : null;
      if (conn && conn.junctionId === j.id) {
        if (!exceptArm || conn.fromArm !== exceptArm) return true;
        continue;
      }
      // Ya ha decidido entrar (ha pasado su STOP / ceda) aunque aún no esté dentro.
      const arr = c.lane.arrive;
      if (arr && arr.junction.id === j.id && c.cleared.has(c.lane.id) && (!exceptArm || arr.id !== exceptArm)) return true;
    }
    return false;
  }

  private playerInBox(j: Junction, p: PlayerView | null) {
    return !!p && Math.hypot(p.x - j.x, p.z - j.z) < JUNCTION_R + 1;
  }

  /** ¿Algún vehículo se acerca por este brazo (a menos de `dist` y moviéndose)? */
  approaching(arm: Arm, p: PlayerView | null, dist = 48, filter?: (c: AICar) => boolean): boolean {
    for (const lane of this.graph.incoming.get(arm.id) ?? []) {
      for (const c of this.byLane.get(lane.id) ?? []) {
        if (filter && !filter(c)) continue;
        const rem = lane.length - c.s;
        if (rem < dist && (c.v > 0.8 || rem < 5)) return true;
      }
    }
    if (p) {
      const j = arm.junction;
      const dx = p.x - j.x, dz = p.z - j.z;
      const along = dx * arm.u.x + dz * arm.u.z;
      const lat = -dx * arm.u.z + dz * arm.u.x;
      const toward = -(Math.sin(p.heading) * arm.u.x + Math.cos(p.heading) * arm.u.z) * p.v;
      if (along > 3 && along < dist && Math.abs(lat) < arm.road.width / 2 + 0.5 && toward > 0.8) return true;
    }
    return false;
  }

  /** ¿Puede entrar en el cruce quien llega por `arm` (que debe ceder)? */
  clearToEnter(arm: Arm, p: PlayerView | null, turn?: string, selfId = 0): boolean {
    const j = arm.junction;
    if (arm.control === 'rotonda') return this.roundaboutClear(arm, p);
    // Quien gira a la izquierda cede a quien viene de frente (salvo que este también gire a la izquierda).
    if (turn === 'izquierda') {
      const opp = this.signals.armsOf(j.id).find((b) => b.u.x * arm.u.x + b.u.z * arm.u.z < -0.9);
      // Dos giros a la izquierda enfrentados: pasa primero el de menor id (evita bloqueos y choques).
      if (opp && this.approaching(opp, p, 45, (c) => c.plan[0]?.turn !== 'izquierda' || c.id < selfId)) return false;
    }
    if (arm.control === 'prioridad' || arm.control === 'semaforo') {
      return !(this.boxCars(j, arm.id) || this.playerInBox(j, p));
    }
    if (this.boxCars(j) || this.playerInBox(j, p)) return false;
    for (const other of this.signals.armsOf(j.id)) {
      if (other === arm) continue;
      if (other.control === 'prioridad' && this.approaching(other, p)) return false;
    }
    return true;
  }

  private roundaboutClear(arm: Arm, p: PlayerView | null): boolean {
    const pass = this.graph.ringPassByArm.get(arm.id);
    const before = this.graph.ringLinkBeforeArm.get(arm.id);
    if (pass && (this.byLane.get(pass)?.length ?? 0) > 0) return false;
    if (before) {
      const lane = this.graph.get(before);
      for (const c of this.byLane.get(before) ?? []) if (lane.length - c.s < 16) return false;
      // Coches saliendo del anillo por este brazo no molestan; los que entran por el brazo anterior sí.
    }
    if (p) {
      const j = arm.junction;
      const r = Math.hypot(p.x - j.x, p.z - j.z);
      const phi = Math.atan2(arm.u.z, arm.u.x);
      const ex = j.x + 15 * Math.cos(phi + 0.6), ez = j.z + 15 * Math.sin(phi + 0.6);
      if (r < ROUNDABOUT.rOut + 1 && r > ROUNDABOUT.rIn - 1 && Math.hypot(p.x - ex, p.z - ez) < 15) return false;
    }
    return true;
  }

  // ------------------------------------------------------------------ paso
  step(dt: number, env: TrafficEnv) {
    if (!this.enabled) return;
    this.reindex();
    for (const c of this.cars) this.drive(c, dt, env);
    this.reindex();
    for (const c of this.cars) this.place(c);
  }

  private drive(c: AICar, dt: number, env: TrafficEnv) {
    const path = this.path(c);
    let gap = Infinity;
    let vLead = 0;
    const consider = (g: number, v: number) => {
      if (g < gap) {
        gap = g;
        vLead = v;
      }
    };
    let v0 = c.lane.limit * c.factor;
    let stopFound = false;
    c.blinker = null;

    for (let k = 0; k < path.length; k++) {
      const e = path[k]!;
      const lane = e.lane;
      // Velocidad de los carriles siguientes (curvas): frenar a tiempo.
      if (k > 0 && lane.limit * c.factor < v0) v0 = Math.min(v0, Math.sqrt((lane.limit * c.factor) ** 2 + 2 * 1.8 * Math.max(0, e.d0)));
      if (k > 0 && lane.turn && lane.turn !== 'recto' && e.d0 < 35 && lane.kind === 'conector') c.blinker ??= lane.turn;
      // Coches en este carril
      for (const o of this.byLane.get(lane.id) ?? []) {
        if (o === c) continue;
        let d = e.d0 + o.s;
        if (k === 0 && o.s <= c.s) {
          if (!lane.closed) continue;
          d += lane.length; // bucle de autovía
        }
        if (k === 1 && lane.closed && lane === c.lane) continue; // ya contado
        consider(d - CAR_LEN, o.v);
      }
      // Incorporación: coches en otros carriles que desembocan en el mismo carril siguiente.
      if (k <= 1 && !lane.closed && lane.next.length === 1) {
        const target = lane.next[0]!;
        const myEnd = e.d0 + lane.length;
        for (const sib of this.graph.feeders.get(target) ?? []) {
          if (sib === lane.id) continue;
          const sl = this.graph.get(sib);
          for (const o of this.byLane.get(sib) ?? []) {
            const ahead = myEnd - (sl.length - o.s);
            if (ahead > 0.5 && sl.length - o.s < 25) consider(ahead - CAR_LEN, o.v);
          }
        }
      }
      // Pasos de peatones
      for (const cw of lane.crosswalks) {
        const d = e.d0 + cw.s;
        if (d - 2.6 < -0.5 || d > LOOK) continue;
        // IDM mantiene s0 de separación: se compensa para detenerse ~1 m antes del paso.
        if (env.crosswalkBusy(cw.id)) consider(d - 2.6 - 1 + IDM.s0, 0);
      }
      // Línea de detención al final de este carril
      if (!stopFound && lane.lineS !== undefined && lane.arrive && !c.cleared.has(lane.id)) {
        const d = e.d0 + lane.lineS;
        if (d > -0.5 && d < LOOK) {
          const turn = path[k + 1]?.lane.turn;
          const stop = this.mustStop(c, lane, lane.arrive, d, turn, env, dt);
          if (stop) {
            // Parar con el morro ~0,6 m antes de la línea (se compensa la separación s0 del IDM).
            consider(d - 0.6 + IDM.s0, 0);
            stopFound = true;
          }
        }
      }
    }
    // Coche del alumno sobre la trayectoria
    const p = env.player;
    if (p && Math.hypot(p.x - c.x, p.z - c.z) < LOOK + 10) {
      for (let d = 1; d < Math.min(gap + 4, LOOK); d += 2) {
        const pos = this.posAlong(path, d);
        if (!pos) break;
        if (Math.hypot(pos.x - p.x, pos.z - p.z) < 2.1) {
          consider(d - 2.4, Math.max(0, p.v * Math.cos(p.heading - pos.heading)));
          break;
        }
      }
    }

    // IDM
    v0 = Math.max(0.5, v0);
    const v = c.v;
    const sStar = IDM.s0 + Math.max(0, v * IDM.T + (v * (v - vLead)) / (2 * Math.sqrt(IDM.a * IDM.b)));
    const g = Math.max(0.05, gap);
    let acc = IDM.a * (1 - (v / v0) ** 4 - (gap === Infinity ? 0 : (sStar / g) ** 2));
    acc = Math.max(-9, Math.min(IDM.a, acc));
    c.braking = acc < -0.8 || (v < 0.2 && gap < 6);
    c.v = Math.max(0, v + acc * dt);
    if (gap < 0.05) c.v = 0;
    c.s += c.v * dt;

    while (c.s > c.lane.length) {
      if (c.lane.closed) {
        c.s -= c.lane.length;
        continue;
      }
      c.s -= c.lane.length;
      c.prev = c.lane;
      c.lane = c.plan.shift() ?? this.choose(c.lane);
      c.waitT = 0;
      if (c.lane.kind === 'calle') c.cleared.clear();
    }

    c.stuckT = c.v < 0.05 ? c.stuckT + dt : 0;
    if (c.stuckT > 40 && c.lane.kind !== 'autovia' && (!p || Math.hypot(p.x - c.x, p.z - c.z) > 110)) this.spawnCity(p, c);
  }

  private mustStop(c: AICar, lane: LanePath, arm: Arm, d: number, turn: string | undefined, env: TrafficEnv, dt: number): boolean {
    const p = env.player;
    switch (arm.control) {
      case 'semaforo': {
        const col = lightColor(arm.junction.id, arm.axis, env.t);
        if (col === 'rojo') return true;
        if (col === 'ambar') return d > (c.v * c.v) / (2 * 3.2) + 1;
        if (turn === 'izquierda' && d < 12 && !this.clearToEnter(arm, p, turn, c.id)) return true;
        // Con verde tampoco se entra si otro vehículo sigue dentro del cruce (p. ej., un giro a la izquierda que no ha podido salir).
        if (d < 8 && d > 0.5 && this.boxCars(arm.junction, arm.id)) return true;
        return false;
      }
      case 'stop': {
        if (d < 1.5 && c.v < 0.3) c.waitT += dt;
        if (c.waitT > 1.2 && this.clearToEnter(arm, p, turn, c.id)) {
          c.cleared.add(lane.id);
          return false;
        }
        return true;
      }
      case 'ceda':
      case 'rotonda': {
        if (d > 14) return false; // aún lejos: decidirá al acercarse
        if (this.clearToEnter(arm, p, turn, c.id)) {
          if (d < 4) c.cleared.add(lane.id);
          return false;
        }
        return !(d < 0.8 && c.v > 2.5); // demasiado tarde para parar: sigue
      }
      case 'prioridad': {
        if (d > 10) return false;
        if (this.clearToEnter(arm, p, turn, c.id)) {
          if (d < 3) c.cleared.add(lane.id);
          return false;
        }
        return !(d < 1.2 && c.v > 3);
      }
    }
  }

  private posAlong(path: PathEntry[], d: number) {
    for (let k = path.length - 1; k >= 0; k--) {
      const e = path[k]!;
      if (d >= e.d0) return pointAt(e.lane, d - e.d0);
    }
    return null;
  }

  private place(c: AICar) {
    const front = pointAt(c.lane, c.s);
    const backS = c.s - CAR_LEN * 0.85;
    const back = backS >= 0 || c.lane.closed || !c.prev ? pointAt(c.lane, c.lane.closed ? backS : Math.max(0, backS)) : pointAt(c.prev, c.prev.length + backS);
    c.heading = Math.atan2(front.x - back.x, front.z - back.z);
    c.x = (front.x + back.x) / 2;
    c.z = (front.z + back.z) / 2;
  }

  /** Coche de la IA más cercano por delante del alumno en su trayectoria (para la distancia de seguridad). */
  leaderOf(p: PlayerView): { dist: number; v: number } | null {
    const fx = Math.sin(p.heading), fz = Math.cos(p.heading);
    let best: { dist: number; v: number } | null = null;
    for (const c of this.cars) {
      const dx = c.x - p.x, dz = c.z - p.z;
      const along = dx * fx + dz * fz;
      const lat = Math.abs(-dx * fz + dz * fx);
      if (along < 2 || along > 70 || lat > 1.6) continue;
      if (Math.cos(c.heading - p.heading) < 0.8) continue;
      const dist = along - CAR_LEN;
      if (!best || dist < best.dist) best = { dist, v: c.v };
    }
    return best;
  }
}
