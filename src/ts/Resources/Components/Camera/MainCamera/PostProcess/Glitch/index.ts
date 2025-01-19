import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import glitchFrag from './shaders/glitch.fs';

import { gl, globalUniforms } from '~/ts/Globals';

export class Glitch extends MXP.PostProcess {

	constructor( params: MXP.PostProcessParams ) {

		super( {
			...params,
			passes: [
				new MXP.PostProcessPass( gl, {
					name: 'glitch',
					frag: glitchFrag,
					uniforms: MXP.UniformsUtils.merge( globalUniforms.time, {
						uGlitch: {
							value: 0,
							type: '1f'
						}
					} ),
					resolutionRatio: 1.0,
				} )
			]
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/glitch.fs", ( module ) => {

				if ( module ) {

					this.passes[ 0 ].frag = module.default;

				}

				this.passes[ 0 ].requestUpdate();

			} );


		}

	}

}
