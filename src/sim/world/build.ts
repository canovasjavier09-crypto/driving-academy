/**
 * Convierte el mapa (datos puros) en mallas de Three.js.
 * Todo se agrupa en pocas geometrías fusionadas e instancias para que la
 * escena se dibuje con muy pocas llamadas (importante en un M1 con 8 GB y en Safari).
 */
import * as THREE from 'three';
import {
  heightAt, JUNCTION_R, MANEUVER, MOUNTAIN_X, MANEUVER_SPOTS, maneuverCurbs, obbCorners, PARK, pointInPolygon, RING, RING_EDGE, ROUNDABOUT, SIDEWALK_W, STREET_W, TUNNEL, WORLD_HALF,
  type BuildingStyle, type Junction, type Road, type V2, type WorldMap,
} from './map';
import { asphaltTextures, dirtTexture, facadeTexture, grassTexture, macroTexture, paintWearTexture, pavingTexture, shopTexture, blobTexture, type AsphaltSet } from './textures';
import { BAKE_RECT, bakeShadows, bakeSplat, SUN_OFFSET } from './bake';
import { createWorldUniforms, patchWorldMaterial, type WorldUniforms } from './shading';
import { LEVEL_SPEC, type QualityLevel } from '../render/quality';

type P3 = [number, number, number];
/** Sin carriles (cruces, explanadas): ni rodadas ni arcén. */
const NO_LANE: [number, number][] = [[-1, 0], [-1, 0], [-1, 0], [-1, 0]];

/** Acumulador de triángulos no indexados (normales planas calculadas al final). */
class Geo {
  pos: number[] = [];
  uv: number[] = [];
  col: number[] = [];
  lane: number[] = [];
  private withUv = false;
  private withCol = false;
  /** Giro, escala y desplazamiento de la proyección automática (distintos en cada tramo). */
  uvT = { c: 1, s: 0, k: 1, ox: 0, oz: 0 };

  /**
   * Con `autoUv`, los cuadriláteros sin UV reciben una proyección planta (x, z) / autoUv.
   * Con `lanes`, cada vértice lleva además su coordenada de carril (rodadas y arcén).
   */
  constructor(private autoUv = 0, private lanes = false) {
    this.uvT.k = autoUv || 1;
  }

  /** Cambia el giro y la escala de la textura para los siguientes cuadriláteros. */
  setUvTransform(angle: number, k: number, ox = 0, oz = 0) {
    this.uvT = { c: Math.cos(angle), s: Math.sin(angle), k, ox, oz };
  }

  tri(a: P3, b: P3, c: P3) {
    this.pos.push(...a, ...b, ...c);
  }

  /** Cuadrilátero orientado para que su normal apunte hacia `dir` (por defecto, arriba). */
  quad(a: P3, b: P3, c: P3, d: P3, dir: P3 = [0, 1, 0], uvs?: [number, number][], color?: THREE.Color, laneUv?: [number, number][]) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const flip = nx * dir[0] + ny * dir[1] + nz * dir[2] < 0;
    const order = flip ? [a, d, c, a, c, b] : [a, b, c, a, c, d];
    for (const p of order) this.pos.push(...p);
    if (!uvs && this.autoUv) {
      const t = this.uvT;
      const P = (p: P3): [number, number] => [(t.c * p[0] - t.s * p[2]) / t.k + t.ox, (t.s * p[0] + t.c * p[2]) / t.k + t.oz];
      uvs = [P(a), P(b), P(c), P(d)];
    }
    if (this.lanes) {
      const L = laneUv ?? NO_LANE;
      const lo = flip ? [L[0]!, L[3]!, L[2]!, L[0]!, L[2]!, L[1]!] : [L[0]!, L[1]!, L[2]!, L[0]!, L[2]!, L[3]!];
      for (const l of lo) this.lane.push(...l);
    }
    if (uvs) {
      this.withUv = true;
      const [ua, ub, uc, ud] = uvs as [[number, number], [number, number], [number, number], [number, number]];
      const uo = flip ? [ua, ud, uc, ua, uc, ub] : [ua, ub, uc, ua, uc, ud];
      for (const u of uo) this.uv.push(...u);
    }
    if (color) {
      this.withCol = true;
      for (let i = 0; i < 6; i++) this.col.push(color.r, color.g, color.b);
    }
  }

  build(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    if (this.withUv) g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    if (this.withCol) g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    if (this.lanes) g.setAttribute('laneUv', new THREE.Float32BufferAttribute(this.lane, 2));
    g.computeVertexNormals();
    g.computeBoundingSphere();
    return g;
  }
}

/** Normal derecha (−tz, tx) en cada vértice de la polilínea. */
function rights(pts: V2[], closed: boolean): V2[] {
  const n = pts.length;
  return pts.map((_, i) => {
    const prev = pts[closed ? (i - 1 + n) % n : Math.max(0, i - 1)]!;
    const next = pts[closed ? (i + 1) % n : Math.min(n - 1, i + 1)]!;
    const tx = next.x - prev.x;
    const tz = next.z - prev.z;
    const l = Math.hypot(tx, tz) || 1;
    return { x: -tz / l, z: tx / l };
  });
}

const at = (p: V2, r: V2, o: number, y: number): P3 => [p.x + r.x * o, heightAt(p.x + r.x * o, p.z + r.z * o) + y, p.z + r.z * o];

/** Banda horizontal entre dos desplazamientos laterales. */
function band(g: Geo, road: Road, o0: (i: number) => number, o1: (i: number) => number, y: number) {
  const pts = road.pts;
  const rs = rights(pts, !!road.closed);
  const n = pts.length;
  const segs = road.closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const j = (i + 1) % n;
    g.quad(at(pts[i]!, rs[i]!, o0(i), y), at(pts[j]!, rs[j]!, o0(j), y), at(pts[j]!, rs[j]!, o1(j), y), at(pts[i]!, rs[i]!, o1(i), y));
  }
}

/** Cara vertical (bordillo, barrera) a lo largo de la vía, mirando hacia `side` (±1 = derecha/izquierda). */
function wallAlong(g: Geo, road: Road, o: number, y0: number, y1: number, side: 1 | -1) {
  const pts = road.pts;
  const rs = rights(pts, !!road.closed);
  const n = pts.length;
  const segs = road.closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const j = (i + 1) % n;
    const a0 = at(pts[i]!, rs[i]!, o, y0), a1 = at(pts[i]!, rs[i]!, o, y1);
    const b0 = at(pts[j]!, rs[j]!, o, y0), b1 = at(pts[j]!, rs[j]!, o, y1);
    const r = rs[i]!;
    g.quad(a0, b0, b1, a1, [r.x * side, 0, r.z * side]);
  }
}

/** Línea pintada (continua o discontinua) a un desplazamiento lateral. */
function stripe(g: Geo, road: Road, offset: number, width: number, dash: [number, number] | null, skip?: (p: V2) => boolean) {
  const pts = road.pts;
  const rs = rights(pts, !!road.closed);
  const n = pts.length;
  const segs = road.closed ? n : n - 1;
  let s = 0;
  const y = 0.03;
  for (let i = 0; i < segs; i++) {
    const j = (i + 1) % n;
    const a = pts[i]!, b = pts[j]!;
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    const ra = rs[i]!, rb = rs[j]!;
    const pieces: [number, number][] = [];
    if (!dash) pieces.push([0, len]);
    else {
      const period = dash[0] + dash[1];
      let t = -(s % period);
      while (t < len) {
        const on0 = Math.max(0, t);
        const on1 = Math.min(len, t + dash[0]);
        if (on1 > on0) pieces.push([on0, on1]);
        t += period;
      }
    }
    for (const [t0, t1] of pieces) {
      const p0 = { x: a.x + ((b.x - a.x) * t0) / len, z: a.z + ((b.z - a.z) * t0) / len };
      const p1 = { x: a.x + ((b.x - a.x) * t1) / len, z: a.z + ((b.z - a.z) * t1) / len };
      if (skip && (skip(p0) || skip(p1))) continue;
      const r0 = { x: ra.x + ((rb.x - ra.x) * t0) / len, z: ra.z + ((rb.z - ra.z) * t0) / len };
      const r1 = { x: ra.x + ((rb.x - ra.x) * t1) / len, z: ra.z + ((rb.z - ra.z) * t1) / len };
      g.quad(at(p0, r0, offset - width / 2, y), at(p1, r1, offset - width / 2, y), at(p1, r1, offset + width / 2, y), at(p0, r0, offset + width / 2, y));
    }
    s += len;
  }
}

function flatRect(g: Geo, x0: number, x1: number, z0: number, z1: number, y: number) {
  g.quad([x0, heightAt(x0, z0) + y, z0], [x1, heightAt(x1, z0) + y, z0], [x1, heightAt(x1, z1) + y, z1], [x0, heightAt(x0, z1) + y, z1]);
}

function box(g: Geo, x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) {
  g.quad([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1], [0, 1, 0]);
  g.quad([x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [0, 0, -1]);
  g.quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1]);
  g.quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0]);
  g.quad([x1, y0, z0], [x1, y0, z1], [x1, y1, z1], [x1, y1, z0], [1, 0, 0]);
}

/**
 * Sectores de acera alrededor de un cruce, dejando libres las bocas de las calles.
 * La apertura de cada boca depende del radio (la calle tiene ancho constante).
 */
function junctionSidewalk(g: Geo, j: Junction, r0: number, r1: number, top: number) {
  const angs = j.arms.map((u) => Math.atan2(u.z, u.x)).sort((a, b) => a - b);
  const open = (r: number) => Math.asin(Math.min(0.99, (STREET_W / 2 + 0.05) / r));
  const n = angs.length;
  for (let k = 0; k < n; k++) {
    const a = angs[k]!;
    let b = angs[(k + 1) % n]!;
    if (b <= a) b += Math.PI * 2;
    if (n === 1) b = a + Math.PI * 2;
    const steps = Math.max(3, Math.ceil(((b - a) * r1) / 2.5));
    const lim = (r: number): [number, number] => [a + open(r), b - open(r)];
    const [i0, i1] = lim(r0), [o0, o1] = lim(r1);
    if (i1 <= i0) continue;
    const P = (r: number, t: number): P3 => [j.x + r * Math.cos(t), heightAt(j.x + r * Math.cos(t), j.z + r * Math.sin(t)) + top, j.z + r * Math.sin(t)];
    for (let s = 0; s < steps; s++) {
      const u0 = s / steps, u1 = (s + 1) / steps;
      const ti0 = i0 + (i1 - i0) * u0, ti1 = i0 + (i1 - i0) * u1;
      const to0 = o0 + (o1 - o0) * u0, to1 = o0 + (o1 - o0) * u1;
      g.quad(P(r0, ti0), P(r0, ti1), P(r1, to1), P(r1, to0));
      // Bordillo (cara vertical hacia el centro del cruce)
      const b0 = P(r0, ti0), b1 = P(r0, ti1);
      g.quad([b0[0], b0[1] - top, b0[2]], [b1[0], b1[1] - top, b1[2]], b1, b0, [-(Math.cos(ti0)), 0, -(Math.sin(ti0))]);
    }
  }
}

function disc(g: Geo, cx: number, cz: number, r: number, y: number, seg = 40) {
  for (let i = 0; i < seg; i++) {
    const t0 = (i / seg) * Math.PI * 2, t1 = ((i + 1) / seg) * Math.PI * 2;
    const p = (rr: number, t: number): P3 => [cx + rr * Math.cos(t), heightAt(cx + rr * Math.cos(t), cz + rr * Math.sin(t)) + y, cz + rr * Math.sin(t)];
    g.quad(p(0, t0), p(r, t0), p(r, t1), p(0, t0));
  }
}

function annulus(g: Geo, cx: number, cz: number, r0: number, r1: number, y: number, lanes = 0, seg = 64) {
  const L: [number, number][] = lanes ? [[0, lanes], [0, lanes], [lanes, lanes], [lanes, lanes]] : NO_LANE;
  for (let i = 0; i < seg; i++) {
    const t0 = (Math.PI * 2 * i) / seg;
    const t1 = (Math.PI * 2 * (i + 1)) / seg;
    const p = (r: number, t: number): P3 => [cx + r * Math.cos(t), y, cz + r * Math.sin(t)];
    g.quad(p(r0, t0), p(r0, t1), p(r1, t1), p(r1, t0), undefined, undefined, undefined, L);
  }
}

/**
 * Coordenada de carril de un desplazamiento lateral: 0..n dentro de los
 * carriles (las rodadas van al 27 % y al 73 % de cada uno), fuera = arcén.
 * En vías de doble sentido se mide desde el eje (|o|), simétrico.
 */
function laneSpec(road: Road): { sym: boolean; inner: number; lw: number; n: number; off: number } | null {
  if (!road.lanes.length) return null;
  const pos = road.lanes.map((l) => l.offset).filter((o) => o > 0).sort((a, b) => a - b);
  const neg = road.lanes.filter((l) => l.offset < 0).length;
  if (pos.length && pos.length === neg) {
    const lw = pos.length > 1 ? pos[1]! - pos[0]! : pos[0]! * 2;
    return { sym: true, inner: pos[0]! - lw / 2, lw, n: pos.length, off: 0 };
  }
  const lw = Math.min(3.75, road.width);
  return { sym: false, inner: 0, lw, n: 1, off: road.lanes[0]!.offset - lw / 2 };
}

/** Calzada de una vía con coordenadas de carril (dividida por el eje si es simétrica). */
function roadBand(g: Geo, road: Road, hw: (i: number) => number, y: number) {
  const ls = laneSpec(road);
  const pts = road.pts;
  const rs = rights(pts, !!road.closed);
  const n = pts.length;
  const segs = road.closed ? n : n - 1;
  const lu = (o: number): [number, number] => {
    if (!ls) return [-1, 0];
    return [ls.sym ? (Math.abs(o) - ls.inner) / ls.lw : (o - ls.off) / ls.lw, ls.n];
  };
  const halves: [(i: number) => number, (i: number) => number][] = ls?.sym ? [[(i) => -hw(i), () => 0], [() => 0, (i) => hw(i)]] : [[(i) => -hw(i), (i) => hw(i)]];
  for (const [o0, o1] of halves) {
    for (let i = 0; i < segs; i++) {
      const j = (i + 1) % n;
      g.quad(at(pts[i]!, rs[i]!, o0(i), y), at(pts[j]!, rs[j]!, o0(j), y), at(pts[j]!, rs[j]!, o1(j), y), at(pts[i]!, rs[i]!, o1(i), y), undefined, undefined, undefined, [lu(o0(i)), lu(o0(j)), lu(o1(j)), lu(o1(i))]);
    }
  }
}

export interface BuiltWorld {
  group: THREE.Group;
  /** Cúpula de cielo y sierra lejana: deben seguir a la cámara. */
  sky: THREE.Object3D;
  uniforms: WorldUniforms;
  /** Aplica un nivel de calidad (tamaño de texturas y distancias de dibujado). */
  setLevel(level: QualityLevel): void;
  /** Tiempo: tono del cielo y la sierra, y asfalto mojado (0–1). */
  setWeather(tint: number, wet: number): void;
  /** Genera de antemano las texturas de un nivel (sin aplicarlas), para que cambiar luego no dé tirones. */
  prepare(level: QualityLevel): void;
  /** Culling por distancia y LOD simple: muestra u oculta trozos según la cámara. */
  cull(camera: THREE.Vector3): void;
  /** Trozos visibles tras el último `cull` (para depurar). */
  visibleChunks(): number;
  dispose(): void;
}

const isCity = (x: number, z: number) => Math.abs(x) < 280 && Math.abs(z) < 218;

/** Cúpula de cielo con degradado por vértice (sin texturas ni shaders propios). */
function buildSky(radius: number, horizon: THREE.Color, zenith: THREE.Color): THREE.Mesh {
  const g = new THREE.SphereGeometry(radius, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2 + 0.15);
  const pos = g.attributes.position!;
  const cols: number[] = [];
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const h = Math.max(0, pos.getY(i) / radius);
    c.copy(horizon).lerp(zenith, Math.pow(h, 0.6));
    cols.push(c.r, c.g, c.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
  m.renderOrder = -10;
  m.frustumCulled = false;
  return m;
}

/**
 * Sierra en el horizonte, pegada al cielo (sigue a la cámara como un fondo):
 * nunca se recorta con la distancia de dibujado y ya viene «difuminada» hacia
 * el color del horizonte (perspectiva aérea), así que no necesita niebla.
 */
function buildMountains(radius: number, horizon: THREE.Color): THREE.BufferGeometry {
  const g = new Geo();
  const rand = (() => {
    let a = 77;
    return () => ((a = (a * 16807) % 2147483647) / 2147483647);
  })();
  const n = 90;
  const k = radius / 770;
  const peaks = Array.from({ length: n }, (_, i) => (18 + 30 * Math.abs(Math.sin(i * 0.37)) + rand() * 25) * k);
  for (let layer = 0; layer < 2; layer++) {
    const R = radius * (layer ? 0.97 : 1);
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * Math.PI * 2 + layer * 0.03, t1 = ((i + 1) / n) * Math.PI * 2 + layer * 0.03;
      const h0 = peaks[(i + layer * 37) % n]! * (layer ? 0.6 : 1), h1 = peaks[(i + 1 + layer * 37) % n]! * (layer ? 0.6 : 1);
      const pt = (r: number, t: number, y: number): P3 => [Math.cos(t) * r, y, Math.sin(t) * r];
      const top = new THREE.Color().setHSL(0.3 + rand() * 0.05, 0.22, 0.34 + rand() * 0.06).lerp(horizon, layer ? 0.45 : 0.62);
      g.quad(pt(R, t0, -8 * k), pt(R, t1, -8 * k), pt(R, t1, h1), pt(R, t0, h0), [-Math.cos(t0), 0, -Math.sin(t0)], undefined, top);
    }
  }
  return g.build();
}

interface TexSet {
  asphalt: AsphaltSet;
  paving: THREE.Texture;
  grass: THREE.Texture;
  dirt: THREE.Texture;
  wear: THREE.Texture;
  shop: THREE.Texture;
  facades: Record<BuildingStyle, THREE.Texture>;
}

const STYLES: BuildingStyle[] = ['residencial', 'oficinas', 'antiguo', 'moderno', 'industrial'];

function makeTexSet(f: number): TexSet {
  return {
    asphalt: asphaltTextures(f),
    paving: pavingTexture(f),
    grass: grassTexture(f),
    dirt: dirtTexture(f),
    wear: paintWearTexture(f),
    shop: shopTexture(f),
    facades: Object.fromEntries(STYLES.map((st) => [st, facadeTexture(st, f)])) as unknown as Record<BuildingStyle, THREE.Texture>,
  };
}

function texList(t: TexSet): THREE.Texture[] {
  return [t.asphalt.map, t.asphalt.normalMap, t.asphalt.roughnessMap, t.paving, t.grass, t.dirt, t.wear, t.shop, ...Object.values(t.facades)];
}

/**
 * Trozos de 150 m en la ciudad (300 m en el campo, con menos objetos):
 * se dibujan o no según la distancia (culling) y el detalle (LOD).
 */
const cellOf = (x: number, z: number) => (isCity(x, z) ? `c${Math.floor(x / 150)},${Math.floor(z / 150)}` : `r${Math.floor(x / 300)},${Math.floor(z / 300)}`);

interface Chunk {
  obj: THREE.Object3D;
  center: THREE.Vector3;
  radius: number;
  /** 'far' = distancia de dibujado; 'detail' = distancia de detalle; 'trees' = 0,8 × dibujado. */
  kind: 'far' | 'detail' | 'trees';
}

/** Capa de los detalles (azoteas, troncos, sombras falsas): la vista principal la dibuja, los retrovisores no. */
export const DETAIL_LAYER = 1;

/** Hash entero simple para variar el mapeado de cada tramo. */
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

export function buildWorld(map: WorldMap, startLevel: QualityLevel): BuiltWorld {
  const group = new THREE.Group();
  const disposables: { dispose(): void }[] = [];
  const chunks: Chunk[] = [];
  const u = createWorldUniforms();
  const mat = <T extends THREE.Material>(m: T) => {
    disposables.push(m);
    return m;
  };
  const add = (geo: THREE.BufferGeometry, material: THREE.Material, opts: { receive?: boolean; order?: number; chunk?: Chunk['kind'] } = {}) => {
    disposables.push(geo);
    const mesh = new THREE.Mesh(geo, material);
    // Solo el coche del alumno proyecta sombra real; el resto la recibe o la lleva horneada.
    mesh.castShadow = false;
    mesh.receiveShadow = !!opts.receive;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    if (opts.order !== undefined) mesh.renderOrder = opts.order;
    group.add(mesh);
    if (opts.chunk) {
      geo.computeBoundingSphere();
      const bs = geo.boundingSphere!;
      chunks.push({ obj: mesh, center: bs.center.clone(), radius: bs.radius, kind: opts.chunk });
      if (opts.chunk === 'detail') mesh.layers.set(DETAIL_LAYER);
    }
    return mesh;
  };

  // --- Texturas: horneadas (fijas) y por nivel de calidad (se generan al pedirlas)
  const texCache = new Map<number, TexSet>();
  const getTex = (f: number) => {
    let t = texCache.get(f);
    if (!t) {
      t = makeTexSet(f);
      texCache.set(f, t);
    }
    return t;
  };
  const macro = macroTexture();
  const bake = bakeShadows(map);
  const splat = bakeSplat(map);
  const blob = blobTexture();
  disposables.push(macro, bake, splat, blob);
  u.uMacro.value = macro;
  u.uBake.value = bake;
  u.uSplat.value = splat;
  let tex = getTex(LEVEL_SPEC[startLevel].tex);
  u.uDirt.value = tex.dirt;

  // --- Terreno ---
  const segs = 170;
  const ground = new THREE.PlaneGeometry(WORLD_HALF * 2, WORLD_HALF * 2, segs, segs);
  ground.rotateX(-Math.PI / 2);
  const gp = ground.attributes.position!;
  const tints: number[] = [];
  const parkBlock = map.blocks.find((b) => b.i === PARK.i && b.j === PARK.j)!;
  const parkPoly = parkBlock.corners.map((c) => ({ x: c.x, z: c.z }));
  const city = map.cityOutline();
  const courtyard = new THREE.Color(0x9a958a);
  const lawn = new THREE.Color(0x6f8a52);
  const grass = new THREE.Color(0x5f7a45);
  const grass2 = new THREE.Color(0x6e8a4e);
  const park = new THREE.Color(0x5c8a4a);
  for (let i = 0; i < gp.count; i++) {
    const x = gp.getX(i);
    const z = gp.getZ(i);
    gp.setY(i, heightAt(x, z) - 0.18);
    const inPark = pointInPolygon({ x, z }, parkPoly);
    // Patios de manzana: losas claras con zonas ajardinadas; fuera de la ciudad, pradera.
    const inCity = pointInPolygon({ x, z }, city);
    const c = inPark ? park : inCity ? (Math.sin(x * 0.11 + z * 0.07) + Math.cos(z * 0.13 - x * 0.05) > 0.9 ? lawn : courtyard) : (Math.sin(x * 0.05) + Math.cos(z * 0.07) > 0 ? grass : grass2);
    tints.push(c.r, c.g, c.b);
  }
  ground.setAttribute('gtint', new THREE.Float32BufferAttribute(tints, 3));
  ground.computeVertexNormals();
  const groundMat = mat(new THREE.MeshLambertMaterial({ map: tex.grass }));
  patchWorldMaterial(groundMat, 'ground', u, { macro: 0.35 });
  add(ground, groundMat, { receive: true });

  // --- Asfalto, aceras, marcas ---
  const asphalt = new Geo(5, true);
  const ramps = new Geo(5, true);
  const walk = new Geo(2);
  const paint = new Geo(3);
  const barrier = new Geo();
  const nearEastRamp = (p: V2) => p.x > RING.hx - 20 && p.z > -2 && p.z < 262;
  const nearWestRamp = (p: V2) => p.x < -RING.hx + 20 && p.z > 118 && p.z < 262;

  for (const road of map.roads) {
    const hw = (i: number) => (road.widths?.[i] ?? road.width) / 2;
    // Cada tramo con su propio giro, escala y desplazamiento de textura.
    const h = hash(road.id);
    const g = road.kind === 'ramal' ? ramps : asphalt;
    g.setUvTransform(h * Math.PI * 2, 4.4 + h * 1.6, h * 7.3, h * 3.1);
    roadBand(g, road, hw, road.kind === 'ramal' ? 0.012 : 0);

    if (road.sidewalk) {
      const top = 0.15;
      for (const side of [1, -1] as const) {
        band(walk, road, () => side * hw(0), () => side * (hw(0) + SIDEWALK_W), top);
        wallAlong(walk, road, side * hw(0), 0, top, side === 1 ? -1 : 1);
      }
    }

    if (road.kind === 'calle' && road.rural) {
      // Carretera: líneas de borde continuas y eje discontinuo (continuo en el tramo de montaña)
      const hw0 = road.width / 2 - 0.25;
      stripe(paint, road, hw0, 0.12, null);
      stripe(paint, road, -hw0, 0.12, null);
      const mountain = (p: V2) => p.x < MOUNTAIN_X;
      stripe(paint, road, 0, 0.12, [4, 6], mountain);
      stripe(paint, road, 0, 0.12, null, (p) => !mountain(p));
    }
    if (road.kind === 'calle') {
      if (!road.rural) stripe(paint, road, 0, 0.12, [3, 3]);
      // Pasos de peatones en ambos extremos.
      const n = road.pts.length;
      for (const [p, q] of [[road.pts[0]!, road.pts[1]!], [road.pts[n - 1]!, road.pts[n - 2]!]] as const) {
        const len = Math.hypot(q.x - p.x, q.z - p.z);
        const dx = (q.x - p.x) / len, dz = (q.z - p.z) / len;
        const rx = -dz, rz = dx;
        for (let k = -3; k <= 3; k++) {
          const o = k * 1.0;
          const c0 = { x: p.x + dx * 1.5 + rx * (o - 0.25), z: p.z + dz * 1.5 + rz * (o - 0.25) };
          const corners: P3[] = [
            [c0.x, 0, c0.z],
            [c0.x + dx * 4, 0, c0.z + dz * 4],
            [c0.x + dx * 4 + rx * 0.5, 0, c0.z + dz * 4 + rz * 0.5],
            [c0.x + rx * 0.5, 0, c0.z + rz * 0.5],
          ];
          for (const cc of corners) cc[1] = heightAt(cc[0], cc[2]) + 0.03;
          paint.quad(corners[0]!, corners[1]!, corners[2]!, corners[3]!);
        }
      }
    } else if (road.kind === 'autovia') {
      const m = RING.median / 2;
      for (const side of [1, -1] as const) {
        stripe(paint, road, side * (m + 0.25), 0.15, null);
        stripe(paint, road, side * (m + RING.lane), 0.15, [4, 8]);
        stripe(paint, road, side * RING_EDGE, 0.2, null, side === 1 ? (p) => nearEastRamp(p) || nearWestRamp(p) : undefined);
      }
      // Mediana con barrera de hormigón.
      band(walk, road, () => -m, () => m, 0.12);
      band(barrier, road, () => -0.3, () => 0.3, 0.85);
      wallAlong(barrier, road, 0.3, 0, 0.85, 1);
      wallAlong(barrier, road, -0.3, 0, 0.85, -1);
    } else {
      const hw0 = road.width / 2 - 0.2;
      stripe(paint, road, hw0, 0.15, null);
      // Borde izquierdo: discontinuo donde el ramal discurre junto a la autovía.
      stripe(paint, road, -hw0, 0.3, null, (p) => nearEastRamp(p) || nearWestRamp(p));
      stripe(paint, road, -hw0, 0.3, [1, 1], (p) => !(nearEastRamp(p) || nearWestRamp(p)));
    }
  }

  // Cruces: calzada redondeada y acera con bordillo entre las bocas de las calles.
  asphalt.setUvTransform(0.4, 5);
  for (const j of map.junctions) {
    if (j.kind === 'rotonda') continue;
    disc(asphalt, j.x, j.z, JUNCTION_R + 0.05, 0);
    junctionSidewalk(walk, j, JUNCTION_R, JUNCTION_R + SIDEWALK_W, 0.15);
  }

  // Zona de maniobras: explanada, marcas de plazas, calle estrecha y bordillos
  {
    const M = MANEUVER;
    asphalt.setUvTransform(1.1, 5.5);
    flatRect(asphalt, M.minX, M.maxX, M.minZ, M.maxZ, 0.004);
    const seg = (ax: number, az: number, bx: number, bz: number, w = 0.12) => {
      const len = Math.hypot(bx - ax, bz - az);
      const nx = (-(bz - az) / len) * (w / 2), nz = ((bx - ax) / len) * (w / 2);
      paint.quad([ax - nx, 0.03, az - nz], [bx - nx, 0.03, bz - nz], [bx + nx, 0.03, bz + nz], [ax + nx, 0.03, az + nz]);
    };
    // Línea: separadores de plazas de 6,5 m junto al bordillo
    const L = MANEUVER_SPOTS.linea;
    for (let x = L.x - L.length / 2 - 2 * 6.5 - 4.3; x <= L.x + L.length / 2 + 6.5; x += 6.5) seg(x, 255, x, 255 + L.width);
    seg(-395, 255 + L.width, -325, 255 + L.width);
    // Batería: plazas de 2,6 × 5 m
    const B = MANEUVER_SPOTS.bateria;
    for (let k = -5; k <= 6; k++) {
      const x = B.x - B.width / 2 + k * B.width;
      seg(x, B.z - B.length / 2, x, B.z + B.length / 2);
    }
    // Oblicuo: líneas a 45°
    const O = MANEUVER_SPOTS.oblicuo;
    const d = { x: Math.sin(O.heading), z: Math.cos(O.heading) };
    const r = { x: -d.z, z: d.x };
    for (let k = -3; k <= 2; k++) {
      const ex = O.x - d.x * O.length / 2 + r.x * (O.width / 2 + k * O.width);
      const ez = O.z - d.z * O.length / 2 + r.z * (O.width / 2 + k * O.width);
      seg(ex, ez, ex + d.x * O.length, ez + d.z * O.length);
    }
    // Calle del cambio de sentido: línea central discontinua
    const S = MANEUVER_SPOTS.sentido;
    for (let x = -393; x < -332; x += 6) seg(x, S.z, x + 3, S.z);
    // Bordillos (bloques bajos)
    for (const c of maneuverCurbs()) box(walk, c.minX, c.maxX, 0, 0.15, c.minZ, c.maxZ);
  }

  // Rotonda (dos carriles: rodadas en anillo)
  const R = ROUNDABOUT;
  asphalt.setUvTransform(0.9, 5);
  annulus(asphalt, R.x, R.z, R.rIn, R.rOut, 0.001, 2);
  const rj = map.junctions.find((x) => x.kind === 'rotonda')!;
  junctionSidewalk(walk, rj, R.rOut, R.rOut + SIDEWALK_W, 0.151);
  const islandGeo = new THREE.CylinderGeometry(R.rIn, R.rIn + 0.2, 0.3, 48);
  islandGeo.translate(R.x, 0.15, R.z);
  add(islandGeo, mat(new THREE.MeshLambertMaterial({ color: 0x5c8a4a })), { receive: true });
  // Marcas de la rotonda: línea interior continua y separador de carriles discontinuo.
  const ringPts = (r: number): Road => ({
    id: 'rot', name: '', kind: 'calle', closed: true, width: 0, lanes: [], limit: 30, sidewalk: false, oneWay: true,
    pts: Array.from({ length: 64 }, (_, i) => ({ x: R.x + r * Math.cos((i / 64) * Math.PI * 2), z: R.z + r * Math.sin((i / 64) * Math.PI * 2) })),
  });
  stripe(paint, ringPts(R.rIn + 0.3), 0, 0.15, null);
  stripe(paint, ringPts((R.rIn + R.rOut) / 2), 0, 0.12, [2.5, 2.5]);

  // Asfalto con relieve (normal map) y rugosidad; rodadas más lisas, arcén más rugoso.
  const asphaltMat = mat(new THREE.MeshStandardMaterial({ color: 0x55585e, map: tex.asphalt.map, normalMap: tex.asphalt.normalMap, roughnessMap: tex.asphalt.roughnessMap, roughness: 1, metalness: 0, normalScale: new THREE.Vector2(0.9, 0.9) }));
  patchWorldMaterial(asphaltMat, 'asphalt', u, { macro: 0.32 });
  const rampMat = mat(new THREE.MeshStandardMaterial({ color: 0x5b5e63, map: tex.asphalt.map, normalMap: tex.asphalt.normalMap, roughnessMap: tex.asphalt.roughnessMap, roughness: 1, metalness: 0, normalScale: new THREE.Vector2(0.9, 0.9), polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
  patchWorldMaterial(rampMat, 'asphalt', u, { macro: 0.32 });
  // Pintura vial con desgaste (se descarta donde se ha borrado).
  const paintMat = mat(new THREE.MeshLambertMaterial({ color: 0xe6e3da, alphaMap: tex.wear, alphaTest: 0.5, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  patchWorldMaterial(paintMat, 'baked', u, { macro: 0.25 });
  const walkMat = mat(new THREE.MeshLambertMaterial({ color: 0xcdc9c0, map: tex.paving }));
  patchWorldMaterial(walkMat, 'baked', u, { macro: 0.22 });
  add(asphalt.build(), asphaltMat, { receive: true });
  add(ramps.build(), rampMat, { receive: true });
  add(walk.build(), walkMat, { receive: true });
  add(paint.build(), paintMat, { receive: true, order: 1 });
  add(barrier.build(), mat(new THREE.MeshLambertMaterial({ color: 0xc9c7c0 })), { receive: true });

  // --- Edificios por trozos: una geometría por estilo de fachada y trozo, locales, azoteas y detalles ---
  const facadeGeos = new Map<string, Geo>();
  const shopGeos = new Map<string, Geo>();
  const roofGeos = new Map<string, Geo>();
  const detailGeos = new Map<string, Geo>();
  const getGeo = (m: Map<string, Geo>, k: string) => {
    let g = m.get(k);
    if (!g) m.set(k, (g = new Geo()));
    return g;
  };
  const tile = { w: 12, h: 6.4 };
  const GROUND_FLOOR = 4.2;
  const roofRand = (() => {
    let a = 4242;
    return () => ((a = (a * 16807) % 2147483647) / 2147483647);
  })();
  for (const b of map.buildings) {
    const cell = cellOf(b.obb.cx, b.obb.cz);
    const c = new THREE.Color(b.color);
    const corners = obbCorners(b.obb);
    const y0 = b.base;
    const yStreet = b.base + 1;
    const yShop = yStreet + GROUND_FLOOR;
    const y1 = b.height;
    const roofCol = b.style === 'antiguo' ? new THREE.Color(0xa0573a) : c.clone().multiplyScalar(0.62);
    const roofs = getGeo(roofGeos, cell);
    roofs.quad([corners[0]!.x, y1, corners[0]!.z], [corners[1]!.x, y1, corners[1]!.z], [corners[2]!.x, y1, corners[2]!.z], [corners[3]!.x, y1, corners[3]!.z], [0, 1, 0], undefined, roofCol);
    const facade = getGeo(facadeGeos, `${b.style}|${cell}`);
    const shops = getGeo(shopGeos, cell);
    // Desplazamiento de textura por edificio para que las fachadas vecinas no coincidan.
    const uo = (b.obb.cx * 0.37 + b.obb.cz * 0.11) % 1;
    for (let k = 0; k < 4; k++) {
      const a = corners[k]!, d = corners[(k + 1) % 4]!;
      const len = Math.hypot(d.x - a.x, d.z - a.z);
      const out: P3 = [(a.z - d.z) / len, 0, (d.x - a.x) / len];
      // Normal hacia fuera: comprobar contra el centro
      const mx = (a.x + d.x) / 2 - b.obb.cx, mz = (a.z + d.z) / 2 - b.obb.cz;
      if (out[0] * mx + out[2] * mz < 0) { out[0] = -out[0]; out[2] = -out[2]; }
      const uu = len / tile.w;
      // Las naves industriales no tienen locales: la fachada empieza en el suelo.
      if (b.style === 'industrial') {
        // Una sola banda en altura: portones abajo y ventanas corridas arriba.
        facade.quad([a.x, y0, a.z], [d.x, y0, d.z], [d.x, y1, d.z], [a.x, y1, a.z], out, [[uo, 0], [uo + uu, 0], [uo + uu, 1], [uo, 1]], c);
        continue;
      }
      // Planta baja (locales): módulo de 24 m con cuatro locales distintos
      shops.quad([a.x, y0, a.z], [d.x, y0, d.z], [d.x, yShop, d.z], [a.x, yShop, a.z], out, [[uo, -0.24], [uo + len / 24, -0.24], [uo + len / 24, 1], [uo, 1]], c.clone().lerp(new THREE.Color(0xffffff), 0.3));
      // Plantas superiores (módulo de 4 ventanas × 2 plantas)
      const v1 = (y1 - yShop) / tile.h;
      facade.quad([a.x, yShop, a.z], [d.x, yShop, d.z], [d.x, y1, d.z], [a.x, y1, a.z], out, [[uo, 0], [uo + uu, 0], [uo + uu, v1], [uo, v1]], c);
    }
    // Instalaciones en la azotea (máquinas, depósitos, casetón): detalle cercano
    const det = getGeo(detailGeos, cell);
    const items = 1 + Math.floor(roofRand() * 3);
    for (let k = 0; k < items; k++) {
      const o = b.obb;
      const lx = (roofRand() * 2 - 1) * (o.hu - 2.5), lz = (roofRand() * 2 - 1) * (o.hv - 2.5);
      const cx = o.cx + o.ux * lx - o.uz * lz, cz = o.cz + o.uz * lx + o.ux * lz;
      const sz = 1 + roofRand() * 2.2;
      box(det, cx - sz / 2, cx + sz / 2, y1, y1 + 0.8 + roofRand() * 1.8, cz - sz / 2, cz + sz / 2);
    }
  }
  const facadeMats = new Map<BuildingStyle, THREE.MeshLambertMaterial>(STYLES.map((st) => [st, mat(new THREE.MeshLambertMaterial({ map: tex.facades[st], vertexColors: true }))]));
  for (const [key, g] of facadeGeos) add(g.build(), facadeMats.get(key.split('|')[0] as BuildingStyle)!, { chunk: 'far' });
  const shopMat = mat(new THREE.MeshLambertMaterial({ map: tex.shop, vertexColors: true }));
  for (const g of shopGeos.values()) add(g.build(), shopMat, { chunk: 'far' });
  const roofMat = mat(new THREE.MeshLambertMaterial({ color: 0xb9b6ae, vertexColors: true }));
  for (const g of roofGeos.values()) add(g.build(), roofMat, { chunk: 'far' });
  const detailMat = mat(new THREE.MeshLambertMaterial({ color: 0x9a9890 }));
  for (const g of detailGeos.values()) add(g.build(), detailMat, { chunk: 'detail' });

  // --- Túnel: monte extruido con hueco, revestimiento y luminarias ---
  const T = TUNNEL;
  const hill = new THREE.Shape();
  hill.moveTo(-34, 0);
  hill.bezierCurveTo(-24, 10, -12, 15, 0, 15);
  hill.bezierCurveTo(12, 15, 24, 10, 34, 0);
  hill.lineTo(T.halfWidth, 0);
  hill.lineTo(T.halfWidth, T.height);
  hill.lineTo(-T.halfWidth, T.height);
  hill.lineTo(-T.halfWidth, 0);
  hill.lineTo(-34, 0);
  const hillGeo = new THREE.ExtrudeGeometry(hill, { depth: T.x1 - T.x0, bevelEnabled: false, curveSegments: 10 });
  hillGeo.rotateY(-Math.PI / 2);
  hillGeo.translate(T.x1, -0.2, T.z);
  add(hillGeo, mat(new THREE.MeshLambertMaterial({ color: 0x55703e })), { receive: true });
  const lining = new Geo();
  const inset = 0.15;
  lining.quad([T.x0, T.height - inset, T.z - T.halfWidth], [T.x1, T.height - inset, T.z - T.halfWidth], [T.x1, T.height - inset, T.z + T.halfWidth], [T.x0, T.height - inset, T.z + T.halfWidth], [0, -1, 0]);
  for (const s of [1, -1]) {
    const z = T.z + s * (T.halfWidth - inset);
    lining.quad([T.x0, 0, z], [T.x1, 0, z], [T.x1, T.height, z], [T.x0, T.height, z], [0, 0, -s]);
  }
  add(lining.build(), mat(new THREE.MeshLambertMaterial({ color: 0x8c8a85 })));
  const lampsT = new Geo();
  for (let x = T.x0 + 6; x < T.x1; x += 12) {
    for (const s of [1, -1]) box(lampsT, x - 1.2, x + 1.2, T.height - 0.35, T.height - inset - 0.01, T.z + s * 5 - 0.15, T.z + s * 5 + 0.15);
  }
  add(lampsT.build(), mat(new THREE.MeshBasicMaterial({ color: 0xffe2a8 })));

  // --- Árboles y farolas: instanciados y agrupados por trozos ---
  const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 2.4, 6);
  trunkGeo.translate(0, 1.2, 0);
  const crownGeo = new THREE.IcosahedronGeometry(2, 0);
  crownGeo.translate(0, 3.6, 0);
  // Dos copas por árbol caducifolio (más natural) y coníferas en el campo
  const crown2 = new THREE.IcosahedronGeometry(1.4, 0);
  crown2.translate(0.9, 4.6, 0.3);
  const mergedCrown = new THREE.BufferGeometry();
  {
    const a = crownGeo.toNonIndexed(), b2 = crown2.toNonIndexed();
    const pos = new Float32Array([...(a.attributes.position!.array as Float32Array), ...(b2.attributes.position!.array as Float32Array)]);
    mergedCrown.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    mergedCrown.computeVertexNormals();
    a.dispose();
    b2.dispose();
  }
  const conifer = new THREE.ConeGeometry(1.9, 6.5, 7);
  conifer.translate(0, 5.2, 0);
  const blobGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  disposables.push(trunkGeo, crownGeo, crown2, mergedCrown, conifer, blobGeo);
  const trunkMat = mat(new THREE.MeshLambertMaterial({ color: 0x6b4f35 }));
  const crownMat = mat(new THREE.MeshLambertMaterial({ color: 0xffffff }));
  const blobMat = mat(new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: blob, transparent: true, opacity: 0.4, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
  const inBake = (x: number, z: number) => x > BAKE_RECT.x0 && z > BAKE_RECT.z0 && x < BAKE_RECT.x0 + BAKE_RECT.size && z < BAKE_RECT.z0 + BAKE_RECT.size;
  const isConifer = (i: number, t: V2) => !isCity(t.x, t.z) && i % 2 === 0;
  const treeCells = new Map<string, number[]>();
  map.trees.forEach((t, i) => {
    const k = cellOf(t.x, t.z);
    const l = treeCells.get(k);
    if (l) l.push(i);
    else treeCells.set(k, [i]);
  });
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s3 = new THREE.Vector3();
  const v3 = new THREE.Vector3();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const tint = new THREE.Color();
  const sx = SUN_OFFSET.x / SUN_OFFSET.y, sz = SUN_OFFSET.z / SUN_OFFSET.y;
  const instanced = (geo: THREE.BufferGeometry, m: THREE.Material, n: number) => {
    const im = new THREE.InstancedMesh(geo, m, Math.max(1, n));
    im.count = n;
    im.matrixAutoUpdate = false;
    disposables.push(im);
    return im;
  };
  const register = (im: THREE.InstancedMesh, kind: Chunk['kind']) => {
    if (im.count === 0) return;
    im.computeBoundingSphere();
    group.add(im);
    chunks.push({ obj: im, center: im.boundingSphere!.center.clone(), radius: im.boundingSphere!.radius, kind });
    if (kind === 'detail') im.layers.set(DETAIL_LAYER);
  };
  for (const ids of treeCells.values()) {
    const nCon = ids.filter((i) => isConifer(i, map.trees[i]!)).length;
    const nBlob = ids.filter((i) => !inBake(map.trees[i]!.x, map.trees[i]!.z)).length;
    const trunks = instanced(trunkGeo, trunkMat, ids.length);
    const crowns = instanced(mergedCrown, crownMat, ids.length - nCon);
    const cones = instanced(conifer, crownMat, nCon);
    const blobs = instanced(blobGeo, blobMat, nBlob);
    blobs.renderOrder = 1;
    let ci = 0, ki = 0, bi = 0;
    ids.forEach((i, n) => {
      const t = map.trees[i]!;
      const sc = 0.8 + ((i * 7919) % 100) / 220;
      q.setFromAxisAngle(yAxis, i);
      const y = heightAt(t.x, t.z) + (isCity(t.x, t.z) ? 0.15 : -0.1);
      m4.compose(v3.set(t.x, y, t.z), q, s3.set(sc, sc, sc));
      trunks.setMatrixAt(n, m4);
      if (isConifer(i, t)) {
        cones.setMatrixAt(ki, m4);
        cones.setColorAt(ki++, tint.setHSL(0.33 + ((i * 7) % 10) / 300, 0.4, 0.2 + ((i * 17) % 10) / 120));
      } else {
        crowns.setMatrixAt(ci, m4);
        crowns.setColorAt(ci++, tint.setHSL(0.24 + ((i * 13) % 10) / 160, 0.42, 0.17 + ((i * 31) % 10) / 110));
      }
      if (!inBake(t.x, t.z)) {
        // Sombra falsa desplazada según el sol (fuera de la zona horneada)
        const off = 2.2 * sc;
        m4.compose(v3.set(t.x - sx * off, y + 0.2, t.z - sz * off), q.identity(), s3.set(5.5 * sc, 1, 4.6 * sc));
        blobs.setMatrixAt(bi++, m4);
      }
    });
    register(trunks, 'detail');
    register(crowns, 'trees');
    register(cones, 'trees');
    register(blobs, 'detail');
  }

  const poleGeo = new THREE.CylinderGeometry(0.07, 0.1, 6, 6);
  poleGeo.translate(0, 3, 0);
  const headGeo = new THREE.BoxGeometry(0.35, 0.18, 1.2);
  headGeo.translate(0, 6, 0.5);
  disposables.push(poleGeo, headGeo);
  const poleMat = mat(new THREE.MeshLambertMaterial({ color: 0x4b5160 }));
  const headMat = mat(new THREE.MeshLambertMaterial({ color: 0x9aa3b3 }));
  const lampCells = new Map<string, number[]>();
  map.lamps.forEach((l, i) => {
    const k = cellOf(l.x, l.z);
    const list = lampCells.get(k);
    if (list) list.push(i);
    else lampCells.set(k, [i]);
  });
  for (const ids of lampCells.values()) {
    const poles = instanced(poleGeo, poleMat, ids.length);
    const heads = instanced(headGeo, headMat, ids.length);
    ids.forEach((i, n) => {
      const l = map.lamps[i]!;
      q.setFromAxisAngle(yAxis, l.heading);
      m4.compose(v3.set(l.x, heightAt(l.x, l.z) + 0.15, l.z), q, s3.set(1, 1, 1));
      poles.setMatrixAt(n, m4);
      heads.setMatrixAt(n, m4);
    });
    register(poles, 'far');
    register(heads, 'detail');
  }

  // --- Horizonte: cielo y sierra (siguen a la cámara; radio menor que la distancia de dibujado mínima)
  const horizon = new THREE.Color(0xdbe6ef);
  const sky = new THREE.Group();
  const dome = buildSky(400, horizon, new THREE.Color(0x5d8fd0));
  const mountains = new THREE.Mesh(buildMountains(390, horizon), new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, depthWrite: false }));
  mountains.renderOrder = -9;
  mountains.frustumCulled = false;
  sky.add(dome, mountains);
  disposables.push(dome.geometry, dome.material as THREE.Material, mountains.geometry, mountains.material as THREE.Material);
  group.add(sky);

  // --- Niveles de calidad
  let spec = LEVEL_SPEC[startLevel];
  let visible = 0;
  const applyTextures = (t: TexSet) => {
    const prev = tex;
    tex = t;
    for (const m of [asphaltMat, rampMat]) {
      m.map = t.asphalt.map;
      m.normalMap = t.asphalt.normalMap;
      m.roughnessMap = t.asphalt.roughnessMap;
    }
    groundMat.map = t.grass;
    u.uDirt.value = t.dirt;
    paintMat.alphaMap = t.wear;
    walkMat.map = t.paving;
    shopMat.map = t.shop;
    for (const st of STYLES) facadeMats.get(st)!.map = t.facades[st];
    // Libera de la GPU las del nivel anterior (el lienzo queda en caché por si se vuelve a él).
    if (prev !== t) for (const x of texList(prev)) x.dispose();
  };

  return {
    group,
    sky,
    uniforms: u,
    setLevel(level) {
      spec = LEVEL_SPEC[level];
      const t = getTex(spec.tex);
      if (t !== tex) applyTextures(t);
    },
    prepare(level) {
      getTex(LEVEL_SPEC[level].tex);
    },
    setWeather(tint, wet) {
      (dome.material as THREE.MeshBasicMaterial).color.setHex(tint);
      (mountains.material as THREE.MeshBasicMaterial).color.setHex(tint);
      // Mojado: más liso (brilla el reflejo del sol) y algo más oscuro.
      for (const m of [asphaltMat, rampMat]) {
        m.roughness = 1 - 0.45 * wet;
        m.color.setHex(wet > 0.5 ? 0x45484d : m === asphaltMat ? 0x55585e : 0x5b5e63);
      }
    },
    cull(cam) {
      visible = 0;
      for (const c of chunks) {
        const lim = c.kind === 'detail' ? spec.detail : c.kind === 'trees' ? spec.far * 0.8 : spec.far;
        const d = Math.hypot(c.center.x - cam.x, c.center.z - cam.z) - c.radius;
        c.obj.visible = d < lim;
        if (c.obj.visible) visible++;
      }
    },
    visibleChunks: () => visible,
    dispose() {
      for (const d of disposables) d.dispose();
      for (const t of texCache.values()) for (const x of texList(t)) x.dispose();
    },
  };
}
