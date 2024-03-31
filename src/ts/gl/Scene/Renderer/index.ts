import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { getDrawType } from '../utils/globalFunc';

import { DeferredRenderer } from './DeferredPostProcess';
import { PMREMRender } from './PMREMRender';
import { ProgramManager } from "./ProgramManager";
import { shaderParse } from "./ShaderParser";

import { gpuState } from '~/ts/Globals';


// render stack

export type RenderStack = {
	light: MXP.Entity[];
	camera: MXP.Entity[];
	envMap: MXP.Entity[];
	shadowMap: MXP.Entity[];
	deferred: MXP.Entity[];
	forward: MXP.Entity[];
	ui: MXP.Entity[];
	gpuCompute: MXP.Entity[];
}

// light

type LightInfo = {
	position: GLP.Vector;
	direction: GLP.Vector;
	color: GLP.Vector;
	component: MXP.Light;
}

export type CollectedLights = {[K in MXP.LightType]: LightInfo[]}

// envmap

type EnvMapCamera = {
	entity: MXP.Entity,
	camera: MXP.Camera,
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

type DrawParam = CameraOverride & { modelMatrixWorld?: GLP.Matrix, modelMatrixWorldPrev?: GLP.Matrix }

// state

type GPUState = {
	key: string,
	command: number,
	state: boolean,
}[]

// texture unit

export let TextureUnitCounter = 0;

export class Renderer extends MXP.Entity {

	private gl: WebGL2RenderingContext;
	private canvasSize: GLP.Vector;

	// program

	private programManager: ProgramManager;

	// lights

	private lights: CollectedLights;
	private lightsUpdated: boolean;

	// envmap

	private envMapCameras: EnvMapCamera[];
	private envMapRenderTarget: GLP.GLPowerFrameBufferCube;
	private pmremRender: PMREMRender;

	// deferred

	private deferredPostProcess: DeferredRenderer;

	// quad

	private quad: MXP.Geometry;

	// gpu state

	private glState: GPUState;

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
		this.canvasSize = new GLP.Vector();

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

			const entity = new MXP.Entity( { name: "envMapCamera/" + i } );
			const camera = entity.addComponent( "camera", new MXP.Camera() );
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

		this.pmremRender = new PMREMRender( {
			input: [ envMap ],
			resolution: new GLP.Vector( 256 * 3, 256 * 4 ),
		} );

		// deferred

		this.deferredPostProcess = new DeferredRenderer( {
			envMap: this.pmremRender.renderTarget.textures[ 0 ] as GLP.GLPowerTexture,
			// envMap: this.pmremRender.passes[ 0 ].renderTarget?.textures[ 0 ] as GLP.GLPowerTexture,
			envMapCube: envMap as GLP.GLPowerTextureCube,
		} );

		this.addComponent( "deferredPostProcess", this.deferredPostProcess );

		// quad

		this.quad = new MXP.PlaneGeometry( { width: 2.0, height: 2.0 } );

		// gpu

		this.glState = [
			{
				key: "cullFace",
				command: this.gl.CULL_FACE,
				state: false
			},
			{
				key: "depthTest",
				command: this.gl.DEPTH_TEST,
				state: false
			},
		];

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

		// if ( process.env.NODE_ENV == 'development' && this.power.extDisJointTimerQuery && gpuState ) {

		// 	const disjoint = this.gl.getParameter( this.power.extDisJointTimerQuery.GPU_DISJOINT_EXT );

		// 	if ( disjoint ) {

		// 		this.queryList.forEach( q => this.gl.deleteQuery( q ) );

		// 		this.queryList.length = 0;

		// 	} else {

		// 		if ( this.queryListQueued.length > 0 ) {

		// 			const l = this.queryListQueued.length;

		// 			for ( let i = l - 1; i >= 0; i -- ) {

		// 				const q = this.queryListQueued[ i ];

		// 				const resultAvailable = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT_AVAILABLE );

		// 				if ( resultAvailable ) {

		// 					const result = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT );

		// 					this.queryList.push( q.query );

		// 					this.queryListQueued.splice( i, 1 );

		// 					if ( gpuState ) {

		// 						gpuState.setRenderTime( q.name, result / 1000 / 1000 );

		// 					}

		// 				}

		// 			}

		// 		}

		// 	}

		// }

		// light

		const shadowMapLightList: MXP.Entity[] = [];
		const prevLightsNum: {[key:string]: number} = {};

		const lightKeys = Object.keys( this.lights );

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as MXP.LightType;
			prevLightsNum[ l ] = this.lights[ l ].length;
			this.lights[ l ].length = 0;

		}

		for ( let i = 0; i < stack.light.length; i ++ ) {

			const light = stack.light[ i ];

			if ( this.collectLight( light ) ) {

				shadowMapLightList.push( light );

			}

		}

		this.lightsUpdated = false;

		for ( let i = 0; i < lightKeys.length; i ++ ) {

			const l = lightKeys[ i ] as MXP.LightType;

			if ( prevLightsNum[ l ] != this.lights[ l ].length ) {

				this.lightsUpdated = true;
				break;

			}

		}

		// gpu

		for ( let i = 0; i < stack.gpuCompute.length; i ++ ) {

			const gpu = stack.gpuCompute[ i ].getComponent<MXP.GPUCompute>( 'gpuCompute' )!;

			this.renderPostProcess( gpu );

		}

		// shadowmap

		for ( let i = 0; i < shadowMapLightList.length; i ++ ) {

			const lightEntity = shadowMapLightList[ i ];
			const lightComponent = lightEntity.getComponent<MXP.Light>( 'light' )!;

			if ( lightComponent.renderTarget ) {

				this.renderCamera( "shadowMap", lightEntity, stack.shadowMap, lightComponent.renderTarget );

			}

		}

		// envmap

		for ( let i = 0; i < this.envMapCameras.length; i ++ ) {

			const { entity: cameraEntity } = this.envMapCameras[ i ];

			this.envMapRenderTarget.face( i );

			this.renderCamera( "envMap", cameraEntity, stack.envMap, this.envMapRenderTarget );


		}

		this.renderPostProcess( this.pmremRender );

		this.pmremRender.swap();

		for ( let i = 0; i < stack.camera.length; i ++ ) {

			const cameraEntity = stack.camera[ i ];
			const cameraComponent = cameraEntity.getComponent<MXP.RenderCamera>( 'camera' )!;

			// deferred

			this.gl.disable( this.gl.BLEND );

			this.renderCamera( "deferred", cameraEntity, stack.deferred, cameraComponent.renderTarget.gBuffer );

			this.deferredPostProcess.setRenderTarget( cameraComponent.renderTarget );

			this.renderPostProcess( this.deferredPostProcess, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				viewMatrixPrev: cameraComponent.viewMatrixPrev,
				projectionMatrix: cameraComponent.projectionMatrix,
				projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
				cameraMatrixWorld: cameraEntity.matrixWorld
			} } );

			// forward

			this.gl.enable( this.gl.BLEND );

			this.renderCamera( "forward", cameraEntity, stack.forward, cameraComponent.renderTarget.forwardBuffer, {
				cameraOverride: { uniforms: { uDeferredTexture: { value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ], type: '1i' } } },
				disableClear: true,
			} );

			this.gl.disable( this.gl.BLEND );

			// scene

			const prePostprocess = cameraEntity.getComponentEnabled<MXP.PostProcess>( 'scenePostProcess' );

			if ( prePostprocess ) {

				this.renderPostProcess( prePostprocess, { cameraOverride: {
					viewMatrix: cameraComponent.viewMatrix,
					projectionMatrix: cameraComponent.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					cameraNear: cameraComponent.near,
					cameraFar: cameraComponent.far,
				} } );

				if ( prePostprocess.output ) {

					this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, prePostprocess.output.getFrameBuffer() );
					this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, cameraComponent.renderTarget.uiBuffer.getFrameBuffer() );

					const size = prePostprocess.output.size;

					this.gl.blitFramebuffer(
						0, 0, size.x, size.y,
						0, 0, size.x, size.y,
						this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );

				}

			} else {

				this.gl.bindFramebuffer( this.gl.READ_FRAMEBUFFER, cameraComponent.renderTarget.forwardBuffer.getFrameBuffer() );
				this.gl.bindFramebuffer( this.gl.DRAW_FRAMEBUFFER, cameraComponent.renderTarget.uiBuffer.getFrameBuffer() );

				const size = cameraComponent.renderTarget.forwardBuffer.size;

				this.gl.blitFramebuffer(
					0, 0, size.x, size.y,
					0, 0, size.x, size.y,
					this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );

			}

			// ui

			this.gl.enable( this.gl.BLEND );

			this.renderCamera( "forward", cameraEntity, stack.ui, cameraComponent.renderTarget.uiBuffer, {
				cameraOverride: {
					uniforms: { uDeferredTexture: { value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ], type: '1i' } }
				},
				disableClear: true
			} );

			this.gl.disable( this.gl.BLEND );

			// postprocess

			const postProcess = cameraEntity.getComponentEnabled<MXP.PostProcess>( 'postProcess' );

			if ( postProcess ) {

				this.renderPostProcess( postProcess, { cameraOverride: {
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
					0, 0, this.canvasSize.x, this.canvasSize.y,
					0, 0, this.canvasSize.x, this.canvasSize.y,
					this.gl.COLOR_BUFFER_BIT, this.gl.NEAREST );


			}

		}

	}

	public renderCamera( renderType: MXP.MaterialRenderType, cameraEntity: MXP.Entity, entities: MXP.Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, renderOption?: RenderOption ) {

		const camera = cameraEntity.getComponent<MXP.Camera>( "camera" ) || cameraEntity.getComponent<MXP.Light>( "light" )!;

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

				this.gl.viewport( 0, 0, this.canvasSize.x, this.canvasSize.y );

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
			const material = entity.getComponent<MXP.Material>( "material" )!;
			const geometry = entity.getComponent<MXP.Geometry>( "geometry" )!;

			drawParam.modelMatrixWorld = entity.matrixWorld;
			drawParam.modelMatrixWorldPrev = entity.matrixWorldPrev;

			this.draw( entity.uuid.toString(), renderType, geometry, material, drawParam );

		}

		this.emit( "drawPass", [ renderTarget, "camera/" + renderType ] );


	}

	private collectLight( lightEntity: MXP.Entity ) {

		const lightComponent = lightEntity.getComponent<MXP.Light>( 'light' )!;
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

		return lightComponent.renderTarget != null;

	}

	public renderPostProcess( postprocess: MXP.PostProcess, renderOption?: RenderOption ) {

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

					this.gl.viewport( 0, 0, this.canvasSize.x, this.canvasSize.y );

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

			this.draw( postprocess.uuid.toString(), "postprocess", this.quad, pass, renderOption && renderOption.cameraOverride );

			pass.onAfterRender();

			if ( ! pass.passThrough && pass.renderTarget ) {

				backbuffers = pass.renderTarget.textures;

			}

			this.emit( "drawPass", [ pass.renderTarget, pass.name ] );

		}

	}

	private draw( drawId: string, renderType: MXP.MaterialRenderType, geometry: MXP.Geometry, material: MXP.Material, param?: DrawParam ) {

		TextureUnitCounter = 0;

		// status

		for ( let i = 0; i < this.glState.length; i ++ ) {

			const item = this.glState[ i ];
			const newState = ( material as any )[ item.key ];

			if ( item.state != newState ) {

				item.state = newState;
				item.state ? this.gl.enable( item.command ) : this.gl.disable( item.command );

			}

		}

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

			const geometryNeedsUpdate = geometry.needsUpdate.get( vao );

			if ( geometryNeedsUpdate === undefined || geometryNeedsUpdate === true ) {

				geometry.createBuffer( this.gl );

				geometry.attributes.forEach( ( attr, key ) => {

					if ( attr.buffer === undefined ) return;

					if ( key == 'index' ) {

						vao.setIndex( attr.buffer );

					} else {

						vao.setAttribute( key, attr.buffer, attr.size, attr.opt );

					}

				} );

				geometry.needsUpdate.set( vao, false );

			}

			// draw

			program.use( ( program ) => {

				program.uploadUniforms();

				this.gl.bindVertexArray( vao.getVAO() );

				// query ------------------------

				// let query: WebGLQuery | null = null;

				// if ( process.env.NODE_ENV == 'development' && this.power.extDisJointTimerQuery && gpuState ) {

				// 	query = this.queryList.pop() || null;

				// 	if ( query == null ) {

				// 		query = this.gl.createQuery();

				// 	}

				// 	if ( query ) {

				// 		this.gl.beginQuery( this.power.extDisJointTimerQuery.TIME_ELAPSED_EXT, query );

				// 	}

				// }

				// -----------------------------

				const indexBuffer = vao.indexBuffer;

				let indexBufferArrayType: number = this.gl.UNSIGNED_SHORT;

				if ( indexBuffer && indexBuffer.array && indexBuffer.array.BYTES_PER_ELEMENT == 4 ) {

					indexBufferArrayType = this.gl.UNSIGNED_INT;

				}

				const drawType = getDrawType( material.drawType );

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

				// query ------------------------

				// if ( process.env.NODE_ENV == 'development' && gpuState ) {

				// 	if ( query ) {

				// 		this.gl.endQuery( this.power.extDisJointTimerQuery.TIME_ELAPSED_EXT );

				// 		this.queryListQueued.push( {
				// 			name: `${renderType}/${material.name}[${drawId}]`,
				// 			query: query
				// 		} );

				// 	}

				// }

				// ----------------------------

				this.gl.bindVertexArray( null );

			} );

		}

	}

	public resize( resolution: GLP.Vector ) {

		this.canvasSize.copy( resolution );

		this.deferredPostProcess.resize( resolution );

	}

}

export const setUniforms = ( program: GLP.GLPowerProgram, uniforms: GLP.Uniforms ) => {

	const keys = Object.keys( uniforms );

	for ( let i = 0; i < keys.length; i ++ ) {

		const name = keys[ i ];
		const uni = uniforms[ name ];
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
