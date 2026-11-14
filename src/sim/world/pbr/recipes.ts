/**
 * Recetas de los materiales PBR generados por código. Cada receta devuelve tres
 * mapas RGBA8 en mosaico:
 *  - `albedo` (sRGB),
 *  - `normal` (lineal; Sobel sobre un mapa de alturas, con intensidad propia del material),
 *  - `packed` (lineal): R = oclusión ambiental, G = rugosidad, B = máscara extra
 *    (asfalto: zonas bajas donde se forman charcos; cristal: suciedad).
 *
 * Sin DOM ni Three.js: se ejecuta en un worker (o por bloques en el hilo principal).
 * Los tamaños de los rasgos son relativos a N, así que 512, 1024 y 2048 se parecen.
 */
import { blur, branchingCracks, cavityAO, clamp01, fbm, line, normalize, ridged, rng, smooth, sobelNormal, stamp, to8, voronoi, type Field } from './noise';

export type MatId =
  | 'asphalt' | 'line' | 'paving' | 'grassA' | 'grassB' | 'dirt' | 'gravel' | 'concrete' | 'brick'
  | 'metal' | 'glass' | 'rubber' | 'plastic' | 'fabric' | 'leather' | 'carpaint';

export const MAT_IDS: MatId[] = ['asphalt', 'line', 'paving', 'grassA', 'grassB', 'dirt', 'gravel', 'concrete', 'brick', 'metal', 'glass', 'rubber', 'plastic', 'fabric', 'leather', 'carpaint'];

export interface PbrMaps {
  size: number;
  albedo: Uint8Array;
  normal: Uint8Array;
  packed: Uint8Array;
}

/** Color (sRGB 0..1), rugosidad y máscara extra de un píxel. */
type Px = (i: number, x: number, y: number, out: Float32Array) => void;

/** Monta los tres mapas: normales por Sobel del relieve `h`, AO de cavidades y el resto píxel a píxel. */
function assemble(N: number, h: Field, normalK: number, aoK: number, px: Px): PbrMaps {
  const albedo = new Uint8Array(N * N * 4), packed = new Uint8Array(N * N * 4);
  const ao = aoK > 0 ? cavityAO(h, N, Math.max(2, N / 96), aoK) : null;
  const o = new Float32Array(5); // r, g, b, rugosidad, extra
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const i = y * N + x, k = i * 4;
      o[4] = 0;
      px(i, x, y, o);
      albedo[k] = to8(o[0]!);
      albedo[k + 1] = to8(o[1]!);
      albedo[k + 2] = to8(o[2]!);
      albedo[k + 3] = 255;
      packed[k] = to8(ao ? ao[i]! : 1);
      packed[k + 1] = to8(o[3]!);
      packed[k + 2] = to8(o[4]!);
      packed[k + 3] = 255;
    }
  }
  return { size: N, albedo, normal: sobelNormal(h, N, normalK * (N / 1024)), packed };
}

// ---------------------------------------------------------------- suelo
function asphalt(N: number): PbrMaps {
  const r = rng(101);
  const grain = fbm(N, N / 6, 3, r, 0.6); // árido fino
  const stones = voronoi(N, Math.round(N / 9), r); // piedras del árido
  const macro = fbm(N, 3, 5, r); // manchas a gran escala (claras y oscuras)
  const macro2 = fbm(N, 2, 4, r);
  const region = fbm(N, 4, 4, r);
  const web = voronoi(N, 7, r); // piel de cocodrilo (grietas de Voronoi)
  const cracks = branchingCracks(N, r, 5, Math.max(0.8, N / 520));
  // Baches y manchas de aceite/goma
  const holes = new Float32Array(N * N), oil = new Float32Array(N * N);
  for (let k = 0; k < 3; k++) stamp(holes, N, r() * N, r() * N, N * (0.022 + r() * 0.02), 1, 'max', 0.3);
  for (let k = 0; k < 7; k++) stamp(oil, N, r() * N, r() * N, N * (0.02 + r() * 0.05), 0.5 + r() * 0.5, 'max', 0.1);
  // Parches de reasfaltado (rectángulos con borde sellado)
  const patch = new Float32Array(N * N), seal = new Float32Array(N * N);
  for (let k = 0; k < 2; k++) {
    const x0 = Math.floor(r() * N), y0 = Math.floor(r() * N), w = Math.floor(N * (0.14 + r() * 0.14)), hh = Math.floor(N * (0.1 + r() * 0.12));
    for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++) patch[((y0 + y) % N) * N + ((x0 + x) % N)] = 1;
    const sw = Math.max(1, N / 340);
    line(seal, N, x0, y0, x0 + w, y0, sw, 1);
    line(seal, N, x0, y0 + hh, x0 + w, y0 + hh, sw, 1);
    line(seal, N, x0, y0, x0, y0 + hh, sw, 1);
    line(seal, N, x0 + w, y0, x0 + w, y0 + hh, sw, 1);
  }
  const crack = new Float32Array(N * N), h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) {
    const webC = (1 - smooth(0.0, 0.022, web.edge[i]!)) * smooth(0.56, 0.7, region[i]!);
    const c = Math.max(cracks[i]!, webC) * (1 - patch[i]!);
    crack[i] = c;
    const stone = 1 - smooth(0.15, 0.6, stones.f1[i]!);
    h[i] = 0.5 + (grain[i]! - 0.5) * 0.5 + stone * 0.22 * (1 - patch[i]! * 0.5) - c * 0.9 - holes[i]! * 0.7 + patch[i]! * 0.05 + seal[i]! * 0.08 + (macro2[i]! - 0.5) * 0.25;
  }
  const low = normalize(blur(macro2, N, N / 48));
  return assemble(N, h, 5.5, 5, (i, _x, _y, o) => {
    const stone = 1 - smooth(0.15, 0.6, stones.f1[i]!);
    const bright = stones.id[i]! > 0.82 ? stone * 0.16 : stones.id[i]! < 0.15 ? -stone * 0.07 : 0;
    let v = 0.3 + (grain[i]! - 0.5) * 0.13 + (macro[i]! - 0.5) * 0.14 + bright;
    v *= 1 - patch[i]! * 0.2;
    v *= 1 - oil[i]! * 0.38;
    v *= 1 - crack[i]! * 0.7;
    v *= 1 - holes[i]! * 0.45;
    v *= 1 - seal[i]! * 0.6;
    const warm = (macro2[i]! - 0.5) * 0.025;
    o[0] = v + warm;
    o[1] = v + warm * 0.4;
    o[2] = v - warm + 0.008;
    o[3] = clamp01(0.9 - oil[i]! * 0.42 - patch[i]! * 0.1 - seal[i]! * 0.3 + crack[i]! * 0.06 - (stones.id[i]! > 0.6 ? stone * 0.1 : 0) + (macro[i]! - 0.5) * 0.08);
    // Charcos: zonas bajas a gran escala y baches
    o[4] = clamp01(smooth(0.52, 0.3, low[i]!) + holes[i]!);
  });
}

function roadLine(N: number): PbrMaps {
  const r = rng(202);
  const grit = fbm(N, N / 5, 3, r, 0.6);
  const dirt = fbm(N, 5, 5, r);
  const hair = voronoi(N, 14, r);
  const chips = fbm(N, 24, 4, r);
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) h[i] = 0.5 + (grit[i]! - 0.5) * 0.35 - (1 - smooth(0, 0.02, hair.edge[i]!)) * 0.35 - smooth(0.7, 0.85, chips[i]!) * 0.5;
  return assemble(N, h, 3, 4, (i, _x, _y, o) => {
    const crack = (1 - smooth(0, 0.02, hair.edge[i]!)) * 0.25;
    const chip = smooth(0.7, 0.85, chips[i]!);
    const v = (0.9 + (grit[i]! - 0.5) * 0.08 - smooth(0.45, 0.8, dirt[i]!) * 0.2) * (1 - crack) * (1 - chip * 0.45);
    o[0] = v;
    o[1] = v * 0.99;
    o[2] = v * 0.95;
    o[3] = clamp01(0.55 + chip * 0.3 + smooth(0.45, 0.8, dirt[i]!) * 0.2 + (grit[i]! - 0.5) * 0.15);
  });
}

/** Acera: 4×4 baldosas con juntas, biseles, desconchones, manchas y alguna grieta. */
function paving(N: number): PbrMaps {
  const r = rng(303);
  const T = 4, cell = N / T;
  const speck = fbm(N, N / 5, 3, r, 0.6);
  const macro = fbm(N, 3, 5, r);
  const chipsN = fbm(N, 20, 4, r);
  const cracks = branchingCracks(N, r, 2, Math.max(0.8, N / 600), 0.02);
  const gum = new Float32Array(N * N);
  for (let k = 0; k < 14; k++) stamp(gum, N, r() * N, r() * N, N * (0.006 + r() * 0.008), 1, 'max', 0.6);
  const shade = Array.from({ length: T * T }, () => 0.9 + r() * 0.14);
  const tint = Array.from({ length: T * T }, () => (r() - 0.5) * 0.03);
  const joint = new Float32Array(N * N), h = new Float32Array(N * N);
  const jw = Math.max(1.5, N / 170);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const i = y * N + x;
      const dx = Math.min(x % cell, cell - (x % cell)), dy = Math.min(y % cell, cell - (y % cell));
      const d = Math.min(dx, dy);
      // Bordes desgastados: la junta se ensancha donde el ruido lo dice
      const wear = chipsN[i]! > 0.62 ? (chipsN[i]! - 0.62) * N * 0.05 : 0;
      const j = 1 - smooth(jw * 0.5, jw + wear, d);
      joint[i] = j;
      const bevel = smooth(jw, jw * 3.5, d);
      h[i] = 0.25 + bevel * 0.5 + (speck[i]! - 0.5) * 0.12 - j * 0.3 - cracks[i]! * 0.5 + gum[i]! * 0.04;
    }
  }
  return assemble(N, h, 4.5, 6, (i, x, y, o) => {
    const t = Math.floor(y / cell) * T + Math.floor(x / cell);
    let v = (0.7 + (speck[i]! - 0.5) * 0.14 + (macro[i]! - 0.5) * 0.12) * shade[t]!;
    v *= 1 - joint[i]! * 0.42;
    v *= 1 - cracks[i]! * 0.55;
    v *= 1 - gum[i]! * 0.45;
    o[0] = v + tint[t]! + 0.01;
    o[1] = v;
    o[2] = v - tint[t]! - 0.015;
    o[3] = clamp01(0.82 + joint[i]! * 0.12 - gum[i]! * 0.3 + (speck[i]! - 0.5) * 0.1);
  });
}

/**
 * Hierba. El color es «relativo» (cerca del blanco): el tono verde lo pone el
 * color de vértice del terreno, así una textura sirve para pradera, parque y jardín.
 */
function grass(N: number, variant: 0 | 1): PbrMaps {
  const r = rng(variant ? 505 : 404);
  const blades = ridged(N, N / 10, 3, r);
  const fine = fbm(N, N / 4, 2, r);
  const clumps = fbm(N, 10, 5, r);
  const macro = fbm(N, 3, 4, r);
  const clover = variant ? voronoi(N, 46, r) : null;
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) {
    const c = clover ? (1 - smooth(0.15, 0.5, clover.f1[i]!)) * smooth(0.5, 0.7, clumps[i]!) : 0;
    h[i] = blades[i]! * 0.55 + clumps[i]! * 0.35 + fine[i]! * 0.15 + c * 0.2;
  }
  return assemble(N, h, 4, 5, (i, _x, _y, o) => {
    const lum = 0.62 + blades[i]! * 0.26 + (clumps[i]! - 0.5) * 0.3 + (fine[i]! - 0.5) * 0.1;
    // Zonas secas (amarillentas) y zonas frondosas (más oscuras)
    const dry = smooth(variant ? 0.5 : 0.62, 0.85, macro[i]! * 0.6 + clumps[i]! * 0.4);
    const c = clover ? (1 - smooth(0.15, 0.5, clover.f1[i]!)) * smooth(0.5, 0.7, clumps[i]!) : 0;
    o[0] = lum * (0.86 + dry * 0.34) * (1 - c * 0.3);
    o[1] = lum * (1 - dry * 0.04) * (1 - c * 0.12);
    o[2] = lum * (0.8 - dry * 0.3) * (1 - c * 0.3);
    o[3] = 0.95;
  });
}

function dirt(N: number): PbrMaps {
  const r = rng(606);
  const base = fbm(N, 6, 6, r);
  const fine = fbm(N, N / 5, 3, r, 0.6);
  const pebbles = voronoi(N, 56, r);
  const macro = fbm(N, 2, 4, r);
  const cracks = voronoi(N, 9, r);
  // Piedrecillas sueltas: pocas, pequeñas y de forma irregular
  const peb = (i: number) => (pebbles.id[i]! > 0.84 ? (1 - smooth(0.08, 0.3 + fine[i]! * 0.12, pebbles.f1[i]!)) : 0);
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) {
    h[i] = base[i]! * 0.5 + fine[i]! * 0.2 + peb(i) * 0.3 - (1 - smooth(0, 0.03, cracks.edge[i]!)) * smooth(0.55, 0.75, macro[i]!) * 0.3;
  }
  return assemble(N, h, 5, 5, (i, _x, _y, o) => {
    const p = peb(i) * 0.85;
    const dryCrack = (1 - smooth(0, 0.03, cracks.edge[i]!)) * smooth(0.55, 0.75, macro[i]!);
    const lum = (0.82 + (base[i]! - 0.5) * 0.4 + (fine[i]! - 0.5) * 0.16) * (1 - dryCrack * 0.35);
    const g = 0.4 + pebbles.id[i]! * 0.16 + (fine[i]! - 0.5) * 0.1;
    o[0] = lum * 0.56 * (1 - p) + (g + 0.03) * p;
    o[1] = lum * 0.46 * (1 - p) + g * p;
    o[2] = lum * 0.34 * (1 - p) + (g - 0.04) * p;
    o[3] = clamp01(0.95 - p * 0.2);
  });
}

function gravel(N: number): PbrMaps {
  const r = rng(707);
  const big = voronoi(N, 34, r);
  const small = voronoi(N, 90, r);
  const fine = fbm(N, N / 4, 2, r);
  const macro = fbm(N, 3, 4, r);
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) {
    const a = smooth(0.0, 0.16, big.edge[i]!) * (1 - big.f1[i]! * 0.6);
    const b = smooth(0.0, 0.2, small.edge[i]!) * 0.45;
    h[i] = Math.max(a, b) + fine[i]! * 0.08;
  }
  return assemble(N, h, 6, 7, (i, _x, _y, o) => {
    const gap = 1 - smooth(0.0, 0.1, Math.min(big.edge[i]!, small.edge[i]! * 1.6));
    const id = big.id[i]!;
    const lum = (0.5 + id * 0.3 + (fine[i]! - 0.5) * 0.12 + (macro[i]! - 0.5) * 0.1) * (1 - gap * 0.6);
    const warm = (id - 0.5) * 0.08;
    o[0] = lum + warm;
    o[1] = lum + warm * 0.5;
    o[2] = lum - warm;
    o[3] = clamp01(0.82 + gap * 0.15 - id * 0.12);
  });
}

// ---------------------------------------------------------------- construcción
/** Hormigón: poros, manchas, chorreones, fisuras finas y juntas de dilatación en cruz. */
function concrete(N: number): PbrMaps {
  const r = rng(808);
  const base = fbm(N, 4, 6, r);
  const fine = fbm(N, N / 4, 3, r, 0.6);
  const pores = fbm(N, N / 3, 1, r);
  const macro = fbm(N, 2, 4, r);
  const hair = voronoi(N, 6, r);
  const region = fbm(N, 5, 3, r);
  // Chorreones verticales: ruido muy estirado
  const streak = new Float32Array(N * N);
  const cols = fbm(N, 48, 3, r);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) streak[y * N + x] = cols[(Math.floor(y / 14) % N) * N + x]!;
  const joint = new Float32Array(N * N);
  const jw = Math.max(1.5, N / 220);
  line(joint, N, 0, N * 0.5, N, N * 0.5, jw, 1);
  line(joint, N, N * 0.5, 0, N * 0.5, N, jw, 1);
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) {
    const pore = smooth(0.8, 0.95, pores[i]!);
    const crack = (1 - smooth(0, 0.014, hair.edge[i]!)) * smooth(0.6, 0.75, region[i]!);
    h[i] = 0.5 + (base[i]! - 0.5) * 0.3 + (fine[i]! - 0.5) * 0.14 - pore * 0.5 - crack * 0.5 - joint[i]! * 0.7;
  }
  return assemble(N, h, 3.2, 5, (i, _x, _y, o) => {
    const pore = smooth(0.8, 0.95, pores[i]!);
    const crack = (1 - smooth(0, 0.014, hair.edge[i]!)) * smooth(0.6, 0.75, region[i]!);
    const st = smooth(0.55, 0.9, streak[i]!) * smooth(0.4, 0.7, macro[i]!);
    let v = 0.64 + (base[i]! - 0.5) * 0.18 + (fine[i]! - 0.5) * 0.08 + (macro[i]! - 0.5) * 0.1;
    v *= (1 - pore * 0.35) * (1 - crack * 0.5) * (1 - joint[i]! * 0.5) * (1 - st * 0.22);
    o[0] = v + 0.01;
    o[1] = v + 0.005;
    o[2] = v - 0.012 - st * 0.02;
    o[3] = clamp01(0.84 + pore * 0.1 - st * 0.1 + (fine[i]! - 0.5) * 0.1);
  });
}

/** Ladrillo visto: 16 hiladas × 8 ladrillos a soga, llaga rehundida, tono distinto por pieza y aristas melladas. */
function brick(N: number): PbrMaps {
  const r = rng(909);
  const ROWS = 16, COLS = 8;
  const bh = N / ROWS, bw = N / COLS;
  const fine = fbm(N, N / 5, 3, r, 0.6);
  const chips = fbm(N, 30, 4, r);
  const macro = fbm(N, 3, 4, r);
  const tone = Array.from({ length: ROWS * COLS }, () => r());
  const dark = Array.from({ length: ROWS * COLS }, () => (r() < 0.12 ? 0.75 : 1));
  const mortar = new Float32Array(N * N), id = new Int32Array(N * N), h = new Float32Array(N * N);
  const mw = Math.max(1.5, N / 240);
  for (let y = 0; y < N; y++) {
    const row = Math.floor(y / bh);
    const off = row % 2 ? bw / 2 : 0;
    for (let x = 0; x < N; x++) {
      const i = y * N + x;
      const xx = (x + off) % N;
      const col = Math.floor(xx / bw) % COLS;
      const dx = Math.min(xx % bw, bw - (xx % bw)), dy = Math.min(y % bh, bh - (y % bh));
      const d = Math.min(dx, dy);
      const wear = chips[i]! > 0.6 ? (chips[i]! - 0.6) * N * 0.04 : 0;
      const m = 1 - smooth(mw * 0.6, mw + wear, d);
      mortar[i] = m;
      id[i] = row * COLS + col;
      h[i] = 0.2 + (1 - m) * 0.55 + (fine[i]! - 0.5) * 0.14 * (1 - m) + (tone[row * COLS + col]! - 0.5) * 0.08;
    }
  }
  return assemble(N, h, 4, 6, (i, _x, _y, o) => {
    const m = mortar[i]!, t = tone[id[i]!]!, dk = dark[id[i]!]!;
    const lum = (0.9 + (fine[i]! - 0.5) * 0.22 + (macro[i]! - 0.5) * 0.14) * dk;
    // Paleta: del rojo teja al marrón tostado
    const br = (0.6 + t * 0.14) * lum, bg = (0.33 + t * 0.07) * lum, bb = (0.25 + t * 0.04) * lum;
    const mo = 0.66 + (fine[i]! - 0.5) * 0.12;
    o[0] = br * (1 - m) + mo * m;
    o[1] = bg * (1 - m) + mo * 0.97 * m;
    o[2] = bb * (1 - m) + mo * 0.92 * m;
    o[3] = clamp01(0.82 + m * 0.12 + (t - 0.5) * 0.1);
  });
}

/** Metal galvanizado/pintado de farolas y señales: cepillado vertical, arañazos y puntos de óxido. Color relativo. */
function metal(N: number): PbrMaps {
  const r = rng(1010);
  const cols = fbm(N, N / 3, 2, r);
  const macro = fbm(N, 3, 5, r);
  const spangle = voronoi(N, 12, r);
  const rustN = fbm(N, 14, 5, r);
  const scratch = new Float32Array(N * N);
  for (let k = 0; k < 60; k++) {
    const x = r() * N, y = r() * N, a = (r() - 0.5) * 1.2 + Math.PI / 2, l = N * (0.03 + r() * 0.12);
    line(scratch, N, x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, Math.max(0.6, N / 1100), 0.5 + r() * 0.5);
  }
  const brushed = new Float32Array(N * N), h = new Float32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) brushed[y * N + x] = cols[(Math.floor(y / 24) % N) * N + x]!;
  for (let i = 0; i < h.length; i++) {
    const rust = smooth(0.72, 0.86, rustN[i]!);
    h[i] = 0.5 + (brushed[i]! - 0.5) * 0.12 - scratch[i]! * 0.3 + rust * 0.25 * rustN[i]!;
  }
  return assemble(N, h, 2.2, 3, (i, _x, _y, o) => {
    const rust = smooth(0.72, 0.86, rustN[i]!);
    const lum = 0.86 + (brushed[i]! - 0.5) * 0.1 + (spangle.id[i]! - 0.5) * 0.06 + (macro[i]! - 0.5) * 0.12 + scratch[i]! * 0.12;
    o[0] = lum * (1 - rust) + 0.52 * rust;
    o[1] = lum * (1 - rust) + 0.3 * rust;
    o[2] = lum * (1 - rust) + 0.16 * rust;
    o[3] = clamp01(0.42 + (brushed[i]! - 0.5) * 0.15 + rust * 0.5 - scratch[i]! * 0.15 + (macro[i]! - 0.5) * 0.15);
    o[4] = rust;
  });
}

// ---------------------------------------------------------------- coche
/** Cristal sucio: velo de polvo, churretes de agua, gotas secas y huellas. Color relativo; B = suciedad. */
function glass(N: number): PbrMaps {
  const r = rng(1111);
  const haze = fbm(N, 4, 5, r);
  const cols = fbm(N, 40, 3, r);
  const spots = voronoi(N, 30, r);
  const smudge = fbm(N, 9, 4, r);
  const drip = new Float32Array(N * N), h = new Float32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) drip[y * N + x] = cols[(Math.floor(y / 10) % N) * N + x]!;
  const dirtOf = (i: number) => {
    const ring = spots.id[i]! > 0.6 ? smooth(0.2, 0.3, spots.f1[i]!) * (1 - smooth(0.3, 0.38, spots.f1[i]!)) : 0;
    return clamp01(smooth(0.45, 0.85, haze[i]!) * 0.6 + smooth(0.6, 0.9, drip[i]!) * 0.35 + ring * 0.5 + smooth(0.62, 0.8, smudge[i]!) * 0.3);
  };
  for (let i = 0; i < h.length; i++) h[i] = 0.5 + dirtOf(i) * 0.08;
  return assemble(N, h, 0.6, 0, (i, _x, _y, o) => {
    const d = dirtOf(i);
    o[0] = 0.86 + d * 0.14;
    o[1] = 0.86 + d * 0.13;
    o[2] = 0.86 + d * 0.1;
    o[3] = clamp01(0.05 + d * 0.5);
    o[4] = d;
  });
}

/** Goma de neumático: grano fino, roces grises y polvo en los huecos. Color relativo. */
function rubber(N: number): PbrMaps {
  const r = rng(1212);
  const grain = fbm(N, N / 4, 3, r, 0.6);
  const macro = fbm(N, 4, 5, r);
  const cells = voronoi(N, 70, r);
  const scuff = new Float32Array(N * N);
  for (let k = 0; k < 26; k++) {
    const x = r() * N, y = r() * N, a = r() * Math.PI, l = N * (0.04 + r() * 0.1);
    line(scuff, N, x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, N / 260, 0.4 + r() * 0.6);
  }
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) h[i] = 0.5 + (grain[i]! - 0.5) * 0.35 + smooth(0, 0.12, cells.edge[i]!) * 0.15 - scuff[i]! * 0.1;
  return assemble(N, h, 3, 4, (i, _x, _y, o) => {
    const dust = smooth(0.55, 0.85, macro[i]!) * 0.22;
    const v = 0.66 + (grain[i]! - 0.5) * 0.16 + scuff[i]! * 0.22 + dust;
    o[0] = v + dust * 0.06;
    o[1] = v + dust * 0.03;
    o[2] = v;
    o[3] = clamp01(0.9 - scuff[i]! * 0.2 + dust * 0.1 + (grain[i]! - 0.5) * 0.1);
  });
}

/** Plástico gofrado del salpicadero (grano tipo piel). Color relativo. */
function plastic(N: number): PbrMaps {
  const r = rng(1313);
  const cells = voronoi(N, Math.round(N / 7), r);
  const macro = fbm(N, 4, 4, r);
  const fine = fbm(N, N / 3, 2, r);
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) h[i] = smooth(0, 0.22, cells.edge[i]!) * 0.7 + (cells.id[i]! - 0.5) * 0.15 + fine[i]! * 0.1;
  return assemble(N, h, 3.2, 3, (i, _x, _y, o) => {
    const pit = 1 - smooth(0, 0.14, cells.edge[i]!);
    const dust = pit * smooth(0.45, 0.8, macro[i]!) * 0.25;
    const v = 0.8 + (macro[i]! - 0.5) * 0.08 - pit * 0.12 + dust;
    o[0] = v;
    o[1] = v;
    o[2] = v + 0.01;
    o[3] = clamp01(0.62 + pit * 0.2 - (macro[i]! - 0.5) * 0.2);
  });
}

/** Tela (techo, montantes y asientos): tejido de trama y urdimbre con pelusa. Color relativo. */
function fabric(N: number): PbrMaps {
  const r = rng(1414);
  const fiber = fbm(N, N / 3, 2, r);
  const macro = fbm(N, 4, 4, r);
  const threads = Math.round(N / 8);
  const k = (Math.PI * 2 * threads) / N;
  const h = new Float32Array(N * N);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const wx = Math.sin(x * k), wy = Math.sin(y * k);
      // Tafetán: los hilos pasan por encima y por debajo alternando
      const over = (Math.floor((x * threads) / N) + Math.floor((y * threads) / N)) % 2 ? Math.abs(wx) : Math.abs(wy);
      h[y * N + x] = over * 0.7 + fiber[y * N + x]! * 0.3;
    }
  }
  return assemble(N, h, 3.5, 4, (i, _x, _y, o) => {
    const v = 0.68 + h[i]! * 0.26 + (macro[i]! - 0.5) * 0.1 + (fiber[i]! - 0.5) * 0.08;
    o[0] = v;
    o[1] = v;
    o[2] = v;
    o[3] = 0.96;
  });
}

/** Cuero del volante: poro, arrugas finas y zonas pulidas por las manos. Color relativo. */
function leather(N: number): PbrMaps {
  const r = rng(1515);
  const cells = voronoi(N, Math.round(N / 12), r);
  const wrinkle = ridged(N, 10, 4, r);
  const macro = fbm(N, 3, 4, r);
  const fine = fbm(N, N / 3, 2, r);
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) h[i] = smooth(0, 0.18, cells.edge[i]!) * 0.6 - smooth(0.86, 1, wrinkle[i]!) * 0.5 + fine[i]! * 0.1;
  return assemble(N, h, 2.8, 4, (i, _x, _y, o) => {
    const pit = 1 - smooth(0, 0.12, cells.edge[i]!);
    const crease = smooth(0.86, 1, wrinkle[i]!);
    const worn = smooth(0.5, 0.8, macro[i]!);
    const v = 0.78 - pit * 0.14 - crease * 0.18 + worn * 0.1;
    o[0] = v + 0.01;
    o[1] = v;
    o[2] = v - 0.01;
    o[3] = clamp01(0.58 - worn * 0.28 + pit * 0.15 + crease * 0.1);
  });
}

/** Pintura del coche: micro-rayones en remolino (se ven en el brillo), piel de naranja y escamas metálicas. */
function carpaint(N: number): PbrMaps {
  const r = rng(1616);
  const peel = fbm(N, 26, 3, r);
  const flake = fbm(N, N / 2, 1, r);
  const dust = fbm(N, 5, 5, r);
  const scratch = new Float32Array(N * N);
  // Remolinos de lavado: arcos cortos y finos en todas direcciones
  for (let k = 0; k < 520; k++) {
    let x = r() * N, y = r() * N, a = r() * Math.PI * 2;
    const curve = (r() - 0.5) * 0.12, v = 0.25 + r() * 0.75, seg = 6 + Math.floor(r() * 14);
    for (let s = 0; s < seg; s++) {
      const nx = x + Math.cos(a) * (N / 170), ny = y + Math.sin(a) * (N / 170);
      line(scratch, N, x, y, nx, ny, Math.max(0.55, N / 1500), v);
      x = nx;
      y = ny;
      a += curve;
    }
  }
  const h = new Float32Array(N * N);
  for (let i = 0; i < h.length; i++) h[i] = 0.5 + (peel[i]! - 0.5) * 0.25 - scratch[i]! * 0.12;
  return assemble(N, h, 0.9, 0, (i, _x, _y, o) => {
    const f = 0.93 + (flake[i]! - 0.5) * 0.12;
    o[0] = f;
    o[1] = f;
    o[2] = f;
    // G = cuánta rugosidad añaden los rayones y el polvo (0 = pintura perfecta)
    o[3] = clamp01(scratch[i]! * 0.75 + smooth(0.6, 0.9, dust[i]!) * 0.35);
    o[4] = scratch[i]!;
  });
}

const RECIPES: Record<MatId, (N: number) => PbrMaps> = {
  asphalt, line: roadLine, paving, grassA: (N) => grass(N, 0), grassB: (N) => grass(N, 1), dirt, gravel, concrete, brick,
  metal, glass, rubber, plastic, fabric, leather, carpaint,
};

export function generate(id: MatId, N: number): PbrMaps {
  return RECIPES[id](N);
}

/** Detail texture: grano fino en escala de grises (se mezcla a 8× en el shader para dar nitidez de cerca). */
export function detailGrain(N: number): Uint8Array {
  const r = rng(77);
  const a = fbm(N, N / 4, 3, r, 0.65);
  const b = voronoi(N, Math.round(N / 5), r);
  const out = new Uint8Array(N * N * 4);
  for (let i = 0; i < N * N; i++) {
    const v = to8(clamp01(0.5 + (a[i]! - 0.5) * 0.8 + (smooth(0, 0.3, b.edge[i]!) - 0.6) * 0.3));
    out[i * 4] = out[i * 4 + 1] = out[i * 4 + 2] = v;
    out[i * 4 + 3] = 255;
  }
  return out;
}

// ---------------------------------------------------------------- decals
/** Casillas del atlas de decals (4 × 4). El orden es el índice de casilla. */
export const DECALS = ['frenada-doble', 'frenada-curva', 'parche', 'parche-irregular', 'aceite', 'goteo', 'goma', 'marca-borrada', 'grieta-sellada', 'grieta-ramificada', 'tapa', 'rejilla', 'humedad', 'hojas', 'linea-desgastada', 'arena'] as const;
export type DecalId = (typeof DECALS)[number];
export const DECAL_GRID = 4;

/**
 * Atlas de decals (RGBA sRGB con transparencia): marcas de frenada, parches,
 * manchas, restos de marcas viales, grietas selladas, tapas de registro…
 * Una sola textura para todos, así se dibujan en una única llamada.
 */
export function decalAtlas(N: number): Uint8Array {
  const T = N / DECAL_GRID;
  const out = new Uint8Array(N * N * 4);
  const r = rng(4242);
  DECALS.forEach((id, idx) => {
    const a = new Float32Array(T * T); // opacidad
    const col = new Float32Array(T * T * 3); // color sRGB
    const n = fbm(T, 8, 4, r);
    const fine = fbm(T, T / 3, 2, r);
    const fill = (rr: number, g: number, b: number) => {
      for (let i = 0; i < T * T; i++) {
        col[i * 3] = rr;
        col[i * 3 + 1] = g;
        col[i * 3 + 2] = b;
      }
    };
    fill(0.05, 0.05, 0.055);
    const fadeEnds = (i: number) => {
      const y = Math.floor(i / T) / T;
      return smooth(0.04, 0.3, y) * smooth(0.96, 0.6, y);
    };
    switch (id) {
      case 'frenada-doble':
      case 'frenada-curva': {
        const curve = id === 'frenada-curva' ? 0.18 : 0;
        for (const side of id === 'frenada-curva' ? [0] : [-1, 1]) {
          let px = T * (0.5 + side * 0.24), py = T * 0.06;
          for (let y = T * 0.06; y < T * 0.94; y += 2) {
            const nx = T * (0.5 + side * 0.24) + Math.sin((y / T) * Math.PI) * T * curve;
            line(a, T, px, py, nx, y, T * 0.035, 1);
            px = nx;
            py = y;
          }
        }
        for (let i = 0; i < T * T; i++) a[i] = a[i]! * fadeEnds(i) * (0.45 + n[i]! * 0.5) * (0.6 + fine[i]! * 0.5);
        break;
      }
      case 'parche':
      case 'parche-irregular': {
        const irr = id === 'parche-irregular';
        for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
          const u = Math.abs(x / T - 0.5) * 2, v = Math.abs(y / T - 0.5) * 2;
          const d = irr ? Math.hypot(u, v) + (n[y * T + x]! - 0.5) * 0.5 : Math.max(u, v) + (n[y * T + x]! - 0.5) * 0.06;
          const inside = 1 - smooth(0.74, 0.8, d);
          const rim = smooth(0.66, 0.74, d) * inside;
          const i = y * T + x;
          a[i] = inside * (0.5 + fine[i]! * 0.2) + rim * 0.4;
          const c = 0.09 + fine[i]! * 0.06 - rim * 0.06;
          col[i * 3] = col[i * 3 + 1] = c;
          col[i * 3 + 2] = c + 0.005;
        }
        break;
      }
      case 'aceite':
        for (let k = 0; k < 5; k++) stamp(a, T, T * (0.35 + r() * 0.3), T * (0.35 + r() * 0.3), T * (0.1 + r() * 0.14), 0.8, 'max', 0.15);
        for (let i = 0; i < T * T; i++) a[i] = a[i]! * (0.6 + n[i]! * 0.5);
        fill(0.03, 0.03, 0.035);
        break;
      case 'goteo':
        for (let k = 0; k < 16; k++) stamp(a, T, T * (0.45 + r() * 0.1), T * (0.08 + (k / 16) * 0.84), T * (0.012 + r() * 0.03), 0.85, 'max', 0.3);
        fill(0.03, 0.03, 0.035);
        break;
      case 'goma':
        for (let i = 0; i < T * T; i++) {
          const x = (i % T) / T;
          a[i] = smooth(0.12, 0.4, x) * smooth(0.88, 0.6, x) * fadeEnds(i) * (0.2 + n[i]! * 0.35);
        }
        break;
      case 'marca-borrada':
      case 'linea-desgastada': {
        const w = id === 'marca-borrada' ? 0.16 : 0.07;
        for (let i = 0; i < T * T; i++) {
          const x = (i % T) / T;
          const band = 1 - smooth(w * 0.7, w, Math.abs(x - 0.5));
          a[i] = band * fadeEnds(i) * smooth(0.35, 0.7, n[i]! * 0.7 + fine[i]! * 0.4) * (id === 'marca-borrada' ? 0.45 : 0.7);
        }
        fill(0.82, 0.81, 0.77);
        break;
      }
      case 'grieta-sellada':
      case 'grieta-ramificada': {
        const rr = rng(idx * 31 + 5);
        let x = T * 0.5, y = T * 0.06, ang = Math.PI / 2;
        while (y < T * 0.94) {
          ang += (rr() - 0.5) * 0.5;
          ang = Math.max(1.0, Math.min(2.14, ang));
          const nx = x + Math.cos(ang) * 4, ny = y + Math.sin(ang) * 4;
          line(a, T, x, y, nx, ny, T * 0.016, 1);
          if (id === 'grieta-ramificada' && rr() < 0.05) {
            let bx = nx, by = ny, ba = ang + (rr() < 0.5 ? 0.9 : -0.9);
            for (let s = 0; s < 14 && bx > T * 0.1 && bx < T * 0.9; s++) {
              const cx = bx + Math.cos(ba) * 4, cy = by + Math.sin(ba) * 4;
              line(a, T, bx, by, cx, cy, T * 0.012, 0.9);
              bx = cx;
              by = cy;
              ba += (rr() - 0.5) * 0.4;
            }
          }
          x = Math.max(T * 0.2, Math.min(T * 0.8, nx));
          y = ny;
        }
        for (let i = 0; i < T * T; i++) a[i] = Math.min(1, a[i]! * 1.3) * 0.9;
        fill(0.035, 0.035, 0.04);
        break;
      }
      case 'tapa':
      case 'rejilla':
        for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
          const i = y * T + x;
          const u = x / T - 0.5, v = y / T - 0.5;
          const round = id === 'tapa';
          const d = round ? Math.hypot(u, v) : Math.max(Math.abs(u) * 1.25, Math.abs(v));
          const inside = 1 - smooth(0.4, 0.42, d);
          const ring = smooth(0.33, 0.35, d) * inside;
          const pat = round ? (Math.sin(u * 60) * Math.sin(v * 60) > 0 ? 1 : 0) : Math.sin(v * 70) > 0.2 ? 0 : 1;
          const c = round ? 0.2 + pat * 0.07 + fine[i]! * 0.06 : pat ? 0.24 + fine[i]! * 0.06 : 0.02;
          a[i] = inside;
          col[i * 3] = c * (1 - ring * 0.4) + 0.02;
          col[i * 3 + 1] = c * (1 - ring * 0.4) + 0.012;
          col[i * 3 + 2] = c * (1 - ring * 0.4);
        }
        break;
      case 'humedad':
        for (let k = 0; k < 4; k++) stamp(a, T, T * (0.35 + r() * 0.3), T * (0.35 + r() * 0.3), T * (0.16 + r() * 0.14), 0.42, 'max', 0.1);
        for (let i = 0; i < T * T; i++) a[i] = a[i]! * (0.5 + n[i]! * 0.7);
        fill(0.08, 0.085, 0.09);
        break;
      case 'hojas':
        for (let k = 0; k < 46; k++) {
          const x = T * (0.12 + r() * 0.76), y = T * (0.12 + r() * 0.76), ang = r() * Math.PI, l = T * (0.012 + r() * 0.02);
          line(a, T, x - Math.cos(ang) * l, y - Math.sin(ang) * l, x + Math.cos(ang) * l, y + Math.sin(ang) * l, T * 0.012, 0.95);
        }
        for (let i = 0; i < T * T; i++) {
          col[i * 3] = 0.42 + n[i]! * 0.25;
          col[i * 3 + 1] = 0.3 + n[i]! * 0.16;
          col[i * 3 + 2] = 0.1 + fine[i]! * 0.06;
        }
        break;
      case 'arena':
        for (let i = 0; i < T * T; i++) {
          const u = (i % T) / T - 0.5, v = Math.floor(i / T) / T - 0.5;
          a[i] = (1 - smooth(0.2, 0.46, Math.hypot(u, v) + (n[i]! - 0.5) * 0.3)) * (0.25 + fine[i]! * 0.4);
        }
        fill(0.55, 0.48, 0.36);
        break;
    }
    // Borde de la casilla siempre transparente (evita sangrado entre casillas con mipmaps)
    const ox = (idx % DECAL_GRID) * T, oy = Math.floor(idx / DECAL_GRID) * T;
    for (let y = 0; y < T; y++) {
      for (let x = 0; x < T; x++) {
        const i = y * T + x;
        const edge = Math.min(x, y, T - 1 - x, T - 1 - y) / T;
        const o = ((oy + y) * N + ox + x) * 4;
        out[o] = to8(col[i * 3]!);
        out[o + 1] = to8(col[i * 3 + 1]!);
        out[o + 2] = to8(col[i * 3 + 2]!);
        out[o + 3] = to8(clamp01(a[i]!) * smooth(0.015, 0.06, edge));
      }
    }
  });
  return out;
}
