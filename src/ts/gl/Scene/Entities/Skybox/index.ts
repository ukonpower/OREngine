import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import skyboxFrag from './shaders/skybox.fs';
import { globalUniforms } from '~/ts/Globals';

export class Skybox extends MXP.Entity {

	constructor() {

		super();

		this.addComponent( "geometry", new MXP.SphereGeometry( 60.0, 60, 60 ) );

		const mat = this.addComponent( "material", new MXP.Material( {
			name: "skybox",
			type: [ "deferred" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: MXP.hotGet( 'skyboxFrag', skyboxFrag ),
			cullFace: false,
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/skybox.fs", ( module ) => {

				if ( module ) {

					mat.frag = MXP.hotUpdate( 'skyboxFrag', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
