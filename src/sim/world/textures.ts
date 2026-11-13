/**
 * Texturas generadas por código (sin imágenes externas): ruido fractal
 * en mosaico, grietas, manchas, juntas y desgaste dibujados en canvas.
 *
 * - Todas son en mosaico (se repiten sin costuras) y con mipmaps.
 * - Tamaño máximo 1024 px (asfalto en calidad alta); el resto, 512 o menos.
 *   `f` es el factor de tamaño del nivel de calidad (1, 0,5 o 0,25).
 * - Las de suelo son en escala de grises: el color lo ponen el material o el
 *   color de vértice, así una textura sirve para varios tonos.
 * - El asfalto lleva además mapa de normales (relieve del árido y grietas) y
 *   mapa de rugosidad.
 */
import * as THREE from 'three';
import type { BuildingStyle } from './map';

export const ANISOTROPY = 4;

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

const pow2 = (n: number, min = 32) => Math.max(min, 2 ** Math.round(Math.log2(n)));

/** Ruido de valor en mosaico (se repite cada N píxeles), 0..1. */
function valueNoise(N: number, cellsIn: number, r: () => number): Float32Array {
  // Un número entero de celdas para que el ruido se repita sin costura.
  const cells = Math.max(1, Math.round(cellsIn));
  const g = new Float32Array(cells * cells);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const out = new Float32Array(N * N);
  const k = cells / N;
  for (let y = 0; y < N; y++) {
    const fy = y * k;
    const y0 = Math.floor(fy);
    let ty = fy - y0;
    ty = ty * ty * (3 - 2 * ty);
    const r0 = (y0 % cells) * cells, r1 = ((y0 + 1) % cells) * cells;
    for (let x = 0; x < N; x++) {
      const fx = x * k;
      const x0 = Math.floor(fx);
      let tx = fx - x0;
      tx = tx * tx * (3 - 2 * tx);
      const c0 = x0 % cells, c1 = (x0 + 1) % cells;
      const a = g[r0 + c0]! + (g[r0 + c1]! - g[r0 + c0]!) * tx;
      const b = g[r1 + c0]! + (g[r1 + c1]! - g[r1 + c0]!) * tx;
      out[y * N + x] = a + (b - a) * ty;
    }
  }
  return out;
}

/** Ruido fractal (varias octavas) normalizado a 0..1. */
function fbm(N: number, baseCells: number, octaves: number, r: () => number): Float32Array {
  const out = new Float32Array(N * N);
  let amp = 1, total = 0;
  for (let o = 0; o < octaves; o++) {
    const cells = Math.min(N, baseCells * 2 ** o);
    const n = valueNoise(N, cells, r);
    for (let i = 0; i < out.length; i++) out[i]! += n[i]! * amp;
    total += amp;
    amp *= 0.5;
  }
  let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < out.length; i++) {
    out[i]! /= total;
    lo = Math.min(lo, out[i]!);
    hi = Math.max(hi, out[i]!);
  }
  const span = hi - lo || 1;
  for (let i = 0; i < out.length; i++) out[i] = (out[i]! - lo) / span;
  return out;
}

/** Dibuja en un canvas de N×M y devuelve la opacidad (canal alfa) como máscara 0..1, en mosaico. */
function mask(N: number, M: number, draw: (ctx: CanvasRenderingContext2D) => void): Float32Array {
  const c = document.createElement('canvas');
  c.width = N;
  c.height = M;
  const ctx = c.getContext('2d')!;
  // Se dibuja nueve veces desplazado para que lo que cruce un borde reaparezca por el contrario.
  for (const dx of [-N, 0, N]) for (const dy of [-M, 0, M]) {
    ctx.save();
    ctx.translate(dx, dy);
    draw(ctx);
    ctx.restore();
  }
  const d = ctx.getImageData(0, 0, N, M).data;
  const out = new Float32Array(N * M);
  for (let i = 0; i < out.length; i++) out[i] = d[i * 4 + 3]! / 255;
  return out;
}

function texFromPixels(w: number, h: number, px: (i: number, out: Uint8ClampedArray, o: number) => void, srgb: boolean): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    px(i, img.data, i * 4);
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return finish(new THREE.CanvasTexture(c), srgb);
}

function finish<T extends THREE.Texture>(t: T, srgb: boolean): T {
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = ANISOTROPY;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  return t;
}

/** Mapa de normales (convención OpenGL) a partir de un mapa de alturas en mosaico. */
function normalFrom(h: Float32Array, N: number, strength: number): THREE.CanvasTexture {
  return texFromPixels(N, N, (i, d, o) => {
    const x = i % N, y = (i / N) | 0;
    const l = h[y * N + ((x - 1 + N) % N)]!, r = h[y * N + ((x + 1) % N)]!;
    const u = h[((y - 1 + N) % N) * N + x]!, dn = h[((y + 1) % N) * N + x]!;
    const nx = (l - r) * strength, ny = (dn - u) * strength;
    const inv = 1 / Math.hypot(nx, ny, 1);
    d[o] = (nx * inv * 0.5 + 0.5) * 255;
    d[o + 1] = (ny * inv * 0.5 + 0.5) * 255;
    d[o + 2] = (inv * 0.5 + 0.5) * 255;
  }, false);
}

function crackPaths(ctx: CanvasRenderingContext2D, r: () => number, N: number, count: number, width: number, alpha: number) {
  ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
  ctx.lineCap = 'round';
  for (let i = 0; i < count; i++) {
    let x = r() * N, y = r() * N;
    let a = r() * Math.PI * 2;
    ctx.lineWidth = width * (0.6 + r() * 0.8);
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 6 + Math.floor(r() * 10);
    for (let k = 0; k < steps; k++) {
      a += (r() - 0.5) * 1.3;
      const len = N * (0.008 + r() * 0.018);
      x += Math.cos(a) * len;
      y += Math.sin(a) * len;
      ctx.lineTo(x, y);
      // Ramificaciones cortas
      if (r() < 0.25) {
        const b = a + (r() < 0.5 ? 1 : -1) * (0.6 + r());
        ctx.moveTo(x + Math.cos(b) * len * 0.8, y + Math.sin(b) * len * 0.8);
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
}

export interface AsphaltSet {
  map: THREE.Texture;
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

/** Asfalto (mosaico de 5 m): árido, manchas, parches de reparación y grietas, con relieve y rugosidad. */
export function asphaltTextures(f: number): AsphaltSet {
  const N = pow2(1024 * f, 128);
  const r = rng(11);
  const aggregate = valueNoise(N, N / 3, r); // piedrecitas del árido (~1,5 cm)
  const fine = valueNoise(N, N / 1.5, r);
  const broad = fbm(N, 4, 4, r); // manchas grandes
  const patches = mask(N, N, (ctx) => {
    const pr = rng(5);
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = 'rgba(0,0,0,1)';
      const w = N * (0.12 + pr() * 0.2), h = N * (0.08 + pr() * 0.14);
      ctx.save();
      ctx.translate(pr() * N, pr() * N);
      ctx.rotate((pr() - 0.5) * 0.3);
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }
  });
  const cracks = mask(N, N, (ctx) => crackPaths(ctx, rng(7), N, 4, Math.max(0.6, N / 1024), 0.6));
  const oil = mask(N, N, (ctx) => {
    const pr = rng(9);
    for (let i = 0; i < 6; i++) {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, 'rgba(0,0,0,0.5)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save();
      ctx.translate(pr() * N, pr() * N);
      ctx.scale(N * (0.02 + pr() * 0.05), N * (0.015 + pr() * 0.04));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });
  const height = new Float32Array(N * N);
  const albedo = new Float32Array(N * N);
  const rough = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const ag = aggregate[i]!, fi = fine[i]!, br = broad[i]!, pa = patches[i]!, cr = cracks[i]!;
    // Relieve: árido (más marcado fuera de los parches, que son más lisos), grietas hundidas.
    height[i] = (ag * 0.7 + fi * 0.3) * (1 - pa * 0.6) - cr * 0.5;
    // Color: base gris, piedras claras sueltas, manchas, parches más oscuros, aceite.
    const stone = ag > 0.82 ? (ag - 0.82) * 2.2 : 0;
    let a = 0.72 + (fi - 0.5) * 0.16 + stone + (br - 0.5) * 0.22;
    a *= 1 - pa * 0.22;
    a *= 1 - cr * 0.3;
    a *= 1 - oil[i]! * 0.45;
    albedo[i] = a;
    // Rugosidad: el asfalto viejo es mate; los parches nuevos y el aceite, algo más lisos.
    rough[i] = 0.92 - pa * 0.12 - oil[i]! * 0.3 + (fi - 0.5) * 0.08 + cr * 0.05;
  }
  const map = texFromPixels(N, N, (i, d, o) => {
    d[o] = d[o + 1] = d[o + 2] = Math.min(1, albedo[i]!) * 255;
  }, true);
  const roughnessMap = texFromPixels(N, N, (i, d, o) => {
    d[o] = d[o + 1] = d[o + 2] = Math.min(1, Math.max(0, rough[i]!)) * 255;
  }, false);
  const normalMap = normalFrom(height, N, 2.2 * (N / 1024) + 0.6);
  return { map, normalMap, roughnessMap };
}

/** Baldosa de acera (mosaico de 2 m = 4 × 4 losetas de 50 cm). */
export function pavingTexture(f: number) {
  const N = pow2(512 * f, 64);
  const r = rng(12);
  const grain = valueNoise(N, N / 2, r);
  const broad = fbm(N, 4, 3, r);
  const tileShade = Array.from({ length: 16 }, () => 0.9 + r() * 0.12);
  const joints = mask(N, N, (ctx) => {
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = Math.max(1, N / 128);
    for (let k = 0; k <= 4; k++) {
      ctx.beginPath();
      ctx.moveTo(0, (k * N) / 4);
      ctx.lineTo(N, (k * N) / 4);
      ctx.moveTo((k * N) / 4, 0);
      ctx.lineTo((k * N) / 4, N);
      ctx.stroke();
    }
    crackPaths(ctx, rng(3), N, 2, Math.max(1, N / 512), 0.5);
  });
  return texFromPixels(N, N, (i, d, o) => {
    const x = i % N, y = (i / N) | 0;
    const t = tileShade[((y * 4) / N | 0) * 4 + ((x * 4) / N | 0)]!;
    const v = (0.86 + (grain[i]! - 0.5) * 0.12 + (broad[i]! - 0.5) * 0.1) * t * (1 - joints[i]! * 0.4);
    d[o] = d[o + 1] = d[o + 2] = Math.min(1, v) * 255;
  }, true);
}

/** Hierba (mosaico de 9 m, escala de grises; el tono lo da el color de vértice). */
export function grassTexture(f: number) {
  const N = pow2(512 * f, 64);
  const r = rng(13);
  const blades = valueNoise(N, N / 1.5, r);
  const clumps = fbm(N, 8, 4, r);
  return texFromPixels(N, N, (i, d, o) => {
    const v = 0.78 + (blades[i]! - 0.5) * 0.28 + (clumps[i]! - 0.5) * 0.42;
    d[o] = d[o + 1] = d[o + 2] = Math.max(0, Math.min(1, v)) * 255;
  }, true);
}

/** Tierra y grava (en color): para arcenes de tierra, caminos y calvas en la hierba. */
export function dirtTexture(f: number) {
  const N = pow2(512 * f, 64);
  const r = rng(14);
  const pebbles = valueNoise(N, N / 2.5, r);
  const broad = fbm(N, 6, 4, r);
  return texFromPixels(N, N, (i, d, o) => {
    const p = pebbles[i]!, b = broad[i]!;
    const stone = p > 0.78 ? (p - 0.78) * 1.6 : 0;
    const v = 0.55 + (b - 0.5) * 0.35 + stone + (p - 0.5) * 0.12;
    d[o] = Math.min(1, v * 0.62 + stone * 0.1) * 255;
    d[o + 1] = Math.min(1, v * 0.52 + stone * 0.1) * 255;
    d[o + 2] = Math.min(1, v * 0.4 + stone * 0.12) * 255;
  }, true);
}

/** Ruido de baja frecuencia para variar el color a gran escala (rompe la repetición). Lineal. */
export function macroTexture() {
  const N = 256;
  const n = fbm(N, 4, 5, rng(15));
  return texFromPixels(N, N, (i, d, o) => {
    d[o] = d[o + 1] = d[o + 2] = n[i]! * 255;
  }, false);
}

/** Desgaste de la pintura vial (canal verde = queda pintura). Lineal. */
export function paintWearTexture(f: number) {
  const N = pow2(512 * f, 64);
  const r = rng(16);
  const broad = fbm(N, 6, 4, r);
  const speck = valueNoise(N, N / 2, r);
  return texFromPixels(N, N, (i, d, o) => {
    // Se pierde pintura en zonas (rodadas) y en puntos sueltos.
    const keep = broad[i]! * 0.75 + speck[i]! * 0.45;
    d[o] = d[o + 1] = d[o + 2] = keep > 0.42 ? 255 : 0;
  }, false);
}

/** Mancha redonda difuminada para sombras falsas (canal verde = opacidad). */
export function blobTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgb(255,255,255)');
  g.addColorStop(0.55, 'rgb(150,150,150)');
  g.addColorStop(1, 'rgb(0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

/**
 * Fachadas: un módulo = 4 ventanas de ancho × 2 plantas (12 m × 6,4 m), con
 * variaciones entre ventanas (cortinas, persianas, luz interior), marcos,
 * alféizares y churretes de suciedad. Son claras: el color de vértice tiñe el revoco.
 */
export function facadeTexture(style: BuildingStyle, f: number) {
  const W = pow2(512 * f, 128), H = W / 2;
  const s = W / 512;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;
  const r = rng(style.length * 7 + 1);
  ctx.scale(s, s);
  const base = style === 'oficinas' ? '#a3adb8' : style === 'moderno' ? '#e6e5e0' : '#f2f0eb';
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 256);
  // Revoco: grano y manchas suaves
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${r() * 0.05})`;
    const sz = 1 + r() * 3;
    ctx.fillRect(r() * 512, r() * 256, sz, sz);
  }
  const glass = (x: number, y: number, w: number, h: number) => {
    const g = ctx.createLinearGradient(x, y, x + w * 0.6, y + h);
    g.addColorStop(0, '#8aa3bb');
    g.addColorStop(0.45, '#4b6077');
    g.addColorStop(1, '#1f2a36');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
    // Interior: cortinas, persianas o luz
    const k = r();
    if (k < 0.3) {
      ctx.fillStyle = `rgba(${200 + r() * 50},${190 + r() * 40},${170 + r() * 40},0.75)`;
      ctx.fillRect(x, y, w * (0.25 + r() * 0.2), h);
      ctx.fillRect(x + w * (0.6 + r() * 0.15), y, w, h);
    } else if (k < 0.5) {
      const down = h * (0.2 + r() * 0.6);
      ctx.fillStyle = '#c9c2b4';
      ctx.fillRect(x, y, w, down);
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      for (let yy = y + 3; yy < y + down; yy += 3) ctx.fillRect(x, yy, w, 1);
    } else if (k < 0.58) {
      ctx.fillStyle = 'rgba(255,226,160,0.35)';
      ctx.fillRect(x + 2, y + h * 0.4, w - 4, h * 0.6 - 2);
    }
    // Reflejo del cielo
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.moveTo(x, y + h * 0.15);
    ctx.lineTo(x + w * 0.5, y);
    ctx.lineTo(x + w * 0.75, y);
    ctx.lineTo(x, y + h * 0.55);
    ctx.fill();
  };
  const frame = (x: number, y: number, w: number, h: number, col: string) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y + h);
    ctx.stroke();
  };
  const floors = [0, 128];
  if (style === 'industrial') {
    // Nave: chapa grecada, franja de ventanas altas y portones seccionales
    ctx.fillStyle = '#e4e6e8';
    ctx.fillRect(0, 0, 512, 256);
    for (let x = 0; x < 512; x += 8) {
      ctx.fillStyle = 'rgba(0,0,0,0.10)';
      ctx.fillRect(x, 0, 3, 256);
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(x + 4, 0, 1, 256);
    }
    for (let x = 16; x < 512; x += 64) glass(x, 18, 48, 22);
    for (const x0 of [40, 296]) {
      ctx.fillStyle = '#9aa3ac';
      ctx.fillRect(x0, 120, 176, 136);
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      for (let y = 128; y < 256; y += 16) ctx.fillRect(x0, y, 176, 2);
      ctx.strokeStyle = '#d9a21b';
      ctx.lineWidth = 6;
      ctx.strokeRect(x0 - 3, 117, 182, 139);
    }
    const g = ctx.createLinearGradient(0, 200, 0, 256);
    g.addColorStop(0, 'rgba(60,50,40,0)');
    g.addColorStop(1, 'rgba(60,50,40,0.2)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 200, 512, 56);
  } else if (style === 'oficinas') {
    for (const fy of floors) {
      for (let k = 0; k < 4; k++) glass(4 + k * 128, fy + 10, 120, 104);
      ctx.fillStyle = '#c9d0d7';
      for (let k = 0; k <= 4; k++) ctx.fillRect(k * 128 - 3, fy, 6, 128);
      ctx.fillStyle = '#7d8893';
      ctx.fillRect(0, fy + 114, 512, 14);
    }
  } else if (style === 'moderno') {
    for (const fy of floors) {
      ctx.fillStyle = '#2e3a47';
      ctx.fillRect(0, fy + 26, 512, 70);
      glass(0, fy + 30, 512, 62);
      ctx.fillStyle = 'rgba(30,36,44,0.8)';
      for (let k = 0; k <= 8; k++) ctx.fillRect(k * 64 - 1, fy + 30, 2, 62);
      // Antepecho con barandilla de vidrio
      ctx.fillStyle = '#d9d8d2';
      ctx.fillRect(0, fy + 96, 512, 32);
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, fy + 96, 512, 3);
    }
  } else {
    // Residencial y casco antiguo
    for (const fy of floors) {
      for (let k = 0; k < 4; k++) {
        const x = 36 + k * 128;
        const y = fy + 24, w = 56, h = 78;
        // Dintel y alféizar
        ctx.fillStyle = style === 'antiguo' ? '#d8d0c0' : '#e2e2de';
        ctx.fillRect(x - 6, y - 8, w + 12, 8);
        ctx.fillRect(x - 8, y + h, w + 16, 6);
        glass(x, y, w, h);
        frame(x, y, w, h, style === 'antiguo' ? '#5a4a3a' : '#eeeeea');
        if (style === 'antiguo') {
          const green = r() < 0.5 ? '#3f6b4a' : '#5b4a33';
          ctx.fillStyle = green;
          const open = r() < 0.7;
          if (open) {
            ctx.fillRect(x - 24, y, 20, h);
            ctx.fillRect(x + w + 4, y, 20, h);
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            for (let yy = y + 4; yy < y + h; yy += 6) {
              ctx.fillRect(x - 24, yy, 20, 2);
              ctx.fillRect(x + w + 4, yy, 20, 2);
            }
          } else {
            ctx.fillRect(x, y, w, h);
            ctx.fillStyle = 'rgba(0,0,0,0.2)';
            for (let yy = y + 4; yy < y + h; yy += 6) ctx.fillRect(x, yy, w, 2);
          }
        } else if (r() < 0.6) {
          // Balcón con barandilla de hierro
          ctx.fillStyle = 'rgba(0,0,0,0.2)';
          ctx.fillRect(x - 14, y + h + 6, w + 28, 4);
          ctx.fillStyle = '#2f343b';
          ctx.fillRect(x - 14, y + h - 22, w + 28, 3);
          for (let b = 0; b <= 14; b++) ctx.fillRect(x - 14 + b * ((w + 28) / 14), y + h - 22, 2, 28);
        }
        // Churretes bajo el alféizar
        const g = ctx.createLinearGradient(0, y + h + 6, 0, y + h + 46);
        g.addColorStop(0, 'rgba(60,50,40,0.18)');
        g.addColorStop(1, 'rgba(60,50,40,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - 4, y + h + 6, w + 8, 40);
      }
      // Imposta entre plantas
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, fy + 122, 512, 6);
    }
  }
  const t = new THREE.CanvasTexture(c);
  return finish(t, true);
}

/** Planta baja: cuatro locales distintos (módulo de 24 m × 4,2 m) con rótulos, escaparates, toldos, persianas y portales. */
export function shopTexture(f: number) {
  const W = pow2(1024 * f, 256), H = W / 4;
  const s = W / 1024;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d')!;
  const r = rng(21);
  ctx.scale(s, s);
  // Zócalo de piedra y muro
  ctx.fillStyle = '#d6d0c6';
  ctx.fillRect(0, 0, 1024, 256);
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(0,0,0,${r() * 0.05})`;
    ctx.fillRect(r() * 1024, r() * 256, 2, 2);
  }
  ctx.fillStyle = '#8f8a80';
  ctx.fillRect(0, 236, 1024, 20);
  const signCols = ['#b3261e', '#1d3f8a', '#2e5c3a', '#c79a2b', '#5b3b8c', '#1f6f78', '#333333'];
  for (let k = 0; k < 4; k++) {
    const x0 = k * 256 + 10;
    // Rótulo con «letras» (bloques), sin texto real
    const sc = signCols[Math.floor(r() * signCols.length)]!;
    ctx.fillStyle = sc;
    ctx.fillRect(x0, 22, 170, 30);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    let lx = x0 + 12;
    while (lx < x0 + 150) {
      const lw = 6 + r() * 10;
      ctx.fillRect(lx, 30, lw, 14);
      lx += lw + 4 + (r() < 0.2 ? 10 : 0);
    }
    const shutter = r() < 0.25;
    if (shutter) {
      // Persiana metálica bajada
      ctx.fillStyle = '#8b9096';
      ctx.fillRect(x0, 60, 170, 176);
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      for (let y = 64; y < 236; y += 6) ctx.fillRect(x0, y, 170, 2);
    } else {
      const g = ctx.createLinearGradient(0, 60, 0, 236);
      g.addColorStop(0, '#3b4a5c');
      g.addColorStop(1, '#1b232d');
      ctx.fillStyle = g;
      ctx.fillRect(x0, 60, 170, 176);
      // Interior iluminado con estanterías y género
      ctx.fillStyle = 'rgba(255,240,205,0.28)';
      ctx.fillRect(x0 + 6, 90, 158, 120);
      for (let y = 120; y < 210; y += 30) {
        ctx.fillStyle = 'rgba(40,30,20,0.5)';
        ctx.fillRect(x0 + 10, y, 150, 3);
        for (let x = x0 + 12; x < x0 + 156; x += 8 + r() * 8) {
          ctx.fillStyle = `hsla(${r() * 360},45%,${45 + r() * 20}%,0.7)`;
          ctx.fillRect(x, y - 6 - r() * 10, 5, 16);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fillRect(x0 + 8, 64, 30, 168);
      ctx.strokeStyle = '#2a2f36';
      ctx.lineWidth = 4;
      ctx.strokeRect(x0, 60, 170, 176);
      // Toldo
      if (r() < 0.6) {
        ctx.fillStyle = sc;
        ctx.beginPath();
        ctx.moveTo(x0 - 6, 56);
        ctx.lineTo(x0 + 176, 56);
        ctx.lineTo(x0 + 168, 84);
        ctx.lineTo(x0 + 2, 84);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        for (let x = x0; x < x0 + 170; x += 22) ctx.fillRect(x, 56, 10, 28);
      }
    }
    // Portal de viviendas
    ctx.fillStyle = '#4a3a2c';
    ctx.fillRect(x0 + 192, 92, 48, 144);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(x0 + 198, 100, 16, 70);
    ctx.fillStyle = '#c8b27a';
    ctx.fillRect(x0 + 230, 160, 4, 10);
  }
  // Suciedad junto al suelo
  const g = ctx.createLinearGradient(0, 200, 0, 256);
  g.addColorStop(0, 'rgba(50,40,30,0)');
  g.addColorStop(1, 'rgba(50,40,30,0.25)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 200, 1024, 56);
  const t = new THREE.CanvasTexture(c);
  return finish(t, true);
}
