import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import orengineCubeFrag from './shaders/orengineCube.fs';
import orengineCubeVert from './shaders/orengineCube.vs';

import { globalUniforms, resource } from '~/ts/Globals';

export class OREngineCube extends MXP.Material {

	constructor() {

		super( {
			frag: MXP.hotGet( "orengineCubeFrag", orengineCubeFrag ),
			vert: MXP.hotGet( "orengineCubeVert", orengineCubeVert ),
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, {
				uNoiseTex: {
					value: resource.getTexture( "noise" ),
					type: "1i"
				}
			} )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/orengineCube.fs', ( module ) => {

				if ( module ) {

					this.frag = MXP.hotUpdate( 'orengineCubeFrag', module.default );

				}

				this.requestUpdate();

			} );

			import.meta.hot.accept( './shaders/orengineCube.vs', ( module ) => {

				if ( module ) {

					this.vert = MXP.hotUpdate( 'orengineCubeVert', module.default );

				}

				this.requestUpdate();

			} );

		}

	}


}
