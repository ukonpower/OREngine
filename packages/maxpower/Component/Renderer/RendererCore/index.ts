import * as GLP from 'glpower';

import { Entity, EntityUpdateEvent } from '../../Entity';
import { Geometry } from '../../Geometry';
import { PlaneGeometry } from '../../Geometry/PlaneGeometry';
import { MaterialRenderType, Material } from '../../Material';
import { PostProcess } from '../../PostProcess';
import { Camera } from '../Camera';
import { RenderCamera } from '../Camera/RenderCamera';
import { Light } from '../Light';
import { MaterialOverride } from '../MaterialOverride';
import { Mesh } from '../Mesh';
import { PostProcessPipeline } from '../PostProcessPipeline';

import { DeferredRenderer } from './DeferredRenderer';
import { PipelinePostProcess } from './PipelinePostProcess';
import { PMREMRender } from './PMREMRender';
import { ProgramManager } from './ProgramManager';
import { LightManager } from './LightManager';
import { GLStateManager } from './GLStateManager';
import { RenderQueryManager } from './RenderQueryManager';
import { DrawCommandProcessor, DrawParam } from './DrawCommandProcessor';
import { RenderStackManager, RenderStack } from './RenderStackManager';

// envmap

type EnvMapCamera = {
	entity: Entity,
	camera: Camera,
}

// drawParam

interface RenderOption {
	cameraOverride?: CameraParam,
	uniformOverride?: GLP.Uniforms,
	disableClear?: boolean,
}

interface CameraParam {
	viewMatrix?: GLP.Matrix;
	viewMatrixPrev?: GLP.Matrix;
	projectionMatrix?: GLP.Matrix;
	projectionMatrixPrev?: GLP.Matrix;
	cameraMatrixWorld?: GLP.Matrix;
	cameraNear?: number,
	cameraFar?:number,
}

// compile draw param

interface CompileDrawParam {
	drawId: string;
	renderType: MaterialRenderType;
	geometry: Geometry;
	material: Material;
	param: DrawParam;
}

export class Renderer extends Entity {

	public gl: WebGL2RenderingContext;
	public resolution: GLP.Vector;
	public programManager: ProgramManager;

	// managers
	private lightManager: LightManager;
	private glStateManager: GLStateManager;
	private queryManager: RenderQueryManager;
	private drawProcessor: DrawCommandProcessor;
	private stackManager: RenderStackManager;

	// envmap
	private _envMapCameras: EnvMapCamera[];
	private _envMapRenderTarget: GLP.GLPowerFrameBufferCube;
	private _pmremRender: PMREMRender;

	// postprocess
	private _deferredRenderer: DeferredRenderer;
	private _pipelinePostProcess: PipelinePostProcess;

	// quad
	private _quad: Geometry;

	// compile
	private _isCorrentCompiles: boolean;
	private compileDrawParams: CompileDrawParam[];

	constructor( gl: WebGL2RenderingContext ) {

		super( { name: "Renderer" } );

		this.gl = gl;
		this.resolution = new GLP.Vector();

		// initialize managers
		this.programManager = new ProgramManager( this.gl );
		this.lightManager = new LightManager( this.gl );
		this.glStateManager = new GLStateManager( this.gl );
		this.queryManager = new RenderQueryManager( this.gl );
		this.drawProcessor = new DrawCommandProcessor( this.gl, this.programManager, this.glStateManager, this.queryManager );
		this.stackManager = new RenderStackManager();

		// compile
		this._isCorrentCompiles = false;
		this.compileDrawParams = [];

		// envmap
		const envMap = new GLP.GLPowerTextureCube( this.gl );
		this._envMapRenderTarget = new GLP.GLPowerFrameBufferCube( this.gl ).setTexture( [ envMap ] );
		this._envMapRenderTarget.setSize( 256, 256 );

		const origin = new GLP.Vector( 0, 0, 0 );
		const up = new GLP.Vector( 0, - 1, 0 );

		const lookAtMatrices = [
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 1, 0, 0 ), up ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, 1, 0 ), new GLP.Vector( 0, 0, 1 ) ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, 0, 1 ), up ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( - 1, 0, 0 ), up ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, - 1, 0 ), new GLP.Vector( 0, 0, - 1 ) ),
			new GLP.Matrix().lookAt( origin, new GLP.Vector( 0, 0, - 1 ), up ),
		];

		this._envMapCameras = [];

		for ( let i = 0; i < 6; i ++ ) {

			const entity = new Entity( { name: "envMapCamera/" + i } );
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
		this._pmremRender = new PMREMRender( this.gl, {
			input: [ envMap ],
			resolution: new GLP.Vector( 256 * 3, 256 * 4 ),
		} );

		// postprocess
		this._deferredRenderer = new DeferredRenderer( {
			gl,
			envMap: this._pmremRender.renderTarget.textures[ 0 ] as GLP.GLPowerTexture,
			envMapCube: envMap as GLP.GLPowerTextureCube,
		} );

		this._pipelinePostProcess = new PipelinePostProcess( gl );

		// quad
		this._quad = new PlaneGeometry( { width: 2.0, height: 2.0 } );

		this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

	}

	public render( entity: Entity, event: EntityUpdateEvent ) {

		entity.onBeforeRender( event );

		// process queries
		const updatedQueries = this.queryManager.checkAndProcessQueries();
		if ( updatedQueries.length > 0 ) {
			this.emit( "timer", [ updatedQueries ] );
		}

		// get render stack
		const stack = this.stackManager.getRenderStack( entity );

		// collect lights
		const shadowMapLightList = this.lightManager.collectLights( stack.light );

		// render shadowmaps
		this.renderShadowMaps( shadowMapLightList, stack.shadowMap );

		// render environment maps
		this.renderEnvironmentMaps( stack.envMap );

		// render cameras
		this.renderCameras( stack );

		entity.onAfterRender( event );

	}

	private renderShadowMaps( shadowMapLightList: Entity[], entities: Entity[] ) {

		for ( let i = 0; i < shadowMapLightList.length; i ++ ) {

			const lightEntity = shadowMapLightList[ i ];
			const lightComponent = lightEntity.getComponent( Light )!;

			if ( lightComponent.renderTarget ) {

				this.renderCamera( "shadowMap", lightEntity, entities, lightComponent.renderTarget, this.resolution );

			}

		}

	}

	private renderEnvironmentMaps( entities: Entity[] ) {

		for ( let i = 0; i < this._envMapCameras.length; i ++ ) {

			const { entity: cameraEntity } = this._envMapCameras[ i ];

			this._envMapRenderTarget.face( i );

			this.renderCamera( "envMap", cameraEntity, entities, this._envMapRenderTarget, this.resolution );

		}

		this.renderPostProcess( this._pmremRender.postprocess, undefined, this._pmremRender.resolution );

		this._pmremRender.swap();

	}

	private renderCameras( stack: RenderStack ) {

		for ( let i = 0; i < stack.camera.length; i ++ ) {

			const cameraEntity = stack.camera[ i ];
			const cameraComponent = cameraEntity.getComponent( RenderCamera )!;

			if ( ! cameraComponent.renderTarget ) continue;

			// deferred
			this.glStateManager.disableBlend();

			this.renderCamera( "deferred", cameraEntity, stack.deferred, cameraComponent.renderTarget.gBuffer, this.resolution );

			this._deferredRenderer.setRenderCamera( cameraComponent );

			this.renderPostProcess( this._deferredRenderer.postprocess, undefined, this.resolution, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				viewMatrixPrev: cameraComponent.viewMatrixPrev,
				projectionMatrix: cameraComponent.projectionMatrix,
				projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
				cameraMatrixWorld: cameraEntity.matrixWorld
			} } );

			this._deferredRenderer.update( {
				...arguments[ 0 ],
				timeElapsed: 0,
				timeDelta: 0,
				playing: false,
				renderer: this,
				resolution: this.resolution
			} );

			// forward
			this.glStateManager.enableBlend();

			this.renderCamera( "forward", cameraEntity, stack.forward, cameraComponent.renderTarget.forwardBuffer, this.resolution, {
				uniformOverride: {
					uDeferredTexture: {
						value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ],
						type: '1i'
					},
					uDeferredResolution: {
						value: cameraComponent.renderTarget.shadingBuffer.size,
						type: '2fv'
					},
					uEnvMap: {
						value: this._pmremRender.renderTarget.textures[ 0 ],
						type: '1i'
					}
				},
				disableClear: true,
			} );

			this.glStateManager.disableBlend();

			// scene
			this._pipelinePostProcess.setRenderCamera( cameraComponent );

			this.renderPostProcess( this._pipelinePostProcess.postprocess, undefined, this.resolution, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				projectionMatrix: cameraComponent.projectionMatrix,
				cameraMatrixWorld: cameraEntity.matrixWorld,
				cameraNear: cameraComponent.near,
				cameraFar: cameraComponent.far,
			} } );

			this._pipelinePostProcess.update( {
				...arguments[ 0 ],
				timeElapsed: 0,
				timeDelta: 0,
				playing: false,
				renderer: this,
				resolution: this.resolution
			} );

			let backBuffer = this._pipelinePostProcess.postprocess.output ? this._pipelinePostProcess.postprocess.output : undefined;

			// postprocess
			const postProcessManager = cameraEntity.getComponent( PostProcessPipeline );

			if ( postProcessManager ) {

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

				this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, backBuffer.getFrameBuffer() );
				this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, cameraComponent.renderTarget.uiBuffer.getFrameBuffer() );

				const size = backBuffer.size;

				this.gl.blitFramebuffer(
					0, 0, size.x, size.y,
					0, 0, size.x, size.y,
					this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );

			}

			this.glStateManager.enableBlend();

			this.renderCamera( "forward", cameraEntity, stack.ui, cameraComponent.renderTarget.uiBuffer, this.resolution, {
				uniformOverride: {
					uDeferredTexture: {
						value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ],
						type: '1i'
					} },
				disableClear: true
			} );

			this.glStateManager.disableBlend();

			if ( cameraComponent.displayOut ) {

				const outBuffer = cameraComponent.renderTarget.uiBuffer;

				this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, outBuffer === null ? null : outBuffer.getFrameBuffer() );
				this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, null );

				this.gl.blitFramebuffer(
					0, 0, this.resolution.x, this.resolution.y,
					0, 0, this.resolution.x, this.resolution.y,
					this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );

			}

		}

	}

	public renderCamera( 
		renderType: MaterialRenderType, 
		cameraEntity: Entity, 
		entities: Entity[], 
		renderTarget: GLP.GLPowerFrameBuffer | null, 
		canvasSize: GLP.Vector, 
		renderOption?: RenderOption 
	) {

		const camera = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ] || cameraEntity.getComponent( Light )!;

		renderOption = renderOption || {};

		const drawParam: DrawParam = {
			viewMatrix: camera.viewMatrix,
			viewMatrixPrev: camera.viewMatrixPrev,
			projectionMatrix: camera.projectionMatrix,
			projectionMatrixPrev: camera.projectionMatrixPrev,
			cameraMatrixWorld: cameraEntity.matrixWorld,
			cameraNear: camera.near,
			cameraFar: camera.far,
			renderTarget: renderTarget,
			uniformOverride: renderOption.uniformOverride,
			...renderOption.cameraOverride,
		};

		this.setupViewport( camera, renderTarget, canvasSize );
		this.setupRenderTarget( renderTarget, canvasSize, drawParam );
		this.clearBuffers( renderType, renderOption );

		// render entities
		for ( let i = 0; i < entities.length; i ++ ) {

			const entity = entities[ i ];

			const materialOverride = entity.getComponentsByTag<MaterialOverride>( "materialOverride" )[ 0 ];

			const mesh = entity.getComponent( Mesh )!;
			const material = materialOverride ? materialOverride.material : mesh.material;
			const geometry = mesh.geometry;

			drawParam.modelMatrixWorld = entity.matrixWorld;
			drawParam.modelMatrixWorldPrev = entity.matrixWorldPrev;
			drawParam.label = `cam[${camera.uuid}]/${entity.name || material.name || "-"}`;

			this.draw( entity.uuid, renderType, geometry, material, drawParam );

		}

		this.emit( "drawPass", [ renderTarget, "camera/" + renderType ] );

	}

	private setupViewport( camera: Camera | Light, renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: GLP.Vector ) {

		if ( camera.viewPort ) {

			const v = camera.viewPort;
			this.gl.viewport( v.x, v.y, v.z, v.w );

		} else {

			if ( renderTarget ) {

				this.gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );

			} else {

				this.gl.viewport( 0, 0, canvasSize.x, canvasSize.y );

			}

		}

	}

	private setupRenderTarget( renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: GLP.Vector, drawParam: DrawParam ) {

		const resolution = new GLP.Vector();

		if ( renderTarget ) {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
			this.gl.drawBuffers( renderTarget.textureAttachmentList );

			resolution.set( renderTarget.size.x, renderTarget.size.y );

		} else {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

			resolution.set( canvasSize.x, canvasSize.y );

		}

		if ( ! drawParam.uniformOverride ) drawParam.uniformOverride = {};

		drawParam.uniformOverride.uResolution = {
			value: resolution,
			type: '2fv'
		};

	}

	private clearBuffers( renderType: MaterialRenderType, renderOption?: RenderOption ) {

		if ( ! renderOption?.disableClear ) {

			if ( renderType == "shadowMap" ) {

				this.glStateManager.setClearColor( 1.0, 1.0, 1.0, 1.0 );
				this.glStateManager.setClearDepth( 1.0 );

			} else {

				this.glStateManager.setClearColor( 0.0, 0.0, 0.0, 1.0 );
				this.glStateManager.setClearDepth( 1.0 );

			}

			this.glStateManager.clearBuffers();

		}

	}

	public renderPostProcess( postprocess: PostProcess, input?: GLP.GLPowerFrameBuffer, canvasSize?: GLP.Vector, renderOption?: RenderOption ) {

		// render
		let backbuffers: GLP.GLPowerTexture[] | undefined = input ? input.textures : undefined;

		if ( ! postprocess.passes ) return;

		for ( let i = 0; i < postprocess.passes.length; i ++ ) {

			const pass = postprocess.passes[ i ];

			if ( pass.enabled === false ) continue;

			const renderTarget = pass.renderTarget;

			if ( pass.viewPort ) {

				const v = pass.viewPort;
				this.gl.viewport( v.x, v.y, v.z, v.w );

			} else {

				if ( renderTarget ) {

					this.gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );

				} else {

					if ( canvasSize ) {

						this.gl.viewport( 0, 0, canvasSize.x, canvasSize.y );

					}

				}

			}

			if ( renderTarget ) {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
				this.gl.drawBuffers( renderTarget.textureAttachmentList );

			} else {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

			}

			// clear
			let clear = 0;

			if ( pass.clearColor ) {

				this.gl.clearColor( pass.clearColor.x, pass.clearColor.y, pass.clearColor.z, pass.clearColor.w );
				clear |= this.gl.COLOR_BUFFER_BIT;

			}

			if ( pass.clearDepth !== null ) {

				this.gl.clearDepth( pass.clearDepth );
				clear |= this.gl.DEPTH_BUFFER_BIT;

			}

			if ( clear !== 0 ) {

				this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

			}

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

			this.emit( "drawPass", [ pass.renderTarget, pass.name ] );

		}

	}

	public draw( drawId: string, renderType: MaterialRenderType, geometry: Geometry, material: Material, param?: DrawParam ) {

		if ( this._isCorrentCompiles ) {

			this.compileDrawParams.push( { drawId, renderType, geometry, material, param: { ...param } } );

			return;

		}

		this.drawProcessor.draw( drawId, renderType, geometry, material, this.lightManager.lights, this.lightManager.lightsUpdated, param );

	}

	public resize( resolution: GLP.Vector ) {

		this.resolution.copy( resolution );
		this._deferredRenderer.resize( this.resolution );
		this._pipelinePostProcess.resize( this.resolution );

	}

	public async compileShaders( entity: Entity, event: EntityUpdateEvent, cb?: ( label: string, loaded: number, total: number ) => void ) {

		// collect compile parameters
		this._isCorrentCompiles = true;
		this.compileDrawParams = [];
		this.render( entity, event );
		this._isCorrentCompiles = false;

		// compile
		const total = this.compileDrawParams.length;
		let loaded = 0;

		for ( let i = 0; i < this.compileDrawParams.length; i ++ ) {

			const param = this.compileDrawParams[ i ];

			const renderTarget = param.param.renderTarget;

			if ( renderTarget ) {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
				this.gl.drawBuffers( renderTarget.textureAttachmentList );

			} else {

				this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

			}

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

}
