import { Serializable } from 'maxpower';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe( 'Serializable', () => {

	let s: Serializable;

	beforeEach( () => {

		s = new Serializable();

	} );

	describe( 'uuid', () => {

		it( 'should generate a uuid on construction', () => {

			expect( s.uuid ).toBeTruthy();
			expect( typeof s.uuid ).toBe( 'string' );

		} );

		it( 'should generate unique uuids', () => {

			const s2 = new Serializable();
			expect( s.uuid ).not.toBe( s2.uuid );

		} );

	} );

	describe( 'field / serialize / deserialize', () => {

		it( 'should register and serialize a field', () => {

			let value = 42;
			s.field( 'myField', () => value, ( v: number ) => {

				value = v;

			} );
			const result = s.serialize();
			expect( result[ 'myField' ] ).toBe( 42 );

		} );

		it( 'should deserialize and update value', () => {

			let value = 42;
			s.field( 'myField', () => value, ( v: number ) => {

				value = v;

			} );
			s.deserialize( { 'myField': 100 } );
			expect( value ).toBe( 100 );

		} );

		it( 'should skip noExport fields in export mode', () => {

			let v1 = 1;
			s.field( 'visible', () => v1, ( v: number ) => {

				v1 = v;

			} );
			s.field( 'internal', () => 2, { noExport: true } );
			const result = s.serialize( { mode: 'export' } );
			expect( result[ 'visible' ] ).toBe( 1 );
			expect( result[ 'internal' ] ).toBeUndefined();

		} );

		it( 'should ignore unknown keys on deserialize', () => {

			let value = 42;
			s.field( 'myField', () => value, ( v: number ) => {

				value = v;

			} );
			s.deserialize( { 'unknownKey': 999 } );
			expect( value ).toBe( 42 );

		} );

		it( 'should mark field as readOnly when no setter given', () => {

			s.field( 'readOnly', () => 'hello' );
			const opt = s.getFieldOpt( 'readOnly' );
			expect( opt?.readOnly ).toBe( true );
			expect( opt?.noExport ).toBe( true );

		} );

		it( 'should serialize multiple fields', () => {

			let a = 1, b = 'test';
			s.field( 'a', () => a, ( v: number ) => {

				a = v;

			} );
			s.field( 'b', () => b, ( v: string ) => {

				b = v;

			} );
			const result = s.serialize();
			expect( result[ 'a' ] ).toBe( 1 );
			expect( result[ 'b' ] ).toBe( 'test' );

		} );

		it( 'should normalize leading slash in path', () => {

			let value = 10;
			s.field( '/leadingSlash', () => value, ( v: number ) => {

				value = v;

			} );
			const result = s.serialize();
			expect( result[ 'leadingSlash' ] ).toBe( 10 );

		} );

	} );

	describe( 'fieldDir', () => {

		it( 'should create nested fields', () => {

			let x = 1, y = 2;
			const dir = s.fieldDir( 'transform' );
			dir.field( 'x', () => x, ( v: number ) => {

				x = v;

			} );
			dir.field( 'y', () => y, ( v: number ) => {

				y = v;

			} );
			const result = s.serialize();
			expect( result[ 'transform/x' ] ).toBe( 1 );
			expect( result[ 'transform/y' ] ).toBe( 2 );

		} );

		it( 'should support nested dirs', () => {

			let v = 10;
			const outer = s.fieldDir( 'a' );
			const inner = outer.dir( 'b' );
			inner.field( 'c', () => v, ( val: number ) => {

				v = val;

			} );
			const result = s.serialize();
			expect( result[ 'a/b/c' ] ).toBe( 10 );

		} );

	} );

	describe( 'serializeToDirectory', () => {

		it( 'should convert flat fields to tree structure', () => {

			let gType = 'Cube', gSize = 1;
			s.field( 'geometry/type', () => gType, ( v: string ) => {

				gType = v;

			} );
			s.field( 'geometry/size', () => gSize, ( v: number ) => {

				gSize = v;

			} );
			const dir = s.serializeToDirectory();
			expect( dir.type ).toBe( 'folder' );

			if ( dir.type === 'folder' ) {

				expect( dir.childs[ 'geometry' ].type ).toBe( 'folder' );

				if ( dir.childs[ 'geometry' ].type === 'folder' ) {

					const typeChild = dir.childs[ 'geometry' ].childs[ 'type' ];
					expect( typeChild.type ).toBe( 'value' );

					if ( typeChild.type === 'value' ) {

						expect( typeChild.value ).toBe( 'Cube' );

					}

				}

			}

		} );

		it( 'should handle single-level field', () => {

			let v = 99;
			s.field( 'simple', () => v, ( val: number ) => {

				v = val;

			} );
			const dir = s.serializeToDirectory();

			if ( dir.type === 'folder' ) {

				const child = dir.childs[ 'simple' ];
				expect( child.type ).toBe( 'value' );

				if ( child.type === 'value' ) {

					expect( child.value ).toBe( 99 );

				}

			}

		} );

	} );

	describe( 'setField / getField', () => {

		it( 'should set and get field value', () => {

			let value = 0;
			s.field( 'x', () => value, ( v: number ) => {

				value = v;

			} );
			s.setField( 'x', 42 );
			expect( value ).toBe( 42 );
			expect( s.getField( 'x' ) ).toBe( 42 );

		} );

		it( 'should return undefined for non-existent field', () => {

			expect( s.getField( 'nonexistent' ) ).toBeUndefined();

		} );

	} );

	describe( 'removeField', () => {

		it( 'should remove a registered field', () => {

			let v = 1;
			s.field( 'temp', () => v, ( val: number ) => {

				v = val;

			} );
			s.removeField( 'temp' );
			const result = s.serialize();
			expect( result[ 'temp' ] ).toBeUndefined();

		} );

	} );

	describe( 'noticeField', () => {

		it( 'should emit event on field update via setter', () => {

			let value = 0;
			const cb = vi.fn();
			s.field( 'x', () => value, ( v: number ) => {

				value = v;

			} );
			s.on( 'fields/update', cb );
			s.setField( 'x', 5 );
			expect( cb ).toHaveBeenCalled();

		} );

		it( 'should emit path-specific event', () => {

			let value = 0;
			const cb = vi.fn();
			s.field( 'x', () => value, ( v: number ) => {

				value = v;

			} );
			s.on( 'fields/update/x', cb );
			s.setField( 'x', 5 );
			expect( cb ).toHaveBeenCalled();

		} );

	} );

	describe( 'restoreUUID', () => {

		it( 'should restore uuid', () => {

			const oldUuid = s.uuid;
			s.restoreUUID( 'custom-uuid-123' );
			expect( s.uuid ).toBe( 'custom-uuid-123' );
			expect( s.uuid ).not.toBe( oldUuid );

		} );

	} );

} );
