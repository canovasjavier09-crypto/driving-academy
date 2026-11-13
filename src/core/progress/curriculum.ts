/** Catálogo del temario. Solo metadatos: la lógica de cada lección vive en sim/ y theory/. */

export type TheoryCategoryId =
  | 'senales'
  | 'normas'
  | 'prioridad'
  | 'velocidad'
  | 'seguridad-vial'
  | 'adelantamientos'
  | 'parada-estacionamiento'
  | 'alumbrado'
  | 'alcohol-drogas'
  | 'documentacion'
  | 'mecanica'
  | 'seguridad-activa-pasiva'
  | 'primeros-auxilios'
  | 'conduccion-eficiente'
  | 'usuarios-vulnerables'
  | 'autopistas-autovias';

export const THEORY_CATEGORIES: { id: TheoryCategoryId; name: string; icon: string }[] = [
  { id: 'senales', name: 'Señales de circulación', icon: '⚠︎' },
  { id: 'normas', name: 'Normas de circulación', icon: '§' },
  { id: 'prioridad', name: 'Prioridad de paso', icon: '▽' },
  { id: 'velocidad', name: 'Velocidad', icon: '⏱' },
  { id: 'seguridad-vial', name: 'Seguridad vial', icon: '✚' },
  { id: 'adelantamientos', name: 'Adelantamientos', icon: '⇉' },
  { id: 'parada-estacionamiento', name: 'Parada y estacionamiento', icon: 'P' },
  { id: 'alumbrado', name: 'Alumbrado', icon: '☼' },
  { id: 'alcohol-drogas', name: 'Alcohol y drogas', icon: '⊘' },
  { id: 'documentacion', name: 'Documentación', icon: '▤' },
  { id: 'mecanica', name: 'Mecánica básica', icon: '⚙' },
  { id: 'seguridad-activa-pasiva', name: 'Seguridad activa y pasiva', icon: '⛨' },
  { id: 'primeros-auxilios', name: 'Primeros auxilios', icon: '✙' },
  { id: 'conduccion-eficiente', name: 'Conducción eficiente', icon: '♺' },
  { id: 'usuarios-vulnerables', name: 'Usuarios vulnerables', icon: '☺' },
  { id: 'autopistas-autovias', name: 'Autopistas y autovías', icon: '═' },
];

export interface PracticeLesson {
  id: string;
  title: string;
  goals: string[];
}

export interface PracticeLevel {
  level: number;
  title: string;
  description: string;
  lessons: PracticeLesson[];
}

export const PRACTICE_LEVELS: PracticeLevel[] = [
  {
    level: 1,
    title: 'Primer contacto',
    description: 'Pedales, volante, arranque y control del embrague.',
    lessons: [
      { id: 'l1-mandos', title: 'Conoce los mandos', goals: ['Identificar acelerador, freno y embrague', 'Usar el volante'] },
      { id: 'l1-arranque', title: 'Arrancar sin calar', goals: ['Encontrar el punto de fricción', 'Salir en primera'] },
      { id: 'l1-segunda', title: 'Primera y segunda', goals: ['Cambiar a segunda', 'Detener el vehículo correctamente'] },
    ],
  },
  {
    level: 2,
    title: 'Circulación básica',
    description: 'Línea recta, marchas, giros y control de velocidad.',
    lessons: [
      { id: 'l2-recta', title: 'Línea recta y marchas', goals: ['Subir hasta tercera', 'Mantener el carril'] },
      { id: 'l2-giros', title: 'Giros a derecha e izquierda', goals: ['Señalizar', 'Reducir antes del giro'] },
      { id: 'l2-frenado', title: 'Frenado progresivo', goals: ['Detenerse en una línea', 'Reducir marchas'] },
    ],
  },
  {
    level: 3,
    title: 'Ciudad',
    description: 'Semáforos, cruces, prioridades, pasos de peatones y rotondas.',
    lessons: [
      { id: 'l3-semaforos', title: 'Semáforos y cruces', goals: ['Detenerse en rojo', 'Respetar la línea de detención'] },
      { id: 'l3-prioridad', title: 'Prioridades y STOP', goals: ['Detención total en STOP', 'Ceder el paso'] },
      { id: 'l3-peatones', title: 'Pasos de peatones', goals: ['Ceder a peatones'] },
      { id: 'l3-rotondas', title: 'Rotondas', goals: ['Entrar cediendo', 'Salir por el carril derecho'] },
      { id: 'l3-carril', title: 'Cambios de carril', goals: ['Retrovisor, intermitente, maniobra'] },
    ],
  },
  {
    level: 4,
    title: 'Carretera',
    description: 'Curvas, incorporación a la autovía y adelantamientos.',
    lessons: [
      { id: 'l4-convencional', title: 'Curvas y distancia de seguridad', goals: ['Adaptar la velocidad a las curvas', 'Distancia de seguridad'] },
      { id: 'l4-incorporacion', title: 'Incorporación a autovía', goals: ['Adaptar velocidad en el carril de aceleración'] },
      { id: 'l4-adelantamiento', title: 'Adelantamientos', goals: ['Adelantar con seguridad'] },
    ],
  },
  {
    level: 5,
    title: 'Maniobras',
    description: 'Aparcamientos, marcha atrás, pendiente y cambio de sentido.',
    lessons: [
      { id: 'l5-linea', title: 'Aparcamiento en línea', goals: ['Aparcar sin tocar bordillo'] },
      { id: 'l5-bateria', title: 'Aparcamiento en batería', goals: ['Entrar marcha atrás'] },
      { id: 'l5-oblicuo', title: 'Aparcamiento en oblicuo', goals: ['Entrar en la plaza'] },
      { id: 'l5-pendiente', title: 'Arranque en pendiente', goals: ['Sin retroceder, con freno de mano'] },
      { id: 'l5-sentido', title: 'Cambio de sentido', goals: ['Maniobra en tres movimientos'] },
    ],
  },
  {
    level: 6,
    title: 'Examen práctico',
    description: 'Recorrido completo con examinador virtual y evaluación.',
    lessons: [{ id: 'l6-examen', title: 'Simulacro de examen práctico', goals: ['Completar el recorrido sin faltas eliminatorias'] }],
  },
];

export const ALL_LESSONS = PRACTICE_LEVELS.flatMap((l) => l.lessons.map((ls) => ({ ...ls, level: l.level })));
