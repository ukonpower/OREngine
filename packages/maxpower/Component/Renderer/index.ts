import * as GLP from 'glpower';

import { PlaneGeometry } from '../..//Geometry/PlaneGeometry';
import { Entity, EntityUpdateEvent } from '../../Entity';
import { Geometry } from '../../Geometry';
import { MaterialRenderType, Material } from '../../Material';
import { PostProcess } from '../../PostProcess';
import { Camera } from '../Camera';
import { RenderCamera } from '../Camera/RenderCamera';
import { Light } from '../Light';
import { PostProcessPipeline } from '../PostProcessPipeline';

import { CameraRenderer } from './CameraRenderer';
import { DeferredRenderer } from './DeferredRenderer';
import { DrawManager } from './DrawManager';
import { EnvMapRenderer } from './EnvMapRenderer';
import { LightManager } from './LightManager';
import { PipelinePostProcess } from './PipelinePostProcess';
import { PMREMRender } from './PMREMRender';
import { PostProcessRenderer } from './PostProcessRenderer';
import { RenderStackManager, RenderStack } from './RenderStackManager';

export class Renderer extends Entity {

	public gl: WebGL2RenderingContext;
	public resolution: GLP.Vector;

	// managers
	private drawManager: DrawManager;
	private renderStackManager: RenderStackManager;
	private lightManager: LightManager;
	private cameraRenderer: CameraRenderer;
	private envMapRenderer: EnvMapRenderer;
	private postProcessRenderer: PostProcessRenderer;

	// postprocess
	private _deferredRenderer: DeferredRenderer;
	private _pipelinePostProcess: PipelinePostProcess;
	private _pmremRender: PMREMRender;

	// quad
	private _quad: Geometry;

	constructor( gl: WebGL2RenderingContext ) {

		super( { name: "Renderer" } );

		this.gl = gl;
		this.resolution = new GLP.Vector();

		// setup managers
		this.drawManager = new DrawManager( this.gl );
		this.renderStackManager = new RenderStackManager();
		this.lightManager = new LightManager( this.gl );
		this.envMapRenderer = new EnvMapRenderer( this.gl );

		// quad
		this._quad = new PlaneGeometry( { width: 2.0, height: 2.0 } );

		// post process renderer
		this.postProcessRenderer = new PostProcessRenderer(
			this.gl,
			this.drawManager,
			this._quad,
			( renderTarget, name ) => this.emit( "drawPass", [ renderTarget, name ] )
		);

		// pmrem
		this._pmremRender = new PMREMRender( this.gl, {
			input: [ this.envMapRenderer.getEnvMapTexture() ],
			resolution: new GLP.Vector( 256 * 3, 256 * 4 ),
		} );

		// PMREMRenderにPostProcessRendererを設定
		this._pmremRender.setPostProcessRenderer( this.postProcessRenderer );

		// postprocess
		this._deferredRenderer = new DeferredRenderer( {
			gl,
			envMap: this._pmremRender.renderTarget.textures[ 0 ] as GLP.GLPowerTexture,
			envMapCube: this.envMapRenderer.getEnvMapTexture(),
		} );

		this._pipelinePostProcess = new PipelinePostProcess( gl );

		// camera renderer
		this.cameraRenderer = new CameraRenderer(
			this.gl,
			this.drawManager,
			( renderTarget, name ) => this.emit( "drawPass", [ renderTarget, name ] )
		);

		this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

	}

	// 外部クラスにpostProcessRendererを提供するメソッド
	public getPostProcessRenderer(): PostProcessRenderer {

		return this.postProcessRenderer;

	}

	// renderPostProcessメソッドを追加してリファクタリングによる互換性を維持
	public renderPostProcess( postprocess: PostProcess, input?: GLP.GLPowerFrameBuffer, canvasSize?: GLP.Vector, renderOption?: any ) {

		this.postProcessRenderer.renderPostProcess( postprocess, input, canvasSize, renderOption );

	}

	public render( entity: Entity, event: EntityUpdateEvent ) {

		entity.onBeforeRender( event );

		// process GPU queries
		this.drawManager.processQueries( ( updatedList ) => {

			this.emit( "timer", [ updatedList ] );

		} );

		/*-------------------------------
			Get RenderStack
		-------------------------------*/
		const stack = this.renderStackManager.getRenderStack( entity );

		/*-------------------------------
			Update Lights
		-------------------------------*/
		const shadowMapLightList = this.lightManager.collectLights( stack.light );

		/*-------------------------------
			Render ShadowMaps
		-------------------------------*/
		for ( let i = 0; i < shadowMapLightList.length; i ++ ) {

			const lightEntity = shadowMapLightList[ i ];
			const lightComponent = lightEntity.getComponent( Light )!;

			if ( lightComponent.renderTarget ) {

				this.cameraRenderer.renderCamera(
					"shadowMap",
					lightEntity,
					stack.shadowMap,
					lightComponent.renderTarget,
					this.resolution,
					this.lightManager.getLights()
				);

			}

		}

		/*-------------------------------
			Render EnvMap
		-------------------------------*/
		const envMapCameras = this.envMapRenderer.getEnvMapCameras();

		for ( let i = 0; i < envMapCameras.length; i ++ ) {

			const { entity: cameraEntity } = envMapCameras[ i ];
			this.envMapRenderer.envMapRenderTarget.face( i );

			this.cameraRenderer.renderCamera(
				"envMap",
				cameraEntity,
				stack.envMap,
				this.envMapRenderer.envMapRenderTarget,
				this.resolution,
				this.lightManager.getLights()
			);

		}

		// PMREMRenderのrenderProcessメソッドを使用
		this._pmremRender.renderProcess();
		this._pmremRender.swap();

		/*-------------------------------
			Render Cameras
		-------------------------------*/
		for ( let i = 0; i < stack.camera.length; i ++ ) {

			const cameraEntity = stack.camera[ i ];
			const cameraComponent = cameraEntity.getComponent( RenderCamera )!;

			if ( ! cameraComponent.renderTarget ) continue;

			// deferred
			this.gl.disable( this.gl.BLEND );

			this.cameraRenderer.renderCamera(
				"deferred",
				cameraEntity,
				stack.deferred,
				cameraComponent.renderTarget.gBuffer,
				this.resolution,
				this.lightManager.getLights()
			);

			this._deferredRenderer.setRenderCamera( cameraComponent );

			this.postProcessRenderer.renderPostProcess( this._deferredRenderer.postprocess, undefined, this.resolution, {
				cameraOverride: {
					viewMatrix: cameraComponent.viewMatrix,
					viewMatrixPrev: cameraComponent.viewMatrixPrev,
					projectionMatrix: cameraComponent.projectionMatrix,
					projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
					cameraMatrixWorld: cameraEntity.matrixWorld
				}
			} );

			this._deferredRenderer.update( event );

			// forward
			this.gl.enable( this.gl.BLEND );

			this.cameraRenderer.renderCamera(
				"forward",
				cameraEntity,
				stack.forward,
				cameraComponent.renderTarget.forwardBuffer,
				this.resolution,
				this.lightManager.getLights(),
				{
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
				}
			);

			this.gl.disable( this.gl.BLEND );

			// scene
			this._pipelinePostProcess.setRenderCamera( cameraComponent );

			this.postProcessRenderer.renderPostProcess( this._pipelinePostProcess.postprocess, undefined, this.resolution, {
				cameraOverride: {
					viewMatrix: cameraComponent.viewMatrix,
					projectionMatrix: cameraComponent.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					cameraNear: cameraComponent.near,
					cameraFar: cameraComponent.far,
				}
			} );

			this._pipelinePostProcess.update( event );

			let backBuffer = this._pipelinePostProcess.postprocess.output ? this._pipelinePostProcess.postprocess.output : undefined;

			// postprocess
			const postProcessManager = cameraEntity.getComponent( PostProcessPipeline );

			if ( postProcessManager ) {

				for ( let i = 0; i < postProcessManager.postProcesses.length; i ++ ) {

					const postProcess = postProcessManager.postProcesses[ i ];

					if ( ! ( postProcess.enabled && postProcess.hasOutput ) ) continue;

					this.postProcessRenderer.renderPostProcess( postProcess, backBuffer, this.resolution, {
						cameraOverride: {
							viewMatrix: cameraComponent.viewMatrix,
							projectionMatrix: cameraComponent.projectionMatrix,
							cameraMatrixWorld: cameraEntity.matrixWorld,
							cameraNear: cameraComponent.near,
							cameraFar: cameraComponent.far,
						}
					} );

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

			this.gl.enable( this.gl.BLEND );

			this.cameraRenderer.renderCamera(
				"forward",
				cameraEntity,
				stack.ui,
				cameraComponent.renderTarget.uiBuffer,
				this.resolution,
				this.lightManager.getLights(),
				{
					uniformOverride: {
						uDeferredTexture: {
							value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ],
							type: '1i'
						}
					},
					disableClear: true
				}
			);

			this.gl.disable( this.gl.BLEND );

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

		entity.onAfterRender( event );

	}

	public resize( resolution: GLP.Vector ) {

		this.resolution.copy( resolution );
		this._deferredRenderer.resize( this.resolution );
		this._pipelinePostProcess.resize( this.resolution );

	}

	public async compile( cb: ( label: string, loaded: number, total: number ) => void ) {

		return this.drawManager.compile( cb );

	}

}
