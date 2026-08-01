import { DEPTH_FORMAT, isUnfilterable, WebGPUTexture, WebGPUVAO } from './Resources';
import { UniformBinder } from './UniformBinder';

import type { BackendProgram, BackendVAO } from '..';
import type { UniformLayout, UniformValue } from './UniformBinder';
import type { Blending, DrawType } from '../../Material';
import type * as GLP from 'glpower';

const WGSL_ENDPOINT = '/__orengine/wgsl';

const STAGES = [ 'vertex', 'fragment' ] as const;

type StageName = typeof STAGES[number];

const TOPOLOGY: { [key in DrawType]: GPUPrimitiveTopology } = {
	TRIANGLES: 'triangle-list',
	LINES: 'line-list',
	POINTS: 'point-list',
};

// GLの blendFunc と同じ意味になる係数の組
const BLEND: { [key in Blending]: [ GPUBlendFactor, GPUBlendFactor ] } = {
	NORMAL: [ 'src-alpha', 'one-minus-src-alpha' ],
	ADD: [ 'src-alpha', 'one' ],
	DIFF: [ 'one-minus-dst', 'one-minus-dst' ],
};

const ATTRIBUTE_TYPE = new Map<string, 'float32' | 'sint32' | 'uint32'>( [
	[ 'Float32Array', 'float32' ],
	[ 'Int32Array', 'sint32' ],
	[ 'Uint32Array', 'uint32' ],
] );

/*-------------------------------
	変換サービス
-------------------------------*/

type TranspileResult = {
	wgsl: string,
	group: number,
	uniforms: UniformLayout,
	textures: { name: string, texBinding: number, smpBinding: number, dimension: GPUTextureViewDimension }[],
	attributes: { name: string, location: number }[],
};

type Stage = {
	result: TranspileResult,
	module: GPUShaderModule,
	binder: UniformBinder | null,
	outputs: number,
	layouts: Map<string, GPUBindGroupLayout>,
	bindGroups: Map<string, GPUBindGroup>,
};

// WebGPUはカラーターゲットとfragment出力の対応が厳密なので、出力の数をWGSLから数える
const countOutputs = ( wgsl: string ) => {

	const struct = /struct FragmentOutput \{([^}]*)\}/.exec( wgsl );

	return struct ? ( struct[ 1 ].match( /@location\(/g ) || [] ).length : 0;

};

export type DrawState = {
	units: ( WebGPUTexture | null )[],
	fallback2d: WebGPUTexture,
	fallbackCube: WebGPUTexture,
	colorFormats: GPUTextureFormat[],
	hasDepth: boolean,
	cullFace: boolean,
	depthTest: boolean,
	depthWrite: boolean,
	blendEnabled: boolean,
	blending: Blending,
	drawType: DrawType,
};

/*-------------------------------
	Program
-------------------------------*/

export class WebGPUProgram implements BackendProgram {

	public name: string;

	private _vao: Map<string, WebGPUVAO>;
	private _uniforms: Map<string, UniformValue>;
	private _results: Map<StageName, TranspileResult>;
	private _stages: Map<StageName, Stage>;
	private _pipelines: Map<string, { pipeline: GPURenderPipeline, slots: string[] }>;
	private _failed: boolean;
	private _warnedTargets: boolean;

	constructor() {

		this.name = '';
		this._vao = new Map();
		this._uniforms = new Map();
		this._results = new Map();
		this._stages = new Map();
		this._pipelines = new Map();
		this._failed = false;
		this._warnedTargets = false;

	}

	// ProgramManager が生成済みのprogramをキャッシュするための実体参照
	public get program() {

		return this;

	}

	/*-------------------------------
		Shader
	-------------------------------*/

	// 両stageをdevサーバーのWGSL変換へ投げる。pipelineはdraw時に遅延構築する
	public setShader( vertexShaderSrc: string, fragmentShaderSrc: string ) {

		this._transpile( 'vertex', vertexShaderSrc );
		this._transpile( 'fragment', fragmentShaderSrc );

	}

	private async _transpile( stage: StageName, source: string ) {

		try {

			const res = await fetch( WGSL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify( { source, stage } ),
			} );

			const body = await res.json();

			if ( ! res.ok ) {

				this._failed = true;

				console.error( `[WebGPUBackend] ${this.name || '(no name)'} の ${stage} 変換に失敗しました\n${body.error}` );

				return;

			}

			this._results.set( stage, body );

		} catch ( e ) {

			this._failed = true;

			console.error( `[WebGPUBackend] ${this.name || '(no name)'} の ${stage} 変換に失敗しました`, e );

		}

	}

	/*-------------------------------
		Uniform
	-------------------------------*/

	public setUniform( name: string, type: GLP.UniformType, value: ( number | boolean )[] ) {

		const uniform = this._uniforms.get( name );

		if ( uniform ) {

			uniform.type = type;

			// 呼び出し側が配列を使い回すため参照は保持しない
			const dst = uniform.value;
			dst.length = value.length;

			for ( let i = 0; i < value.length; i ++ ) {

				dst[ i ] = value[ i ];

			}

		} else {

			this._uniforms.set( name, { type, value: value.concat() } );

		}

	}

	/*-------------------------------
		VAO
	-------------------------------*/

	public getVAO( id: string = '_' ): BackendVAO {

		let vao = this._vao.get( id );

		if ( ! vao ) {

			vao = new WebGPUVAO();

			this._vao.set( id, vao );

		}

		return vao;

	}

	/*-------------------------------
		Draw
	-------------------------------*/

	// pipelineとbind groupを揃えてrender passへ設定する。準備が整っていなければfalse
	public setup( device: GPUDevice, pass: GPURenderPassEncoder, vao: WebGPUVAO, state: DrawState ): boolean {

		if ( this._failed || ! this._build( device ) ) return false;

		// アタッチメントより多い出力を持つシェーダーはWebGPUではpipelineを組めない（shadowMap / envMap が該当）
		const outputs = this._stages.get( 'fragment' )!.outputs;

		if ( outputs > state.colorFormats.length ) {

			if ( ! this._warnedTargets ) {

				this._warnedTargets = true;

				console.warn( `[WebGPUBackend] ${this.name || '(no name)'} は ${outputs} 個のfragment出力を持ちますが、ターゲットは ${state.colorFormats.length} 枚しかないため描画をスキップします` );

			}

			return false;

		}

		const pipelineKey = [
			vao.layoutKey,
			state.colorFormats.join( '/' ),
			state.hasDepth ? 'd' : '-',
			state.cullFace ? 'c' : '-',
			state.depthTest ? 't' : '-',
			state.depthWrite ? 'w' : '-',
			state.blendEnabled ? state.blending : '-',
			state.drawType,
		].join( '|' );

		const textures: { [key in StageName]: ( WebGPUTexture | null )[] } = {
			vertex: this._resolveTextures( 'vertex', state ),
			fragment: this._resolveTextures( 'fragment', state ),
		};

		const layoutKeys = {
			vertex: this._layoutKey( 'vertex', textures.vertex ),
			fragment: this._layoutKey( 'fragment', textures.fragment ),
		};

		let cache = this._pipelines.get( `${pipelineKey}|${layoutKeys.vertex}|${layoutKeys.fragment}` );

		if ( ! cache ) {

			cache = this._createPipeline( device, vao, state, textures, layoutKeys );

			if ( ! cache ) return false;

			this._pipelines.set( `${pipelineKey}|${layoutKeys.vertex}|${layoutKeys.fragment}`, cache );

		}

		pass.setPipeline( cache.pipeline );

		for ( let i = 0; i < STAGES.length; i ++ ) {

			const stage = STAGES[ i ];
			const group = this._bindGroup( device, stage, textures[ stage ], layoutKeys[ stage ] );

			if ( ! group ) return false;

			pass.setBindGroup( i, group );

		}

		for ( let i = 0; i < cache.slots.length; i ++ ) {

			const attr = vao.attributes.get( cache.slots[ i ] )!;
			const buffer = attr.buffer.getBuffer();

			if ( ! buffer ) return false;

			pass.setVertexBuffer( i, buffer );

		}

		if ( vao.indexBuffer ) {

			const buffer = vao.indexBuffer.getBuffer();

			if ( ! buffer ) return false;

			pass.setIndexBuffer( buffer, vao.indexBuffer.array!.BYTES_PER_ELEMENT == 4 ? 'uint32' : 'uint16' );

		}

		return true;

	}

	/*-------------------------------
		Build
	-------------------------------*/

	// 変換結果が揃った時点でシェーダーモジュールとUBOを作る
	private _build( device: GPUDevice ): boolean {

		for ( const stage of STAGES ) {

			if ( this._stages.has( stage ) ) continue;

			const result = this._results.get( stage );

			if ( ! result ) return false;

			this._stages.set( stage, {
				result,
				module: device.createShaderModule( { label: `${this.name}/${stage}`, code: result.wgsl } ),
				binder: result.uniforms.binding === null
					? null
					: new UniformBinder( device, result.uniforms, `${this.name}/${stage}` ),
				outputs: stage === 'fragment' ? countOutputs( result.wgsl ) : 0,
				layouts: new Map(),
				bindGroups: new Map(),
			} );

		}

		return true;

	}

	// メタデータのテクスチャ名からユニット表を引く
	private _resolveTextures( stageName: StageName, state: DrawState ): ( WebGPUTexture | null )[] {

		const stage = this._stages.get( stageName )!;

		return stage.result.textures.map( ( t ) => {

			const uniform = this._uniforms.get( t.name );
			const unit = uniform ? Number( uniform.value[ 0 ] ) : - 1;

			return state.units[ unit ] || ( t.dimension === 'cube' ? state.fallbackCube : state.fallback2d );

		} );

	}

	// bind group layout はバインドされるテクスチャのフォーマットで決まる
	private _layoutKey( stageName: StageName, textures: ( WebGPUTexture | null )[] ) {

		return `${stageName}:${textures.map( ( t ) => t && t.format ).join( ',' )}`;

	}

	private _bindGroupLayout( device: GPUDevice, stageName: StageName, textures: ( WebGPUTexture | null )[], key: string ): GPUBindGroupLayout {

		const stage = this._stages.get( stageName )!;
		const cached = stage.layouts.get( key );

		if ( cached ) return cached;

		const visibility = stageName === 'vertex' ? GPUShaderStage.VERTEX : GPUShaderStage.FRAGMENT;
		const entries: GPUBindGroupLayoutEntry[] = [];

		if ( stage.binder ) {

			entries.push( { binding: 0, visibility, buffer: { type: 'uniform' } } );

		}

		stage.result.textures.forEach( ( t, i ) => {

			const unfilterable = isUnfilterable( textures[ i ]!.format );

			entries.push( {
				binding: t.texBinding,
				visibility,
				texture: {
					sampleType: unfilterable ? 'unfilterable-float' : 'float',
					viewDimension: t.dimension,
				},
			} );

			entries.push( {
				binding: t.smpBinding,
				visibility,
				sampler: { type: unfilterable ? 'non-filtering' : 'filtering' },
			} );

		} );

		const layout = device.createBindGroupLayout( { entries } );

		stage.layouts.set( key, layout );

		return layout;

	}

	private _bindGroup( device: GPUDevice, stageName: StageName, textures: ( WebGPUTexture | null )[], layoutKey: string ): GPUBindGroup | null {

		const stage = this._stages.get( stageName )!;

		if ( stage.binder ) {

			stage.binder.update( this._uniforms, `${this.name}/${stageName}` );

		}

		const key = `${layoutKey}|${textures.map( ( t ) => t && `${t.id}:${t.generation}` ).join( ',' )}`;
		const cached = stage.bindGroups.get( key );

		if ( cached ) return cached;

		const entries: GPUBindGroupEntry[] = [];

		if ( stage.binder ) {

			entries.push( { binding: 0, resource: { buffer: stage.binder.buffer } } );

		}

		for ( let i = 0; i < stage.result.textures.length; i ++ ) {

			const meta = stage.result.textures[ i ];
			const texture = textures[ i ]!;
			const view = texture.getView();
			const sampler = texture.getSampler();

			if ( ! view || ! sampler ) return null;

			entries.push( { binding: meta.texBinding, resource: view } );
			entries.push( { binding: meta.smpBinding, resource: sampler } );

		}

		const group = device.createBindGroup( {
			layout: this._bindGroupLayout( device, stageName, textures, layoutKey ),
			entries,
		} );

		stage.bindGroups.set( key, group );

		return group;

	}

	private _createPipeline( device: GPUDevice, vao: WebGPUVAO, state: DrawState, textures: { [key in StageName]: ( WebGPUTexture | null )[] }, layoutKeys: { [key in StageName]: string } ) {

		const vertex = this._stages.get( 'vertex' )!;
		const fragment = this._stages.get( 'fragment' )!;

		const locations = new Map( vertex.result.attributes.map( ( a ) => [ a.name, a.location ] ) );

		const slots: string[] = [];
		const buffers: GPUVertexBufferLayout[] = [];

		vao.attributes.forEach( ( attr, name ) => {

			const location = locations.get( name );

			if ( location === undefined || ! attr.buffer.array ) return;

			const bytes = attr.buffer.array.BYTES_PER_ELEMENT;
			const type = ATTRIBUTE_TYPE.get( attr.buffer.array.constructor.name ) || 'float32';

			// size 16 の属性は行列で、4つの連続したlocationへ分けて渡す
			const attributes: GPUVertexAttribute[] = attr.size == 16
				? [ 0, 1, 2, 3 ].map( ( i ) => ( { shaderLocation: location + i, offset: i * 16, format: `${type}x4` as GPUVertexFormat } ) )
				: [ { shaderLocation: location, offset: 0, format: ( attr.size > 1 ? `${type}x${attr.size}` : type ) as GPUVertexFormat } ];

			buffers.push( {
				arrayStride: attr.size * bytes,
				stepMode: attr.instanceDivisor ? 'instance' : 'vertex',
				attributes,
			} );

			slots.push( name );

		} );

		const targets: ( GPUColorTargetState | null )[] = state.colorFormats.map( ( format, i ) => {

			// シェーダーが書かないアタッチメントはnullターゲットにする
			if ( i >= fragment.outputs ) return null;

			// rgba32float はブレンドできない
			if ( ! state.blendEnabled || isUnfilterable( format ) ) return { format };

			const [ src, dst ] = BLEND[ state.blending ];

			return {
				format,
				blend: {
					color: { srcFactor: src, dstFactor: dst, operation: 'add' },
					alpha: { srcFactor: src, dstFactor: dst, operation: 'add' },
				},
			};

		} );

		const pipeline = device.createRenderPipeline( {
			label: this.name,
			layout: device.createPipelineLayout( {
				bindGroupLayouts: STAGES.map( ( stage ) => this._bindGroupLayout( device, stage, textures[ stage ], layoutKeys[ stage ] ) ),
			} ),
			vertex: { module: vertex.module, entryPoint: 'main', buffers },
			fragment: { module: fragment.module, entryPoint: 'main', targets },
			primitive: {
				topology: TOPOLOGY[ state.drawType ],
				cullMode: state.cullFace ? 'back' : 'none',
				// R9でクリップ空間のYを反転しているため、GLの表裏と逆向きになる
				frontFace: 'cw',
			},
			depthStencil: state.hasDepth ? {
				format: DEPTH_FORMAT,
				depthWriteEnabled: state.depthWrite,
				depthCompare: state.depthTest ? 'less' : 'always',
			} : undefined,
		} );

		return { pipeline, slots };

	}

}
