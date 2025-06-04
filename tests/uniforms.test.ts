import { describe, it, expect } from 'vitest';
import { UniformsUtils } from '../packages/maxpower/Utils/Uniforms';

describe('UniformsUtils', () => {
  it('assign merges uniforms into target', () => {
    const target: any = { a: 1 };
    const res = UniformsUtils.assign(target, { b: 2 }, undefined, { c: 3 });
    expect(res).toEqual({ a: 1, b: 2, c: 3 });
    expect(res).toBe(target);
  });

  it('merge combines uniforms into new object', () => {
    const u1: any = { a: 1 };
    const merged = UniformsUtils.merge(u1, { b: 2 });
    expect(merged).toEqual({ a: 1, b: 2 });
    expect(merged).not.toBe(u1);
  });
});
