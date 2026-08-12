import * as MXP from 'maxpower';

import { Engine } from 'orengine';

import fragSrc from './shaders/skyBox.fs';

export class SkyBox extends MXP.Component {

	private material: MXP.Material;

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

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

			import.meta.hot.accept( './shaders/skyBox.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( "SkyBoxFrag", module.default );
					this.material.requestUpdate();

				}

			} );

		}

	}

}
