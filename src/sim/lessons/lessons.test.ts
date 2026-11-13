import { describe, expect, it } from 'vitest';
import { getWorldMap, MANEUVER_SPOTS, PARKED_CARS } from '../world/map';
import { getSignals } from '../world/signals';
import { getLaneGraph } from '../traffic/lanes';
import { RulesMonitor } from '../rules/monitor';
import { createVehicle } from '../vehicle/vehicle';
import { ALL_LESSONS } from '../../core/progress/curriculum';
import { carCorners, insideSpot, LESSONS } from './defs';
import { LessonSession, type SessionCtx } from './session';
import { ExamSession, roundaboutExit, turnFromHeading } from './exam';

const map = getWorldMap();
const signals = getSignals(map);
const graph = getLaneGraph(map, signals);
const env = { map, signals, graph };

function ctx(v = createVehicle(), extra: Partial<SessionCtx> = {}, t = 0): SessionCtx {
  return { t, dt: 1 / 30, v, info: map.query(v.x, v.z), events: [], contacts: 0, monitor: new RulesMonitor(signals), slowCar: null, ...extra };
}

describe('temario práctico', () => {
  it('cada lección del temario tiene definición (el nivel 6 es el examen)', () => {
    for (const l of ALL_LESSONS) {
      if (l.id === 'l6-examen') continue;
      expect(LESSONS.find((d) => d.id === l.id), l.id).toBeDefined();
    }
  });

  it('todas las lecciones empiezan sobre la calzada y sin chocar con nada', () => {
    for (const def of LESSONS) {
      const p = def.setup.pose(env);
      const q = map.query(p.x, p.z);
      expect(q.surface === 'calzada' || q.surface === 'arcen', `${def.id} ${q.surface}`).toBe(true);
      for (const c of carCorners(p)) {
        for (const o of map.obstaclesNear(c.x, c.z)) {
          const inside = c.x > o.minX && c.x < o.maxX && c.z > o.minZ && c.z < o.maxZ;
          expect(inside, `${def.id} choca al empezar`).toBe(false);
        }
        for (const car of PARKED_CARS) expect(Math.hypot(car.x - c.x, car.z - c.z), def.id).toBeGreaterThan(1.2);
      }
    }
  });

  it('las plazas de aparcamiento admiten un coche bien colocado y no lo admiten torcido o fuera', () => {
    const l = MANEUVER_SPOTS.linea;
    expect(insideSpot({ x: l.x, z: l.z, heading: Math.PI / 2 }, l)).toBe(true);
    expect(insideSpot({ x: l.x + 2, z: l.z, heading: Math.PI / 2 }, l)).toBe(false);
    const b = MANEUVER_SPOTS.bateria;
    expect(insideSpot({ x: b.x, z: b.z, heading: Math.PI }, b)).toBe(true);
    expect(insideSpot({ x: b.x, z: b.z, heading: Math.PI / 2 }, b)).toBe(false);
    const o = MANEUVER_SPOTS.oblicuo;
    expect(insideSpot({ x: o.x, z: o.z, heading: o.heading }, o)).toBe(true);
  });
});

describe('ejecución de lecciones', () => {
  it('«Conoce los mandos» se supera al completar todos los pasos', () => {
    const s = new LessonSession(LESSONS.find((d) => d.id === 'l1-mandos')!);
    const v = createVehicle(-90, 181.75, Math.PI / 2);
    s.step(ctx(v));
    v.belt = true;
    v.clutch = 1;
    v.engineOn = true;
    v.gear = 1;
    v.blinker = 'izquierda';
    v.lights = 'cortas';
    v.handbrake = false;
    s.step(ctx(v, {}, 1));
    expect(s.view().status).toBe('superada');
    expect(s.view().result?.score).toBe(100);
  });

  it('«Arrancar sin calar» falla el objetivo si se cala y una eliminatoria termina la lección', () => {
    const s = new LessonSession(LESSONS.find((d) => d.id === 'l1-arranque')!);
    const v = createVehicle(-90, 181.75, Math.PI / 2);
    s.step(ctx(v));
    s.step(ctx(v, { events: [{ code: 'calado', kind: 'falta' }] }, 1));
    expect(s.view().objectives[2]!.state).toBe('fallado');
    s.step(ctx(v, { events: [{ code: 'sentido-contrario', kind: 'falta' }] }, 2));
    expect(s.view().status).toBe('no-superada');
  });

  it('los objetivos secuenciales esperan al anterior', () => {
    const s = new LessonSession(LESSONS.find((d) => d.id === 'l1-arranque')!);
    const v = createVehicle(-90, 181.75, Math.PI / 2);
    v.engineOn = true;
    for (let i = 0; i < 60; i++) s.step(ctx(v, {}, i / 30)); // parado desde el inicio
    expect(s.view().objectives[1]!.state).toBe('pendiente');
    v.odometerM = 31;
    s.step(ctx(v, {}, 2.1));
    for (let i = 0; i < 40; i++) s.step(ctx(v, {}, 2.2 + i / 30));
    expect(s.view().status).toBe('superada');
  });
});

describe('examen práctico', () => {
  it('reconoce la salida tomada en la rotonda y el giro en un cruce', () => {
    // Entrando por el este (φ = 0) y saliendo por el norte (φ = −π/2): primera salida (derecha).
    expect(roundaboutExit(0, -Math.PI / 2)).toBe(1);
    expect(roundaboutExit(0, Math.PI)).toBe(2);
    expect(roundaboutExit(0, Math.PI / 2)).toBe(3);
    expect(turnFromHeading(0.05)).toBe('recto');
    expect(turnFromHeading(Math.PI / 2)).toBe('izquierda');
    expect(turnFromHeading(-Math.PI / 2)).toBe('derecha');
  });

  it('ofrece indicaciones posibles en cada cruce y nunca un cambio de sentido', () => {
    const ex = new ExamSession(graph, 'examen', 1);
    let empty = 0;
    for (const arm of signals.arms) {
      if (!(graph.incoming.get(arm.id)?.length)) continue;
      // Solo una esquina sin salida (llegar a una calle de sentido único en contra) admite únicamente el cambio de sentido.
      if (ex.options(arm).length === 0) empty++;
    }
    expect(empty).toBeLessThanOrEqual(1);
  });

  it('una falta eliminatoria termina la prueba con NO APTO', () => {
    const ex = new ExamSession(graph, 'examen', 1);
    const v = createVehicle(-90, 181.75, Math.PI / 2);
    ex.step(ctx(v));
    ex.step(ctx(v, { events: [{ code: 'semaforo-rojo', kind: 'falta' }] }, 5));
    const view = ex.view();
    expect(view.status).toBe('no-superada');
    expect(view.result?.verdict?.passed).toBe(false);
    expect(view.result?.summary).toContain('NO APTO');
  });
});
