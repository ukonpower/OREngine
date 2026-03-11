import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import noiseFlareFrag from './shaders/noiseFlare.fs';
import noiseFlareVert from './shaders/noiseFlare.vs';

import { gl } from '~/ts/Globals';

export class NoiseFlare extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const geometry = new MXP.PlaneGeometry( {
			width: 2,
			height: 2
		} );

		const material = new MXP.Material( {
			phase: [ 'forward' ],
			frag: noiseFlareFrag,
			vert: noiseFlareVert,
			uniforms: MXP.UniformsUtils.merge(
				Engine.getInstance( gl ).uniforms,
				{
					uNoiseTex: {
						value: Engine.resources.getTexture( "noiseCyclic_anime" ),
						type: "1i"
					}
				}
			 ),
		} );

		const mesh = this.entity.addComponent( MXP.Mesh, {
			geometry,
			material,
		} );

		if ( process.env.NODE_ENV === 'development' ) {

			if ( import.meta.hot ) {

				import.meta.hot.accept( './shaders/noiseFlare.fs', ( module ) => {

					if ( module ) {

						mesh.material.frag = MXP.hotUpdate( 'noiseFlareFrag', module.default );

						mesh.material.requestUpdate();

					}

				} );

				import.meta.hot.accept( './shaders/noiseFlare.vs', ( module ) => {

					if ( module ) {

						mesh.material.vert = MXP.hotUpdate( 'noiseFlareVert', module.default );

						mesh.material.requestUpdate();

					}


				} );

			}

		}

	}

	public dispose(): void {

		super.dispose();

		this.entity.removeComponent( MXP.Mesh );

	}

}
