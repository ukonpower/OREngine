import { EntityStore } from './index';
import { describe, it, expect, beforeEach } from 'vitest';

import type { SceneDataEntity } from '../types';

describe( 'EntityStore', () => {

	let store: EntityStore;
	let root: SceneDataEntity;

	beforeEach( () => {

		store = new EntityStore();
		root = {
			uuid: 'root-uuid',
			name: 'Root',
			childs: [
				{
					uuid: 'child-1',
					name: 'Child1',
					components: [
						{ uuid: 'comp-1', name: 'Mesh' }
					]
				},
				{
					uuid: 'child-2',
					name: 'Child2',
				}
			]
		};

	} );

	describe( 'findEntity', () => {

		it( 'should find root', () => {

			expect( store.findEntity( root, 'root-uuid' ) ).toBe( root );

		} );

		it( 'should find nested child', () => {

			const found = store.findEntity( root, 'child-1' );
			expect( found?.name ).toBe( 'Child1' );

		} );

		it( 'should return null for unknown uuid', () => {

			expect( store.findEntity( root, 'unknown' ) ).toBeNull();

		} );

		it( 'should find deeply nested entity', () => {

			root.childs![ 0 ].childs = [
				{ uuid: 'grandchild-1', name: 'GrandChild1' }
			];
			const found = store.findEntity( root, 'grandchild-1' );
			expect( found?.name ).toBe( 'GrandChild1' );

		} );

	} );

	describe( 'findParent', () => {

		it( 'should find parent of child', () => {

			expect( store.findParent( root, 'child-1' ) ).toBe( root );

		} );

		it( 'should return null for root', () => {

			expect( store.findParent( root, 'root-uuid' ) ).toBeNull();

		} );

		it( 'should return null for unknown', () => {

			expect( store.findParent( root, 'unknown' ) ).toBeNull();

		} );

	} );

	describe( 'findComponent', () => {

		it( 'should find component by uuid', () => {

			const result = store.findComponent( root, 'comp-1' );
			expect( result?.component.name ).toBe( 'Mesh' );
			expect( result?.entity.uuid ).toBe( 'child-1' );

		} );

		it( 'should return null for unknown component', () => {

			expect( store.findComponent( root, 'unknown' ) ).toBeNull();

		} );

	} );

	describe( 'createEntity', () => {

		it( 'should create entity under parent', () => {

			const created = store.createEntity( root, 'root-uuid', 'New' );
			expect( created.name ).toBe( 'New' );
			expect( root.childs ).toContain( created );

		} );

		it( 'should assign uuid to created entity', () => {

			const created = store.createEntity( root, 'root-uuid', 'New' );
			expect( created.uuid ).toBeTruthy();

		} );

		it( 'should throw for unknown parent', () => {

			expect( () => store.createEntity( root, 'unknown', 'X' ) ).toThrow();

		} );

		it( 'should initialize childs array if needed', () => {

			const created = store.createEntity( root, 'child-2', 'Sub' );
			expect( root.childs![ 1 ].childs ).toContain( created );

		} );

	} );

	describe( 'deleteEntity', () => {

		it( 'should remove entity', () => {

			store.deleteEntity( root, 'child-1' );
			expect( root.childs!.length ).toBe( 1 );
			expect( root.childs![ 0 ].uuid ).toBe( 'child-2' );

		} );

		it( 'should throw when deleting root', () => {

			expect( () => store.deleteEntity( root, 'root-uuid' ) ).toThrow( 'Cannot delete root' );

		} );

		it( 'should throw for unknown entity', () => {

			expect( () => store.deleteEntity( root, 'unknown' ) ).toThrow();

		} );

		it( 'should clean up empty childs array', () => {

			store.deleteEntity( root, 'child-1' );
			store.deleteEntity( root, 'child-2' );
			expect( root.childs ).toBeUndefined();

		} );

	} );

	describe( 'addComponent', () => {

		it( 'should add component to entity', () => {

			const comp = store.addComponent( root, 'child-2', 'Light' );
			expect( comp.name ).toBe( 'Light' );
			expect( comp.uuid ).toBeTruthy();

		} );

		it( 'should throw for unknown entity', () => {

			expect( () => store.addComponent( root, 'unknown', 'Mesh' ) ).toThrow();

		} );

	} );

	describe( 'removeComponent', () => {

		it( 'should remove component', () => {

			store.removeComponent( root, 'child-1', 'Mesh' );
			const entity = store.findEntity( root, 'child-1' );
			expect( entity?.components ).toBeUndefined();

		} );

		it( 'should throw for unknown component name', () => {

			expect( () => store.removeComponent( root, 'child-1', 'Camera' ) ).toThrow();

		} );

	} );

	describe( 'setField', () => {

		it( 'should set entity field (name)', () => {

			store.setField( root, 'child-1', 'name', 'Renamed' );
			expect( store.findEntity( root, 'child-1' )?.name ).toBe( 'Renamed' );

		} );

		it( 'should set entity position', () => {

			store.setField( root, 'child-1', 'position', [ 1, 2, 3 ] );
			expect( store.findEntity( root, 'child-1' )?.pos ).toEqual( [ 1, 2, 3 ] );

		} );

		it( 'should set entity rotation', () => {

			store.setField( root, 'child-1', 'euler', [ 0.1, 0.2, 0.3 ] );
			expect( store.findEntity( root, 'child-1' )?.rot ).toEqual( [ 0.1, 0.2, 0.3 ] );

		} );

		it( 'should set entity scale', () => {

			store.setField( root, 'child-1', 'scale', [ 2, 2, 2 ] );
			expect( store.findEntity( root, 'child-1' )?.scale ).toEqual( [ 2, 2, 2 ] );

		} );

		it( 'should set component field', () => {

			store.setField( root, 'comp-1', 'geometry/type', 'Sphere' );
			const comp = store.findComponent( root, 'comp-1' );
			expect( ( comp?.component.props as any )[ 'geometry/type' ] ).toBe( 'Sphere' );

		} );

		it( 'should throw for unknown target', () => {

			expect( () => store.setField( root, 'unknown', 'x', 1 ) ).toThrow();

		} );

	} );

	describe( 'setField on component (flat key)', () => {

		it( 'should store field path as flat key', () => {

			store.setField( root, 'comp-1', 'a/b/c', 42 );
			const props = store.findComponent( root, 'comp-1' )?.component.props as any;
			expect( props[ 'a/b/c' ] ).toBe( 42 );

		} );

		it( 'should overwrite previous value', () => {

			store.setField( root, 'comp-1', 'x', 'string' );
			store.setField( root, 'comp-1', 'x', 42 );
			const props = store.findComponent( root, 'comp-1' )?.component.props as any;
			expect( props[ 'x' ] ).toBe( 42 );

		} );

	} );

	describe( 'searchEntities', () => {

		it( 'should find entities by name (case-insensitive)', () => {

			const results = store.searchEntities( root, 'child' );
			expect( results.length ).toBe( 2 );

		} );

		it( 'should return empty for no match', () => {

			const results = store.searchEntities( root, 'nonexistent' );
			expect( results.length ).toBe( 0 );

		} );

		it( 'should include component names in results', () => {

			const results = store.searchEntities( root, 'child1' );
			expect( results[ 0 ].components ).toContain( 'Mesh' );

		} );

	} );

	describe( 'buildSceneTree', () => {

		it( 'should build tree response with defaults', () => {

			const tree = store.buildSceneTree( root );
			expect( tree.uuid ).toBe( 'root-uuid' );
			expect( tree.position ).toEqual( { x: 0, y: 0, z: 0 } );
			expect( tree.children.length ).toBe( 2 );

		} );

		it( 'should include component info', () => {

			const tree = store.buildSceneTree( root );
			const child1 = tree.children[ 0 ];
			expect( child1.components[ 0 ].name ).toBe( 'Mesh' );

		} );

		it( 'should use entity pos/rot/scale when set', () => {

			root.pos = [ 1, 2, 3 ];
			root.rot = [ 0.1, 0.2, 0.3 ];
			root.scale = [ 2, 2, 2 ];
			const tree = store.buildSceneTree( root );
			expect( tree.position ).toEqual( { x: 1, y: 2, z: 3 } );
			expect( tree.euler ).toEqual( { x: 0.1, y: 0.2, z: 0.3 } );
			expect( tree.scale ).toEqual( { x: 2, y: 2, z: 2 } );

		} );

	} );

	describe( 'serializeEntity', () => {

		it( 'should serialize entity detail', () => {

			const detail = store.serializeEntity( root, 'child-1' );
			expect( detail.name ).toBe( 'Child1' );
			expect( detail.parentUuid ).toBe( 'root-uuid' );
			expect( detail.components[ 0 ].name ).toBe( 'Mesh' );

		} );

		it( 'should throw for unknown entity', () => {

			expect( () => store.serializeEntity( root, 'unknown' ) ).toThrow();

		} );

		it( 'should return null parentUuid for root', () => {

			const detail = store.serializeEntity( root, 'root-uuid' );
			expect( detail.parentUuid ).toBeNull();

		} );

	} );

} );
