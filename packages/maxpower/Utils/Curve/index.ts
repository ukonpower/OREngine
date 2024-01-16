import * as GLP from 'glpower';

const N = 2;

export type CurvePoint = GLP.IVector3 & {
	weight?: number
}

export class Curve extends GLP.EventEmitter {

	public points: CurvePoint[];
	private knot: number[];

	constructor() {

		super();

		this.points = [];
		this.knot = [];

	}

	public setPoints( points: CurvePoint[] ) {

		this.points = [ ...points ];

		const knotLength = this.points.length + N + 1;

		this.knot.length = knotLength;

		for ( let i = 0; i < N + 1; i ++ ) {

			this.knot[ i ] = 0;
			this.knot[ knotLength - 1 - i ] = 1;

		}

		const n = knotLength - ( N + 1 ) * 2;

		for ( let i = 0; i < n; i ++ ) {

			this.knot[ i + N + 1 ] = ( i + 1 ) / ( n + 1 );

		}

	}

	private basis( u: number, j: number, k: number ): number {

		if ( k == 0 ) {

			if ( this.knot[ j ] <= u && u < this.knot[ j + 1 ] ) {

				return 1;

			}

			return 0;

		}

		const b1b = ( this.knot[ j + k ] - this.knot[ j ] );
		const b1 = b1b === 0.0 ? 0 : ( u - this.knot[ j ] ) / b1b;

		const b2b = ( this.knot[ j + k + 1 ] - this.knot[ j + 1 ] );
		const b2 = b2b === 0.0 ? 0 : ( this.knot[ j + k + 1 ] - u ) / b2b;

		return b1 * this.basis( u, j, k - 1 ) + b2 * this.basis( u, j + 1, k - 1 );

	}

	public getPosition( t: number ) {

		t *= 0.9999;

		const position: GLP.IVector3 = { x: 0, y: 0, z: 0 };

		let weight = 0.0;

		for ( let i = 0; i < this.points.length; i ++ ) {

			const p = this.points[ i ];

			const w = this.basis( t, i, N );

			position.x += p.x * w;
			position.y += p.y * w;
			position.z += p.z * w;

			weight += ( p.weight ?? 1.0 ) * w;

		}

		return { position, weight };

	}

	public getPoint( t: number ) {

		const { position, weight } = this.getPosition( t );

		const d = 0.001;

		const p1 = this.getPosition( Math.min( 1.0, t + d ) );
		const p2 = this.getPosition( Math.max( 0.0, t - d ) );

		const tangent = new GLP.Vector().copy( p1.position ).sub( p2.position ).normalize();
		const bitangent = tangent.clone().cross( { x: 0.0, y: - 1.0, z: 0.0 } ).normalize();
		const normal = tangent.clone().cross( bitangent ).normalize();

		const matrix = new GLP.Matrix( [
			tangent.x, tangent.y, tangent.z, 0,
			bitangent.x, bitangent.y, bitangent.z, 0,
			normal.x, normal.y, normal.z, 0,
			0, 0, 0, 1.0
		] );

		return {
			position,
			weight,
			matrix
		};

	}

	public getFrenetFrames( segments: number ) {

		const points: {position: GLP.IVector3, weight: number}[] = [];
		const normals: GLP.Vector[] = [];
		const bitangents: GLP.Vector[] = [];
		const tangents: GLP.Vector[] = [];
		const matrices: GLP.Matrix[] = [];

		for ( let i = 0; i <= segments; i ++ ) {

			const t = i / segments;

			const d = 0.001;
			const p2 = this.getPosition( Math.min( t + d, 1.0 ) );
			const p3 = this.getPosition( Math.max( t - d, 0.0 ) );

			tangents[ i ] = new GLP.Vector().copy( p2.position ).sub( p3.position ).normalize();
			points[ i ] = this.getPosition( t );

		}

		// https://github.com/mrdoob/three.js/blob/master/src/extras/core/Curve.js#L286-L311

		const n = new GLP.Vector( 0.0, 1.0, 0.0 );
		let min = Number.MAX_VALUE;
		const tx = Math.abs( tangents[ 0 ].x );
		const ty = Math.abs( tangents[ 0 ].y );
		const tz = Math.abs( tangents[ 0 ].z );

		if ( tx <= min ) {

			min = tx;
			n.set( 1, 0, 0 );

		}

		if ( ty <= min ) {

			min = ty;
			n.set( 0, 1, 0 );

		}

		if ( tz <= min ) {

			n.set( 0, 0, 1 );

		}

		// https://www.youtube.com/watch?v=5LedteSEgOE

		const vec = new GLP.Vector();
		vec.copy( n ).cross( tangents[ 0 ] ).normalize();

		normals[ 0 ] = new GLP.Vector().copy( tangents[ 0 ] ).cross( vec ).normalize();

		for ( let i = 0; i < segments; i ++ ) {

			bitangents[ i ] = new GLP.Vector().copy( tangents[ i ] ).cross( tangents[ i + 1 ] );

			const len = bitangents[ i ].length();

			if ( len == 0.0 ) {

				normals[ i + 1 ] = normals[ i ].clone();

			} else {

				bitangents[ i ].normalize();

				let v = new GLP.Vector().copy( tangents[ i ] ).dot( tangents[ i + 1 ] );
				v = Math.min( 1.0, Math.max( - 1.0, v ) );
				const theta = Math.min( 1.0, Math.max( - 1.0, Math.acos( v ) ) );

				normals[ i + 1 ] = normals[ i ].clone().applyMatrix3( new GLP.Matrix().makeRotationAxis( bitangents[ i ], - theta ) );


			}

			bitangents[ i ].copy( tangents[ i ] ).cross( normals[ i ] ).normalize();

			matrices[ i ] = new GLP.Matrix( [
				tangents[ i ].x, tangents[ i ].y, tangents[ i ].z, 0,
				bitangents[ i ].x, bitangents[ i ].y, bitangents[ i ].z, 0,
				normals[ i ].x, normals[ i ].y, normals[ i ].z, 0,
				0, 0, 0, 1.0
			] );

		}

		return {
			points,
			normals,
			bitangents,
			tangents,
			matrices
		};

	}

}
