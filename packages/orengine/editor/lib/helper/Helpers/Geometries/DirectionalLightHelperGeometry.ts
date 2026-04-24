import { Geometry } from 'maxpower';

export class DirectionalLightHelperGeometry extends Geometry {

	constructor( size: number = 0.5 ) {

		super();

		const positions: number[] = [];
		const segments = 16;

		for ( let i = 0; i < segments; i ++ ) {

			const a1 = ( i / segments ) * Math.PI * 2;
			const a2 = ( ( i + 1 ) / segments ) * Math.PI * 2;
			positions.push(
				Math.cos( a1 ) * size, Math.sin( a1 ) * size, 0,
				Math.cos( a2 ) * size, Math.sin( a2 ) * size, 0,
			);

		}

		const lineLen = size * 2;

		for ( let i = 0; i < 4; i ++ ) {

			const a = ( i / 4 ) * Math.PI * 2;
			const x = Math.cos( a ) * size * 0.5;
			const y = Math.sin( a ) * size * 0.5;
			positions.push(
				x, y, 0,
				x, y, - lineLen,
			);

		}

		const posArray = new Float32Array( positions );
		this.setAttribute( 'position', posArray, 3 );
		this.setAttribute( 'normal', new Float32Array( posArray.length ).fill( 0 ), 3 );

	}

}
