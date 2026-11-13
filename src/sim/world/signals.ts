/**
 * Señalización del mapa como datos puros: qué regula cada brazo de cada cruce
 * (semáforo, STOP, ceda el paso, prioridad, rotonda), dónde están las líneas de
 * detención, los pasos de peatones, las señales verticales y los semáforos.
 *
 * Criterio:
 *  - Cinco cruces céntricos con semáforo (dos fases: calles horizontales / verticales).
 *  - En el resto, las calles horizontales tienen prioridad; las verticales llevan
 *    STOP o ceda el paso alternando por cruce.
 *  - En la rotonda, quien entra cede el paso a quien circula por ella.
 *  - El ramal que sale de la autovía cede el paso al llegar a la ciudad.
 */
import { along, JUNCTION_R, polylineLength, ROUNDABOUT, RING, RING_EDGE, SCHOOL_ROADS, type Junction, type Road, type V2, type WorldMap } from './map';

export type Control = 'semaforo' | 'stop' | 'ceda' | 'prioridad' | 'rotonda';
export type Axis = 'h' | 'v';

export interface Arm {
  id: string;
  junction: Junction;
  road: Road;
  /** La vía empieza (true) o termina (false) en este cruce. */
  atStart: boolean;
  /** Vector unitario desde el centro del cruce hacia la vía. */
  u: V2;
  axis: Axis;
  /** Regulación para quien llega por este brazo. */
  control: Control;
  /** Distancia desde el extremo de la vía hasta la línea de detención (m). */
  lineDist: number;
}

export interface Crosswalk {
  id: string;
  road: Road;
  atStart: boolean;
  junctionId: string;
  center: V2;
  /** Dirección de la vía (unitaria) y semiancho de la calzada. */
  along: V2;
  halfWidth: number;
}

/** `escolar`: peligro por proximidad de un lugar frecuentado por niños (P-21). */
export type SignKind = 'stop' | 'ceda' | 'limite' | 'escolar';
export interface Sign {
  kind: SignKind;
  value?: number;
  x: number;
  z: number;
  /** Rumbo hacia el que mira la cara de la señal (convención del vehículo). */
  facing: number;
}

export interface LightHead {
  junctionId: string;
  axis: Axis;
  x: number;
  z: number;
  facing: number;
}

export interface StopLine {
  a: V2;
  b: V2;
  dashed: boolean;
}

export const LIGHT_JUNCTIONS = ['j-120_-60', 'j0_-60', 'j120_-60', 'j-120_60', 'j120_60'];
/** Los pasos de peatones están entre 1,5 y 5,5 m desde el borde del cruce. */
export const CROSSWALK_FROM_END = 3.5;
export const CROSSWALK_DEPTH = 4;
const LINE_DIST_CROSS = 6.5;
const LINE_DIST_ROUNDABOUT = 0.4;

const right = (d: V2): V2 => ({ x: -d.z, z: d.x });
const headingOf = (d: V2) => Math.atan2(d.x, d.z);

export class Signals {
  readonly arms: Arm[] = [];
  readonly crosswalks: Crosswalk[] = [];
  readonly signs: Sign[] = [];
  readonly lights: LightHead[] = [];
  readonly stopLines: StopLine[] = [];
  private armByRoadEnd = new Map<string, Arm>();
  private armsByJunction = new Map<string, Arm[]>();

  constructor(readonly map: WorldMap) {
    for (const road of map.roads) {
      if (road.closed) continue;
      for (const atStart of [true, false]) {
        const n = road.pts.length;
        const p = atStart ? road.pts[0]! : road.pts[n - 1]!;
        const q = atStart ? road.pts[1]! : road.pts[n - 2]!;
        const j = map.junctions.find((jj) => Math.hypot(jj.x - p.x, jj.z - p.z) <= (jj.kind === 'rotonda' ? ROUNDABOUT.rOut + 0.5 : JUNCTION_R + 0.6));
        if (!j) continue;
        const len = Math.hypot(q.x - p.x, q.z - p.z);
        const u = { x: (q.x - p.x) / len, z: (q.z - p.z) / len };
        // El eje (fase de semáforo) es el de la calle, no el de su dirección exacta (las calles no son rectas).
        const axis: Axis = road.axis ?? (Math.abs(u.x) > Math.abs(u.z) ? 'h' : 'v');
        const { xi, zi } = j;
        let control: Control;
        if (j.kind === 'rotonda') control = 'rotonda';
        else if (road.kind === 'ramal') control = 'ceda';
        else if (LIGHT_JUNCTIONS.includes(j.id)) control = 'semaforo';
        else if (axis === 'h') control = 'prioridad';
        else control = (xi + zi) % 2 === 0 ? 'stop' : 'ceda';
        const arm: Arm = {
          id: `${road.id}:${atStart ? 'start' : 'end'}`, junction: j, road, atStart, u, axis, control,
          lineDist: j.kind === 'rotonda' ? LINE_DIST_ROUNDABOUT : LINE_DIST_CROSS,
        };
        this.arms.push(arm);
        this.armByRoadEnd.set(arm.id, arm);
        const list = this.armsByJunction.get(j.id);
        if (list) list.push(arm);
        else this.armsByJunction.set(j.id, [arm]);
        this.decorate(arm, p);
      }
    }
    this.speedSigns();
  }

  armAt(roadId: string, atStart: boolean): Arm | undefined {
    return this.armByRoadEnd.get(`${roadId}:${atStart ? 'start' : 'end'}`);
  }

  armsOf(junctionId: string): Arm[] {
    return this.armsByJunction.get(junctionId) ?? [];
  }

  crosswalk(id: string): Crosswalk | undefined {
    return this.crosswalks.find((c) => c.id === id);
  }

  /** ¿Hay carriles que llegan al cruce por este brazo? */
  static hasIncoming(arm: Arm): boolean {
    return arm.road.lanes.some((l) => (arm.atStart ? l.dir === -1 : l.dir === 1));
  }

  private decorate(arm: Arm, end: V2) {
    const { road, u, control } = arm;
    const hw = road.width / 2;
    // Paso de peatones (solo calles)
    if (road.kind === 'calle') {
      this.crosswalks.push({
        id: arm.id, road, atStart: arm.atStart, junctionId: arm.junction.id,
        center: { x: end.x + u.x * CROSSWALK_FROM_END, z: end.z + u.z * CROSSWALK_FROM_END },
        along: u, halfWidth: hw,
      });
    }
    if (!Signals.hasIncoming(arm) || control === 'prioridad') return;
    // Quien llega viaja en −u; su derecha es right(−u).
    const r = right({ x: -u.x, z: -u.z });
    const line = { x: end.x + u.x * arm.lineDist, z: end.z + u.z * arm.lineDist };
    const post = { x: line.x + r.x * (hw + 0.9), z: line.z + r.z * (hw + 0.9) };
    const facing = headingOf(u);
    // Línea de detención: en doble sentido solo ocupa el carril de llegada.
    const twoWay = !road.oneWay;
    const a = twoWay ? line : { x: line.x - r.x * hw, z: line.z - r.z * hw };
    const b = { x: line.x + r.x * hw, z: line.z + r.z * hw };
    this.stopLines.push({ a, b, dashed: control === 'ceda' || control === 'rotonda' });
    if (control === 'semaforo') this.lights.push({ junctionId: arm.junction.id, axis: arm.axis, x: post.x, z: post.z, facing });
    else this.signs.push({ kind: control === 'stop' ? 'stop' : 'ceda', x: post.x, z: post.z, facing });
  }

  /** Señales de velocidad máxima al comienzo de cada calle y en los accesos de la autovía. */
  private speedSigns() {
    for (const road of this.map.roads) {
      if (road.kind !== 'calle') continue;
      const L = polylineLength(road.pts);
      if (L < 40) continue;
      const hw = road.width / 2 + 0.9;
      const fwd = (s: number, kind: SignKind, value?: number, extra = 0) => {
        const { p, t } = along(road.pts, s);
        const r = right(t);
        this.signs.push({ kind, value, x: p.x + r.x * (hw + extra), z: p.z + r.z * (hw + extra), facing: headingOf({ x: -t.x, z: -t.z }) });
      };
      const back = (s: number, kind: SignKind, value?: number, extra = 0) => {
        const { p, t } = along(road.pts, s);
        const r = right(t);
        this.signs.push({ kind, value, x: p.x - r.x * (hw + extra), z: p.z - r.z * (hw + extra), facing: headingOf(t) });
      };
      // Zona escolar: señal de niños al entrar por cada extremo
      if (SCHOOL_ROADS.includes(road.id)) {
        fwd(24, 'escolar');
        if (!road.oneWay) back(L - 24, 'escolar');
      }
      // Vías con tramos de velocidad: una señal al comienzo de cada tramo, en cada sentido
      if (road.sections?.length) {
        for (const sec of road.sections) {
          if (sec.to - sec.from < 30) continue;
          fwd(sec.from + (sec.from <= 0 ? 14 : 4), 'limite', sec.limit, 1);
          if (!road.oneWay) back(Math.min(L, sec.to) - (sec.to >= L ? 14 : 4), 'limite', sec.limit, 1);
        }
        continue;
      }
      // Sentido de la polilínea (a 14 m del comienzo, a la derecha)
      {
        const { p, t } = along(road.pts, 14);
        const r = right(t);
        this.signs.push({ kind: 'limite', value: road.limit, x: p.x + r.x * hw, z: p.z + r.z * hw, facing: headingOf({ x: -t.x, z: -t.z }) });
      }
      if (!road.oneWay) {
        const { p, t } = along(road.pts, L - 14);
        const r = right(t);
        this.signs.push({ kind: 'limite', value: road.limit, x: p.x - r.x * hw, z: p.z - r.z * hw, facing: headingOf(t) });
      }
    }
    // Junto al carril de aceleración (antes de la curva de la autovía)
    const edge = RING.hx - RING_EDGE - 3.75 - 1.6;
    this.signs.push({ kind: 'limite', value: 80, x: 262, z: -60 + 3, facing: -Math.PI / 2 });
    this.signs.push({ kind: 'limite', value: 120, x: edge, z: 150, facing: Math.PI });
    this.signs.push({ kind: 'limite', value: 60, x: -RING.hx + RING_EDGE + 6.5, z: 180, facing: 0 });
  }
}

let shared: Signals | null = null;
export function getSignals(map: WorldMap): Signals {
  if (!shared || shared.map !== map) shared = new Signals(map);
  return shared;
}

// ---------------------------------------------------------------------------
// Semáforos
// ---------------------------------------------------------------------------
export type LightColor = 'verde' | 'ambar' | 'rojo';

/** Ciclo de 38 s: 14 s verde, 3 s ámbar y 2 s todo rojo para cada eje. */
export const LIGHT_CYCLE = { green: 14, amber: 3, allRed: 2 };
const CYCLE = 2 * (LIGHT_CYCLE.green + LIGHT_CYCLE.amber + LIGHT_CYCLE.allRed);

export function lightColor(junctionId: string, axis: Axis, t: number): LightColor {
  const idx = Math.max(0, LIGHT_JUNCTIONS.indexOf(junctionId));
  const local = (((t + idx * 7) % CYCLE) + CYCLE) % CYCLE;
  const half = CYCLE / 2;
  const phase = axis === 'h' ? local : (local + half) % CYCLE;
  if (phase < LIGHT_CYCLE.green) return 'verde';
  if (phase < LIGHT_CYCLE.green + LIGHT_CYCLE.amber) return 'ambar';
  return 'rojo';
}
