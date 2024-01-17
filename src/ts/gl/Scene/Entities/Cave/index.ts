import * as GLP from 'glpower';

import caveFrag from './shaders/cave.fs';
import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';
import { Entity } from 'maxpower/Entity';

export class Cave extends Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "cave",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: hotGet( 'caveFrag', caveFrag )
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/cave.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'cave', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
