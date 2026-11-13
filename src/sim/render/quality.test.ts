import { describe, expect, it } from 'vitest';
import { AdaptiveQuality, RATIO_MIN } from './quality';

/** Simula `n` segundos con un FPS dado; devuelve el reloj final. */
function run(aq: AdaptiveQuality, fps: number, n: number, t0 = 0) {
  for (let i = 0; i < n; i++) aq.sample(fps, t0 + i);
  return t0 + n;
}

describe('calidad adaptativa', () => {
  it('empieza en Medio con pixel ratio ≤ 1,5', () => {
    const aq = new AdaptiveQuality(2);
    expect(aq.level).toBe('medio');
    expect(aq.ratio).toBe(1.5);
    expect(new AdaptiveQuality(1).ratio).toBe(1);
  });

  it('los dos primeros segundos (compilación de shaders) no cuentan', () => {
    const aq = new AdaptiveQuality(2);
    run(aq, 10, 2);
    expect(aq.ratio).toBe(1.5);
  });

  it('por debajo de 55 FPS reduce el pixel ratio un 10 % cada segundo hasta 0,6', () => {
    const aq = new AdaptiveQuality(2);
    run(aq, 60, 3);
    aq.sample(50, 3);
    expect(aq.ratio).toBeCloseTo(1.35, 2);
    run(aq, 50, 20, 4);
    expect(aq.ratio).toBeGreaterThanOrEqual(RATIO_MIN);
  });

  it('con la resolución al mínimo y aún lento, baja de nivel y no vuelve a subir enseguida', () => {
    const aq = new AdaptiveQuality(2);
    let t = run(aq, 60, 3);
    t = run(aq, 50, 14, t);
    expect(aq.level).toBe('bajo');
    // Mucho margen durante 30 s: recupera resolución pero no vuelve a Medio (falló hace menos de 60 s).
    t = run(aq, 62, 30, t);
    expect(aq.level).toBe('bajo');
    expect(aq.ratio).toBe(1.5);
    run(aq, 62, 40, t);
    expect(aq.level).not.toBe('bajo');
  });

  it('una caída fuerte (< 40 FPS) baja de nivel sin esperar a la resolución mínima', () => {
    const aq = new AdaptiveQuality(2);
    const t = run(aq, 60, 3);
    run(aq, 30, 2, t);
    expect(aq.level).toBe('bajo');
  });

  it('sube el pixel ratio tras 3 s por encima del umbral; en pantallas de 60 Hz el umbral es 57', () => {
    const aq = new AdaptiveQuality(2);
    let t = run(aq, 60, 3);
    aq.sample(50, t++);
    const low = aq.ratio;
    t = run(aq, 60, 3, t);
    expect(aq.ratio).toBeGreaterThan(low);
    expect(aq.upThreshold).toBe(57);
    const fast = new AdaptiveQuality(2);
    run(fast, 120, 4);
    expect(fast.upThreshold).toBe(62);
  });

  it('con margen sostenido y resolución máxima sube a Alto', () => {
    const aq = new AdaptiveQuality(2);
    run(aq, 60, 12);
    expect(aq.level).toBe('alto');
  });
});
