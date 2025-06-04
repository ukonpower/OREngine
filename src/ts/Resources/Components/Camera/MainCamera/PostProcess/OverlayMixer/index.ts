import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import overlayMixerFrag from './shaders/overlayMixer.fs';

import { gl } from '~/ts/Globals';

export class OverlayMixer extends MXP.PostProcess {

	constructor( overlayTex:GLP.GLPowerTexture ) {

		super( {
			name: "OverlayMixer",
			passes: [
				new MXP.PostProcessPass( gl, {
					renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
						new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA16F, format: gl.RGBA } )
					] ),
					frag: overlayMixerFrag,
					uniforms: {
						uOerlayTex: {
							value: overlayTex,
							type: "1i"
						}
					}
				} )
			]
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/overlayMixer.fs", ( module ) => {

				if ( module ) {

					this.passes[ 0 ].frag = module.default;

				}

				this.passes[ 0 ].requestUpdate();

			} );

		}

	}

}
