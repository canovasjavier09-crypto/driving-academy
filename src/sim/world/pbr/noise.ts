/**
 * Utilidades de ruido y de mapas para las texturas PBR generadas por código.
 * Todo son arrays (sin DOM ni Three.js): se puede ejecutar en un worker y probar en Node.
 * Todos los mapas son en mosaico: se repiten sin costura.
 */

export type Field = Float32Array;

/** mulberry32 */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Ruido de valor en mosaico (se repite cada N píxeles), 0..1. Se suma a `out` con peso `amp`. */
function addValueNoise(out: Field, N: number, cellsIn: number, r: () => number, amp: number) {
  const cells = Math.max(1, Math.min(N, Math.round(cellsIn)));
  const g = new Float32Array(cells * cells);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const k = cells / N;
  // Pesos y celdas por columna (se reutilizan en todas las filas)
  const cx0 = new Int32Array(N), cx1 = new Int32Array(N), tx = new Float32Array(N);
  for (let x = 0; x < N; x++) {
    const fx = x * k, x0 = Math.floor(fx), t = fx - x0;
    cx0[x] = x0 % cells;
    cx1[x] = (x0 + 1) % cells;
    tx[x] = t * t * (3 - 2 * t);
  }
  for (let y = 0; y < N; y++) {
    const fy = y * k, y0 = Math.floor(fy);
    let ty = fy - y0;
    ty = ty * ty * (3 - 2 * ty);
    const r0 = (y0 % cells) * cells, r1 = ((y0 + 1) % cells) * cells;
    const row = y * N;
    for (let x = 0; x < N; x++) {
      const a = g[r0 + cx0[x]!]!, b = g[r0 + cx1[x]!]!, c = g[r1 + cx0[x]!]!, d = g[r1 + cx1[x]!]!;
      const t = tx[x]!;
      const top = a + (b - a) * t;
      out[row + x]! += (top + (c + (d - c) * t - top) * ty) * amp;
    }
  }
}

export function normalize(f: Field): Field {
  let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < f.length; i++) {
    const v = f[i]!;
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  const k = 1 / (hi - lo || 1);
  for (let i = 0; i < f.length; i++) f[i] = (f[i]! - lo) * k;
  return f;
}

/** Ruido fractal fBm (4–6 octavas), normalizado a 0..1. `gain` = persistencia. */
export function fbm(N: number, baseCells: number, octaves: number, r: () => number, gain = 0.5): Field {
  const out = new Float32Array(N * N);
  let amp = 1;
  for (let o = 0; o < octaves; o++) {
    const cells = baseCells * 2 ** o;
    if (cells > N) break;
    addValueNoise(out, N, cells, r, amp);
    amp *= gain;
  }
  return normalize(out);
}

/** Ruido «ridged» (crestas): bueno para vetas y arrugas. */
export function ridged(N: number, baseCells: number, octaves: number, r: () => number): Field {
  const f = fbm(N, baseCells, octaves, r);
  for (let i = 0; i < f.length; i++) f[i] = 1 - Math.abs(f[i]! * 2 - 1);
  return f;
}

export interface Voronoi {
  /** Distancia al punto más cercano (0 en el centro de la celda, ~1 en el borde). */
  f1: Field;
  /** Borde de celda: F2 − F1 (0 justo en la frontera entre dos celdas). */
  edge: Field;
  /** Valor aleatorio 0..1 de la celda a la que pertenece cada píxel. */
  id: Field;
}

/** Voronoi (Worley) en mosaico con `cells`×`cells` puntos. `jitter` 0..1 desordena la rejilla. */
export function voronoi(N: number, cells: number, r: () => number, jitter = 1): Voronoi {
  const px = new Float32Array(cells * cells), py = new Float32Array(cells * cells), pid = new Float32Array(cells * cells);
  for (let i = 0; i < px.length; i++) {
    px[i] = 0.5 + (r() - 0.5) * jitter;
    py[i] = 0.5 + (r() - 0.5) * jitter;
    pid[i] = r();
  }
  const f1 = new Float32Array(N * N), edge = new Float32Array(N * N), id = new Float32Array(N * N);
  const k = cells / N;
  for (let y = 0; y < N; y++) {
    const fy = y * k, cy = Math.floor(fy);
    for (let x = 0; x < N; x++) {
      const fx = x * k, cx = Math.floor(fx);
      let d1 = 9, d2 = 9, best = 0;
      for (let oy = -1; oy <= 1; oy++) {
        const yy = ((cy + oy) % cells + cells) % cells;
        for (let ox = -1; ox <= 1; ox++) {
          const xx = ((cx + ox) % cells + cells) % cells;
          const ci = yy * cells + xx;
          const dx = cx + ox + px[ci]! - fx, dy = cy + oy + py[ci]! - fy;
          const d = dx * dx + dy * dy;
          if (d < d1) {
            d2 = d1;
            d1 = d;
            best = ci;
          } else if (d < d2) d2 = d;
        }
      }
      const i = y * N + x;
      const s1 = Math.sqrt(d1), s2 = Math.sqrt(d2);
      f1[i] = s1;
      edge[i] = s2 - s1;
      id[i] = pid[best]!;
    }
  }
  return { f1, edge, id };
}

/** Pinta un disco suave (con envoltura en los bordes) combinando con `mode`. */
export function stamp(f: Field, N: number, cx: number, cy: number, radius: number, value: number, mode: 'max' | 'min' | 'add' = 'max', hardness = 0.5) {
  const r = Math.ceil(radius);
  for (let dy = -r; dy <= r; dy++) {
    const y = ((Math.round(cy) + dy) % N + N) % N;
    for (let dx = -r; dx <= r; dx++) {
      const d = Math.hypot(dx, dy) / radius;
      if (d >= 1) continue;
      const w = (1 - smooth(hardness, 1, d)) * value;
      const i = y * N + (((Math.round(cx) + dx) % N + N) % N);
      if (mode === 'max') {
        if (w > f[i]!) f[i] = w;
      } else if (mode === 'min') {
        if (w < f[i]!) f[i] = w;
      } else f[i]! += w;
    }
  }
}

/** Línea gruesa (envuelve en los bordes). */
export function line(f: Field, N: number, x0: number, y0: number, x1: number, y1: number, width: number, value: number, mode: 'max' | 'add' = 'max') {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const steps = Math.max(1, Math.ceil(len / Math.max(0.5, width * 0.5)));
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    stamp(f, N, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, Math.max(0.75, width), value, mode, 0.35);
  }
}

/**
 * Grietas ramificadas: caminos aleatorios que se bifurcan y se van afinando.
 * Devuelve una máscara 0..1 (1 = centro de la grieta).
 */
export function branchingCracks(N: number, r: () => number, count: number, width: number, branchP = 0.035): Field {
  const f = new Float32Array(N * N);
  const walk = (x: number, y: number, ang: number, w: number, life: number, depth: number) => {
    const step = Math.max(2, N / 256);
    for (let i = 0; i < life; i++) {
      ang += (r() - 0.5) * 0.7;
      const nx = x + Math.cos(ang) * step, ny = y + Math.sin(ang) * step;
      line(f, N, x, y, nx, ny, w, 1, 'max');
      x = nx;
      y = ny;
      w *= 0.996;
      if (depth < 3 && r() < branchP) walk(x, y, ang + (r() < 0.5 ? 1 : -1) * (0.5 + r() * 0.8), w * 0.7, life * 0.45, depth + 1);
    }
  };
  for (let c = 0; c < count; c++) walk(r() * N, r() * N, r() * Math.PI * 2, width, (N / Math.max(2, N / 256)) * (0.25 + r() * 0.45), 0);
  return f;
}

/** Desenfoque de caja separable (en mosaico). */
export function blur(f: Field, N: number, radius: number): Field {
  const r = Math.max(1, Math.round(radius));
  const tmp = new Float32Array(N * N), out = new Float32Array(N * N);
  const k = 1 / (2 * r + 1);
  for (let y = 0; y < N; y++) {
    const row = y * N;
    let acc = 0;
    for (let d = -r; d <= r; d++) acc += f[row + ((d % N) + N) % N]!;
    for (let x = 0; x < N; x++) {
      tmp[row + x] = acc * k;
      acc += f[row + ((x + r + 1) % N)]! - f[row + (((x - r) % N) + N) % N]!;
    }
  }
  for (let x = 0; x < N; x++) {
    let acc = 0;
    for (let d = -r; d <= r; d++) acc += tmp[(((d % N) + N) % N) * N + x]!;
    for (let y = 0; y < N; y++) {
      out[y * N + x] = acc * k;
      acc += tmp[((y + r + 1) % N) * N + x]! - tmp[((((y - r) % N) + N) % N) * N + x]!;
    }
  }
  return out;
}

/**
 * Mapa de normales (convención OpenGL, RGBA8) a partir de un mapa de alturas,
 * con filtro de Sobel 3×3. `strength` cambia según el material.
 */
export function sobelNormal(h: Field, N: number, strength: number): Uint8Array {
  const out = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) {
    const ym = ((y - 1 + N) % N) * N, y0 = y * N, yp = ((y + 1) % N) * N;
    for (let x = 0; x < N; x++) {
      const xm = (x - 1 + N) % N, xp = (x + 1) % N;
      const tl = h[ym + xm]!, t = h[ym + x]!, tr = h[ym + xp]!;
      const l = h[y0 + xm]!, r = h[y0 + xp]!;
      const bl = h[yp + xm]!, b = h[yp + x]!, br = h[yp + xp]!;
      const gx = tr + 2 * r + br - (tl + 2 * l + bl);
      const gy = bl + 2 * b + br - (tl + 2 * t + tr);
      const nx = -gx * strength, ny = gy * strength;
      const inv = 1 / Math.sqrt(nx * nx + ny * ny + 1);
      const o = (y0 + x) * 4;
      out[o] = (nx * inv * 0.5 + 0.5) * 255;
      out[o + 1] = (ny * inv * 0.5 + 0.5) * 255;
      out[o + 2] = (inv * 0.5 + 0.5) * 255;
      out[o + 3] = 255;
    }
  }
  return out;
}

/** Oclusión ambiental barata: lo que queda por debajo de su entorno (cavidades) se oscurece. */
export function cavityAO(h: Field, N: number, radius: number, strength: number): Field {
  const avg = blur(h, N, radius);
  const out = new Float32Array(N * N);
  for (let i = 0; i < out.length; i++) out[i] = clamp01(1 - Math.max(0, avg[i]! - h[i]!) * strength);
  return out;
}

/** Reduce a la mitad (filtro de caja 2×2) un mapa RGBA8. Para las versiones de 512 px. */
export function halve(src: Uint8Array, N: number): Uint8Array {
  const M = N >> 1;
  const out = new Uint8Array(M * M * 4);
  for (let y = 0; y < M; y++) {
    for (let x = 0; x < M; x++) {
      const a = (y * 2 * N + x * 2) * 4, b = a + 4, c = a + N * 4, d = c + 4;
      const o = (y * M + x) * 4;
      for (let k = 0; k < 4; k++) out[o + k] = (src[a + k]! + src[b + k]! + src[c + k]! + src[d + k]! + 2) >> 2;
    }
  }
  return out;
}

/** Convierte un color lineal aproximado 0..1 a sRGB 0..255 (las texturas de albedo van en sRGB). */
export const to8 = (v: number) => (v <= 0 ? 0 : v >= 1 ? 255 : (v * 255 + 0.5) | 0);
