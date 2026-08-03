import { FRAME_FIELDS, GROUP_FRAME } from '../Bindings';
import { UniformBinder, buildStructWgsl, fieldsFromUniforms } from '../resources/UniformBinder';

import type { StorageSource } from '../Bindings';
import type { Renderer } from '../Renderer';
import type { UniformField } from '../resources/UniformBinder';
import type * as GLP from 'glpower';

/*-------------------------------
	GPGPU（compute pass + storage buffer ピンポン）

	要素の struct（vec4fフィールドのみ）を宣言し、csMain を定義したWGSLで
	src（前フレーム）→ dst（今フレーム）へ書く。dispatch後に読み書きを入れ替え、
	Material は storages 宣言経由で「今フレーム書いた側」を instance_index で読む。

	フィールドを vec4f に限定しているのは、storage アドレス空間のレイアウトを
	CPU側で再現せずとも「宣言順 × 16バイト」でWGSLと一致させるため。

	bind group は group0=フレーム（Rendererと共有）/ group1=パス
	（binding0=uniform（あれば）/ binding1=src / binding2=dst）。

	updateImpl から compute() を呼ぶとレンダラーのキューへ登録され、
	フレーム先頭（shadowMapの前）の compute pass でまとめて実行される。
-------------------------------*/

const WORKGROUP_SIZE = 64;

export interface GPUComputeParam {
	name: string;
	// 要素数。シェーダーへは GPU_COUNT として前置される
	count: number;
	// 要素のstruct定義。fields はすべて vec4f
	struct: { name: string, fields: string[] };
	// csMain を定義したWGSL本体。宣言部は前置される
	wgsl: string;
	uniforms?: GLP.Uniforms;
}

export class GPUCompute implements StorageSource {

	public readonly name: string;
	public readonly count: number;
	public readonly structName: string;
	public readonly structWgsl: string;
	public readonly uniforms: GLP.Uniforms;

	public buffers: [ GPUBuffer, GPUBuffer ] | null;
	public readIndex: number;

	private _renderer: Renderer;
	private _wgsl: string;
	private _fields: UniformField[];
	private _fieldNames: string[];
	private _initData: Float32Array | null;
	private _pipeline: GPUComputePipeline | null;
	private _binder: UniformBinder | null;
	private _bindGroups: [ GPUBindGroup, GPUBindGroup ] | null;
	private _dirty: boolean;

	constructor( renderer: Renderer, param: GPUComputeParam ) {

		this.name = param.name;
		this.count = param.count;
		this.structName = param.struct.name;
		this.uniforms = param.uniforms || {};

		this._fieldNames = param.struct.fields;
		this.structWgsl = `struct ${this.structName} {\n${this._fieldNames.map( ( f ) => `\t${f}: vec4f,` ).join( '\n' )}\n};`;

		this._renderer = renderer;
		this._wgsl = param.wgsl;
		this._fields = fieldsFromUniforms( this.uniforms );
		this._initData = null;
		this._pipeline = null;
		this._binder = null;
		this._bindGroups = null;
		this._dirty = false;

		this.buffers = null;
		this.readIndex = 0;

	}

	public get wgsl() {

		return this._wgsl;

	}

	public set wgsl( value: string ) {

		this._wgsl = value;
		this._dirty = true;

	}

	// 宣言部を差し込んだWGSLの完成形
	public get shaderSource() {

		const chunks = [
			`const GPU_COUNT: u32 = ${this.count}u;`,
			`const GPU_WORKGROUP: u32 = ${WORKGROUP_SIZE}u;`,
			buildStructWgsl( 'FrameUniforms', FRAME_FIELDS ),
			`@group(${GROUP_FRAME}) @binding(0) var<uniform> frame: FrameUniforms;`,
			this.structWgsl,
			`@group(1) @binding(1) var<storage, read> src: array<${this.structName}>;`,
			`@group(1) @binding(2) var<storage, read_write> dst: array<${this.structName}>;`,
		];

		if ( this._fields.length > 0 ) {

			chunks.push( buildStructWgsl( 'ComputeUniforms', this._fields ) );
			chunks.push( '@group(1) @binding(0) var<uniform> gpu: ComputeUniforms;' );

		}

		chunks.push( this._wgsl );

		return chunks.join( '\n\n' );

	}

	// 初期値を設定する。cb はフィールド名 → vec4 の辞書を返す（省略したフィールドは0）
	public init( cb: ( index: number ) => { [ field: string ]: number[] } ) {

		const stride = this._fieldNames.length * 4;
		const data = new Float32Array( this.count * stride );

		for ( let i = 0; i < this.count; i ++ ) {

			const values = cb( i );

			for ( let j = 0; j < this._fieldNames.length; j ++ ) {

				const v = values[ this._fieldNames[ j ] ];

				if ( v ) data.set( v.slice( 0, 4 ), i * stride + j * 4 );

			}

		}

		this._initData = data;

		if ( this.buffers ) {

			const device = this._renderer.device;

			if ( device ) {

				device.queue.writeBuffer( this.buffers[ 0 ], 0, data );
				device.queue.writeBuffer( this.buffers[ 1 ], 0, data );

			}

		}

	}

	// レンダラーのキューへ登録する。登録したフレームだけ計算が走る
	public compute() {

		this._renderer.enqueueCompute( this );

	}

	// フレーム先頭の compute pass から呼ばれる（ComputeTask 実装）
	public encode( device: GPUDevice, pass: GPUComputePassEncoder, uniformLayout: GPUBindGroupLayout, frameBindGroup: GPUBindGroup ) {

		if ( ! this.buffers ) this._createBuffers( device );

		if ( ! this._pipeline || this._dirty ) {

			this._build( device, uniformLayout );
			this._dirty = false;

		}

		if ( this._binder ) this._binder.update( this.uniforms );

		pass.setPipeline( this._pipeline! );
		pass.setBindGroup( GROUP_FRAME, frameBindGroup );
		pass.setBindGroup( 1, this._bindGroups![ this.readIndex ] );
		pass.dispatchWorkgroups( Math.ceil( this.count / WORKGROUP_SIZE ) );

		// 今書いた側を読み側へ回す
		this.readIndex = 1 - this.readIndex;

	}

	private _createBuffers( device: GPUDevice ) {

		const byteLength = this.count * this._fieldNames.length * 16;

		this.buffers = [ 0, 1 ].map( ( i ) => {

			const buffer = device.createBuffer( {
				label: `${this.name}/${i}`,
				size: byteLength,
				usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
				mappedAtCreation: this._initData !== null,
			} );

			if ( this._initData ) {

				new Float32Array( buffer.getMappedRange() ).set( this._initData );
				buffer.unmap();

			}

			return buffer;

		} ) as [ GPUBuffer, GPUBuffer ];

	}

	private _build( device: GPUDevice, uniformLayout: GPUBindGroupLayout ) {

		const hasUniforms = this._fields.length > 0;

		const layout = device.createBindGroupLayout( {
			label: this.name,
			entries: [
				...( hasUniforms ? [ { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' as const } } ] : [] ),
				{ binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' as const } },
				{ binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' as const } },
			],
		} );

		const module = device.createShaderModule( { label: this.name, code: this.shaderSource } );

		this._pipeline = device.createComputePipeline( {
			label: this.name,
			layout: device.createPipelineLayout( { bindGroupLayouts: [ uniformLayout, layout ] } ),
			compute: { module, entryPoint: 'csMain' },
		} );

		if ( hasUniforms && ! this._binder ) {

			this._binder = new UniformBinder( device, this._fields, this.name );

		}

		// bindGroups[i] = buffers[i] を読み、もう片方へ書く組
		this._bindGroups = [ 0, 1 ].map( ( i ) => device.createBindGroup( {
			label: `${this.name}/${i}`,
			layout,
			entries: [
				...( this._binder ? [ { binding: 0, resource: { buffer: this._binder.buffer } } ] : [] ),
				{ binding: 1, resource: { buffer: this.buffers![ i ] } },
				{ binding: 2, resource: { buffer: this.buffers![ 1 - i ] } },
			],
		} ) ) as [ GPUBindGroup, GPUBindGroup ];

	}

	public dispose() {

		this._renderer.cancelCompute( this );
		this.buffers?.forEach( ( buffer ) => buffer.destroy() );
		this.buffers = null;
		this._binder?.dispose();
		this._binder = null;
		this._pipeline = null;
		this._bindGroups = null;

	}

}
