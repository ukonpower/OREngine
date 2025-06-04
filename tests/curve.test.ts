import { describe, it, expect } from 'vitest';

import { Curve } from '../packages/maxpower/Utils/Curve';

describe('Curve', () => {
  it('copies points in setPoints and computes positions', () => {
    const curve = new Curve();
    const pts = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
    ];

    curve.setPoints(pts);

    // ensure points were copied
    expect(curve.points).not.toBe(pts);
    expect(curve.points).toEqual(pts);

    // basic position checks along the straight line
    expect(curve.getPosition(0).position.x).toBeCloseTo(0, 3);
    expect(curve.getPosition(0.5).position.x).toBeCloseTo(1.5, 3);
    expect(curve.getPosition(0.9999).position.x).toBeCloseTo(3, 2);
  });
});
