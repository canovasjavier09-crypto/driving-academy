import { describe, expect, it } from 'vitest';
import { applyDeadzone, gravityFromEuler, normalizeOrientation, resolveOrientation, smooth, steerAngleFrom, tiltToSteer, TiltSteering, TILT_FULL_LOCK, wrap180 } from './tilt';

/** Busca beta y gamma que produzcan una gravedad dada en ejes del aparato (inversa de gravityFromEuler). */
function eulerFor(gx: number, gy: number, gz: number) {
  const beta = (Math.asin(-gy) * 180) / Math.PI;
  const gamma = (Math.atan2(gx, -gz) * 180) / Math.PI;
  return { beta, gamma };
}

/** Aparato sujeto como un volante (de frente, inclinado `back` grados hacia atrás) y girado `steer` grados. */
function hold(orientation: 0 | 90 | 270, steer: number, back = 20) {
  const s = (steer * Math.PI) / 180;
  const b = (back * Math.PI) / 180;
  // Gravedad en ejes de pantalla: girar a la derecha la hace caer hacia la derecha de la pantalla.
  const sx = Math.sin(s) * Math.cos(b);
  const sy = -Math.cos(s) * Math.cos(b);
  const sz = -Math.sin(b);
  const th = (orientation * Math.PI) / 180;
  // Pantalla → aparato (rotación inversa)
  const gx = sx * Math.cos(th) + sy * Math.sin(th);
  const gy = -sx * Math.sin(th) + sy * Math.cos(th);
  return eulerFor(gx, gy, sz);
}

describe('volante por inclinación', () => {
  it('la gravedad se calcula bien a partir de beta y gamma', () => {
    const g = gravityFromEuler(90, 0); // aparato vertical en retrato
    expect(g.y).toBeCloseTo(-1);
    expect(gravityFromEuler(0, 0).z).toBeCloseTo(-1); // plano sobre la mesa
  });

  it.each([0, 90, 270] as const)('girar a derecha/izquierda gira el coche a derecha/izquierda (orientación %i°)', (o) => {
    for (const back of [0, 20, 45]) {
      const r = hold(o, 25, back);
      const l = hold(o, -25, back);
      const c = hold(o, 0, back);
      expect(steerAngleFrom(r.beta, r.gamma, o, o !== 0)).toBeCloseTo(25, 0);
      expect(steerAngleFrom(l.beta, l.gamma, o, o !== 0)).toBeCloseTo(-25, 0);
      expect(steerAngleFrom(c.beta, c.gamma, o, o !== 0)).toBeCloseTo(0, 0);
    }
  });

  it('inclinar hacia delante o hacia atrás NO gira', () => {
    const a = hold(90, 0, 10);
    const b = hold(90, 0, 50);
    expect(Math.abs(steerAngleFrom(a.beta, a.gamma, 90, true)!)).toBeLessThan(0.5);
    expect(Math.abs(steerAngleFrom(b.beta, b.gamma, 90, true)!)).toBeLessThan(0.5);
  });

  it('si el navegador informa mal de la orientación, se deduce de la ventana y la gravedad', () => {
    const r = hold(90, 25);
    // Dice 0° pero la ventana está apaisada: debe comportarse como 90°.
    expect(steerAngleFrom(r.beta, r.gamma, 0, true)).toBeCloseTo(25, 0);
    const r2 = hold(270, 25);
    expect(steerAngleFrom(r2.beta, r2.gamma, 0, true)).toBeCloseTo(25, 0);
    expect(resolveOrientation(90, true, -1, 0)).toBe(90);
  });

  it('con el aparato casi plano no se inventa un giro', () => {
    expect(steerAngleFrom(0, 0, 90, true)).toBeNull();
  });

  it('normaliza orientaciones y ángulos', () => {
    expect(normalizeOrientation(-90)).toBe(270);
    expect(normalizeOrientation(360)).toBe(0);
    expect(wrap180(190)).toBe(-170);
    expect(wrap180(-190)).toBe(170);
  });

  it('zona muerta de ±3° sin saltos y tope de dirección', () => {
    expect(applyDeadzone(2.9)).toBe(0);
    expect(applyDeadzone(3.1)).toBeCloseTo(0.1);
    expect(tiltToSteer(TILT_FULL_LOCK)).toBe(1);
    expect(tiltToSteer(-80)).toBe(-1);
  });

  it('suaviza, calibra el recto y limita el dibujo a ±90°', () => {
    expect(smooth(0, 10)).toBeCloseTo(2.5);
    const t = new TiltSteering();
    t.active = true;
    const crooked = hold(90, 12);
    for (let i = 0; i < 40; i++) t.feed(crooked.beta, crooked.gamma, 90, true);
    t.calibrate();
    expect(t.steer()).toBe(0);
    const left = hold(90, 12 - 30);
    for (let i = 0; i < 40; i++) t.feed(left.beta, left.gamma, 90, true);
    expect(t.steer()).toBeLessThan(-0.6);
    expect(t.visualAngle()).toBeCloseTo(-27, 0);
    const big = hold(90, 150);
    for (let i = 0; i < 80; i++) t.feed(big.beta, big.gamma, 90, true);
    expect(t.visualAngle()).toBe(90);
  });
});
