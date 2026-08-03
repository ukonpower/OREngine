import { FRAME_FIELDS, GROUP_FRAME, SCENE_FORMAT } from '../Bindings';
import { requestShaderReload } from '../hotReload';
import { buildLightWgsl } from '../Renderer/Lights';
import { UniformBinder, buildStructWgsl, fieldsFromUniforms } from '../resources/UniformBinder';

import fullscreenWgsl from './shaders/fullscreen.wgsl';

import type { UniformField } from '../resources/UniformBinder';
import type * as GLP from 'glpower';

// HMRで差し替わるシェーダーソース。playerでは初期値のまま使われる
let hotFullscreenWgsl = fullscreenWgsl;

if ( import.meta.hot ) {

	import.meta.hot.accept( './shaders/fullscreen.wgsl', ( m ) => {

		if ( m ) hotFullscreenWgsl = m.default;

		requestShaderReload();

	} );

}

/*-------------------------------
	フルスクリーンパスの土台

	webgl側の PostProcessPass / PostProcess に相当する。
	1パス＝1レンダーパスで、入力テクスチャはサンプラー経由で引くため
	解像度の違う中間バッファ（1/2, 1/16 …）をそのまま繋げられる。

	bind group は group0=フレーム / group1=パス（uniform + 入力テクスチャ + サンプラー）。
	group1 の中身はパスが宣言した入力名から作られ、WGSL の宣言も同じ配列から生成する。
-------------------------------*/

// チェーンが自動で前パスの出力を差し込む入力名
export const BACK_BUFFER = 'uBackBuffer0';

// どのパスも持つ、自分の描画先の大きさ
const PASS_FIELDS: UniformField[] = [
	{ name: 'uPPResolution', type: 'vec2f' },
	{ name: 'uPPPixelSize', type: 'vec2f' },
];


export type PassInput = string | { name: string, filterable: boolean };

export type PostProcessPassParam = {
	name: string;
	// fsMain を定義したWGSL本体。宣言部とフルスクリーン頂点シェーダーは前置される
	wgsl: string;
	// WGSLに生やす入力テクスチャ。宣言順がそのまま binding 1.. になる。
	// rgba32float のテクスチャは filtering サンプラーで引けないので filterable: false で宣言し、
	// シェーダー側も ppSamplerNearest で引く（組み合わせは検証スクリプトで機械チェックしている）
	inputs?: PassInput[];
	uniforms?: GLP.Uniforms;
	format?: GPUTextureFormat;
	resolutionRatio?: number;
	// 自分の出力を次のパスへ流さない（別の入力として名指しで使われるパス）
	passThrough?: boolean;
	// 指定すると描画先を2枚持ち、前フレームの結果をこの名前の入力として受け取る
	pingPong?: string;
	// group2 にライト（uniform + シャドウマップ）を足す
	lights?: GPUBindGroupLayout;
	enabled?: boolean;
}

export class PostProcessPass {

	public readonly name: string;
	public readonly uniforms: GLP.Uniforms;
	public readonly passThrough: boolean;
	public readonly resolutionRatio: number;
	public enabled: boolean;

	public targetView: GPUTextureView | null;
	public width: number;
	public height: number;

	private _wgsl: string;
	private _format: GPUTextureFormat;
	private _inputNames: string[];
	private _filterable: boolean[];
	private _fields: UniformField[];

	private _pingPong: string | null;
	private _lightLayout: GPUBindGroupLayout | null;
	private _targets: ( GPUTexture | null )[];
	private _targetViews: ( GPUTextureView | null )[];
	private _current: number;
	private _pipeline: GPURenderPipeline | null;
	private _layout: GPUBindGroupLayout | null;
	private _binder: UniformBinder | null;
	private _bindGroup: GPUBindGroup | null;
	private _views: ( GPUTextureView | null )[];
	private _dirty: boolean;

	private _resolution: GLP.Vector;
	private _pixelSize: GLP.Vector;

	constructor( param: PostProcessPassParam, resolution: GLP.Vector, pixelSize: GLP.Vector ) {

		this.name = param.name;
		this.uniforms = param.uniforms || {};
		this.passThrough = param.passThrough || false;
		this.resolutionRatio = param.resolutionRatio !== undefined ? param.resolutionRatio : 1.0;
		this.enabled = param.enabled !== undefined ? param.enabled : true;

		this._wgsl = param.wgsl;
		this._format = param.format || SCENE_FORMAT;
		this._pingPong = param.pingPong || null;
		this._lightLayout = param.lights || null;
		const inputs: PassInput[] = ( param.inputs || [ BACK_BUFFER ] ).concat( this._pingPong ? [ this._pingPong ] : [] );

		this._inputNames = inputs.map( ( input ) => typeof input == 'string' ? input : input.name );
		this._filterable = inputs.map( ( input ) => typeof input == 'string' ? true : input.filterable );

		this._fields = PASS_FIELDS.concat( fieldsFromUniforms( this.uniforms ) );

		this.width = 0;
		this.height = 0;
		this._targets = [ null, null ];
		this._targetViews = [ null, null ];
		this._current = 0;
		this.targetView = null;
		this._pipeline = null;
		this._layout = null;
		this._binder = null;
		this._bindGroup = null;
		this._views = this._inputNames.map( () => null );
		this._dirty = true;

		// パスごとの解像度はチェーンが書き込む
		this._resolution = resolution;
		this._pixelSize = pixelSize;

	}

	// ライトを使うパスだけ group2 の宣言を足す
	private get _lightWgsl() {

		return this._lightLayout ? buildLightWgsl( 2 ) : '';

	}

	// 宣言部を差し込んだWGSLの完成形
	public get shaderSource() {

		const bindings = this._inputNames.map( ( name, i ) =>
			`@group(1) @binding(${i + 1}) var ${name}: texture_2d<f32>;${this._filterable[ i ] ? '' : '\t// unfilterable'}` );

		return [
			buildStructWgsl( 'FrameUniforms', FRAME_FIELDS ),
			`@group(${GROUP_FRAME}) @binding(0) var<uniform> frame: FrameUniforms;`,
			buildStructWgsl( 'PassUniforms', this._fields ),
			'@group(1) @binding(0) var<uniform> pp: PassUniforms;',
			bindings.join( '\n' ),
			`@group(1) @binding(${this._inputNames.length + 1}) var ppSampler: sampler;`,
			`@group(1) @binding(${this._inputNames.length + 2}) var ppSamplerNearest: sampler;`,
			this._lightWgsl,
			hotFullscreenWgsl,
			this._wgsl,
		].filter( Boolean ).join( '\n\n' );

	}

	public build( device: GPUDevice, frameLayout: GPUBindGroupLayout ) {

		this._layout = device.createBindGroupLayout( {
			label: this.name,
			entries: [
				{ binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
				...this._inputNames.map( ( _, i ) => ( {
					binding: i + 1,
					visibility: GPUShaderStage.FRAGMENT,
					texture: { sampleType: ( this._filterable[ i ] ? 'float' : 'unfilterable-float' ) as GPUTextureSampleType },
				} ) ),
				{
					binding: this._inputNames.length + 1,
					visibility: GPUShaderStage.FRAGMENT,
					sampler: { type: 'filtering' as const },
				},
				{
					binding: this._inputNames.length + 2,
					visibility: GPUShaderStage.FRAGMENT,
					sampler: { type: 'non-filtering' as const },
				},
			],
		} );

		const module = device.createShaderModule( { label: this.name, code: this.shaderSource } );

		this._pipeline = device.createRenderPipeline( {
			label: this.name,
			layout: device.createPipelineLayout( {
				bindGroupLayouts: this._lightLayout ? [ frameLayout, this._layout, this._lightLayout ] : [ frameLayout, this._layout ],
			} ),
			vertex: { module, entryPoint: 'vsMain' },
			fragment: { module, entryPoint: 'fsMain', targets: [ { format: this._format } ] },
			primitive: { topology: 'triangle-list' },
		} );

		this._binder = new UniformBinder( device, this._fields, this.name );

	}

	// 名前で入力テクスチャを差し替える。宣言していない名前は無視する
	public setInput( name: string, view: GPUTextureView ) {

		const index = this._inputNames.indexOf( name );

		if ( index < 0 || this._views[ index ] === view ) return;

		this._views[ index ] = view;
		this._dirty = true;

	}

	public setSize( device: GPUDevice, width: number, height: number ) {

		const w = Math.max( Math.ceil( width * this.resolutionRatio ), 1 );
		const h = Math.max( Math.ceil( height * this.resolutionRatio ), 1 );
		const count = this._pingPong ? 2 : 1;

		for ( let i = 0; i < count; i ++ ) {

			this._targets[ i ]?.destroy();

			this._targets[ i ] = device.createTexture( {
				label: `${this.name}/${i}`,
				size: [ w, h ],
				format: this._format,
				usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
			} );

			this._targetViews[ i ] = this._targets[ i ]!.createView();

		}

		this._current = 0;
		this.width = w;
		this.height = h;
		this.targetView = this._targetViews[ 0 ];
		this._dirty = true;

	}

	public render( device: GPUDevice, encoder: GPUCommandEncoder, frameBindGroup: GPUBindGroup, samplers: GPUSampler[], lightBindGroup?: GPUBindGroup ) {

		if ( ! this._pipeline || ! this._binder ) return;

		// 描画先を入れ替え、前フレームの結果を履歴の入力へ回す
		if ( this._pingPong ) {

			this._current = 1 - this._current;
			this.targetView = this._targetViews[ this._current ];

			this.setInput( this._pingPong, this._targetViews[ 1 - this._current ]! );

		}

		if ( ! this.targetView ) return;

		if ( this._views.some( ( view ) => view === null ) ) return;

		if ( this._dirty ) {

			this._bindGroup = device.createBindGroup( {
				label: this.name,
				layout: this._layout!,
				entries: [
					{ binding: 0, resource: { buffer: this._binder.buffer } },
					...this._views.map( ( view, i ) => ( { binding: i + 1, resource: view! } ) ),
					{ binding: this._inputNames.length + 1, resource: samplers[ 0 ] },
					{ binding: this._inputNames.length + 2, resource: samplers[ 1 ] },
				],
			} );

			this._dirty = false;

		}

		const size = this._targets[ this._current ]!;

		this._resolution.set( size.width, size.height );
		this._pixelSize.set( 1 / size.width, 1 / size.height );

		this._binder.update( { uPPResolution: { value: this._resolution, type: '2fv' }, uPPPixelSize: { value: this._pixelSize, type: '2fv' } }, this.uniforms );

		const pass = encoder.beginRenderPass( {
			label: this.name,
			colorAttachments: [ {
				view: this.targetView,
				clearValue: { r: 0, g: 0, b: 0, a: 1 },
				loadOp: 'clear',
				storeOp: 'store',
			} ],
		} );

		pass.setPipeline( this._pipeline );
		pass.setBindGroup( GROUP_FRAME, frameBindGroup );
		pass.setBindGroup( 1, this._bindGroup! );

		if ( this._lightLayout && lightBindGroup ) {

			pass.setBindGroup( 2, lightBindGroup );

		}

		pass.draw( 3 );

		pass.end();

	}

	public dispose() {

		this._targets.forEach( ( target ) => target?.destroy() );
		this._binder?.dispose();

	}

}

// パスを順に走らせ、passThroughでないパスの出力を次のパスの uBackBuffer0 に繋ぐ
export class PostProcessChain {

	public readonly passes: PostProcessPass[];

	private _samplers: GPUSampler[];

	constructor( device: GPUDevice, frameLayout: GPUBindGroupLayout, passes: PostProcessPass[] ) {

		this.passes = passes;

		for ( let i = 0; i < passes.length; i ++ ) {

			passes[ i ].build( device, frameLayout );

		}

		this._samplers = [
			device.createSampler( {
				label: 'postprocess/linear',
				magFilter: 'linear',
				minFilter: 'linear',
				addressModeU: 'clamp-to-edge',
				addressModeV: 'clamp-to-edge',
			} ),
			device.createSampler( { label: 'postprocess/nearest' } ),
		];

	}

	public setSize( device: GPUDevice, width: number, height: number ) {

		for ( let i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].setSize( device, width, height );

		}

	}

	// 最後に流れた出力を返す（そのまま次の工程の入力になる）
	public render( device: GPUDevice, encoder: GPUCommandEncoder, frameBindGroup: GPUBindGroup, input: GPUTextureView, lightBindGroup?: GPUBindGroup, onPass?: ( pass: PostProcessPass ) => void ) {

		let current = input;

		for ( let i = 0; i < this.passes.length; i ++ ) {

			const pass = this.passes[ i ];

			if ( ! pass.enabled ) continue;

			pass.setInput( BACK_BUFFER, current );
			pass.render( device, encoder, frameBindGroup, this._samplers, lightBindGroup );

			if ( onPass ) onPass( pass );

			if ( ! pass.passThrough && pass.targetView ) {

				current = pass.targetView;

			}

		}

		return current;

	}

	public dispose() {

		this.passes.forEach( ( pass ) => pass.dispose() );

	}

}
