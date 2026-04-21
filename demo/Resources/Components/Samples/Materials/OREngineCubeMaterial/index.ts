import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import fragSrc from './shaders/main.fs';
import vertSrc from './shaders/main.vs';

import { gl } from '~orengine/ts/Globals';

export class OREngineCubeMaterial extends MXP.Component {

	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = Engine.getInstance( gl );

		this.material = new MXP.Material( {
			name: "OREngineCube",
			phase: [ "shadowMap", "deferred" ],
			vert: MXP.hotGet( "OREngineCubeMaterialVert", vertSrc ),
			frag: MXP.hotGet( "OREngineCubeMaterialFrag", fragSrc ),
			uniforms: MXP.UniformsUtils.merge( engine.uniforms, {
				uNoiseTex: { value: Engine.resources.getTexture( "noise" ), type: "1i" }
			} )
		} );

		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			mesh.material = this.material;

		}

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/main.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( "OREngineCubeMaterialVert", module.default );
					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/main.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( "OREngineCubeMaterialFrag", module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

}
