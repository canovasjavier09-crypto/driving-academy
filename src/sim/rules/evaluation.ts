/**
 * Calificación de faltas al estilo del examen práctico de la DGT.
 *
 * Criterio orientativo (sistema de calificación de la DGT para el permiso B):
 *  - NO APTO con 1 falta eliminatoria, 2 deficientes, 1 deficiente + 5 leves o 10 leves.
 * La asignación de cada conducta a una categoría es una aproximación didáctica
 * de esta aplicación; la decisión real corresponde al examinador.
 */
import type { RuleCode, RuleEvent } from './monitor';

export type Severity = 'eliminatoria' | 'deficiente' | 'leve';

interface FaultDef {
  label: string;
  sev: Severity;
}

export const FAULTS: Partial<Record<RuleCode, FaultDef>> = {
  'semaforo-rojo': { label: 'Saltarse un semáforo en rojo', sev: 'eliminatoria' },
  'stop-sin-detenerse': { label: 'No detenerse en un STOP', sev: 'eliminatoria' },
  'no-ceder-paso': { label: 'No ceder el paso', sev: 'eliminatoria' },
  'no-ceder-peaton': { label: 'No ceder el paso a un peatón', sev: 'eliminatoria' },
  atropello: { label: 'Atropello', sev: 'eliminatoria' },
  'sentido-contrario': { label: 'Circular en sentido contrario', sev: 'eliminatoria' },
  colision: { label: 'Colisión', sev: 'deficiente' },
  'exceso-velocidad': { label: 'Exceso de velocidad', sev: 'deficiente' },
  'giro-sin-intermitente': { label: 'Girar sin señalizar', sev: 'deficiente' },
  'salida-rotonda-sin-intermitente': { label: 'Salir de la rotonda sin señalizar', sev: 'deficiente' },
  'cambio-carril-sin-intermitente': { label: 'Cambiar de carril sin señalizar', sev: 'deficiente' },
  'sin-cinturon': { label: 'Circular sin cinturón', sev: 'deficiente' },
  'tunel-sin-luces': { label: 'Túnel sin luces', sev: 'deficiente' },
  'subir-acera': { label: 'Subirse a la acera', sev: 'deficiente' },
  'distancia-seguridad': { label: 'No guardar la distancia de seguridad', sev: 'deficiente' },
  'incorporacion-lenta': { label: 'Incorporación lenta a la autovía', sev: 'deficiente' },
  'freno-mano': { label: 'Circular con el freno de mano', sev: 'leve' },
  calado: { label: 'Calar el motor', sev: 'leve' },
  'consejo-subir-marcha': { label: 'Uso inadecuado de las marchas', sev: 'leve' },
  'consejo-reducir-marcha': { label: 'Uso inadecuado de las marchas', sev: 'leve' },
  'no-seguir-indicaciones': { label: 'No seguir las indicaciones del examinador', sev: 'leve' },
  'no-retrovisor': { label: 'No mirar por los retrovisores antes de maniobrar', sev: 'leve' },
  'mala-posicion': { label: 'Posición incorrecta en la calzada', sev: 'leve' },
};

/** Qué se hizo mal y cómo corregirlo (para el resultado del examen). */
export const ADVICE: Partial<Record<RuleCode, string>> = {
  'semaforo-rojo': 'Con el semáforo en rojo (o en ámbar si puedes parar con seguridad) hay que detenerse antes de la línea. Anticipa: si lleva tiempo en verde, prepárate para frenar.',
  'stop-sin-detenerse': 'En un STOP hay que parar por completo (velocidad cero) en la línea, aunque no venga nadie, y luego mirar y salir.',
  'no-ceder-paso': 'Si debes ceder el paso, reduce y entra solo cuando quien tiene prioridad no tenga que frenar ni cambiar de trayectoria por ti.',
  'no-ceder-peaton': 'Al acercarte a un paso de peatones, reduce y detente si alguien está cruzando o va a cruzar. Al girar, el peatón que cruza la vía tiene prioridad.',
  atropello: 'Velocidad adaptada y vista lejos: en zonas con peatones, circula preparado para detenerte.',
  'sentido-contrario': 'Circula siempre por tu carril. Antes de entrar en una calle, comprueba la señal de dirección prohibida o de sentido obligatorio.',
  colision: 'Mantén la distancia, controla la trayectoria en las curvas y reduce antes de los obstáculos.',
  'exceso-velocidad': 'Respeta el límite de cada tramo (fíjate en las señales al entrar en zona escolar, montaña o ciudad) y adapta además la velocidad a la vía y al tiempo.',
  'giro-sin-intermitente': 'Señaliza con antelación (unos 3 s antes) cualquier giro, aunque no veas a nadie.',
  'salida-rotonda-sin-intermitente': 'Antes de salir de la rotonda, pon el intermitente derecho al pasar la salida anterior a la tuya.',
  'cambio-carril-sin-intermitente': 'Para cambiar de carril: retrovisor, intermitente con antelación y, después, la maniobra suave.',
  'sin-cinturon': 'Abróchate el cinturón antes de iniciar la marcha.',
  'tunel-sin-luces': 'Enciende las luces de cruce antes de entrar en un túnel, también de día.',
  'subir-acera': 'Gira más tarde y con menos ángulo; en curvas cerradas, reduce antes.',
  'distancia-seguridad': 'Deja al menos 2 segundos con el vehículo de delante (más con lluvia o niebla).',
  'incorporacion-lenta': 'En el carril de aceleración, alcanza una velocidad parecida a la de la autovía antes de incorporarte, mirando y señalizando a la izquierda.',
  'freno-mano': 'Quita el freno de mano al iniciar la marcha; si el testigo sigue encendido, no avances.',
  calado: 'Suelta el embrague despacio en el punto de fricción y acompaña con algo de acelerador.',
  'consejo-subir-marcha': 'Sube de marcha hacia 2.000–2.500 rpm: el motor va forzado y gasta más.',
  'consejo-reducir-marcha': 'Reduce de marcha cuando el motor va por debajo de unas 1.200 rpm o al subir una pendiente.',
  'no-seguir-indicaciones': 'Escucha la indicación completa, colócate con antelación en el carril adecuado y, si no puedes seguirla con seguridad, continúa y espera la siguiente.',
  'no-retrovisor': 'Antes de girar, cambiar de carril, incorporarte o salir de la rotonda, mira el retrovisor (mueve la vista hacia el espejo) unos segundos antes de la maniobra.',
  'mala-posicion': 'En doble sentido, circula centrado en tu carril, sin pisar la línea del eje.',
};

export interface Fault {
  code: RuleCode;
  label: string;
  sev: Severity;
  t: number;
  detail?: string;
  /** Zona del mapa donde se cometió (examen con zonas). */
  zone?: string;
}

/** Ajusta la gravedad según la magnitud (velocidad, impacto). */
export function severityOf(e: RuleEvent): Severity | null {
  const def = FAULTS[e.code];
  if (!def) return null;
  if (e.code === 'exceso-velocidad' && e.value !== undefined && e.limit !== undefined && e.value > e.limit * 1.5) return 'eliminatoria';
  if (e.code === 'colision' && e.value !== undefined) return e.value >= 10 ? 'eliminatoria' : 'deficiente';
  return def.sev;
}

export interface Verdict {
  passed: boolean;
  eliminatory: number;
  deficient: number;
  minor: number;
  reason: string;
}

export function verdict(eliminatory: number, deficient: number, minor: number): Verdict {
  let reason = 'Sin faltas que impidan el APTO.';
  let passed = true;
  if (eliminatory >= 1) {
    passed = false;
    reason = 'Una falta eliminatoria.';
  } else if (deficient >= 2) {
    passed = false;
    reason = 'Dos faltas deficientes.';
  } else if (deficient === 1 && minor >= 5) {
    passed = false;
    reason = 'Una falta deficiente y cinco leves.';
  } else if (minor >= 10) {
    passed = false;
    reason = 'Diez faltas leves.';
  }
  return { passed, eliminatory, deficient, minor, reason };
}

export class Evaluator {
  readonly faults: Fault[] = [];
  /** Conductas positivas registradas (para las lecciones). */
  readonly good = new Map<RuleCode, number>();
  /** Zona actual: se apunta en cada falta (registro del examen). */
  zone?: string;

  /** Registra los eventos de un paso. `minorTips` cuenta los consejos de marchas como leves (examen). */
  add(events: RuleEvent[], t: number, minorTips = true) {
    for (const e of events) {
      if (e.kind === 'bien') {
        this.good.set(e.code, (this.good.get(e.code) ?? 0) + 1);
        continue;
      }
      const sev = severityOf(e);
      if (!sev) continue;
      if (!minorTips && (e.code === 'consejo-subir-marcha' || e.code === 'consejo-reducir-marcha')) continue;
      this.faults.push({ code: e.code, label: FAULTS[e.code]!.label, sev, t, detail: e.detail, ...(this.zone ? { zone: this.zone } : {}) });
    }
  }

  count(sev: Severity) {
    return this.faults.filter((f) => f.sev === sev).length;
  }

  verdict(): Verdict {
    return verdict(this.count('eliminatoria'), this.count('deficiente'), this.count('leve'));
  }

  /** Nota 0–100 para las lecciones. */
  score(): number {
    return Math.max(0, Math.round(100 - 40 * this.count('eliminatoria') - 15 * this.count('deficiente') - 4 * this.count('leve')));
  }

  /** Recuento por etiqueta (para las estadísticas del perfil). */
  byLabel(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const f of this.faults) out[f.label] = (out[f.label] ?? 0) + 1;
    return out;
  }
}
