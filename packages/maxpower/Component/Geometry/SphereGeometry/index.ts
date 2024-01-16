import { Vector } from "glpower";
import { Geometry } from "..";

export class SphereGeometry extends Geometry {

	constructor( radius: number = 0.5, widthSegments: number = 20, heightSegments: number = 10 ) {

		super();

		const posArray = [];
		const normalArray = [];
		const uvArray = [];
		const indexArray = [];

		for ( let i = 0; i <= heightSegments; i ++ ) {

			const thetaI = i / heightSegments * Math.PI;

			const segments = ( i != 0 && i != heightSegments ) ? widthSegments : widthSegments;

			for ( let j = 0; j < segments; j ++ ) {

				// pos

				const thetaJ = j / segments * Math.PI * 2.0;
				const widthRadius = Math.sin( thetaI ) * radius;

				const x = Math.cos( thetaJ ) * widthRadius;
				const y = - Math.cos( thetaI ) * radius;
				const z = - Math.sin( thetaJ ) * widthRadius;

				posArray.push( x, y, z );

				// uv

				uvArray.push(
					j / segments,
					i / heightSegments
				);

				//normal

				const normal = new Vector( x, y, z ).normalize();

				normalArray.push( normal.x, normal.y, normal.z );

				// index

				indexArray.push(
					i * widthSegments + j,
					i * widthSegments + ( j + 1 ) % widthSegments,
					( i + 1 ) * widthSegments + ( j + 1 ) % widthSegments,

					i * widthSegments + j,
					( i + 1 ) * widthSegments + ( j + 1 ) % widthSegments,
					( i + 1 ) * widthSegments + j,
				);

			}

		}

		for ( let i = 0; i < indexArray.length; i ++ ) {

			// kuso
			indexArray[ i ] = Math.min( posArray.length / 3 - 1, indexArray[ i ] );

		}

		this.setAttribute( 'position', new Float32Array( posArray ), 3 );
		this.setAttribute( 'normal', new Float32Array( normalArray ), 3 );
		this.setAttribute( 'uv', new Float32Array( uvArray ), 2 );
		this.setAttribute( 'index', new Uint16Array( indexArray ), 1 );

	}

}
