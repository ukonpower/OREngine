import { describe, it, expect, vi } from 'vitest';

vi.mock('../packages/maxpower/Material/shaders/basic.fs', () => ({ default: '' }));
vi.mock('../packages/maxpower/Material/shaders/basic.vs', () => ({ default: '' }));

import { Material } from '../packages/maxpower/Material';

describe('Material class', () => {
  it('initializes with default flags', () => {
    const m = new Material();
    expect(m.name).toBe('');
    expect(m.visibilityFlag.deferred).toBe(true);
    expect(m.visibilityFlag.forward).toBe(false);
  });

  it('updates values and resets program cache with requestUpdate', () => {
    const m = new Material();
    (m as any).programCache.example = {};

    m.name = 'foo';
    m.visibilityFlag.forward = true;
    m.visibilityFlag.deferred = false;
    m.useLight = false;
    m.depthTest = false;
    m.cullFace = false;
    m.drawType = 'LINES';
    m.requestUpdate();

    expect(m.name).toBe('foo');
    expect(m.visibilityFlag.forward).toBe(true);
    expect(m.visibilityFlag.deferred).toBe(false);
    expect(Object.keys(m.programCache)).toHaveLength(0);
  });
});
