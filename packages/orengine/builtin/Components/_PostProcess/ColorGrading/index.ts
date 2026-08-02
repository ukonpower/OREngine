import * as MXP from 'maxpower';

import colorGradingFrag from './shaders/colorGrading.fs';

export class ColorGrading extends MXP.PostProcess {

	constructor( backend: MXP.GLBackend ) {

		super( {
			name: "ColorGrading",
			passes: [
				new MXP.PostProcessPass( backend, {
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
