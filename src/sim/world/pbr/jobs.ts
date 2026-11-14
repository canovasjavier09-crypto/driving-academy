/**
 * Trabajos de generación de texturas (lógica pura, compartida por el worker y
 * por el modo de reserva en el hilo principal).
 *
 * Un material se genera UNA vez al mayor tamaño pedido; los tamaños menores
 * (512 para lo lejano y la calidad Baja) salen de reducirlo a la mitad, que es
 * mucho más rápido que volver a generarlo y además conserva el mismo dibujo.
 */
import { halve } from './noise';
import { decalAtlas, detailGrain, generate, type MatId, type PbrMaps } from './recipes';

export type Job =
  | { kind: 'mat'; id: MatId; sizes: number[] }
  | { kind: 'decals'; size: number }
  | { kind: 'detail'; size: number };

export type JobResult =
  | { kind: 'mat'; id: MatId; maps: PbrMaps[] }
  | { kind: 'decals'; size: number; data: Uint8Array }
  | { kind: 'detail'; size: number; data: Uint8Array };

export function runJob(job: Job): JobResult {
  if (job.kind === 'decals') return { kind: 'decals', size: job.size, data: decalAtlas(job.size) };
  if (job.kind === 'detail') return { kind: 'detail', size: job.size, data: detailGrain(job.size) };
  const sizes = [...job.sizes].sort((a, b) => b - a);
  let cur = generate(job.id, sizes[0]!);
  const maps: PbrMaps[] = [cur];
  for (const s of sizes.slice(1)) {
    while (cur.size > s) cur = { size: cur.size >> 1, albedo: halve(cur.albedo, cur.size), normal: halve(cur.normal, cur.size), packed: halve(cur.packed, cur.size) };
    maps.push(cur);
  }
  return { kind: 'mat', id: job.id, maps };
}

/** Coste relativo de un trabajo (para la barra de progreso). */
export function jobWeight(job: Job): number {
  const s = job.kind === 'mat' ? Math.max(...job.sizes) : job.size;
  return (s * s) / (1024 * 1024);
}

export function transferables(r: JobResult): ArrayBuffer[] {
  if (r.kind !== 'mat') return [r.data.buffer as ArrayBuffer];
  return r.maps.flatMap((m) => [m.albedo.buffer as ArrayBuffer, m.normal.buffer as ArrayBuffer, m.packed.buffer as ArrayBuffer]);
}

export type TexQuality = 'baja' | 'media' | 'alta';

/** Materiales del mundo (1024 px por defecto) y materiales pequeños o del coche (512 px). */
export const WORLD_MATS: MatId[] = ['asphalt', 'paving', 'grassA', 'grassB', 'dirt', 'gravel', 'concrete', 'brick'];
export const SMALL_MATS: MatId[] = ['line', 'metal', 'glass', 'rubber', 'plastic', 'fabric', 'leather', 'carpaint'];
/** Materiales que se ven sobre todo de lejos: son los primeros en bajar a 512 px si faltan FPS. */
export const FAR_MATS: MatId[] = ['grassA', 'grassB', 'dirt', 'gravel', 'concrete', 'brick'];

/**
 * Qué se genera en la pantalla de carga:
 *  - 1024 px por defecto; 2048 solo el asfalto y solo si se puede llegar a calidad Alta
 *    (no en Baja, ni en pantallas táctiles, ni en el modo de reserva sin workers);
 *  - 512 px para la calidad Baja y para lo lejano (por reducción);
 *  - coche y objetos pequeños, 512 px.
 */
export function texPlan(quality: TexQuality, opts: { touch?: boolean; noWorkers?: boolean } = {}): Job[] {
  const low = quality === 'baja';
  const big = !low && !opts.touch && !opts.noWorkers;
  const jobs: Job[] = [];
  for (const id of WORLD_MATS) {
    if (low) jobs.push({ kind: 'mat', id, sizes: [512] });
    else if (id === 'asphalt' && big) jobs.push({ kind: 'mat', id, sizes: [2048, 1024, 512] });
    else jobs.push({ kind: 'mat', id, sizes: [1024, 512] });
  }
  for (const id of SMALL_MATS) jobs.push({ kind: 'mat', id, sizes: [512] });
  jobs.push({ kind: 'decals', size: low ? 512 : 1024 }, { kind: 'detail', size: 256 });
  return jobs;
}
