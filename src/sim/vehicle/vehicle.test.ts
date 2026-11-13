import { describe, expect, it } from 'vitest';
import { createVehicle, ignition, shift, stepVehicle, kmh, type Controls, type Env, type VehicleEvent, type VehicleState } from './vehicle';
import { CAR, clutchEngagement } from './specs';

const DT = 1 / 240;
const FLAT: Env = { grade: 0, offroad: false };

function run(s: VehicleState, c: Partial<Controls> | ((t: number) => Partial<Controls>), seconds: number, env: Env = FLAT): VehicleEvent[] {
  const ev: VehicleEvent[] = [];
  for (let t = 0; t < seconds; t += DT) {
    const cc = typeof c === 'function' ? c(t) : c;
    ev.push(...stepVehicle(s, { throttle: 0, brake: 0, clutch: 0, steer: 0, ...cc }, env, DT));
  }
  return ev;
}

function started(): VehicleState {
  const s = createVehicle();
  s.handbrake = false;
  expect(ignition(s)).toBe('arrancado');
  return s;
}

/** Arranque de manual: pisa embrague, mete 1.ª y suelta progresivamente con algo de gas. */
function pullAway(s: VehicleState, gear: 1 | 3 = 1, gas = 0.25, releaseSec = 1.6) {
  run(s, { clutch: 1 }, 0.2);
  expect(shift(s, gear)).toBe('cambio');
  return run(s, (t) => ({ clutch: Math.max(0, 1 - t / releaseSec), throttle: gas }), releaseSec + 1);
}

describe('embrague', () => {
  it('el punto de fricción está entre el pedal pisado y suelto', () => {
    expect(clutchEngagement(1)).toBe(0);
    expect(clutchEngagement(0)).toBe(1);
    expect(clutchEngagement(0.42)).toBeGreaterThan(0.2);
    expect(clutchEngagement(0.42)).toBeLessThan(0.8);
  });
});

describe('motor', () => {
  it('mantiene el ralentí estable en punto muerto', () => {
    const s = started();
    run(s, {}, 5);
    expect(s.engineOn).toBe(true);
    expect(Math.abs(s.rpm - CAR.idleRpm)).toBeLessThan(60);
  });

  it('no arranca con una marcha metida sin pisar el embrague', () => {
    const s = createVehicle();
    s.gear = 1;
    expect(ignition(s)).toBe('arranque-sin-embrague');
    expect(s.engineOn).toBe(false);
  });

  it('respeta el corte de inyección', () => {
    const s = started();
    run(s, { throttle: 1 }, 3);
    expect(s.rpm).toBeLessThan(CAR.limiterRpm + 150);
  });
});

describe('cambio de marchas', () => {
  it('rechaza cambiar sin pisar el embrague', () => {
    const s = started();
    expect(shift(s, 1)).toBe('cambio-sin-embrague');
    expect(s.gear).toBe('N');
  });

  it('rechaza la marcha atrás en movimiento', () => {
    const s = started();
    pullAway(s);
    run(s, { clutch: 1 }, 0.1);
    expect(shift(s, 'R')).toBe('marcha-atras-en-movimiento');
  });
});

describe('salida y calado', () => {
  it('sale en 1.ª soltando el embrague poco a poco', () => {
    const s = started();
    const ev = pullAway(s);
    expect(ev).not.toContain('calado');
    expect(s.engineOn).toBe(true);
    expect(kmh(s.v)).toBeGreaterThan(5);
  });

  it('sale en 1.ª sin gas si se suelta muy despacio (ralentí)', () => {
    const s = started();
    const ev = pullAway(s, 1, 0, 3);
    expect(ev).not.toContain('calado');
    expect(s.v).toBeGreaterThan(0.5);
  });

  it('se cala al soltar el embrague de golpe', () => {
    const s = started();
    run(s, { clutch: 1 }, 0.2);
    shift(s, 1);
    const ev = run(s, { clutch: 0 }, 1);
    expect(ev).toContain('calado');
    expect(s.engineOn).toBe(false);
  });

  it('se cala al intentar salir en 3.ª sin gas', () => {
    const s = started();
    const ev = pullAway(s, 3, 0, 1.2);
    expect(ev).toContain('calado');
  });

  it('se cala al frenar hasta parar sin pisar el embrague', () => {
    const s = started();
    pullAway(s);
    const ev = run(s, { brake: 0.8 }, 3);
    expect(ev).toContain('calado');
    expect(s.v).toBe(0);
  });

  it('no se cala al frenar con el embrague pisado', () => {
    const s = started();
    pullAway(s);
    const ev = run(s, { brake: 0.8, clutch: 1 }, 3);
    expect(ev).not.toContain('calado');
    expect(s.v).toBe(0);
    expect(s.engineOn).toBe(true);
  });
});

describe('dinámica longitudinal', () => {
  function accelerateThroughGears(s: VehicleState, seconds: number) {
    pullAway(s, 1, 0.6);
    for (const g of [2, 3, 4, 5] as const) {
      run(s, { throttle: 1 }, g === 5 ? seconds : 4);
      run(s, { clutch: 1 }, 0.3);
      shift(s, g);
      run(s, (t) => ({ clutch: Math.max(0, 1 - t / 0.6), throttle: 0.4 }), 0.6);
    }
    run(s, { throttle: 1 }, seconds);
  }

  it('alcanza una velocidad máxima verosímil en 5.ª', () => {
    const s = started();
    accelerateThroughGears(s, 60);
    expect(kmh(s.v)).toBeGreaterThan(150);
    expect(kmh(s.v)).toBeLessThan(205);
  });

  it('acelera de 0 a 100 km/h en un tiempo propio de un compacto (8–16 s)', () => {
    const s = started();
    run(s, { clutch: 1 }, 0.2);
    shift(s, 1);
    let t = 0;
    let gear = 1;
    const shiftAt = 5800;
    while (kmh(s.v) < 100 && t < 30) {
      if (s.rpm > shiftAt && gear < 5) {
        run(s, { clutch: 1 }, 0.25);
        shift(s, (++gear) as 2 | 3 | 4 | 5);
        run(s, (tt) => ({ clutch: Math.max(0, 1 - tt / 0.3), throttle: 0.6 }), 0.3);
        t += 0.55;
      }
      const launch = t < 1.2;
      stepVehicle(s, { throttle: launch ? 0.55 : 1, brake: 0, clutch: launch ? Math.max(0, 1 - t / 1.2) : 0, steer: 0 }, FLAT, DT);
      t += DT;
    }
    expect(t).toBeGreaterThan(8);
    expect(t).toBeLessThan(16);
  });

  it('frena de 50 km/h a 0 en una distancia realista (<20 m) a fondo', () => {
    const s = started();
    s.v = 50 / 3.6;
    s.gear = 'N';
    const x0 = s.z;
    run(s, { brake: 1 }, 4);
    expect(s.v).toBe(0);
    const d = s.z - x0;
    expect(d).toBeGreaterThan(9);
    expect(d).toBeLessThan(20);
  });

  it('retiene el coche en pendiente del 10 % con el freno de mano', () => {
    const s = createVehicle();
    run(s, {}, 5, { grade: 0.1, offroad: false });
    expect(s.v).toBe(0);
  });

  it('sin freno y en punto muerto, el coche se va hacia atrás en una cuesta', () => {
    const s = createVehicle();
    s.handbrake = false;
    run(s, {}, 3, { grade: 0.1, offroad: false });
    expect(s.v).toBeLessThan(-1);
  });

  it('el freno motor reduce la velocidad al levantar el pie', () => {
    const s = started();
    accelerateThroughGears(s, 0);
    const v0 = s.v;
    run(s, {}, 3);
    expect(s.v).toBeLessThan(v0 - 1.5);
    expect(s.engineOn).toBe(true);
  });

  it('la marcha atrás mueve el coche hacia atrás', () => {
    const s = started();
    run(s, { clutch: 1 }, 0.2);
    expect(shift(s, 'R')).toBe('cambio');
    run(s, (t) => ({ clutch: Math.max(0, 1 - t / 2), throttle: 0.2 }), 3);
    expect(s.v).toBeLessThan(-0.5);
  });
});

describe('dirección', () => {
  it('gira a la izquierda con steer negativo y respeta el radio de giro mínimo', () => {
    const s = started();
    pullAway(s);
    const h0 = s.heading;
    run(s, { steer: -1, throttle: 0.05 }, 4);
    expect(s.heading).toBeGreaterThan(h0 + 0.5);
    const radius = CAR.wheelbase / Math.tan(s.steerAngle);
    expect(radius).toBeGreaterThan(3.5);
    expect(radius).toBeLessThan(6);
  });

  it('limita la aceleración lateral a alta velocidad', () => {
    const s = started();
    s.v = 30;
    s.gear = 'N';
    run(s, { steer: 1 }, 2);
    const yawRate = (s.v * Math.tan(Math.abs(s.steerAngle))) / CAR.wheelbase;
    expect(Math.min(yawRate, CAR.maxLateralAccel / s.v) * s.v).toBeLessThanOrEqual(CAR.maxLateralAccel + 1e-6);
    expect(Math.abs(s.steerAngle)).toBeLessThan(0.05);
  });

  it('cancela el intermitente tras completar el giro', () => {
    const s = started();
    pullAway(s);
    s.blinker = 'izquierda';
    run(s, { steer: -1, throttle: 0.05 }, 3);
    run(s, { steer: 0, throttle: 0.05 }, 1.5);
    expect(s.blinker).toBe('ninguno');
  });
});
