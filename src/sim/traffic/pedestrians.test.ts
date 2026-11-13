import { describe, expect, it } from 'vitest';
import { getWorldMap } from '../world/map';
import { getSignals } from '../world/signals';
import { getLaneGraph } from './lanes';
import { Traffic } from './traffic';
import { approachingCrosswalk, Pedestrians } from './pedestrians';

const map = getWorldMap();
const signals = getSignals(map);
const graph = getLaneGraph(map, signals);

describe('peatones', () => {
  it('detecta vehículos que se acercan a un paso, pero no los que se alejan o están parados', () => {
    const cw = signals.crosswalks[0]!;
    const at = (d: number) => ({ x: cw.center.x + cw.along.x * d, z: cw.center.z + cw.along.z * d });
    const toward = Math.atan2(-cw.along.x, -cw.along.z);
    expect(approachingCrosswalk(cw, [{ ...at(15), heading: toward, v: 8 }])).toBe(true);
    expect(approachingCrosswalk(cw, [{ ...at(15), heading: toward + Math.PI, v: 8 }])).toBe(false);
    expect(approachingCrosswalk(cw, [{ ...at(7), heading: toward, v: 0 }])).toBe(false);
  });

  it('pasean por las aceras, cruzan por los pasos y los coches les ceden el paso', () => {
    const traffic = new Traffic(graph, signals, { city: 30, highway: 0, seed: 4 });
    const peds = new Pedestrians(signals, 50, 2);
    const cws = new Map(signals.crosswalks.map((c) => [c.id, c]));
    let crossings = 0;
    let offSidewalk = 0;
    let carsThroughBusy = 0;
    const was = new Map<number, string>();
    const dt = 1 / 30;
    for (let t = 0; t < 150; t += dt) {
      peds.step(dt, { vehicleApproaching: (id) => approachingCrosswalk(cws.get(id)!, traffic.cars) });
      traffic.step(dt, { t, player: null, crosswalkBusy: (id) => peds.busy(id) });
      for (const p of peds.peds) {
        if (p.state === 'cross' && was.get(p.id) !== 'cross') crossings++;
        was.set(p.id, p.state);
        if (p.state !== 'cross') {
          const s = map.query(p.x, p.z).surface;
          if (s === 'calzada' || s === 'fuera') offSidewalk++;
        }
      }
      for (const [id, cw] of cws) {
        if (!peds.busy(id)) continue;
        for (const c of traffic.cars) {
          const dx = c.x - cw.center.x, dz = c.z - cw.center.z;
          const along = Math.abs(dx * cw.along.x + dz * cw.along.z);
          const lat = Math.abs(-dx * cw.along.z + dz * cw.along.x);
          if (along < 2 && lat < cw.halfWidth && c.v > 1) carsThroughBusy++;
        }
      }
    }
    expect(crossings).toBeGreaterThan(20);
    expect(offSidewalk).toBe(0);
    expect(carsThroughBusy).toBe(0);
  });
});
