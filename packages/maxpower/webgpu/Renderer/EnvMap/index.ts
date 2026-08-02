import * as GLP from 'glpower';

import {
	DEPTH_FORMAT,
	ENVMAP_CLIP_CORRECTION,
	ENVMAP_FORMAT,
	ENVMAP_MIP_COUNT,
	ENVMAP_SIZE,
	FRAME_FIELDS,
} from '../../Bindings';
import { UniformBinder } from '../../resources/UniformBinder';
import { PREFILTER_FIELDS, prefilterWgsl } from '../shaders/prefilter';

/*-------------------------------
	環境マップのGPUリソース

	6面をキューブテクスチャのミップ0へ描き、ミップ1〜4を roughness ごとに
	事前フィルタする。webgl側の PMREMRender が3x2の面アトラスを作っていたのは
	WebGL2でキューブのミップを明示指定して引けないための回避策で、
	WebGPUではキューブのミップをそのまま使えるためアトラスは要らない。
-------------------------------*/

// GL規約の視線行列。並びはキューブのレイヤー番号（+X, -X, +Y, -Y, +Z, -Z）
const FACES = [
	{ name: '+X', target: new GLP.Vector( 1, 0, 0 ), up: new GLP.Vector( 0, - 1, 0 ) },
	{ name: '-X', target: new GLP.Vector( - 1, 0, 0 ), up: new GLP.Vector( 0, - 1, 0 ) },
	{ name: '+Y', target: new GLP.Vector( 0, 1, 0 ), up: new GLP.Vector( 0, 0, 1 ) },
	{ name: '-Y', target: new GLP.Vector( 0, - 1, 0 ), up: new GLP.Vector( 0, 0, - 1 ) },
	{ name: '+Z', target: new GLP.Vector( 0, 0, 1 ), up: new GLP.Vector( 0, - 1, 0 ) },
	{ name: '-Z', target: new GLP.Vector( 0, 0, - 1 ), up: new GLP.Vector( 0, - 1, 0 ) },
];

const NEAR = 0.1;
const FAR = 1000;

// ミップ1〜4のサンプル数。roughnessが上がるほど広く積むので数を増やす
const SAMPLE_COUNTS = [ 32, 64, 96, 128 ];

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

	private _texture: GPUTexture;
	private _depthTexture: GPUTexture;
	private _binders: UniformBinder[];

	// prefilter
	private _pipelines: GPURenderPipeline[];
	private _faceBindGroups: GPUBindGroup[];
	private _faceBinders: UniformBinder[];
	private _mipViews: GPUTextureView[][];

	constructor( device: GPUDevice, frameLayout: GPUBindGroupLayout ) {

		this._texture = device.createTexture( {
			label: 'envMap',
			size: [ ENVMAP_SIZE, ENVMAP_SIZE, 6 ],
			format: ENVMAP_FORMAT,
			mipLevelCount: ENVMAP_MIP_COUNT,
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
		const projectionMatrix = new GLP.Matrix().perspective( 90, 1, NEAR, FAR ).preMultiply( ENVMAP_CLIP_CORRECTION );
		const origin = new GLP.Vector( 0, 0, 0 );

		this._binders = [];
		this.faceRenders = FACES.map( ( face, i ) => {

			const binder = new UniformBinder( device, FRAME_FIELDS, `envMap/${face.name}` );

			binder.update( {
				uCameraNear: { value: NEAR, type: '1f' },
				uCameraFar: { value: FAR, type: '1f' },
				uCameraPosition: { value: origin, type: '3fv' },
				uResolution: { value: new GLP.Vector( ENVMAP_SIZE, ENVMAP_SIZE ), type: '2fv' },
				uViewMatrix: { value: new GLP.Matrix().lookAt( origin, face.target, face.up ).inverse(), type: 'Matrix4fv' },
				uProjectionMatrix: { value: projectionMatrix, type: 'Matrix4fv' },
			} );

			this._binders.push( binder );

			return {
				label: `envMap/${face.name}`,
				view: this._faceView( 0, i ),
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

		// 事前フィルタの入力はミップ0だけに絞る。書き込み先のミップと重ならないようにするため
		const sourceView = this._texture.createView( {
			label: 'envMap/source',
			dimension: 'cube',
			baseMipLevel: 0,
			mipLevelCount: 1,
		} );

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
		this._mipViews = [];

		for ( let mip = 1; mip < ENVMAP_MIP_COUNT; mip ++ ) {

			const constants = {
				uRoughness: mip / ( ENVMAP_MIP_COUNT - 1 ),
				uSampleCount: SAMPLE_COUNTS[ mip - 1 ],
			};

			this._pipelines.push( device.createRenderPipeline( {
				label: `prefilter/mip${mip}`,
				layout: pipelineLayout,
				vertex: { module, entryPoint: 'vsMain' },
				fragment: { module, entryPoint: 'fsMain', constants, targets: [ { format: ENVMAP_FORMAT } ] },
				primitive: { topology: 'triangle-list' },
			} ) );

			this._mipViews.push( FACES.map( ( _, face ) => this._faceView( mip, face ) ) );

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

	// ミップ0の描画結果から、roughnessごとのミップを作り直す
	public prefilter( encoder: GPUCommandEncoder ) {

		for ( let i = 0; i < this._pipelines.length; i ++ ) {

			for ( let face = 0; face < FACES.length; face ++ ) {

				const pass = encoder.beginRenderPass( {
					label: `prefilter/mip${i + 1}/${FACES[ face ].name}`,
					colorAttachments: [ {
						view: this._mipViews[ i ][ face ],
						loadOp: 'clear',
						storeOp: 'store',
						clearValue: { r: 0, g: 0, b: 0, a: 1 },
					} ],
				} );

				pass.setPipeline( this._pipelines[ i ] );
				pass.setBindGroup( 0, this._faceBindGroups[ face ] );
				pass.draw( 3 );

				pass.end();

			}

		}

	}

	public dispose() {

		this._texture.destroy();
		this._depthTexture.destroy();
		this._binders.concat( this._faceBinders ).forEach( ( binder ) => binder.dispose() );

	}

}
