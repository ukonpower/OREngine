import { Vector3 } from "../../src";

describe( 'Vector3', () => {

	let vector: Vector3;

	beforeEach( () => {

		vector = new Vector3( 0, 0, 0 );

	} );

	describe( 'set()', () => {

		test( 'set', () => {

			vector.set( 1, 2, 3 );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 2 );
			expect( vector.z ).toBe( 3 );

		} );

	} );

	describe( 'copy()', () => {

		test( 'copy', () => {

			let v = new Vector3( 1, 2, 3 );

			vector.copy( v );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 2 );
			expect( vector.z ).toBe( 3 );

		} );

	} );

	describe( 'clone()', () => {

		test( 'clone', () => {

			vector.set( 1, 2, 3 );

			let v = vector.clone();

			expect( v.x ).toBe( 1 );
			expect( v.y ).toBe( 2 );
			expect( v.z ).toBe( 3 );

		} );

	} );

	describe( 'add()', () => {

		test( 'add', () => {

			vector.add( new Vector3( 1, 2, 3 ) );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 2 );
			expect( vector.z ).toBe( 3 );

		} );

	} );

	describe( 'addScaler()', () => {

		test( 'addScaler', () => {

			vector.addScaler( 1 );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 1 );
			expect( vector.z ).toBe( 1 );

		} );

	} );

	describe( 'sub()', () => {

		test( 'sub', () => {

			vector.sub( new Vector3( 1, 2, 3 ) );

			expect( vector.x ).toBe( - 1 );
			expect( vector.y ).toBe( - 2 );
			expect( vector.z ).toBe( - 3 );

		} );

	} );

	describe( 'subScaler()', () => {

		test( 'subScaler', () => {

			vector.subScaler( 1 );

			expect( vector.x ).toBe( - 1 );
			expect( vector.y ).toBe( - 1 );
			expect( vector.z ).toBe( - 1 );

		} );

	} );

	describe( 'multiply()', () => {

		test( 'multiply', () => {

			vector.set( 1, 2, 3 );

			vector.multiply( new Vector3( 1, 2, 3 ) );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 4 );

		} );

	} );

	describe( 'multiplyScaler()', () => {

		test( 'multiplyScaler', () => {

			vector.set( 1, 2, 3 );

			vector.multiplyScaler( 2 );

			expect( vector.x ).toBe( 2 );
			expect( vector.y ).toBe( 4 );
			expect( vector.z ).toBe( 6 );

		} );

	} );

	describe( 'divide()', () => {

		test( 'divide', () => {

			vector.set( 1, 2, 3 );

			vector.divide( new Vector3( 1, 2, 3 ) );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 1 );
			expect( vector.z ).toBe( 1 );

		} );

	} );

	describe( 'divideScaler()', () => {

		test( 'divideScaler', () => {

			vector.set( 1, 2, 3 );

			vector.divideScaler( 3 );

			expect( vector.x ).toBe( 1 / 3 );
			expect( vector.y ).toBe( 2 / 3 );
			expect( vector.z ).toBe( 3 / 3 );

		} );

	} );

} );
