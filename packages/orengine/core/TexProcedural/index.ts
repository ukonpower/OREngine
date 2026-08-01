import * as GLP from 'glpower';
import * as MXP from 'maxpower';

interface TexProceduralParam extends MXP.PostProcessPassParam {
	resolution?: GLP.Vector
}

export class TexProcedural extends GLP.GLPowerTexture {

	public material: MXP.PostProcessPass;

	private _renderer: MXP.Renderer;
	private _resolution: GLP.Vector;
	private _postProcess: MXP.PostProcess;
	private _frameBuffer: GLP.GLPowerFrameBuffer;

	constructor( renderer: MXP.Renderer, param: TexProceduralParam ) {

		// GLPowerTexture継承のGL専用テクスチャなので、具象バックエンドから生glを取り出す
		const backend = renderer.backend as MXP.GLBackend;
		const gl = backend.gl;

		super( gl );

		this._renderer = renderer;

		this._resolution = param.resolution || new GLP.Vector( 1024, 1024 );

		this.setting( {
			wrapS: gl.REPEAT,
			wrapT: gl.REPEAT,
			magFilter: gl.LINEAR,
			minFilter: gl.LINEAR,
		} );

		this._frameBuffer = new GLP.GLPowerFrameBuffer( gl ).setTexture( [ this ] ).setSize( this._resolution );

		this.material = new MXP.PostProcessPass( backend, { ...param, renderTarget: this._frameBuffer } );

		this._postProcess = new MXP.PostProcess( {
			passes: [ this.material ]
		} );

		this.render();

	}

	public render() {

		this._renderer.renderPostProcess( this._postProcess, undefined, this._resolution );

	}

}
