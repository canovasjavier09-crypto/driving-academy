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

/**
 * Cambio automático (opción de Configuración): elige la marcha de avance según
 * las vueltas y el acelerador. Devuelve la marcha nueva o null si no cambia.
 * El embrague lo lleva `stepClutchAssist` y el motor nunca se cala (`noStall`).
 */
export interface AutoBox {
  /** Tiempo hasta poder volver a cambiar (evita cambios seguidos). */
  cool: number;
}

export function createAutoBox(): AutoBox {
  return { cool: 0 };
}

export function stepAutoBox(a: AutoBox, v: VehicleState, throttle: number, dt: number): 1 | 2 | 3 | 4 | 5 | null {
  a.cool = Math.max(0, a.cool - dt);
  if (typeof v.gear !== 'number' || !v.engineOn || a.cool > 0) return null;
  const g = v.gear;
  const speed = Math.abs(v.v);
  let next: number = g;
  if (speed < 1.5 && g > 1) next = 1;
  else if (v.rpm > 2300 + 2400 * throttle && g < 5 && !v.clutchSlipping) next = g + 1;
  else if (v.rpm < 1150 && g > 1) next = g - 1;
  if (next === g) return null;
  a.cool = 0.9;
  return next as 1 | 2 | 3 | 4 | 5;
}
