import * as MTP from 'mathpower';

export class Ray {

	public origin: MTP.Vector;
	public direction: MTP.Vector;

	constructor( origin?: MTP.Vector, direction?: MTP.Vector ) {

		this.origin = origin || new MTP.Vector();
		this.direction = direction || new MTP.Vector( 0, 0, - 1 );

	}

	public setFromCamera( ndc: MTP.Vector, projectionMatrixInverse: MTP.Matrix, viewMatrixInverse: MTP.Matrix ): this {

		const nearPoint = new MTP.Vector( ndc.x, ndc.y, - 1, 1 )
			.applyMatrix4( projectionMatrixInverse )
			.applyMatrix4( viewMatrixInverse );

		nearPoint.x /= nearPoint.w;
		nearPoint.y /= nearPoint.w;
		nearPoint.z /= nearPoint.w;

		const farPoint = new MTP.Vector( ndc.x, ndc.y, 1, 1 )
			.applyMatrix4( projectionMatrixInverse )
			.applyMatrix4( viewMatrixInverse );

		farPoint.x /= farPoint.w;
		farPoint.y /= farPoint.w;
		farPoint.z /= farPoint.w;

		this.origin.set( nearPoint.x, nearPoint.y, nearPoint.z );

		this.direction.set(
			farPoint.x - nearPoint.x,
			farPoint.y - nearPoint.y,
			farPoint.z - nearPoint.z
		).normalize();

		return this;

	}

	public intersectAABB( min: MTP.Vector, max: MTP.Vector ): { distance: number, point: MTP.Vector } | null {

		const invDirX = 1 / this.direction.x;
		const invDirY = 1 / this.direction.y;
		const invDirZ = 1 / this.direction.z;

		let t1 = ( min.x - this.origin.x ) * invDirX;
		let t2 = ( max.x - this.origin.x ) * invDirX;

		let tmin = Math.min( t1, t2 );
		let tmax = Math.max( t1, t2 );

		t1 = ( min.y - this.origin.y ) * invDirY;
		t2 = ( max.y - this.origin.y ) * invDirY;

		tmin = Math.max( tmin, Math.min( t1, t2 ) );
		tmax = Math.min( tmax, Math.max( t1, t2 ) );

		t1 = ( min.z - this.origin.z ) * invDirZ;
		t2 = ( max.z - this.origin.z ) * invDirZ;

		tmin = Math.max( tmin, Math.min( t1, t2 ) );
		tmax = Math.min( tmax, Math.max( t1, t2 ) );

		if ( tmax < 0 || tmin > tmax ) return null;

		const t = tmin >= 0 ? tmin : tmax;

		const point = new MTP.Vector(
			this.origin.x + this.direction.x * t,
			this.origin.y + this.direction.y * t,
			this.origin.z + this.direction.z * t
		);

		return { distance: t, point };

	}

	public intersectTriangle( v0: MTP.Vector, v1: MTP.Vector, v2: MTP.Vector ): { distance: number, point: MTP.Vector } | null {

		const EPSILON = 1e-8;

		const edge1x = v1.x - v0.x;
		const edge1y = v1.y - v0.y;
		const edge1z = v1.z - v0.z;

		const edge2x = v2.x - v0.x;
		const edge2y = v2.y - v0.y;
		const edge2z = v2.z - v0.z;

		const hx = this.direction.y * edge2z - this.direction.z * edge2y;
		const hy = this.direction.z * edge2x - this.direction.x * edge2z;
		const hz = this.direction.x * edge2y - this.direction.y * edge2x;

		const a = edge1x * hx + edge1y * hy + edge1z * hz;

		if ( a > - EPSILON && a < EPSILON ) return null;

		const f = 1.0 / a;

		const sx = this.origin.x - v0.x;
		const sy = this.origin.y - v0.y;
		const sz = this.origin.z - v0.z;

		const u = f * ( sx * hx + sy * hy + sz * hz );

		if ( u < 0.0 || u > 1.0 ) return null;

		const qx = sy * edge1z - sz * edge1y;
		const qy = sz * edge1x - sx * edge1z;
		const qz = sx * edge1y - sy * edge1x;

		const v = f * ( this.direction.x * qx + this.direction.y * qy + this.direction.z * qz );

		if ( v < 0.0 || u + v > 1.0 ) return null;

		const t = f * ( edge2x * qx + edge2y * qy + edge2z * qz );

		if ( t > EPSILON ) {

			const point = new MTP.Vector(
				this.origin.x + this.direction.x * t,
				this.origin.y + this.direction.y * t,
				this.origin.z + this.direction.z * t
			);

			return { distance: t, point };

		}

		return null;

	}

}
