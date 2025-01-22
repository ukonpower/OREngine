import * as MXP from 'maxpower';

import fxaaFrag from './shaders/fxaa.fs';

import { gl } from '~/ts/Globals';

export class FXAA extends MXP.PostProcess {

	constructor( params: MXP.PostProcessParams ) {

		super( {
			...params,
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

