import { Geometry } from "..";

interface CubeGeometryParams{
	width?: number,
	height?: number,
	depth?: number,
	segmentsWidth?: number,
	segmentsHeight?: number,
	segmentsDepth?: number
}

export class CubeGeometry extends Geometry {

	constructor( params?: CubeGeometryParams ) {

		super();

		const posArray = [];
		const normalArray = [];
		const uvArray = [];
		const indexArray = [];
		const posYArray = [];

		const { width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth } = {
			width: 1,
			height: 1,
			depth: 1,
			segmentsWidth: 1,
			segmentsHeight: 1,
			segmentsDepth: 1,
			...params
		};

		const faces = [
			{ normal: [ 0, 0, 1 ], dir: [ 1, 0, 0 ], up: [ 0, 1, 0 ], w: width, h: height, d: depth, segW: segmentsWidth, segH: segmentsHeight },
			{ normal: [ 0, 0, - 1 ], dir: [ - 1, 0, 0 ], up: [ 0, 1, 0 ], w: width, h: height, d: depth, segW: segmentsWidth, segH: segmentsHeight },
			{ normal: [ 1, 0, 0 ], dir: [ 0, 0, - 1 ], up: [ 0, 1, 0 ], w: depth, h: height, d: width, segW: segmentsDepth, segH: segmentsHeight },
			{ normal: [ - 1, 0, 0 ], dir: [ 0, 0, 1 ], up: [ 0, 1, 0 ], w: depth, h: height, d: width, segW: segmentsDepth, segH: segmentsHeight },
			{ normal: [ 0, 1, 0 ], dir: [ - 1, 0, 0 ], up: [ 0, 0, 1 ], w: width, h: depth, d: height, segW: segmentsWidth, segH: segmentsDepth },
			{ normal: [ 0, - 1, 0 ], dir: [ - 1, 0, 0 ], up: [ 0, 0, - 1 ], w: width, h: depth, d: height, segW: segmentsWidth, segH: segmentsDepth },
		];

		let indexOffset = 0;

		for ( const face of faces ) {

			const n = face.normal;
			const dir = face.dir;
			const up = face.up;
			const segW = face.segW;
			const segH = face.segH;

			const hx = face.w / 2;
			const hy = face.h / 2;
			const hz = face.d / 2;

			const widthStep = face.w / segW;
			const heightStep = face.h / segH;

			for ( let i = 0; i <= segH; i ++ ) {

				for ( let j = 0; j <= segW; j ++ ) {

					const x = - hx + j * widthStep;
					const y = - hy + i * heightStep;
					const z = - hz;

					const u = j / segW;
					const v = i / segH;

					const px = x * - dir[ 0 ] + y * up[ 0 ] + z * - n[ 0 ];
					const py = x * - dir[ 1 ] + y * up[ 1 ] + z * - n[ 1 ];
					const pz = x * - dir[ 2 ] + y * up[ 2 ] + z * - n[ 2 ];

					posArray.push( px, py, pz );
					normalArray.push( ...n );
					uvArray.push( u, v );

					posYArray.push(
						i / segH * up[ 1 ] + ( Math.max( 0.0, up[ 2 ] ) ),
					);

					if ( i < segH && j < segW ) {

						const a = indexOffset + i * ( segW + 1 ) + j;
						const b = indexOffset + ( i + 1 ) * ( segW + 1 ) + j;
						const c = indexOffset + ( i + 1 ) * ( segW + 1 ) + ( j + 1 );
						const d = indexOffset + i * ( segW + 1 ) + ( j + 1 );

						indexArray.push( a, b, d );
						indexArray.push( b, c, d );

					}

				}

			}

			indexOffset += ( segW + 1 ) * ( segH + 1 );

		}

		this.setAttribute( 'position', new Float32Array( posArray ), 3 );
		this.setAttribute( 'normal', new Float32Array( normalArray ), 3 );
		this.setAttribute( 'uv', new Float32Array( uvArray ), 2 );
		this.setAttribute( 'posY', new Float32Array( posYArray ), 1 );
		this.setAttribute( 'index', new Uint16Array( indexArray ), 1 );

	}

}
