/**
 * Ficha técnica del turismo del simulador: un compacto de gasolina de ~1,4 l,
 * cinco marchas y tracción delantera. Los valores son verosímiles, no de un
 * modelo comercial concreto.
 */
export type Gear = 'R' | 'N' | 1 | 2 | 3 | 4 | 5;
export const GEARS: Gear[] = ['R', 'N', 1, 2, 3, 4, 5];

export const CAR = {
  mass: 1250, // kg con conductor
  wheelbase: 2.6, // m
  track: 1.5,
  length: 4.2,
  width: 1.8,
  wheelRadius: 0.31,
  ratios: { R: -3.4, N: 0, 1: 3.6, 2: 2.1, 3: 1.45, 4: 1.1, 5: 0.87 } as Record<string, number>,
  finalDrive: 4.1,
  efficiency: 0.9,
  idleRpm: 850,
  /** Umbral de calado en dificultad Normal (ver `STALL`). */
  stallRpm: 500,
  redlineRpm: 6200,
  limiterRpm: 6500,
  engineInertia: 0.18, // kg·m²
  /** Par máximo de ralentí que añade la centralita para no calarse (N·m). */
  idleTorqueMax: 80,
  clutchMaxTorque: 260, // N·m transmisibles con el embrague soltado
  /** Posición del pedal (1 = pisado a fondo) donde empieza a morder y donde ya transmite todo. */
  clutchBiteStart: 0.7,
  clutchBiteEnd: 0.18,
  brakeForce: 11000, // N con el pedal a fondo (~0,9 g)
  handbrakeForce: 5200, // N: retiene en pendientes del 20 %
  rollingCoef: 0.013,
  offroadRollingCoef: 0.09,
  dragCoef: 0.43, // ½·ρ·Cd·A
  maxSteer: (34 * Math.PI) / 180, // ángulo máximo de las ruedas
  steerRate: 1.3, // rad/s de giro de ruedas
  maxLateralAccel: 7.5, // m/s², límite de agarre
  tankLiters: 45,
} as const;

/** Curva de par a plena carga (rpm → N·m). */
const TORQUE_CURVE: [number, number][] = [
  [0, 0], [800, 95], [1500, 122], [2500, 142], [3500, 150], [4500, 147], [5500, 135], [6200, 118], [6800, 0],
];

export function maxTorque(rpm: number): number {
  if (rpm <= 0) return 0;
  for (let i = 1; i < TORQUE_CURVE.length; i++) {
    const [r1, t1] = TORQUE_CURVE[i]!;
    const [r0, t0] = TORQUE_CURVE[i - 1]!;
    if (rpm <= r1) return t0 + ((t1 - t0) * (rpm - r0)) / (r1 - r0);
  }
  return 0;
}

/**
 * Respuesta del acelerador: la mariposa abre mucho par con poco recorrido del pedal,
 * como en un coche real (a bajas rpm el 25 % del pedal da casi la mitad del par).
 */
export function throttleMap(pedal: number): number {
  const p = Math.min(1, Math.max(0, pedal));
  return 1 - Math.pow(1 - p, 2.2);
}

/** Rozamiento interno y bombeo del motor (freno motor), N·m. */
export function engineFriction(rpm: number): number {
  return rpm <= 0 ? 0 : 11 + 0.0045 * rpm;
}

/** Relación total (caja × grupo) con signo: negativa en marcha atrás. */
export function totalRatio(g: Gear): number {
  return (CAR.ratios[String(g)] ?? 0) * CAR.finalDrive;
}

/** Fracción de par que transmite el embrague según la posición del pedal (0 suelto, 1 pisado). */
export function clutchEngagement(pedal: number): number {
  const t = (CAR.clutchBiteStart - pedal) / (CAR.clutchBiteStart - CAR.clutchBiteEnd);
  const c = Math.min(1, Math.max(0, t));
  // Progresiva: al empezar a morder transmite poco par y crece rápido al final.
  return c * c;
}

export const RPM_PER_RADS = 60 / (2 * Math.PI);

/** Dificultad del calado: régimen por debajo del cual el motor se para y ayuda de la centralita al ralentí. */
export type StallDifficulty = 'facil' | 'normal' | 'realista';
export const STALL: Record<StallDifficulty, { rpm: number; assist: number; label: string }> = {
  facil: { rpm: 400, assist: 1.3, label: 'Fácil (400 rpm, más tolerante)' },
  normal: { rpm: 500, assist: 1, label: 'Normal (500 rpm)' },
  realista: { rpm: 600, assist: 0.85, label: 'Realista (600 rpm)' },
};

/** Por qué se ha calado el motor (se muestra al alumno y se apunta en el examen). */
export type StallCause = 'embrague-brusco' | 'frenar-sin-embrague' | 'marcha-larga' | 'pendiente' | 'poco-gas';
export const STALL_CAUSE_LABEL: Record<StallCause, string> = {
  'embrague-brusco': 'embrague soltado de golpe',
  'frenar-sin-embrague': 'frenar hasta parar sin pisar el embrague',
  'marcha-larga': 'salir en marcha larga sin acelerar',
  pendiente: 'cuesta arriba con poco gas',
  'poco-gas': 'poco acelerador al soltar el embrague',
};
