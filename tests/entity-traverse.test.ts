import { describe, it, expect, vi } from 'vitest';
import { Entity } from '../packages/maxpower/Entity';
import { Component } from '../packages/maxpower/Component';

class DummyComponent extends Component {}

describe('Entity dispose and traversal', () => {
  it('dispose removes from parent and disposes components', () => {
    const parent = new Entity({ name: 'parent' });
    const child = new Entity({ name: 'child' });
    parent.add(child);
    const comp = child.addComponent(DummyComponent);
    const spy = vi.spyOn(comp, 'dispose');

    child.dispose();
    expect(parent.children).not.toContain(child);
    expect(spy).toHaveBeenCalled();
    expect(child.components.size).toBe(0);
  });

  it('traverse visits all descendants', () => {
    const root = new Entity({ name: 'root' });
    const a = new Entity({ name: 'a' });
    const b = new Entity({ name: 'b' });
    root.add(a);
    a.add(b);
    const names: string[] = [];
    root.traverse(e => names.push(e.name));
    expect(names).toEqual(['root', 'a', 'b']);
  });

  it('noticeEventChilds and noticeEventParent propagate events', () => {
    const root = new Entity();
    const child = new Entity();
    root.add(child);

    const spyChild = vi.fn();
    const spyParent = vi.fn();
    child.on('ping', spyChild);
    root.on('pong', spyParent);

    root.noticeEventChilds('ping', ['hello']);
    expect(spyChild).toHaveBeenCalledWith('hello');

    child.noticeEventParent('pong', [42]);
    expect(spyParent).toHaveBeenCalledWith(42);
  });
});
