import * as GLP from 'glpower';
import { GLPowerTexture } from 'glpower';
import * as MTP from 'mathpower';

import { PostProcess } from '../PostProcess';
import { PostProcessPass, PostProcessPassParam } from '../PostProcess/PostProcessPass';

import type { GLBackend } from '../backend/GLBackend';

// 焼くのに使うレンダラーの口。Renderer と LiteRenderer のどちらでも渡せるよう、使うものだけを取り決める
type TexProceduralRenderer = {
	backend: GLBackend;
	renderPostProcess( postprocess: PostProcess, input?: GLP.GLPowerFrameBuffer, canvasSize?: MTP.Vector ): void;
}

interface TexProceduralParam extends PostProcessPassParam {
	resolution?: MTP.Vector
}

// .tex のWebGL実装。GLSLのフルスクリーンパスを固定解像度のテクスチャへ焼く
export class TexProcedural extends GLPowerTexture {

	public material: PostProcessPass;

	private _renderer: TexProceduralRenderer;
	private _resolution: MTP.Vector;
	private _postProcess: PostProcess;
	private _frameBuffer: GLP.GLPowerFrameBuffer;

	constructor( renderer: TexProceduralRenderer, param: TexProceduralParam ) {

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
