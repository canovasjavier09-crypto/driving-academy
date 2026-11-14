import { describe, expect, it } from 'vitest';
import { createAutoBox, createClutchAssist, pressForShift, stepAutoBox, stepClutchAssist } from './assist';
import { createVehicle, ignition, shift, stepVehicle, type VehicleEvent } from './vehicle';

const DT = 1 / 240;

function setup() {
  const v = createVehicle();
  v.handbrake = false;
  ignition(v);
  const a = createClutchAssist();
  return { v, a };
}

function drive(v: ReturnType<typeof createVehicle>, a: ReturnType<typeof createClutchAssist>, seconds: number, throttle: number, brake = 0, grade = 0) {
  const ev: VehicleEvent[] = [];
  for (let t = 0; t < seconds; t += DT) {
    const clutch = stepClutchAssist(a, v, throttle, brake, DT);
    ev.push(...stepVehicle(v, { throttle, brake, clutch, steer: 0 }, { grade, offroad: false }, DT));
  }
  return ev;
}

describe('embrague asistido', () => {
  it('permite cambiar de marcha sin pedal de embrague', () => {
    const { v, a } = setup();
    pressForShift(a, v);
    expect(shift(v, 1)).toBe('cambio');
  });

  it('sale en 1.ª solo con el acelerador, sin calar', () => {
    const { v, a } = setup();
    pressForShift(a, v);
    shift(v, 1);
    const ev = drive(v, a, 4, 0.35);
    expect(ev).not.toContain('calado');
    expect(v.v * 3.6).toBeGreaterThan(10);
  });

  it('sale en una cuesta del 10 % sin calar ni irse atrás', () => {
    const { v, a } = setup();
    pressForShift(a, v);
    shift(v, 1);
    let minV = 0;
    let ev: VehicleEvent[] = [];
    for (let t = 0; t < 5; t += DT) {
      const clutch = stepClutchAssist(a, v, 0.5, 0, DT);
      ev = ev.concat(stepVehicle(v, { throttle: 0.5, brake: 0, clutch, steer: 0 }, { grade: 0.1, offroad: false }, DT));
      minV = Math.min(minV, v.v);
    }
    expect(ev).not.toContain('calado');
    expect(v.v).toBeGreaterThan(1);
    expect(minV).toBeGreaterThan(-0.6);
  });

  it('frena hasta parar en marcha sin calar', () => {
    const { v, a } = setup();
    pressForShift(a, v);
    shift(v, 1);
    drive(v, a, 3, 0.4);
    pressForShift(a, v);
    shift(v, 2);
    drive(v, a, 3, 0.4);
    const ev = drive(v, a, 4, 0, 0.7);
    expect(ev).not.toContain('calado');
    expect(v.v).toBe(0);
    expect(v.engineOn).toBe(true);
  });
});

describe('cambio automático', () => {
  /** Conduce como lo hace la simulación en automático: marchas y embrague solos, sin calado. */
  function auto(v: ReturnType<typeof createVehicle>, seconds: number, throttle: number, brake = 0, grade = 0) {
    const a = createClutchAssist(), box = createAutoBox();
    const ev: VehicleEvent[] = [];
    const gears = new Set<unknown>();
    for (let t = 0; t < seconds; t += DT) {
      const g = stepAutoBox(box, v, throttle, DT);
      if (g !== null) {
        pressForShift(a, v);
        shift(v, g);
      }
      gears.add(v.gear);
      const clutch = stepClutchAssist(a, v, throttle, brake, DT);
      ev.push(...stepVehicle(v, { throttle, brake, clutch, steer: 0 }, { grade, offroad: false, noStall: true }, DT));
    }
    return { ev, gears };
  }

  it('sube de marcha al acelerar, vuelve a 1.ª al parar y nunca se cala', () => {
    const v = createVehicle();
    v.handbrake = false;
    ignition(v);
    v.clutch = 1;
    shift(v, 1);
    const up = auto(v, 25, 0.7);
    expect(up.ev).not.toContain('calado');
    expect(up.ev).not.toContain('cambio-sin-embrague');
    expect(v.gear).toBeGreaterThanOrEqual(3);
    expect(v.v * 3.6).toBeGreaterThan(60);
    const stop = auto(v, 12, 0, 0.8);
    expect(stop.ev).not.toContain('calado');
    expect(v.v).toBe(0);
    expect(v.gear).toBe(1);
    expect(v.engineOn).toBe(true);
    // Y vuelve a salir, también cuesta arriba
    const again = auto(v, 6, 0.6, 0, 0.1);
    expect(again.ev).not.toContain('calado');
    expect(v.v).toBeGreaterThan(2);
  });
});
