import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import fragSrc from './shaders/main.fs';

import { gl } from '~orengine/ts/Globals';

export class SkyBox extends MXP.Component {

	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = Engine.getInstance( gl );

		this.material = new MXP.Material( {
			name: "SkyBox",
			phase: [ "deferred", "envMap" ],
			frag: MXP.hotGet( "SkyBoxFrag", fragSrc ),
			uniforms: MXP.UniformsUtils.merge( engine.uniforms, {
				uAspectRatio: { value: 0, type: "1f" }
			} )
		} );

		engine.renderer.sky.mesh.material = this.material;

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/main.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( "SkyBoxFrag", module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

}
