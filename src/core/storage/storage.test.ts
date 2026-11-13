import { describe, expect, it } from 'vitest';
import { MemoryBackend, VersionedStore } from './storage';

type D = { a: number; b?: string };
const make = (be: MemoryBackend, version = 2) =>
  new VersionedStore<D>(be, 'k', version, { 1: (d) => ({ ...d, b: 'migrado' }) }, () => ({ a: 0 }), (r) => r as D);

describe('VersionedStore', () => {
  it('devuelve valores por defecto si no hay datos', () => {
    expect(make(new MemoryBackend()).load()).toEqual({ a: 0 });
  });
  it('guarda y carga', () => {
    const be = new MemoryBackend();
    make(be).save({ a: 5 });
    expect(make(be).load()).toEqual({ a: 5 });
  });
  it('aplica migraciones de versiones anteriores', () => {
    const be = new MemoryBackend();
    be.setItem('k', JSON.stringify({ version: 1, data: { a: 3 } }));
    expect(make(be).load()).toEqual({ a: 3, b: 'migrado' });
  });
  it('conserva una copia del dato corrupto y no lanza', () => {
    const be = new MemoryBackend();
    be.setItem('k', '{no es json');
    const st = make(be);
    expect(st.load()).toEqual({ a: 0 });
    expect(st.lastError).toMatch(/dañado/);
  });
  it('rechaza importaciones ajenas', () => {
    expect(() => make(new MemoryBackend()).importJson('{"x":1}')).toThrow(/Driving Academy/);
  });
  it('exporta e importa ida y vuelta', () => {
    const st = make(new MemoryBackend());
    expect(st.importJson(st.exportJson({ a: 9 }))).toEqual({ a: 9 });
  });
});
