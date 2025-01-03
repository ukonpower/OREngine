import * as MXP from 'maxpower';
import { Engine, TexProcedural } from 'orengine';

import noiseFrag from './shaders/noise.fs';

import { gl } from '~/ts/Globals';

export class TextureGenerator extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = Engine.getInstance( gl );

		const renderer = engine.renderer;

		Engine.resources.addTexture( "noise", new TexProcedural( renderer, {
			frag: noiseFrag,
		} ) );

	}

}
