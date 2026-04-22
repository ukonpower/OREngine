import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import fragSrc from './shaders/main.fs';
import vertSrc from './shaders/main.vs';

import { gl } from '~orengine/ts/Globals';

export class OREngineLogo extends MXP.Component {

	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = Engine.getInstance( gl );

		this.material = new MXP.Material( {
			name: "OREngineLogo",
			phase: [ "deferred", "shadowMap" ],
			vert: MXP.hotGet( "OREngineLogoVert", vertSrc ),
			frag: MXP.hotGet( "OREngineLogoFrag", fragSrc ),
			uniforms: MXP.UniformsUtils.merge( engine.uniforms )
		} );

		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			mesh.material = this.material;

		}

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/main.vs', ( module ) => {

				if ( module ) {

					this.material.vert = MXP.hotUpdate( "OREngineLogoVert", module.default );
					this.material.requestUpdate();

				}

			} );

			import.meta.hot.accept( './shaders/main.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( "OREngineLogoFrag", module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

}
