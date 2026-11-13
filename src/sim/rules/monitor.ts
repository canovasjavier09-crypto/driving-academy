/**
 * Detector de normas para el coche del alumno (puro y testeable).
 *
 * Observa en cada paso la posición, la vía, la señalización y el entorno y
 * emite eventos:
 *  - «aviso»: anticipación (semáforo en rojo delante, STOP, peatón cruzando…)
 *  - «falta»: conducta incorrecta (saltarse un STOP, no ceder el paso…)
 *  - «bien»: refuerzo positivo (detención correcta en un STOP…)
 * El instructor (Fase 5) los convierte en indicaciones. La evaluación con
 * calificación de faltas del examen práctico llega en la Fase 6.
 */
import { CAR } from '../vehicle/specs';
import type { VehicleEvent, VehicleState } from '../vehicle/vehicle';
import { TUNNEL, type Road, type RoadInfo } from '../world/map';
import type { Arm, Control, Crosswalk, LightColor, Signals } from '../world/signals';

export type RuleKind = 'aviso' | 'falta' | 'bien';

export type RuleCode =
  | 'aviso-semaforo' | 'aviso-stop' | 'aviso-ceda' | 'aviso-rotonda' | 'aviso-peaton' | 'aviso-tunel'
  | 'consejo-subir-marcha' | 'consejo-reducir-marcha'
  | 'semaforo-rojo' | 'stop-sin-detenerse' | 'no-ceder-paso' | 'no-ceder-peaton' | 'exceso-velocidad'
  | 'sentido-contrario' | 'giro-sin-intermitente' | 'salida-rotonda-sin-intermitente' | 'sin-cinturon'
  | 'tunel-sin-luces' | 'subir-acera' | 'distancia-seguridad' | 'freno-mano' | 'calado' | 'colision' | 'atropello'
  | 'cambio-carril-sin-intermitente' | 'incorporacion-lenta' | 'no-seguir-indicaciones' | 'no-retrovisor' | 'mala-posicion'
  | 'stop-correcto' | 'ceda-correcto' | 'giro-correcto' | 'semaforo-detenido' | 'peaton-cedido' | 'rotonda-correcta'
  | 'cambio-carril-correcto' | 'incorporacion-correcta' | 'reduccion-marcha' | 'semaforo-respetado';

export interface RuleEvent {
  code: RuleCode;
  kind: RuleKind;
  detail?: string;
  /** Magnitud asociada (km/h de exceso o de impacto…). */
  value?: number;
  limit?: number;
}

export const RULE_KIND: Record<RuleCode, RuleKind> = {
  'aviso-semaforo': 'aviso', 'aviso-stop': 'aviso', 'aviso-ceda': 'aviso', 'aviso-rotonda': 'aviso', 'aviso-peaton': 'aviso', 'aviso-tunel': 'aviso',
  'consejo-subir-marcha': 'aviso', 'consejo-reducir-marcha': 'aviso',
  'semaforo-rojo': 'falta', 'stop-sin-detenerse': 'falta', 'no-ceder-paso': 'falta', 'no-ceder-peaton': 'falta', 'exceso-velocidad': 'falta',
  'sentido-contrario': 'falta', 'giro-sin-intermitente': 'falta', 'salida-rotonda-sin-intermitente': 'falta', 'sin-cinturon': 'falta',
  'tunel-sin-luces': 'falta', 'subir-acera': 'falta', 'distancia-seguridad': 'falta', 'freno-mano': 'falta', calado: 'falta', colision: 'falta', atropello: 'falta',
  'cambio-carril-sin-intermitente': 'falta', 'incorporacion-lenta': 'falta', 'no-seguir-indicaciones': 'falta', 'no-retrovisor': 'falta', 'mala-posicion': 'falta',
  'stop-correcto': 'bien', 'ceda-correcto': 'bien', 'giro-correcto': 'bien', 'semaforo-detenido': 'bien', 'peaton-cedido': 'bien',
  'rotonda-correcta': 'bien', 'cambio-carril-correcto': 'bien', 'incorporacion-correcta': 'bien', 'reduccion-marcha': 'bien', 'semaforo-respetado': 'bien',
};

export interface MonitorCtx {
  t: number;
  dt: number;
  v: VehicleState;
  info: RoadInfo;
  light: (arm: Arm) => LightColor;
  /** ¿Podría entrar ahora quien llega por este brazo? (null = sin tráfico) */
  clearToEnter: ((arm: Arm) => boolean) | null;
  /** Coche que va delante en el mismo carril. */
  leader: { dist: number; v: number } | null;
  crosswalkBusy: (id: string) => boolean;
  /** Eventos del vehículo y del entorno en este paso (calado, colisión…). */
  external?: ExternalEvent[];
  /**
   * Último instante en que el conductor miró un retrovisor (giró la vista).
   * `undefined` = no se evalúa (p. ej., en vista exterior, donde los espejos se ven siempre).
   */
  mirrorGlanceT?: number;
}

/** Segundos antes de una maniobra en los que debe haberse mirado un retrovisor. */
export const MIRROR_WINDOW = 7;

/** Próxima regulación que se encuentra el alumno (para el HUD). */
export interface AheadInfo {
  control: Control;
  dist: number;
  light?: LightColor;
}

export type ExternalEvent = VehicleEvent | 'atropello' | { code: 'colision'; kmh: number };

const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

function polyLength(r: Road): number {
  let l = 0;
  for (let i = 1; i < r.pts.length; i++) l += Math.hypot(r.pts[i]!.x - r.pts[i - 1]!.x, r.pts[i]!.z - r.pts[i - 1]!.z);
  return l;
}

export class RulesMonitor {
  ahead: AheadInfo | null = null;
  /** Brazo de cruce hacia el que se dirige el alumno (con cualquier regulación) y distancia a su línea. */
  approachArm: { arm: Arm; dist: number } | null = null;
  private lengths = new Map<string, number>();
  private crosswalksByRoad = new Map<string, Crosswalk[]>();
  private approach: { arm: Arm; lastDist: number; minV: number; warned: boolean } | null = null;
  private junctionIn: { id: string; kind: 'cruce' | 'rotonda'; heading: number } | null = null;
  private lastBlink = { t: -99, side: '' };
  private cooldown = new Map<string, number>();
  private timers = { over: 0, wrong: 0, close: 0, high: 0, low: 0, center: 0 };
  private crosswalkFault = new Set<string>();
  private inTunnel = false;
  private lane: { road: string; side: 'izquierdo' | 'derecho' } | null = null;
  private prevRoad: string | null = null;
  private prevGear: VehicleState['gear'] = 'N';
  private redStopDone = false;

  constructor(readonly signals: Signals) {
    for (const c of signals.crosswalks) {
      const list = this.crosswalksByRoad.get(c.road.id);
      if (list) list.push(c);
      else this.crosswalksByRoad.set(c.road.id, [c]);
    }
  }

  private len(r: Road) {
    let l = this.lengths.get(r.id);
    if (l === undefined) {
      l = polyLength(r);
      this.lengths.set(r.id, l);
    }
    return l;
  }

  /** Emite un evento salvo que el mismo código (y clave) se haya emitido hace menos de `cool` s. */
  private emit(out: RuleEvent[], t: number, code: RuleCode, detail?: string, cool = 8, key = '', extra: Partial<RuleEvent> = {}) {
    const k = code + key;
    if ((this.cooldown.get(k) ?? -99) > t) return;
    this.cooldown.set(k, t + cool);
    out.push({ code, kind: RULE_KIND[code], detail, ...extra });
  }

  /** Antes de cambiar de carril, girar, incorporarse o salir de la rotonda hay que mirar los retrovisores. */
  private checkMirror(out: RuleEvent[], ctx: MonitorCtx) {
    if (ctx.mirrorGlanceT === undefined) return;
    if (ctx.t - ctx.mirrorGlanceT > MIRROR_WINDOW) this.emit(out, ctx.t, 'no-retrovisor', undefined, 10);
  }

  private blinkedRecently(t: number, side: string, within = 6) {
    return t - this.lastBlink.t < within && this.lastBlink.side === side;
  }

  step(ctx: MonitorCtx): RuleEvent[] {
    const out: RuleEvent[] = [];
    const { v, info, t, dt } = ctx;
    const speed = Math.abs(v.v);
    const kmh = speed * 3.6;

    for (const e of ctx.external ?? []) {
      if (e === 'calado') this.emit(out, t, 'calado', undefined, 3);
      if (e === 'atropello') this.emit(out, t, 'atropello', undefined, 3);
      if (typeof e === 'object' && e.code === 'colision') this.emit(out, t, 'colision', `${Math.round(e.kmh)} km/h`, 3, '', { value: e.kmh });
    }

    // Reducción de marcha en movimiento (para la lección de frenado)
    if (typeof v.gear === 'number' && typeof this.prevGear === 'number' && v.gear < this.prevGear && speed > 1.5) this.emit(out, t, 'reduccion-marcha', `${this.prevGear}.ª → ${v.gear}.ª`, 0);
    this.prevGear = v.gear;

    if (v.blinker === 'izquierda' || v.blinker === 'derecha') this.lastBlink = { t, side: v.blinker };

    // --- Cinturón, freno de mano, acera
    if (speed > 1.5 && !v.belt) this.emit(out, t, 'sin-cinturon', undefined, 30);
    if (speed > 2 && v.handbrake) this.emit(out, t, 'freno-mano', undefined, 8);
    if (info.surface === 'acera' && speed > 0.5) this.emit(out, t, 'subir-acera', undefined, 6);

    // --- Velocidad
    const onRoad = info.surface === 'calzada' || info.surface === 'arcen';
    if (onRoad && kmh > info.limit + 3) this.timers.over += dt;
    else this.timers.over = 0;
    if (this.timers.over > 2) this.emit(out, t, 'exceso-velocidad', `${Math.round(kmh)} km/h donde el límite es ${info.limit}`, 10, '', { value: kmh, limit: info.limit });

    // --- Marchas (consejo)
    if (v.engineOn && v.gear !== 'N' && v.gear !== 'R') {
      this.timers.high = v.rpm > 4200 && v.throttle < 0.6 && v.gear !== 5 ? this.timers.high + dt : 0;
      this.timers.low = v.rpm < 1150 && v.gear !== 1 && v.throttle > 0.5 && v.clutch < 0.2 ? this.timers.low + dt : 0;
      if (this.timers.high > 3) this.emit(out, t, 'consejo-subir-marcha', undefined, 20);
      if (this.timers.low > 1.5) this.emit(out, t, 'consejo-reducir-marcha', undefined, 20);
    }

    // --- Distancia de seguridad (regla de los 2 s; falta por debajo de 1 s)
    if (ctx.leader && speed > 5 && ctx.leader.dist / speed < 1) this.timers.close += dt;
    else this.timers.close = 0;
    if (this.timers.close > 2) this.emit(out, t, 'distancia-seguridad', undefined, 12);

    // --- Túnel
    const inT = v.x > TUNNEL.x0 && v.x < TUNNEL.x1 && Math.abs(v.z - TUNNEL.z) < TUNNEL.halfWidth;
    const nearT = !inT && v.x > TUNNEL.x0 - 70 && v.x < TUNNEL.x1 + 70 && Math.abs(v.z - TUNNEL.z) < TUNNEL.halfWidth && speed > 3;
    const lit = v.lights === 'cortas' || v.lights === 'largas';
    if (nearT && !lit) this.emit(out, t, 'aviso-tunel', undefined, 30);
    if (inT && !this.inTunnel && !lit) this.emit(out, t, 'tunel-sin-luces', undefined, 20);
    this.inTunnel = inT;

    // --- Sentido de la marcha
    const road = info.road;
    let dirSign = 0;
    if (road && onRoad) {
      const c = Math.cos(v.heading - info.heading) * Math.sign(v.v || 1);
      dirSign = c > 0.3 ? 1 : c < -0.3 ? -1 : 0;
      let wrong = false;
      if (dirSign !== 0 && speed > 2) {
        if (road.oneWay) wrong = dirSign === -1;
        else wrong = Math.abs(info.lateral) > (road.median ? road.median / 2 : 0.8) && Math.sign(info.lateral) === -dirSign;
      }
      this.timers.wrong = wrong ? this.timers.wrong + dt : 0;
    } else if (info.junction?.kind === 'rotonda' && info.surface === 'calzada' && speed > 2) {
      this.timers.wrong = Math.cos(v.heading - info.heading) * Math.sign(v.v || 1) < -0.3 ? this.timers.wrong + dt : 0;
    } else this.timers.wrong = 0;
    if (this.timers.wrong > 1.2) this.emit(out, t, 'sentido-contrario', undefined, 8);

    // --- Posición en la vía: en doble sentido, circular pisando el eje (sin llegar a invadir el contrario)
    const straddle = !!road && onRoad && !road.oneWay && !road.median && road.kind === 'calle' && !info.junction && dirSign !== 0 && speed > 4 &&
      Math.sign(info.lateral) === dirSign && Math.abs(info.lateral) < 0.55;
    this.timers.center = straddle ? this.timers.center + dt : 0;
    if (this.timers.center > 2.5) this.emit(out, t, 'mala-posicion', 'pisando el eje de la calzada', 12);

    // --- Cambios de carril (vías con dos carriles en el mismo sentido) e incorporación a la autovía
    if (road && onRoad && dirSign !== 0 && speed > 3 && (road.oneWay && road.kind === 'calle' || road.kind === 'autovia')) {
      let side: 'izquierdo' | 'derecho';
      if (road.kind === 'autovia') side = Math.abs(info.lateral) < (road.median ?? 0) / 2 + 3.75 ? 'izquierdo' : 'derecho';
      else side = info.lateral > 0 ? 'derecho' : 'izquierdo';
      const id = road.id + (road.kind === 'autovia' ? (Math.sign(info.lateral) > 0 ? '+' : '-') : '');
      if (this.lane && this.lane.road === id && this.lane.side !== side) {
        const blink = side === 'izquierdo' ? 'izquierda' : 'derecha';
        if (this.blinkedRecently(t, blink)) this.emit(out, t, 'cambio-carril-correcto', blink, 0);
        else this.emit(out, t, 'cambio-carril-sin-intermitente', blink, 4);
        this.checkMirror(out, ctx);
      }
      this.lane = { road: id, side };
    } else if (!road || road.kind !== 'autovia') this.lane = null;
    if (road && this.prevRoad === 'ramal-entrada' && road.kind === 'autovia') {
      this.checkMirror(out, ctx);
      if (kmh >= 70 && this.blinkedRecently(t, 'izquierda', 10)) this.emit(out, t, 'incorporacion-correcta', `${Math.round(kmh)} km/h`, 0);
      else if (kmh < 70) this.emit(out, t, 'incorporacion-lenta', `${Math.round(kmh)} km/h`, 5, '', { value: kmh });
      else this.emit(out, t, 'cambio-carril-sin-intermitente', 'izquierda', 4);
    }
    if (road) this.prevRoad = road.id;

    // --- Aproximación a cruces: semáforos, STOP, ceda, rotonda
    this.ahead = null;
    let arm: Arm | undefined;
    let dist = Infinity;
    if (road && onRoad && dirSign !== 0 && !road.closed) {
      arm = this.signals.armAt(road.id, dirSign === -1);
      if (arm) dist = (dirSign === 1 ? this.len(road) - info.s : info.s) - arm.lineDist;
      // Solo cuenta si va por su carril (en doble sentido, a la derecha)
      if (arm && !road.oneWay && Math.sign(info.lateral) !== dirSign) arm = undefined;
    }
    this.approachArm = arm ? { arm, dist } : null;
    const ap = this.approach;
    if (ap && (!arm || arm !== ap.arm)) {
      // Ha dejado de acercarse por esa vía: ¿ha cruzado la línea (entrando en el cruce)?
      const crossed = ap.lastDist < 9 && (info.junction?.id === ap.arm.junction.id || (arm === undefined && ap.lastDist < 2));
      if (crossed) this.crossLine(out, ctx, ap);
      this.approach = null;
    }
    if (arm && arm.control !== 'prioridad') {
      if (!this.approach) {
        this.approach = { arm, lastDist: dist, minV: Infinity, warned: false };
        this.redStopDone = false;
      }
      const a = this.approach;
      const light = arm.control === 'semaforo' ? ctx.light(arm) : undefined;
      if (dist < 120) this.ahead = { control: arm.control, dist: Math.max(0, dist), light };
      if (dist < 12 && dist > -1.5) a.minV = Math.min(a.minV, speed);
      if (arm.control === 'semaforo' && light === 'rojo' && dist < 10 && dist > -0.5 && speed < 0.3 && !this.redStopDone) {
        this.redStopDone = true;
        this.emit(out, t, 'semaforo-detenido', undefined, 0);
      }
      if (!a.warned && dist < 45 && dist > 8 && speed > 3) {
        if (arm.control === 'semaforo' && light !== 'verde') {
          this.emit(out, t, 'aviso-semaforo', light, 6, arm.id);
          a.warned = true;
        } else if (arm.control === 'stop' && dist < 40) {
          this.emit(out, t, 'aviso-stop', undefined, 6, arm.id);
          a.warned = true;
        } else if ((arm.control === 'ceda' || arm.control === 'rotonda') && dist < 30) {
          this.emit(out, t, arm.control === 'rotonda' ? 'aviso-rotonda' : 'aviso-ceda', undefined, 6, arm.id);
          a.warned = true;
        }
      }
      if (a.lastDist > 0 && dist <= 0) {
        this.crossLine(out, ctx, a);
        a.lastDist = -999; // ya evaluado
      } else if (a.lastDist !== -999) a.lastDist = dist;
    }

    // --- Pasos de peatones de la vía actual
    if (road && speed > 0.2) {
      const fx = Math.sin(v.heading) * Math.sign(v.v || 1);
      const fz = Math.cos(v.heading) * Math.sign(v.v || 1);
      for (const cw of this.crosswalksByRoad.get(road.id) ?? []) {
        const dx = cw.center.x - v.x, dz = cw.center.z - v.z;
        const along = dx * fx + dz * fz;
        const lat = Math.abs(-dx * fz + dz * fx);
        if (lat > cw.halfWidth + 1.5) continue;
        const busy = ctx.crosswalkBusy(cw.id);
        if (busy && along > 4 && along < 30 && kmh > 8) this.emit(out, t, 'aviso-peaton', undefined, 8, cw.id);
        if (busy && along > 2 && along < 16 && speed < 1) this.emit(out, t, 'peaton-cedido', undefined, 20, cw.id);
        const onIt = Math.abs((v.x - cw.center.x) * cw.along.x + (v.z - cw.center.z) * cw.along.z) < 2 + CAR.length / 2;
        if (busy && onIt && speed > 1 && !this.crosswalkFault.has(cw.id)) {
          this.crosswalkFault.add(cw.id);
          this.emit(out, t, 'no-ceder-peaton', undefined, 5, cw.id);
        }
        if (!onIt) this.crosswalkFault.delete(cw.id);
      }
    }

    // --- Giros y salida de la rotonda
    const j = info.junction;
    if (j && !this.junctionIn) this.junctionIn = { id: j.id, kind: j.kind, heading: v.heading };
    if (this.junctionIn && (!j || j.id !== this.junctionIn.id)) {
      const jin = this.junctionIn;
      this.junctionIn = j ? { id: j.id, kind: j.kind, heading: v.heading } : null;
      if (speed > 0.5) {
        if (jin.kind === 'rotonda') {
          if (!this.blinkedRecently(t, 'derecha', 5)) this.emit(out, t, 'salida-rotonda-sin-intermitente', undefined, 10);
          else this.emit(out, t, 'rotonda-correcta', undefined, 0);
          this.checkMirror(out, ctx);
        } else {
          const d = wrap(v.heading - jin.heading);
          if (Math.abs(d) > 0.9) {
            const side = d > 0 ? 'izquierda' : 'derecha';
            if (!this.blinkedRecently(t, side)) this.emit(out, t, 'giro-sin-intermitente', side, 6);
            else this.emit(out, t, 'giro-correcto', side, 0);
            this.checkMirror(out, ctx);
          }
        }
      }
    }
    return out;
  }

  private crossLine(out: RuleEvent[], ctx: MonitorCtx, a: { arm: Arm; minV: number }) {
    const { t } = ctx;
    switch (a.arm.control) {
      case 'semaforo':
        if (ctx.light(a.arm) === 'rojo') this.emit(out, t, 'semaforo-rojo', undefined, 5, a.arm.id);
        else this.emit(out, t, 'semaforo-respetado', undefined, 0);
        break;
      case 'stop':
        if (a.minV > 0.3) this.emit(out, t, 'stop-sin-detenerse', undefined, 5, a.arm.id);
        else this.emit(out, t, 'stop-correcto', undefined, 30);
        break;
      case 'ceda':
      case 'rotonda':
        if (ctx.clearToEnter && !ctx.clearToEnter(a.arm)) this.emit(out, t, 'no-ceder-paso', undefined, 5, a.arm.id);
        else if (a.minV < 3) this.emit(out, t, 'ceda-correcto', undefined, 45);
        break;
      default:
        break;
    }
  }
}
