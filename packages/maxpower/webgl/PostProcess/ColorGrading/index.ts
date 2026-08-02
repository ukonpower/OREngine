import { PostProcess } from '..';
import { GLBackend } from '../../GLBackend';
import { PostProcessPass } from '../PostProcessPass';

import colorGradingFrag from './shaders/colorGrading.fs';

export class ColorGrading extends PostProcess {

	constructor( backend: GLBackend ) {

		super( {
			name: "ColorGrading",
			passes: [
				new PostProcessPass( backend, {
					frag: colorGradingFrag,
				} )
			]
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/colorGrading.fs", ( module ) => {

				if ( module ) {

					this.passes[ 0 ].frag = module.default;

				}

				this.passes[ 0 ].requestUpdate();

			} );

		}

	}

}
