import * as MXP from 'maxpower';

import skyboxFrag from './shaders/skybox.fs';

import { globalUniforms } from '~/ts/Globals';

export class SkyBox extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const mesh = this.entity.addComponent( MXP.Mesh );
		mesh.geometry = new MXP.SphereGeometry( { radius: 50, widthSegments: 32, heightSegments: 32 } );
		mesh.material = new MXP.Material( {
			phase: [ "deferred", "envMap" ],
			frag: MXP.hotGet( "skybox", skyboxFrag ),
			cullFace: false,
			uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.music )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/skybox.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'skybox', module.default );

					mesh.material.requestUpdate();

				}

			} );

		}

	}

}
