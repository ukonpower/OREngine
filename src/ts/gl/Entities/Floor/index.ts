import * as GLP from 'glpower';

import floorFrag from './shaders/floor.fs';
import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';
import { Entity } from 'maxpower/Entity';

export class Floor extends Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "floor",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, { uNoiseTex: globalUniforms.tex.uNoiseTex } ),
			frag: hotGet( 'floorFrag', floorFrag )
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/floor.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'floor', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
