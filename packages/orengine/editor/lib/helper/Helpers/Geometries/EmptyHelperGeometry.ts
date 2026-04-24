import { Geometry } from 'maxpower';

export class EmptyHelperGeometry extends Geometry {

	constructor( size: number = 0.3 ) {

		super();

		const s = size / 2;

		const posArray = new Float32Array( [
			- s, 0, 0, s, 0, 0,
			0, - s, 0, 0, s, 0,
			0, 0, - s, 0, 0, s,
		] );

		this.setAttribute( 'position', posArray, 3 );
		this.setAttribute( 'normal', new Float32Array( posArray.length ).fill( 0 ), 3 );

	}

}
