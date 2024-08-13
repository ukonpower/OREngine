import * as MXP from 'maxpower';

import orengineLogoFrag from './shaders/orengineLogo.fs';
import orengineLogoVert from './shaders/orengineLogo.vs';

import { globalUniforms } from '~/ts/gl/GLGlobals';

export class OREngineLogo extends MXP.Material {

	constructor() {

		super( {
			frag: MXP.hotGet( "orengineLogoFrag", orengineLogoFrag ),
			vert: MXP.hotGet( "orengineLogoVert", orengineLogoVert ),
			uniforms: globalUniforms.time,
			phase: [ "deferred", "shadowMap" ]
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/orengineLogo.fs', ( module ) => {

				if ( module ) {

					this.frag = MXP.hotUpdate( 'orengineLogoFrag', module.default );

				}

				this.requestUpdate();

			} );

			import.meta.hot.accept( './shaders/orengineLogo.vs', ( module ) => {

				if ( module ) {

					this.vert = MXP.hotUpdate( 'orengineLogoVert', module.default );

				}

				this.requestUpdate();

			} );

		}

	}


}
