import { describe, expect, it } from 'vitest';
import { DECALS, DECAL_GRID, MAT_IDS, decalAtlas, detailGrain, generate } from './recipes';
import { FAR_MATS, runJob, texPlan } from './jobs';
import { fbm, halve, rng, voronoi } from './noise';

const same = (a: Uint8Array, b: Uint8Array) => a.length === b.length && a.every((v, i) => v === b[i]);

describe('ruido en mosaico', () => {
  it('el fBm se repite sin costura y está normalizado', () => {
    const N = 64;
    const f = fbm(N, 4, 5, rng(1));
    let lo = 1, hi = 0, jump = 0, inner = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const v = f[y * N + x]!;
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
        inner = Math.max(inner, Math.abs(v - f[y * N + ((x + 1) % N)]!));
      }
      jump = Math.max(jump, Math.abs(f[y * N + N - 1]! - f[y * N]!));
    }
    expect(lo).toBeCloseTo(0, 5);
    expect(hi).toBeCloseTo(1, 5);
    // El salto en el borde no es mayor que entre píxeles vecinos del interior
    expect(jump).toBeLessThanOrEqual(inner + 1e-6);
  });

  it('el Voronoi marca los bordes de celda', () => {
    const v = voronoi(64, 4, rng(2));
    expect(Math.min(...v.edge)).toBeLessThan(0.03);
    expect(Math.max(...v.edge)).toBeGreaterThan(0.2);
  });
});

describe('materiales PBR', () => {
  it('cada material da albedo, normal y rugosidad+AO del tamaño pedido, sin valores vacíos', () => {
    for (const id of MAT_IDS) {
      const m = generate(id, 64);
      expect(m.size).toBe(64);
      for (const map of [m.albedo, m.normal, m.packed]) expect(map.length).toBe(64 * 64 * 4);
      // Normales: apuntan hacia fuera (canal azul alto) y están centradas en X/Y
      let b = 0, r = 0, rough = 0;
      for (let i = 0; i < 64 * 64; i++) {
        r += m.normal[i * 4]!;
        b += m.normal[i * 4 + 2]!;
        rough += m.packed[i * 4 + 1]!;
      }
      expect(b / 4096).toBeGreaterThan(170);
      expect(Math.abs(r / 4096 - 127.5)).toBeLessThan(12);
      if (id !== 'carpaint') expect(rough / 4096).toBeGreaterThan(8);
    }
  });

  it('es determinista: la misma textura cada vez', () => {
    const a = generate('asphalt', 64), b = generate('asphalt', 64);
    expect(same(a.albedo, b.albedo)).toBe(true);
  });

  it('el asfalto tiene rugosidad variable y zonas de charco', () => {
    const m = generate('asphalt', 128);
    let lo = 255, hi = 0, pud = 0;
    for (let i = 0; i < 128 * 128; i++) {
      lo = Math.min(lo, m.packed[i * 4 + 1]!);
      hi = Math.max(hi, m.packed[i * 4 + 1]!);
      if (m.packed[i * 4 + 2]! > 128) pud++;
    }
    expect(hi - lo).toBeGreaterThan(60);
    expect(pud).toBeGreaterThan(100);
    expect(pud).toBeLessThan(128 * 128 * 0.7);
  });

  it('el atlas de decals tiene 16 casillas con borde transparente', () => {
    expect(DECALS.length).toBe(DECAL_GRID * DECAL_GRID);
    const N = 128, T = N / DECAL_GRID;
    const a = decalAtlas(N);
    for (let k = 0; k < 16; k++) {
      const ox = (k % 4) * T, oy = Math.floor(k / 4) * T;
      let any = 0;
      for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) any = Math.max(any, a[((oy + y) * N + ox + x) * 4 + 3]!);
      expect(any, DECALS[k]).toBeGreaterThan(40);
      for (let x = 0; x < T; x++) expect(a[(oy * N + ox + x) * 4 + 3]).toBe(0);
    }
    expect(detailGrain(32).length).toBe(32 * 32 * 4);
  });
});

describe('plan de generación', () => {
  it('1024 por defecto, 2048 solo el asfalto y solo si se puede llegar a Alto, 512 en Baja', () => {
    const size = (jobs: ReturnType<typeof texPlan>, id: string) => {
      const j = jobs.find((x) => x.kind === 'mat' && x.id === id);
      return j && j.kind === 'mat' ? j.sizes : [];
    };
    const media = texPlan('media');
    expect(size(media, 'asphalt')).toEqual([2048, 1024, 512]);
    expect(size(media, 'paving')).toEqual([1024, 512]);
    expect(size(media, 'leather')).toEqual([512]);
    for (const id of FAR_MATS) expect(size(media, id)).toContain(512);
    for (const j of media) if (j.kind === 'mat' && j.id !== 'asphalt') expect(Math.max(...j.sizes)).toBeLessThanOrEqual(1024);
    const baja = texPlan('baja');
    for (const j of baja) expect(j.kind === 'mat' ? Math.max(...j.sizes) : j.size).toBeLessThanOrEqual(512);
    expect(size(texPlan('alta', { touch: true }), 'asphalt')).toEqual([1024, 512]);
    expect(size(texPlan('alta', { noWorkers: true }), 'asphalt')).toEqual([1024, 512]);
  });

  it('los tamaños menores salen de reducir el mayor (una sola generación)', () => {
    const r = runJob({ kind: 'mat', id: 'brick', sizes: [64, 32] });
    expect(r.kind).toBe('mat');
    if (r.kind !== 'mat') return;
    expect(r.maps.map((m) => m.size)).toEqual([64, 32]);
    expect(same(r.maps[1]!.albedo, halve(r.maps[0]!.albedo, 64))).toBe(true);
  });
});
