import * as GLP from 'glpower';

import { Geometry } from "..";
import { ComponentParams } from '../..';
import { Curve } from "../../../Utils/Curve";

interface CurveGeometryParams extends ComponentParams{
	curve?: Curve,
	radius?: number,
	curveSegments?: number,
	radSegments?: number
}

export class CurveGeometry extends Geometry {

	constructor( params?: CurveGeometryParams ) {

		super( params );

		const posArray: number[] = [];
		const normalArray: number[] = [];
		const uvArray: number[] = [];
		const indexArray: number[] = [];

		const { curve, radius, radSegments } = {
			curve: new Curve(),
			radius: 1,
			radSegments: 8,
			...params
		};

		const curveSegments = ( params && params.curveSegments || 24 ) - 1;

		const frenet = curve.getFrenetFrames( curveSegments + 1 );

		for ( let i = 0; i <= curveSegments; i ++ ) {

			const { position: pos, weight } = curve.getPoint( i / curveSegments );
			const r = radius * weight;

			const N = frenet.normals[ i ];
			const B = frenet.bitangents[ i ];

			for ( let j = 0; j < radSegments; j ++ ) {

				const theta = Math.PI * 2.0 / radSegments * j;

				if ( i <= curveSegments ) {

					const sin = Math.sin( theta );
					const cos = - Math.cos( theta );

					// normal

					const vec = new GLP.Vector();
					vec.x = ( cos * N.x + sin * B.x );
					vec.y = ( cos * N.y + sin * B.y );
					vec.z = ( cos * N.z + sin * B.z );

					vec.normalize();

					normalArray.push( vec.x, vec.y, vec.z );

					vec.x = pos.x + r * vec.x;
					vec.y = pos.y + r * vec.y;
					vec.z = pos.z + r * vec.z;

					posArray.push( vec.x, vec.y, vec.z );


					uvArray.push(
						j / radSegments,
						i / curveSegments
					);

					if ( i < curveSegments ) {

						indexArray.push(
							i * radSegments + j,
							( i + 1 ) * radSegments + ( j + 1 ) % radSegments,
							i * radSegments + ( j + 1 ) % radSegments,

							i * radSegments + j,
							( i + 1 ) * radSegments + j,
							( i + 1 ) * radSegments + ( j + 1 ) % radSegments,

						);

					}

				}

			}

		}

		this.setAttribute( 'position', new Float32Array( posArray ), 3 );
		this.setAttribute( 'normal', new Float32Array( normalArray ), 3 );
		this.setAttribute( 'uv', new Float32Array( uvArray ), 2 );
		this.setAttribute( 'index', new Uint16Array( indexArray ), 1 );

	}

}
