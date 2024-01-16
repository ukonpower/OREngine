import * as GLP from 'glpower';

import { globalUniforms } from '~/ts/Globals';

import ringsVert from './shaders/rings.vs';
import ringsFrag from './shaders/rings.fs';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';
import { Entity } from 'maxpower/Entity';

export class Rings extends Entity {

	constructor() {

		super();

		const count = 9;

		// geometry

		const range = new GLP.Vector( 1.0, 0.0, 3.0 );

		const positionArray = [];
		const idArray = [];

		for ( let i = 0; i < count; i ++ ) {

			const n = count > 1 ? i / count - 0.5 : 0;

			positionArray.push(
				0,
				n * 0.5 * 1.0,
				0
			);

			idArray.push( i / count, Math.random(), Math.random() );

		}

		const r = 0.9;

		const geo = this.addComponent( "geometry", new GLP.RingGeometry( r, r * 0.98, 64, 1 ) );
		geo.setAttribute( "offsetPosition", new Float32Array( positionArray ), 3, { instanceDivisor: 1 } );
		geo.setAttribute( "id", new Float32Array( idArray ), 3, { instanceDivisor: 1 } );

		// material

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "rings",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution, {
				uRange: {
					value: range,
					type: "3f"
				},
			} ),
			vert: hotGet( 'ringsVert', ringsVert ),
			frag: hotGet( 'ringsFrag', ringsFrag ),
			// drawType: gl.LINES
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( [ "./shaders/rings.vs", "./shaders/rings.fs" ], ( module ) => {

				if ( module[ 0 ] ) {

					mat.vert = hotUpdate( 'ringsVert', module[ 0 ].default );

				}

				if ( module[ 1 ] ) {

					mat.frag = hotUpdate( 'ringsFrag', module[ 1 ].default );

				}

				mat.requestUpdate();

			} );

		}

	}

}
