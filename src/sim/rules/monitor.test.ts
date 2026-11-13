import { describe, expect, it } from 'vitest';
import { getWorldMap } from '../world/map';
import { getSignals, lightColor, type LightColor } from '../world/signals';
import { getLaneGraph, pointAt, type LanePath } from '../traffic/lanes';
import { createVehicle } from '../vehicle/vehicle';
import { Instructor, lineFor } from '../instructor/instructor';
import { RulesMonitor, type RuleCode } from './monitor';

const map = getWorldMap();
const signals = getSignals(map);
const graph = getLaneGraph(map, signals);

interface DriveOpts {
  speed: (d: number, t: number) => number; // m/s según distancia recorrida
  blinker?: 'izquierda' | 'derecha';
  belt?: boolean;
  lateralShift?: number; // positivo = a la derecha
  light?: (t: number) => LightColor;
  busy?: (id: string) => boolean;
  t0?: number;
}

function drive(lanes: LanePath[], o: DriveOpts): RuleCode[] {
  const mon = new RulesMonitor(signals);
  const v = createVehicle();
  v.engineOn = true;
  v.handbrake = false;
  v.belt = o.belt ?? true;
  v.gear = 2;
  v.rpm = 2000;
  v.lights = 'cortas';
  const codes: RuleCode[] = [];
  const total = lanes.reduce((a, l) => a + l.length, 0);
  let d = 1;
  let t = o.t0 ?? 0;
  const dt = 1 / 30;
  while (d < total - 1 && t < (o.t0 ?? 0) + 120) {
    let rem = d;
    let lane = lanes[0]!;
    for (const l of lanes) {
      lane = l;
      if (rem <= l.length) break;
      rem -= l.length;
    }
    const p = pointAt(lane, rem);
    const sh = o.lateralShift ?? 0;
    v.x = p.x - Math.cos(p.heading) * sh;
    v.z = p.z + Math.sin(p.heading) * sh;
    v.heading = p.heading;
    v.v = o.speed(d, t);
    v.blinker = o.blinker ?? 'ninguno';
    const info = map.query(v.x, v.z);
    for (const e of mon.step({
      t, dt, v, info,
      light: (arm) => (o.light ? o.light(t) : lightColor(arm.junction.id, arm.axis, t)),
      clearToEnter: null, leader: null, crosswalkBusy: o.busy ?? (() => false),
    })) codes.push(e.code);
    d += v.v * dt;
    t += dt;
  }
  return codes;
}

/** Trayectoria: un carril que llega a un brazo con cierta regulación, más el conector y la salida. */
function route(control: string, turn: 'recto' | 'derecha' | 'izquierda' = 'recto'): LanePath[] {
  for (const l of graph.lanes.values()) {
    if (l.kind !== 'calle' || l.control !== control || l.length < 100) continue;
    const conn = l.next.map((id) => graph.get(id)).find((c) => c.turn === turn);
    if (!conn) continue;
    return [l, conn, graph.get(conn.next[0]!)];
  }
  throw new Error(`sin ruta ${control} ${turn}`);
}

describe('detector de normas', () => {
  it('STOP: detectar no detenerse y reconocer la detención completa', () => {
    const r = route('stop');
    const line = r[0]!.lineS!;
    const fast = drive(r, { speed: () => 6 });
    expect(fast).toContain('aviso-stop');
    expect(fast).toContain('stop-sin-detenerse');
    let stoppedAt = -1;
    const good = drive(r, {
      speed: (d, t) => {
        if (d < line - 1.5) return 6;
        if (stoppedAt < 0) stoppedAt = t;
        return t - stoppedAt < 2 ? 0 : 3;
      },
    });
    expect(good).not.toContain('stop-sin-detenerse');
    expect(good).toContain('stop-correcto');
  });

  it('semáforo: rojo es falta; verde no', () => {
    const r = route('semaforo');
    expect(drive(r, { speed: () => 8, light: () => 'rojo' })).toContain('semaforo-rojo');
    expect(drive(r, { speed: () => 8, light: () => 'verde' })).not.toContain('semaforo-rojo');
  });

  it('exceso de velocidad en una calle de 30', () => {
    const r = route('stop');
    expect(drive(r, { speed: () => 50 / 3.6 })).toContain('exceso-velocidad');
    expect(drive(r, { speed: () => 28 / 3.6 })).not.toContain('exceso-velocidad');
  });

  it('girar sin intermitente es falta; con intermitente, no', () => {
    const r = route('ceda', 'derecha');
    expect(drive(r, { speed: () => 4 })).toContain('giro-sin-intermitente');
    expect(drive(r, { speed: () => 4, blinker: 'derecha' })).not.toContain('giro-sin-intermitente');
  });

  it('circular por el carril contrario es sentido contrario', () => {
    const r = route('stop');
    expect(drive([r[0]!], { speed: () => 6, lateralShift: -3.5 })).toContain('sentido-contrario');
    expect(drive([r[0]!], { speed: () => 6 })).not.toContain('sentido-contrario');
  });

  it('pasar por un paso de peatones ocupado es no ceder el paso al peatón', () => {
    const r = route('stop');
    const codes = drive([r[0]!], { speed: () => 7, busy: () => true });
    expect(codes).toContain('aviso-peaton');
    expect(codes).toContain('no-ceder-peaton');
  });

  it('sin cinturón', () => {
    expect(drive([route('stop')[0]!], { speed: () => 5, belt: false })).toContain('sin-cinturon');
  });
});

describe('instructor', () => {
  it('tiene una frase para cada evento y prioriza lo grave sin repetirse', () => {
    const ins = new Instructor(false);
    const first = ins.handle([{ code: 'aviso-stop', kind: 'aviso' }, { code: 'semaforo-rojo', kind: 'falta' }], 0);
    expect(first?.tone).toBe('bad');
    expect(ins.handle([{ code: 'semaforo-rojo', kind: 'falta' }], 2)).toBeNull();
    expect(ins.handle([{ code: 'semaforo-rojo', kind: 'falta' }], 10)).not.toBeNull();
    expect(lineFor({ code: 'exceso-velocidad', kind: 'falta', detail: '45 km/h donde el límite es 30' }).text).toContain('45 km/h');
  });
});

describe('faltas del examen con zonas', () => {
  it('pisar el eje en una calle de doble sentido es mala posición', () => {
    const lane = [...graph.lanes.values()].find((l) => l.id === 'h3-1#0')!;
    // Desplazado hacia el eje: el carril está a 1,75 m del eje; 1,4 m a la izquierda lo deja a 0,35 m.
    const codes = drive([lane], { speed: () => 8, lateralShift: -1.4 });
    expect(codes).toContain('mala-posicion');
    expect(drive([lane], { speed: () => 8 })).not.toContain('mala-posicion');
  });

  it('cambiar de carril sin mirar el retrovisor es falta leve; mirando antes, no', () => {
    const lane = [...graph.lanes.values()].find((l) => l.id === 'h0-1#0')!;
    const run = (glance: number | undefined) => {
      const mon = new RulesMonitor(signals);
      const v = createVehicle();
      v.engineOn = true; v.handbrake = false; v.belt = true; v.gear = 2; v.v = 8; v.blinker = 'izquierda';
      const codes: RuleCode[] = [];
      for (let t = 0, d = 5; d < lane.length - 20; t += 1 / 30, d += 8 / 30) {
        const p = pointAt(lane, d);
        // A mitad del tramo pasa al otro carril (3,5 m a la izquierda)
        const sh = d > lane.length / 2 ? -3.5 : 0;
        v.x = p.x - Math.cos(p.heading) * sh;
        v.z = p.z + Math.sin(p.heading) * sh;
        v.heading = p.heading;
        for (const e of mon.step({ t, dt: 1 / 30, v, info: map.query(v.x, v.z), light: () => 'verde', clearToEnter: null, leader: null, crosswalkBusy: () => false, mirrorGlanceT: glance === undefined ? undefined : t - glance })) codes.push(e.code);
      }
      return codes;
    };
    expect(run(20)).toContain('no-retrovisor');
    expect(run(1)).not.toContain('no-retrovisor');
    expect(run(undefined)).not.toContain('no-retrovisor');
  });
});
