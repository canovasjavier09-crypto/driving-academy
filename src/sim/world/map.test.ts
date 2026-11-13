import { describe, expect, it } from 'vitest';
import { getWorldMap, heightAt, inManeuverZone, obbOverlap, MANEUVER, MANEUVER_SPOTS, PARKED_CARS, RING, ROUNDABOUT, TUNNEL, XS, ZS } from './map';

const map = getWorldMap();

describe('mapa', () => {
  it('tiene calles, autovía, ramales, cruces y rotonda', () => {
    // Calles de la retícula + la carretera de la Sierra (calle rural de doble sentido)
    expect(map.roads.filter((r) => r.kind === 'calle' && !r.rural).length).toBe(ZS.length * (XS.length - 1) + XS.length * (ZS.length - 1));
    expect(map.roads.filter((r) => r.rural)).toHaveLength(1);
    expect(map.roads.find((r) => r.kind === 'autovia')?.closed).toBe(true);
    expect(map.roads.filter((r) => r.kind === 'ramal')).toHaveLength(2);
    expect(map.junctions.filter((j) => j.kind === 'rotonda')).toHaveLength(1);
    expect(map.roads.some((r) => r.oneWay && r.kind === 'calle')).toBe(true);
  });

  it('los puntos de salida están sobre la calzada y orientados en el sentido de la vía', () => {
    for (const s of map.spawns) {
      const q = map.query(s.x, s.z);
      expect(q.surface, s.id).toBe('calzada');
      if (q.area === 'maniobras') continue; // explanada sin carriles
      // El carril debe circular en el sentido del vehículo.
      const diff = Math.abs(Math.atan2(Math.sin(q.heading - s.heading), Math.cos(q.heading - s.heading)));
      const lane = q.road?.lanes.reduce((a, b) => (Math.abs(b.offset - q.lateral) < Math.abs(a.offset - q.lateral) ? b : a));
      const forward = lane?.dir === 1 ? diff < 0.3 : Math.abs(diff - Math.PI) < 0.3;
      expect(forward, s.id).toBe(true);
    }
  });

  it('ningún edificio invade calzadas ni aceras y no se solapan', () => {
    expect(map.buildings.length).toBeGreaterThan(80);
    for (const b of map.buildings) {
      const o = b.obb;
      for (let u = -o.hu; u <= o.hu; u += 2) {
        for (let v = -o.hv; v <= o.hv; v += 2) {
          const x = o.cx + o.ux * u - o.uz * v, z = o.cz + o.uz * u + o.ux * v;
          expect(map.query(x, z).surface).toBe('fuera');
        }
      }
    }
    for (let i = 0; i < map.buildings.length; i++)
      for (let k = i + 1; k < map.buildings.length; k++) expect(obbOverlap(map.buildings[i]!.obb, map.buildings[k]!.obb)).toBe(false);
  });

  it('el trazado es irregular: cruces desplazados de la cuadrícula y calles curvas', () => {
    const moved = map.junctions.filter((j) => Math.hypot(j.x - XS[j.xi]!, j.z - ZS[j.zi]!) > 2);
    expect(moved.length).toBeGreaterThan(12);
    const curved = map.roads.filter((r) => {
      if (r.kind !== 'calle') return false;
      const a = r.pts[0]!, b = r.pts[r.pts.length - 1]!;
      const mid = r.pts[Math.floor(r.pts.length / 2)]!;
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      return Math.abs(((mid.x - a.x) * (b.z - a.z) - (mid.z - a.z) * (b.x - a.x)) / len) > 1.5;
    });
    expect(curved.length).toBeGreaterThan(12);
    // Todos los cruces conservan sus brazos
    for (const j of map.junctions) expect(j.arms.length, j.id).toBeGreaterThanOrEqual(2);
  });

  it('hay cuestas reales (7–13 %) en el barrio alto y la autovía es llana', () => {
    expect(heightAt(-240, -180)).toBeCloseTo(8, 0);
    // (las calles siguen el relieve; la cuesta medida sobre la calle Mayor)
    expect(heightAt(0, 0)).toBe(0);
    let maxGrade = 0;
    for (let x = -240; x < -120; x += 1) maxGrade = Math.max(maxGrade, Math.abs(heightAt(x + 1, -180) - heightAt(x, -180)));
    expect(maxGrade).toBeGreaterThan(0.07);
    expect(maxGrade).toBeLessThan(0.13);
    const ring = map.roads.find((r) => r.kind === 'autovia')!;
    expect(Math.max(...ring.pts.map((p) => heightAt(p.x, p.z)))).toBeLessThan(0.01);
  });

  it('la autovía tiene mediana, arcén y límite de 120', () => {
    const q = map.query(RING.hx, 0);
    expect(q.surface).toBe('mediana');
    expect(map.query(RING.hx - 5, 0).surface).toBe('calzada');
    expect(map.query(RING.hx - 10, -100).surface).toBe('arcen');
    expect(map.query(RING.hx - 5, 0).limit).toBe(120);
  });

  it('el carril de aceleración es transitable junto a la autovía', () => {
    expect(map.drivable(RING.hx - 10.9, 100)).toBe(true);
    expect(map.query(RING.hx - 10.9, 100).road?.id).toBe('ramal-entrada');
  });

  it('la rotonda tiene isleta central y sentido antihorario', () => {
    expect(map.query(ROUNDABOUT.x, ROUNDABOUT.z).surface).toBe('isleta');
    const east = map.query(ROUNDABOUT.x + 14, ROUNDABOUT.z);
    expect(east.surface).toBe('calzada');
    // En el punto este se circula hacia el norte (−Z): rumbo π.
    expect(Math.abs(Math.cos(east.heading) + 1)).toBeLessThan(1e-6);
  });

  it('la zona de maniobras tiene plazas libres entre coches aparcados y queda dentro de la circunvalación', () => {
    for (const p of PARKED_CARS) expect(inManeuverZone(p.x, p.z)).toBe(true);
    for (const spot of Object.values(MANEUVER_SPOTS)) {
      expect(inManeuverZone(spot.x, spot.z)).toBe(true);
      // Ningún coche aparcado ocupa una plaza objetivo
      for (const p of PARKED_CARS) expect(Math.hypot(p.x - spot.x, p.z - spot.z)).toBeGreaterThan(2.5);
    }
    // Ninguna vía atraviesa la zona
    const pad = 10; // margen respecto al eje de cualquier vía
    for (const r of map.roads) for (const p of r.pts) expect(p.x > MANEUVER.minX - pad && p.x < MANEUVER.maxX + pad && p.z > MANEUVER.minZ - pad && p.z < MANEUVER.maxZ + pad, r.id).toBe(false);
    expect(map.trees.some((t) => inManeuverZone(t.x, t.z))).toBe(false);
  });

  it('el túnel tiene paredes a ambos lados de la calzada', () => {
    const near = map.obstaclesNear(0, TUNNEL.z + TUNNEL.halfWidth + 0.5);
    expect(near.length).toBeGreaterThan(0);
    expect(map.drivable(0, TUNNEL.z + 5)).toBe(true);
  });
});
