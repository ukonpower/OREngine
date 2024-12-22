import * as MXP from 'maxpower';

import raymarchFrag from './shaders/raymarch.fs';

import { globalUniforms } from '~/ts/Globals';

export class Raymarch extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		// material

		const mesh = this.entity.addComponent( MXP.Mesh, {
			material: new MXP.Material( {
				frag: MXP.hotGet( 'raymarchFrag', raymarchFrag ),
				phase: [ 'forward', 'shadowMap' ],
				uniforms: MXP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution )
			} ),
			geometry: new MXP.SphereGeometry( { radius: 2 } )
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/raymarch.fs', ( module ) => {

				if ( module ) {

					mesh.material.frag = MXP.hotUpdate( 'raymarchFrag', module.default );

					mesh.material.requestUpdate();

				}

			} );

		}

	}

	public dispose(): void {

		super.dispose();
		this.entity.removeComponent( MXP.Mesh );

	}

}
