/**
 * Entrada del conductor: teclado, ratón (mirar alrededor), táctil (desde la
 * capa React) y Gamepad API (mandos y volantes). Produce `Controls` continuos
 * y una cola de acciones discretas.
 *
 * El teclado es digital, así que los pedales se simulan con rampas: al soltar
 * el embrague, el pedal sube despacio en la zona de fricción para poder salir
 * sin calar, igual que haría un pie entrenado.
 */
import type { Gear } from '../vehicle/specs';
import type { Controls } from '../vehicle/vehicle';
import { CAR } from '../vehicle/specs';
import { TiltSteering } from './tilt';

export type Action =
  | { type: 'gear'; gear: Gear }
  | { type: 'gearUp' }
  | { type: 'gearDown' }
  | { type: 'ignition' }
  | { type: 'blinker'; side: 'izquierda' | 'derecha' | 'emergencia' }
  | { type: 'lights' }
  | { type: 'belt' }
  | { type: 'handbrake' }
  | { type: 'camera' }
  | { type: 'mirrors' }
  | { type: 'pause' }
  | { type: 'fps' };

export interface KeyHelp {
  keys: string;
  label: string;
}

export const KEY_HELP: KeyHelp[] = [
  { keys: 'W / ↑', label: 'Acelerador' },
  { keys: 'S / ↓', label: 'Freno' },
  { keys: 'A D / ← →', label: 'Dirección' },
  { keys: 'C o Mayús', label: 'Embrague (mantener; al soltar sube despacio)' },
  { keys: '1–5 · R · N', label: 'Marchas (con embrague pisado)' },
  { keys: 'E / Q', label: 'Subir / bajar marcha' },
  { keys: 'I', label: 'Llave: arrancar / apagar' },
  { keys: 'Espacio', label: 'Freno de mano' },
  { keys: 'Z / X', label: 'Intermitente izquierdo / derecho' },
  { keys: 'G', label: 'Luces de emergencia' },
  { keys: 'L', label: 'Luces (posición → cortas → largas)' },
  { keys: 'B', label: 'Cinturón' },
  { keys: 'V', label: 'Cámara 1.ª / 3.ª persona' },
  { keys: 'M', label: 'Retrovisores' },
  { keys: 'Ratón', label: 'Arrastra para mirar alrededor (doble clic centra)' },
  { keys: 'Esc / P', label: 'Pausa' },
];

const KEY_ACTIONS: Record<string, Action> = {
  Digit1: { type: 'gear', gear: 1 },
  Digit2: { type: 'gear', gear: 2 },
  Digit3: { type: 'gear', gear: 3 },
  Digit4: { type: 'gear', gear: 4 },
  Digit5: { type: 'gear', gear: 5 },
  KeyR: { type: 'gear', gear: 'R' },
  KeyN: { type: 'gear', gear: 'N' },
  Digit0: { type: 'gear', gear: 'N' },
  KeyE: { type: 'gearUp' },
  KeyQ: { type: 'gearDown' },
  KeyI: { type: 'ignition' },
  Space: { type: 'handbrake' },
  KeyZ: { type: 'blinker', side: 'izquierda' },
  KeyX: { type: 'blinker', side: 'derecha' },
  KeyG: { type: 'blinker', side: 'emergencia' },
  KeyL: { type: 'lights' },
  KeyB: { type: 'belt' },
  KeyV: { type: 'camera' },
  KeyM: { type: 'mirrors' },
  KeyP: { type: 'pause' },
  Escape: { type: 'pause' },
  KeyF: { type: 'fps' },
};

const CAPTURED = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']);

const approach = (v: number, target: number, up: number, down: number, dt: number) =>
  v < target ? Math.min(target, v + up * dt) : Math.max(target, v - down * dt);


export class InputManager {
  private keys = new Set<string>();
  private queue: Action[] = [];
  private kb = { throttle: 0, brake: 0, clutch: 0, steer: 0 };
  /** Teclas virtuales pulsadas desde los botones táctiles (mismas rampas que el teclado). */
  private virtual = new Set<string>();
  /** Volante por inclinación del dispositivo (inactivo hasta que el usuario lo activa). */
  readonly tilt = new TiltSteering();
  /** Pedal de embrague táctil (deslizador que se queda donde se suelta). */
  touchClutch = 0;
  /** Últimos mandos calculados (para dibujar el volante y los pedales táctiles). */
  last: Controls = { throttle: 0, brake: 0, clutch: 0, steer: 0 };
  /** Mirada libre con el ratón (radianes). */
  look = { yaw: 0, pitch: 0 };
  gamepadName: string | null = null;
  private padButtons: boolean[] = [];
  private padClutch = 0;
  private dragging = false;
  private lastPointer = { x: 0, y: 0 };

  constructor(private surface: HTMLElement) {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    surface.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    surface.addEventListener('dblclick', this.onDblClick);
  }

  dispose() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    this.surface.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.surface.removeEventListener('dblclick', this.onDblClick);
    this.tilt.disable();
  }

  /** Botones táctiles: equivalen a mantener pulsada una tecla. */
  clearVirtual() {
    this.virtual.clear();
  }

  setVirtual(code: string, down: boolean) {
    if (down) this.virtual.add(code);
    else this.virtual.delete(code);
  }

  push(a: Action) {
    this.queue.push(a);
  }

  drain(): Action[] {
    const q = this.queue;
    this.queue = [];
    return q;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (CAPTURED.has(e.code)) e.preventDefault();
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (!e.repeat) {
      const a = KEY_ACTIONS[e.code];
      if (a) this.queue.push(a);
    }
    this.keys.add(e.code);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
  };

  private onBlur = () => this.keys.clear();

  private onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    this.dragging = true;
    this.lastPointer = { x: e.clientX, y: e.clientY };
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastPointer.x;
    const dy = e.clientY - this.lastPointer.y;
    this.lastPointer = { x: e.clientX, y: e.clientY };
    this.look.yaw = Math.max(-1.9, Math.min(1.9, this.look.yaw - dx * 0.005));
    this.look.pitch = Math.max(-0.6, Math.min(0.5, this.look.pitch - dy * 0.004));
  };

  private onPointerUp = () => {
    this.dragging = false;
  };

  private onDblClick = () => {
    this.look.yaw = 0;
    this.look.pitch = 0;
  };

  private down(...codes: string[]) {
    return codes.some((c) => this.keys.has(c) || this.virtual.has(c));
  }

  /** Lee todas las fuentes y devuelve los mandos combinados (se usa el valor mayor de cada pedal). */
  sample(dt: number): Controls {
    const k = this.kb;
    k.throttle = approach(k.throttle, this.down('KeyW', 'ArrowUp') ? 1 : 0, 2.2, 5, dt);
    k.brake = approach(k.brake, this.down('KeyS', 'ArrowDown') ? 1 : 0, 2.5, 6, dt);
    const clutchHeld = this.down('KeyC', 'ShiftLeft', 'ShiftRight');
    if (clutchHeld) k.clutch = approach(k.clutch, 1, 6, 0, dt);
    else {
      // Rápido hasta el punto de fricción, lento dentro de él.
      const inBite = k.clutch <= CAR.clutchBiteStart + 0.04 && k.clutch > CAR.clutchBiteEnd - 0.06;
      k.clutch = approach(k.clutch, 0, 0, inBite ? 0.45 : 2.5, dt);
    }
    const sTarget = (this.down('KeyD', 'ArrowRight') ? 1 : 0) - (this.down('KeyA', 'ArrowLeft') ? 1 : 0);
    const returning = sTarget === 0 || Math.sign(sTarget) !== Math.sign(k.steer);
    k.steer = approach(k.steer, sTarget, returning ? 3.5 : 1.6, returning ? 3.5 : 1.6, dt);

    const pad = this.readGamepad();
    const tilt = this.tilt.steer();
    const pick = (a: number, b: number, c: number) => (Math.abs(a) >= Math.abs(b) && Math.abs(a) >= Math.abs(c) ? a : Math.abs(b) >= Math.abs(c) ? b : c);
    this.last = {
      throttle: Math.max(k.throttle, pad.throttle),
      brake: Math.max(k.brake, pad.brake),
      clutch: Math.max(k.clutch, pad.clutch, this.touchClutch),
      // Las flechas siguen funcionando aunque el volante por inclinación esté activo.
      steer: pick(k.steer, tilt, pad.steer),
    };
    return this.last;
  }

  /**
   * Gamepad API. Mapeo «standard» (mandos de consola): stick izquierdo = dirección,
   * gatillos = freno/acelerador, LB = embrague, RB/X = subir/bajar marcha, A = llave.
   * Mapeo no estándar (muchos volantes): eje 0 dirección y ejes 1–3 pedales.
   */
  private readGamepad(): Controls {
    const none = { throttle: 0, brake: 0, clutch: 0, steer: 0 };
    const pads = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads() : [];
    const p = Array.from(pads ?? []).find((g) => g && g.connected);
    if (!p) {
      this.gamepadName = null;
      return none;
    }
    this.gamepadName = p.id;
    const dz = (v: number, d = 0.06) => (Math.abs(v) < d ? 0 : (v - Math.sign(v) * d) / (1 - d));
    const btn = (i: number) => p.buttons[i]?.value ?? 0;
    const pressed = (i: number) => !!p.buttons[i]?.pressed;
    const edge = (i: number, a: Action) => {
      const now = pressed(i);
      if (now && !this.padButtons[i]) this.queue.push(a);
      this.padButtons[i] = now;
    };
    if (p.mapping === 'standard') {
      edge(5, { type: 'gearUp' });
      edge(2, { type: 'gearDown' });
      edge(0, { type: 'ignition' });
      edge(1, { type: 'handbrake' });
      edge(14, { type: 'blinker', side: 'izquierda' });
      edge(15, { type: 'blinker', side: 'derecha' });
      edge(3, { type: 'camera' });
      edge(9, { type: 'pause' });
      // LB es digital en muchos mandos: se suaviza igual que el teclado.
      const lb = btn(4);
      this.padClutch = lb > 0.5 ? Math.min(1, this.padClutch + 0.1) : Math.max(0, this.padClutch - (this.padClutch > CAR.clutchBiteEnd && this.padClutch < CAR.clutchBiteStart + 0.04 ? 0.004 : 0.03));
      return { steer: dz(p.axes[0] ?? 0), throttle: btn(7), brake: btn(6), clutch: Math.max(this.padClutch, lb < 1 && lb > 0 ? lb : 0) };
    }
    // Volantes: los pedales suelen ir de 1 (suelto) a −1 (pisado).
    const pedal = (i: number) => (p.axes[i] === undefined ? 0 : Math.min(1, Math.max(0, (1 - (p.axes[i] ?? 1)) / 2)));
    edge(4, { type: 'gearUp' });
    edge(5, { type: 'gearDown' });
    return { steer: dz(p.axes[0] ?? 0, 0.02), throttle: pedal(1), brake: pedal(2), clutch: pedal(3) };
  }
}
