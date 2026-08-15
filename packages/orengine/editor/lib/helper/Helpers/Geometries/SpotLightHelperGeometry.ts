import { Geometry } from 'maxpower';

export class SpotLightHelperGeometry extends Geometry {

	constructor() {

		super();

		this.update( Math.PI / 4, 5 );

	}

	public update( angle: number, distance: number ) {

		const radius = Math.tan( angle / 2 ) * distance;
		const segments = 16;
		const positions: number[] = [];

		for ( let i = 0; i < segments; i ++ ) {

			const a1 = ( i / segments ) * Math.PI * 2;
			const a2 = ( ( i + 1 ) / segments ) * Math.PI * 2;
			positions.push(
				Math.cos( a1 ) * radius, Math.sin( a1 ) * radius, - distance,
				Math.cos( a2 ) * radius, Math.sin( a2 ) * radius, - distance,
			);

		}

		for ( let i = 0; i < 4; i ++ ) {

			const a = ( i / 4 ) * Math.PI * 2;
			positions.push(
				0, 0, 0,
				Math.cos( a ) * radius, Math.sin( a ) * radius, - distance,
			);

		}

		const posArray = new Float32Array( positions );
		this.setAttribute( 'position', posArray, 3 );
		this.setAttribute( 'normal', new Float32Array( posArray.length ).fill( 0 ), 3 );
		this.requestUpdate();

	}

}
