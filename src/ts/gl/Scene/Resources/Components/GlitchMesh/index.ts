import * as MXP from 'maxpower';

import glitchMeshFrag from './shaders/glitchMesh.fs';
import glitchMeshVert from './shaders/glitchMesh.vs';

import { globalUniforms } from '~/ts/Globals';

export class GlitchMeshMaterial extends MXP.Component {

	private material: MXP.Material;

	constructor() {

		super();

		this.material = new MXP.Material( {
			frag: MXP.hotGet( "glitchMeshFrag", glitchMeshFrag ),
			vert: MXP.hotGet( "glitchMeshVert", glitchMeshVert ),
			uniforms: globalUniforms.time
		} );

		if ( import.meta.hot ) {

			console.log( "aaa" );

			import.meta.hot.accept( './shaders/glitchMesh.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'glitchMeshFrag', module.default );

				}

				this.material.requestUpdate();

			} );

			import.meta.hot.accept( './shaders/glitchMesh.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( 'glitchMeshVert', module.default );

				}

				this.material.requestUpdate();

			} );


		}

	}

	protected setEntityImpl( entity: MXP.Entity | null, prevEntity: MXP.Entity | null ): void {

		if ( entity ) {

			entity.addComponent( "material", this.material );

		}

		if (	prevEntity ) {

			prevEntity.removeComponent( "material" );

		}

	}


}
