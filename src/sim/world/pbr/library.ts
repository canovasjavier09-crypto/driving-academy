/**
 * Biblioteca de texturas PBR generadas por código.
 *
 * - Se generan en la pantalla de carga, en varios workers en paralelo (o por
 *   bloques en el hilo principal si no hay workers), con barra de progreso.
 * - Cada textura se genera una sola vez por visita a la web (caché en memoria)
 *   y se reutiliza en todos los materiales. Durante la conducción no se crea ninguna.
 * - sRGB solo en el albedo; normales y rugosidad+AO en espacio lineal.
 * - Mipmaps y anisotropía 4 (8 en calidad Alta); se puede bajar al vuelo sin volver a subir la textura.
 */
import * as THREE from 'three';
import { jobWeight, runJob, texPlan, type Job, type JobResult, type TexQuality } from './jobs';
import type { MatId, PbrMaps } from './recipes';

export interface PbrSet {
  size: number;
  albedo: THREE.DataTexture;
  normal: THREE.DataTexture;
  packed: THREE.DataTexture;
}

// Caché de píxeles ya generados (clave «material@tamaño», «decals@tamaño», «detail@tamaño»).
const pixelCache = new Map<string, PbrMaps | Uint8Array>();

function store(r: JobResult) {
  if (r.kind === 'mat') for (const m of r.maps) pixelCache.set(`${r.id}@${m.size}`, m);
  else pixelCache.set(`${r.kind}@${r.size}`, r.data);
}

function missing(job: Job): boolean {
  if (job.kind !== 'mat') return !pixelCache.has(`${job.kind}@${job.size}`);
  return job.sizes.some((s) => !pixelCache.has(`${job.id}@${s}`));
}

const tick = () => new Promise<void>((res) => setTimeout(res, 0));

/** Genera lo que falte. `onProgress` recibe 0..1. Nunca bloquea el hilo principal más de un trabajo seguido. */
async function generateAll(jobs: Job[], onProgress: (p: number) => void): Promise<void> {
  const todo = jobs.filter(missing).sort((a, b) => jobWeight(b) - jobWeight(a));
  const total = todo.reduce((s, j) => s + jobWeight(j), 0) || 1;
  let done = 0;
  const finish = (j: Job, r: JobResult) => {
    store(r);
    done += jobWeight(j);
    onProgress(Math.min(1, done / total));
  };
  if (!todo.length) {
    onProgress(1);
    return;
  }
  onProgress(0);
  const queue = [...todo];
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  const n = Math.max(1, Math.min(4, cores - 1, queue.length));
  let workers: Worker[] = [];
  try {
    for (let i = 0; i < n; i++) workers.push(new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }));
  } catch {
    for (const w of workers) w.terminate();
    workers = [];
  }
  if (workers.length) {
    const failed: Job[] = [];
    await Promise.all(workers.map((w) => new Promise<void>((resolve) => {
      let current: Job | null = null;
      const next = () => {
        current = queue.shift() ?? null;
        if (!current) return resolve();
        w.postMessage(current);
      };
      w.onmessage = (e: MessageEvent<JobResult>) => {
        if (current) finish(current, e.data);
        next();
      };
      w.onerror = () => {
        // Este worker no sirve (p. ej., navegador sin workers de módulo): su trabajo se hará en el hilo principal.
        if (current) failed.push(current);
        resolve();
      };
      next();
    })));
    for (const w of workers) w.terminate();
    queue.push(...failed);
  }
  // Reserva: por bloques en el hilo principal, cediendo el control entre trabajo y trabajo.
  while (queue.length) {
    const j = queue.shift()!;
    await tick();
    finish(j, runJob(j));
  }
}

function dataTex(px: Uint8Array, size: number, srgb: boolean, anisotropy: number): THREE.DataTexture {
  const t = new THREE.DataTexture(px, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.anisotropy = anisotropy;
  t.needsUpdate = true;
  return t;
}

export class PbrLibrary {
  private sets = new Map<string, PbrSet>();
  private sizes = new Map<MatId, number[]>();
  readonly detail: THREE.DataTexture;
  readonly decals: THREE.DataTexture;
  private aniso: number;

  constructor(jobs: Job[], anisotropy: number) {
    this.aniso = anisotropy;
    for (const j of jobs) {
      if (j.kind !== 'mat') continue;
      this.sizes.set(j.id, [...j.sizes].sort((a, b) => b - a));
      for (const s of j.sizes) {
        const m = pixelCache.get(`${j.id}@${s}`) as PbrMaps;
        this.sets.set(`${j.id}@${s}`, { size: s, albedo: dataTex(m.albedo, s, true, anisotropy), normal: dataTex(m.normal, s, false, anisotropy), packed: dataTex(m.packed, s, false, anisotropy) });
      }
    }
    const dj = jobs.find((j) => j.kind === 'decals') as Extract<Job, { kind: 'decals' }>;
    const gj = jobs.find((j) => j.kind === 'detail') as Extract<Job, { kind: 'detail' }>;
    this.decals = dataTex(pixelCache.get(`decals@${dj.size}`) as Uint8Array, dj.size, true, anisotropy);
    this.decals.wrapS = this.decals.wrapT = THREE.ClampToEdgeWrapping;
    this.detail = dataTex(pixelCache.get(`detail@${gj.size}`) as Uint8Array, gj.size, false, 1);
  }

  /** Conjunto de un material al tamaño pedido o, si no existe, al disponible más cercano por debajo (o el menor). */
  get(id: MatId, size = 4096): PbrSet {
    const sizes = this.sizes.get(id)!;
    const s = sizes.find((x) => x <= size) ?? sizes[sizes.length - 1]!;
    return this.sets.get(`${id}@${s}`)!;
  }

  /** Mayor tamaño generado de un material. */
  maxSize(id: MatId): number {
    return this.sizes.get(id)![0]!;
  }

  all(): THREE.Texture[] {
    const out: THREE.Texture[] = [this.detail, this.decals];
    for (const s of this.sets.values()) out.push(s.albedo, s.normal, s.packed);
    return out;
  }

  /** Sube todas las texturas a la GPU (pantalla de carga): luego no hay subidas al conducir. */
  upload(renderer: THREE.WebGLRenderer) {
    for (const t of this.all()) renderer.initTexture(t);
  }

  get anisotropy() {
    return this.aniso;
  }

  /**
   * Cambia la anisotropía de todas las texturas ya subidas sin volver a enviarlas
   * a la GPU (un simple parámetro del muestreador).
   */
  setAnisotropy(renderer: THREE.WebGLRenderer, value: number) {
    const n = Math.max(1, Math.min(value, renderer.capabilities.getMaxAnisotropy()));
    if (n === this.aniso) return;
    this.aniso = n;
    const gl = renderer.getContext();
    const ext = renderer.extensions.get('EXT_texture_filter_anisotropic') as { TEXTURE_MAX_ANISOTROPY_EXT: number } | null;
    for (const t of this.all()) {
      if (t === this.detail) continue;
      t.anisotropy = n;
      const handle = (renderer.properties.get(t) as { __webglTexture?: WebGLTexture }).__webglTexture;
      if (!ext || !handle) continue;
      gl.bindTexture(gl.TEXTURE_2D, handle);
      gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, n);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
    renderer.resetState();
  }

  dispose() {
    for (const t of this.all()) t.dispose();
  }
}

/**
 * Genera (si hace falta) y monta la biblioteca para una calidad de partida.
 * Llamar desde la pantalla de carga; `onProgress` recibe 0..1.
 */
export async function loadPbr(quality: TexQuality, opts: { touch?: boolean } = {}, onProgress: (p: number) => void = () => undefined): Promise<PbrLibrary> {
  const noWorkers = typeof Worker === 'undefined';
  const jobs = texPlan(quality, { ...opts, noWorkers });
  await generateAll(jobs, onProgress);
  return new PbrLibrary(jobs, quality === 'alta' ? 8 : 4);
}

/** Solo para pruebas: vacía la caché de píxeles. */
export function clearPbrCache() {
  pixelCache.clear();
}
