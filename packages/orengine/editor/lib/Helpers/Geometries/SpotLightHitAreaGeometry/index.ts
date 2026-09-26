import { Geometry } from 'maxpower';

export class SpotLightHitAreaGeometry extends Geometry {

	constructor() {

		super();

		this.update( Math.PI / 4, 5 );

	}

	public update( angle: number, distance: number ) {

		const radius = Math.tan( angle / 2 ) * distance;
		const segments = 12;

		const positions: number[] = [ 0, 0, 0 ];

		for ( let i = 0; i < segments; i ++ ) {

			const theta = ( i / segments ) * Math.PI * 2;
			positions.push(
				Math.cos( theta ) * radius,
				Math.sin( theta ) * radius,
				- distance
			);

		}

		const indices: number[] = [];

		for ( let i = 0; i < segments; i ++ ) {

			const next = ( i + 1 ) % segments;
			indices.push( 0, i + 1, next + 1 );

		}

		for ( let i = 1; i < segments - 1; i ++ ) {

			indices.push( 1, i + 2, i + 1 );

		}

		this.setAttribute( 'position', new Float32Array( positions ), 3 );
		this.setAttribute( 'normal', new Float32Array( positions.length ).fill( 0 ), 3 );
		this.setAttribute( 'index', new Uint16Array( indices ), 1 );
		this.requestUpdate();

	}

}
