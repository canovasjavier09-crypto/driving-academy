import { describe, expect, it } from 'vitest';
import { Evaluator, FAULTS, severityOf, verdict } from './evaluation';
import { RULE_KIND, type RuleCode } from './monitor';

describe('calificación de faltas', () => {
  it('aplica el criterio de APTO/NO APTO', () => {
    expect(verdict(0, 0, 0).passed).toBe(true);
    expect(verdict(1, 0, 0).passed).toBe(false);
    expect(verdict(0, 2, 0).passed).toBe(false);
    expect(verdict(0, 1, 4).passed).toBe(true);
    expect(verdict(0, 1, 5).passed).toBe(false);
    expect(verdict(0, 0, 9).passed).toBe(true);
    expect(verdict(0, 0, 10).passed).toBe(false);
  });

  it('toda falta del detector tiene categoría', () => {
    const faltas = (Object.keys(RULE_KIND) as RuleCode[]).filter((c) => RULE_KIND[c] === 'falta');
    for (const c of faltas) expect(FAULTS[c], c).toBeDefined();
  });

  it('gradúa la velocidad y las colisiones', () => {
    expect(severityOf({ code: 'exceso-velocidad', kind: 'falta', value: 40, limit: 30 })).toBe('deficiente');
    expect(severityOf({ code: 'exceso-velocidad', kind: 'falta', value: 50, limit: 30 })).toBe('eliminatoria');
    expect(severityOf({ code: 'colision', kind: 'falta', value: 5 })).toBe('deficiente');
    expect(severityOf({ code: 'colision', kind: 'falta', value: 25 })).toBe('eliminatoria');
  });

  it('acumula faltas, puntúa y separa las conductas correctas', () => {
    const ev = new Evaluator();
    ev.add([{ code: 'calado', kind: 'falta' }, { code: 'stop-correcto', kind: 'bien' }, { code: 'aviso-stop', kind: 'aviso' }], 1);
    ev.add([{ code: 'giro-sin-intermitente', kind: 'falta' }], 2);
    expect(ev.count('leve')).toBe(1);
    expect(ev.count('deficiente')).toBe(1);
    expect(ev.good.get('stop-correcto')).toBe(1);
    expect(ev.score()).toBe(81);
    expect(ev.verdict().passed).toBe(true);
    expect(ev.byLabel()['Calar el motor']).toBe(1);
  });

  it('calado: leve si es puntual, deficiente en un cruce con vehículos acercándose', () => {
    expect(severityOf({ code: 'calado', kind: 'falta', value: 0, detail: 'embrague soltado de golpe' })).toBe('leve');
    expect(severityOf({ code: 'calado', kind: 'falta' })).toBe('leve');
    expect(severityOf({ code: 'calado', kind: 'falta', value: 1 })).toBe('deficiente');
    const ev = new Evaluator();
    ev.zone = 'Centro con semáforos';
    ev.add([{ code: 'calado', kind: 'falta', value: 1, detail: 'frenar hasta parar sin pisar el embrague; en un cruce con vehículos acercándose' }], 42);
    expect(ev.faults[0]).toMatchObject({ sev: 'deficiente', t: 42, zone: 'Centro con semáforos' });
    expect(ev.faults[0]!.detail).toContain('frenar');
  });
});
