/**
 * Zonas del mundo con carácter propio y puntos de salida seguros en cada una.
 * Datos puros (sin Three.js), testeables.
 *
 * Una zona es un conjunto de tramos de vía (y, en la carretera de la Sierra,
 * un intervalo de s). Los puntos de salida se generan sobre los carriles y se
 * validan: sobre la calzada, en su sentido, lejos de cruces, pasos de peatones,
 * obstáculos y coches aparcados, con las cuatro esquinas del coche en la vía.
 */
import { CAR } from '../vehicle/specs';
import { JUNCTION_R, PARKED_CARS, polylineLength, ROUNDABOUT, SIERRA_ID, type Pose, type RoadInfo, type WorldMap } from './map';
import type { Signals } from './signals';

export type ZoneId = 'centro' | 'residencial' | 'industrial' | 'convencional' | 'autovia' | 'rotondas' | 'escolar' | 'montana';

export interface ZoneDef {
  id: ZoneId;
  name: string;
  /** Qué se practica en ella. */
  desc: string;
  /** Tramos de la zona. */
  roads: string[];
  /** Tramos donde se puede empezar (por defecto, `roads`). */
  spawnRoads?: string[];
  /** Cruces que pertenecen a la zona. */
  junctions?: string[];
  /** Sección de la carretera de la Sierra (índice en `road.sections`). */
  section?: number;
}

export const ZONES: ZoneDef[] = [
  { id: 'centro', name: 'Centro con semáforos', desc: 'Semáforos, pasos de peatones y calles de sentido único.', roads: ['h1-1', 'h1-2', 'v1-1', 'v3-1'], junctions: ['j-120_-60', 'j0_-60', 'j120_-60', 'j-120_60', 'j120_60'] },
  { id: 'residencial', name: 'Zona residencial (30)', desc: 'Calles de doble sentido limitadas a 30 km/h, STOP y ceda el paso.', roads: ['h3-0', 'h3-1', 'h2-0', 'v0-1', 'v0-2'], junctions: ['j-240_60', 'j-240_180', 'j-120_180', 'j0_180'] },
  { id: 'industrial', name: 'Polígono industrial', desc: 'Naves, calles anchas y acceso a la autovía.', roads: ['h0-3', 'h1-3', 'v3-0', 'v4-0'], junctions: ['j120_-180', 'j240_-180', 'j240_-60'] },
  { id: 'escolar', name: 'Zona escolar (20)', desc: 'Señal de niños, límite de 20 km/h y peatones.', roads: ['h3-2', 'v3-2', 'v2-2'], junctions: ['j120_180'] },
  { id: 'rotondas', name: 'Rotonda', desc: 'Entrar cediendo el paso y salir señalizando.', roads: ['h2-1', 'h2-2', 'v2-1'], junctions: ['j0_60'] },
  { id: 'autovia', name: 'Autovía con incorporaciones', desc: 'Carril de aceleración, incorporación, túnel y salida.', roads: ['ramal-entrada', 'autovia', 'ramal-salida'], spawnRoads: ['ramal-entrada'] },
  { id: 'montana', name: 'Tramo de montaña', desc: 'Curvas cerradas, pendiente y línea continua (40 km/h).', roads: [SIERRA_ID], section: 1, junctions: ['j-240_-180'] },
  { id: 'convencional', name: 'Carretera convencional', desc: 'Doble sentido sin separación, arcén de tierra (70 km/h).', roads: [SIERRA_ID], section: 2, junctions: ['j-120_-180'] },
];

export const zoneDef = (id: ZoneId) => ZONES.find((z) => z.id === id)!;

/** Zona a la que pertenece un punto (o null si no pertenece a ninguna). */
export function zoneAt(map: WorldMap, info: RoadInfo): ZoneId | null {
  if (info.junction) {
    const z = ZONES.find((d) => d.junctions?.includes(info.junction!.id));
    return z?.id ?? null;
  }
  const road = info.road;
  if (!road) return null;
  for (const z of ZONES) {
    if (!z.roads.includes(road.id)) continue;
    if (z.section !== undefined) {
      const sec = road.sections?.[z.section];
      // Las dos zonas de la Sierra se reparten la vía: lo que no es montaña cuenta como convencional.
      if (z.id === 'montana' && sec && (info.s < sec.from || info.s >= sec.to)) continue;
    }
    return z.id;
  }
  void map;
  return null;
}

/** Esquinas del coche en una pose (con un pequeño margen). */
function corners(p: Pose, margin = 0.15) {
  const hl = CAR.length / 2 + margin, hw = CAR.width / 2 + margin;
  const fx = Math.sin(p.heading), fz = Math.cos(p.heading);
  const rx = -fz, rz = fx;
  return [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(([a, b]) => ({ x: p.x + fx * hl * a! + rx * hw * b!, z: p.z + fz * hl * a! + rz * hw * b! }));
}

export interface SpawnPoint extends Pose {
  zone: ZoneId;
  road: string;
  lane: number;
  /** Distancia a lo largo del carril, en su sentido de marcha. */
  s: number;
}

/** ¿Es segura esta salida? Calzada, su carril y sentido, sin obstáculos ni cruces cerca. */
export function spawnIsSafe(map: WorldMap, signals: Signals, p: SpawnPoint): boolean {
  const q = map.query(p.x, p.z);
  if (q.surface !== 'calzada' || q.junction || q.road?.id !== p.road) return false;
  const road = q.road;
  const lane = road.lanes[p.lane]!;
  // Sentido correcto: el rumbo coincide con el del carril y, en doble sentido, va por su derecha.
  const along = Math.cos(p.heading - q.heading) * lane.dir;
  if (along < 0.9) return false;
  if (!road.oneWay && Math.sign(q.lateral) !== lane.dir) return false;
  for (const c of corners(p)) {
    const cq = map.query(c.x, c.z);
    if (cq.surface !== 'calzada' && cq.surface !== 'arcen') return false;
    if (cq.road && cq.road.id !== p.road && !cq.junction) return false;
    for (const o of map.obstaclesNear(c.x, c.z)) if (c.x > o.minX - 0.2 && c.x < o.maxX + 0.2 && c.z > o.minZ - 0.2 && c.z < o.maxZ + 0.2) return false;
    for (const car of PARKED_CARS) if (Math.hypot(car.x - c.x, car.z - c.z) < 3) return false;
  }
  for (const j of map.junctions) {
    const r = j.kind === 'rotonda' ? ROUNDABOUT.rOut : JUNCTION_R;
    if (Math.hypot(j.x - p.x, j.z - p.z) < r + 14) return false;
  }
  for (const cw of signals.crosswalks) if (Math.hypot(cw.center.x - p.x, cw.center.z - p.z) < 10) return false;
  return true;
}

const cache = new Map<ZoneId, SpawnPoint[]>();

/** Puntos de salida válidos de una zona (se calculan una vez). */
export function spawnPoints(map: WorldMap, signals: Signals, zone: ZoneId): SpawnPoint[] {
  const hit = cache.get(zone);
  if (hit) return hit;
  const def = zoneDef(zone);
  const out: SpawnPoint[] = [];
  for (const id of def.spawnRoads ?? def.roads) {
    const road = map.roads.find((r) => r.id === id);
    if (!road || road.closed) continue;
    const L = polylineLength(road.pts);
    const sec = def.section !== undefined ? road.sections?.[def.section] : undefined;
    road.lanes.forEach((lane, li) => {
      // En el ramal, solo la recta antes de la curva (lejos de la autovía).
      const sMax = road.kind === 'ramal' ? Math.min(140, L - 20) : L - 20;
      for (let s = 16; s <= sMax; s += 7) {
        const roadS = lane.dir === 1 ? s : L - s;
        if (sec && (roadS < sec.from + 10 || roadS > sec.to - 10)) continue;
        const pose = map.roadPose(road.id, s, li);
        const sp: SpawnPoint = { ...pose, zone, road: road.id, lane: li, s };
        if (spawnIsSafe(map, signals, sp)) out.push(sp);
      }
    });
  }
  cache.set(zone, out);
  return out;
}
