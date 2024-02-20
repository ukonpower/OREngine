import * as MXP from 'maxpower';

import glitchMeshFrag from './shaders/glitchMesh.fs';
import glitchMeshVert from './shaders/glitchMesh.vs';

import { globalUniforms } from '~/ts/Globals';

export class OREngineLogo extends MXP.Material {

	constructor() {

		super( {
			frag: MXP.hotGet( "glitchMeshFrag", glitchMeshFrag ),
			vert: MXP.hotGet( "glitchMeshVert", glitchMeshVert ),
			uniforms: globalUniforms.time
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/glitchMesh.fs', ( module ) => {

				if ( module ) {

					this.frag = MXP.hotUpdate( 'glitchMeshFrag', module.default );

				}

				this.requestUpdate();

			} );

			import.meta.hot.accept( './shaders/glitchMesh.vs', ( module ) => {

				if ( module ) {

					this.vert = MXP.hotUpdate( 'glitchMeshVert', module.default );

				}

				this.requestUpdate();

			} );

		}

	}


}
