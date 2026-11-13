/** Ilustraciones disponibles (las dibuja `theory/ui/Sign.tsx`). */
export const SIGN_IDS = [
  'R-1', 'R-2', 'R-3', 'R-4', 'R-100', 'R-101', 'R-301-50', 'R-305', 'R-307', 'R-308', 'R-400a', 'R-500',
  'P-4', 'P-20', 'S-13', 'semaforo:ambar', 'marca:amarilla-continua', 'marca:doble',
] as const;
export type SignId = (typeof SIGN_IDS)[number];
