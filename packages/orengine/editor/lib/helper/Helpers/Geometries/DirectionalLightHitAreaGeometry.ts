import { Geometry } from 'maxpower';

export class DirectionalLightHitAreaGeometry extends Geometry {

	constructor( size: number = 0.5 ) {

		super();

		const lineLen = size * 2;
		const segments = 12;
		const positions: number[] = [];
		const indices: number[] = [];

		positions.push( 0, 0, 0 );

		for ( let i = 0; i < segments; i ++ ) {

			const theta = ( i / segments ) * Math.PI * 2;
			positions.push( Math.cos( theta ) * size, Math.sin( theta ) * size, 0 );

		}

		for ( let i = 0; i < segments; i ++ ) {

			const next = ( i + 1 ) % segments;
			indices.push( 0, i + 1, next + 1 );

		}

		const bottomCenter = segments + 1;
		positions.push( 0, 0, - lineLen );

		for ( let i = 0; i < segments; i ++ ) {

			const theta = ( i / segments ) * Math.PI * 2;
			positions.push( Math.cos( theta ) * size, Math.sin( theta ) * size, - lineLen );

		}

		for ( let i = 0; i < segments; i ++ ) {

			const next = ( i + 1 ) % segments;
			indices.push( bottomCenter, bottomCenter + next + 1, bottomCenter + i + 1 );

		}

		for ( let i = 0; i < segments; i ++ ) {

			const next = ( i + 1 ) % segments;
			const topA = i + 1;
			const topB = next + 1;
			const botA = bottomCenter + i + 1;
			const botB = bottomCenter + next + 1;
			indices.push( topA, botA, botB );
			indices.push( topA, botB, topB );

		}

		this.setAttribute( 'position', new Float32Array( positions ), 3 );
		this.setAttribute( 'normal', new Float32Array( positions.length ).fill( 0 ), 3 );
		this.setAttribute( 'index', new Uint16Array( indices ), 1 );

	}

}
