import { describe, it, expect } from 'vitest';
import { Serializable } from '../packages/maxpower/Serializable';

function createSimple() {
  const s = new Serializable();
  let val = 0;
  s.field('foo', () => val, v => { val = v; });
  return { s, get val() { return val; }, set val(v: number) { val = v; } };
}

describe('Serializable deserialize and field helpers', () => {
  it('updates fields via deserialize', () => {
    const { s } = createSimple();
    s.deserialize({ foo: 3 });
    expect(s.getField('foo')).toBe(3);
  });

  it('setField and getField mirror stored value', () => {
    const { s } = createSimple();
    s.setField('foo', 5);
    expect(s.getField('foo')).toBe(5);
  });
});
