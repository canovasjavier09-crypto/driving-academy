/**
 * Embrague asistido (opcional, pensado para iPad y móvil, donde no hay pie
 * para el embrague). Sigue siendo un coche manual: el alumno elige la marcha;
 * el asistente solo hace lo que haría el pie izquierdo:
 *  - pisa el embrague al cambiar de marcha,
 *  - lo suelta progresivamente al salir, vigilando que el motor no caiga de vueltas,
 *  - lo pisa al detenerse para que no se cale.
 * El pedal manual sigue funcionando: se usa el mayor de los dos.
 */
import { CAR } from './specs';
import type { VehicleState } from './vehicle';

export interface ClutchAssist {
  value: number;
  /** Tiempo restante con el embrague pisado tras un cambio de marcha. */
  hold: number;
}

export function createClutchAssist(): ClutchAssist {
  return { value: 1, hold: 0 };
}

/** Llamar justo antes de cambiar de marcha: pisa el embrague a fondo. */
export function pressForShift(a: ClutchAssist, v: VehicleState) {
  a.value = 1;
  a.hold = 0.3;
  v.clutch = Math.max(v.clutch, 1);
}

/** Calcula la posición del embrague asistido para este paso. */
export function stepClutchAssist(a: ClutchAssist, v: VehicleState, throttle: number, brake: number, dt: number): number {
  const speed = Math.abs(v.v);
  if (a.hold > 0) {
    a.hold -= dt;
    a.value = 1;
    return a.value;
  }
  if (v.gear === 'N' || !v.engineOn) {
    a.value = Math.min(1, a.value + 6 * dt);
    return v.engineOn ? 0 : a.value;
  }
  const stopping = speed < 2.2 && throttle < 0.05;
  if (stopping || (brake > 0.3 && v.rpm < CAR.idleRpm * 1.25)) {
    // Parado o frenando a bajas vueltas: embrague pisado para no calar.
    a.value = Math.min(1, a.value + 6 * dt);
  } else if (v.rpm < CAR.idleRpm * 1.1 && speed < 5) {
    // El motor se viene abajo al salir: volver a pisar un poco.
    a.value = Math.min(1, a.value + 1.5 * dt);
  } else {
    // Rápido hasta el punto de fricción y luego suave.
    const inBite = a.value <= CAR.clutchBiteStart + 0.02;
    a.value = Math.max(0, a.value - (inBite ? 0.9 : 3) * dt);
  }
  return a.value;
}
