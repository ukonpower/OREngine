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

		const gl = renderer.gl;

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

                this.material = new MXP.PostProcessPass( gl, { ...param, renderTarget: this._frameBuffer } );

                this._postProcess = new MXP.PostProcess( {
			pipeline: new MXP.PostProcessPipeline( { entity: new MXP.Entity() } ),
			passes: [ this.material ]
		} );

		this.render();

	}

	public render() {

                this._renderer.renderPostProcess( this._postProcess, undefined, this._resolution );

	}

}
