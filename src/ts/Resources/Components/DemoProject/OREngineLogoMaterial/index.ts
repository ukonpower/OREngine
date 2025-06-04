import * as MXP from 'maxpower';

import OREngineLogoFrag from './shaders/orengineLogo.fs';
import OREngineLogoVert from './shaders/orengineLogo.vs';

import { globalUniforms } from '~/ts/Globals';

export class OREngineLogoMaterial extends MXP.MaterialOverride {

	constructor( params: MXP.ComponentParams ) {

		const material = new MXP.Material( {
			frag: MXP.hotGet( "OREngineLogoMaterialFrag", OREngineLogoFrag ),
			vert: MXP.hotGet( "OREngineLogoMaterialVert", OREngineLogoVert ),
			uniforms: globalUniforms.time,
			phase: [ "deferred", "shadowMap" ]
		} );

		super( { ...params, args: material } );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/OREngineLogoMaterial.fs', ( module ) => {

				if ( module ) {

					material.frag = MXP.hotUpdate( 'OREngineLogoMaterialFrag', module.default );

				}

				material.requestUpdate();

			} );

			import.meta.hot.accept( './shaders/OREngineLogoMaterial.vs', ( module ) => {

				if ( module ) {

					material.vert = MXP.hotUpdate( 'OREngineLogoMaterialVert', module.default );

				}

				material.requestUpdate();

			} );

		}

	}


}
