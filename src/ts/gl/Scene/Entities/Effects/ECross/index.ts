import * as GLP from 'glpower';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

import eCrossVert from './shaders/eCross.vs';
import eCrossFrag from './shaders/eCross.fs';
import { Entity } from 'maxpower/Entity';

export class ECross extends Entity {

	constructor() {

		super();

		/*-------------------------------
			Geometyr
		-------------------------------*/

		const geo = new GLP.PlaneGeometry( 1.0, 0.3 );

		const instanceIdArray: number [] = [];

		const gRnd = Math.random();

		for ( let i = 0; i < 2; i ++ ) {

			instanceIdArray.push(
				i, gRnd, Math.random()
			);

		}

		geo.setAttribute( "insId", new Float32Array( instanceIdArray ), 3, { instanceDivisor: 1 } );

		this.addComponent( "geometry", geo );

		/*-------------------------------
			Material
		-------------------------------*/

		const matName = "eCross";

		const mat = this.addComponent( "material", new GLP.Material( {
			name: matName,
			type: [ "deferred" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			vert: hotGet( matName + "vs", eCrossVert ),
			frag: hotGet( matName + "fs", eCrossFrag ),
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/eCross.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( matName + "fs", module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/eCross.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( matName + "vs", module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
