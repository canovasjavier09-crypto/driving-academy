/**
 * Modelo físico del vehículo, sin dependencias de Three.js ni del DOM.
 *
 * - Tren motriz: motor con curva de par, ralentí controlado por centralita,
 *   embrague con punto de fricción (deslizamiento / bloqueo), caja de 5 + R.
 *   El motor se cala solo si sus rpm caen por debajo del umbral (`env.stallRpm`,
 *   según la dificultad): nunca al azar. Con el embrague pisado o en punto
 *   muerto el motor no está unido a las ruedas y no puede calarse.
 * - Longitudinal: tracción, frenos, freno de mano, rodadura, aerodinámica y pendiente.
 * - Lateral: modelo de bicicleta cinemático con límite de agarre (subviraje).
 *
 * Convención: rumbo `heading` en radianes; el vector de avance es (sin h, cos h)
 * en el plano XZ. Ángulo de ruedas positivo = giro a la izquierda.
 */
import { CAR, RPM_PER_RADS, clutchEngagement, engineFriction, maxTorque, throttleMap, totalRatio, type Gear, type StallCause } from './specs';

const G_ACC = 9.81;
/** Segundos seguidos por debajo del umbral para que el motor se cale. */
const STALL_DWELL = 0.5;
/** La ayuda del ralentí desaparece entre 0,7 y 1,2 veces el umbral de calado. */
const COLLAPSE_FROM = 0.7;
const COLLAPSE_SPAN = 0.5;

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
  /** Causa del último calado (null cuando el motor se arranca de nuevo). */
  stallCause: StallCause | null;
  /** 0–1: el motor «se viene abajo» (vueltas por debajo del ralentí con el embrague mordiendo). */
  lug: number;
  /** Velocidad a la que se suelta el embrague (recorrido/s, suavizada; positiva al soltar). */
  clutchRate: number;
  /** Tirón (0–1) que decae: al morder el embrague de golpe o al calarse. */
  jerk: number;
  /** Tiempo seguido por debajo del umbral de calado (s). */
  stallT: number;
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
  /** Régimen de calado (rpm). Por defecto, el de la dificultad Normal. */
  stallRpm?: number;
  /** Multiplicador de la ayuda de la centralita al ralentí (dificultad). */
  idleAssist?: number;
  /** Cambio automático: el embrague se abre solo antes de que el motor caiga de vueltas; nunca se cala. */
  noStall?: boolean;
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
    stallCause: null, lug: 0, clutchRate: 0, jerk: 0, stallT: 0,
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
  const prevClutch = s.clutch;
  s.throttle = clamp(c.throttle, 0, 1);
  s.brake = clamp(c.brake, 0, 1);
  s.clutch = clamp(c.clutch, 0, 1);
  if (dt > 0) s.clutchRate += ((prevClutch - s.clutch) / dt - s.clutchRate) * Math.min(1, dt * 6);
  s.jerk = Math.max(0, s.jerk - dt * 2.5);
  const stallRpm = env.stallRpm ?? CAR.stallRpm;

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
    const assist = env.idleAssist ?? 1;
    // Centralita: mantiene el ralentí y, al caer de vueltas, inyecta algo más (más en Fácil).
    // Muy por debajo del ralentí la combustión sin gas se viene abajo: ya no puede recuperarse sola.
    const collapse = clamp((s.rpm - COLLAPSE_FROM * stallRpm) / (COLLAPSE_SPAN * stallRpm), 0, 1);
    const idle = clamp(engineFriction(s.rpm) + (CAR.idleRpm - s.rpm) * 0.35 * assist, 0, CAR.idleTorqueMax * assist) * collapse;
    // El gas del conductor se suma a la ayuda del ralentí y a bajas vueltas responde como a 1200 rpm:
    // con un poco de acelerador el motor aguanta el tirón en vez de calarse.
    const low = maxTorque(Math.max(s.rpm, 1200));
    const pedalT = throttleMap(thr) * low;
    combustion = Math.max(pedalT, Math.min(pedalT + idle * (1 - 0.5 * thr), Math.max(low, CAR.idleTorqueMax * assist)));
  }
  const Te = combustion - engineFriction(s.rpm);

  // --- Fuerzas externas ---
  const Fother = -m * G_ACC * env.grade - CAR.dragCoef * s.v * Math.abs(s.v);
  const rolling = (env.offroad ? CAR.offroadRollingCoef : CAR.rollingCoef) * m * G_ACC;
  const Ffric = rolling + s.brake * CAR.brakeForce + (s.handbrake ? CAR.handbrakeForce : 0);

  let cap = G === 0 ? 0 : clutchEngagement(s.clutch) * CAR.clutchMaxTorque;
  // Automático: el embrague se abre solo antes de que el motor caiga demasiado (como un convertidor de par).
  if (env.noStall && s.engineOn && s.rpm < CAR.idleRpm * 0.85) cap *= clamp((s.rpm - stallRpm) / (CAR.idleRpm * 0.85 - stallRpm), 0, 1) * 0.5;
  const wasSlipping = s.clutchSlipping;
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
  // Tirón: el embrague deja de patinar de golpe con mucha diferencia de vueltas.
  if (wasSlipping && !s.clutchSlipping && s.clutchRate > 2) s.jerk = Math.max(s.jerk, 0.6);

  // Motor «ahogado»: vueltas por debajo del ralentí con una marcha y el embrague mordiendo.
  const biting = s.engineOn && G !== 0 && clutchEngagement(s.clutch) > 0.05;
  const lugT = biting ? clamp((CAR.idleRpm * 0.95 - s.rpm) / (CAR.idleRpm * 0.95 - stallRpm), 0, 1) : 0;
  s.lug += (lugT - s.lug) * Math.min(1, dt * 12);

  // Calado: el régimen cae por debajo del umbral y no se recupera en un instante
  // (una caída momentánea con gas es solo un tirón), o se hunde del todo.
  s.stallT = s.engineOn && s.rpm < stallRpm ? s.stallT + dt : 0;
  if (s.engineOn && (s.stallT > STALL_DWELL || s.rpm < stallRpm * 0.5)) {
    s.stallT = 0;
    if (env.noStall) {
      s.rpm = stallRpm;
    } else {
      s.stallCause = stallCauseOf(s, env);
      s.engineOn = false;
      s.lug = 0;
      s.jerk = 1;
      events.push('calado');
    }
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

/**
 * Clasifica la causa de un calado (solo para explicarlo: el calado en sí lo decide la física).
 * Se mira en este orden: marcha larga al salir, frenar sin embrague, cuesta arriba y embrague brusco.
 */
export function stallCauseOf(s: VehicleState, env: Env): StallCause {
  const speed = Math.abs(s.v);
  if (typeof s.gear === 'number' && s.gear >= 2 && speed < 2.5 * (s.gear - 1) && s.brake < 0.15) return 'marcha-larga';
  if (s.brake > 0.15 && speed < 1.5) return 'frenar-sin-embrague';
  if (env.grade > 0.035 && s.throttle < 0.4) return 'pendiente';
  if (s.clutchRate > 1.2 || (clutchEngagement(s.clutch) > 0.95 && s.throttle < 0.05)) return 'embrague-brusco';
  return 'poco-gas';
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
  s.stallCause = null;
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
