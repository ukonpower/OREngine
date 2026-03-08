import { Entity, Component } from 'maxpower';
import { describe, it, expect, vi } from 'vitest';

describe( 'Entity', () => {

	describe( 'constructor', () => {

		it( 'should initialize with default values', () => {

			const e = new Entity();
			expect( e.name ).toBe( '' );
			expect( e.children ).toHaveLength( 0 );
			expect( e.parent ).toBeNull();
			expect( e.visible ).toBe( true );

		} );

		it( 'should accept name param', () => {

			const e = new Entity( { name: 'test' } );
			expect( e.name ).toBe( 'test' );

		} );

	} );

	describe( 'add / remove', () => {

		it( 'should add child and set parent', () => {

			const parent = new Entity();
			const child = new Entity();
			parent.add( child );
			expect( parent.children ).toContain( child );
			expect( child.parent ).toBe( parent );

		} );

		it( 'should remove child from previous parent', () => {

			const parent1 = new Entity();
			const parent2 = new Entity();
			const child = new Entity();
			parent1.add( child );
			parent2.add( child );
			expect( parent1.children ).not.toContain( child );
			expect( parent2.children ).toContain( child );

		} );

		it( 'should remove child', () => {

			const parent = new Entity();
			const child = new Entity();
			parent.add( child );
			parent.remove( child );
			expect( parent.children ).not.toContain( child );

		} );

	} );

	describe( 'findEntityByName / findEntityByUUID', () => {

		it( 'should find entity by name in tree', () => {

			const root = new Entity( { name: 'root' } );
			const child = new Entity( { name: 'target' } );
			root.add( child );
			expect( root.findEntityByName( 'target' ) ).toBe( child );

		} );

		it( 'should find self by name', () => {

			const e = new Entity( { name: 'self' } );
			expect( e.findEntityByName( 'self' ) ).toBe( e );

		} );

		it( 'should find entity by UUID', () => {

			const root = new Entity();
			const child = new Entity();
			root.add( child );
			expect( root.findEntityByUUID( child.uuid ) ).toBe( child );

		} );

		it( 'should return undefined for non-existent', () => {

			const root = new Entity();
			expect( root.findEntityByUUID( 'nonexistent' ) ).toBeUndefined();

		} );

		it( 'should find deeply nested entity', () => {

			const root = new Entity( { name: 'root' } );
			const child = new Entity( { name: 'child' } );
			const grandchild = new Entity( { name: 'grandchild' } );
			root.add( child );
			child.add( grandchild );
			expect( root.findEntityByName( 'grandchild' ) ).toBe( grandchild );

		} );

	} );

	describe( 'getRootEntity', () => {

		it( 'should return root of tree', () => {

			const root = new Entity();
			const child = new Entity();
			const grandchild = new Entity();
			root.add( child );
			child.add( grandchild );
			expect( grandchild.getRootEntity() ).toBe( root );

		} );

		it( 'should return self when no parent', () => {

			const e = new Entity();
			expect( e.getRootEntity() ).toBe( e );

		} );

	} );

	describe( 'addComponent / removeComponent / getComponent', () => {

		it( 'should add and retrieve component', () => {

			const e = new Entity();
			const c = e.addComponent( Component );
			expect( e.getComponent( Component ) ).toBe( c );

		} );

		it( 'should replace existing component of same type', () => {

			const e = new Entity();
			const c1 = e.addComponent( Component );
			const c2 = e.addComponent( Component );
			expect( e.getComponent( Component ) ).toBe( c2 );
			expect( e.getComponent( Component ) ).not.toBe( c1 );

		} );

		it( 'should remove component', () => {

			const e = new Entity();
			e.addComponent( Component );
			e.removeComponent( Component );
			expect( e.getComponent( Component ) ).toBeUndefined();

		} );

		it( 'should dispose component on remove', () => {

			const e = new Entity();
			const c = e.addComponent( Component );
			const cb = vi.fn();
			c.on( 'dispose', cb );
			e.removeComponent( Component );
			expect( cb ).toHaveBeenCalled();

		} );

		it( 'should get component by UUID', () => {

			const e = new Entity();
			const c = e.addComponent( Component );
			expect( e.getComponentByUUID( c.uuid ) ).toBe( c );

		} );

		it( 'should return null for unknown UUID', () => {

			const e = new Entity();
			expect( e.getComponentByUUID( 'unknown' ) ).toBeNull();

		} );

	} );

	describe( 'traverse', () => {

		it( 'should visit all entities in tree', () => {

			const root = new Entity();
			const c1 = new Entity();
			const c2 = new Entity();
			root.add( c1 );
			root.add( c2 );
			const visited: Entity[] = [];
			root.traverse( e => visited.push( e ) );
			expect( visited ).toEqual( [ root, c1, c2 ] );

		} );

		it( 'should traverse deeply', () => {

			const root = new Entity();
			const c1 = new Entity();
			const gc1 = new Entity();
			root.add( c1 );
			c1.add( gc1 );
			const visited: Entity[] = [];
			root.traverse( e => visited.push( e ) );
			expect( visited ).toEqual( [ root, c1, gc1 ] );

		} );

	} );

	describe( 'isVisibleTraverse', () => {

		it( 'should return false when parent is invisible', () => {

			const parent = new Entity();
			const child = new Entity();
			parent.add( child );
			parent.visible = false;
			expect( child.isVisibleTraverse() ).toBe( false );

		} );

		it( 'should return true when all ancestors visible', () => {

			const parent = new Entity();
			const child = new Entity();
			parent.add( child );
			expect( child.isVisibleTraverse() ).toBe( true );

		} );

		it( 'should return false when self invisible', () => {

			const e = new Entity();
			e.visible = false;
			expect( e.isVisibleTraverse() ).toBe( false );

		} );

	} );

	describe( 'getScenePath', () => {

		it( 'should return full path from root', () => {

			const root = new Entity( { name: 'Scene' } );
			const child = new Entity( { name: 'Cube' } );
			root.add( child );
			expect( child.getScenePath() ).toBe( '/Scene/Cube' );

		} );

		it( 'should return single path for root', () => {

			const root = new Entity( { name: 'Scene' } );
			expect( root.getScenePath() ).toBe( '/Scene' );

		} );

	} );

	describe( 'dispose', () => {

		it( 'should emit dispose event', () => {

			const e = new Entity();
			const cb = vi.fn();
			e.on( 'dispose', cb );
			e.dispose();
			expect( cb ).toHaveBeenCalled();

		} );

		it( 'should remove from parent', () => {

			const parent = new Entity();
			const child = new Entity();
			parent.add( child );
			child.dispose();
			expect( parent.children ).not.toContain( child );

		} );

		it( 'should dispose all components', () => {

			const e = new Entity();
			const c = e.addComponent( Component );
			const cb = vi.fn();
			c.on( 'dispose', cb );
			e.dispose();
			expect( cb ).toHaveBeenCalled();

		} );

	} );

	describe( 'disposeRecursive', () => {

		it( 'should dispose entity and all descendants', () => {

			const root = new Entity();
			const child = new Entity();
			const grandchild = new Entity();
			root.add( child );
			child.add( grandchild );
			const rootCb = vi.fn();
			const childCb = vi.fn();
			const gcCb = vi.fn();
			root.on( 'dispose', rootCb );
			child.on( 'dispose', childCb );
			grandchild.on( 'dispose', gcCb );
			root.disposeRecursive();
			expect( rootCb ).toHaveBeenCalled();
			expect( childCb ).toHaveBeenCalled();
			expect( gcCb ).toHaveBeenCalled();

		} );

	} );

	describe( 'updateMatrix', () => {

		it( 'should compute identity matrixWorld when no transform', () => {

			const e = new Entity();
			e.updateMatrix();
			const elm = e.matrixWorld.elm;
			expect( elm[ 0 ] ).toBeCloseTo( 1 );
			expect( elm[ 5 ] ).toBeCloseTo( 1 );
			expect( elm[ 10 ] ).toBeCloseTo( 1 );
			expect( elm[ 15 ] ).toBeCloseTo( 1 );

		} );

		it( 'should include position in matrixWorld', () => {

			const e = new Entity();
			e.position.set( 3, 4, 5 );
			e.updateMatrix();
			expect( e.matrixWorld.elm[ 12 ] ).toBeCloseTo( 3 );
			expect( e.matrixWorld.elm[ 13 ] ).toBeCloseTo( 4 );
			expect( e.matrixWorld.elm[ 14 ] ).toBeCloseTo( 5 );

		} );

		it( 'should combine parent and child matrices', () => {

			const parent = new Entity();
			const child = new Entity();
			parent.add( child );
			parent.position.set( 10, 0, 0 );
			parent.updateMatrix();
			child.position.set( 5, 0, 0 );
			child.updateMatrix();
			expect( child.matrixWorld.elm[ 12 ] ).toBeCloseTo( 15 );

		} );

		it( 'should reflect scale', () => {

			const e = new Entity();
			e.scale.set( 2, 3, 4 );
			e.updateMatrix();
			expect( e.matrixWorld.elm[ 0 ] ).toBeCloseTo( 2 );
			expect( e.matrixWorld.elm[ 5 ] ).toBeCloseTo( 3 );
			expect( e.matrixWorld.elm[ 10 ] ).toBeCloseTo( 4 );

		} );

	} );

	describe( 'noticeEventChilds / noticeEventParent', () => {

		it( 'should emit event down to children', () => {

			const root = new Entity();
			const child = new Entity();
			root.add( child );
			const cb = vi.fn();
			child.on( 'custom', cb );
			root.noticeEventChilds( 'custom', [] );
			expect( cb ).toHaveBeenCalled();

		} );

		it( 'should emit event up to parent', () => {

			const root = new Entity();
			const child = new Entity();
			root.add( child );
			const cb = vi.fn();
			root.on( 'custom', cb );
			child.noticeEventParent( 'custom' );
			expect( cb ).toHaveBeenCalled();

		} );

	} );

} );
