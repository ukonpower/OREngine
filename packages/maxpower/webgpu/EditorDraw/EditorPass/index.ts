import { UniformBinder, buildStructWgsl, fieldsFromUniforms } from '../../resources/UniformBinder';
import { EDITOR_FULLSCREEN_WGSL } from '../shaders';

import type { UniformField } from '../../resources/UniformBinder';
import type * as GLP from 'glpower';

/*-------------------------------
	エディタ用のフルスクリーンパス

	ポストプロセスの土台（PostProcess）は描画先を自分で持つが、
	エディタは blit の転写先やレシピの出力先がその都度変わるため、
	描画先を引数で受け取る軽い実装を別に持つ。

	bind group は group0 だけ（uniform + 入力テクスチャ + サンプラー）で、
	レンダラーのフレームuniformには依存しない。
-------------------------------*/

export class EditorPass {

	private _device: GPUDevice;
	private _format: GPUTextureFormat;
	private _layout: GPUBindGroupLayout;
	private _pipeline: GPURenderPipeline;
	private _binder: UniformBinder | null;
	private _sampler: GPUSampler;
	private _inputCount: number;
	private _fields: UniformField[];

	constructor( device: GPUDevice, param: {
		name: string;
		wgsl: string;
		inputCount: number;
		format: GPUTextureFormat;
		uniforms?: GLP.Uniforms;
	} ) {

		this._device = device;
		this._format = param.format;
		this._inputCount = param.inputCount;
		this._fields = param.uniforms ? fieldsFromUniforms( param.uniforms ) : [];

		const inputs = [];

		for ( let i = 0; i < param.inputCount; i ++ ) {

			inputs.push( `@group(0) @binding(${i + 1}) var uSrc${i}: texture_2d<f32>;` );

		}

		const chunks = [];

		// uniformを持たないパスでも binding0 は空けておく（レイアウトを揃えるため）
		if ( this._fields.length > 0 ) {

			chunks.push( buildStructWgsl( 'EditorUniforms', this._fields ) );
			chunks.push( '@group(0) @binding(0) var<uniform> editor: EditorUniforms;' );

		}

		chunks.push( inputs.join( '\n' ) );
		chunks.push( `@group(0) @binding(${param.inputCount + 1}) var editorSampler: sampler;` );
		chunks.push( EDITOR_FULLSCREEN_WGSL );
		chunks.push( param.wgsl );

		const entries: GPUBindGroupLayoutEntry[] = [];

		if ( this._fields.length > 0 ) {

			entries.push( { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } } );

		}

		for ( let i = 0; i < param.inputCount; i ++ ) {

			entries.push( { binding: i + 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } } );

		}

		entries.push( { binding: param.inputCount + 1, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } } );

		this._layout = device.createBindGroupLayout( { label: param.name, entries } );

		const module = device.createShaderModule( { label: param.name, code: chunks.join( '\n\n' ) } );

		this._pipeline = device.createRenderPipeline( {
			label: param.name,
			layout: device.createPipelineLayout( { bindGroupLayouts: [ this._layout ] } ),
			vertex: { module, entryPoint: 'vsMain' },
			fragment: { module, entryPoint: 'fsMain', targets: [ { format: param.format } ] },
			primitive: { topology: 'triangle-list' },
		} );

		this._binder = this._fields.length > 0 ? new UniformBinder( device, this._fields, param.name ) : null;

		this._sampler = device.createSampler( {
			label: 'editor',
			magFilter: 'linear',
			minFilter: 'linear',
			addressModeU: 'clamp-to-edge',
			addressModeV: 'clamp-to-edge',
		} );

	}

	public get format() {

		return this._format;

	}

	// rectを渡すとその矩形にだけ描く（FrameDebuggerのタイル転写）。左上原点
	public render( target: GPUTextureView, inputs: GPUTextureView[], opt?: {
		uniforms?: GLP.Uniforms;
		rect?: { x: number, y: number, width: number, height: number };
		clear?: boolean;
	} ) {

		if ( inputs.length < this._inputCount ) return;

		if ( this._binder && opt && opt.uniforms ) {

			this._binder.update( opt.uniforms );

		}

		const entries: GPUBindGroupEntry[] = [];

		if ( this._binder ) {

			entries.push( { binding: 0, resource: { buffer: this._binder.buffer } } );

		}

		for ( let i = 0; i < this._inputCount; i ++ ) {

			entries.push( { binding: i + 1, resource: inputs[ i ] } );

		}

		entries.push( { binding: this._inputCount + 1, resource: this._sampler } );

		const encoder = this._device.createCommandEncoder();

		const pass = encoder.beginRenderPass( {
			label: 'editorPass',
			colorAttachments: [ {
				view: target,
				clearValue: { r: 0, g: 0, b: 0, a: 1 },
				loadOp: opt && opt.clear ? 'clear' : 'load',
				storeOp: 'store',
			} ],
		} );

		if ( opt && opt.rect ) {

			pass.setViewport( opt.rect.x, opt.rect.y, opt.rect.width, opt.rect.height, 0, 1 );

		}

		pass.setPipeline( this._pipeline );
		pass.setBindGroup( 0, this._device.createBindGroup( { layout: this._layout, entries } ) );
		pass.draw( 3 );

		pass.end();

		this._device.queue.submit( [ encoder.finish() ] );

	}

	public dispose() {

		this._binder?.dispose();

	}

}
