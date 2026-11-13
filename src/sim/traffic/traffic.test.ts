import { describe, expect, it } from 'vitest';
import { getWorldMap } from '../world/map';
import { getSignals, lightColor, LIGHT_JUNCTIONS } from '../world/signals';
import { getLaneGraph } from './lanes';
import { Traffic, type TrafficEnv } from './traffic';

const map = getWorldMap();
const signals = getSignals(map);
const graph = getLaneGraph(map, signals);

describe('señalización', () => {
  it('cada brazo con tráfico de llegada tiene regulación y los STOP/ceda tienen señal', () => {
    const regulated = signals.arms.filter((a) => a.control !== 'prioridad');
    expect(regulated.length).toBeGreaterThan(20);
    expect(signals.signs.filter((s) => s.kind === 'stop').length).toBeGreaterThan(3);
    expect(signals.signs.filter((s) => s.kind === 'ceda').length).toBeGreaterThan(3);
    expect(signals.lights.length).toBeGreaterThanOrEqual(LIGHT_JUNCTIONS.length * 3);
  });

  it('nunca hay verde a la vez en los dos ejes de un cruce', () => {
    for (const j of LIGHT_JUNCTIONS) {
      for (let t = 0; t < 80; t += 0.25) {
        const h = lightColor(j, 'h', t);
        const v = lightColor(j, 'v', t);
        expect(h === 'rojo' || v === 'rojo', `${j} t=${t}`).toBe(true);
      }
    }
  });

  it('las señales están fuera de la calzada y los pasos de peatones sobre ella', () => {
    for (const s of signals.signs) expect(map.query(s.x, s.z).surface, `${s.kind} ${s.x},${s.z}`).not.toBe('calzada');
    for (const c of signals.crosswalks) expect(map.query(c.center.x, c.center.z).surface).toBe('calzada');
  });
});

describe('red de carriles', () => {
  it('todos los carriles tienen continuación y los conectores encajan', () => {
    for (const l of graph.lanes.values()) {
      expect(l.next.length, l.id).toBeGreaterThan(0);
      for (const id of l.next) {
        const n = graph.get(id);
        if (l.closed) continue;
        const end = l.pts[l.pts.length - 1]!;
        const start = n.pts[0]!;
        expect(Math.hypot(end.x - start.x, end.z - start.z), `${l.id} → ${id}`).toBeLessThan(0.6);
      }
    }
  });

  it('los carriles de calle circulan por la derecha', () => {
    for (const l of graph.lanes.values()) {
      if (l.kind !== 'calle' || l.road?.oneWay) continue;
      const k = Math.floor(l.pts.length / 2);
      const mid = l.pts[k]!;
      const q = map.query(mid.x, mid.z);
      // lateral > 0 = derecha de la polilínea; el carril va en el sentido de la polilínea si está a la derecha.
      // Dirección local del carril (las carreteras con curvas no van de un extremo a otro en línea recta).
      const nx = l.pts[k + 1]!;
      const dir = Math.cos(Math.atan2(nx.x - mid.x, nx.z - mid.z) - q.heading) > 0 ? 1 : -1;
      expect(Math.sign(q.lateral), l.id).toBe(dir);
    }
  });
});

describe('tráfico IA', () => {
  function run(seconds: number, env: Partial<TrafficEnv> = {}, seed = 3) {
    const tr = new Traffic(graph, signals, { city: 34, highway: 8, seed });
    const stats = { redRuns: 0, stopRuns: 0, overlaps: 0, dist: new Map<number, number>() };
    const lastPos = new Map(tr.cars.map((c) => [c.id, { x: c.x, z: c.z, lane: c.lane, s: c.s, minV: Infinity }]));
    const dt = 1 / 30;
    for (let t = 0; t < seconds; t += dt) {
      tr.step(dt, { t, player: null, crosswalkBusy: () => false, ...env });
      for (const c of tr.cars) {
        const prev = lastPos.get(c.id)!;
        const jump = Math.hypot(c.x - prev.x, c.z - prev.z);
        if (jump < 10) stats.dist.set(c.id, (stats.dist.get(c.id) ?? 0) + jump); // ignora reubicaciones
        const lane = prev.lane;
        // Cruce de la línea de detención en este paso
        if (c.lane === lane && lane.arrive && lane.lineS !== undefined && prev.s < lane.lineS && c.s >= lane.lineS) {
          if (lane.control === 'semaforo' && lightColor(lane.arrive.junction.id, lane.arrive.axis, t) === 'rojo') stats.redRuns++;
        }
        if (c.lane !== lane && lane.arrive && lane.control === 'stop' && prev.minV > 0.3) stats.stopRuns++;
        const nearLine = c.lane.lineS !== undefined && c.lane.lineS - c.s < 8 && c.lane.lineS - c.s > -1;
        const minV = c.lane !== lane ? Infinity : nearLine ? Math.min(prev.minV, c.v) : prev.minV;
        lastPos.set(c.id, { x: c.x, z: c.z, lane: c.lane, s: c.s, minV });
      }
      for (let i = 0; i < tr.cars.length; i++) {
        for (let k = i + 1; k < tr.cars.length; k++) {
          const a = tr.cars[i]!, b = tr.cars[k]!;
          if (Math.hypot(a.x - b.x, a.z - b.z) < 1.5) stats.overlaps++;
        }
      }
    }
    return { tr, stats };
  }

  it.each([3, 5, 9])('circula 3 minutos sin saltarse semáforos ni STOP y sin solaparse (semilla %i)', (seed) => {
    const { tr, stats } = run(180, {}, seed);
    expect(stats.redRuns).toBe(0);
    expect(stats.stopRuns).toBe(0);
    expect(stats.overlaps).toBe(0);
    const moved = [...stats.dist.values()];
    const avg = moved.reduce((a, b) => a + b, 0) / moved.length;
    expect(avg).toBeGreaterThan(500);
    // Casi ningún coche bloqueado
    expect(tr.cars.filter((c) => c.stuckT > 30).length).toBeLessThanOrEqual(2);
  });

  it('se detiene ante un paso de peatones ocupado', () => {
    const busy = new Set(signals.crosswalks.map((c) => c.id));
    const { stats } = run(60, { crosswalkBusy: (id) => busy.has(id) });
    // Con todos los pasos ocupados nadie puede salir de su calle: recorren poco.
    const moved = [...stats.dist.values()].filter((_, i) => i < 34);
    expect(Math.max(...moved)).toBeLessThan(260);
  });

  it('frena detrás del coche del alumno parado en su carril', () => {
    const tr = new Traffic(graph, signals, { city: 1, highway: 0, seed: 11 });
    const c = tr.cars[0]!;
    const ahead = { ...(c.lane.pts[Math.min(c.lane.pts.length - 1, 0)]!) };
    // Colocar al alumno 30 m por delante en la misma trayectoria
    c.s = 2;
    c.v = 8;
    tr.step(0.01, { t: 0, player: null, crosswalkBusy: () => false });
    const fx = Math.sin(c.heading), fz = Math.cos(c.heading);
    const player = { x: c.x + fx * 30, z: c.z + fz * 30, heading: c.heading, v: 0 };
    void ahead;
    let minGap = Infinity;
    for (let t = 0; t < 15; t += 1 / 30) {
      tr.step(1 / 30, { t, player, crosswalkBusy: () => false });
      minGap = Math.min(minGap, Math.hypot(player.x - c.x, player.z - c.z));
    }
    expect(c.v).toBeLessThan(0.2);
    expect(minGap).toBeGreaterThan(4.3);
  });
});
