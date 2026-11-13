/**
 * Instructor virtual: convierte los eventos del detector de normas en
 * indicaciones breves, con un ritmo que no agobie (una a la vez y sin
 * repetir la misma en poco tiempo), y opcionalmente las lee en voz alta
 * con la síntesis de voz del navegador (sin servicios externos).
 */
import type { RuleCode, RuleEvent } from '../rules/monitor';

export interface InstructorLine {
  text: string;
  tone: 'info' | 'warn' | 'bad' | 'good';
}

const LINES: Record<RuleCode, (d?: string) => InstructorLine> = {
  'aviso-semaforo': (d) => ({ text: d === 'ambar' ? 'Semáforo en ámbar: si puedes detenerte con seguridad, hazlo.' : 'Semáforo en rojo delante. Reduce y detente antes de la línea.', tone: 'warn' }),
  'aviso-stop': () => ({ text: 'STOP delante: detén el coche por completo antes de la línea y mira a ambos lados.', tone: 'warn' }),
  'aviso-ceda': () => ({ text: 'Ceda el paso: reduce y deja pasar a quien circula por la vía preferente.', tone: 'warn' }),
  'aviso-rotonda': () => ({ text: 'Rotonda: cede el paso a quien ya circula por ella y entra por la derecha.', tone: 'warn' }),
  'aviso-peaton': () => ({ text: 'Hay un peatón cruzando: frena y cédele el paso.', tone: 'warn' }),
  'aviso-tunel': () => ({ text: 'Túnel a la vista: enciende las luces de cruce (L).', tone: 'warn' }),
  'consejo-subir-marcha': () => ({ text: 'El motor va muy revolucionado: sube de marcha.', tone: 'info' }),
  'consejo-reducir-marcha': () => ({ text: 'El motor va forzado: reduce una marcha.', tone: 'info' }),
  'semaforo-rojo': () => ({ text: 'Te has saltado un semáforo en rojo. Es una falta muy grave.', tone: 'bad' }),
  'stop-sin-detenerse': () => ({ text: 'En un STOP hay que detenerse por completo, aunque no venga nadie.', tone: 'bad' }),
  'no-ceder-paso': () => ({ text: 'No has cedido el paso. Espera a que la vía esté libre antes de entrar.', tone: 'bad' }),
  'no-ceder-peaton': () => ({ text: 'Has pasado con un peatón en el paso de cebra. Debes detenerte y cederle el paso.', tone: 'bad' }),
  'exceso-velocidad': (d) => ({ text: `Vas demasiado rápido: ${d ?? 'por encima del límite'}.`, tone: 'bad' }),
  'sentido-contrario': () => ({ text: '¡Circulas en sentido contrario! Vuelve a tu carril.', tone: 'bad' }),
  'giro-sin-intermitente': (d) => ({ text: `Has girado a la ${d ?? 'otra calle'} sin poner el intermitente (${d === 'derecha' ? 'X' : 'Z'}).`, tone: 'bad' }),
  'salida-rotonda-sin-intermitente': () => ({ text: 'Para salir de la rotonda, señaliza con el intermitente derecho.', tone: 'bad' }),
  'sin-cinturon': () => ({ text: 'Ponte el cinturón (B) antes de circular.', tone: 'bad' }),
  'tunel-sin-luces': () => ({ text: 'En los túneles es obligatorio llevar encendidas las luces de cruce.', tone: 'bad' }),
  'subir-acera': () => ({ text: 'Te has subido a la acera. Controla la trayectoria.', tone: 'bad' }),
  'distancia-seguridad': () => ({ text: 'Vas demasiado pegado al de delante: deja al menos dos segundos.', tone: 'bad' }),
  'freno-mano': () => ({ text: 'Llevas el freno de mano puesto. Quítalo con Espacio.', tone: 'warn' }),
  calado: () => ({ text: 'Se ha calado. Embrague a fondo, punto muerto y vuelve a arrancar con calma.', tone: 'info' }),
  colision: () => ({ text: 'Has chocado. Detén el coche y revisa la maniobra.', tone: 'bad' }),
  atropello: () => ({ text: '¡Has atropellado a un peatón! Es una falta eliminatoria.', tone: 'bad' }),
  'cambio-carril-sin-intermitente': () => ({ text: 'Antes de cambiar de carril: retrovisor, intermitente y después la maniobra.', tone: 'bad' }),
  'incorporacion-lenta': (d) => ({ text: `Te has incorporado demasiado despacio (${d ?? ''}). Usa el carril de aceleración para alcanzar la velocidad de la vía.`, tone: 'bad' }),
  'no-seguir-indicaciones': () => ({ text: 'No has seguido la indicación. No pasa nada: continúa y atiende a la siguiente.', tone: 'warn' }),
  'no-retrovisor': () => ({ text: 'Antes de maniobrar, mira el retrovisor: mueve la vista hacia el espejo unos segundos antes.', tone: 'warn' }),
  'mala-posicion': () => ({ text: 'Vas pisando el eje: céntrate en tu carril.', tone: 'warn' }),
  'giro-correcto': () => ({ text: 'Bien señalizado el giro.', tone: 'good' }),
  'semaforo-detenido': () => ({ text: 'Bien, detenido antes de la línea con el semáforo en rojo.', tone: 'good' }),
  'peaton-cedido': () => ({ text: 'Bien, has cedido el paso al peatón.', tone: 'good' }),
  'rotonda-correcta': () => ({ text: 'Bien: salida de la rotonda señalizada.', tone: 'good' }),
  'cambio-carril-correcto': () => ({ text: 'Cambio de carril correcto.', tone: 'good' }),
  'incorporacion-correcta': () => ({ text: 'Buena incorporación a la autovía.', tone: 'good' }),
  'reduccion-marcha': () => ({ text: 'Bien reducida la marcha.', tone: 'good' }),
  'semaforo-respetado': () => ({ text: 'Semáforo respetado.', tone: 'good' }),
  'stop-correcto': () => ({ text: 'Bien: detención completa en el STOP.', tone: 'good' }),
  'ceda-correcto': () => ({ text: 'Bien cedido el paso.', tone: 'good' }),
};

export function lineFor(e: RuleEvent): InstructorLine {
  return LINES[e.code](e.detail);
}

/** Prioridad: primero lo grave, luego avisos, luego consejos y refuerzos. */
const RANK = { bad: 0, warn: 1, info: 2, good: 3 } as const;

export class Instructor {
  enabled = true;
  private lastSpoken = new Map<string, number>();
  private busyUntil = 0;
  private voice: SpeechSynthesisVoice | null = null;

  constructor(private speak: boolean) {
    if (speak && typeof speechSynthesis !== 'undefined') {
      const pick = () => {
        const vs = speechSynthesis.getVoices();
        this.voice = vs.find((v) => v.lang === 'es-ES') ?? vs.find((v) => v.lang.startsWith('es')) ?? null;
      };
      pick();
      speechSynthesis.addEventListener?.('voiceschanged', pick);
    }
  }

  /** Elige qué decir de los eventos de este paso. Devuelve null si toca callar. */
  handle(events: RuleEvent[], t: number): InstructorLine | null {
    if (!this.enabled || !events.length) return null;
    const lines = events.map((e) => ({ e, line: lineFor(e) })).sort((a, b) => RANK[a.line.tone] - RANK[b.line.tone]);
    for (const { e, line } of lines) {
      const last = this.lastSpoken.get(e.code) ?? -99;
      const urgent = line.tone === 'bad';
      if (t - last < (urgent ? 6 : line.tone === 'good' ? 40 : 15)) continue;
      // Un mensaje no urgente no interrumpe a otro reciente.
      if (!urgent && t < this.busyUntil) continue;
      this.lastSpoken.set(e.code, t);
      this.busyUntil = t + 3;
      this.say(line.text, urgent);
      return line;
    }
    return null;
  }

  private say(text: string, urgent: boolean) {
    if (!this.speak || typeof speechSynthesis === 'undefined') return;
    try {
      if (urgent) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES';
      if (this.voice) u.voice = this.voice;
      u.rate = 1.05;
      speechSynthesis.speak(u);
    } catch {
      /* sin síntesis de voz */
    }
  }

  static readonly GREETING = 'Hola, soy tu instructor. Ponte el cinturón, comprueba el punto muerto y arranca cuando quieras.';

  /** Saludo hablado. Debe llamarse desde un toque/clic: iOS solo deja hablar tras un gesto del usuario. */
  greet() {
    this.say(Instructor.GREETING, false);
  }

  /** Lee un texto tal cual (examinador). */
  speakRaw(text: string) {
    this.say(text, false);
  }

  dispose() {
    if (this.speak && typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  }
}
