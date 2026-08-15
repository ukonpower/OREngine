import * as GLP from 'glpower';
import { GLPowerTexture } from 'glpower';
import * as MTP from 'mathpower';

import { PostProcess } from '../PostProcess';
import { PostProcessPass, PostProcessPassParam } from '../PostProcess/PostProcessPass';

import type { Renderer } from '../Renderer';

interface TexProceduralParam extends PostProcessPassParam {
	resolution?: MTP.Vector
}

// .tex のWebGL実装。GLSLのフルスクリーンパスを固定解像度のテクスチャへ焼く
export class TexProcedural extends GLPowerTexture {

	public material: PostProcessPass;

	private _renderer: Renderer;
	private _resolution: MTP.Vector;
	private _postProcess: PostProcess;
	private _frameBuffer: GLP.GLPowerFrameBuffer;

	constructor( renderer: Renderer, param: TexProceduralParam ) {

		const backend = renderer.backend;
		const gl = backend.gl;

		super( gl );

		this._renderer = renderer;

		this._resolution = param.resolution || new MTP.Vector( 1024, 1024 );

		this.setting( {
			wrapS: gl.REPEAT,
			wrapT: gl.REPEAT,
			magFilter: gl.LINEAR,
			minFilter: gl.LINEAR,
		} );

		this._frameBuffer = new GLP.GLPowerFrameBuffer( gl ).setTexture( [ this ] ).setSize( this._resolution );

		this.material = new PostProcessPass( backend, { ...param, renderTarget: this._frameBuffer } );

		this._postProcess = new PostProcess( {
			passes: [ this.material ]
		} );

		this.render();

	}

	public render() {

		this._renderer.renderPostProcess( this._postProcess, undefined, this._resolution );

	}

}
