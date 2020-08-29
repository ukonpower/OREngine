export class Vector2 {

	public x: number;
	public y: number;

	constructor( x: number, y: number ) {

		this.set( x, y );

	}


	public set( x: number, y: number ) {

		this.x = x || 0;
		this.y = y || 0;

		return this;

	}

	public copy( v: Vector2 ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	}

	public clone() {

		return new Vector2( this.x, this.y );

	}

	public add( v: Vector2 ) {

		this.x += v.x;
		this.y += v.y;

		return this;

	}

	public addScaler( n: number ) {

		this.x += n;
		this.y += n;

		return this;

	}

	public sub( v: Vector2 ) {

		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	public subScaler( n: number ) {

		this.x -= n;
		this.y -= n;

		return this;

	}

	public multiply( v: Vector2 ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	}

	public multiplyScaler( n: number ) {

		this.x *= n;
		this.y *= n;

		return this;

	}

	public divide( v: Vector2 ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	}

	public divideScaler( n: number ) {

		this.x /= n;
		this.y /= n;

		return this;

	}

}
