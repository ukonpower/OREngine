import { describe, it, expect, vi } from 'vitest';

vi.mock('../packages/maxpower/Component/Material/shaders/basic.fs', () => ({ default: '' }));
vi.mock('../packages/maxpower/Component/Material/shaders/basic.vs', () => ({ default: '' }));

import { Material } from '../packages/maxpower/Component/Material';

describe('Material class', () => {
  it('initializes with default flags', () => {
    const m = new Material();
    expect(m.name).toBe('');
    expect(m.visibilityFlag.deferred).toBe(true);
    expect(m.visibilityFlag.forward).toBe(false);
  });

  it('setPropertyValues updates values and resets program cache', () => {
    const m = new Material();
    (m as any).programCache.example = {};

    m.setPropertyValues({
      name: 'foo',
      forward: true,
      deferred: false,
      shadowMap: false,
      ui: false,
      useLight: false,
      depthTest: false,
      cullFace: false,
      drawType: 'LINES',
    });

    expect(m.name).toBe('foo');
    expect(m.visibilityFlag.forward).toBe(true);
    expect(m.visibilityFlag.deferred).toBe(false);
    expect(Object.keys(m.programCache)).toHaveLength(0);
  });
});
