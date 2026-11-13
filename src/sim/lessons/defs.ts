/**
 * Las lecciones prácticas del temario (niveles 1 a 5). El nivel 6 es el
 * simulacro de examen (`exam.ts`). Cada lección define dónde se empieza,
 * en qué estado está el coche y qué objetivos hay que cumplir.
 */
import { CAR } from '../vehicle/specs';
import type { VehicleState } from '../vehicle/vehicle';
import { heightAt, MANEUVER_SPOTS, type Pose, type Spot } from '../world/map';
import { pointAt, type LanePath } from '../traffic/lanes';
import type { LessonCtx, LessonDef, SetupEnv } from './session';

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const has = (c: LessonCtx, key: string, n = 1) => (c.good.get(key) ?? 0) >= n;
const kmh = (c: LessonCtx) => Math.abs(c.v.v) * 3.6;

/** Coche situado `dist` metros antes de la línea de detención de un carril que cumpla `pred`. */
function beforeLine(pred: (l: LanePath) => boolean, dist: number) {
  return (env: SetupEnv): Pose => {
    for (const l of env.graph.lanes.values()) {
      if (l.kind !== 'calle' || l.lineS === undefined || l.lineS < dist + 10 || !pred(l)) continue;
      const a = l.pts[0]!;
      const b = l.pts[l.pts.length - 1]!;
      if (heightAt(a.x, a.z) > 0.2 || heightAt(b.x, b.z) > 0.2) continue; // en llano
      const p = pointAt(l, l.lineS - dist);
      return { x: p.x, z: p.z, heading: p.heading };
    }
    throw new Error('No hay carril adecuado para la lección');
  };
}

/** Punto de un carril de autovía más cercano a un objetivo. */
function onLane(laneId: string, tx: number, tz: number) {
  return (env: SetupEnv): Pose => {
    const l = env.graph.get(laneId);
    let best = 0;
    l.pts.forEach((p, i) => {
      const q = l.pts[best]!;
      if (Math.hypot(p.x - tx, p.z - tz) < Math.hypot(q.x - tx, q.z - tz)) best = i;
    });
    const p = pointAt(l, l.cum[best]!);
    return { x: p.x, z: p.z, heading: p.heading };
  };
}

const spawn = (id: string) => (env: SetupEnv): Pose => {
  const s = env.map.spawns.find((x) => x.id === id)!;
  return { x: s.x, z: s.z, heading: s.heading };
};
const fixed = (p: Pose) => () => p;

/** Esquinas del coche (largo × ancho) en el plano. */
export function carCorners(v: Pick<VehicleState, 'x' | 'z' | 'heading'>) {
  const f = { x: Math.sin(v.heading), z: Math.cos(v.heading) };
  const r = { x: -f.z, z: f.x };
  const hl = CAR.length / 2, hw = CAR.width / 2;
  return [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(([a, b]) => ({ x: v.x + f.x * hl * a! + r.x * hw * b!, z: v.z + f.z * hl * a! + r.z * hw * b! }));
}

/** ¿El coche está completamente dentro de la plaza (con una tolerancia)? */
export function insideSpot(v: Pick<VehicleState, 'x' | 'z' | 'heading'>, spot: Spot, tol = 0.2): boolean {
  const d = { x: Math.sin(spot.heading), z: Math.cos(spot.heading) };
  const r = { x: -d.z, z: d.x };
  return carCorners(v).every((p) => {
    const dx = p.x - spot.x, dz = p.z - spot.z;
    return Math.abs(dx * d.x + dz * d.z) <= spot.length / 2 + tol && Math.abs(dx * r.x + dz * r.z) <= spot.width / 2 + tol;
  });
}

const aligned = (v: VehicleState, heading: number, tol = 0.2) => Math.abs(wrap(v.heading - heading)) < tol;
/** Nuevos roces desde el inicio del objetivo. */
const touched = (c: LessonCtx) => {
  if (c.st.contacts0 === undefined) c.st.contacts0 = c.contacts;
  return c.contacts > (c.st.contacts0 as number);
};
const reversed = (c: LessonCtx) => {
  if (c.v.v < -0.3) c.st.rev = true;
  return !!c.st.rev;
};

const READY = { engineOn: true, belt: true, handbrake: true, gear: 'N' as const };

// ---------------------------------------------------------------------------
// Lecciones
// ---------------------------------------------------------------------------
export const LESSONS: LessonDef[] = [
  // ---- Nivel 1
  {
    id: 'l1-mandos',
    title: 'Conoce los mandos',
    briefing: [
      'Antes de mover el coche hay que conocer los mandos y prepararse.',
      'Teclado: B cinturón · C embrague · I llave · 1 primera · Z intermitente izquierdo · L luces · Espacio freno de mano.',
      'En iPad usa los botones de la pantalla y el pedal deslizante de embrague.',
    ],
    setup: { pose: spawn('centro'), traffic: false, engineOn: false, belt: false, handbrake: true, gear: 'N' },
    objectives: [
      { text: 'Abrochar el cinturón', done: (c) => c.v.belt },
      { text: 'Pisar el embrague a fondo', done: (c) => c.v.clutch > 0.9 },
      { text: 'Arrancar el motor', done: (c) => c.v.engineOn },
      { text: 'Meter la primera', done: (c) => c.v.gear === 1 },
      { text: 'Señalizar a la izquierda (salida)', done: (c) => c.v.blinker === 'izquierda' },
      { text: 'Encender las luces de cruce', done: (c) => c.v.lights === 'cortas' },
      { text: 'Quitar el freno de mano', done: (c) => !c.v.handbrake },
    ],
  },
  {
    id: 'l1-arranque',
    title: 'Arrancar sin calar',
    briefing: [
      'Embrague a fondo, primera, un poco de gas y suelta el embrague despacio hasta notar que el coche empuja (punto de fricción).',
      'Quita el freno de mano y sigue soltando el embrague suavemente. Recorre 30 m y detente pisando el embrague.',
    ],
    setup: { pose: spawn('centro'), traffic: false, ...READY },
    objectives: [
      { text: 'Recorrer 30 m', done: (c) => c.distM >= 30 },
      { text: 'Detenerte sin calar el motor', done: (c) => c.stillT > 1 && c.v.engineOn, sequential: true },
      { text: 'Sin calar ni una vez', avoid: ['calado'] },
    ],
    timeLimit: 300,
  },
  {
    id: 'l1-segunda',
    title: 'Primera y segunda',
    briefing: ['Sal en primera y, cuando el coche vaya a unos 15 km/h, embrague, segunda y suelta. Recorre 150 m y detente correctamente.'],
    setup: { pose: spawn('centro'), traffic: false, ...READY },
    objectives: [
      { text: 'Circular en segunda a más de 15 km/h', done: (c) => c.v.gear === 2 && kmh(c) > 15 },
      { text: 'Recorrer 150 m', done: (c) => c.distM >= 150 },
      { text: 'Detener el vehículo sin calar', done: (c) => c.stillT > 1 && c.v.engineOn, sequential: true },
    ],
    timeLimit: 360,
  },
  // ---- Nivel 2
  {
    id: 'l2-recta',
    title: 'Línea recta y marchas',
    briefing: ['Calle de sentido único con dos carriles (50 km/h). Sube hasta tercera y mantén el coche en tu carril durante 300 m.'],
    setup: { pose: (env) => env.map.roadPose('v1-0', 8, 0), traffic: true, ...READY },
    objectives: [
      { text: 'Circular en tercera', done: (c) => c.v.gear === 3 && kmh(c) > 22 },
      { text: 'Recorrer 300 m', done: (c) => c.distM >= 300 },
      { text: 'Sin invadir la acera ni el sentido contrario', avoid: ['subir-acera', 'sentido-contrario'] },
      { text: 'Respetar el límite de velocidad', avoid: ['exceso-velocidad'] },
    ],
    timeLimit: 420,
  },
  {
    id: 'l2-giros',
    title: 'Giros a derecha e izquierda',
    briefing: ['Gira una vez a la derecha y otra a la izquierda en un cruce. Antes de cada giro: retrovisor, intermitente, reduce la velocidad y gira.'],
    setup: { pose: spawn('centro'), traffic: true, ...READY },
    objectives: [
      { text: 'Girar a la derecha señalizando', done: (c) => has(c, 'giro-correcto:derecha') },
      { text: 'Girar a la izquierda señalizando', done: (c) => has(c, 'giro-correcto:izquierda') },
      { text: 'No girar sin intermitente', avoid: ['giro-sin-intermitente'] },
    ],
    timeLimit: 600,
  },
  {
    id: 'l2-frenado',
    title: 'Frenado progresivo',
    briefing: ['Hay un STOP delante. Sube a segunda o tercera, reduce de marcha al acercarte y detén el coche por completo justo antes de la línea.'],
    setup: { pose: beforeLine((l) => l.control === 'stop', 95), traffic: false, ...READY },
    objectives: [
      { text: 'Reducir de marcha en movimiento', done: (c) => has(c, 'reduccion-marcha') },
      { text: 'Detenerte en la línea del STOP', done: (c) => has(c, 'stop-correcto') },
      { text: 'Sin pasarte la línea', avoid: ['stop-sin-detenerse'] },
    ],
    timeLimit: 300,
  },
  // ---- Nivel 3
  {
    id: 'l3-semaforos',
    title: 'Semáforos y cruces',
    briefing: ['Atraviesa dos cruces con semáforo. Si está en rojo, detente antes de la línea; en ámbar, solo pasa si no puedes parar con seguridad.'],
    setup: { pose: beforeLine((l) => l.control === 'semaforo', 95), traffic: true, ...READY },
    objectives: [
      { text: 'Pasar dos semáforos correctamente', done: (c) => has(c, 'semaforo-respetado', 2) },
      { text: 'Detenerte ante un semáforo en rojo', done: (c) => has(c, 'semaforo-detenido') || has(c, 'semaforo-respetado', 3) },
      { text: 'No saltarte ningún rojo', avoid: ['semaforo-rojo'] },
    ],
    timeLimit: 600,
  },
  {
    id: 'l3-prioridad',
    title: 'Prioridades y STOP',
    briefing: ['En un STOP: detención total antes de la línea y mira. En un ceda el paso: reduce y deja pasar a quien venga por la vía principal.', 'Busca un STOP y un ceda el paso (el recuadro de la izquierda te avisa de la próxima señal).'],
    setup: { pose: beforeLine((l) => l.control === 'stop', 90), traffic: true, ...READY },
    objectives: [
      { text: 'Detención completa en un STOP', done: (c) => has(c, 'stop-correcto') },
      { text: 'Ceder el paso en un cruce o rotonda', done: (c) => has(c, 'ceda-correcto') },
      { text: 'No quitar la prioridad a nadie', avoid: ['no-ceder-paso', 'stop-sin-detenerse'] },
    ],
    timeLimit: 900,
  },
  {
    id: 'l3-peatones',
    title: 'Pasos de peatones',
    briefing: ['Un peatón va a cruzar por el paso de cebra que tienes delante. En el paso de peatones él tiene prioridad: reduce y detente antes de la marca.'],
    setup: { pose: beforeLine((l) => l.control === 'stop' && l.crosswalks.length > 0, 70), traffic: false, forceCrossing: true, ...READY },
    objectives: [
      { text: 'Ceder el paso al peatón', done: (c) => has(c, 'peaton-cedido') },
      { text: 'No pasar con el peatón en el paso', avoid: ['no-ceder-peaton', 'atropello'] },
    ],
    timeLimit: 300,
  },
  {
    id: 'l3-rotondas',
    title: 'Rotondas',
    briefing: ['Entra en la rotonda cediendo el paso a quien ya circula por ella. Para salir, señaliza con el intermitente derecho.'],
    setup: { pose: spawn('rotonda'), traffic: true, ...READY },
    objectives: [
      { text: 'Salir de la rotonda señalizando a la derecha', done: (c) => has(c, 'rotonda-correcta') },
      { text: 'Ceder el paso al entrar', avoid: ['no-ceder-paso'] },
      { text: 'Circular en el sentido correcto', avoid: ['sentido-contrario'] },
    ],
    timeLimit: 420,
  },
  {
    id: 'l3-carril',
    title: 'Cambios de carril',
    briefing: ['Calle de sentido único con dos carriles. Cámbiate al carril izquierdo y luego vuelve al derecho: retrovisor, intermitente y maniobra suave.'],
    setup: { pose: (env) => env.map.roadPose('v1-0', 8, 0), traffic: false, ...READY },
    objectives: [
      { text: 'Pasar al carril izquierdo señalizando', done: (c) => has(c, 'cambio-carril-correcto:izquierda') },
      { text: 'Volver al carril derecho señalizando', done: (c) => has(c, 'cambio-carril-correcto:derecha'), sequential: true },
      { text: 'Señalizar siempre', avoid: ['cambio-carril-sin-intermitente'] },
    ],
    timeLimit: 420,
  },
  // ---- Nivel 4
  {
    id: 'l4-convencional',
    title: 'Curvas y distancia de seguridad',
    briefing: ['Circulas por la autovía a 80 km/h. Recorre 1,5 km adaptando la velocidad a las curvas y dejando al menos dos segundos con el vehículo de delante.', 'El mapa no tiene carretera convencional de doble sentido: esta lección practica curvas y distancia en la autovía.'],
    setup: { pose: onLane('autovia#1', 180, -413), speedKmh: 80, gear: 4, engineOn: true, belt: true, handbrake: false, lights: 'cortas', traffic: true },
    objectives: [
      { text: 'Recorrer 1,5 km', done: (c) => c.distM >= 1500 },
      { text: 'Mantener la distancia de seguridad', avoid: ['distancia-seguridad'] },
      { text: 'No superar el límite', avoid: ['exceso-velocidad'] },
    ],
    timeLimit: 300,
  },
  {
    id: 'l4-incorporacion',
    title: 'Incorporación a autovía',
    briefing: ['Toma el ramal, acelera por el carril de aceleración hasta la velocidad de la autovía (al menos 70 km/h), señaliza a la izquierda e incorpórate sin obligar a frenar a nadie.'],
    setup: { pose: spawn('autovia'), traffic: true, ...READY },
    objectives: [
      { text: 'Incorporarte a la velocidad adecuada y señalizando', done: (c) => has(c, 'incorporacion-correcta') },
      { text: 'No incorporarte demasiado despacio', avoid: ['incorporacion-lenta'] },
    ],
    timeLimit: 300,
  },
  {
    id: 'l4-adelantamiento',
    title: 'Adelantamientos',
    briefing: ['Delante va un vehículo lento. Adelántalo: retrovisor, intermitente izquierdo, cambia de carril, rebásalo y vuelve al carril derecho señalizando cuando lo veas en el retrovisor interior.'],
    setup: {
      pose: onLane('autovia#1', 473, -170), speedKmh: 90, gear: 4, engineOn: true, belt: true, handbrake: false, lights: 'cortas', traffic: true,
      slowCar: { aheadM: 90, kmh: 65, laneId: 'autovia#1' },
    },
    objectives: [
      { text: 'Pasar al carril izquierdo señalizando', done: (c) => has(c, 'cambio-carril-correcto:izquierda') },
      {
        text: 'Rebasar al vehículo lento',
        sequential: true,
        done: (c) => {
          const s = c.slowCar;
          if (!s) return false;
          const along = (c.v.x - s.x) * Math.sin(s.heading) + (c.v.z - s.z) * Math.cos(s.heading);
          return along > CAR.length + 4;
        },
      },
      { text: 'Volver al carril derecho señalizando', done: (c) => has(c, 'cambio-carril-correcto:derecha'), sequential: true },
      { text: 'Señalizar los cambios de carril', avoid: ['cambio-carril-sin-intermitente'] },
    ],
    timeLimit: 240,
  },
  // ---- Nivel 5: maniobras (zona de maniobras)
  {
    id: 'l5-linea',
    title: 'Aparcamiento en línea',
    briefing: [
      'Hay un hueco entre dos coches junto al bordillo. Colócate en paralelo al coche de delante del hueco, mete la marcha atrás (R) y entra girando hacia el bordillo; luego endereza.',
      'Termina dentro de la plaza, paralelo al bordillo y parado, sin tocar nada. Usa la cámara exterior (V) si te ayuda.',
    ],
    setup: { pose: fixed({ x: -352, z: 259.1, heading: Math.PI / 2 }), traffic: false, ...READY },
    objectives: [
      { text: 'Entrar marcha atrás', done: (c) => reversed(c) },
      { text: 'Quedar dentro de la plaza, paralelo y parado', done: (c) => insideSpot(c.v, MANEUVER_SPOTS.linea) && aligned(c.v, Math.PI / 2) && c.stillT > 1 },
      { text: 'Sin tocar coches ni bordillo', fail: touched },
    ],
    timeLimit: 300,
  },
  {
    id: 'l5-bateria',
    title: 'Aparcamiento en batería',
    briefing: ['Aparca marcha atrás en la plaza libre entre los coches. Adelanta el coche pasada la plaza, gira y entra en R; termina recto, dentro de las líneas y parado.'],
    setup: { pose: fixed({ x: -381, z: 285.5, heading: Math.PI / 2 }), traffic: false, ...READY },
    objectives: [
      {
        text: 'Entrar en la plaza marcha atrás',
        done: (c) => {
          if (c.v.v < -0.2 && insideSpot({ ...c.v }, { ...MANEUVER_SPOTS.bateria, length: MANEUVER_SPOTS.bateria.length + 3 }, 0.6)) c.st.revIn = true;
          return !!c.st.revIn;
        },
      },
      { text: 'Quedar recto dentro de la plaza y parado', done: (c) => insideSpot(c.v, MANEUVER_SPOTS.bateria) && aligned(c.v, Math.PI) && c.stillT > 1, sequential: true },
      { text: 'Sin tocar coches ni bordillo', fail: touched },
    ],
    timeLimit: 300,
  },
  {
    id: 'l5-oblicuo',
    title: 'Aparcamiento en oblicuo',
    briefing: ['Las plazas están inclinadas 45°. Circula despacio junto a ellas y entra de frente girando a la derecha en la plaza libre; termina dentro y parado.'],
    setup: { pose: fixed({ x: -366, z: 305.5, heading: Math.PI / 2 }), traffic: false, ...READY },
    objectives: [
      { text: 'Quedar dentro de la plaza, bien orientado y parado', done: (c) => insideSpot(c.v, MANEUVER_SPOTS.oblicuo) && aligned(c.v, MANEUVER_SPOTS.oblicuo.heading, 0.25) && c.stillT > 1 },
      { text: 'Sin tocar otros coches', fail: touched },
    ],
    timeLimit: 240,
  },
  {
    id: 'l5-pendiente',
    title: 'Arranque en pendiente',
    briefing: ['Estás parado en una cuesta con el freno de mano puesto. Primera, gas, embrague hasta el punto de fricción (el coche «tira») y entonces quita el freno de mano. Sube 25 m sin irte hacia atrás.'],
    setup: { pose: (env) => env.map.roadPose('h0-0', 42, 0), traffic: false, ...READY },
    objectives: [
      { text: 'Subir 25 m', done: (c) => c.along > 25 },
      { text: 'No retroceder más de 30 cm', fail: (c) => c.along < -0.3 },
      { text: 'Sin calar', avoid: ['calado'] },
    ],
    timeLimit: 240,
  },
  {
    id: 'l5-sentido',
    title: 'Cambio de sentido',
    briefing: ['En esta calle estrecha, da la vuelta en tres maniobras: adelante girando a la izquierda, atrás girando a la derecha y adelante otra vez. Termina en el carril contrario, mirando al otro lado y parado.'],
    setup: { pose: fixed({ x: -372, z: 333, heading: Math.PI / 2 }), traffic: false, ...READY },
    objectives: [
      { text: 'Usar la marcha atrás', done: (c) => reversed(c) },
      { text: 'Terminar en sentido contrario y parado', done: (c) => aligned(c.v, -Math.PI / 2, 0.3) && c.v.z < MANEUVER_SPOTS.sentido.z && c.stillT > 1, sequential: true },
      { text: 'Sin tocar los bordillos', fail: touched },
    ],
    timeLimit: 300,
  },
];

export function lessonDef(id: string): LessonDef | undefined {
  return LESSONS.find((l) => l.id === id);
}

