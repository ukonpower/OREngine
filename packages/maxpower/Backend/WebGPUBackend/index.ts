import * as GLP from 'glpower';

import { WebGPUProgram } from './Program';
import { WebGPUBuffer, WebGPUCubeFrameBuffer, WebGPUCubeTexture, WebGPUFrameBuffer, WebGPUTexture, WebGPUVAO } from './Resources';

import type { Backend, BackendBuffer, BackendCubeFrameBuffer, BackendCubeTexture, BackendFrameBuffer, BackendFrameBufferOption, BackendProgram, BackendTexture, BackendVAO, TimerQueryResult } from '..';
import type { GPUState } from './Resources';
import type { Blending, DrawType } from '../../Material';

/*-------------------------------
	定数
-------------------------------*/

// gBuffer は rgba32float×3 + rgba8unorm×2 = 56 bytes/sample を必要とする
const GBUFFER_BYTES_PER_SAMPLE = 56;

// 画面へのblit用。sampler無しのテクセルコピーで、flipはR9でY反転された内容を画面向きへ戻す
const BLIT_WGSL = /* wgsl */`
@vertex fn vs( @builtin(vertex_index) i: u32 ) -> @builtin(position) vec4f {
	var p = array<vec2f, 3>( vec2f( -1.0, -3.0 ), vec2f( -1.0, 1.0 ), vec2f( 3.0, 1.0 ) );
	return vec4f( p[ i ], 0.0, 1.0 );
}

@group(0) @binding(0) var src: texture_2d<f32>;

@fragment fn copy( @builtin(position) pos: vec4f ) -> @location(0) vec4f {
	return textureLoad( src, vec2i( i32( pos.x ), i32( pos.y ) ), 0 );
}

@fragment fn flip( @builtin(position) pos: vec4f ) -> @location(0) vec4f {
	let size = textureDimensions( src );
	return textureLoad( src, vec2i( i32( pos.x ), i32( size.y ) - 1 - i32( pos.y ) ), 0 );
}
`;

/*-------------------------------
	Factory
-------------------------------*/

// canvasとWebGPUコンテキストを用意してWebGPUBackendを組み立てる。deviceの取得は内部で非同期に進む
export const createBackend = (): WebGPUBackend => {

	const canvas = document.createElement( "canvas" );

	return new WebGPUBackend( canvas );

};

/*-------------------------------
	Backend
-------------------------------*/

// WebGPUのリソース生成・描画コマンド発行を担うバックエンド。
// GLの「bind → clear → draw × N」という命令列を、WebGPUのrender pass構造へ写像する
export class WebGPUBackend implements Backend {

	public readonly canvas: HTMLCanvasElement;

	private _state: GPUState;
	private _context: GPUCanvasContext | null;
	private _canvasFormat: GPUTextureFormat;

	// render pass
	private _target: WebGPUFrameBuffer | null;
	private _viewPort: GLP.Vector | null;
	private _pendingClear: { color: GLP.Vector | null, depth: number | null } | null;
	private _encoder: GPUCommandEncoder | null;
	private _pass: GPURenderPassEncoder | null;

	// state
	private _cullFace: boolean;
	private _depthTest: boolean;
	private _depthWrite: boolean;
	private _blendEnabled: boolean;

	// blit
	private _blitModule: GPUShaderModule | null;
	private _blitLayout: GPUBindGroupLayout | null;
	private _blitPipelines: Map<string, GPURenderPipeline>;
	private _blitGroups: Map<string, GPUBindGroup>;

	// バインド先が未設定のsamplerに割り当てるダミー
	private _fallback2d: WebGPUTexture;
	private _fallbackCube: WebGPUCubeTexture;

	constructor( canvas: HTMLCanvasElement ) {

		this.canvas = canvas;

		this._state = { device: null, units: [] };
		this._context = canvas.getContext( "webgpu" );
		this._canvasFormat = 'bgra8unorm';

		this._target = null;
		this._viewPort = null;
		this._pendingClear = null;
		this._encoder = null;
		this._pass = null;

		this._cullFace = true;
		this._depthTest = true;
		this._depthWrite = true;
		this._blendEnabled = false;

		this._blitModule = null;
		this._blitLayout = null;
		this._blitPipelines = new Map();
		this._blitGroups = new Map();

		this._fallback2d = new WebGPUTexture( this._state );
		this._fallbackCube = new WebGPUCubeTexture( this._state );

		this._init();

	}

	// adapter / device を取得してコンテキストを構成する。準備できるまでコマンドはすべてスキップされる
	private async _init() {

		const gpu = navigator.gpu;

		if ( ! gpu || ! this._context ) {

			console.error( "[WebGPUBackend] navigator.gpu がありません（WebGPU非対応、またはsecure contextではありません）" );

			return;

		}

		const adapter = await gpu.requestAdapter();

		if ( ! adapter ) {

			console.error( "[WebGPUBackend] requestAdapter() が null を返しました" );

			return;

		}

		const maxBytes = adapter.limits.maxColorAttachmentBytesPerSample;

		if ( maxBytes < GBUFFER_BYTES_PER_SAMPLE ) {

			console.error( `[WebGPUBackend] このadapterは maxColorAttachmentBytesPerSample=${maxBytes} で、gBufferに必要な ${GBUFFER_BYTES_PER_SAMPLE} を満たしません` );

			return;

		}

		const device = await adapter.requestDevice( { requiredLimits: { maxColorAttachmentBytesPerSample: maxBytes } } );

		device.addEventListener( 'uncapturederror', ( e ) => {

			console.error( "[WebGPUBackend]", ( e as GPUUncapturedErrorEvent ).error.message );

		} );

		this._canvasFormat = gpu.getPreferredCanvasFormat();

		this._context.configure( { device, format: this._canvasFormat, alphaMode: 'opaque' } );

		this._state.device = device;

	}

	/*-------------------------------
		Resource
	-------------------------------*/

	// 2Dテクスチャを生成する
	public createTexture(): BackendTexture {

		return new WebGPUTexture( this._state );

	}

	// キューブマップテクスチャを生成する
	public createCubeTexture(): BackendCubeTexture {

		return new WebGPUCubeTexture( this._state );

	}

	// フレームバッファを生成する
	public createFrameBuffer( opt?: BackendFrameBufferOption ): BackendFrameBuffer {

		return new WebGPUFrameBuffer( this._state, opt );

	}

	// キューブマップ用フレームバッファを生成する
	public createCubeFrameBuffer(): BackendCubeFrameBuffer {

		return new WebGPUCubeFrameBuffer( this._state );

	}

	// 頂点/インデックスバッファを生成する
	public createBuffer(): BackendBuffer {

		return new WebGPUBuffer( this._state );

	}

	// シェーダープログラムを生成する
	public createProgram(): BackendProgram {

		return new WebGPUProgram();

	}

	/*-------------------------------
		State
	-------------------------------*/

	// マテリアル由来の描画ステートを保持する。実際の反映はpipelineの構築時
	public setMaterialState( cullFace: boolean, depthTest: boolean, depthWrite: boolean ) {

		this._cullFace = cullFace;
		this._depthTest = depthTest;
		this._depthWrite = depthWrite;

	}

	// アルファブレンドの有効/無効を切り替える
	public setBlendEnabled( enabled: boolean ) {

		this._blendEnabled = enabled;

	}

	/*-------------------------------
		RenderTarget
	-------------------------------*/

	// 描画先を切り替える。開いているpassはここで閉じて送出する
	public bindRenderTarget( renderTarget: BackendFrameBuffer | null, viewPort?: GLP.Vector | null, _canvasSize?: GLP.Vector ) {

		this._flush();

		this._target = renderTarget as WebGPUFrameBuffer | null;
		this._viewPort = viewPort || null;

	}

	// 次にpassを開くときのloadOpとして予約する
	public clear( color: GLP.Vector | null, depth: number | null ) {

		if ( color === null && depth === null ) return;

		if ( this._pass ) {

			this._endPass();

		}

		this._pendingClear = { color, depth };

	}

	// framebuffer間のカラーコピー。画面（null）へはフルスクリーン描画で書き出す
	public blit( read: BackendFrameBuffer | null, draw: BackendFrameBuffer | null, width: number, height: number, _linear?: boolean, _restrictColor0?: boolean ) {

		this._flush();

		const device = this._state.device;
		const source = read && ( read as WebGPUFrameBuffer ).textures[ 0 ];

		if ( ! device || ! source ) return;

		const target = draw as WebGPUFrameBuffer | null;
		const destination = ( target && target.textures[ 0 ] ) || null;

		if ( target && ! destination ) return;

		if ( destination && destination.format === source.format && target!.size.x === width && target!.size.y === height ) {

			const from = source.getTexture();
			const to = destination.getTexture();

			if ( ! from || ! to ) return;

			const encoder = device.createCommandEncoder();

			encoder.copyTextureToTexture( { texture: from }, { texture: to }, [ width, height ] );

			device.queue.submit( [ encoder.finish() ] );

			return;

		}

		// swapchainのフォーマットへはコピーできないため描画する。フォーマットが食い違うfb間も同じ経路で扱う。
		// 画面へ出すときだけY反転するのは、R9がクリップ空間のYを反転して描いているため
		this._blitDraw( device, source, destination, destination === null );

	}

	private _blitDraw( device: GPUDevice, source: WebGPUTexture, destination: WebGPUTexture | null, flip: boolean ) {

		if ( ! this._blitModule || ! this._blitLayout ) {

			this._blitModule = device.createShaderModule( { label: 'blit', code: BLIT_WGSL } );

			this._blitLayout = device.createBindGroupLayout( {
				entries: [ { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'unfilterable-float' } } ],
			} );

		}

		const module = this._blitModule;
		const layout = this._blitLayout;

		const format = destination ? destination.format : this._canvasFormat;
		const key = `${format}/${flip}`;

		let pipeline = this._blitPipelines.get( key );

		if ( ! pipeline ) {

			pipeline = device.createRenderPipeline( {
				label: 'blit',
				layout: device.createPipelineLayout( { bindGroupLayouts: [ layout ] } ),
				vertex: { module, entryPoint: 'vs' },
				fragment: { module, entryPoint: flip ? 'flip' : 'copy', targets: [ { format } ] },
				primitive: { topology: 'triangle-list' },
			} );

			this._blitPipelines.set( key, pipeline );

		}

		const groupKey = `${source.id}:${source.generation}`;

		let group = this._blitGroups.get( groupKey );

		if ( ! group ) {

			const sourceView = source.getView();

			if ( ! sourceView ) return;

			group = device.createBindGroup( { layout, entries: [ { binding: 0, resource: sourceView } ] } );

			this._blitGroups.set( groupKey, group );

		}

		const view = destination ? destination.getView() : this._currentSwapchainView();

		if ( ! view ) return;

		const encoder = device.createCommandEncoder();

		const pass = encoder.beginRenderPass( {
			colorAttachments: [ { view, loadOp: 'clear', storeOp: 'store', clearValue: { r: 0, g: 0, b: 0, a: 1 } } ],
		} );

		pass.setPipeline( pipeline );
		pass.setBindGroup( 0, group );
		pass.draw( 3 );
		pass.end();

		device.queue.submit( [ encoder.finish() ] );

	}

	/*-------------------------------
		Pass
	-------------------------------*/

	// swapchainのテクスチャはフレームごとに取り直す必要がある
	private _currentSwapchainView(): GPUTextureView | null {

		return this._context && this._context.getCurrentTexture().createView();

	}

	// 現在のターゲットに対してrender passを開く。clear予約はここでloadOpへ変換される
	private _beginPass(): GPURenderPassEncoder | null {

		if ( this._pass ) return this._pass;

		const device = this._state.device;

		if ( ! device ) return null;

		const clear = this._pendingClear;
		const target = this._target;

		this._pendingClear = null;

		const colorAttachments: GPURenderPassColorAttachment[] = [];
		let depthStencilAttachment: GPURenderPassDepthStencilAttachment | undefined = undefined;

		if ( target ) {

			const face = target instanceof WebGPUCubeFrameBuffer ? target.currentFace : - 1;

			for ( let i = 0; i < target.textures.length; i ++ ) {

				const texture = target.textures[ i ];
				const view = face >= 0 ? ( texture as WebGPUCubeTexture ).getFaceView( face ) : texture.getView();

				if ( ! view ) return null;

				colorAttachments.push( {
					view,
					loadOp: clear && clear.color ? 'clear' : 'load',
					storeOp: 'store',
					clearValue: clear && clear.color
						? { r: clear.color.x, g: clear.color.y, b: clear.color.z, a: clear.color.w }
						: undefined,
				} );

			}

			if ( target.depthTexture ) {

				const view = target.depthTexture.getView();

				if ( ! view ) return null;

				depthStencilAttachment = {
					view,
					depthLoadOp: clear && clear.depth !== null ? 'clear' : 'load',
					depthStoreOp: 'store',
					depthClearValue: clear && clear.depth !== null ? clear.depth : 1.0,
				};

			}

		} else {

			const view = this._currentSwapchainView();

			if ( ! view ) return null;

			colorAttachments.push( {
				view,
				loadOp: clear && clear.color ? 'clear' : 'load',
				storeOp: 'store',
				clearValue: clear && clear.color
					? { r: clear.color.x, g: clear.color.y, b: clear.color.z, a: clear.color.w }
					: undefined,
			} );

		}

		if ( colorAttachments.length === 0 ) return null;

		this._encoder = device.createCommandEncoder();
		this._pass = this._encoder.beginRenderPass( { colorAttachments, depthStencilAttachment } );

		if ( this._viewPort ) {

			// GLとWebGPUでフレームバッファの行の並びが逆なので、メモリ上の同じ行を指すyをそのまま渡す
			this._pass.setViewport( this._viewPort.x, this._viewPort.y, this._viewPort.z, this._viewPort.w, 0, 1 );

		}

		return this._pass;

	}

	private _endPass() {

		if ( ! this._pass || ! this._encoder || ! this._state.device ) return;

		this._pass.end();

		this._state.device.queue.submit( [ this._encoder.finish() ] );

		this._pass = null;
		this._encoder = null;

	}

	// 開いているpassを閉じる。drawが来ないままのclear予約は空のpassで適用する
	private _flush() {

		if ( ! this._pass && this._pendingClear ) {

			this._beginPass();

		}

		this._endPass();

	}

	/*-------------------------------
		Draw
	-------------------------------*/

	// programとVAOで1回の描画コマンドを発行する
	public draw( program: BackendProgram, vao: BackendVAO, drawType: DrawType, blending: Blending, _queryName?: string ) {

		const device = this._state.device;

		if ( ! device ) return;

		const target = this._target;

		const colorFormats = target
			? target.textures.map( ( t ) => t.format )
			: [ this._canvasFormat ];

		const pass = this._beginPass();

		if ( ! pass ) return;

		const webgpuVao = vao as WebGPUVAO;

		const ready = ( program as WebGPUProgram ).setup( device, pass, webgpuVao, {
			units: this._state.units,
			fallback2d: this._fallback2d,
			fallbackCube: this._fallbackCube,
			colorFormats,
			hasDepth: target !== null && target.depthTexture !== null,
			cullFace: this._cullFace,
			depthTest: this._depthTest,
			depthWrite: this._depthWrite,
			blendEnabled: this._blendEnabled,
			blending,
			drawType,
		} );

		if ( ! ready ) return;

		if ( webgpuVao.indexBuffer ) {

			pass.drawIndexed( webgpuVao.indexCount, Math.max( webgpuVao.instanceCount, 1 ) );

		} else {

			pass.draw( webgpuVao.vertCount, Math.max( webgpuVao.instanceCount, 1 ) );

		}

	}

	/*-------------------------------
		Timer Query
	-------------------------------*/

	// timestamp-query は未対応
	public collectTimerQueries(): TimerQueryResult[] | null {

		return null;

	}

}
