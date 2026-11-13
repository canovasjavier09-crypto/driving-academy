import type { TheoryCategoryId } from '../../core/progress/curriculum';

/**
 * fuente:
 *  - 'normativa': el contenido se apoya en una norma citada en `referencia` (verificable).
 *    La redacción de la pregunta es ORIGINAL; nunca se presenta como pregunta oficial de la DGT.
 *  - 'didactica': contenido formativo creado para Driving Academy.
 */
export interface Question {
  id: string;
  category: TheoryCategoryId;
  difficulty: 1 | 2 | 3;
  text: string;
  /** Identificador de imagen SVG generada (señales, situaciones). */
  image?: string;
  options: [string, string, string];
  correct: 0 | 1 | 2;
  explanation: string;
  source: 'normativa' | 'didactica';
  reference?: string;
  /**
   * Aviso «VERIFICAR»: dato o artículo del que no hay certeza plena. Se
   * muestra junto a la referencia en lugar de afirmarlo como seguro.
   */
  verify?: string;
}
