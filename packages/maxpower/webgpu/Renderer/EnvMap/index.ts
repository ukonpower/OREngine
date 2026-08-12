import * as BSP from 'basepower';
import * as MTP from 'mathpower';

import {
	DEPTH_FORMAT,
	ENVMAP_CLIP_CORRECTION,
	ENVMAP_FORMAT,
	ENVMAP_MIP_COUNT,
	ENVMAP_SIZE,
	FRAME_FIELDS,
} from '../../backend/Bindings';
import { UniformBinder } from '../../backend/UniformBinder';
import { PREFILTER_FIELDS, prefilterWgsl } from '../shaders/prefilter';

/*-------------------------------
	環境マップのGPUリソース

	6面をソース用キューブへ描き、そこから全ミップ（0〜4）を roughness ごとに
	事前フィルタして時間累積する。ミップ0（roughness 0）も累積を通すのは
	webgl側 PMREMRender と同じで、鏡面反射のチラつきも平滑化するため。
	webgl側が3x2の面アトラスを作っていたのはWebGL2でキューブのミップを
	明示指定して引けないための回避策で、WebGPUでは不要。
-------------------------------*/

// GL規約の視線行列。並びはキューブのレイヤー番号（+X, -X, +Y, -Y, +Z, -Z）
const FACES = [
	{ name: '+X', target: new MTP.Vector( 1, 0, 0 ), up: new MTP.Vector( 0, - 1, 0 ) },
	{ name: '-X', target: new MTP.Vector( - 1, 0, 0 ), up: new MTP.Vector( 0, - 1, 0 ) },
	{ name: '+Y', target: new MTP.Vector( 0, 1, 0 ), up: new MTP.Vector( 0, 0, 1 ) },
	{ name: '-Y', target: new MTP.Vector( 0, - 1, 0 ), up: new MTP.Vector( 0, 0, - 1 ) },
	{ name: '+Z', target: new MTP.Vector( 0, 0, 1 ), up: new MTP.Vector( 0, - 1, 0 ) },
	{ name: '-Z', target: new MTP.Vector( 0, 0, - 1 ), up: new MTP.Vector( 0, - 1, 0 ) },
];

const NEAR = 0.1;
const FAR = 1000;

// ミップ0〜4の1フレームあたりのサンプル数。時間累積が前提。
// ミップが1段下がるとピクセル数が1/4になるため、4倍ずつ増やして
// ミップあたりの総コストを一定に保ちつつ、粗いミップの分散を抑える
const SAMPLE_COUNTS = [ 2, 8, 32, 128, 512 ];

// 累積の混合率。webgl側 pmrem.fs の mix( backBuffer, sum, 0.04 ) と同じ
const ACCUMULATION_RATE = 0.04;

// キューブ1面ぶんの描画先とカメラ
export type FaceRender = {
	label: string;
	view: GPUTextureView;
	frameBindGroup: GPUBindGroup;
}

export class EnvMap {

	// シェーディングパスが引く全ミップのキューブビュー
	public readonly view: GPUTextureView;
	public readonly sampler: GPUSampler;
	public readonly faceRenders: FaceRender[];
	public readonly depthView: GPUTextureView;
	// FrameDebugger用。[mip][face] の2Dビュー
	public readonly mipViews: GPUTextureView[][];

	private _texture: GPUTexture;
	private _sourceTexture: GPUTexture;
	private _depthTexture: GPUTexture;
	private _binders: UniformBinder[];

	// prefilter
	private _pipelines: GPURenderPipeline[];
	private _faceBindGroups: GPUBindGroup[];
	private _faceBinders: UniformBinder[];

	constructor( device: GPUDevice, frameLayout: GPUBindGroupLayout ) {

		this._texture = device.createTexture( {
			label: 'envMap',
			size: [ ENVMAP_SIZE, ENVMAP_SIZE, 6 ],
			format: ENVMAP_FORMAT,
			mipLevelCount: ENVMAP_MIP_COUNT,
			usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
		} );

		// シーン描画先。累積するPMREM本体と分けることで、鏡面（ミップ0）も累積を通せる
		this._sourceTexture = device.createTexture( {
			label: 'envMap/source',
			size: [ ENVMAP_SIZE, ENVMAP_SIZE, 6 ],
			format: ENVMAP_FORMAT,
			usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
		} );

		this.view = this._texture.createView( { label: 'envMap', dimension: 'cube' } );
		this.sampler = device.createSampler( {
			label: 'envMap',
			magFilter: 'linear',
			minFilter: 'linear',
			mipmapFilter: 'linear',
		} );

		this._depthTexture = device.createTexture( {
			label: 'envMap/depth',
			size: [ ENVMAP_SIZE, ENVMAP_SIZE ],
			format: DEPTH_FORMAT,
			usage: GPUTextureUsage.RENDER_ATTACHMENT,
		} );

		this.depthView = this._depthTexture.createView();

		// 面ごとのカメラ。原点から6方向を90度で見る
		const projectionMatrix = new MTP.Matrix().perspective( 90, 1, NEAR, FAR ).preMultiply( ENVMAP_CLIP_CORRECTION );
		const origin = new MTP.Vector( 0, 0, 0 );

		this._binders = [];
		this.faceRenders = FACES.map( ( face, i ) => {

			const binder = new UniformBinder( device, FRAME_FIELDS, `envMap/${face.name}` );

			binder.update( {
				uCameraNear: { value: NEAR, type: '1f' },
				uCameraFar: { value: FAR, type: '1f' },
				uCameraPosition: { value: origin, type: '3fv' },
				uResolution: { value: new MTP.Vector( ENVMAP_SIZE, ENVMAP_SIZE ), type: '2fv' },
				uViewMatrix: { value: new MTP.Matrix().lookAt( origin, face.target, face.up ).inverse(), type: 'Matrix4fv' },
				uProjectionMatrix: { value: projectionMatrix, type: 'Matrix4fv' },
			} );

			this._binders.push( binder );

			return {
				label: `envMap/${face.name}`,
				view: this._sourceTexture.createView( {
					label: `envMap/source/${face.name}`,
					dimension: '2d',
					baseArrayLayer: i,
					arrayLayerCount: 1,
				} ),
				frameBindGroup: device.createBindGroup( {
					label: `envMap/${face.name}`,
					layout: frameLayout,
					entries: [ { binding: 0, resource: { buffer: binder.buffer } } ],
				} ),
			};

		} );

		/*-------------------------------
			Prefilter
		-------------------------------*/

		const layout = device.createBindGroupLayout( {
			label: 'prefilter',
			entries: [
				{ binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
				{ binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float', viewDimension: 'cube' } },
				{ binding: 2, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } },
			],
		} );

		const sourceView = this._sourceTexture.createView( { label: 'envMap/source', dimension: 'cube' } );

		this._faceBinders = [];
		this._faceBindGroups = FACES.map( ( face, i ) => {

			const binder = new UniformBinder( device, PREFILTER_FIELDS, `prefilter/${face.name}` );

			binder.update( { uFace: { value: i, type: '1i' } } );

			this._faceBinders.push( binder );

			return device.createBindGroup( {
				label: `prefilter/${face.name}`,
				layout,
				entries: [
					{ binding: 0, resource: { buffer: binder.buffer } },
					{ binding: 1, resource: sourceView },
					{ binding: 2, resource: this.sampler },
				],
			} );

		} );

		const module = device.createShaderModule( { label: 'prefilter', code: prefilterWgsl } );
		const pipelineLayout = device.createPipelineLayout( { bindGroupLayouts: [ layout ] } );

		this._pipelines = [];
		this.mipViews = [];

		for ( let mip = 0; mip < ENVMAP_MIP_COUNT; mip ++ ) {

			const constants = {
				uRoughness: mip / ( ENVMAP_MIP_COUNT - 1 ),
				uSampleCount: SAMPLE_COUNTS[ mip ],
			};

			this._pipelines.push( device.createRenderPipeline( {
				label: `prefilter/mip${mip}`,
				layout: pipelineLayout,
				vertex: { module, entryPoint: 'vsMain' },
				fragment: { module, entryPoint: 'fsMain', constants, targets: [ {
					format: ENVMAP_FORMAT,
					// 既存のミップ内容と混ぜて時間累積する（比率はブレンド定数で与える）
					blend: {
						color: { srcFactor: 'constant', dstFactor: 'one-minus-constant' },
						alpha: { srcFactor: 'one', dstFactor: 'zero' },
					},
				} ] },
				primitive: { topology: 'triangle-list' },
			} ) );

			this.mipViews.push( FACES.map( ( _, face ) => this._faceView( mip, face ) ) );

		}

	}

	// 時間系のuniformを全faceへ反映する。カメラ・解像度は固定なので触らない
	public update( globalUniforms: BSP.Uniforms ) {

		const time = {
			uTime: globalUniforms.uTime,
			uTimeF: globalUniforms.uTimeF,
			uTimeE: globalUniforms.uTimeE,
			uTimeEF: globalUniforms.uTimeEF,
		};

		const jitter = { uTimeEF: globalUniforms.uTimeEF };

		for ( let i = 0; i < this._binders.length; i ++ ) {

			this._binders[ i ].update( time );
			this._faceBinders[ i ].update( jitter );

		}

	}

	private _faceView( mip: number, face: number ) {

		return this._texture.createView( {
			label: `envMap/mip${mip}/face${face}`,
			dimension: '2d',
			baseMipLevel: mip,
			mipLevelCount: 1,
			baseArrayLayer: face,
			arrayLayerCount: 1,
		} );

	}

	// ソースの描画結果を、roughnessごとのミップへ時間累積しながら焼き込む
	public prefilter( encoder: GPUCommandEncoder ) {

		for ( let i = 0; i < this._pipelines.length; i ++ ) {

			for ( let face = 0; face < FACES.length; face ++ ) {

				const pass = encoder.beginRenderPass( {
					label: `prefilter/mip${i}/${FACES[ face ].name}`,
					colorAttachments: [ {
						view: this.mipViews[ i ][ face ],
						loadOp: 'load',
						storeOp: 'store',
					} ],
				} );

				pass.setPipeline( this._pipelines[ i ] );
				pass.setBindGroup( 0, this._faceBindGroups[ face ] );
				pass.setBlendConstant( { r: ACCUMULATION_RATE, g: ACCUMULATION_RATE, b: ACCUMULATION_RATE, a: ACCUMULATION_RATE } );
				pass.draw( 3 );

				pass.end();

			}

		}

	}

	public dispose() {

		this._texture.destroy();
		this._sourceTexture.destroy();
		this._depthTexture.destroy();
		this._binders.concat( this._faceBinders ).forEach( ( binder ) => binder.dispose() );

	}

}
