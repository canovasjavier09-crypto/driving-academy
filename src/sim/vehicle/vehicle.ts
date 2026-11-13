/**
 * Modelo físico del vehículo, sin dependencias de Three.js ni del DOM.
 *
 * - Tren motriz: motor con curva de par, ralentí controlado por centralita,
 *   embrague con punto de fricción (deslizamiento / bloqueo), caja de 5 + R.
 *   El motor se cala si sus rpm caen por debajo de `CAR.stallRpm`.
 * - Longitudinal: tracción, frenos, freno de mano, rodadura, aerodinámica y pendiente.
 * - Lateral: modelo de bicicleta cinemático con límite de agarre (subviraje).
 *
 * Convención: rumbo `heading` en radianes; el vector de avance es (sin h, cos h)
 * en el plano XZ. Ángulo de ruedas positivo = giro a la izquierda.
 */
import { CAR, RPM_PER_RADS, clutchEngagement, engineFriction, maxTorque, throttleMap, totalRatio, type Gear } from './specs';

const G_ACC = 9.81;

export type Lights = 'apagadas' | 'posicion' | 'cortas' | 'largas';
export type Blinker = 'ninguno' | 'izquierda' | 'derecha' | 'emergencia';

export interface VehicleState {
  x: number;
  z: number;
  y: number;
  heading: number;
  pitch: number;
  /** Velocidad longitudinal (m/s); negativa marcha atrás. */
  v: number;
  steerAngle: number;
  wheelSpin: number;
  engineOn: boolean;
  rpm: number;
  gear: Gear;
  throttle: number;
  brake: number;
  clutch: number;
  clutchSlipping: boolean;
  handbrake: boolean;
  lights: Lights;
  blinker: Blinker;
  blinkerYaw: number;
  belt: boolean;
  fuelL: number;
  odometerM: number;
}

export interface Controls {
  throttle: number; // 0..1
  brake: number; // 0..1
  clutch: number; // 0..1 (1 = pisado a fondo)
  steer: number; // -1 izquierda .. 1 derecha
}

export interface Env {
  /** Seno de la pendiente en el sentido de avance (positivo = cuesta arriba). */
  grade: number;
  offroad: boolean;
}

export type VehicleEvent =
  | 'calado'
  | 'arrancado'
  | 'motor-apagado'
  | 'arranque-sin-embrague'
  | 'cambio'
  | 'cambio-sin-embrague'
  | 'marcha-atras-en-movimiento'
  | 'sin-combustible';

export function createVehicle(x = 0, z = 0, heading = 0): VehicleState {
  return {
    x, z, y: 0, heading, pitch: 0, v: 0, steerAngle: 0, wheelSpin: 0,
    engineOn: false, rpm: 0, gear: 'N',
    throttle: 0, brake: 0, clutch: 0, clutchSlipping: false,
    handbrake: true, lights: 'apagadas', blinker: 'ninguno', blinkerYaw: 0, belt: false,
    fuelL: 32, odometerM: 0,
  };
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Integra una velocidad sometida a una fuerza neta y a una fricción (frenos, rodadura) que solo se opone al movimiento. */
function integrateFriction(v: number, force: number, friction: number, dt: number): number {
  const m = CAR.mass;
  if (Math.abs(v) > 1e-3) {
    const vn = v + ((force - Math.sign(v) * friction) / m) * dt;
    if (Math.sign(vn) !== Math.sign(v) && Math.abs(force) <= friction) return 0;
    return vn;
  }
  if (Math.abs(force) <= friction) return 0;
  return v + ((force - Math.sign(force) * friction) / m) * dt;
}

/** Ángulo máximo de ruedas útil a esta velocidad sin superar el agarre. */
export function gripSteerLimit(v: number): number {
  const v2 = v * v;
  if (v2 < 1) return CAR.maxSteer;
  return Math.min(CAR.maxSteer, Math.atan((CAR.wheelbase * CAR.maxLateralAccel) / v2));
}

/** Avanza la simulación `dt` segundos (usar pasos ≤ 1/120 s). Muta `s` y devuelve los eventos ocurridos. */
export function stepVehicle(s: VehicleState, c: Controls, env: Env, dt: number): VehicleEvent[] {
  const events: VehicleEvent[] = [];
  s.throttle = clamp(c.throttle, 0, 1);
  s.brake = clamp(c.brake, 0, 1);
  s.clutch = clamp(c.clutch, 0, 1);

  // --- Dirección (ligeramente por encima del límite de agarre para poder subvirar) ---
  const target = -clamp(c.steer, -1, 1) * Math.min(CAR.maxSteer, gripSteerLimit(s.v) * 1.2);
  const ds = target - s.steerAngle;
  const rate = CAR.steerRate * (Math.abs(target) < Math.abs(s.steerAngle) ? 1.6 : 1);
  s.steerAngle += clamp(ds, -rate * dt, rate * dt);

  // --- Motor ---
  const m = CAR.mass;
  const r = CAR.wheelRadius;
  const Ie = CAR.engineInertia;
  const eff = CAR.efficiency;
  const G = totalRatio(s.gear);
  let we = s.rpm / RPM_PER_RADS;
  let combustion = 0;
  if (s.engineOn) {
    const thr = s.rpm >= CAR.limiterRpm ? 0 : s.throttle;
    const idle = clamp(engineFriction(s.rpm) + (CAR.idleRpm - s.rpm) * 0.35, 0, CAR.idleTorqueMax);
    combustion = Math.max(throttleMap(thr) * maxTorque(s.rpm), idle);
  }
  const Te = combustion - engineFriction(s.rpm);

  // --- Fuerzas externas ---
  const Fother = -m * G_ACC * env.grade - CAR.dragCoef * s.v * Math.abs(s.v);
  const rolling = (env.offroad ? CAR.offroadRollingCoef : CAR.rollingCoef) * m * G_ACC;
  const Ffric = rolling + s.brake * CAR.brakeForce + (s.handbrake ? CAR.handbrakeForce : 0);

  const cap = G === 0 ? 0 : clutchEngagement(s.clutch) * CAR.clutchMaxTorque;
  s.clutchSlipping = false;
  if (cap > 0) {
    const wc = (s.v * G) / r;
    const slip = we - wc;
    let locked = false;
    if (Math.abs(slip) < 1.5) {
      const sv = Math.abs(s.v) > 0.05 ? Math.sign(s.v) : 0;
      const F = Fother - sv * Ffric;
      const alpha = ((Te * G * eff) / r + F) / ((m * r) / G + (Ie * G * eff) / r);
      const Tc = Te - Ie * alpha;
      if (Math.abs(Tc) <= cap) {
        locked = true;
        we = Math.max(0, wc + alpha * dt);
        const vn = (we * r) / G;
        // Si el bloqueo cruza velocidad cero con los frenos actuando, el coche se detiene.
        s.v = sv !== 0 && Math.sign(vn) !== sv && Ffric > 0 ? 0 : vn;
        if (s.v === 0) we = 0;
      }
    }
    if (!locked) {
      const Tc = cap * clamp(slip / 0.8, -1, 1);
      s.clutchSlipping = Math.abs(slip) > 2;
      we += ((Te - Tc) / Ie) * dt;
      s.v = integrateFriction(s.v, (Tc * G * eff) / r + Fother, Ffric, dt);
      const wc2 = (s.v * G) / r;
      if (Math.sign(we - wc2) !== Math.sign(slip)) we = wc2; // las velocidades se igualan: embrague bloqueado
    }
  } else {
    we += (Te / Ie) * dt;
    s.v = integrateFriction(s.v, Fother, Ffric, dt);
  }
  we = Math.max(0, we);
  s.rpm = we * RPM_PER_RADS;

  if (s.engineOn && s.rpm < CAR.stallRpm) {
    s.engineOn = false;
    events.push('calado');
  }

  // --- Combustible (consumo específico ≈ 300 g/kWh + ralentí) ---
  if (s.engineOn) {
    const kw = (combustion * we) / 1000;
    s.fuelL = Math.max(0, s.fuelL - ((kw * 0.3) / 3600 / 0.745 + 0.6 / 3600) * dt);
    if (s.fuelL <= 0) {
      s.engineOn = false;
      events.push('sin-combustible');
    }
  }

  // --- Cinemática ---
  let yawRate = (s.v * Math.tan(s.steerAngle)) / CAR.wheelbase;
  const av = Math.abs(s.v);
  if (av > 1) yawRate = clamp(yawRate, -CAR.maxLateralAccel / av, CAR.maxLateralAccel / av);
  s.heading += yawRate * dt;
  s.x += Math.sin(s.heading) * s.v * dt;
  s.z += Math.cos(s.heading) * s.v * dt;
  s.odometerM += av * dt;
  s.wheelSpin += (s.v / r) * dt;

  // Los intermitentes se cancelan solos al completar un giro y enderezar el volante.
  if (s.blinker === 'izquierda' || s.blinker === 'derecha') {
    s.blinkerYaw += yawRate * dt;
    const turned = s.blinker === 'izquierda' ? s.blinkerYaw > 0.9 : s.blinkerYaw < -0.9;
    if (turned && Math.abs(s.steerAngle) < 0.05) {
      s.blinker = 'ninguno';
      s.blinkerYaw = 0;
    }
  }
  return events;
}

// ---------------------------------------------------------------------------
// Acciones discretas del conductor
// ---------------------------------------------------------------------------

/** Intenta engranar una marcha. Exige embrague pisado con el motor en marcha. */
export function shift(s: VehicleState, gear: Gear): VehicleEvent | null {
  if (gear === s.gear) return null;
  if (s.engineOn && s.clutch < 0.85) return 'cambio-sin-embrague';
  if (gear === 'R' && s.v > 0.4) return 'marcha-atras-en-movimiento';
  if (gear !== 'R' && gear !== 'N' && s.v < -0.4) return 'marcha-atras-en-movimiento';
  s.gear = gear;
  return 'cambio';
}

/** Llave de contacto: arranca o apaga el motor. */
export function ignition(s: VehicleState): VehicleEvent {
  if (s.engineOn) {
    s.engineOn = false;
    return 'motor-apagado';
  }
  if (s.fuelL <= 0) return 'sin-combustible';
  if (s.gear !== 'N' && s.clutch < 0.85) return 'arranque-sin-embrague';
  s.engineOn = true;
  s.rpm = Math.max(s.rpm, CAR.idleRpm);
  return 'arrancado';
}

export function toggleBlinker(s: VehicleState, side: 'izquierda' | 'derecha' | 'emergencia') {
  s.blinker = s.blinker === side ? 'ninguno' : side;
  s.blinkerYaw = 0;
}

const LIGHT_CYCLE: Lights[] = ['apagadas', 'posicion', 'cortas', 'largas'];
export function cycleLights(s: VehicleState) {
  s.lights = LIGHT_CYCLE[(LIGHT_CYCLE.indexOf(s.lights) + 1) % LIGHT_CYCLE.length]!;
}

export const kmh = (v: number) => v * 3.6;
