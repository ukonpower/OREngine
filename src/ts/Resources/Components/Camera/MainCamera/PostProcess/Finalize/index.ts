import * as MXP from 'maxpower';

import finalizeFrag from './shaders/finalize.fs';

import { gl } from '~/ts/Globals';

export class Finalize extends MXP.PostProcess {

	constructor( params: MXP.PostProcessParams ) {

		super( {
			...params,
			name: "Finalize",
			passes: [
				new MXP.PostProcessPass( gl, {
					frag: finalizeFrag,
				} )
			]
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/finalize.fs", ( module ) => {

				if ( module ) {

					this.passes[ 0 ].frag = module.default;

				}

				this.passes[ 0 ].requestUpdate();

			} );

		}

	}

}
