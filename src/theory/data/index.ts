import type { TheoryCategoryId } from '../../core/progress/curriculum';
import type { Question } from './types';
import { BANK_1 } from './bank1';
import { BANK_2 } from './bank2';
import { BANK_3 } from './bank3';
import { BANK_4 } from './bank4';
import { BANK_5 } from './bank5';

/**
 * Referencias de las que no hay certeza plena sobre el artículo exacto:
 * se muestran con «VERIFICAR» en lugar de afirmarse.
 */
const VERIFY: Record<string, string> = {
  'NOR-05': 'VERIFICAR: el art. 109 RGC regula las advertencias ópticas (intermitentes); el cambio de carril se regula en los arts. 74-75.',
  'NOR-07': 'VERIFICAR el artículo del RGC que regula la salida de glorietas de varios carriles.',
  'SEG-11': 'VERIFICAR: el artículo citado regula los semáforos; las barreras de paso a nivel pueden estar en otro artículo del RGC.',
  'ALU-09': 'VERIFICAR el artículo del RGC sobre advertencias con destellos en poblado.',
  'PAR-05': 'VERIFICAR: que la marcha engranada sea «preferiblemente atrás» es una recomendación didáctica, no un texto literal de la norma.',
  'DOC-04': 'VERIFICAR el artículo concreto que enumera los documentos que deben llevarse.',
  'DOC-08': 'VERIFICAR el artículo de la LSV que fija los 8 puntos iniciales.',
  'DOC-09': 'VERIFICAR el artículo de la LSV que fija el saldo máximo de 15 puntos.',
  'DOC-10': 'VERIFICAR: la señal V-13 se describe en el Anexo XI del Reglamento General de Vehículos, no del RGC; su obligación para noveles, en el Reglamento General de Conductores.',
  'MEC-01': 'VERIFICAR el anexo del RGV que fija los 1,6 mm.',
};

/** Banco completo de preguntas (redacción original; ver `source` y `reference`). */
export const QUESTIONS: Question[] = [...BANK_1, ...BANK_2, ...BANK_3, ...BANK_4, ...BANK_5].map((x) => (VERIFY[x.id] && !x.verify ? { ...x, verify: VERIFY[x.id] } : x));

/** Preguntas del examen: solo las que citan la norma que las respalda. */
export const EXAM_POOL: Question[] = QUESTIONS.filter((x) => x.source === 'normativa' && !!x.reference);

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
export const getQuestion = (id: string) => byId.get(id);
export const categoryOf = (qid: string): TheoryCategoryId | undefined => byId.get(qid)?.category;
export const countByCategory = (cat: TheoryCategoryId) => QUESTIONS.filter((q) => q.category === cat).length;
