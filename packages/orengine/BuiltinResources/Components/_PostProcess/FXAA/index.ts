import * as MXP from 'maxpower';

import fxaaFrag from './shaders/fxaa.fs';

export class FXAA extends MXP.PostProcess {

	constructor( gl: WebGL2RenderingContext ) {

		super( {
			name: "FXAA",
			passes: [
				new MXP.PostProcessPass( gl, {
					name: 'fxaa',
					frag: fxaaFrag,
				} )
			],
		} );

	}

}

