import * as BSP from 'basepower';
import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Camera } from '../../core/Components/Camera';
import { Light, LightType } from '../../core/Components/Light';
import { MaterialOverride } from '../../core/Components/MaterialOverride';
import { Mesh } from '../../core/Components/Mesh';
import { Entity, EntityUpdateEvent } from '../../core/Entity';
import { PlaneGeometry } from '../../core/Geometries/PlaneGeometry';
import { Geometry } from '../../core/Geometry';
import { Serializable } from '../../core/Serializable';
import { PostProcessPipeline } from '../Components/PostProcessPipeline';
import { GL, GLBackend } from '../GLBackend';
import { MaterialRenderType, Material } from '../Material';
import { PostProcess } from '../PostProcess';
import { shaderParse } from "../ShaderParser";
import { TexProcedural } from '../TexProcedural';

import { DeferredRenderer } from './DeferredRenderer';
import { PipelinePostProcess } from './PipelinePostProcess';
import { PMREMRender } from './PMREMRender';
import { ProgramManager } from './ProgramManager';
import { Sky } from './Sky';

import type { EngineContract } from '../../core/Contracts/EngineContract';
import type { RendererContract } from '../../core/Contracts/RendererContract';
import type { TexProceduralParam } from '../../core/Contracts/TexProceduralContract';

// render target

export type RenderCameraTarget = {
	gBuffer: GLP.GLPowerFrameBuffer,
	shadingBuffer: GLP.GLPowerFrameBuffer,
	forwardBuffer: GLP.GLPowerFrameBuffer,
	refractionBuffer: GLP.GLPowerFrameBuffer,
	uiBuffer: GLP.GLPowerFrameBuffer,
	normalBuffer: GLP.GLPowerFrameBuffer,
}

// render stack

export type RenderStack = {
	light: Entity[];
	envMap: Entity[];
	shadowMap: Entity[];
	deferred: Entity[];
	forward: Entity[];
	ui: Entity[];
}

// light

// Lightはデータのみを持ち、シャドウマップのGPUリソースはレンダラーがLightごとにここで所有する
type LightInfo = {
	position: MTP.Vector;
	direction: MTP.Vector;
	color: MTP.Vector;
	renderTarget: GLP.GLPowerFrameBuffer | null;
	component: Light;
}

export type CollectedLights = {[K in LightType]: LightInfo[]}

// envmap

type EnvMapCamera = {
	entity: Entity,
	camera: Camera,
}

// drawParam

interface RenderOption {
	cameraOverride?: CameraParam,
	uniformOverride?: BSP.Uniforms,
	disableClear?: boolean,
}

interface CameraParam {
	viewMatrix?: MTP.Matrix;
	viewMatrixPrev?: MTP.Matrix;
	projectionMatrix?: MTP.Matrix;
	projectionMatrixPrev?: MTP.Matrix;
	cameraMatrixWorld?: MTP.Matrix;
	cameraNear?: number,
	cameraFar?:number,
}

interface DrawParam extends CameraParam {
	label?: string;
	modelMatrixWorld?: MTP.Matrix;
	modelMatrixWorldPrev?: MTP.Matrix;
	renderTarget?: GLP.GLPowerFrameBuffer | null;
	uniformOverride?: BSP.Uniforms,
}

// compile draw param

interface CompileDrawParam {
	drawId: string;
	renderType: MaterialRenderType;
	geometry: Geometry;
	material: Material;
	param: DrawParam;
}

// Renderer所有のGeometry用GPUリソース。versionがGeometry.updateVersionと一致する間は再利用する
type GeometryBufferRecord = {
	buffers: Map<string, GLP.GLPowerBuffer>,
	vaoVersions: Map<GLP.GLPowerVAO, number>,
	version: number,
}

// pipeline config

export type PipelineConfig = {
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
};

// default material

// mesh.materialはバックエンド不透明型なので、webgl側でMaterialへ絞る（未設定時は既定マテリアル）
const _defaultMaterial = new Material();

const getMaterial = ( mesh: Mesh ) => ( mesh.material || _defaultMaterial ) as Material;

// texture unit

export let TextureUnitCounter = 0;

// clear color

const _clearColorWhite = new MTP.Vector( 1.0, 1.0, 1.0, 1.0 );
const _clearColorBlack = new MTP.Vector( 0.0, 0.0, 0.0, 1.0 );

// light uniform names
// draw毎の文字列連結を避けるため、ライトインデックスごとにuniform名をキャッシュする

const _dirLightNames: { [key: string]: string }[] = [];
const _spotLightNames: { [key: string]: string }[] = [];

const getDirLightNames = ( i: number ) => _dirLightNames[ i ] || ( _dirLightNames[ i ] = {
	direction: `directionalLight[${i}].direction`,
	color: `directionalLight[${i}].color`,
	camNear: `uDirectionalLightCamera[${i}].near`,
	camFar: `uDirectionalLightCamera[${i}].far`,
	camViewMatrix: `uDirectionalLightCamera[${i}].viewMatrix`,
	camProjectionMatrix: `uDirectionalLightCamera[${i}].projectionMatrix`,
	camResolution: `uDirectionalLightCamera[${i}].resolution`,
	shadowMap: `directionalLightShadowMap[${i}]`,
} );

const getSpotLightNames = ( i: number ) => _spotLightNames[ i ] || ( _spotLightNames[ i ] = {
	position: `uSpotLight[${i}].position`,
	direction: `uSpotLight[${i}].direction`,
	color: `uSpotLight[${i}].color`,
	angle: `uSpotLight[${i}].angle`,
	blend: `uSpotLight[${i}].blend`,
	distance: `uSpotLight[${i}].distance`,
	decay: `uSpotLight[${i}].decay`,
	camNear: `uSpotLightCamera[${i}].near`,
	camFar: `uSpotLightCamera[${i}].far`,
	camViewMatrix: `uSpotLightCamera[${i}].viewMatrix`,
	camProjectionMatrix: `uSpotLightCamera[${i}].projectionMatrix`,
	camResolution: `uSpotLightCamera[${i}].resolution`,
	shadowMap: `spotLightShadowMap[${i}]`,
} );

export class Renderer extends Serializable implements RendererContract {

	public readonly backend: GLBackend;
	public readonly canvas: HTMLCanvasElement;
	public resolution: MTP.Vector;
	public globalUniforms: BSP.Uniforms;
	private _renderTarget: RenderCameraTarget;

	// pipeline config
	private _pipelineConfig: Required<PipelineConfig>;

	// エディタ等が一時的に被せる設定。_pipelineConfig（シーン本来の値・シリアライズ対象）を汚さないための層
	private _pipelineOverride: PipelineConfig | null;

	// program

	public programManager: ProgramManager;

	// geometry

	private _geometryBuffers: Map<Geometry, GeometryBufferRecord>;

	// lights

	private _lights: CollectedLights;
	private _lightsUpdated: boolean;
	private _lightInfoCache: Map<Light, LightInfo>;

	// envmap

	private _envMapCameras: EnvMapCamera[];
	private _envMapRenderTarget: GLP.GLPowerFrameBufferCube;
	private _pmremRender: PMREMRender;

	// postprocess

	private _deferredRenderer: DeferredRenderer;
	private _pipelinePostProcess: PipelinePostProcess;

	// sky

	public sky: Sky;

	// quad

	private _quad: Geometry;

	// compile

	private _isCorrentCompiles: boolean;
	private compileDrawParams: CompileDrawParam[];

	// tmp

	private _tmpNormalMatrix: MTP.Matrix;
	private _tmpModelViewMatrix: MTP.Matrix;
	private _tmpViewMatrixInverseMatrix: MTP.Matrix;
	private _tmpLightDirection: MTP.Vector;
	private _tmpModelMatrixInverse: MTP.Matrix;
	private _tmpProjectionMatrixInverse: MTP.Matrix;
	private _tmpResolution: MTP.Vector;
	private _tmpResolutionUniform: BSP.Uniforms[string];
	private _tmpUniformOverride: BSP.Uniforms;
	private _tmpDrawParam: DrawParam;

	constructor( backend: GLBackend, engine: EngineContract ) {

		super();

		this.backend = backend;
		this.canvas = backend.canvas;
		this.globalUniforms = {};

		this._isCorrentCompiles = false;
		this.compileDrawParams = [];
		this.programManager = new ProgramManager( backend );
		this._geometryBuffers = new Map();
		this.resolution = new MTP.Vector();

		// lights

		this._lights = {
			directional: [],
			spot: [],
		};

		this._lightsUpdated = false;
		this._lightInfoCache = new Map();

		// envmap

		const envMap = backend.createCubeTexture();
		this._envMapRenderTarget = backend.createCubeFrameBuffer().setTexture( [ envMap ] );
		this._envMapRenderTarget.setSize( 256, 256 );

		const origin = new MTP.Vector( 0, 0, 0 );
		const up = new MTP.Vector( 0, - 1, 0 );

		const lookAtMatrices = [
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 1, 0, 0 ), up ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, 1, 0 ), new MTP.Vector( 0, 0, 1 ) ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, 0, 1 ), up ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( - 1, 0, 0 ), up ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, - 1, 0 ), new MTP.Vector( 0, 0, - 1 ) ),
			new MTP.Matrix().lookAt( origin, new MTP.Vector( 0, 0, - 1 ), up ),
		];

		this._envMapCameras = [];

		for ( let i = 0; i < 6; i ++ ) {

			const entity = engine.createEntity( { name: "envMapCamera/" + i } );
			const camera = entity.addComponent( Camera );
			camera.fov = 90;
			camera.near = 0.1;
			camera.far = 1000;
			camera.aspect = 1;
			entity.applyMatrix( lookAtMatrices[ i ].clone() );
			camera.updateViewMatrix();
			camera.updateProjectionMatrix();
			this._envMapCameras.push( { entity, camera } );

		}

		// pmrem

		this._pmremRender = new PMREMRender( backend, {
			input: [ envMap ],
			resolution: new MTP.Vector( 256 * 3, 256 * 4 ),
		} );

		// postprocess

		this._deferredRenderer = new DeferredRenderer( {
			backend,
			envMap: this._pmremRender.renderTarget.textures[ 0 ],
			envMapCube: envMap,
		} );

		this._pipelinePostProcess = new PipelinePostProcess( backend );

		// quad

		this._quad = new PlaneGeometry( { width: 2.0, height: 2.0 } );

		// tmp

		this._tmpLightDirection = new MTP.Vector();
		this._tmpModelMatrixInverse = new MTP.Matrix();
		this._tmpViewMatrixInverseMatrix = new MTP.Matrix();
		this._tmpProjectionMatrixInverse = new MTP.Matrix();
		this._tmpModelViewMatrix = new MTP.Matrix();
		this._tmpNormalMatrix = new MTP.Matrix();
		this._tmpResolution = new MTP.Vector();
		this._tmpResolutionUniform = { value: this._tmpResolution, type: '2fv' };
		this._tmpUniformOverride = {};
		this._tmpDrawParam = {};

		// render target

		this._renderTarget = Renderer.createRenderTarget( backend );

		// sky

		this.sky = new Sky( engine );

		// pipeline config

		this._pipelineConfig = {
			motionBlur: true,
			motionBlurPower: 1.0,
			ssr: true,
			ssao: true,
			lightShaft: true,
			dof: true,
		};
		this._pipelineOverride = null;

		// sky fields

		const skyDir = this.fieldDir( "sky" );

		skyDir.field( "skyColor",
			() => this.sky.color.getElm( "vec3" ),
			( v: number[] ) => {

				this.sky.color.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: "vector" } }
		);

		skyDir.field( "groundColor",
			() => this.sky.groundColor.getElm( "vec3" ),
			( v: number[] ) => {

				this.sky.groundColor.set( v[ 0 ], v[ 1 ], v[ 2 ] );

			},
			{ format: { type: "vector" } }
		);

		skyDir.field( "intensity",
			() => this.sky.intensity,
			( v: number ) => {

				this.sky.intensity = v;

			},
			{ step: 0.1 }
		);

		skyDir.field( "reset", () => () => {

			this.setField( "sky/skyColor", [ 1.0, 1.0, 1.0 ] );
			this.setField( "sky/groundColor", [ 0.3, 0.3, 0.3 ] );
			this.setField( "sky/intensity", 1.0 );

		}, undefined, { label: "Reset to Default" } );

		const pipeline = this.fieldDir( "pipeline" );

		( [ "motionBlur", "ssr", "ssao", "dof", "lightShaft" ] as const ).forEach( ( key ) => {

			const dir = pipeline.dir( key );

			dir.field( "enabled", () => this._pipelineConfig[ key ], ( v: boolean ) => {

				this._pipelineConfig[ key ] = v;
				this.applyPipelineConfig( this._pipelineConfig );

			} );

			if ( key === "motionBlur" ) {

				dir.field( "power", () => this._pipelineConfig.motionBlurPower, ( v: number ) => {

					this._pipelineConfig.motionBlurPower = v;
					this.applyPipelineConfig( this._pipelineConfig );

				}, { step: 0.1 } );

			}

		} );

	}

	public get renderTarget() {

		return this._renderTarget;

	}

	public static createRenderTarget( backend: GLBackend ): RenderCameraTarget {

		const gBuffer = backend.createFrameBuffer();
		gBuffer.setTexture( [
			backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA, magFilter: GL.NEAREST, minFilter: GL.NEAREST } ),
			backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA } ),
			backend.createTexture(),
			backend.createTexture(),
			backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA } ),
		] );

		const shadingBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
		shadingBuffer.setTexture( [
			backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA } ),
			backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA } ),
		] );

		const forwardBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
		forwardBuffer.setDepthTexture( gBuffer.depthTexture );
		forwardBuffer.setTexture( [
			shadingBuffer.textures[ 0 ],
			gBuffer.textures[ 0 ],
			gBuffer.textures[ 4 ],
		] );

		const refractionBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
		refractionBuffer.setTexture( [
			backend.createTexture().setting( {
				type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA,
				magFilter: GL.LINEAR, minFilter: GL.LINEAR,
			} ),
		] );

		const uiBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
		uiBuffer.setDepthTexture( gBuffer.depthTexture );
		uiBuffer.setTexture( [ backend.createTexture() ] );

		const normalBuffer = backend.createFrameBuffer();
		normalBuffer.setTexture( [
			backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA, magFilter: GL.NEAREST, minFilter: GL.NEAREST } )
		] );

		return { gBuffer, shadingBuffer, forwardBuffer, refractionBuffer, uiBuffer, normalBuffer };

	}

	public static resizeRenderTarget( rt: RenderCameraTarget, resolution: MTP.Vector ) {

		rt.gBuffer.setSize( resolution );
		rt.shadingBuffer.setSize( resolution );
		rt.forwardBuffer.setSize( resolution );
		rt.refractionBuffer.setSize( resolution );
		rt.uiBuffer.setSize( resolution );
		rt.normalBuffer.setSize( resolution );

	}

	public getRenderStack( entity: Entity ) {

		const stack: RenderStack = {
			light: [],
			deferred: [],
			forward: [],
			ui: [],
			shadowMap: [],
			envMap: [],
		};

		this._collectRenderStack( entity, true, stack );
		this._collectRenderStack( this.sky.entity, true, stack );

		return stack;

	}

	// entity以下を再帰的に走査してRenderStackへ振り分ける
	private _collectRenderStack( entity: Entity, parentVisibility: boolean, stack: RenderStack ) {

		const visibility = parentVisibility && entity.visible;
		const mesh = entity.getComponent( Mesh );

		if ( mesh && visibility ) {

			const material = getMaterial( mesh );

			if ( material.visibilityFlag.deferred ) stack.deferred.push( entity );
			if ( material.visibilityFlag.shadowMap ) stack.shadowMap.push( entity );
			if ( material.visibilityFlag.forward ) stack.forward.push( entity );
			if ( material.visibilityFlag.ui ) stack.ui.push( entity );
			if ( material.visibilityFlag.envMap ) stack.envMap.push( entity );

		}

		const light = entity.getComponent( Light );

		if ( light && light.enabled && visibility ) {

			stack.light.push( entity );

		}

		for ( let i = 0; i < entity.children.length; i ++ ) {

			this._collectRenderStack( entity.children[ i ], visibility, stack );

		}

	}

	public render( entity: Entity, cameraEntity: Entity, event: EntityUpdateEvent, renderTarget?: RenderCameraTarget ) {

		if ( this.resolution.x === 0 || this.resolution.y === 0 ) return;

		if ( import.meta.env.DEV ) {

			const timerResults = this.backend.collectTimerQueries();

			if ( timerResults ) {

				this.emit( "timer", [ timerResults ] );

			}

		}

		/*-------------------------------
			Get RenderStack
		-------------------------------*/

		const stack = this.getRenderStack( entity );

		/*-------------------------------
			UpdateLight
		-------------------------------*/

		// light

		const shadowMapLightList: LightInfo[] = [];
		const prevLightsNum: {[key:string]: number} = {};

		const lightKeys = Object.keys( this._lights );

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;
			prevLightsNum[ l ] = this._lights[ l ].length;
			this._lights[ l ] = [];

		}

		for ( let i = 0; i < stack.light.length; i ++ ) {

			const lightEntity = stack.light[ i ];
			const lightComponent = lightEntity.getComponent( Light );

			if ( lightComponent ) {

				const info = this.collectLight( lightEntity, lightComponent );

				if ( lightComponent.castShadow && info.renderTarget ) {

					shadowMapLightList.push( info );

				}

			}

		}

		this._lights.directional.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );
		this._lights.spot.sort( ( a, b ) => ( a.component.castShadow ? 0 : 1 ) - ( b.component.castShadow ? 0 : 1 ) );

		this._lightsUpdated = false;

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;

			if ( prevLightsNum[ l ] != this._lights[ l ].length ) {

				this._lightsUpdated = true;

				break;

			}

		}

		// shadowmap

		for ( let i = 0; i < shadowMapLightList.length; i ++ ) {

			const info = shadowMapLightList[ i ];

			this.renderCamera( "shadowMap", info.component.entity, stack.shadowMap, info.renderTarget!, this.resolution );

		}

		// envmap

		for ( let i = 0; i < this._envMapCameras.length; i ++ ) {

			const { entity: cameraEntity } = this._envMapCameras[ i ];

			this._envMapRenderTarget.face( i );

			this.renderCamera( "envMap", cameraEntity, stack.envMap, this._envMapRenderTarget, this.resolution );

		}

		this.renderPostProcess( this._pmremRender.postprocess, undefined, this._pmremRender.resolution );

		this._pmremRender.swap();

		const rt = renderTarget || this._renderTarget;
		const cameraComponent = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ];

		if ( cameraComponent ) {

			// deferred

			this.backend.setBlendEnabled( false );

			this.renderCamera( "deferred", cameraEntity, stack.deferred, rt.gBuffer, this.resolution );

			this._deferredRenderer.setRenderCamera( cameraComponent, rt );

			this.renderPostProcess( this._deferredRenderer.postprocess, undefined, this.resolution, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				viewMatrixPrev: cameraComponent.viewMatrixPrev,
				projectionMatrix: cameraComponent.projectionMatrix,
				projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
				cameraMatrixWorld: cameraEntity.matrixWorld
			} } );

			this._deferredRenderer.update( event );

			// forward

			// refractionBuffer の初期状態を deferred 結果（shadingBuffer[0]）で満たす
			this._copyToRefraction( rt );

			// renderOrder 昇順で sort し、同一 order ごとにグループ化
			const sortedForward = stack.forward.slice().sort( ( a, b ) => {

				return getMaterial( a.getComponent( Mesh )! ).renderOrder - getMaterial( b.getComponent( Mesh )! ).renderOrder;

			} );

			const forwardGroups: Entity[][] = [];
			let currentOrder: number | null = null;

			for ( const ent of sortedForward ) {

				const o = getMaterial( ent.getComponent( Mesh )! ).renderOrder;

				if ( currentOrder === null || o !== currentOrder ) {

					forwardGroups.push( [] );
					currentOrder = o;

				}

				forwardGroups[ forwardGroups.length - 1 ].push( ent );

			}

			this.backend.setBlendEnabled( true );

			for ( let gi = 0; gi < forwardGroups.length; gi ++ ) {

				if ( gi > 0 ) {

					// 前グループの描画結果を refractionBuffer に反映
					this._copyToRefraction( rt );

				}

				this.renderCamera( "forward", cameraEntity, forwardGroups[ gi ], rt.forwardBuffer, this.resolution, {
					uniformOverride: {
						uDeferredTexture: {
							value: rt.refractionBuffer.textures[ 0 ],
							type: '1i'
						},
						uDeferredResolution: {
							value: rt.shadingBuffer.size,
							type: '2fv'
						},
						uEnvMap: {
							value: this._pmremRender.renderTarget.textures[ 0 ],
							type: '1i'
						},
						// gBufferのうちforwardBufferにアタッチされていない（フィードバックしない）テクスチャのみ公開する
						uGbufferNormal: {
							value: rt.normalBuffer.textures[ 0 ],
							type: '1i'
						},
						uGbufferAlbedo: {
							value: rt.gBuffer.textures[ 2 ],
							type: '1i'
						},
						uGbufferMaterial: {
							value: rt.gBuffer.textures[ 3 ],
							type: '1i'
						}
					},
					disableClear: true,
				} );

			}

			this.backend.setBlendEnabled( false );

			// scene

			this._pipelinePostProcess.setRenderCamera( cameraComponent, rt );

			this.renderPostProcess( this._pipelinePostProcess.postprocess, undefined, this.resolution, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				projectionMatrix: cameraComponent.projectionMatrix,
				cameraMatrixWorld: cameraEntity.matrixWorld,
				cameraNear: cameraComponent.near,
				cameraFar: cameraComponent.far,
			} } );

			this._pipelinePostProcess.update( event );

			let backBuffer = this._pipelinePostProcess.postprocess.output ? this._pipelinePostProcess.postprocess.output : undefined;

			// postprocess

			const postProcessManager = cameraEntity.getComponent( PostProcessPipeline );

			if ( postProcessManager ) {

				postProcessManager.resize( this.resolution );

				for ( let i = 0; i < postProcessManager.postProcesses.length; i ++ ) {

					const postProcess = postProcessManager.postProcesses[ i ];

					if ( ! ( postProcess.enabled && postProcess.hasOutput ) ) continue;

					this.renderPostProcess( postProcess, backBuffer, this.resolution, { cameraOverride: {
						viewMatrix: cameraComponent.viewMatrix,
						projectionMatrix: cameraComponent.projectionMatrix,
						cameraMatrixWorld: cameraEntity.matrixWorld,
						cameraNear: cameraComponent.near,
						cameraFar: cameraComponent.far,
					} } );

					backBuffer = postProcess.output || undefined;

				}

			}

			// ui

			if ( backBuffer ) {

				const size = backBuffer.size;

				this.backend.blit( backBuffer, rt.uiBuffer, size.x, size.y );

			}

			this.backend.setBlendEnabled( true );

			this.renderCamera( "forward", cameraEntity, stack.ui, rt.uiBuffer, this.resolution, {
				uniformOverride: {
					uDeferredTexture: {
						value: rt.refractionBuffer.textures[ 0 ],
						type: '1i'
					} },
				disableClear: true
			} );

			this.backend.setBlendEnabled( false );

			// display out

			this.backend.blit( rt.uiBuffer, null, this.resolution.x, this.resolution.y );

		}

	}

	public renderCamera( renderType: MaterialRenderType, cameraEntity: Entity, entities: Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: MTP.Vector, renderOption?: RenderOption ) {

		const camera = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ] || cameraEntity.getComponent( Light )!;

		renderOption = renderOption || {};

		const drawParam = this._tmpDrawParam;

		drawParam.viewMatrix = camera.viewMatrix;
		drawParam.viewMatrixPrev = camera.viewMatrixPrev;
		drawParam.projectionMatrix = camera.projectionMatrix;
		drawParam.projectionMatrixPrev = camera.projectionMatrixPrev;
		drawParam.cameraMatrixWorld = cameraEntity.matrixWorld;
		drawParam.cameraNear = camera.near;
		drawParam.cameraFar = camera.far;
		drawParam.renderTarget = renderTarget;
		drawParam.uniformOverride = renderOption.uniformOverride || this._tmpUniformOverride;

		if ( renderOption.cameraOverride ) {

			Object.assign( drawParam, renderOption.cameraOverride );

		}

		this.backend.bindRenderTarget( renderTarget, camera.viewPort, canvasSize );

		if ( renderTarget ) {

			this._tmpResolution.set( renderTarget.size.x, renderTarget.size.y );

		} else {

			this._tmpResolution.set( canvasSize.x, canvasSize.y );

		}

		drawParam.uniformOverride.uResolution = this._tmpResolutionUniform;

		// clear

		if ( ! renderOption.disableClear ) {

			this.backend.clear( renderType == "shadowMap" ? _clearColorWhite : _clearColorBlack, 1.0 );

		}

		// render

		for ( let i = 0; i < entities.length; i ++ ) {

			const entity = entities[ i ];

			const materialOverride = entity.getComponentsByTag<MaterialOverride>( "materialOverride" )[ 0 ];

			const mesh = entity.getComponent( Mesh )!;
			const material = ( materialOverride && materialOverride.material as Material ) || getMaterial( mesh );
			const geometry = mesh.geometry;

			drawParam.modelMatrixWorld = entity.matrixWorld;
			drawParam.modelMatrixWorldPrev = entity.matrixWorldPrev;
			drawParam.label = `cam[${camera.uuid}]/${entity.name || material.name || "-"}`;

			this.draw( entity.uuid, renderType, geometry, material, drawParam );

		}

		if ( import.meta.env.DEV ) {

			this.emit( "drawPass", [ renderTarget, "camera/" + renderType ] );

		}

	}

	private _copyToRefraction( rt: RenderCameraTarget ) {

		const size = rt.shadingBuffer.size;

		this.backend.blit( rt.shadingBuffer, rt.refractionBuffer, size.x, size.y, true, true );

	}

	private collectLight( lightEntity: Entity, lightComponent: Light ): LightInfo {

		const type = lightComponent.lightType;

		// LightInfoはライトごとに使い回してフレーム毎のVector生成を避ける
		let info = this._lightInfoCache.get( lightComponent );

		if ( ! info ) {

			info = {
				position: new MTP.Vector(),
				direction: new MTP.Vector(),
				color: new MTP.Vector(),
				renderTarget: null,
				component: lightComponent,
			};

			this._lightInfoCache.set( lightComponent, info );

		}

		info.position.set( 0.0, 0.0, 0.0, 1.0 ).applyMatrix4( lightEntity.matrixWorld );
		info.direction.set( 0.0, 1.0, 0.0, 0.0 ).applyMatrix4( lightEntity.matrixWorld ).normalize();
		info.color.set( lightComponent.color.x, lightComponent.color.y, lightComponent.color.z ).multiply( lightComponent.intensity * Math.PI );

		if ( type == 'directional' ) {

			this._lights.directional.push( info );

		} else if ( type == 'spot' ) {

			this._lights.spot.push( info );

		}

		if ( lightComponent.castShadow && info.renderTarget == null ) {

			info.renderTarget = this.backend.createFrameBuffer().setTexture( [ this.backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ) ] );
			info.renderTarget.setSize( lightComponent.shadowMapSize );

		}

		return info;

	}

	public renderPostProcess( postprocess: PostProcess, input?: GLP.GLPowerFrameBuffer, canvasSize?: MTP.Vector, renderOption?: RenderOption ) {

		// render

		let backbuffers: GLP.GLPowerTexture[] | undefined = input ? input.textures : undefined;

		if ( ! postprocess.passes ) return;

		for ( let i = 0; i < postprocess.passes.length; i ++ ) {

			const pass = postprocess.passes[ i ];

			if ( pass.enabled === false ) continue;

			const renderTarget = pass.renderTarget;

			this.backend.bindRenderTarget( renderTarget, pass.viewPort, canvasSize );

			// clear

			this.backend.clear( pass.clearColor, pass.clearDepth );

			const backBuffer = pass.backBufferOverride || backbuffers || null;

			if ( backBuffer ) {

				for ( let i = 0; i < backBuffer.length; i ++ ) {

					pass.uniforms[ 'uBackBuffer' + i ] = {
						type: '1i',
						value: backBuffer[ i ]
					};

				}

			}

			const opt: DrawParam = renderOption && renderOption.cameraOverride || {};

			opt.label = pass.name;
			opt.renderTarget = renderTarget;

			this.draw( pass.uuid, "postprocess", this._quad, pass, opt );

			pass.onAfterRender();

			if ( ! pass.passThrough && pass.renderTarget ) {

				backbuffers = pass.renderTarget.textures;

			}

			if ( import.meta.env.DEV ) {

				this.emit( "drawPass", [ pass.renderTarget, pass.name ] );

			}

		}

	}

	public draw( drawId: string, renderType: MaterialRenderType, geometry: Geometry, material: Material, param?: DrawParam ) {

		if ( this._isCorrentCompiles ) {

			this.compileDrawParams.push( { drawId, renderType, geometry, material, param: { ...param } } );

			return;

		}

		TextureUnitCounter = 0;

		this.backend.setMaterialState( material.cullFace, material.depthTest, material.depthWrite );

		// program

		let program = material.programCache[ renderType ];

		if ( ! program || this._lightsUpdated ) {

			const defines = { ...material.defines };

			if ( renderType == 'deferred' ) defines.IS_DEFERRED = "";
			else if ( renderType == 'forward' || renderType == 'envMap' ) defines.IS_FORWARD = "";
			else if ( renderType == 'shadowMap' ) defines.IS_DEPTH = "";

			const vert = shaderParse( material.vert, defines, this._lights );
			const frag = shaderParse( material.frag, defines, this._lights );

			program = this.programManager.get( vert, frag, material.name );

			material.programCache[ renderType ] = program;

		}

		if ( param ) {

			// modelMatrix

			if ( param.modelMatrixWorld ) {

				program.setUniform( 'uModelMatrix', 'Matrix4fv', param.modelMatrixWorld.elm );
				program.setUniform( 'uModelMatrixInverse', 'Matrix4fv', this._tmpModelMatrixInverse.copy( param.modelMatrixWorld ).inverse().elm );

				if ( param.modelMatrixWorldPrev ) {

					program.setUniform( 'uModelMatrixPrev', 'Matrix4fv', param.modelMatrixWorldPrev.elm );

				}

				if ( param.viewMatrix ) {

					this._tmpModelViewMatrix.copy( param.modelMatrixWorld ).preMultiply( param.viewMatrix );
					this._tmpNormalMatrix.copy( this._tmpModelViewMatrix );
					this._tmpNormalMatrix.inverse();
					this._tmpNormalMatrix.transpose();

					program.setUniform( 'uModelViewMatrix', 'Matrix4fv', this._tmpModelViewMatrix.elm );
					program.setUniform( 'uNormalMatrix', 'Matrix4fv', this._tmpNormalMatrix.elm );
					program.setUniform( 'uViewMatrixInverse', 'Matrix4fv', this._tmpViewMatrixInverseMatrix.copy( param.viewMatrix ).inverse().elm );

				}

			}

			// viewMatrix

			if ( param.viewMatrix ) {

				program.setUniform( 'uViewMatrix', 'Matrix4fv', param.viewMatrix.elm );

				if ( param.viewMatrixPrev ) {

					program.setUniform( 'uViewMatrixPrev', 'Matrix4fv', param.viewMatrixPrev.elm );

				}

			}

			// projectionMatrix

			if ( param.projectionMatrix ) {

				program.setUniform( 'uProjectionMatrix', 'Matrix4fv', param.projectionMatrix.elm );
				program.setUniform( 'uProjectionMatrixInverse', 'Matrix4fv', this._tmpProjectionMatrixInverse.copy( param.projectionMatrix ).inverse().elm );

				if ( param.projectionMatrixPrev ) {

					program.setUniform( 'uProjectionMatrixPrev', 'Matrix4fv', param.projectionMatrixPrev.elm );

				}

			}

			// cameraMatrix

			if ( param.cameraMatrixWorld ) {

				program.setUniform( 'uCameraMatrix', 'Matrix4fv', param.cameraMatrixWorld.elm );
				program.setUniform( 'uCameraPosition', '3f', [ param.cameraMatrixWorld.elm[ 12 ], param.cameraMatrixWorld.elm[ 13 ], param.cameraMatrixWorld.elm[ 14 ] ] );

			}

			if ( renderType != 'deferred' ) {

				if ( param.cameraNear ) {

					program.setUniform( 'uCameraNear', '1f', [ param.cameraNear ] );

				}

				if ( param.cameraFar ) {

					program.setUniform( 'uCameraFar', '1f', [ param.cameraFar ] );

				}

			}

		}

		if ( material.useLight && ( renderType !== 'deferred' && renderType !== 'shadowMap' ) ) {

			for ( let i = 0; i < this._lights.directional.length; i ++ ) {

				const dLight = this._lights.directional[ i ];
				const names = getDirLightNames( i );

				program.setUniform( names.direction, '3fv', dLight.direction.getElm( 'vec3' ) );
				program.setUniform( names.color, '3fv', dLight.color.getElm( 'vec3' ) );

				if ( dLight.renderTarget ) {

					const texture = dLight.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					program.setUniform( names.camNear, '1fv', [ dLight.component.near ] );
					program.setUniform( names.camFar, '1fv', [ dLight.component.far ] );
					program.setUniform( names.camViewMatrix, 'Matrix4fv', dLight.component.viewMatrix.elm );
					program.setUniform( names.camProjectionMatrix, 'Matrix4fv', dLight.component.projectionMatrix.elm );
					program.setUniform( names.camResolution, '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( names.shadowMap, '1i', [ texture.unit ] );

				}

			}

			for ( let i = 0; i < this._lights.spot.length; i ++ ) {

				const sLight = this._lights.spot[ i ];
				const names = getSpotLightNames( i );

				if ( param && param.viewMatrix ) {

					this._tmpLightDirection.copy( sLight.direction ).applyMatrix3( param.viewMatrix );

				}

				program.setUniform( names.position, '3fv', sLight.position.getElm( 'vec3' ) );
				program.setUniform( names.direction, '3fv', sLight.direction.getElm( 'vec3' ) );
				program.setUniform( names.color, '3fv', sLight.color.getElm( 'vec3' ) );
				program.setUniform( names.angle, '1fv', [ Math.cos( sLight.component.angle / 2 ) ] );
				program.setUniform( names.blend, '1fv', [ sLight.component.blend ] );
				program.setUniform( names.distance, '1fv', [ sLight.component.distance ] );
				program.setUniform( names.decay, '1fv', [ sLight.component.decay ] );

				if ( sLight.renderTarget ) {

					const texture = sLight.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					program.setUniform( names.camNear, '1fv', [ sLight.component.near ] );
					program.setUniform( names.camFar, '1fv', [ sLight.component.far ] );
					program.setUniform( names.camViewMatrix, 'Matrix4fv', sLight.component.viewMatrix.elm );
					program.setUniform( names.camProjectionMatrix, 'Matrix4fv', sLight.component.projectionMatrix.elm );
					program.setUniform( names.camResolution, '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( names.shadowMap, '1i', [ texture.unit ] );

				}

			}

		}

		setUniforms( program, this.globalUniforms, material.uniforms, param && param.uniformOverride );

		const vao = program.getVAO( drawId.toString() );

		if ( vao ) {

			const geometryBuffer = this._getGeometryBuffer( geometry );

			if ( geometryBuffer.vaoVersions.get( vao ) !== geometry.updateVersion ) {

				geometry.attributes.forEach( ( attr, key ) => {

					const buffer = geometryBuffer.buffers.get( key );

					if ( buffer === undefined ) return;

					if ( key == 'index' ) {

						vao.setIndex( buffer );

					} else {

						vao.setAttribute( key, buffer, attr.size, attr.opt );

					}

				} );

				geometryBuffer.vaoVersions.set( vao, geometry.updateVersion );

			}

			let queryName: string | undefined = undefined;

			if ( import.meta.env.DEV ) {

				queryName = `${renderType}/${param && param.label || "_"}/ [${drawId}]`;

			}

			this.backend.draw( program, vao, material.drawType, material.blending, queryName );

		}

	}

	// GeometryのGPUバッファを生成・保持する。updateVersionが変わっていたら作り直す
	private _getGeometryBuffer( geometry: Geometry ): GeometryBufferRecord {

		let record = this._geometryBuffers.get( geometry );

		if ( ! record ) {

			record = { buffers: new Map(), vaoVersions: new Map(), version: - 1 };

			this._geometryBuffers.set( geometry, record );

		}

		if ( record.version !== geometry.updateVersion ) {

			const buffers = record.buffers;

			buffers.forEach( ( buffer ) => buffer.dispose() );
			buffers.clear();
			record.vaoVersions.clear();

			geometry.attributes.forEach( ( attr, key ) => {

				buffers.set( key, new GLP.GLPowerBuffer( this.backend.gl ).setData( attr.array, key == 'index' ? 'ibo' : 'vbo', attr.opt && attr.opt.usage ) );

			} );

			record.version = geometry.updateVersion;

		}

		return record;

	}

	public applyPipelineConfig( config: PipelineConfig ): void {

		this._pipelineConfig = { ...this._pipelineConfig, ...config };

		this._applyEffectivePipelineConfig();

	}

	// シーン設定に触れずに一時的な上書きを重ねる（null で解除）
	public setPipelineOverride( override: PipelineConfig | null ): void {

		this._pipelineOverride = override;

		this._applyEffectivePipelineConfig();

	}

	// シーン本来の値にオーバーライドを重ねた実効値をパスへ流す
	private _applyEffectivePipelineConfig(): void {

		const config = { ...this._pipelineConfig, ...this._pipelineOverride };

		this._deferredRenderer.setPassEnabled( {
			ssao: config.ssao,
			lightShaft: config.lightShaft,
		} );
		this._pipelinePostProcess.setPassEnabled( {
			motionBlur: config.motionBlur,
			ssr: config.ssr,
			dof: config.dof,
		} );

		this._pipelinePostProcess.setMotionBlurPower( config.motionBlurPower );

	}

	public get pipelineConfig(): Required<PipelineConfig> {

		return this._pipelineConfig;

	}

	public resize( resolution: MTP.Vector ) {

		this.resolution.copy( resolution );
		Renderer.resizeRenderTarget( this._renderTarget, resolution );
		this._deferredRenderer.resize( this.resolution );
		this._pipelinePostProcess.resize( this.resolution );

	}

	public async compileShaders( entity: Entity, cameraEntity: Entity, event: EntityUpdateEvent, cb?: ( label: string, loaded: number, total: number ) => void ) {

		/*-------------------------------
			Correct Compiles
		-------------------------------*/
		this._isCorrentCompiles = true;

		this.compileDrawParams = [];

		this.render( entity, cameraEntity, event );

		this._isCorrentCompiles = false;

		/*-------------------------------
			Compile
		-------------------------------*/

		const total = this.compileDrawParams.length;
		let loaded = 0;

		for ( let i = 0; i < this.compileDrawParams.length; i ++ ) {

			const param = this.compileDrawParams[ i ];

			this.backend.bindRenderTarget( param.param.renderTarget || null );

			this.draw( param.drawId, param.renderType, param.geometry, param.material, param.param );

			await new Promise( r => {

				setTimeout( () => {

					r( null );

				}, 10 );

			} );

			if ( cb ) {

				loaded ++;

				const l = param.param && param.param.label || "-";
				const label = `${param.renderType}/${l}/[${param.drawId}]`;

				cb( label, loaded, total );

			}

		}

	}

	// .tex の実体を組み立てる。依存テクスチャはサンプラー（'1i' uniform）としてぶら下げる
	public createTexProcedural( param: TexProceduralParam ): TexProcedural {

		const uniforms: BSP.Uniforms = { ...param.uniforms };
		const textures = param.textures || {};
		const keys = Object.keys( textures );

		for ( let i = 0; i < keys.length; i ++ ) {

			uniforms[ keys[ i ] ] = { value: textures[ keys[ i ] ], type: '1i' };

		}

		const tex = new TexProcedural( this, {
			frag: param.frag,
			resolution: param.resolution,
			uniforms,
		} );

		if ( param.filter === 'nearest' ) {

			tex.setting( {
				magFilter: GL.NEAREST,
				minFilter: GL.NEAREST,
			} );

			tex.render();

		}

		return tex;

	}

}

// WebGLバックエンドを前提にしたEngineContract型。コンポーネントからは `engine as GLEngine` で参照する
export type GLEngine = EngineContract<Renderer>;

// canvasとWebGL2コンテキストを用意してWebGLレンダラーを組み立てる（@or-rendererの供給口）
export const createRenderer = ( engine: EngineContract ): Renderer => {

	const canvas = document.createElement( "canvas" );
	const gl = canvas.getContext( "webgl2", { antialias: false, preserveDrawingBuffer: true } )!;

	return new Renderer( new GLBackend( gl ), engine );

};

// uniform値の展開先を使い回してdraw毎の配列生成を避ける
// （GLPowerProgram.setUniformが値を内部配列へコピーする前提）
const _uniformArrayValue: ( number | boolean )[] = [];

const pushUniformValue = ( v: boolean | number | MTP.Vector | MTP.Matrix | GLP.GLPowerTexture, type: string ) => {

	if ( v == null ) return;

	if ( typeof v == 'number' || typeof v == 'boolean' ) {

		_uniformArrayValue.push( v );

	} else if ( 'isVector' in v ) {

		_uniformArrayValue.push( ...v.getElm( ( 'vec' + type.charAt( 0 ) ) as any ) );

	} else if ( 'isTexture' in v ) {

		v.activate( TextureUnitCounter ++ );

		_uniformArrayValue.push( v.unit );

	} else {

		_uniformArrayValue.push( ...v.elm );

	}

};

// 複数のuniformオブジェクトを順に走査して設定する（後のオブジェクトが同名キーを上書きする）
export const setUniforms = ( program: GLP.GLPowerProgram, ...uniformsList: ( BSP.Uniforms | undefined )[] ) => {

	for ( let ui = 0; ui < uniformsList.length; ui ++ ) {

		const uniforms = uniformsList[ ui ];

		if ( ! uniforms ) continue;

		const keys = Object.keys( uniforms );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];
			const uni = uniforms[ name ];

			if ( ! uni ) continue;

			const type = uni.type;
			const value = uni.value;

			_uniformArrayValue.length = 0;

			if ( Array.isArray( value ) ) {

				for ( let j = 0; j < value.length; j ++ ) {

					pushUniformValue( value[ j ], type );

				}

			} else {

				pushUniformValue( value, type );

			}

			if ( _uniformArrayValue.length > 0 ) {

				program.setUniform( name, type, _uniformArrayValue );

			}

		}

	}

};
