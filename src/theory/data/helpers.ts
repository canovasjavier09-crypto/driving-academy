import type { TheoryCategoryId } from '../../core/progress/curriculum';
import type { Question } from './types';

/**
 * Atajo de autoría. La primera opción es siempre la correcta; el motor
 * baraja el orden al mostrarla, así que la posición no da pistas.
 * Si se indica `ref`, la pregunta se marca como «normativa»; si no, «didáctica».
 */
export function q(
  id: string,
  category: TheoryCategoryId,
  difficulty: 1 | 2 | 3,
  text: string,
  options: [string, string, string],
  explanation: string,
  ref?: string,
  image?: string,
): Question {
  return {
    id,
    category,
    difficulty,
    text,
    options,
    correct: 0,
    explanation,
    source: ref ? 'normativa' : 'didactica',
    ...(ref ? { reference: ref } : {}),
    ...(image ? { image } : {}),
  };
}
