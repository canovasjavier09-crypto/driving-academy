/**
 * Mapas «horneados» una sola vez al cargar (no cuestan nada al conducir):
 *
 * - Sombras falsas de edificios y árboles: se proyecta la planta de cada
 *   edificio en la dirección del sol y se dibuja en un canvas que cubre la
 *   ciudad. El suelo, el asfalto, las aceras y las marcas viales lo leen
 *   con una sola consulta de textura. Solo el coche del alumno tiene sombra real.
 * - Mezcla hierba/tierra (splat) de todo el terreno: arcenes de tierra junto
 *   a la autovía y los ramales, la explanada de maniobras y caminos del parque.
 */
import * as THREE from 'three';
import { heightAt, MANEUVER, obbCorners, PARK, WORLD_HALF, type V2, type WorldMap } from './map';

/** Posición del sol respecto al punto que ilumina (la misma que usa la luz direccional). */
export const SUN_OFFSET = new THREE.Vector3(60, 110, 40);

/** Zona cubierta por las sombras horneadas (la ciudad y su entorno). */
export const BAKE_RECT = { x0: -300, z0: -300, size: 600 };

function hull(pts: V2[]): V2[] {
  const p = [...pts].sort((a, b) => a.x - b.x || a.z - b.z);
  const cross = (o: V2, a: V2, b: V2) => (a.x - o.x) * (b.z - o.z) - (a.z - o.z) * (b.x - o.x);
  const lower: V2[] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2]!, lower[lower.length - 1]!, q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: V2[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i]!;
    while (upper.length >= 2 && cross(upper[upper.length - 2]!, upper[upper.length - 1]!, q) <= 0) upper.pop();
    upper.push(q);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/** Desenfoque de caja separable sobre el canal rojo (Safari no admite `ctx.filter`). */
function blur(ctx: CanvasRenderingContext2D, N: number, radius: number, passes: number) {
  const img = ctx.getImageData(0, 0, N, N);
  const d = img.data;
  let a = new Float32Array(N * N);
  let b = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) a[i] = d[i * 4]!;
  const w = 2 * radius + 1;
  for (let p = 0; p < passes; p++) {
    for (const horizontal of [true, false]) {
      for (let l = 0; l < N; l++) {
        let sum = 0;
        const idx = (k: number) => (horizontal ? l * N + Math.min(N - 1, Math.max(0, k)) : Math.min(N - 1, Math.max(0, k)) * N + l);
        for (let k = -radius; k <= radius; k++) sum += a[idx(k)]!;
        for (let k = 0; k < N; k++) {
          b[horizontal ? l * N + k : k * N + l] = sum / w;
          sum += a[idx(k + radius + 1)]! - a[idx(k - radius)]!;
        }
      }
      [a, b] = [b, a];
    }
  }
  for (let i = 0; i < N * N; i++) d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = a[i]!;
  ctx.putImageData(img, 0, 0);
}

function canvasTexture(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c);
  t.flipY = false; // fila 0 = z mínima
  t.colorSpace = THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.anisotropy = 4;
  return t;
}

/** Sombras de edificios y árboles (blanco = al sol). 1024 px para 600 m (≈ 0,6 m por píxel). */
export function bakeShadows(map: WorldMap, N = 1024): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = N;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, N, N);
  const k = N / BAKE_RECT.size;
  const X = (x: number) => (x - BAKE_RECT.x0) * k;
  const Z = (z: number) => (z - BAKE_RECT.z0) * k;
  const sx = SUN_OFFSET.x / SUN_OFFSET.y, sz = SUN_OFFSET.z / SUN_OFFSET.y;
  const poly = (pts: V2[]) => {
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Z(p.z)) : ctx.moveTo(X(p.x), Z(p.z))));
    ctx.closePath();
  };
  // Sombra proyectada de cada edificio (planta + planta desplazada por la altura)
  ctx.fillStyle = 'rgb(0,0,0)';
  for (const b of map.buildings) {
    const base = obbCorners(b.obb);
    const h = b.height - heightAt(b.obb.cx, b.obb.cz);
    const top = base.map((p) => ({ x: p.x - sx * h, z: p.z - sz * h }));
    poly(hull([...base, ...top]));
    ctx.fill();
  }
  // Oclusión de contacto al pie de las fachadas
  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.lineWidth = 2.4 * k;
  for (const b of map.buildings) {
    poly(obbCorners(b.obb));
    ctx.stroke();
  }
  // Árboles: copa desplazada según el sol, más clara (la luz se cuela entre las hojas)
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  for (const t of map.trees) {
    const x = t.x - sx * 3.6, z = t.z - sz * 3.6;
    if (x < BAKE_RECT.x0 || z < BAKE_RECT.z0 || x > BAKE_RECT.x0 + BAKE_RECT.size || z > BAKE_RECT.z0 + BAKE_RECT.size) continue;
    ctx.beginPath();
    ctx.ellipse(X(x), Z(z), 2.3 * k, 1.9 * k, 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(X(t.x), Z(t.z), 0.8 * k, 0, Math.PI * 2);
    ctx.fill();
  }
  blur(ctx, N, Math.max(1, Math.round(N / 1024)), 2);
  return canvasTexture(c);
}

/** Mezcla hierba (negro) / tierra (blanco) de todo el terreno: 1024 px para 1600 m. */
export function bakeSplat(map: WorldMap, N = 1024): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = N;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, N, N);
  const size = WORLD_HALF * 2;
  const k = N / size;
  const X = (x: number) => (x + WORLD_HALF) * k;
  const Z = (z: number) => (z + WORLD_HALF) * k;
  ctx.lineJoin = ctx.lineCap = 'round';
  // Arcenes de tierra a ambos lados de las vías interurbanas
  for (const r of map.roads) {
    if (r.kind === 'calle' && !r.rural) continue;
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = (r.width + 5) * k;
    ctx.beginPath();
    r.pts.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Z(p.z)) : ctx.moveTo(X(p.x), Z(p.z))));
    if (r.closed) ctx.closePath();
    ctx.stroke();
  }
  // Explanada de maniobras rodeada de tierra
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  const M = MANEUVER;
  ctx.fillRect(X(M.minX - 5), Z(M.minZ - 5), (M.maxX - M.minX + 10) * k, (M.maxZ - M.minZ + 10) * k);
  // Caminos de tierra en el parque (diagonales de la manzana)
  const park = map.blocks.find((b) => b.i === PARK.i && b.j === PARK.j);
  if (park) {
    const cs = park.corners;
    const poly = cs.map((p) => ({ x: p.x, z: p.z }));
    ctx.save();
    ctx.beginPath();
    poly.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Z(p.z)) : ctx.moveTo(X(p.x), Z(p.z))));
    ctx.closePath();
    ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = 3 * k;
    const cx = cs.reduce((a, p) => a + p.x, 0) / cs.length, cz = cs.reduce((a, p) => a + p.z, 0) / cs.length;
    for (const p of cs) {
      ctx.beginPath();
      ctx.moveTo(X(cx), Z(cz));
      ctx.quadraticCurveTo(X((cx + p.x) / 2 + 6), Z((cz + p.z) / 2 - 6), X(p.x), Z(p.z));
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(X(cx), Z(cz), 7 * k, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fill();
    ctx.restore();
  }
  blur(ctx, N, 1, 2);
  return canvasTexture(c);
}
