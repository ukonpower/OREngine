import { Vector2 } from "../../src";

describe( 'Vector2', () => {

	let vector: Vector2;

	beforeEach( () => {

		vector = new Vector2( 0, 0 );

	} );

	describe( 'set()', () => {

		test( 'set', () => {

			vector.set( 1, 2 );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 2 );

		} );

	} );

	describe( 'copy()', () => {

		test( 'copy', () => {

			let v = new Vector2( 1, 2 );

			vector.copy( v );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 2 );

		} );

	} );

	describe( 'clone()', () => {

		test( 'clone', () => {

			vector.set( 1, 2 );

			let v = vector.clone();

			expect( v.x ).toBe( 1 );
			expect( v.y ).toBe( 2 );

		} );

	} );

	describe( 'add()', () => {

		test( 'add', () => {

			vector.add( new Vector2( 1, 2 ) );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 2 );

		} );

	} );

	describe( 'addScaler()', () => {

		test( 'addScaler', () => {

			vector.addScaler( 1 );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 1 );

		} );

	} );

	describe( 'sub()', () => {

		test( 'sub', () => {

			vector.sub( new Vector2( 1, 2 ) );

			expect( vector.x ).toBe( - 1 );
			expect( vector.y ).toBe( - 2 );

		} );

	} );

	describe( 'subScaler()', () => {

		test( 'subScaler', () => {

			vector.subScaler( 1 );

			expect( vector.x ).toBe( - 1 );
			expect( vector.y ).toBe( - 1 );

		} );

	} );

	describe( 'multiply()', () => {

		test( 'multiply', () => {

			vector.set( 1, 2 );

			vector.multiply( new Vector2( 1, 2 ) );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 4 );

		} );

	} );

	describe( 'multiplyScaler()', () => {

		test( 'multiplyScaler', () => {

			vector.set( 1, 2 );

			vector.multiplyScaler( 2 );

			expect( vector.x ).toBe( 2 );
			expect( vector.y ).toBe( 4 );

		} );

	} );

	describe( 'divide()', () => {

		test( 'divide', () => {

			vector.set( 1, 2 );

			vector.divide( new Vector2( 1, 2 ) );

			expect( vector.x ).toBe( 1 );
			expect( vector.y ).toBe( 1 );
			expect( vector.y ).toBe( 1 );

		} );

	} );

	describe( 'divideScaler()', () => {

		test( 'divideScaler', () => {

			vector.set( 1, 2 );

			vector.divideScaler( 2 );

			expect( vector.x ).toBe( 1 / 2 );
			expect( vector.y ).toBe( 2 / 2 );

		} );

	} );

} );
