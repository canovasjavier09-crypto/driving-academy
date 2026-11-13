/**
 * Mapa del simulador como datos puros (sin Three.js): red viaria, relieve,
 * edificios y consultas espaciales. Lo usan el render, la física, y en fases
 * posteriores el tráfico y el detector de infracciones.
 *
 * Coordenadas en metros. Norte = −Z, Este = +X. Se circula por la derecha.
 *
 *  - Ciudad de 5 × 4 cruces (manzanas de ~120 m) con trazado irregular: los cruces se
 *    desplazan unos metros respecto a una cuadrícula y las calles se curvan ligeramente.
 *  - Calle z = −180 de sentido único hacia el oeste; calle x = −120 de sentido único hacia el sur.
 *  - Rotonda en (0, 60).
 *  - Barrio en cuesta al noroeste (8 m de desnivel, rampas de hasta ~11 %).
 *  - Autovía de circunvalación (2 + 2 carriles, mediana con barrera) con un túnel al norte.
 *  - Ramal de incorporación con carril de aceleración al este y ramal de salida con
 *    carril de deceleración al oeste.
 */

export interface V2 {
  x: number;
  z: number;
}

export type RoadKind = 'calle' | 'autovia' | 'ramal';

export interface Lane {
  /** Desplazamiento lateral desde el eje (positivo = a la derecha del sentido de la polilínea). */
  offset: number;
  /** +1 circula en el sentido de la polilínea, −1 en el contrario. */
  dir: 1 | -1;
}

export interface Road {
  id: string;
  name: string;
  kind: RoadKind;
  /** Dirección topológica de las calles (h = este-oeste, v = norte-sur): agrupa las fases de semáforo. */
  axis?: 'h' | 'v';
  pts: V2[];
  closed?: boolean;
  /** Anchura de calzada (puede variar por punto en los carriles que se estrechan). */
  width: number;
  widths?: number[];
  lanes: Lane[];
  /** Velocidad máxima genérica de la vía (km/h). */
  limit: number;
  sidewalk: boolean;
  /** Anchura de la mediana con barrera (solo autovía). */
  median?: number;
  oneWay: boolean;
  /** Vía interurbana sin aceras (carretera convencional): arcén de tierra y líneas de borde. */
  rural?: boolean;
  /** Tramos con otra velocidad máxima (s en metros desde el primer punto). */
  sections?: { from: number; to: number; limit: number }[];
}

export interface Junction {
  id: string;
  x: number;
  z: number;
  kind: 'cruce' | 'rotonda';
  /** Posición en la retícula topológica (columna, fila). */
  xi: number;
  zi: number;
  /** Direcciones (unitarias) de las vías que salen del cruce. */
  arms: V2[];
}

/** Rectángulo orientado: centro, eje local u (unitario) y semiextensiones. */
export interface Obb {
  cx: number;
  cz: number;
  ux: number;
  uz: number;
  hu: number;
  hv: number;
}

/** Obstáculo: caja alineada (límites) y, si está girado, su rectángulo orientado. */
export interface Box {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  obb?: Obb;
}

export type BuildingStyle = 'residencial' | 'oficinas' | 'antiguo' | 'moderno' | 'industrial';

export interface Building extends Box {
  obb: Obb;
  height: number;
  base: number;
  color: number;
  style: BuildingStyle;
}

/** Esquinas de un rectángulo orientado. */
export function obbCorners(o: Obb): V2[] {
  const vx = -o.uz, vz = o.ux;
  return [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(([a, b]) => ({ x: o.cx + o.ux * o.hu * a! + vx * o.hv * b!, z: o.cz + o.uz * o.hu * a! + vz * o.hv * b! }));
}

/** Punto del rectángulo orientado más cercano a (x, z). */
export function closestOnObb(o: Obb, x: number, z: number): V2 {
  const dx = x - o.cx, dz = z - o.cz;
  const vx = -o.uz, vz = o.ux;
  const a = Math.max(-o.hu, Math.min(o.hu, dx * o.ux + dz * o.uz));
  const b = Math.max(-o.hv, Math.min(o.hv, dx * vx + dz * vz));
  return { x: o.cx + o.ux * a + vx * b, z: o.cz + o.uz * a + vz * b };
}

/** ¿Se solapan dos rectángulos orientados? (ejes separadores) */
export function obbOverlap(a: Obb, b: Obb, margin = 0): boolean {
  const ca = obbCorners(a), cb = obbCorners(b);
  for (const ax of [{ x: a.ux, z: a.uz }, { x: -a.uz, z: a.ux }, { x: b.ux, z: b.uz }, { x: -b.uz, z: b.ux }]) {
    const pa = ca.map((p) => p.x * ax.x + p.z * ax.z);
    const pb = cb.map((p) => p.x * ax.x + p.z * ax.z);
    if (Math.max(...pa) + margin < Math.min(...pb) || Math.max(...pb) + margin < Math.min(...pa)) return false;
  }
  return true;
}

function boundsOf(o: Obb): Box {
  const c = obbCorners(o);
  return { minX: Math.min(...c.map((p) => p.x)), maxX: Math.max(...c.map((p) => p.x)), minZ: Math.min(...c.map((p) => p.z)), maxZ: Math.max(...c.map((p) => p.z)), obb: o };
}

export const LANE = 3.5;
export const STREET_W = 7;
export const SIDEWALK_W = 3;
export const JUNCTION_HALF = STREET_W / 2;
/** Radio de la calzada de un cruce (las esquinas de bordillo son redondeadas). */
export const JUNCTION_R = 7;
/** Retícula base (los cruces reales se desplazan respecto a ella). */
export const XS = [-240, -120, 0, 120, 240];
export const ZS = [-180, -60, 60, 180];
const JITTER = 11;
export const ROUNDABOUT = { x: 0, z: 60, rIn: 10, rOut: 18 };
export const RING = { hx: 480, hz: 420, r: 220, median: 3, lane: 3.75, width: 21 };
export const TUNNEL = { z: -RING.hz, x0: -150, x1: 150, halfWidth: 12, height: 6.5 };
export const WORLD_HALF = 800;

// ---------------------------------------------------------------------------
// Zona de maniobras (explanada al suroeste, dentro de la circunvalación)
// ---------------------------------------------------------------------------
export const MANEUVER = { minX: -397, maxX: -300, minZ: 250, maxZ: 340 };

/** Pose de un vehículo aparcado o de una posición de salida. */
export interface Pose {
  x: number;
  z: number;
  heading: number;
}

/** Plaza objetivo: rectángulo orientado (centro, rumbo hacia el fondo de la plaza, largo y ancho). */
export interface Spot {
  x: number;
  z: number;
  heading: number;
  length: number;
  width: number;
}

const OBL = Math.PI / 4;
const oblDir = { x: Math.sin(OBL), z: Math.cos(OBL) };
const oblEntrance = (x: number) => ({ x, z: 312 });
const oblCenter = (x: number): Pose => ({ x: oblEntrance(x).x + oblDir.x * 2.6, z: oblEntrance(x).z + oblDir.z * 2.6, heading: OBL });

/** Plazas de las lecciones de maniobras y vehículos aparcados alrededor. */
export const MANEUVER_SPOTS = {
  linea: { x: -361.9, z: 256.25, heading: Math.PI / 2, length: 6.9, width: 2.3 } as Spot,
  bateria: { x: -372, z: 292.6, heading: 0, length: 5, width: 2.6 } as Spot,
  oblicuo: { ...oblCenter(-350), length: 5.2, width: 2.6 } as Spot,
  /** Calle de 8 m para el cambio de sentido en tres maniobras. */
  sentido: { x: -362.5, z: 331, heading: Math.PI / 2, length: 60, width: 8 } as Spot,
};

export const PARKED_CARS: Pose[] = [
  // En línea, delante y detrás del hueco
  { x: -367.5, z: 256.25, heading: Math.PI / 2 },
  { x: -356.3, z: 256.25, heading: Math.PI / 2 },
  { x: -378.5, z: 256.25, heading: Math.PI / 2 },
  // En batería (morro hacia el pasillo)
  ...[-377.2, -374.6, -369.4, -366.8, -361.6].map((x) => ({ x, z: 292.6, heading: Math.PI })),
  // En oblicuo
  ...[-357.4, -353.7, -346.3].map((x) => oblCenter(x)),
];

/** Bordillos de la zona de maniobras (obstáculos bajos). */
export function maneuverCurbs(): Box[] {
  const S = MANEUVER_SPOTS;
  return [
    { minX: -395, maxX: -325, minZ: 254.6, maxZ: 255 }, // bordillo del aparcamiento en línea
    { minX: -385, maxX: -355, minZ: 295.1, maxZ: 295.5 }, // fondo de la batería
    { minX: -395, maxX: -330, minZ: S.sentido.z - 4.4, maxZ: S.sentido.z - 4 }, // calle del cambio de sentido
    { minX: -395, maxX: -330, minZ: S.sentido.z + 4, maxZ: S.sentido.z + 4.4 },
  ];
}

export function inManeuverZone(x: number, z: number) {
  return x >= MANEUVER.minX && x <= MANEUVER.maxX && z >= MANEUVER.minZ && z <= MANEUVER.maxZ;
}

// ---------------------------------------------------------------------------
// Relieve
// ---------------------------------------------------------------------------
function smooth(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/** Altura del terreno (m). Meseta de 8 m al noroeste de la ciudad; el resto es llano. */
export function heightAt(x: number, z: number): number {
  return 8 * smooth(-130, -230, x) * smooth(-440, -350, x) * smooth(0, -100, z) * smooth(-340, -270, z);
}

// ---------------------------------------------------------------------------
// Construcción de la red
// ---------------------------------------------------------------------------
function line(a: V2, b: V2, step = 5): V2[] {
  const len = Math.hypot(b.x - a.x, b.z - a.z);
  const n = Math.max(1, Math.ceil(len / step));
  const out: V2[] = [];
  for (let i = 0; i <= n; i++) out.push({ x: a.x + ((b.x - a.x) * i) / n, z: a.z + ((b.z - a.z) * i) / n });
  return out;
}

/** Arco de circunferencia; ángulos medidos con punto = c + r·(sin θ, −cos θ). */
function arc(c: V2, r: number, t0: number, t1: number, step = 4): V2[] {
  const n = Math.max(2, Math.ceil((Math.abs(t1 - t0) * r) / step));
  const out: V2[] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    out.push({ x: c.x + r * Math.sin(t), z: c.z - r * Math.cos(t) });
  }
  return out;
}

function join(...parts: V2[][]): V2[] {
  const out: V2[] = [];
  for (const p of parts) for (const q of p) {
    const last = out[out.length - 1];
    if (!last || Math.hypot(last.x - q.x, last.z - q.z) > 0.01) out.push(q);
  }
  return out;
}

const TWO_WAY: Lane[] = [{ offset: LANE / 2, dir: 1 }, { offset: -LANE / 2, dir: -1 }];
const ONE_WAY: Lane[] = [{ offset: LANE / 2, dir: 1 }, { offset: -LANE / 2, dir: 1 }];

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

const isRoundabout = (x: number, z: number) => x === ROUNDABOUT.x && z === ROUNDABOUT.z;
/** Cruces fijos: la rotonda y los dos que enlazan con los ramales de la autovía. */
const FIXED = new Set(['0_60', '240_-60', '-240_60']);

function buildJunctions(): Junction[] {
  const out: Junction[] = [];
  XS.forEach((bx, xi) => ZS.forEach((bz, zi) => {
    let x = bx, z = bz;
    if (!FIXED.has(`${bx}_${bz}`)) {
      const r = rng(1000 + xi * 31 + zi * 7);
      x += (r() * 2 - 1) * JITTER;
      z += (r() * 2 - 1) * JITTER;
    }
    out.push({ id: `j${bx}_${bz}`, x, z, kind: isRoundabout(bx, bz) ? 'rotonda' : 'cruce', xi, zi, arms: [] });
  }));
  return out;
}

const junctionTrim = (j: Junction) => (j.kind === 'rotonda' ? ROUNDABOUT.rOut - 0.6 : JUNCTION_R);

/** Curva suave de A a B con una flecha lateral `bulge` (m) en el centro. */
function curve(a: V2, b: V2, bulge: number, step = 3): V2[] {
  const len = Math.hypot(b.x - a.x, b.z - a.z);
  const n = Math.max(2, Math.ceil(len / step));
  const nx = -(b.z - a.z) / len, nz = (b.x - a.x) / len;
  const out: V2[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const off = bulge * Math.sin(Math.PI * t);
    out.push({ x: a.x + (b.x - a.x) * t + nx * off, z: a.z + (b.z - a.z) * t + nz * off });
  }
  return out;
}

/** Recorta los extremos de una polilínea a un radio de cada cruce (con punto exacto en el borde). */
function trimEnds(pts: V2[], a: V2, ra: number, b: V2, rb: number): V2[] {
  const cut = (list: V2[], c: V2, r: number): V2[] => {
    let i = 0;
    while (i < list.length - 1 && Math.hypot(list[i]!.x - c.x, list[i]!.z - c.z) < r) i++;
    if (i === 0) return list;
    const p = list[i - 1]!, q = list[i]!;
    const dp = Math.hypot(p.x - c.x, p.z - c.z), dq = Math.hypot(q.x - c.x, q.z - c.z);
    const t = (r - dp) / (dq - dp || 1);
    return [{ x: p.x + (q.x - p.x) * t, z: p.z + (q.z - p.z) * t }, ...list.slice(i)];
  };
  return cut(cut(pts, a, ra).reverse(), b, rb).reverse();
}

function buildStreets(junctions: Junction[]): Road[] {
  const J = (xi: number, zi: number) => junctions.find((j) => j.xi === xi && j.zi === zi)!;
  const roads: Road[] = [];
  const street = (A: Junction, B: Junction, seed: number) => {
    const r = rng(seed);
    const straight = r() < 0.3;
    const bulge = straight ? 0 : (r() * 2 - 1) * 7;
    return trimEnds(curve(A, B, bulge), A, junctionTrim(A), B, junctionTrim(B));
  };
  for (let zi = 0; zi < ZS.length; zi++) {
    for (let xi = 0; xi < XS.length - 1; xi++) {
      const oneWay = zi === 0; // calle Mayor: sentido único hacia el oeste
      const pts = street(J(xi, zi), J(xi + 1, zi), 500 + zi * 13 + xi);
      roads.push({
        id: `h${zi}-${xi}`, name: `Calle ${['Mayor', 'del Sol', 'de la Paz', 'del Río'][zi]}`, kind: 'calle', axis: 'h',
        pts: oneWay ? pts.reverse() : pts, width: STREET_W, lanes: oneWay ? ONE_WAY : TWO_WAY,
        limit: oneWay ? 50 : SCHOOL_ROADS.includes(`h${zi}-${xi}`) ? SCHOOL_LIMIT : 30, sidewalk: true, oneWay,
      });
    }
  }
  for (let xi = 0; xi < XS.length; xi++) {
    for (let zi = 0; zi < ZS.length - 1; zi++) {
      const oneWay = xi === 1; // avenida de la Estación: sentido único hacia el sur
      roads.push({
        id: `v${xi}-${zi}`, name: `Avenida ${['Norte', 'de la Estación', 'Central', 'del Parque', 'del Puerto'][xi]}`, kind: 'calle', axis: 'v',
        pts: street(J(xi, zi), J(xi, zi + 1), 700 + xi * 13 + zi), width: STREET_W, lanes: oneWay ? ONE_WAY : TWO_WAY,
        limit: oneWay ? 50 : SCHOOL_ROADS.includes(`v${xi}-${zi}`) ? SCHOOL_LIMIT : 30, sidewalk: true, oneWay,
      });
    }
  }
  return roads;
}

/** Velocidad máxima en el punto s de una vía (tramos con límite propio). */
export function limitAt(road: Road, s: number): number {
  for (const sec of road.sections ?? []) if (s >= sec.from && s < sec.to) return sec.limit;
  return road.limit;
}

/** Curva de Catmull-Rom por puntos de control (paso aproximado `step` m). */
function catmull(ctrl: V2[], step = 3): V2[] {
  const out: V2[] = [];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const p0 = ctrl[Math.max(0, i - 1)]!, p1 = ctrl[i]!, p2 = ctrl[i + 1]!, p3 = ctrl[Math.min(ctrl.length - 1, i + 2)]!;
    const n = Math.max(2, Math.ceil(Math.hypot(p2.x - p1.x, p2.z - p1.z) / step));
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push({ x: f(p0.x, p1.x, p2.x, p3.x), z: f(p0.z, p1.z, p2.z, p3.z) });
    }
  }
  out.push(ctrl[ctrl.length - 1]!);
  return out;
}

/** Extremo oeste del tramo de montaña (x < −300): curvas cerradas y bajada de la meseta. */
export const MOUNTAIN_X = -300;
export const SIERRA_ID = 'cv-sierra';

/**
 * Carretera de la Sierra (CV-12): sale del cruce suroeste de la ciudad hacia
 * el oeste por la meseta, baja en curvas cerradas (tramo de montaña) y vuelve
 * por una carretera convencional hasta el cruce sur de la avenida de la Estación.
 * Doble sentido, sin aceras, con arcén de tierra.
 */
function buildSierra(junctions: Junction[]): Road {
  const A = junctions.find((j) => j.xi === 0 && j.zi === 0)!;
  const B = junctions.find((j) => j.xi === 1 && j.zi === 0)!;
  const ctrl: V2[] = [
    { x: A.x, z: A.z }, { x: -272, z: -181 }, { x: -310, z: -178 }, { x: -345, z: -190 }, { x: -375, z: -215 },
    { x: -388, z: -243 }, { x: -372, z: -268 }, { x: -345, z: -268 }, { x: -322, z: -270 }, { x: -306, z: -285 },
    { x: -314, z: -307 }, { x: -338, z: -318 }, { x: -358, z: -324 }, { x: -373, z: -337 }, { x: -373, z: -352 }, { x: -357, z: -363 }, { x: -322, z: -364 },
    { x: -250, z: -349 }, { x: -200, z: -338 }, { x: -160, z: -318 }, { x: -136, z: -286 }, { x: -125, z: -246 },
    { x: B.x - 1, z: B.z - 32 }, { x: B.x, z: B.z },
  ];
  const pts = trimEnds(catmull(ctrl, 3), A, JUNCTION_R, B, JUNCTION_R);
  // Tramos de velocidad: salida de la ciudad 50, montaña 40, convencional 70, llegada a la ciudad 50.
  let s = 0, m0 = -1, m1 = -1;
  for (let i = 0; i < pts.length; i++) {
    if (i) s += Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.z - pts[i - 1]!.z);
    if (pts[i]!.x < MOUNTAIN_X) {
      if (m0 < 0) m0 = s;
      m1 = s;
    }
  }
  const L = s;
  return {
    id: SIERRA_ID, name: 'Carretera de la Sierra (CV-12)', kind: 'calle', axis: 'v', pts, width: 7.4, lanes: TWO_WAY,
    limit: 70, sidewalk: false, oneWay: false, rural: true,
    sections: [
      { from: 0, to: m0, limit: 50 },
      { from: m0, to: m1, limit: 40 },
      { from: m1, to: L - 70, limit: 70 },
      { from: L - 70, to: L + 1, limit: 50 },
    ],
  };
}

/** Circunvalación: rectángulo redondeado en sentido horario visto con el norte arriba. */
function ringPolyline(): V2[] {
  const { hx, hz, r } = RING;
  const cx = hx - r;
  const cz = hz - r;
  return join(
    line({ x: -cx, z: -hz }, { x: cx, z: -hz }, 6),
    arc({ x: cx, z: -cz }, r, 0, Math.PI / 2),
    line({ x: hx, z: -cz }, { x: hx, z: cz }, 6),
    arc({ x: cx, z: cz }, r, Math.PI / 2, Math.PI),
    line({ x: cx, z: hz }, { x: -cx, z: hz }, 6),
    arc({ x: -cx, z: cz }, r, Math.PI, (3 * Math.PI) / 2),
    line({ x: -hx, z: cz }, { x: -hx, z: -cz }, 6),
    arc({ x: -cx, z: -cz }, r, (3 * Math.PI) / 2, 2 * Math.PI),
  ).slice(0, -1);
}

const RAMP_W = 3.75;
/** Distancia del eje de la autovía al borde derecho de la calzada (línea continua). */
export const RING_EDGE = RING.median / 2 + 2 * RING.lane;
const RAMP_CENTER = RING_EDGE + RAMP_W / 2;

function buildHighway(): Road[] {
  const ring: Road = {
    id: 'autovia', name: 'Autovía de circunvalación A-90', kind: 'autovia', pts: ringPolyline(), closed: true,
    width: RING.width, median: RING.median, oneWay: false, limit: 120, sidewalk: false,
    lanes: [
      { offset: RING.median / 2 + RING.lane / 2, dir: 1 },
      { offset: RING.median / 2 + RING.lane * 1.5, dir: 1 },
      { offset: -(RING.median / 2 + RING.lane / 2), dir: -1 },
      { offset: -(RING.median / 2 + RING.lane * 1.5), dir: -1 },
    ],
  };

  // Entrada este: de la calle z = −60 a la calzada interior (sentido sur) con carril de aceleración.
  const ex = RING.hx - RAMP_CENTER; // x del carril de aceleración
  const rc = 60;
  const entryMain = join(
    line({ x: XS[4]! + JUNCTION_R, z: -60 }, { x: ex - rc, z: -60 }),
    arc({ x: ex - rc, z: 0 }, rc, 0, Math.PI / 2),
    line({ x: ex, z: 0 }, { x: ex, z: 200 }, 6),
  );
  const taper: V2[] = [];
  const tw: number[] = [];
  for (let i = 1; i <= 10; i++) {
    const w = RAMP_W * (1 - i / 10);
    taper.push({ x: RING.hx - RING_EDGE - w / 2, z: 200 + i * 6 });
    tw.push(w);
  }
  const entry: Road = {
    id: 'ramal-entrada', name: 'Incorporación a la A-90', kind: 'ramal', pts: [...entryMain, ...taper],
    widths: [...entryMain.map(() => RAMP_W), ...tw], width: RAMP_W, lanes: [{ offset: 0, dir: 1 }],
    limit: 80, sidewalk: false, oneWay: true,
  };

  // Salida oeste: carril de deceleración desde la calzada interior (sentido norte) hacia la calle z = 60.
  const wx = -RING.hx + RAMP_CENTER;
  const exitTaper: V2[] = [];
  const etw: number[] = [];
  for (let i = 0; i < 10; i++) {
    const w = RAMP_W * ((i + 1) / 10);
    exitTaper.push({ x: -RING.hx + RING_EDGE + w / 2, z: 260 - i * 6 });
    etw.push(w);
  }
  const exitMain = join(
    line({ x: wx, z: 200 }, { x: wx, z: 120 }, 6),
    arc({ x: wx + rc, z: 120 }, rc, (3 * Math.PI) / 2, 2 * Math.PI),
    line({ x: wx + rc, z: 60 }, { x: XS[0]! - JUNCTION_R, z: 60 }),
  );
  const exit: Road = {
    id: 'ramal-salida', name: 'Salida 3 · Centro ciudad', kind: 'ramal', pts: [...exitTaper, ...exitMain],
    widths: [...etw, ...exitMain.map(() => RAMP_W)], width: RAMP_W, lanes: [{ offset: 0, dir: 1 }],
    limit: 60, sidewalk: false, oneWay: true,
  };
  return [ring, entry, exit];
}

const PALETTES: Record<BuildingStyle, number[]> = {
  residencial: [0xd9cbb4, 0xe0d6c8, 0xcfc2b0, 0xe6dccb, 0xd8b99a],
  oficinas: [0xb8c2cc, 0xa9b4bf, 0xc7cfd6],
  antiguo: [0xd7a982, 0xe3c39d, 0xc98f6b, 0xe8d3a8, 0xbfa07e],
  moderno: [0xeeeeea, 0xd4d8dc, 0x9aa3ad],
  industrial: [0xb7bcc2, 0x9fb0bf, 0xc9c4b8, 0x8c99a6],
};
/** Manzana del polígono industrial (naves bajas). */
export const INDUSTRIAL = { i: 3, j: 0 };
/** Calles de la zona escolar (velocidad máxima 20 km/h y señal de niños). */
export const SCHOOL_ROADS = ['h3-2', 'v3-2', 'v2-2'];
export const SCHOOL_LIMIT = 20;
/** Manzana reservada para un parque (sin edificios). */
export const PARK = { i: 1, j: 2 };

/** Manzana: cruces de sus esquinas (NO, NE, SE, SO), vías de sus lados y centro. */
export interface Block {
  i: number;
  j: number;
  corners: Junction[];
  edges: { road: Road; from: Junction; to: Junction }[];
  center: V2;
}

/** ¿Está el punto dentro del polígono? */
export function pointInPolygon(p: V2, poly: V2[]): boolean {
  let inside = false;
  for (let i = 0, k = poly.length - 1; i < poly.length; k = i++) {
    const a = poly[i]!, b = poly[k]!;
    if (a.z > p.z !== b.z > p.z && p.x < ((b.x - a.x) * (p.z - a.z)) / (b.z - a.z) + a.x) inside = !inside;
  }
  return inside;
}

/** Punto y tangente a una distancia s de una polilínea abierta. */
export function along(pts: V2[], s: number): { p: V2; t: V2 } {
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!, b = pts[i]!;
    const l = Math.hypot(b.x - a.x, b.z - a.z);
    if (acc + l >= s || i === pts.length - 1) {
      const t = Math.max(0, Math.min(1, (s - acc) / (l || 1)));
      return { p: { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t }, t: { x: (b.x - a.x) / (l || 1), z: (b.z - a.z) / (l || 1) } };
    }
    acc += l;
  }
  const a = pts[0]!;
  return { p: a, t: { x: 1, z: 0 } };
}

export function polylineLength(pts: V2[]): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.z - pts[i - 1]!.z);
  return l;
}

// ---------------------------------------------------------------------------
// Índice espacial y consultas
// ---------------------------------------------------------------------------
interface Seg {
  road: Road;
  i: number;
  ax: number;
  az: number;
  bx: number;
  bz: number;
  len: number;
  /** Distancia recorrida desde el inicio de la vía hasta el punto a. */
  s0: number;
  wa: number;
  wb: number;
}

const CELL = 40;
const key = (cx: number, cz: number) => cx * 100003 + cz;

export type Surface = 'calzada' | 'arcen' | 'acera' | 'isleta' | 'mediana' | 'fuera';

export interface RoadInfo {
  surface: Surface;
  road?: Road;
  junction?: Junction;
  /** Desplazamiento lateral respecto al eje (positivo = derecha de la polilínea). */
  lateral: number;
  /** Rumbo de la polilínea en ese punto (mismo convenio que el vehículo). */
  heading: number;
  limit: number;
  /** Distancia a lo largo de la vía desde su primer punto (m). */
  s: number;
  /** Zona especial (explanada de maniobras). */
  area?: 'maniobras';
}

export interface Spawn {
  id: string;
  name: string;
  x: number;
  z: number;
  heading: number;
}

export class WorldMap {
  readonly roads: Road[];
  readonly junctions: Junction[];
  readonly buildings: Building[];
  readonly obstacles: Box[];
  readonly spawns: Spawn[];
  readonly blocks: Block[];
  readonly trees: V2[];
  readonly lamps: (V2 & { heading: number })[];
  private grid = new Map<number, Seg[]>();
  private obstacleGrid = new Map<number, Box[]>();

  constructor() {
    this.junctions = buildJunctions();
    this.roads = [...buildStreets(this.junctions), buildSierra(this.junctions), ...buildHighway()];
    // Brazos de cada cruce (dirección de las vías que salen de él)
    for (const jn of this.junctions) {
      for (const r of this.roads) {
        if (r.closed) continue;
        for (const atStart of [true, false]) {
          const n = r.pts.length;
          const p = atStart ? r.pts[0]! : r.pts[n - 1]!;
          const q = atStart ? r.pts[1]! : r.pts[n - 2]!;
          if (Math.hypot(p.x - jn.x, p.z - jn.z) > junctionTrim(jn) + 0.6) continue;
          const l = Math.hypot(q.x - jn.x, q.z - jn.z) || 1;
          jn.arms.push({ x: (q.x - jn.x) / l, z: (q.z - jn.z) / l });
        }
      }
    }
    for (const r of this.roads) this.index(r);
    this.blocks = this.buildBlocks();
    this.buildings = this.buildBuildings();
    const f = this.buildFurniture();
    this.trees = f.trees;
    this.lamps = f.lamps;
    const post = (p: V2, h: number): Box => ({ minX: p.x - h, maxX: p.x + h, minZ: p.z - h, maxZ: p.z + h });
    this.obstacles = [...this.buildings, ...tunnelWalls(), ...maneuverCurbs(), ...this.trees.map((t) => post(t, 0.35)), ...this.lamps.map((l) => post(l, 0.15))];
    for (const o of this.obstacles) this.indexBox(o);
    this.spawns = [
      { id: 'centro', name: 'Centro', ...this.roadPose('h3-1', 25, 0) },
      { id: 'cuesta', name: 'Pie de la cuesta', ...this.roadPose('h1-0', 12, 1) },
      { id: 'rotonda', name: 'Acceso a la rotonda', ...this.roadPose('h2-1', 50, 0) },
      { id: 'autovia', name: 'Ramal de la autovía', x: 300, z: -60, heading: Math.PI / 2 },
      { id: 'maniobras', name: 'Zona de maniobras', x: -390, z: 275, heading: Math.PI / 2 },
    ];
  }

  /**
   * Posición sobre el carril `laneIdx` de una vía, a `s` metros del comienzo de ese
   * carril en su sentido de marcha, orientada en ese sentido.
   */
  roadPose(roadId: string, s: number, laneIdx: number): Pose {
    const r = this.roads.find((x) => x.id === roadId)!;
    const lane = r.lanes[laneIdx]!;
    const L = polylineLength(r.pts);
    const { p, t } = along(r.pts, lane.dir === 1 ? s : L - s);
    const right = { x: -t.z, z: t.x };
    const heading = Math.atan2(t.x * lane.dir, t.z * lane.dir);
    return { x: p.x + right.x * lane.offset, z: p.z + right.z * lane.offset, heading };
  }

  private buildBlocks(): Block[] {
    const J = (xi: number, zi: number) => this.junctions.find((j) => j.xi === xi && j.zi === zi)!;
    const R = (id: string) => this.roads.find((r) => r.id === id)!;
    const out: Block[] = [];
    for (let i = 0; i < XS.length - 1; i++) {
      for (let j = 0; j < ZS.length - 1; j++) {
        const corners = [J(i, j), J(i + 1, j), J(i + 1, j + 1), J(i, j + 1)];
        const edges = [
          { road: R(`h${j}-${i}`), from: corners[0]!, to: corners[1]! },
          { road: R(`v${i + 1}-${j}`), from: corners[1]!, to: corners[2]! },
          { road: R(`h${j + 1}-${i}`), from: corners[2]!, to: corners[3]! },
          { road: R(`v${i}-${j}`), from: corners[3]!, to: corners[0]! },
        ];
        const center = { x: corners.reduce((a, c) => a + c.x, 0) / 4, z: corners.reduce((a, c) => a + c.z, 0) / 4 };
        out.push({ i, j, corners, edges, center });
      }
    }
    return out;
  }

  /** Edificios en hilera a lo largo de cada calle, orientados con la fachada. */
  private buildBuildings(): Building[] {
    const rand = rng(1234);
    const out: Building[] = [];
    const styles: BuildingStyle[] = ['residencial', 'residencial', 'antiguo', 'oficinas', 'moderno'];
    for (const b of this.blocks) {
      if (b.i === PARK.i && b.j === PARK.j) continue;
      for (const e of b.edges) {
        const pts = e.road.pts;
        const L = polylineLength(pts);
        const mid = along(pts, L / 2);
        const sideSign = Math.sign((b.center.x - mid.p.x) * -mid.t.z + (b.center.z - mid.p.z) * mid.t.x) || 1;
        const skip = e.road.axis === 'v' ? 36 : 12;
        let a = skip;
        while (a < L - skip - 8) {
          let w = 12 + rand() * 12;
          if (a + w > L - skip) w = L - skip - a;
          if (w < 8) break;
          const { p, t } = along(pts, a + w / 2);
          const d = 15 + rand() * 11;
          const n = { x: -t.z * sideSign, z: t.x * sideSign };
          const front = STREET_W / 2 + SIDEWALK_W + 0.6;
          const obb: Obb = { cx: p.x + n.x * (front + d / 2), cz: p.z + n.z * (front + d / 2), ux: t.x, uz: t.z, hu: w / 2, hv: d / 2 };
          a += w + (rand() < 0.2 ? 6 + rand() * 5 : rand() * 1.5);
          if (Math.hypot(obb.cx - ROUNDABOUT.x, obb.cz - ROUNDABOUT.z) < 44) continue;
          if (out.some((o) => obbOverlap(o.obb, obb, 0.5))) continue;
          const c = obbCorners(obb);
          const probes = [...c, ...c.map((q, k) => ({ x: (q.x + c[(k + 1) % 4]!.x) / 2, z: (q.z + c[(k + 1) % 4]!.z) / 2 }))];
          if (probes.some((q) => this.query(q.x, q.z).surface !== 'fuera')) continue;
          const central = 1 - Math.min(1, Math.hypot(obb.cx, obb.cz) / 300);
          const industrial = b.i === INDUSTRIAL.i && b.j === INDUSTRIAL.j;
          const style = industrial ? (rand(), 'industrial') : styles[Math.floor(rand() * styles.length)]!;
          // Naves del polígono: una sola planta alta (≈ 7–10 m en total)
          const floors = industrial ? (rand(), 1 + (b.i + Math.round(obb.cx)) % 2 * 0.8) : style === 'antiguo' ? 3 + Math.floor(rand() * 3) : 3 + Math.floor(rand() * (4 + central * 16));
          const hs = c.map((q) => heightAt(q.x, q.z));
          const pal = PALETTES[style];
          out.push({
            ...boundsOf(obb), obb, style,
            base: Math.min(...hs) - 1,
            height: Math.max(...hs) + 4.2 + floors * 3.2,
            color: pal[Math.floor(rand() * pal.length)]!,
          });
        }
      }
      // Edificios bajos en el interior de la manzana (patio de manzana alrededor)
      for (let k = 0; k < 2; k++) {
        const e = b.edges[k * 2]!; // orientado como una de las calles horizontales
        const L = polylineLength(e.road.pts);
        const { t } = along(e.road.pts, L / 2);
        const obb: Obb = {
          cx: b.center.x + (rand() * 2 - 1) * 8 + (k === 0 ? -12 : 12) * t.x, cz: b.center.z + (rand() * 2 - 1) * 8 + (k === 0 ? -12 : 12) * t.z,
          ux: t.x, uz: t.z, hu: 7 + rand() * 6, hv: 6 + rand() * 5,
        };
        if (Math.hypot(obb.cx - ROUNDABOUT.x, obb.cz - ROUNDABOUT.z) < 44) continue;
        if (out.some((o) => obbOverlap(o.obb, obb, 4))) continue;
        const c = obbCorners(obb);
        if (c.some((q) => this.query(q.x, q.z).surface !== 'fuera')) continue;
        const hs = c.map((q) => heightAt(q.x, q.z));
        const ind = b.i === INDUSTRIAL.i && b.j === INDUSTRIAL.j;
        const floorsIn = 1 + Math.floor(rand() * 3);
        const colIn = Math.floor(rand() * 5);
        out.push({ ...boundsOf(obb), obb, style: ind ? 'industrial' : 'residencial', base: Math.min(...hs) - 1, height: Math.max(...hs) + (ind ? 7 : 4.2 + floorsIn * 3.2), color: ind ? PALETTES.industrial[colIn % 4]! : PALETTES.residencial[colIn]! });
      }
    }
    return out;
  }

  /** Contorno de la ciudad (cruces del perímetro, en orden). */
  cityOutline(): V2[] {
    const J = (xi: number, zi: number) => this.junctions.find((j) => j.xi === xi && j.zi === zi)!;
    const nx = XS.length - 1, nz = ZS.length - 1;
    const ring: Junction[] = [];
    for (let i = 0; i <= nx; i++) ring.push(J(i, 0));
    for (let k = 1; k <= nz; k++) ring.push(J(nx, k));
    for (let i = nx - 1; i >= 0; i--) ring.push(J(i, nz));
    for (let k = nz - 1; k >= 1; k--) ring.push(J(0, k));
    return ring.map((j) => ({ x: j.x, z: j.z }));
  }

  /** Árboles y farolas en aceras, parque y campo (determinista). */
  private buildFurniture() {
    const trees: V2[] = [];
    const lamps: (V2 & { heading: number })[] = [];
    for (const r of this.roads) {
      if (r.kind !== 'calle') continue;
      const L = polylineLength(r.pts);
      if (r.rural) {
        // Carretera: árboles sueltos a 6 m del borde, sin farolas.
        const rr = rng(77);
        for (let s = 30; s < L - 30; s += 22) {
          const { p, t } = along(r.pts, s);
          const side = rr() < 0.5 ? 1 : -1;
          const o = side * (r.width / 2 + 6 + rr() * 4);
          if (rr() < 0.55) trees.push({ x: p.x - t.z * o, z: p.z + t.x * o });
        }
        continue;
      }
      for (let s = 12; s < L - 10; s += 16) {
        const { p, t } = along(r.pts, s);
        for (const side of [1, -1]) {
          const o = side * (r.width / 2 + 2.3);
          trees.push({ x: p.x - t.z * o, z: p.z + t.x * o });
        }
      }
      for (let s = 20; s < L - 10; s += 32) {
        const { p, t } = along(r.pts, s);
        for (const side of [1, -1]) {
          const o = side * (r.width / 2 + 0.6);
          const rx = -t.z, rz = t.x;
          lamps.push({ x: p.x + rx * o, z: p.z + rz * o, heading: Math.atan2(-rx * side, -rz * side) });
        }
      }
    }
    // Parque
    const rand = rng(99);
    const park = this.blocks.find((b) => b.i === PARK.i && b.j === PARK.j)!;
    const poly = park.corners.map((c) => ({ x: c.x, z: c.z }));
    for (let k = 0; k < 90; k++) {
      const x = park.center.x + (rand() * 2 - 1) * 55;
      const z = park.center.z + (rand() * 2 - 1) * 55;
      if (!pointInPolygon({ x, z }, poly) || this.query(x, z).surface !== 'fuera') continue;
      if (Math.hypot(x - ROUNDABOUT.x, z - ROUNDABOUT.z) < 26) continue;
      if (trees.some((t) => Math.hypot(t.x - x, t.z - z) < 7)) continue;
      trees.push({ x, z });
    }
    // Campo alrededor de la ciudad, lejos de las vías y del túnel.
    let tries = 0;
    let rural = 0;
    while (rural < 380 && tries++ < 6000) {
      const x = (rand() * 2 - 1) * (WORLD_HALF - 40);
      const z = (rand() * 2 - 1) * (WORLD_HALF - 40);
      if (Math.abs(x) < 280 && Math.abs(z) < 218) continue;
      if (Math.abs(z - TUNNEL.z) < 50 && x > TUNNEL.x0 - 10 && x < TUNNEL.x1 + 10) continue;
      let clear = true;
      for (const [ox, oz] of [[0, 0], [9, 0], [-9, 0], [0, 9], [0, -9]] as const) {
        if (this.query(x + ox, z + oz).surface !== 'fuera') clear = false;
      }
      if (!clear) continue;
      trees.push({ x, z });
      rural++;
    }
    return { trees, lamps };
  }

  private index(road: Road) {
    const n = road.pts.length;
    const segs = road.closed ? n : n - 1;
    let s0 = 0;
    for (let i = 0; i < segs; i++) {
      const a = road.pts[i]!;
      const b = road.pts[(i + 1) % n]!;
      const wa = road.widths?.[i] ?? road.width;
      const wb = road.widths?.[(i + 1) % n] ?? road.width;
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const seg: Seg = { road, i, ax: a.x, az: a.z, bx: b.x, bz: b.z, len, s0, wa, wb };
      s0 += len;
      const pad = Math.max(wa, wb) / 2 + SIDEWALK_W + 1;
      this.forCells(Math.min(a.x, b.x) - pad, Math.max(a.x, b.x) + pad, Math.min(a.z, b.z) - pad, Math.max(a.z, b.z) + pad, (k) => {
        const list = this.grid.get(k);
        if (list) list.push(seg);
        else this.grid.set(k, [seg]);
      });
    }
  }

  private indexBox(b: Box) {
    this.forCells(b.minX - 2, b.maxX + 2, b.minZ - 2, b.maxZ + 2, (k) => {
      const list = this.obstacleGrid.get(k);
      if (list) list.push(b);
      else this.obstacleGrid.set(k, [b]);
    });
  }

  private forCells(x0: number, x1: number, z0: number, z1: number, fn: (k: number) => void) {
    for (let cx = Math.floor(x0 / CELL); cx <= Math.floor(x1 / CELL); cx++)
      for (let cz = Math.floor(z0 / CELL); cz <= Math.floor(z1 / CELL); cz++) fn(key(cx, cz));
  }

  obstaclesNear(x: number, z: number): Box[] {
    return this.obstacleGrid.get(key(Math.floor(x / CELL), Math.floor(z / CELL))) ?? [];
  }

  /** Qué hay bajo el punto (x, z): calzada, acera, mediana… y de qué vía. */
  query(x: number, z: number): RoadInfo {
    // Cruces y rotonda primero: tienen prioridad sobre los tramos.
    for (const j of this.junctions) {
      const dx = x - j.x;
      const dz = z - j.z;
      const d = Math.hypot(dx, dz);
      // ¿Dentro de la boca de alguno de los brazos? (ahí manda la vía)
      const inArm = () => j.arms.some((u) => dx * u.x + dz * u.z > 0 && Math.abs(-dx * u.z + dz * u.x) <= STREET_W / 2);
      if (j.kind === 'rotonda') {
        if (d > ROUNDABOUT.rOut + SIDEWALK_W + 1) continue;
        // Sentido antihorario visto desde arriba con el norte arriba: tangente (dz, −dx).
        const heading = Math.atan2(dz, -dx);
        if (d < ROUNDABOUT.rIn) return { surface: 'isleta', junction: j, lateral: 0, heading, limit: 30, s: 0 };
        if (d <= ROUNDABOUT.rOut) return { surface: 'calzada', junction: j, lateral: d - (ROUNDABOUT.rIn + ROUNDABOUT.rOut) / 2, heading, limit: 30, s: 0 };
        // Acera exterior de la glorieta, salvo donde desembocan las calles.
        if (d <= ROUNDABOUT.rOut + SIDEWALK_W && !inArm()) return { surface: 'acera', junction: j, lateral: 0, heading, limit: 30, s: 0 };
      } else {
        if (d > JUNCTION_R + SIDEWALK_W) continue;
        if (d <= JUNCTION_R) return { surface: 'calzada', junction: j, lateral: 0, heading: 0, limit: 30, s: 0 };
        if (!inArm()) return { surface: 'acera', junction: j, lateral: 0, heading: 0, limit: 30, s: 0 };
      }
    }

    if (inManeuverZone(x, z)) return { surface: 'calzada', lateral: 0, heading: 0, limit: 20, s: 0, area: 'maniobras' };

    const segs = this.grid.get(key(Math.floor(x / CELL), Math.floor(z / CELL)));
    let best: { seg: Seg; d: number; lat: number; w: number; t: number } | null = null;
    if (segs) {
      for (const s of segs) {
        const vx = s.bx - s.ax;
        const vz = s.bz - s.az;
        const t = Math.max(0, Math.min(1, ((x - s.ax) * vx + (z - s.az) * vz) / (s.len * s.len || 1)));
        const px = s.ax + vx * t;
        const pz = s.az + vz * t;
        const d = Math.hypot(x - px, z - pz);
        const w = s.wa + (s.wb - s.wa) * t;
        // Lateral con signo: derecha de la dirección (−dz, dx).
        const lat = ((x - px) * -vz + (z - pz) * vx) / (s.len || 1);
        const edge = w / 2 + (s.road.sidewalk ? SIDEWALK_W : 0.5);
        if (d <= edge && (!best || d - w / 2 < best.d - best.w / 2)) best = { seg: s, d, lat, w, t };
      }
    }
    if (!best) return { surface: 'fuera', lateral: 0, heading: 0, limit: 90, s: 0 };
    const { seg, lat, w, t } = best;
    const road = seg.road;
    const heading = Math.atan2(seg.bx - seg.ax, seg.bz - seg.az);
    const sAlong = seg.s0 + seg.len * t;
    const base = { road, lateral: lat, heading, limit: limitAt(road, sAlong), s: sAlong };
    if (road.median && Math.abs(lat) < road.median / 2) return { ...base, surface: 'mediana' };
    if (Math.abs(lat) <= w / 2) {
      if (road.kind === 'autovia' && Math.abs(lat) > RING_EDGE) return { ...base, surface: 'arcen' };
      return { ...base, surface: 'calzada' };
    }
    return { ...base, surface: road.sidewalk ? 'acera' : 'fuera' };
  }

  /** ¿Se puede circular por (x, z)? Calzada o arcén. */
  drivable(x: number, z: number): boolean {
    const s = this.query(x, z).surface;
    return s === 'calzada' || s === 'arcen';
  }
}

/** Paredes del túnel (dos laterales) y el monte que lo cubre, como obstáculos. */
function tunnelWalls(): Box[] {
  const { z, x0, x1, halfWidth } = TUNNEL;
  return [
    { minX: x0, maxX: x1, minZ: z - halfWidth - 1, maxZ: z - halfWidth },
    { minX: x0, maxX: x1, minZ: z + halfWidth, maxZ: z + halfWidth + 1 },
    { minX: x0, maxX: x1, minZ: z - 45, maxZ: z - halfWidth - 1 },
    { minX: x0, maxX: x1, minZ: z + halfWidth + 1, maxZ: z + 45 },
  ];
}

let shared: WorldMap | null = null;
/** Instancia única (el mapa es determinista y se reutiliza entre sesiones). */
export function getWorldMap(): WorldMap {
  shared ??= new WorldMap();
  return shared;
}
