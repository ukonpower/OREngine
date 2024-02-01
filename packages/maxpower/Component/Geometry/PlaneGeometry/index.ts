import { Geometry } from "..";
import { ComponentParams } from "../..";

interface PlaneGeometryParams extends ComponentParams{
	width?: number,
	height?: number,
	widthSegments?: number,
	heightSegments?: number
}

export class PlaneGeometry extends Geometry {

	constructor( params: PlaneGeometryParams ) {

		super( params );

		const { width, height, widthSegments, heightSegments } = {
			width: 1,
			height: 1,
			widthSegments: 1,
			heightSegments: 1,
			...params
		};

		const hx = width / 2;
		const hy = height / 2;

		const posArray = [];
		const normalArray = [];
		const uvArray = [];
		const indexArray = [];

		for ( let i = 0; i <= heightSegments; i ++ ) {

			for ( let j = 0; j <= widthSegments; j ++ ) {

				const x = ( j / widthSegments );
				const y = ( i / heightSegments );

				posArray.push(
					- hx + width * x,
					- hy + height * y,
					0
				);

				uvArray.push( x, y );

				normalArray.push( 0, 0, 1 );

				if ( i > 0 && j > 0 ) {

					const n = ( widthSegments + 1 );
					const ru = n * i + j;
					const lb = n * ( i - 1 ) + j - 1;

					indexArray.push(
						ru, n * i + j - 1, lb,
						ru, lb, n * ( i - 1 ) + j,
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
