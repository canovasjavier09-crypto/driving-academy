/**
 * Registro de funcionalidades construidas. La UI lo consulta para no mostrar
 * botones que lleven a algo que todavía no existe: en su lugar indica la fase.
 * Al terminar cada fase, se añaden aquí sus rutas.
 */
const AVAILABLE: string[] = [
  '/', '/simulador', '/teoria', '/estadisticas', '/progreso', '/configuracion', '/aviso',
  // Fase 3
  '/teoria/examen', '/teoria/aprendizaje', '/teoria/simulacro', '/teoria/errores',
  // Fase 4
  '/simulador/libre',
  // Fase 6
  '/simulador/examen',
];
const AVAILABLE_PREFIXES: string[] = ['/teoria/tema/', '/simulador/leccion/'];

const PLANNED: { prefix: string; phase: number }[] = [
];

export function isAvailable(route: string): boolean {
  return AVAILABLE.includes(route) || AVAILABLE_PREFIXES.some((p) => route.startsWith(p));
}

export function plannedPhase(route: string): number | null {
  return PLANNED.find((p) => route.startsWith(p.prefix))?.phase ?? null;
}
