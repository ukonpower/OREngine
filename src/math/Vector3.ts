export class Vector3 {

	public x: number;
	public y: number;
	public z: number;

	constructor( x: number, y: number, z: number ) {

		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

	}

	public add( v: Vector3 ) {

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	}

	public addScaler( n: number ) {

		this.x += n;
		this.y += n;
		this.z += n;

		return this;

	}

	public sub( v: Vector3 ) {

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	}

	public subScaler( n: number ) {

		this.x -= n;
		this.y -= n;
		this.z -= n;

		return this;

	}

	public multiply( v: Vector3 ) {

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	}

	public multiplyScaler( n: number ) {

		this.x *= n;
		this.y *= n;
		this.z *= n;

		return this;

	}

	public divide( v: Vector3 ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	public divideScaler( n: number ) {

		this.x /= n;
		this.y /= n;
		this.z /= n;

		return this;

	}


	public copy( v: Vector3 ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	}

	public clone() {

		return new Vector3( this.x, this.y, this.z );

	}


}
