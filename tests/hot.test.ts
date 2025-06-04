import { describe, it, expect, beforeEach } from 'vitest';
import { hotGet, hotUpdate } from '../packages/maxpower/Utils/Hot';

// Clear module cache before each test by updating with undefined
beforeEach(() => {
  // There is no API to clear, but we can update with undefined values per key
  hotUpdate('reset-key', undefined);
});

describe('hotGet and hotUpdate', () => {
  it('returns cached module after first call', () => {
    const modA = { value: 'A' };
    const first = hotGet('key', modA);
    expect(first).toBe(modA);

    const modB = { value: 'B' };
    const second = hotGet('key', modB);
    expect(second).toBe(modA);
  });

  it('updates cached module with hotUpdate', () => {
    const modA = { value: 'A' };
    hotGet('update', modA);

    const modB = { value: 'B' };
    const updateResult = hotUpdate('update', modB);
    expect(updateResult).toBe(modB);

    const afterUpdate = hotGet('update', {});
    expect(afterUpdate).toBe(modB);
  });
});
