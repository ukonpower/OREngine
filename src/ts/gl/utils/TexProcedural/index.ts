import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { gl } from '~/ts/Globals';
import { Renderer } from '../../Renderer';

export class TexProcedural extends GLP.GLPowerTexture {

	private frameBuffer: GLP.GLPowerFrameBuffer;

	constructor( param: MXP.PostProcessPassParam, resolution: GLP.Vector = new GLP.Vector( 1024, 1024 ) ) {

		super( gl );

		this.setting( {
			wrapS: gl.REPEAT,
			wrapT: gl.REPEAT,
		} );

		const renderer = new Renderer();

		renderer.resize( resolution );

		this.frameBuffer = new GLP.GLPowerFrameBuffer( gl ).setTexture( [ this ] ).setSize( 1024, 1024 );
		renderer.renderPostProcess( new MXP.PostProcess( { passes: [ new MXP.PostProcessPass( { ...param, renderTarget: this.frameBuffer } ) ] } ) );

	}

}
