import { PostProcess } from '..';
import { GLBackend } from '../../backend/GLBackend';
import { PostProcessPass } from '../PostProcessPass';

import finalizeFrag from './shaders/finalize.fs';

export class Finalize extends PostProcess {

	constructor( backend: GLBackend ) {

		super( {
			name: "Finalize",
			passes: [
				new PostProcessPass( backend, {
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
