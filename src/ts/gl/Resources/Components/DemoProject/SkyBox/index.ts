import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import skyboxFrag from './shaders/skybox.fs';

import { globalUniforms } from '~/ts/gl/GLGlobals';

interface SkyBoxParams extends MXP.ComponentParams {
}

export class SkyBox extends MXP.Component {

	private geometry: MXP.Geometry;
	private material: MXP.Material;

	constructor( params: SkyBoxParams ) {

		super( params );

		this.geometry = new MXP.SphereGeometry( { radius: 50, widthSegments: 32, heightSegments: 32 } );
		this.material = new MXP.Material( {
			phase: [ "deferred", "envMap" ],
			frag: MXP.hotGet( "skybox", skyboxFrag ),
			cullFace: false,
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, globalUniforms.music )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/skybox.fs', ( module ) => {

				if ( module ) {

					this.material.frag = MXP.hotUpdate( 'skybox', module.default );

					this.material.requestUpdate();

				}

			} );

		}

	}

	protected setEntityImpl( entity: MXP.Entity ): void {

		entity.addComponent( this.geometry );
		entity.addComponent( this.material );

	}

}
