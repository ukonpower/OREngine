import * as GLP from 'glpower';

import { Camera } from '../../core/Component/Camera';
import { Light } from '../../core/Component/Light';
import { Mesh } from '../../core/Component/Mesh';
import { Serializable } from '../../core/Serializable';
import {
	CLIP_CORRECTION,
	DEPTH_FORMAT,
	ENVMAP_FORMAT,
	ENVMAP_SIZE,
	FRAME_FIELDS,
	GBUFFER_ATTACHMENTS,
	GBUFFER_BYTES_PER_SAMPLE,
	GBUFFER_TARGETS,
	GROUP_FRAME,
	GROUP_MATERIAL,
	GROUP_OBJECT,
	OBJECT_FIELDS,
	SCENE_FORMAT,
	SHADOW_FORMAT,
} from '../Bindings';
import { PostProcessPipeline } from '../Component/PostProcessPipeline';
import { Material } from '../Material';
import { GeometryBuffer, VERTEX_BUFFER_LAYOUT } from '../resources/GeometryBuffer';
import { UniformBinder } from '../resources/UniformBinder';

import { EnvMap } from './EnvMap';
import { Lights } from './Lights';
import { PipelinePostProcess } from './PipelinePostProcess';
import { RenderTargets } from './RenderTargets';
import presentWgsl from './shaders/present.wgsl';
import { ENVMAP_BINDING, ENVMAP_SAMPLER_BINDING, LIGHTSHAFT_BINDING, SSAO_BINDING, buildShadingSource } from './shaders/shading';
import { Sky } from './Sky';

import type { Engine, RendererContract } from '../../core/Engine';
import type { Entity, EntityUpdateEvent } from '../../core/Entity';
import type { Geometry } from '../../core/Geometry';
import type { MaterialPhase } from '../Material';
import type { PipelineConfig } from './PipelinePostProcess';

export type { PipelineConfig };

// mesh.materialはバックエンド不透明型なので、webgpu側でMaterialへ絞る（未設定時は既定マテリアル）
const _defaultMaterial = new Material( { name: 'default' } );

const getMaterial = ( mesh: Mesh ) => ( mesh.material || _defaultMaterial ) as Material;

type MaterialResource = {
	// フェーズごとのパイプライン。マテリアルが参加しないフェーズは null
	pipelines: { [K in MaterialPhase]: GPURenderPipeline | null };
	// uniformを持たないマテリアルは group2 ごと存在しない
	binder: UniformBinder | null;
	bindGroup: GPUBindGroup | null;
}

type ObjectResource = {
	binder: UniformBinder;
	bindGroup: GPUBindGroup;
}

type RenderStack = {
	light: Entity[];
	shadowMap: Entity[];
	deferred: Entity[];
	forward: Entity[];
	envMap: Entity[];
}

export class Renderer extends Serializable implements RendererContract {

	public readonly canvas: HTMLCanvasElement;
	public globalUniforms: GLP.Uniforms;
	public resolution: GLP.Vector;
	public pipelineConfig: PipelineConfig;

	// device
	private _context: GPUCanvasContext | null;
	private _device: GPUDevice | null;
	private _canvasFormat: GPUTextureFormat;

	// layout
	private _uniformLayout: GPUBindGroupLayout | null;
	private _gBufferLayout: GPUBindGroupLayout | null;
	private _sceneLayout: GPUBindGroupLayout | null;

	// bindings
	private _frameUniforms: GLP.Uniforms;
	private _objectUniforms: GLP.Uniforms;
	private _frameBinder: UniformBinder | null;
	private _frameBindGroup: GPUBindGroup | null;

	// pass
	public sky: Sky;
	private _targets: RenderTargets;
	private _lights: Lights | null;
	private _envMap: EnvMap | null;
	private _pipeline: PipelinePostProcess | null;
	private _shadingPipeline: GPURenderPipeline | null;
	private _presentPipeline: GPURenderPipeline | null;
	private _gBufferBindGroup: GPUBindGroup | null;
	private _sceneBindGroup: GPUBindGroup | null;
	private _sceneView: GPUTextureView | null;

	// フレームのコマンド記録中だけ有効。drawPass通知を受けたエディタのblitが
	// パス出力直後の位置へ差し込むために参照する
	private _frameEncoder: GPUCommandEncoder | null;

	// cache
	private _materialResources: Map<Material, MaterialResource>;
	private _objectResources: Map<Entity, ObjectResource>;
	private _geometryBuffers: Map<Geometry, GeometryBuffer>;
	private _editorPipelines: Map<Material, Map<string, GPURenderPipeline>>;

	// tmp
	private _stack: RenderStack;
	private _cameraPosition: GLP.Vector;
	private _projectionMatrix: GLP.Matrix;
	private _projectionMatrixInverse: GLP.Matrix;
	private _projectionMatrixPrev: GLP.Matrix;
	private _normalMatrix: GLP.Matrix;
	private _passResolution: GLP.Vector;
	private _passPixelSize: GLP.Vector;

	constructor( canvas: HTMLCanvasElement, engine: Engine ) {

		super();

		this.canvas = canvas;
		this.globalUniforms = {};
		this.resolution = new GLP.Vector();
		this.pipelineConfig = {
			motionBlur: true,
			motionBlurPower: 1.0,
			ssr: true,
			ssao: true,
			lightShaft: true,
			dof: true,
		};

		this._context = canvas.getContext( 'webgpu' );
		this._device = null;
		this._canvasFormat = 'bgra8unorm';

		this._uniformLayout = null;
		this._gBufferLayout = null;
		this._sceneLayout = null;
		this._frameEncoder = null;

		// 時間・解像度は engine の globalUniforms から入る
		this._frameUniforms = {
			uCameraNear: { value: 0.1, type: '1f' },
			uCameraFar: { value: 1000, type: '1f' },
			uCameraPosition: { value: new GLP.Vector(), type: '3fv' },
			uViewMatrix: { value: new GLP.Matrix(), type: 'Matrix4fv' },
			uProjectionMatrix: { value: new GLP.Matrix(), type: 'Matrix4fv' },
			uProjectionMatrixInverse: { value: new GLP.Matrix(), type: 'Matrix4fv' },
			uCameraMatrix: { value: new GLP.Matrix(), type: 'Matrix4fv' },
			uViewMatrixPrev: { value: new GLP.Matrix(), type: 'Matrix4fv' },
			uProjectionMatrixPrev: { value: new GLP.Matrix(), type: 'Matrix4fv' },
		};

		this._objectUniforms = {
			uModelMatrix: { value: new GLP.Matrix(), type: 'Matrix4fv' },
			uNormalMatrix: { value: new GLP.Matrix(), type: 'Matrix4fv' },
			uModelMatrixPrev: { value: new GLP.Matrix(), type: 'Matrix4fv' },
		};

		this._frameBinder = null;
		this._frameBindGroup = null;

		this._targets = new RenderTargets();
		this._lights = null;
		this._envMap = null;
		this._pipeline = null;
		this._shadingPipeline = null;
		this._presentPipeline = null;
		this._gBufferBindGroup = null;
		this._sceneBindGroup = null;
		this._sceneView = null;

		this._materialResources = new Map();
		this._objectResources = new Map();
		this._geometryBuffers = new Map();
		this._editorPipelines = new Map();

		this._stack = { light: [], shadowMap: [], deferred: [], forward: [], envMap: [] };
		this._cameraPosition = this._frameUniforms.uCameraPosition.value;
		this._projectionMatrix = this._frameUniforms.uProjectionMatrix.value;
		this._projectionMatrixInverse = this._frameUniforms.uProjectionMatrixInverse.value;
		this._projectionMatrixPrev = this._frameUniforms.uProjectionMatrixPrev.value;
		this._normalMatrix = this._objectUniforms.uNormalMatrix.value;
		this._passResolution = new GLP.Vector();
		this._passPixelSize = new GLP.Vector();

		this.sky = new Sky( engine );

		this._registerFields();

		this._init();

	}

	// scene.json の renderer 直下に入る空の設定（webgl側と同じキー）
	private _registerFields() {

		const skyDir = this.fieldDir( 'sky' );

		skyDir.field( 'skyColor',
			() => this.sky.color.getElm( 'vec3' ),
			( v: number[] ) => {

				this.sky.color.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: 'vector' } }
		);

		skyDir.field( 'groundColor',
			() => this.sky.groundColor.getElm( 'vec3' ),
			( v: number[] ) => {

				this.sky.groundColor.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: 'vector' } }
		);

		skyDir.field( 'intensity',
			() => this.sky.intensity,
			( v: number ) => {

				this.sky.intensity = v;

			},
			{ step: 0.1 }
		);

		const pipeline = this.fieldDir( 'pipeline' );

		( [ 'motionBlur', 'ssr', 'ssao', 'dof', 'lightShaft' ] as const ).forEach( ( key ) => {

			const dir = pipeline.dir( key );

			dir.field( 'enabled', () => this.pipelineConfig[ key ] ?? true, ( v: boolean ) => {

				this.applyPipelineConfig( { [ key ]: v } );

			} );

			if ( key === 'motionBlur' ) {

				dir.field( 'power', () => this.pipelineConfig.motionBlurPower ?? 1.0, ( v: number ) => {

					this.applyPipelineConfig( { motionBlurPower: v } );

				}, { step: 0.1 } );

			}

		} );

	}

	/*-------------------------------
		Init
	-------------------------------*/

	// adapter / device を取得してコンテキストとパス共通のリソースを構成する。
	// 準備できるまで描画はすべてスキップされる
	private async _init() {

		const gpu = navigator.gpu;

		if ( ! gpu || ! this._context ) {

			console.error( '[webgpu] navigator.gpu がありません（WebGPU非対応、またはsecure contextではありません）' );

			return;

		}

		const adapter = await gpu.requestAdapter();

		if ( ! adapter ) {

			console.error( '[webgpu] requestAdapter() が null を返しました' );

			return;

		}

		// gBufferのMRT5は既定上限（32 bytes/sample）を超えるため引き上げを要求する
		if ( adapter.limits.maxColorAttachmentBytesPerSample < GBUFFER_BYTES_PER_SAMPLE ) {

			console.error( `[webgpu] maxColorAttachmentBytesPerSample が足りません（必要 ${GBUFFER_BYTES_PER_SAMPLE} / 上限 ${adapter.limits.maxColorAttachmentBytesPerSample}）` );

			return;

		}

		const device = await adapter.requestDevice( {
			requiredLimits: { maxColorAttachmentBytesPerSample: GBUFFER_BYTES_PER_SAMPLE },
		} );

		device.addEventListener( 'uncapturederror', ( e ) => {

			console.error( '[webgpu]', ( e as GPUUncapturedErrorEvent ).error.message );

		} );

		this._canvasFormat = gpu.getPreferredCanvasFormat();
		this._context.configure( { device, format: this._canvasFormat, alphaMode: 'opaque' } );

		// フレーム / オブジェクト / マテリアルは binding0 のuniform bufferひとつという同じ形なので、レイアウトは1つを共有する
		this._uniformLayout = device.createBindGroupLayout( {
			label: 'uniform',
			entries: [ {
				binding: 0,
				visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
				buffer: { type: 'uniform' },
			} ],
		} );

		this._gBufferLayout = device.createBindGroupLayout( {
			label: 'gBuffer',
			entries: [
				...GBUFFER_ATTACHMENTS.map( ( attachment, i ) => ( {
					binding: i,
					visibility: GPUShaderStage.FRAGMENT,
					texture: { sampleType: attachment.sampleType },
				} ) ),
				{
					binding: ENVMAP_BINDING,
					visibility: GPUShaderStage.FRAGMENT,
					texture: { sampleType: 'float' as const, viewDimension: 'cube' as const },
				},
				{
					binding: ENVMAP_SAMPLER_BINDING,
					visibility: GPUShaderStage.FRAGMENT,
					sampler: { type: 'filtering' as const },
				},
				{
					binding: SSAO_BINDING,
					visibility: GPUShaderStage.FRAGMENT,
					texture: { sampleType: 'float' as const },
				},
				{
					binding: LIGHTSHAFT_BINDING,
					visibility: GPUShaderStage.FRAGMENT,
					texture: { sampleType: 'float' as const },
				},
			],
		} );

		this._sceneLayout = device.createBindGroupLayout( {
			label: 'scene',
			entries: [ {
				binding: 0,
				visibility: GPUShaderStage.FRAGMENT,
				texture: { sampleType: 'float' },
			} ],
		} );

		this._frameBinder = new UniformBinder( device, FRAME_FIELDS, 'frame' );
		this._frameBindGroup = device.createBindGroup( {
			label: 'frame',
			layout: this._uniformLayout,
			entries: [ { binding: 0, resource: { buffer: this._frameBinder.buffer } } ],
		} );

		this._lights = new Lights( device, this._uniformLayout );
		this._envMap = new EnvMap( device, this._uniformLayout );
		this._pipeline = new PipelinePostProcess( device, this._uniformLayout, this._lights.bindGroupLayout, this._passResolution, this._passPixelSize );
		this._pipeline.applyPipelineConfig( this.pipelineConfig );

		const shadingModule = device.createShaderModule( { label: 'shading', code: buildShadingSource() } );

		this._shadingPipeline = device.createRenderPipeline( {
			label: 'shading',
			layout: device.createPipelineLayout( {
				bindGroupLayouts: [ this._uniformLayout, this._gBufferLayout, this._lights.bindGroupLayout ],
			} ),
			vertex: { module: shadingModule, entryPoint: 'vsMain' },
			fragment: { module: shadingModule, entryPoint: 'fsMain', targets: [ { format: SCENE_FORMAT } ] },
			primitive: { topology: 'triangle-list' },
		} );

		const presentModule = device.createShaderModule( { label: 'present', code: presentWgsl } );

		this._presentPipeline = device.createRenderPipeline( {
			label: 'present',
			layout: device.createPipelineLayout( { bindGroupLayouts: [ this._sceneLayout ] } ),
			vertex: { module: presentModule, entryPoint: 'vsMain' },
			fragment: { module: presentModule, entryPoint: 'fsMain', targets: [ { format: this._canvasFormat } ] },
			primitive: { topology: 'triangle-list' },
		} );

		this._device = device;

	}

	/*-------------------------------
		Render
	-------------------------------*/

	public render( root: Entity, cameraEntity: Entity, _event: EntityUpdateEvent ) {

		const device = this._device;
		const context = this._context;
		const lights = this._lights;

		if ( ! device || ! context || ! lights || ! this._frameBinder || ! this._frameBindGroup ) return;

		const camera = cameraEntity.getComponentsByTag<Camera>( 'camera' )[ 0 ];

		if ( ! camera ) return;

		if ( this.canvas.width === 0 || this.canvas.height === 0 ) return;

		const colorTexture = context.getCurrentTexture();

		this._setTargetSize( device, colorTexture.width, colorTexture.height );

		// stack

		this._stack.light.length = 0;
		this._stack.shadowMap.length = 0;
		this._stack.deferred.length = 0;
		this._stack.forward.length = 0;
		this._stack.envMap.length = 0;

		this._collectRenderStack( root, true );
		this._collectRenderStack( this.sky.entity, true );

		this._stack.forward.sort( ( a, b ) =>
			getMaterial( a.getComponent( Mesh )! ).renderOrder - getMaterial( b.getComponent( Mesh )! ).renderOrder );

		lights.update( this._stack.light );

		// frame

		const cameraMatrix = cameraEntity.matrixWorld.elm;

		this._cameraPosition.set( cameraMatrix[ 12 ], cameraMatrix[ 13 ], cameraMatrix[ 14 ] );
		this._projectionMatrix.copy( CLIP_CORRECTION ).multiply( camera.projectionMatrix );
		this._projectionMatrixInverse.copy( this._projectionMatrix ).inverse();
		this._projectionMatrixPrev.copy( CLIP_CORRECTION ).multiply( camera.projectionMatrixPrev );
		this._frameUniforms.uCameraMatrix.value = cameraEntity.matrixWorld;
		this._frameUniforms.uViewMatrixPrev.value = camera.viewMatrixPrev;
		this._frameUniforms.uViewMatrix.value = camera.viewMatrix;
		this._frameUniforms.uCameraNear.value = camera.near;
		this._frameUniforms.uCameraFar.value = camera.far;

		this._frameBinder.update( this.globalUniforms, this._frameUniforms );

		// pass

		const encoder = device.createCommandEncoder();

		this._frameEncoder = encoder;

		this._renderShadowMaps( device, encoder );
		this._renderEnvMap( device, encoder );
		this._renderGBuffer( device, encoder );

		const onPass = import.meta.env.DEV
			? ( p: { name: string, targetView: GPUTextureView | null, width: number, height: number } ) =>
				this._emitPass( p.targetView, p.width, p.height, p.name )
			: undefined;

		this._pipeline!.update( camera );
		this._pipeline!.renderDeferred( device, encoder, this._frameBindGroup, this._targets.gBufferViews[ 0 ], lights.bindGroup, onPass );

		this._renderShading( encoder );
		this._renderForward( device, encoder );

		let output = this._pipeline!.renderPost( device, encoder, this._frameBindGroup, this._targets.sceneView!, onPass );

		// プロジェクト側が差し込んだポストプロセス
		const userPipeline = cameraEntity.getComponent( PostProcessPipeline );

		if ( userPipeline ) {

			userPipeline.setSize( device, this._uniformLayout!, colorTexture.width, colorTexture.height );

			output = userPipeline.render( device, encoder, this._frameBindGroup, output );

		}

		this._renderPresent( device, encoder, colorTexture.createView(), output );

		this._frameEncoder = null;

		device.queue.submit( [ encoder.finish() ] );

	}

	public get frameEncoder() {

		return this._frameEncoder;

	}

	// ライトごとに深度だけを描く。fragment stageを持たないパイプラインなので専用のシェーダーは要らない
	private _renderShadowMaps( device: GPUDevice, encoder: GPUCommandEncoder ) {

		const shadowRenders = this._lights!.shadowRenders;

		for ( let i = 0; i < shadowRenders.length; i ++ ) {

			const shadow = shadowRenders[ i ];

			const pass = encoder.beginRenderPass( {
				label: `shadowMap/${shadow.label}`,
				colorAttachments: [],
				depthStencilAttachment: {
					view: shadow.view,
					depthClearValue: 1.0,
					depthLoadOp: 'clear',
					depthStoreOp: 'store',
				},
			} );

			pass.setBindGroup( GROUP_FRAME, shadow.frameBindGroup );

			for ( let j = 0; j < this._stack.shadowMap.length; j ++ ) {

				this._drawEntity( device, pass, this._stack.shadowMap[ j ], 'shadowMap' );

			}

			pass.end();

		}

	}

	// キューブ6面を撮り直し、roughnessごとのミップを作り直す
	private _renderEnvMap( device: GPUDevice, encoder: GPUCommandEncoder ) {

		const envMap = this._envMap!;

		envMap.update( this.globalUniforms );

		for ( let i = 0; i < envMap.faceRenders.length; i ++ ) {

			const face = envMap.faceRenders[ i ];

			const pass = encoder.beginRenderPass( {
				label: face.label,
				colorAttachments: [ {
					view: face.view,
					clearValue: { r: 0, g: 0, b: 0, a: 1 },
					loadOp: 'clear',
					storeOp: 'store',
				} ],
				depthStencilAttachment: {
					view: envMap.depthView,
					depthClearValue: 1.0,
					depthLoadOp: 'clear',
					depthStoreOp: 'store',
				},
			} );

			pass.setBindGroup( GROUP_FRAME, face.frameBindGroup );

			for ( let j = 0; j < this._stack.envMap.length; j ++ ) {

				this._drawEntity( device, pass, this._stack.envMap[ j ], 'envMap' );

			}

			pass.end();

			this._emitPass( face.view, ENVMAP_SIZE, ENVMAP_SIZE, face.label );

		}

		envMap.prefilter( encoder );

		// 累積後のミップ（+X面）をFrameDebuggerへ。ミップ0=鏡面〜ミップ4=最も粗い
		for ( let mip = 0; mip < envMap.mipViews.length; mip ++ ) {

			const size = ENVMAP_SIZE >> mip;

			this._emitPass( envMap.mipViews[ mip ][ 0 ], size, size, `envMap/mip${mip}` );

		}

	}

	// 1パス分の出力を通知する（EditorDraw経由でFrameDebuggerが拾う）
	private _emitPass( view: GPUTextureView | null, width: number, height: number, label: string ) {

		if ( ! import.meta.env.DEV || ! view ) return;

		this.emit( 'drawPass', [ view, width, height, label ] );

	}

	private _renderGBuffer( device: GPUDevice, encoder: GPUCommandEncoder ) {

		const pass = encoder.beginRenderPass( {
			label: 'gBuffer',
			colorAttachments: this._targets.gBufferViews.map( ( view ) => ( {
				view,
				clearValue: { r: 0, g: 0, b: 0, a: 0 },
				loadOp: 'clear' as const,
				storeOp: 'store' as const,
			} ) ),
			depthStencilAttachment: {
				view: this._targets.depthView!,
				depthClearValue: 1.0,
				depthLoadOp: 'clear',
				depthStoreOp: 'store',
			},
		} );

		pass.setBindGroup( GROUP_FRAME, this._frameBindGroup! );

		for ( let i = 0; i < this._stack.deferred.length; i ++ ) {

			this._drawEntity( device, pass, this._stack.deferred[ i ], 'deferred' );

		}

		pass.end();

		for ( let i = 0; i < this._targets.gBufferViews.length; i ++ ) {

			this._emitPass( this._targets.gBufferViews[ i ], this._targets.width, this._targets.height, `gBuffer_${i}` );

		}

	}

	// gBufferを1画素ずつ読んでライティングし、シーンバッファへ書く
	private _renderShading( encoder: GPUCommandEncoder ) {

		const pass = encoder.beginRenderPass( {
			label: 'shading',
			colorAttachments: [ {
				view: this._targets.sceneView!,
				clearValue: { r: 0, g: 0, b: 0, a: 1 },
				loadOp: 'clear',
				storeOp: 'store',
			} ],
		} );

		pass.setPipeline( this._shadingPipeline! );
		pass.setBindGroup( GROUP_FRAME, this._frameBindGroup! );
		pass.setBindGroup( 1, this._gBufferBindGroup! );
		pass.setBindGroup( 2, this._lights!.bindGroup );
		pass.draw( 3 );

		pass.end();

		this._emitPass( this._targets.sceneView, this._targets.width, this._targets.height, 'shading' );

	}

	// シェーディング結果の上へ、gBufferの深度を引き継いで重ねる
	private _renderForward( device: GPUDevice, encoder: GPUCommandEncoder ) {

		if ( this._stack.forward.length === 0 ) return;

		const pass = encoder.beginRenderPass( {
			label: 'forward',
			colorAttachments: [ {
				view: this._targets.sceneView!,
				loadOp: 'load',
				storeOp: 'store',
			} ],
			depthStencilAttachment: {
				view: this._targets.depthView!,
				depthLoadOp: 'load',
				depthStoreOp: 'store',
			},
		} );

		pass.setBindGroup( GROUP_FRAME, this._frameBindGroup! );

		for ( let i = 0; i < this._stack.forward.length; i ++ ) {

			this._drawEntity( device, pass, this._stack.forward[ i ], 'forward' );

		}

		pass.end();

		this._emitPass( this._targets.sceneView, this._targets.width, this._targets.height, 'forward' );

	}

	// 最終出力をキャンバスへ出す。参照先が変わったときだけbind groupを作り直す
	private _renderPresent( device: GPUDevice, encoder: GPUCommandEncoder, view: GPUTextureView, source: GPUTextureView ) {

		if ( this._sceneView !== source ) {

			this._sceneView = source;
			this._sceneBindGroup = device.createBindGroup( {
				label: 'scene',
				layout: this._sceneLayout!,
				entries: [ { binding: 0, resource: source } ],
			} );

		}

		const pass = encoder.beginRenderPass( {
			label: 'present',
			colorAttachments: [ {
				view,
				clearValue: { r: 0, g: 0, b: 0, a: 1 },
				loadOp: 'clear',
				storeOp: 'store',
			} ],
		} );

		pass.setPipeline( this._presentPipeline! );
		pass.setBindGroup( 0, this._sceneBindGroup! );
		pass.draw( 3 );

		pass.end();

	}

	// entity以下を再帰的に走査してフェーズごとの描画対象へ振り分ける
	private _collectRenderStack( entity: Entity, parentVisibility: boolean ) {

		const visibility = parentVisibility && entity.visible;
		const mesh = entity.getComponent( Mesh );

		if ( mesh && visibility ) {

			const flag = getMaterial( mesh ).visibilityFlag;

			if ( flag.shadowMap ) this._stack.shadowMap.push( entity );
			if ( flag.deferred ) this._stack.deferred.push( entity );
			if ( flag.forward ) this._stack.forward.push( entity );
			if ( flag.envMap ) this._stack.envMap.push( entity );

		}

		const light = entity.getComponent( Light );

		if ( light && light.enabled && visibility ) {

			this._stack.light.push( entity );

		}

		for ( let i = 0; i < entity.children.length; i ++ ) {

			this._collectRenderStack( entity.children[ i ], visibility );

		}

	}

	private _drawEntity( device: GPUDevice, pass: GPURenderPassEncoder, entity: Entity, phase: MaterialPhase ) {

		const mesh = entity.getComponent( Mesh )!;
		const material = getMaterial( mesh );

		const materialResource = this._getMaterialResource( device, material );
		const pipeline = materialResource.pipelines[ phase ];

		if ( ! pipeline ) return;

		const geometryBuffer = this._getGeometryBuffer( device, mesh.geometry, material.name );
		const objectResource = this._getObjectResource( device, entity );

		// object

		this._objectUniforms.uModelMatrix.value = entity.matrixWorld;
		this._objectUniforms.uModelMatrixPrev.value = entity.matrixWorldPrev;
		this._normalMatrix.copy( entity.matrixWorld ).inverse().transpose();

		objectResource.binder.update( this._objectUniforms );

		// material（シャドウパスのパイプラインは group2 を持たない）

		const useMaterialGroup = phase !== 'shadowMap' && materialResource.bindGroup;

		if ( useMaterialGroup ) {

			materialResource.binder!.update( material.uniforms );

		}

		// draw

		pass.setPipeline( pipeline );
		pass.setBindGroup( GROUP_OBJECT, objectResource.bindGroup );

		if ( useMaterialGroup ) {

			pass.setBindGroup( GROUP_MATERIAL, materialResource.bindGroup! );

		}

		for ( let i = 0; i < geometryBuffer.vertexBuffers.length; i ++ ) {

			pass.setVertexBuffer( i, geometryBuffer.vertexBuffers[ i ] );

		}

		if ( geometryBuffer.indexBuffer ) {

			pass.setIndexBuffer( geometryBuffer.indexBuffer, geometryBuffer.indexFormat );
			pass.drawIndexed( geometryBuffer.drawCount );

		} else {

			pass.draw( geometryBuffer.drawCount );

		}

	}

	/*-------------------------------
		Resource
	-------------------------------*/

	// キャンバスの実サイズに中間バッファを合わせ、参照するbind groupを作り直す
	private _setTargetSize( device: GPUDevice, width: number, height: number ) {

		if ( this._targets.width === width && this._targets.height === height ) return;

		this._targets.setSize( device, width, height );

		const pipeline = this._pipeline!;

		pipeline.setSize( device, width, height );
		pipeline.setGBuffer(
			this._targets.gBufferViews[ 0 ],
			this._targets.gBufferViews[ 1 ],
			this._targets.gBufferViews[ 3 ],
			this._targets.gBufferViews[ 4 ]
		);
		pipeline.setScene( this._targets.sceneView! );

		this._gBufferBindGroup = device.createBindGroup( {
			label: 'gBuffer',
			layout: this._gBufferLayout!,
			entries: [
				// 法線は normalSelector の結果に差し替える（webgl側の normalBuffer と同じ）
				...this._targets.gBufferViews.map( ( resource, binding ) => (
					{ binding, resource: binding === 1 ? pipeline.normalView! : resource } ) ),
				{ binding: ENVMAP_BINDING, resource: this._envMap!.view },
				{ binding: ENVMAP_SAMPLER_BINDING, resource: this._envMap!.sampler },
				{ binding: SSAO_BINDING, resource: pipeline.ssaoView! },
				{ binding: LIGHTSHAFT_BINDING, resource: pipeline.lightShaftView! },
			],
		} );

		// 画面へ出す元は毎フレーム決まるので、ここでは無効化だけしておく
		this._sceneView = null;

	}

	// マテリアルのWGSLからフェーズごとのパイプラインとbind groupを作る（初回描画時に一度だけ）
	private _getMaterialResource( device: GPUDevice, material: Material ): MaterialResource {

		let resource = this._materialResources.get( material );

		if ( resource ) return resource;

		const layout = this._uniformLayout!;
		const module = device.createShaderModule( { label: material.name, code: material.shaderSource } );

		const hasUniforms = material.fields.length > 0;
		const binder = hasUniforms ? new UniformBinder( device, material.fields, material.name ) : null;

		const objectLayouts = hasUniforms ? [ layout, layout, layout ] : [ layout, layout ];

		const primitive: GPUPrimitiveState = {
			topology: material.drawType === 'LINES' ? 'line-list' : 'triangle-list',
			cullMode: material.cullFace ? 'back' : 'none',
		};

		const vertex: GPUVertexState = { module, entryPoint: 'vsMain', buffers: VERTEX_BUFFER_LAYOUT };

		const flag = material.visibilityFlag;

		resource = {
			pipelines: {
				// シャドウは深度だけを書くのでfragment stageを持たない
				shadowMap: flag.shadowMap ? device.createRenderPipeline( {
					label: `${material.name}/shadowMap`,
					layout: device.createPipelineLayout( { bindGroupLayouts: [ layout, layout ] } ),
					vertex,
					primitive: { ...primitive, cullMode: 'none' },
					depthStencil: {
						format: SHADOW_FORMAT,
						depthWriteEnabled: true,
						depthCompare: 'less',
						// 傾いた面ほど深く押し込む。定数ぶんのバイアスはシェーダー側で足す
						depthBiasSlopeScale: 2.0,
					},
				} ) : null,
				deferred: flag.deferred ? device.createRenderPipeline( {
					label: `${material.name}/deferred`,
					layout: device.createPipelineLayout( { bindGroupLayouts: objectLayouts } ),
					vertex,
					fragment: { module, entryPoint: 'fsDeferred', targets: GBUFFER_TARGETS },
					primitive,
					depthStencil: {
						format: DEPTH_FORMAT,
						depthWriteEnabled: material.depthWrite,
						depthCompare: material.depthTest ? 'less' : 'always',
					},
				} ) : null,
				// キューブ面はY反転投影で描くためワインディングが裏返る。カリングは無効にする
				envMap: flag.envMap ? device.createRenderPipeline( {
					label: `${material.name}/envMap`,
					layout: device.createPipelineLayout( { bindGroupLayouts: objectLayouts } ),
					vertex,
					fragment: { module, entryPoint: 'fsForward', targets: [ { format: ENVMAP_FORMAT } ] },
					primitive: { ...primitive, cullMode: 'none' },
					depthStencil: {
						format: DEPTH_FORMAT,
						depthWriteEnabled: material.depthWrite,
						depthCompare: material.depthTest ? 'less' : 'always',
					},
				} ) : null,
				forward: flag.forward ? device.createRenderPipeline( {
					label: `${material.name}/forward`,
					layout: device.createPipelineLayout( { bindGroupLayouts: objectLayouts } ),
					vertex,
					fragment: {
						module,
						entryPoint: 'fsForward',
						targets: [ {
							format: SCENE_FORMAT,
							blend: {
								color: { srcFactor: 'src-alpha', dstFactor: 'one-minus-src-alpha' },
								alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' },
							},
						} ],
					},
					primitive,
					depthStencil: {
						format: DEPTH_FORMAT,
						depthWriteEnabled: material.depthWrite,
						depthCompare: material.depthTest ? 'less' : 'always',
					},
				} ) : null,
			},
			binder,
			bindGroup: binder ? device.createBindGroup( {
				label: material.name,
				layout,
				entries: [ { binding: 0, resource: { buffer: binder.buffer } } ],
			} ) : null,
		};

		this._materialResources.set( material, resource );

		return resource;

	}

	// 描画対象ごとのuniform buffer。同一フレーム内で書き分けるためエンティティ単位で持つ
	private _getObjectResource( device: GPUDevice, entity: Entity ): ObjectResource {

		let resource = this._objectResources.get( entity );

		if ( resource ) return resource;

		const binder = new UniformBinder( device, OBJECT_FIELDS, entity.name || 'object' );

		resource = {
			binder,
			bindGroup: device.createBindGroup( {
				label: entity.name || 'object',
				layout: this._uniformLayout!,
				entries: [ { binding: 0, resource: { buffer: binder.buffer } } ],
			} ),
		};

		this._objectResources.set( entity, resource );

		return resource;

	}

	private _getGeometryBuffer( device: GPUDevice, geometry: Geometry, label: string ) {

		let buffer = this._geometryBuffers.get( geometry );

		if ( ! buffer ) {

			buffer = new GeometryBuffer( device, geometry, label );

			this._geometryBuffers.set( geometry, buffer );

		}

		return buffer;

	}

	/*-------------------------------
		Editor API

		EditorDraw が使う口。エディタの重ね描きは、レンダラーが最後に画面へ出したのと
		同じテクスチャ（uiView）へ描き、present で出し直す形にしている。
	-------------------------------*/

	public get device() {

		return this._device;

	}

	public get uniformLayout() {

		return this._uniformLayout;

	}

	public get frameBindGroup() {

		return this._frameBindGroup;

	}

	// シーンの深度。ギズモをシーンと深度比較させるために共有する
	public get sceneDepthView() {

		return this._targets.depthView;

	}

	// エディタが重ね描きする先（＝画面へ出しているテクスチャ）
	public get uiView() {

		return this._sceneView;

	}

	public get uiSize() {

		return this._targets;

	}

	// uiView をキャンバスへ出し直す。エディタの重ね描きのあとに呼ばれる
	public presentToCanvas() {

		const device = this._device;
		const context = this._context;

		if ( ! device || ! context || ! this._sceneView ) return;

		const encoder = device.createCommandEncoder();

		this._renderPresent( device, encoder, context.getCurrentTexture().createView(), this._sceneView );

		device.queue.submit( [ encoder.finish() ] );

	}

	// エディタ用にエンティティ列を任意ターゲットへ描く
	public renderEditorEntities( param: {
		entities: Entity[];
		view: GPUTextureView;
		format: GPUTextureFormat;
		depthView: GPUTextureView | null;
		clear: boolean;
		// 省略時は各エンティティ自身のマテリアルで描く（gizmo / helper はこちら）
		material: Material | null;
		depthCompare: 'less' | 'lequal';
	} ) {

		const device = this._device;

		if ( ! device || ! this._frameBindGroup ) return;

		const encoder = device.createCommandEncoder();

		const pass = encoder.beginRenderPass( {
			label: 'editor',
			colorAttachments: [ {
				view: param.view,
				clearValue: { r: 0, g: 0, b: 0, a: 0 },
				loadOp: param.clear ? 'clear' : 'load',
				storeOp: 'store',
			} ],
			depthStencilAttachment: param.depthView ? {
				view: param.depthView,
				depthLoadOp: 'load',
				depthStoreOp: 'store',
			} : undefined,
		} );

		pass.setBindGroup( GROUP_FRAME, this._frameBindGroup );

		for ( let i = 0; i < param.entities.length; i ++ ) {

			const entity = param.entities[ i ];
			const mesh = entity.getComponent( Mesh );

			if ( ! mesh || ! mesh.geometry ) continue;

			const material = param.material || ( mesh.material as Material | null );

			if ( ! material ) continue;

			const pipeline = this._getEditorPipeline( device, material, param.format, !! param.depthView, param.depthCompare );

			this._drawEditorEntity( device, pass, entity, mesh, material, pipeline );

		}

		pass.end();

		device.queue.submit( [ encoder.finish() ] );

	}

	// エディタ用マテリアルのパイプライン。ターゲット書式と深度比較の組み合わせごとに作る
	private _getEditorPipeline( device: GPUDevice, material: Material, format: GPUTextureFormat, useDepth: boolean, depthCompare: 'less' | 'lequal' ) {

		const key = `${format}/${useDepth}/${depthCompare}`;

		let byKey = this._editorPipelines.get( material );

		if ( ! byKey ) {

			byKey = new Map();
			this._editorPipelines.set( material, byKey );

		}

		let pipeline = byKey.get( key );

		if ( pipeline ) return pipeline;

		const layout = this._uniformLayout!;
		const module = device.createShaderModule( { label: material.name, code: material.shaderSource } );

		pipeline = device.createRenderPipeline( {
			label: `editor/${material.name}`,
			layout: device.createPipelineLayout( {
				bindGroupLayouts: material.fields.length > 0 ? [ layout, layout, layout ] : [ layout, layout ],
			} ),
			vertex: { module, entryPoint: 'vsMain', buffers: VERTEX_BUFFER_LAYOUT },
			fragment: { module, entryPoint: 'fsForward', targets: [ { format } ] },
			primitive: {
				topology: material.drawType === 'LINES' ? 'line-list' : 'triangle-list',
				cullMode: 'none',
			},
			depthStencil: useDepth ? {
				format: DEPTH_FORMAT,
				depthWriteEnabled: material.depthWrite,
				depthCompare: material.depthTest ? ( depthCompare === 'lequal' ? 'less-equal' : 'less' ) : 'always',
			} : undefined,
		} );

		byKey.set( key, pipeline );

		return pipeline;

	}

	private _drawEditorEntity( device: GPUDevice, pass: GPURenderPassEncoder, entity: Entity, mesh: Mesh, material: Material, pipeline: GPURenderPipeline ) {

		const geometryBuffer = this._getGeometryBuffer( device, mesh.geometry, material.name );
		const objectResource = this._getObjectResource( device, entity );
		const materialResource = this._getMaterialResource( device, material );

		this._objectUniforms.uModelMatrix.value = entity.matrixWorld;
		this._objectUniforms.uModelMatrixPrev.value = entity.matrixWorldPrev;
		this._normalMatrix.copy( entity.matrixWorld ).inverse().transpose();

		objectResource.binder.update( this._objectUniforms );

		pass.setPipeline( pipeline );
		pass.setBindGroup( GROUP_OBJECT, objectResource.bindGroup );

		if ( materialResource.bindGroup ) {

			materialResource.binder!.update( material.uniforms );

			pass.setBindGroup( GROUP_MATERIAL, materialResource.bindGroup );

		}

		for ( let i = 0; i < geometryBuffer.vertexBuffers.length; i ++ ) {

			pass.setVertexBuffer( i, geometryBuffer.vertexBuffers[ i ] );

		}

		if ( geometryBuffer.indexBuffer ) {

			pass.setIndexBuffer( geometryBuffer.indexBuffer, geometryBuffer.indexFormat );
			pass.drawIndexed( geometryBuffer.drawCount );

		} else {

			pass.draw( geometryBuffer.drawCount );

		}

	}

	/*-------------------------------
		Engine API
	-------------------------------*/

	public resize( resolution: GLP.Vector ) {

		this.resolution.copy( resolution );

	}

	public applyPipelineConfig( config: PipelineConfig ) {

		this.pipelineConfig = { ...this.pipelineConfig, ...config };

		this._pipeline?.applyPipelineConfig( config );

	}

	// パイプラインは初回描画時に作られるため、事前コンパイルは行わない
	public compileShaders() {

		return Promise.resolve();

	}

}

// WebGPUバックエンドを前提にしたEngine型。コンポーネントからは `engine as GPUEngine` で参照する
export type GPUEngine = Engine<Renderer>;

// canvasとWebGPUコンテキストを用意してWebGPUレンダラーを組み立てる（@or-rendererの供給口）
export const createRenderer = ( engine: Engine ): Renderer => new Renderer( document.createElement( 'canvas' ), engine );
