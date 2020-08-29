export class Matrix4 {

	public elm: number[];

	/**
	 *Creates an instance of Matrix4.
	 * @param {number} m11
	 * @param {number} m12
	 * @param {number} m13
	 * @param {number} m14
	 * @param {number} m21
	 * @param {number} m22
	 * @param {number} m23
	 * @param {number} m24
	 * @param {number} m31
	 * @param {number} m32
	 * @param {number} m33
	 * @param {number} m34
	 * @param {number} m41
	 * @param {number} m42
	 * @param {number} m43
	 * @param {number} m44
	 * @memberof Matrix4
	 */
	constructor(
		m11?: number, m12?: number, m13?: number, m14?: number,
		m21?: number, m22?: number, m23?: number, m24?: number,
		m31?: number, m32?: number, m33?: number, m34?: number,
		m41?: number, m42?: number, m43?: number, m44?: number
	) {

		this.elm = new Array( 16 );

		this.set(
			m11, m12, m13, m14,
			m21, m22, m23, m24,
			m31, m32, m33, m34,
			m41, m42, m43, m44
		);

	}

	/**
	 *Copy the input matrix
	 *
	 * @param {Matrix4} mat
	 * @returns {Matrix4}
	 * @memberof Matrix4
	 */
	public copy( mat: Matrix4 ) {

		this.elm = mat.elm.concat();

		return this;

	}

	/**
	 *Clone this matrix
	 *
	 * @returns {Matrix4}
	 * @memberof Matrix4
	 */
	public clone() {

		return new Matrix4().copy( this );

	}

	/**
	 *Set identity matrix
	 *
	 * @returns
	 * @memberof Matrix4
	 */
	public identity() {

		this.elm = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		];

		return this;

	}

	/**
	 *Multiply the Matrix4
	 *
	 * @param {Matrix4} mat
	 * @memberof Matrix4
	 */
	public multiplyMatrix4( mat: Matrix4 ) {

		this.multiply( this.elm, mat.elm );

	}

	/**
	 *Multiply the matrix elements
	 *
	 * @private
	 * @param {number[]} a - elements of matrix a
	 * @param {number[]} b - elements of matrix b
	 * @returns {number[]} elements of matrix
	 * @memberof Matrix4
	 */
	private multiply( a: number[], b: number[] ) {

		let a11 = a[ 0 ], a12 = a[ 4 ], a13 = a[ 8 ], a14 = a[ 12 ],
			a21 = a[ 1 ], a22 = a[ 5 ], a23 = a[ 9 ], a24 = a[ 13 ],
			a31 = a[ 2 ], a32 = a[ 6 ], a33 = a[ 10 ], a34 = a[ 14 ],
			a41 = a[ 3 ], a42 = a[ 7 ], a43 = a[ 11 ], a44 = a[ 15 ];

		let b11 = b[ 0 ], b12 = b[ 4 ], b13 = b[ 8 ], b14 = b[ 12 ],
			b21 = b[ 1 ], b22 = b[ 5 ], b23 = b[ 9 ], b24 = b[ 13 ],
			b31 = b[ 2 ], b32 = b[ 6 ], b33 = b[ 10 ], b34 = b[ 14 ],
			b41 = b[ 3 ], b42 = b[ 7 ], b43 = b[ 11 ], b44 = b[ 15 ];

		this.elm[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		this.elm[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		this.elm[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		this.elm[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		this.elm[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		this.elm[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		this.elm[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		this.elm[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		this.elm[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		this.elm[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		this.elm[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		this.elm[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		this.elm[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		this.elm[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		this.elm[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		this.elm[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this.elm;

	}

	/**
	 *Sets the elements of the matrix
	 *
	 * @param {number} [m11]
	 * @param {number} [m12]
	 * @param {number} [m13]
	 * @param {number} [m14]
	 * @param {number} [m21]
	 * @param {number} [m22]
	 * @param {number} [m23]
	 * @param {number} [m24]
	 * @param {number} [m31]
	 * @param {number} [m32]
	 * @param {number} [m33]
	 * @param {number} [m34]
	 * @param {number} [m41]
	 * @param {number} [m42]
	 * @param {number} [m43]
	 * @param {number} [m44]
	 * @returns {Matrix4}
	 * @memberof Matrix4
	 */
	public set(
		m11?: number, m12?: number, m13?: number, m14?: number,
		m21?: number, m22?: number, m23?: number, m24?: number,
		m31?: number, m32?: number, m33?: number, m34?: number,
		m41?: number, m42?: number, m43?: number, m44?: number
	 ) {

		this.elm[ 0 ] = m11 || 0;
		this.elm[ 1 ] = m21 || 0;
		this.elm[ 2 ] = m31 || 0;
		this.elm[ 3 ] = m41 || 0;

		this.elm[ 4 ] = m12 || 0;
		this.elm[ 5 ] = m22 || 0;
		this.elm[ 6 ] = m32 || 0;
		this.elm[ 7 ] = m42 || 0;

		this.elm[ 8 ] = m13 || 0;
		this.elm[ 9 ] = m23 || 0;
		this.elm[ 10 ] = m33 || 0;
		this.elm[ 11 ] = m43 || 0;

		this.elm[ 12 ] = m14 || 0;
		this.elm[ 13 ] = m24 || 0;
		this.elm[ 14 ] = m34 || 0;
		this.elm[ 15 ] = m44 || 0;

		return this;

	}

}
