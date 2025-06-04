import { describe, it, expect } from 'vitest';

import { Entity } from '../packages/maxpower/Entity';

describe('Entity class', () => {
  it('adds and removes child entities', () => {
    const parent = new Entity({ name: 'parent' });
    const child = new Entity({ name: 'child' });

    parent.add(child);
    expect(parent.children).toContain(child);
    expect(child.parent).toBe(parent);

    parent.remove(child);
    expect(parent.children).not.toContain(child);
  });

  it('getEntityByName finds nested children', () => {
    const root = new Entity({ name: 'root' });
    const a = new Entity({ name: 'a' });
    const b = new Entity({ name: 'b' });
    root.add(a);
    a.add(b);

    expect(root.getEntityByName('b')).toBe(b);
    expect(root.getEntityByName('unknown')).toBeUndefined();
  });

  it('getPath returns hierarchy path', () => {
    const root = new Entity({ name: 'root' });
    const child = new Entity({ name: 'child' });
    root.add(child);
    expect(child.getPath()).toBe('/root/child');
  });
});
