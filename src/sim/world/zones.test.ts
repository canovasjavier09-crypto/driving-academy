import { describe, expect, it } from 'vitest';
import { getWorldMap, limitAt, PARKED_CARS, SCHOOL_LIMIT, SCHOOL_ROADS, SIERRA_ID } from './map';
import { getSignals } from './signals';
import { getLaneGraph } from '../traffic/lanes';
import { Traffic } from '../traffic/traffic';
import { RulesMonitor } from '../rules/monitor';
import { createVehicle } from '../vehicle/vehicle';
import { CAR } from '../vehicle/specs';
import { spawnIsSafe, spawnPoints, zoneAt, ZONES } from './zones';
import { loadRecent, pickRandom, saveRecent, scenarioFrom, zoneOfSeed } from '../scenario';
import { ExamSession } from '../lessons/exam';

const map = getWorldMap();
const signals = getSignals(map);
const graph = getLaneGraph(map, signals);

describe('zonas', () => {
  it('hay 8 zonas con carácter propio y todas tienen salidas', () => {
    expect(ZONES.map((z) => z.id).sort()).toEqual(['autovia', 'centro', 'convencional', 'escolar', 'industrial', 'montana', 'residencial', 'rotondas']);
    for (const z of ZONES) expect(spawnPoints(map, signals, z.id).length, z.id).toBeGreaterThanOrEqual(10);
  });

  it('la zona escolar está limitada a 20 y la carretera de la Sierra tiene tramo de montaña (40) y convencional (70)', () => {
    for (const id of SCHOOL_ROADS) expect(map.roads.find((r) => r.id === id)!.limit).toBe(SCHOOL_LIMIT);
    const cv = map.roads.find((r) => r.id === SIERRA_ID)!;
    expect(cv.sections!.map((s) => s.limit)).toEqual([50, 40, 70, 50]);
    expect(limitAt(cv, (cv.sections![1]!.from + cv.sections![1]!.to) / 2)).toBe(40);
    expect(signals.signs.some((s) => s.kind === 'escolar')).toBe(true);
    expect(map.buildings.some((b) => b.style === 'industrial')).toBe(true);
  });

  it('cada salida está en la calzada, en su carril y sentido, dentro de su zona y sin chocar con nada', () => {
    for (const z of ZONES) {
      for (const p of spawnPoints(map, signals, z.id)) {
        expect(spawnIsSafe(map, signals, p), `${z.id} ${p.road}`).toBe(true);
        const q = map.query(p.x, p.z);
        expect(q.surface).toBe('calzada');
        expect(zoneAt(map, q), `${z.id} ${p.road} s=${p.s}`).toBe(z.id);
        // Las cuatro esquinas del coche, sobre la vía y fuera de obstáculos
        const fx = Math.sin(p.heading), fz = Math.cos(p.heading);
        for (const [a, b] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {
          const cx = p.x + fx * (CAR.length / 2) * a - fz * (CAR.width / 2) * b;
          const cz = p.z + fz * (CAR.length / 2) * a + fx * (CAR.width / 2) * b;
          expect(map.drivable(cx, cz), `${z.id} esquina`).toBe(true);
          for (const o of map.obstaclesNear(cx, cz)) expect(cx > o.minX && cx < o.maxX && cz > o.minZ && cz < o.maxZ).toBe(false);
          for (const c of PARKED_CARS) expect(Math.hypot(c.x - cx, c.z - cz)).toBeGreaterThan(2);
        }
      }
    }
  });

  it('300 escenarios aleatorios: nunca en contradirección (2 s circulando) ni con un coche encima', () => {
    for (let seed = 1; seed <= 300; seed++) {
      const sc = scenarioFrom(map, signals, seed * 3331);
      const mon = new RulesMonitor(signals);
      const v = createVehicle(sc.spawn.x, sc.spawn.z, sc.spawn.heading);
      v.engineOn = true; v.handbrake = false; v.belt = true; v.gear = 1; v.v = 4; v.lights = 'cortas';
      const codes: string[] = [];
      for (let t = 0; t < 2; t += 1 / 30) {
        v.x += Math.sin(v.heading) * v.v / 30;
        v.z += Math.cos(v.heading) * v.v / 30;
        for (const e of mon.step({ t, dt: 1 / 30, v, info: map.query(v.x, v.z), light: () => 'verde', clearToEnter: null, leader: null, crosswalkBusy: () => false })) codes.push(e.code);
      }
      expect(codes, `semilla ${sc.seed} (${sc.zone})`).not.toContain('sentido-contrario');
      expect(codes).not.toContain('subir-acera');
      const tr = new Traffic(graph, signals, { city: 36, highway: 12, seed: sc.trafficSeed, avoid: sc.spawn });
      for (const c of tr.cars) expect(Math.hypot(c.x - sc.spawn.x, c.z - sc.spawn.z), `semilla ${sc.seed}`).toBeGreaterThan(12);
    }
  });
});

describe('semilla y sorteo', () => {
  it('la misma semilla da el mismo escenario', () => {
    const a = scenarioFrom(map, signals, 424242);
    const b = scenarioFrom(map, signals, 424242);
    expect(b).toEqual(a);
    expect(a.zone).toBe(zoneOfSeed(424242));
    expect(scenarioFrom(map, signals, 424242, 'montana').zone).toBe('montana');
    expect(a.route).toHaveLength(7);
    expect(a.route).not.toContain(a.zone);
  });

  it('el sorteo aleatorio no repite las dos últimas zonas', () => {
    let r = 1;
    const rand = () => ((r = (r * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 200; i++) {
      const recent = [ZONES[i % 8]!.id, ZONES[(i * 3 + 1) % 8]!.id];
      expect(recent).not.toContain(pickRandom(map, signals, recent, rand).zone);
    }
  });

  it('el historial funciona sin localStorage (modo privado)', () => {
    expect(() => saveRecent('centro')).not.toThrow();
    expect(Array.isArray(loadRecent())).toBe(true);
  });
});

describe('ruta del examen', () => {
  it('desde cualquier cruce hay indicación hacia cualquier zona', () => {
    const ex = new ExamSession(graph, 'examen', 1);
    for (const z of ZONES) {
      for (const arm of signals.arms) {
        if (!(graph.incoming.get(arm.id)?.length)) continue;
        expect(ex.plan(arm, z.id), `${arm.id} → ${z.id}`).not.toBeNull();
      }
    }
  });

  it('empieza en la salida sorteada', () => {
    const sc = scenarioFrom(map, signals, 777);
    const ex = new ExamSession(graph, 'examen', 1);
    ex.setScenario(sc);
    const p = ex.setup.pose({ map, signals, graph });
    expect(Math.hypot(p.x - sc.spawn.x, p.z - sc.spawn.z)).toBeLessThan(0.01);
  });
});
