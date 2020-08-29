import { Matrix4 } from "../../src";

describe( 'Matrix4', () => {

	let matrix: Matrix4;

	beforeEach( () => {

		matrix = new Matrix4(
			0, 1, 2, 3,
			4, 5, 6, 7,
			8, 9, 10, 11,
			12, 13, 14, 15
		);

	} );

	describe( 'set()', () => {

		test( 'set', () => {

			matrix.set(
				15, 14, 13, 12,
				11, 10, 9, 8,
				7, 6, 5, 4,
				3, 2, 1, 0
			);

			expect( matrix.elm[ 0 ] ).toBe( 15 );
			expect( matrix.elm[ 4 ] ).toBe( 14 );
			expect( matrix.elm[ 8 ] ).toBe( 13 );
			expect( matrix.elm[ 12 ] ).toBe( 12 );
			expect( matrix.elm[ 1 ] ).toBe( 11 );
			expect( matrix.elm[ 5 ] ).toBe( 10 );
			expect( matrix.elm[ 9 ] ).toBe( 9 );
			expect( matrix.elm[ 13 ] ).toBe( 8 );
			expect( matrix.elm[ 2 ] ).toBe( 7 );
			expect( matrix.elm[ 6 ] ).toBe( 6 );
			expect( matrix.elm[ 10 ] ).toBe( 5 );
			expect( matrix.elm[ 14 ] ).toBe( 4 );
			expect( matrix.elm[ 3 ] ).toBe( 3 );
			expect( matrix.elm[ 7 ] ).toBe( 2 );
			expect( matrix.elm[ 11 ] ).toBe( 1 );
			expect( matrix.elm[ 15 ] ).toBe( 0 );

		} );

	} );

	describe( 'copy()', () => {

		test( 'copy', () => {

			let m = new Matrix4(
				15, 14, 13, 12,
				11, 10, 9, 8,
				7, 6, 5, 4,
				3, 2, 1, 0
			);

			matrix.copy( m );

			expect( matrix.elm[ 0 ] ).toBe( 15 );
			expect( matrix.elm[ 4 ] ).toBe( 14 );
			expect( matrix.elm[ 8 ] ).toBe( 13 );
			expect( matrix.elm[ 12 ] ).toBe( 12 );
			expect( matrix.elm[ 1 ] ).toBe( 11 );
			expect( matrix.elm[ 5 ] ).toBe( 10 );
			expect( matrix.elm[ 9 ] ).toBe( 9 );
			expect( matrix.elm[ 13 ] ).toBe( 8 );
			expect( matrix.elm[ 2 ] ).toBe( 7 );
			expect( matrix.elm[ 6 ] ).toBe( 6 );
			expect( matrix.elm[ 10 ] ).toBe( 5 );
			expect( matrix.elm[ 14 ] ).toBe( 4 );
			expect( matrix.elm[ 3 ] ).toBe( 3 );
			expect( matrix.elm[ 7 ] ).toBe( 2 );
			expect( matrix.elm[ 11 ] ).toBe( 1 );
			expect( matrix.elm[ 15 ] ).toBe( 0 );

		} );

	} );

	describe( 'clone()', () => {

		test( 'clone', () => {

			let m = matrix.clone();

			expect( m.elm[ 0 ] ).toBe( 0 );
			expect( m.elm[ 4 ] ).toBe( 1 );
			expect( m.elm[ 8 ] ).toBe( 2 );
			expect( m.elm[ 12 ] ).toBe( 3 );
			expect( m.elm[ 1 ] ).toBe( 4 );
			expect( m.elm[ 5 ] ).toBe( 5 );
			expect( m.elm[ 9 ] ).toBe( 6 );
			expect( m.elm[ 13 ] ).toBe( 7 );
			expect( m.elm[ 2 ] ).toBe( 8 );
			expect( m.elm[ 6 ] ).toBe( 9 );
			expect( m.elm[ 10 ] ).toBe( 10 );
			expect( m.elm[ 14 ] ).toBe( 11 );
			expect( m.elm[ 3 ] ).toBe( 12 );
			expect( m.elm[ 7 ] ).toBe( 13 );
			expect( m.elm[ 11 ] ).toBe( 14 );
			expect( m.elm[ 15 ] ).toBe( 15 );

		} );

	} );


	describe( 'identity()', () => {

		test( 'identity', () => {

			matrix.identity();

			expect( matrix.elm[ 0 ] ).toBe( 1 );
			expect( matrix.elm[ 4 ] ).toBe( 0 );
			expect( matrix.elm[ 8 ] ).toBe( 0 );
			expect( matrix.elm[ 12 ] ).toBe( 0 );
			expect( matrix.elm[ 1 ] ).toBe( 0 );
			expect( matrix.elm[ 5 ] ).toBe( 1 );
			expect( matrix.elm[ 9 ] ).toBe( 0 );
			expect( matrix.elm[ 13 ] ).toBe( 0 );
			expect( matrix.elm[ 2 ] ).toBe( 0 );
			expect( matrix.elm[ 6 ] ).toBe( 0 );
			expect( matrix.elm[ 10 ] ).toBe( 1 );
			expect( matrix.elm[ 14 ] ).toBe( 0 );
			expect( matrix.elm[ 3 ] ).toBe( 0 );
			expect( matrix.elm[ 7 ] ).toBe( 0 );
			expect( matrix.elm[ 11 ] ).toBe( 0 );
			expect( matrix.elm[ 15 ] ).toBe( 1 );

		} );

	} );

	describe( 'multiplyMatrix4()', () => {

		test( 'multiplyMatrix4', () => {

			let mat = new Matrix4(
				15, 14, 13, 12,
				11, 10, 9, 8,
				7, 6, 5, 4,
				3, 2, 1, 0
			);

			matrix.multiplyMatrix4( mat );

			expect( matrix.elm[ 0 ] ).toBe( 34 );
			expect( matrix.elm[ 4 ] ).toBe( 28 );
			expect( matrix.elm[ 8 ] ).toBe( 22 );
			expect( matrix.elm[ 12 ] ).toBe( 16 );
			expect( matrix.elm[ 1 ] ).toBe( 178 );
			expect( matrix.elm[ 5 ] ).toBe( 156 );
			expect( matrix.elm[ 9 ] ).toBe( 134 );
			expect( matrix.elm[ 13 ] ).toBe( 112 );
			expect( matrix.elm[ 2 ] ).toBe( 322 );
			expect( matrix.elm[ 6 ] ).toBe( 284 );
			expect( matrix.elm[ 10 ] ).toBe( 246 );
			expect( matrix.elm[ 14 ] ).toBe( 208 );
			expect( matrix.elm[ 3 ] ).toBe( 466 );
			expect( matrix.elm[ 7 ] ).toBe( 412 );
			expect( matrix.elm[ 11 ] ).toBe( 358 );
			expect( matrix.elm[ 15 ] ).toBe( 304 );

		} );

	} );

} );
