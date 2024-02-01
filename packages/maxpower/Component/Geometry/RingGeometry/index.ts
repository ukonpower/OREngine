import { Geometry } from "..";
import { ComponentParams } from "../..";

interface RingGeometryParams extends ComponentParams{
	innerRadius?: number,
	outerRadius?: number,
	thetaSegments?: number,
	phiSegments?: number
}

export class RingGeometry extends Geometry {

	constructor( params: RingGeometryParams ) {

		super( params );

		const { innerRadius, outerRadius, thetaSegments, phiSegments } = {
			innerRadius: 0.5,
			outerRadius: 1,
			thetaSegments: 12,
			phiSegments: 1,
			...params
		};

		const totalThetaSegments = ( thetaSegments + 1 );

		const posArray = [];
		const normalArray = [];
		const uvArray = [];
		const indexArray = [];

		for ( let i = 0; i < phiSegments + 1; i ++ ) {

			const radius = innerRadius + ( outerRadius - innerRadius ) * ( i / phiSegments );

			for ( let j = 0; j <= thetaSegments; j ++ ) {

				const r = j / thetaSegments * Math.PI * 2.0;

				const x = Math.sin( r ) * radius;
				const y = Math.cos( r ) * radius;

				posArray.push( x, y, 0 );
				uvArray.push( j / thetaSegments, i / phiSegments );
				normalArray.push( 0, 1, 0 );

				if ( i > 0 && j < thetaSegments ) {

					const c = i * totalThetaSegments + j;

					indexArray.push(
						c,
						( c - totalThetaSegments ),
						( c + 1 ),

						( c + 1 ),
						( c - totalThetaSegments ),
						( c + 1 - totalThetaSegments ),
					);

				}

			}

		}

		this.setAttribute( 'position', new Float32Array( posArray ), 3 );
		this.setAttribute( 'normal', new Float32Array( normalArray ), 3 );
		this.setAttribute( 'uv', new Float32Array( uvArray ), 2 );
		this.setAttribute( 'index', new Uint16Array( indexArray ), 1 );

	}

}
