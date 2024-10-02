import * as GLP from 'glpower';

import { Entity } from '../../Entity';
import { shaderParse } from "../../Utils/ShaderParser";
import { Camera } from '../Camera';
import { RenderCamera } from '../Camera/RenderCamera';
import { Geometry } from '../Geometry';
import { PlaneGeometry } from '../Geometry/PlaneGeometry';
import { Light, LightType } from '../Light';
import { MaterialRenderType, Material } from '../Material';
import { PostProcess } from '../PostProcess';

import { DeferredRenderer } from './DeferredRenderer';
import { PipelinePostProcess } from './PipelinePostProcess';
import { PMREMRender } from './PMREMRender';
import { ProgramManager } from './ProgramManager';

// render stack

export type RenderStack = {
	light: Entity[];
	camera: Entity[];
	envMap: Entity[];
	shadowMap: Entity[];
	deferred: Entity[];
	forward: Entity[];
	ui: Entity[];
}

// light

type LightInfo = {
	position: GLP.Vector;
	direction: GLP.Vector;
	color: GLP.Vector;
	component: Light;
}

export type CollectedLights = {[K in LightType]: LightInfo[]}

// envmap

type EnvMapCamera = {
	entity: Entity,
	camera: Camera,
}

// drawParam

type RenderOption = {
	cameraOverride?: CameraOverride,
	disableClear?: boolean,
}

type CameraOverride = {
	viewMatrix?: GLP.Matrix;
	viewMatrixPrev?: GLP.Matrix;
	projectionMatrix?: GLP.Matrix;
	projectionMatrixPrev?: GLP.Matrix;
	cameraMatrixWorld?: GLP.Matrix;
	cameraNear?: number,
	cameraFar?:number,
	uniforms?: GLP.Uniforms,
}

type DrawParam = CameraOverride & { modelMatrixWorld?: GLP.Matrix, modelMatrixWorldPrev?: GLP.Matrix, drawName?: string }

// state

type GPUState = {
	[key: string] : {state: boolean},
}

// texture unit

export let TextureUnitCounter = 0;

export class Renderer extends Entity {

	public gl: WebGL2RenderingContext;
	private renderCanvasSize: GLP.Vector;
	private extDisJointTimerQuery: any;

	// program

	private programManager: ProgramManager;

	// lights

	private lights: CollectedLights;
	private lightsUpdated: boolean;

	// envmap

	private envMapCameras: EnvMapCamera[];
	private envMapRenderTarget: GLP.GLPowerFrameBufferCube;
	private pmremRender: PMREMRender;

	// postprocess

	private deferredPostProcess: DeferredRenderer;
	private pipelinePostProcess: PipelinePostProcess;

	// quad

	private quad: Geometry;

	// gpu state

	private glStateCahce: GPUState;

	// render query

	private queryList: WebGLQuery[];
	private queryListQueued: {name: string, query: WebGLQuery}[];

	// tmp

	private tmpNormalMatrix: GLP.Matrix;
	private tmpModelViewMatrix: GLP.Matrix;
	private tmpLightDirection: GLP.Vector;
	private tmpModelMatrixInverse: GLP.Matrix;
	private tmpProjectionMatrixInverse: GLP.Matrix;

	constructor( gl: WebGL2RenderingContext ) {

		super( { name: "Renderer" } );

		this.gl = gl;

		this.programManager = new ProgramManager( this.gl );
		this.renderCanvasSize = new GLP.Vector();
		this.extDisJointTimerQuery = this.gl.getExtension( "EXT_disjoint_timer_query_webgl2" );

		// lights

		this.lights = {
			directional: [],
			spot: [],
		};

		this.lightsUpdated = false;

		// envmap

		const envMap = new GLP.GLPowerTextureCube( this.gl );
		this.envMapRenderTarget = new GLP.GLPowerFrameBufferCube( this.gl ).setTexture( [ envMap ] );
		this.envMapRenderTarget.setSize( 256, 256 );

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

		this.envMapCameras = [];

		for ( let i = 0; i < 6; i ++ ) {

			const entity = new Entity( { name: "envMapCamera/" + i } );
			const camera = entity.addComponent( new Camera() );
			camera.fov = 90;
			camera.near = 0.1;
			camera.far = 1000;
			camera.aspect = 1;
			entity.applyMatrix( lookAtMatrices[ i ].clone() );
			camera.updateViewMatrix();
			camera.updateProjectionMatrix();
			this.envMapCameras.push( { entity, camera } );

		}

		// pmrem

		this.pmremRender = new PMREMRender( this.gl, {
			input: [ envMap ],
			resolution: new GLP.Vector( 256 * 3, 256 * 4 ),
		} );

		// postprocess

		this.deferredPostProcess = new DeferredRenderer( {
			gl,
			envMap: this.pmremRender.renderTarget.textures[ 0 ] as GLP.GLPowerTexture,
			envMapCube: envMap as GLP.GLPowerTextureCube,
		} );

		this.addComponent( this.deferredPostProcess );

		this.pipelinePostProcess = new PipelinePostProcess( gl );
		this.addComponent( this.pipelinePostProcess );

		// quad

		this.quad = new PlaneGeometry( { width: 2.0, height: 2.0 } );

		// gpu

		this.glStateCahce = {};

		// query

		this.queryList = [];
		this.queryListQueued = [];

		// tmp

		this.tmpLightDirection = new GLP.Vector();
		this.tmpModelMatrixInverse = new GLP.Matrix();
		this.tmpProjectionMatrixInverse = new GLP.Matrix();
		this.tmpModelViewMatrix = new GLP.Matrix();
		this.tmpNormalMatrix = new GLP.Matrix();

		this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

	}

	public render( stack: RenderStack ) {

		if ( process.env.NODE_ENV == 'development' ) {

			const disjoint = this.gl.getParameter( this.extDisJointTimerQuery.GPU_DISJOINT_EXT );

			if ( disjoint ) {

				this.queryList.forEach( q => this.gl.deleteQuery( q ) );

				this.queryList.length = 0;

			} else {

				// const updatedList = new Map<string, number>();
				const updatedList = [];

				if ( this.queryListQueued.length > 0 ) {

					const l = this.queryListQueued.length;

					for ( let i = l - 1; i >= 0; i -- ) {

						const q = this.queryListQueued[ i ];

						const resultAvailable = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT_AVAILABLE );

						if ( resultAvailable ) {

							const result = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT );

							updatedList.push( {
								name: q.name,
								duration: result / 1000 / 1000
							} );

							this.queryList.push( q.query );

							this.queryListQueued.splice( i, 1 );

						}

					}

				}

				this.emit( "timer", [ updatedList ] );

			}

		}

		// light

		const shadowMapLightList: Entity[] = [];
		const prevLightsNum: {[key:string]: number} = {};

		const lightKeys = Object.keys( this.lights );

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;
			prevLightsNum[ l ] = this.lights[ l ].length;
			this.lights[ l ] = [];

		}

		for ( let i = 0; i < stack.light.length; i ++ ) {

			const lightEntity = stack.light[ i ];
			const lightComponent = lightEntity.getComponent( Light );

			if ( lightComponent ) {

				this.collectLight( lightEntity, lightComponent );

				if ( lightComponent.castShadow && lightComponent.renderTarget ) {

					shadowMapLightList.push( lightEntity );

				}

			}

		}

		this.lightsUpdated = false;

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as LightType;

			if ( prevLightsNum[ l ] != this.lights[ l ].length ) {

				this.lightsUpdated = true;
				break;

			}

		}

		// shadowmap

		for ( let i = 0; i < shadowMapLightList.length; i ++ ) {

			const lightEntity = shadowMapLightList[ i ];
			const lightComponent = lightEntity.getComponent( Light )!;

			if ( lightComponent.renderTarget ) {

				this.renderCamera( "shadowMap", lightEntity, stack.shadowMap, lightComponent.renderTarget, this.renderCanvasSize );

			}

		}

		// envmap

		for ( let i = 0; i < this.envMapCameras.length; i ++ ) {

			const { entity: cameraEntity } = this.envMapCameras[ i ];

			this.envMapRenderTarget.face( i );

			this.renderCamera( "envMap", cameraEntity, stack.envMap, this.envMapRenderTarget, this.renderCanvasSize );

		}

		this.renderPostProcess( this.pmremRender, this.pmremRender.resolution );

		this.pmremRender.swap();

		for ( let i = 0; i < stack.camera.length; i ++ ) {

			const cameraEntity = stack.camera[ i ];
			const cameraComponent = cameraEntity.getComponent( RenderCamera )!;

			// deferred

			this.gl.disable( this.gl.BLEND );

			this.renderCamera( "deferred", cameraEntity, stack.deferred, cameraComponent.renderTarget.gBuffer, this.renderCanvasSize );

			this.deferredPostProcess.setRenderCamera( cameraComponent );

			this.renderPostProcess( this.deferredPostProcess, this.renderCanvasSize, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				viewMatrixPrev: cameraComponent.viewMatrixPrev,
				projectionMatrix: cameraComponent.projectionMatrix,
				projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
				cameraMatrixWorld: cameraEntity.matrixWorld
			} } );

			// forward

			this.gl.enable( this.gl.BLEND );

			this.renderCamera( "forward", cameraEntity, stack.forward, cameraComponent.renderTarget.forwardBuffer, this.renderCanvasSize, {
				cameraOverride: { uniforms: {
					uDeferredTexture: {
						value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ],
						type: '1i'
					},
					uDeferredResolution: {
						value: cameraComponent.renderTarget.shadingBuffer.size,
						type: '2fv'
					},
					uEnvMap: {
						value: this.pmremRender.renderTarget.textures[ 0 ],
						type: '1i'
					}
				} },
				disableClear: true,
			} );

			this.gl.disable( this.gl.BLEND );

			// scene

			this.pipelinePostProcess.setRenderCamera( cameraComponent );

			this.renderPostProcess( this.pipelinePostProcess, this.renderCanvasSize, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				projectionMatrix: cameraComponent.projectionMatrix,
				cameraMatrixWorld: cameraEntity.matrixWorld,
				cameraNear: cameraComponent.near,
				cameraFar: cameraComponent.far,
			} } );

			if ( this.pipelinePostProcess.output ) {

				this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, this.pipelinePostProcess.output.getFrameBuffer() );
				this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, cameraComponent.renderTarget.uiBuffer.getFrameBuffer() );

				const size = this.pipelinePostProcess.output.size;

				this.gl.blitFramebuffer(
					0, 0, size.x, size.y,
					0, 0, size.x, size.y,
					this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );

			}

			// ui

			this.gl.enable( this.gl.BLEND );

			this.renderCamera( "forward", cameraEntity, stack.ui, cameraComponent.renderTarget.uiBuffer, this.renderCanvasSize, {
				cameraOverride: {
					uniforms: { uDeferredTexture: { value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ], type: '1i' } }
				},
				disableClear: true
			} );

			this.gl.disable( this.gl.BLEND );

			// postprocess

			const postProcess = cameraEntity.getComponent( PostProcess );

			if ( postProcess && postProcess.enabled ) {

				this.renderPostProcess( postProcess, this.renderCanvasSize, { cameraOverride: {
					viewMatrix: cameraComponent.viewMatrix,
					projectionMatrix: cameraComponent.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					cameraNear: cameraComponent.near,
					cameraFar: cameraComponent.far,
				} } );

			}

			if ( cameraComponent.displayOut ) {

				const outBuffer = postProcess ? postProcess.output : cameraComponent.renderTarget.uiBuffer;

				this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, outBuffer === null ? null : outBuffer.getFrameBuffer() );
				this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, null );

				this.gl.blitFramebuffer(
					0, 0, this.renderCanvasSize.x, this.renderCanvasSize.y,
					0, 0, this.renderCanvasSize.x, this.renderCanvasSize.y,
					this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );


			}

		}

	}

	public renderCamera( renderType: MaterialRenderType, cameraEntity: Entity, entities: Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: GLP.Vector, renderOption?: RenderOption ) {

		const camera = cameraEntity.getComponentByTag<Camera>( "camera" ) || cameraEntity.getComponent( Light )!;

		renderOption = renderOption || {};

		const drawParam: DrawParam = {
			viewMatrix: camera.viewMatrix,
			viewMatrixPrev: camera.viewMatrixPrev,
			projectionMatrix: camera.projectionMatrix,
			projectionMatrixPrev: camera.projectionMatrixPrev,
			cameraMatrixWorld: cameraEntity.matrixWorld,
			cameraNear: camera.near,
			cameraFar: camera.far,
			...renderOption.cameraOverride
		};

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

		if ( renderTarget ) {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
			this.gl.drawBuffers( renderTarget.textureAttachmentList );

		} else {

			this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

		}

		// clear

		if ( ! renderOption.disableClear ) {

			if ( renderType == "shadowMap" ) {

				this.gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
				this.gl.clearDepth( 1.0 );


			} else {

				this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
				this.gl.clearDepth( 1.0 );

			}

			this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );

		}

		// render

		for ( let i = 0; i < entities.length; i ++ ) {

			const entity = entities[ i ];
			const material = entity.getComponentByTag<Material>( "material" )!;
			const geometry = entity.getComponentByTag<Geometry>( "geometry" )!;

			drawParam.modelMatrixWorld = entity.matrixWorld;
			drawParam.modelMatrixWorldPrev = entity.matrixWorldPrev;

			this.draw( entity.uuid, renderType, geometry, material, drawParam );

		}

		this.emit( "drawPass", [ renderTarget, "camera/" + renderType ] );


	}

	private collectLight( lightEntity: Entity, lightComponent: Light ) {

		const type = lightComponent.lightType;

		const info: LightInfo = {
			position: new GLP.Vector( 0.0, 0.0, 0.0, 1.0 ).applyMatrix4( lightEntity.matrixWorld ),
			direction: new GLP.Vector( 0.0, 1.0, 0.0, 0.0 ).applyMatrix4( lightEntity.matrixWorld ).normalize(),
			color: new GLP.Vector( lightComponent.color.x, lightComponent.color.y, lightComponent.color.z ).multiply( lightComponent.intensity * Math.PI ),
			component: lightComponent,
		};

		if ( type == 'directional' ) {

			this.lights.directional.push( info );

		} else if ( type == 'spot' ) {

			this.lights.spot.push( info );

		}

		if ( lightComponent.castShadow && lightComponent.renderTarget == null ) {

			lightComponent.setShadowMap(
				new GLP.GLPowerFrameBuffer( this.gl ).setTexture( [ new GLP.GLPowerTexture( this.gl ).setting( { magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR } ) ] )
			);

		}

	}

	public renderPostProcess( postprocess: PostProcess, canvasSize?: GLP.Vector, renderOption?: RenderOption ) {

		// render

		let backbuffers: GLP.GLPowerTexture[] | null = postprocess.input;

		for ( let i = 0; i < postprocess.passes.length; i ++ ) {

			const pass = postprocess.passes[ i ];

			if ( ! pass.enabled ) continue;

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

			if ( backbuffers ) {

				for ( let i = 0; i < backbuffers.length; i ++ ) {

					pass.uniforms[ 'backbuffer' + i ] = {
						type: '1i',
						value: backbuffers[ i ]
					};

				}

			}

			this.draw( pass.uuid, "postprocess", this.quad, pass, renderOption && renderOption.cameraOverride );

			pass.onAfterRender();

			if ( ! pass.passThrough && pass.renderTarget ) {

				backbuffers = pass.renderTarget.textures;

			}

			this.emit( "drawPass", [ pass.renderTarget, pass.name ] );

		}

	}

	private draw( drawId: string, renderType: MaterialRenderType, geometry: Geometry, material: Material, param?: DrawParam ) {

		TextureUnitCounter = 0;

		// cull face

		let gpuStateType: number = this.gl.CULL_FACE;

		const cullStateCache = this.glStateCahce[ gpuStateType ];

		if ( cullStateCache === undefined || cullStateCache.state != material.cullFace ) {

			material.cullFace ? this.gl.enable( gpuStateType ) : this.gl.disable( gpuStateType );

		}

		// depth

		gpuStateType = this.gl.DEPTH_TEST;

		const depthStateCache = this.glStateCahce[ gpuStateType ];

		if ( depthStateCache === undefined || depthStateCache.state != material.depthTest ) {

			material.depthTest ? this.gl.enable( gpuStateType ) : this.gl.disable( gpuStateType );

		}


		this.gl.depthMask( material.depthWrite );

		// program

		let program = material.programCache[ renderType ];

		if ( ! program || this.lightsUpdated ) {

			const defines = { ...material.defines };

			if ( renderType == 'deferred' ) defines.IS_DEFERRED = "";
			else if ( renderType == 'forward' || renderType == 'envMap' ) defines.IS_FORWARD = "";
			else if ( renderType == 'shadowMap' ) defines.IS_DEPTH = "";

			const vert = shaderParse( material.vert, defines, this.lights );
			const frag = shaderParse( material.frag, defines, this.lights );

			program = this.programManager.get( vert, frag );

			material.programCache[ renderType ] = program;

		}

		if ( param ) {

			if ( param.modelMatrixWorld ) {

				program.setUniform( 'modelMatrix', 'Matrix4fv', param.modelMatrixWorld.elm );
				program.setUniform( 'modelMatrixInverse', 'Matrix4fv', this.tmpModelMatrixInverse.copy( param.modelMatrixWorld ).inverse().elm );

				if ( param.modelMatrixWorldPrev ) {

					program.setUniform( 'modelMatrixPrev', 'Matrix4fv', param.modelMatrixWorldPrev.elm );

				}

				if ( param.viewMatrix ) {

					this.tmpModelViewMatrix.copy( param.modelMatrixWorld ).preMultiply( param.viewMatrix );
					this.tmpNormalMatrix.copy( this.tmpModelViewMatrix );
					this.tmpNormalMatrix.inverse();
					this.tmpNormalMatrix.transpose();

					program.setUniform( 'normalMatrix', 'Matrix4fv', this.tmpNormalMatrix.elm );

				}

			}

			if ( param.viewMatrix ) {

				program.setUniform( 'viewMatrix', 'Matrix4fv', param.viewMatrix.elm );

			}

			if ( param.viewMatrixPrev ) {

				program.setUniform( 'viewMatrixPrev', 'Matrix4fv', param.viewMatrixPrev.elm );

			}

			if ( param.projectionMatrix ) {

				program.setUniform( 'projectionMatrix', 'Matrix4fv', param.projectionMatrix.elm );
				program.setUniform( 'projectionMatrixInverse', 'Matrix4fv', this.tmpProjectionMatrixInverse.copy( param.projectionMatrix ).inverse().elm );

			}

			if ( param.projectionMatrixPrev ) {

				program.setUniform( 'projectionMatrixPrev', 'Matrix4fv', param.projectionMatrixPrev.elm );

			}

			if ( param.cameraMatrixWorld ) {

				program.setUniform( 'cameraMatrix', 'Matrix4fv', param.cameraMatrixWorld.elm );
				program.setUniform( 'cameraPosition', '3f', [ param.cameraMatrixWorld.elm[ 12 ], param.cameraMatrixWorld.elm[ 13 ], param.cameraMatrixWorld.elm[ 14 ] ] );

			}

			if ( renderType != 'deferred' ) {

				if ( param.cameraNear ) {

					program.setUniform( 'cameraNear', '1f', [ param.cameraNear ] );

				}

				if ( param.cameraFar ) {

					program.setUniform( 'cameraFar', '1f', [ param.cameraFar ] );

				}

			}

		}

		if ( material.useLight && ( renderType !== 'deferred' && renderType !== 'shadowMap' ) ) {

			for ( let i = 0; i < this.lights.directional.length; i ++ ) {

				const dLight = this.lights.directional[ i ];

				program.setUniform( 'directionalLight[' + i + '].direction', '3fv', dLight.direction.getElm( 'vec3' ) );
				program.setUniform( 'directionalLight[' + i + '].color', '3fv', dLight.color.getElm( 'vec3' ) );

				if ( dLight.component.renderTarget ) {

					const texture = dLight.component.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					program.setUniform( 'directionalLightCamera[' + i + '].near', '1fv', [ dLight.component.near ] );
					program.setUniform( 'directionalLightCamera[' + i + '].far', '1fv', [ dLight.component.far ] );
					program.setUniform( 'directionalLightCamera[' + i + '].viewMatrix', 'Matrix4fv', dLight.component.viewMatrix.elm );
					program.setUniform( 'directionalLightCamera[' + i + '].projectionMatrix', 'Matrix4fv', dLight.component.projectionMatrix.elm );
					program.setUniform( 'directionalLightCamera[' + i + '].resolution', '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( 'directionalLightShadowMap[' + i + ']', '1i', [ texture.unit ] );

				}

			}

			for ( let i = 0; i < this.lights.spot.length; i ++ ) {

				const sLight = this.lights.spot[ i ];

				if ( param && param.viewMatrix ) {

					this.tmpLightDirection.copy( sLight.direction ).applyMatrix3( param.viewMatrix );

				}

				program.setUniform( 'spotLight[' + i + '].position', '3fv', sLight.position.getElm( 'vec3' ) );
				program.setUniform( 'spotLight[' + i + '].direction', '3fv', sLight.direction.getElm( 'vec3' ) );
				program.setUniform( 'spotLight[' + i + '].color', '3fv', sLight.color.getElm( 'vec3' ) );
				program.setUniform( 'spotLight[' + i + '].angle', '1fv', [ Math.cos( sLight.component.angle / 2 ) ] );
				program.setUniform( 'spotLight[' + i + '].blend', '1fv', [ sLight.component.blend ] );
				program.setUniform( 'spotLight[' + i + '].distance', '1fv', [ sLight.component.distance ] );
				program.setUniform( 'spotLight[' + i + '].decay', '1fv', [ sLight.component.decay ] );

				if ( sLight.component.renderTarget ) {

					const texture = sLight.component.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					program.setUniform( 'spotLightCamera[' + i + '].near', '1fv', [ sLight.component.near ] );
					program.setUniform( 'spotLightCamera[' + i + '].far', '1fv', [ sLight.component.far ] );
					program.setUniform( 'spotLightCamera[' + i + '].viewMatrix', 'Matrix4fv', sLight.component.viewMatrix.elm );
					program.setUniform( 'spotLightCamera[' + i + '].projectionMatrix', 'Matrix4fv', sLight.component.projectionMatrix.elm );
					program.setUniform( 'spotLightCamera[' + i + '].resolution', '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( 'spotLightShadowMap[' + i + ']', '1i', [ texture.unit ] );

				}

			}

		}

		let uniforms = material.uniforms;

		if ( param && param.uniforms ) {

			uniforms = { ...uniforms, ...param.uniforms };

		}

		setUniforms( program, uniforms );

		const vao = program.getVAO( drawId.toString() );

		if ( vao ) {

			if ( ! geometry.vaoCache.get( vao ) ) {

				geometry.createBuffers( this.gl );

				geometry.attributes.forEach( ( attr, key ) => {

					if ( attr.buffer === undefined ) return;

					if ( key == 'index' ) {

						vao.setIndex( attr.buffer );

					} else {

						vao.setAttribute( key, attr.buffer, attr.size, attr.opt );

					}

				} );

				geometry.vaoCache.set( vao, true );

			}

			// draw

			// query ------------------------

			let query: WebGLQuery | null = null;

			if ( process.env.NODE_ENV == 'development' ) {

				query = this.queryList.pop() || null;

				if ( query == null ) {

					query = this.gl.createQuery();

				}

				if ( query ) {

					this.gl.beginQuery( this.extDisJointTimerQuery.TIME_ELAPSED_EXT, query );

				}

			}

			// -----------------------------


			program.use( ( program ) => {

				program.uploadUniforms();

				this.gl.bindVertexArray( vao.getVAO() );

				const indexBuffer = vao.indexBuffer;

				let indexBufferArrayType: number = this.gl.UNSIGNED_SHORT;

				if ( indexBuffer && indexBuffer.array && indexBuffer.array.BYTES_PER_ELEMENT == 4 ) {

					indexBufferArrayType = this.gl.UNSIGNED_INT;

				}

				if ( material.blending == 'NORMAL' ) {

					this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

				} else if ( material.blending == 'ADD' ) {

					this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE );

				} else if ( material.blending == 'DIFF' ) {

					this.gl.blendFunc( this.gl.ONE_MINUS_DST_COLOR, this.gl.ONE_MINUS_DST_COLOR );

				}

				const drawType = this.gl[ material.drawType ];

				if ( vao.instanceCount > 0 ) {

					if ( indexBuffer ) {

						this.gl.drawElementsInstanced( drawType, vao.indexCount, indexBufferArrayType, 0, vao.instanceCount );

					} else {

						this.gl.drawArraysInstanced( drawType, 0, vao.vertCount, vao.instanceCount );

					}

				} else {

					if ( indexBuffer ) {

						this.gl.drawElements( drawType, vao.indexCount, indexBufferArrayType, 0 );

					} else {

						this.gl.drawArrays( drawType, 0, vao.vertCount );

					}

				}

				this.gl.bindVertexArray( null );

			} );

			// query ------------------------

			if ( process.env.NODE_ENV == 'development' ) {

				if ( query ) {

					this.gl.endQuery( this.extDisJointTimerQuery.TIME_ELAPSED_EXT );

					this.queryListQueued.push( {
						name: `${renderType}/${param?.drawName || material.name }/[${drawId}]`,
						query: query
					} );

				}

			}

			// ----------------------------

		}

	}

	public resize( resolution: GLP.Vector ) {

		this.renderCanvasSize.copy( resolution );
		this.deferredPostProcess.resize( resolution );
		this.pipelinePostProcess.resize( resolution );

	}

}

export const setUniforms = ( program: GLP.GLPowerProgram, uniforms: GLP.Uniforms ) => {

	const keys = Object.keys( uniforms );

	for ( let i = 0; i < keys.length; i ++ ) {

		const name = keys[ i ];
		const uni = uniforms[ name ];

		if ( ! uni ) continue;

		const type = uni.type;
		const value = uni.value;

		const arrayValue: ( number | boolean )[] = [];

		const _ = ( v: GLP.Uniformable ) => {

			if ( v == null ) return;

			if ( typeof v == 'number' || typeof v == 'boolean' ) {

				arrayValue.push( v );

			} else if ( 'isVector' in v ) {

				arrayValue.push( ...v.getElm( ( 'vec' + type.charAt( 0 ) ) as any ) );

			} else if ( 'isTexture' in v ) {

				v.activate( TextureUnitCounter ++ );

				arrayValue.push( v.unit );

			} else {

				arrayValue.push( ...v.elm );

			}

		};

		if ( Array.isArray( value ) ) {

			for ( let j = 0; j < value.length; j ++ ) {

				_( value[ j ] );

			}

		} else {

			_( value );

		}

		if ( arrayValue.length > 0 ) {

			program.setUniform( name, type, arrayValue );

		}

	}

};
