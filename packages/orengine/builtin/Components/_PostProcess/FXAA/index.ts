import * as MXP from 'maxpower';

import fxaaFrag from './shaders/fxaa.fs';

export class FXAA extends MXP.PostProcess {

	constructor( backend: MXP.Backend ) {

		super( {
			name: "FXAA",
			passes: [
				new MXP.PostProcessPass( backend, {
					name: 'fxaa',
					frag: fxaaFrag,
				} )
			],
		} );

	}

}

