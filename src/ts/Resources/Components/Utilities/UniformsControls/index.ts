import * as MXP from 'maxpower';

import { globalUniforms } from '~/ts/Globals';

export class UniformControls extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		globalUniforms.time.uTime.value = event.timeCode;
		globalUniforms.time.uTimeF.value = event.timeCode % 1;
		globalUniforms.time.uTimeE.value = event.timeElapsed;
		globalUniforms.time.uTimeEF.value = event.timeElapsed % 1;
		globalUniforms.resolution.uAspectRatio.value = event.resolution.x / event.resolution.y;
		globalUniforms.resolution.uResolution.value.set( event.resolution.x, event.resolution.y );

	}

}
