import * as MXP from 'maxpower';

import orengineCubeFrag from './shaders/orengineCube.fs';
import orengineCubeVert from './shaders/orengineCube.vs';

import { globalUniforms } from '~/ts/Globals';

export class OREngineCubeMaterial extends MXP.MaterialOverride {

	constructor( params: MXP.ComponentParams ) {

		const material = new MXP.Material( {
			frag: MXP.hotGet( "orengineCubeFrag", orengineCubeFrag ),
			vert: MXP.hotGet( "orengineCubeVert", orengineCubeVert ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, {
				// uNoiseTex: {
				// 	value: resource.getTexture( "noise" ),
				// 	type: "1i"
				// }
			} )
		} );

		super( { ...params, args: material } );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/orengineCube.fs', ( module ) => {

				if ( module ) {

					material.frag = MXP.hotUpdate( 'orengineCubeFrag', module.default );

				}

				material.requestUpdate();

			} );

			import.meta.hot.accept( './shaders/orengineCube.vs', ( module ) => {

				if ( module ) {

					material.vert = MXP.hotUpdate( 'orengineCubeVert', module.default );

				}

				material.requestUpdate();

			} );

		}

	}


}
