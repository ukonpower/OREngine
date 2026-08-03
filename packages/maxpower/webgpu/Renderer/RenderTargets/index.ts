import { DEPTH_FORMAT, GBUFFER_ATTACHMENTS, SCENE_FORMAT } from '../../Bindings';

/*-------------------------------
	カメラ1台ぶんの中間バッファ

	gBuffer（MRT5）・シーン深度・シェーディング結果を持つ。
	キャンバスの実サイズに追従し、変わったときだけ作り直す。
-------------------------------*/

export class RenderTargets {

	public width: number;
	public height: number;

	public gBuffer: GPUTexture[];
	public gBufferViews: GPUTextureView[];
	public depth: GPUTexture | null;
	public depthView: GPUTextureView | null;
	public scene: GPUTexture | null;
	public sceneView: GPUTextureView | null;

	constructor() {

		this.width = 0;
		this.height = 0;
		this.gBuffer = [];
		this.gBufferViews = [];
		this.depth = null;
		this.depthView = null;
		this.scene = null;
		this.sceneView = null;

	}

	// 指定サイズのバッファを用意する（サイズが同じなら何もしない）
	public setSize( device: GPUDevice, width: number, height: number ) {

		if ( this.width === width && this.height === height ) return;

		this.dispose();

		this.width = width;
		this.height = height;

		const usage = GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING;

		this.gBuffer = GBUFFER_ATTACHMENTS.map( ( attachment ) => device.createTexture( {
			label: `gBuffer/${attachment.name}`,
			size: [ width, height ],
			format: attachment.format,
			usage,
		} ) );

		this.gBufferViews = this.gBuffer.map( ( texture ) => texture.createView() );

		this.depth = device.createTexture( {
			label: 'depth',
			size: [ width, height ],
			format: DEPTH_FORMAT,
			usage: GPUTextureUsage.RENDER_ATTACHMENT,
		} );

		this.depthView = this.depth.createView();

		this.scene = device.createTexture( {
			label: 'scene',
			size: [ width, height ],
			format: SCENE_FORMAT,
			usage,
		} );

		this.sceneView = this.scene.createView();

	}

	public dispose() {

		this.gBuffer.forEach( ( texture ) => texture.destroy() );
		this.gBuffer = [];
		this.gBufferViews = [];

		this.depth?.destroy();
		this.depth = null;
		this.depthView = null;

		this.scene?.destroy();
		this.scene = null;
		this.sceneView = null;

	}

}
