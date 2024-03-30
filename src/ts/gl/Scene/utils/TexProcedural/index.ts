import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Renderer } from '../../Renderer';

interface TexProceduralParam extends MXP.PostProcessParam {
	resolution: GLP.Vector
}

export class TexProcedural extends GLP.GLPowerTexture {

	private frameBuffer: GLP.GLPowerFrameBuffer;

	constructor( power: GLP.Power, param: TexProceduralParam ) {

		super( power.gl );

		const resolution = param.resolution || new GLP.Vector( 1024, 1024 );

		const gl = power.gl;

		this.setting( {
			wrapS: gl.REPEAT,
			wrapT: gl.REPEAT,
			magFilter: gl.LINEAR,
			minFilter: gl.LINEAR,
		} );

		const renderer = new Renderer( power );

		renderer.resize( resolution );

		this.frameBuffer = new GLP.GLPowerFrameBuffer( gl ).setTexture( [ this ] ).setSize( 1024, 1024 );
		renderer.renderPostProcess( new MXP.PostProcess( { passes: [ new MXP.PostProcessPass( { ...param, renderTarget: this.frameBuffer } ) ] } ) );

	}

}
