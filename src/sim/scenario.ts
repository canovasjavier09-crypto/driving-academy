/**
 * Escenario de cada partida (examen o simulación libre), derivado de una
 * semilla: zona y punto de salida, tráfico, peatones, meteorología y, en el
 * examen, el orden de las zonas de la ruta. La misma semilla (y la misma zona,
 * si se eligió a mano) reproduce el mismo escenario.
 *
 * Para no repetir, se guardan las 2 últimas zonas jugadas (localStorage, con
 * try/catch) y el sorteo aleatorio las excluye.
 */
import type { WorldMap } from './world/map';
import type { Signals } from './world/signals';
import { spawnPoints, ZONES, type SpawnPoint, type ZoneId } from './world/zones';

export type Weather = 'despejado' | 'nublado' | 'lluvia' | 'niebla';

export const WEATHER_LABEL: Record<Weather, string> = { despejado: 'Despejado', nublado: 'Nublado', lluvia: 'Lluvia', niebla: 'Niebla' };

export interface Scenario {
  seed: number;
  zone: ZoneId;
  /** La zona se eligió a mano (para reproducir hace falta zona + semilla). */
  manualZone: boolean;
  spawn: SpawnPoint;
  weather: Weather;
  trafficSeed: number;
  pedSeed: number;
  /** Orden de las demás zonas para la ruta del examen. */
  route: ZoneId[];
}

/** mulberry32 */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const MAX_SEED = 999_999;
export const randomSeed = (rand: () => number = Math.random) => 1 + Math.floor(rand() * MAX_SEED);

const WEATHERS: [Weather, number][] = [['despejado', 0.45], ['nublado', 0.25], ['lluvia', 0.18], ['niebla', 0.12]];

/** Zona que corresponde a una semilla (sorteo uniforme entre las 8 zonas). */
export function zoneOfSeed(seed: number): ZoneId {
  return ZONES[Math.floor(seeded(seed)() * ZONES.length)]!.id;
}

/** Escenario completo y determinista a partir de la semilla (y, opcionalmente, de una zona fija). */
export function scenarioFrom(map: WorldMap, signals: Signals, seed: number, zone?: ZoneId): Scenario {
  const r = seeded(seed);
  const seedZone = ZONES[Math.floor(r() * ZONES.length)]!.id;
  const z = zone ?? seedZone;
  const pts = spawnPoints(map, signals, z);
  const spawn = pts[Math.floor(r() * pts.length)]!;
  let w = r();
  let weather: Weather = 'despejado';
  for (const [k, p] of WEATHERS) {
    if (w < p) {
      weather = k;
      break;
    }
    w -= p;
  }
  const trafficSeed = 1 + Math.floor(r() * 9973);
  const pedSeed = 3 + Math.floor(r() * 7919);
  const others = ZONES.map((d) => d.id).filter((id) => id !== z);
  for (let i = others.length - 1; i > 0; i--) {
    const k = Math.floor(r() * (i + 1));
    [others[i], others[k]] = [others[k]!, others[i]!];
  }
  return { seed, zone: z, manualZone: zone !== undefined, spawn, weather, trafficSeed, pedSeed, route: others };
}

/**
 * Sorteo aleatorio: busca una semilla cuya zona no esté entre las recientes.
 * Así la semilla sola basta para repetir el escenario.
 */
export function pickRandom(map: WorldMap, signals: Signals, recent: ZoneId[], rand: () => number = Math.random): Scenario {
  const banned = new Set(recent.length >= ZONES.length ? [] : recent);
  let seed = randomSeed(rand);
  for (let i = 0; i < 400 && banned.has(zoneOfSeed(seed)); i++) seed = randomSeed(rand);
  return scenarioFrom(map, signals, seed);
}

// ---------------------------------------------------------------- historial
const KEY = 'driving-academy.zonas-recientes';
const KEEP = 2;

export function loadRecent(): ZoneId[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    const ids = new Set(ZONES.map((z) => z.id));
    return Array.isArray(list) ? (list.filter((x) => typeof x === 'string' && ids.has(x as ZoneId)) as ZoneId[]).slice(0, KEEP) : [];
  } catch {
    return [];
  }
}

export function saveRecent(zone: ZoneId): void {
  try {
    const list = [zone, ...loadRecent().filter((z) => z !== zone)].slice(0, KEEP);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* almacenamiento no disponible (modo privado): se ignora */
  }
}
