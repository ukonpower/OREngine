import { PostProcess } from '..';
import { GLBackend } from '../../backend/GLBackend';
import { PostProcessPass } from '../PostProcessPass';

import fxaaFrag from './shaders/fxaa.fs';

export class FXAA extends PostProcess {

	constructor( backend: GLBackend ) {

		super( {
			name: "FXAA",
			passes: [
				new PostProcessPass( backend, {
					name: 'fxaa',
					frag: fxaaFrag,
				} )
			],
		} );

	}

}

