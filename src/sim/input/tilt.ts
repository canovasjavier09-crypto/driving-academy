/**
 * Volante por inclinación del dispositivo (DeviceOrientationEvent).
 *
 * El giro se mide como un volante de verdad: el ángulo que forma la gravedad
 * con el eje vertical de la PANTALLA (rotación alrededor del eje que sale de
 * ella). Así da igual cuánto se incline el aparato hacia delante o hacia
 * atrás y da igual la orientación: se calcula el vector de gravedad a partir
 * de beta y gamma y se proyecta en los ejes de la pantalla.
 * - La orientación de pantalla sale de screen.orientation (o window.orientation
 *   en iOS antiguos); si contradice la forma de la ventana (p. ej. dice 0° con
 *   la ventana apaisada) se deduce de hacia qué lado cae la gravedad.
 * - Zona muerta de ±3°, suavizado exponencial y calibración del «recto».
 * - iOS (Safari 13+) exige `DeviceOrientationEvent.requestPermission()` desde
 *   un toque del usuario y una conexión segura (HTTPS o localhost).
 */

export const TILT_DEADZONE = 3; // grados
export const TILT_VISUAL_LIMIT = 90; // giro máximo del volante dibujado
/** Inclinación (grados) que equivale al volante a tope. */
export const TILT_FULL_LOCK = 45;
const SMOOTHING = 0.25; // fracción hacia el valor nuevo en cada lectura

/** Normaliza un ángulo a (−180, 180]. */
export function wrap180(a: number): number {
  let x = ((a + 180) % 360 + 360) % 360 - 180;
  if (x === -180) x = 180;
  return x;
}

/** Normaliza la orientación de pantalla a 0, 90, 180 o 270. */
export function normalizeOrientation(angle: number): 0 | 90 | 180 | 270 {
  const a = ((Math.round(angle / 90) * 90) % 360 + 360) % 360;
  return a as 0 | 90 | 180 | 270;
}

/** Vector gravedad (hacia abajo) en ejes del aparato a partir de beta y gamma (grados). */
export function gravityFromEuler(beta: number, gamma: number): { x: number; y: number; z: number } {
  const b = (beta * Math.PI) / 180;
  const g = (gamma * Math.PI) / 180;
  return { x: Math.cos(b) * Math.sin(g), y: -Math.sin(b), z: -Math.cos(b) * Math.cos(g) };
}

/**
 * Orientación de pantalla fiable: usa la informada si encaja con la forma de la
 * ventana; si no, la deduce de la gravedad (en horizontal, el lado que queda abajo).
 */
export function resolveOrientation(reported: number, landscape: boolean | null, gx: number, gy: number): 0 | 90 | 180 | 270 {
  const o = normalizeOrientation(reported);
  if (landscape === null) return o;
  const isLand = o === 90 || o === 270;
  if (isLand === landscape) return o;
  if (landscape) return gx < 0 ? 90 : 270;
  return gy < 0 ? 0 : 180;
}

/**
 * Ángulo de «volante» (grados, positivo = girar a la derecha, en el sentido de las
 * agujas del reloj visto de frente) a partir del sensor y la orientación de pantalla.
 * Devuelve null si el aparato está casi plano (la gravedad apenas cae en la pantalla).
 */
export function steerAngleFrom(beta: number, gamma: number, orientation: number, landscape: boolean | null = null): number | null {
  const g = gravityFromEuler(beta, gamma);
  const th = (resolveOrientation(orientation, landscape, g.x, g.y) * Math.PI) / 180;
  // Ejes de pantalla: x a la derecha, y hacia arriba.
  const sx = g.x * Math.cos(th) - g.y * Math.sin(th);
  const sy = g.x * Math.sin(th) + g.y * Math.cos(th);
  if (Math.hypot(sx, sy) < 0.2) return null;
  return (Math.atan2(sx, -sy) * 180) / Math.PI;
}

/** Zona muerta continua: dentro de ±dz vale 0 y fuera crece desde 0 sin saltos. */
export function applyDeadzone(a: number, dz = TILT_DEADZONE): number {
  if (Math.abs(a) <= dz) return 0;
  return a - Math.sign(a) * dz;
}

/** Ángulo calibrado y filtrado → mando de dirección (−1..1). */
export function tiltToSteer(angle: number): number {
  return Math.max(-1, Math.min(1, applyDeadzone(angle) / (TILT_FULL_LOCK - TILT_DEADZONE)));
}

/** Suavizado exponencial (interpolación hacia el valor nuevo). */
export function smooth(prev: number, next: number, k = SMOOTHING): number {
  return prev + (next - prev) * k;
}

export type TiltResult = 'ok' | 'denied' | 'unsupported' | 'insecure' | 'no-data';

type PermissionFn = () => Promise<'granted' | 'denied' | 'default'>;

function currentOrientation(): number {
  if (typeof screen !== 'undefined' && screen.orientation && typeof screen.orientation.angle === 'number') return screen.orientation.angle;
  const legacy = (window as unknown as { orientation?: number }).orientation;
  return typeof legacy === 'number' ? legacy : 0;
}

export class TiltSteering {
  active = false;
  /** Invierte el sentido (por si un aparato informa los ejes al revés). */
  invert = false;
  /** Ángulo calibrado y suavizado (grados). */
  angle = 0;
  private raw = 0;
  private offset = 0;
  private gotData = false;

  static supported(): boolean {
    return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
  }

  /** Hay que llamarlo directamente desde el manejador del toque (iOS lo exige). */
  async enable(): Promise<TiltResult> {
    if (!TiltSteering.supported()) return 'unsupported';
    const ask = (window.DeviceOrientationEvent as unknown as { requestPermission?: PermissionFn }).requestPermission;
    if (typeof ask === 'function') {
      // La petición debe ser lo primero que ocurra tras el toque.
      let res: string;
      try {
        res = await ask.call(window.DeviceOrientationEvent);
      } catch {
        return window.isSecureContext ? 'denied' : 'insecure';
      }
      if (res !== 'granted') return 'denied';
    }
    if (!window.isSecureContext) return 'insecure';
    this.gotData = false;
    window.addEventListener('deviceorientation', this.onOrientation);
    // Los ordenadores sin sensor emiten eventos vacíos o ninguno.
    await new Promise((r) => setTimeout(r, 900));
    if (!this.gotData) {
      window.removeEventListener('deviceorientation', this.onOrientation);
      return 'no-data';
    }
    this.active = true;
    this.calibrate();
    return 'ok';
  }

  disable() {
    window.removeEventListener('deviceorientation', this.onOrientation);
    this.active = false;
    this.angle = 0;
  }

  /** Toma la posición actual como «recto». */
  calibrate() {
    this.offset = this.raw;
    this.angle = 0;
  }

  /** Mando de dirección −1..1 (0 si está desactivado). */
  steer(): number {
    return this.active ? tiltToSteer(this.invert ? -this.angle : this.angle) : 0;
  }

  /** Giro del volante dibujado (grados, limitado a ±90°). */
  visualAngle(): number {
    const a = this.invert ? -this.angle : this.angle;
    return Math.max(-TILT_VISUAL_LIMIT, Math.min(TILT_VISUAL_LIMIT, applyDeadzone(a)));
  }

  /** Procesa una lectura (público para poder probarlo sin sensor). */
  feed(beta: number, gamma: number, orientation: number, landscape: boolean | null = null) {
    const a = steerAngleFrom(beta, gamma, orientation, landscape);
    if (a === null) {
      // Aparato casi plano (p. ej. apoyado en la mesa): el volante vuelve al centro poco a poco.
      this.angle = smooth(this.angle, 0, 0.08);
      return;
    }
    this.raw = a;
    this.angle = smooth(this.angle, wrap180(this.raw - this.offset));
  }

  private onOrientation = (e: DeviceOrientationEvent) => {
    if (e.beta === null || e.gamma === null) return;
    this.gotData = true;
    this.feed(e.beta, e.gamma, currentOrientation(), window.innerWidth > window.innerHeight);
  };
}
