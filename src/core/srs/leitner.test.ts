import { describe, expect, it } from 'vitest';
import { isFailed, prioritize, review } from './leitner';

describe('Leitner', () => {
  it('sube de caja al acertar y vuelve a 0 al fallar', () => {
    let s = review(undefined, true, 0);
    s = review(s, true, 0);
    expect(s.box).toBe(2);
    s = review(s, false, 0);
    expect(s.box).toBe(0);
    expect(isFailed(s)).toBe(true);
  });
  it('prioriza falladas vencidas, luego nuevas', () => {
    const now = 1e12;
    const failed = review(undefined, false, now - 1e9);
    const mastered = review(review(undefined, true, now), true, now);
    const order = prioritize(['m', 'n', 'f'], { m: mastered, f: failed }, now, () => 0.5);
    expect(order).toEqual(['f', 'n', 'm']);
  });
});
