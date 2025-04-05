import { Vector } from "glpower";

import { Geometry } from "..";

interface SphereGeometryParam {
	radius?: number,
	widthSegments?: number,
	heightSegments?: number
}

export class SphereGeometry extends Geometry {

	constructor( param?: SphereGeometryParam ) {

		super();

		const posArray = [];
		const normalArray = [];
		const uvArray = [];
		const indexArray = [];

		const { radius, widthSegments, heightSegments } = {
			radius: 0.5,
			widthSegments: 8,
			heightSegments: 8,
			...param
		};

		for ( let i = 0; i <= heightSegments; i ++ ) {

			const thetaI = i / heightSegments * Math.PI;

			for ( let j = 0; j <= widthSegments; j ++ ) {

				// pos

				const thetaJ = j / widthSegments * Math.PI * 2.0;
				const widthRadius = Math.sin( thetaI ) * radius;

				const x = Math.cos( thetaJ ) * widthRadius;
				const y = - Math.cos( thetaI ) * radius;
				const z = - Math.sin( thetaJ ) * widthRadius;

				posArray.push( x, y, z );

				// uv

				uvArray.push(
					j / widthSegments,
					i / heightSegments
				);

				//normal

				const normal = new Vector( x, y, z ).normalize();

				normalArray.push( normal.x, normal.y, normal.z );

				// index

				if ( j < widthSegments && i < heightSegments ) {

					const row = widthSegments + 1;

					indexArray.push(
						i * row + j,
						i * row + ( j + 1 ) % row,
						( i + 1 ) * row + ( j + 1 ) % row,

						i * row + j,
						( i + 1 ) * row + ( j + 1 ) % row,
						( i + 1 ) * row + j,
					);

				}

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
