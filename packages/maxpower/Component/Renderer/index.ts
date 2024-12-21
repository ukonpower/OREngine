import * as GLP from 'glpower';

import { Geometry } from '../..//Geometry';
import { PlaneGeometry } from '../..//Geometry/PlaneGeometry';
import { MaterialRenderType, Material } from '../..//Material';
import { Entity, EntityUpdateEvent } from '../../Entity';
import { shaderParse } from "../../Utils/ShaderParser";
import { Camera } from '../Camera';
import { RenderCamera } from '../Camera/RenderCamera';
import { Light, LightType } from '../Light';
import { MaterialOverride } from '../MaterialOverride';
import { Mesh } from '../Mesh';
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

type DrawParam = CameraOverride & { modelMatrixWorld?: GLP.Matrix, modelMatrixWorldPrev?: GLP.Matrix, label?: string, renderTarget?:GLP.GLPowerFrameBuffer | null }

// state

type GPUState = {
	[key: string] : {state: boolean},
}

// texture unit

export let TextureUnitCounter = 0;

export class Renderer extends Entity {

	public gl: WebGL2RenderingContext;
	public resolution: GLP.Vector;
	private _extDisJointTimerQuery: any;

	// compile

	public noDraw: boolean;
	public drawParams: any[];

	// program

	public programManager: ProgramManager;

	// lights

	private _lights: CollectedLights;
	private _lightsUpdated: boolean;

	// envmap

	private _envMapCameras: EnvMapCamera[];
	private _envMapRenderTarget: GLP.GLPowerFrameBufferCube;
	private _pmremRender: PMREMRender;

	// postprocess

	private _deferredRenderer: DeferredRenderer;
	private _pipelinePostProcess: PipelinePostProcess;

	// quad

	private _quad: Geometry;

	// gpu state

	private _glStateCahce: GPUState;

	// render query

	private _queryList: WebGLQuery[];
	private _queryListQueued: {name: string, query: WebGLQuery}[];

	// tmp

	private _tmpNormalMatrix: GLP.Matrix;
	private _tmpModelViewMatrix: GLP.Matrix;
	private _tmpLightDirection: GLP.Vector;
	private _tmpModelMatrixInverse: GLP.Matrix;
	private _tmpProjectionMatrixInverse: GLP.Matrix;

	constructor( gl: WebGL2RenderingContext ) {

		super( { name: "Renderer" } );

		this.gl = gl;

		this.noDraw = false;
		this.drawParams = [];
		this.programManager = new ProgramManager( this.gl );
		this.resolution = new GLP.Vector();
		this._extDisJointTimerQuery = this.gl.getExtension( "EXT_disjoint_timer_query_webgl2" );

		// lights

		this._lights = {
			directional: [],
			spot: [],
		};

		this._lightsUpdated = false;

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

		// gpu

		this._glStateCahce = {};

		// query

		this._queryList = [];
		this._queryListQueued = [];

		// tmp

		this._tmpLightDirection = new GLP.Vector();
		this._tmpModelMatrixInverse = new GLP.Matrix();
		this._tmpProjectionMatrixInverse = new GLP.Matrix();
		this._tmpModelViewMatrix = new GLP.Matrix();
		this._tmpNormalMatrix = new GLP.Matrix();

		this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

	}

	public render( event: EntityUpdateEvent, stack: RenderStack ) {

		if ( process.env.NODE_ENV == 'development' ) {

			const disjoint = this.gl.getParameter( this._extDisJointTimerQuery.GPU_DISJOINT_EXT );

			if ( disjoint ) {

				this._queryList.forEach( q => this.gl.deleteQuery( q ) );

				this._queryList.length = 0;

			} else {

				const updatedList = [];

				if ( this._queryListQueued.length > 0 ) {

					const l = this._queryListQueued.length;

					for ( let i = l - 1; i >= 0; i -- ) {

						const q = this._queryListQueued[ i ];

						const resultAvailable = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT_AVAILABLE );

						if ( resultAvailable ) {

							const result = this.gl.getQueryParameter( q.query, this.gl.QUERY_RESULT );

							updatedList.push( {
								name: q.name,
								duration: result / 1000 / 1000
							} );

							this._queryList.push( q.query );

							this._queryListQueued.splice( i, 1 );

						}

					}

				}

				this.emit( "timer", [ updatedList ] );

			}

		}

		// light

		const shadowMapLightList: Entity[] = [];
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

				this.collectLight( lightEntity, lightComponent );

				if ( lightComponent.castShadow && lightComponent.renderTarget ) {

					shadowMapLightList.push( lightEntity );

				}

			}

		}

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

			const lightEntity = shadowMapLightList[ i ];
			const lightComponent = lightEntity.getComponent( Light )!;

			if ( lightComponent.renderTarget ) {

				this.renderCamera( "shadowMap", lightEntity, stack.shadowMap, lightComponent.renderTarget, this.resolution );

			}

		}

		// envmap

		for ( let i = 0; i < this._envMapCameras.length; i ++ ) {

			const { entity: cameraEntity } = this._envMapCameras[ i ];

			this._envMapRenderTarget.face( i );

			this.renderCamera( "envMap", cameraEntity, stack.envMap, this._envMapRenderTarget, this.resolution );

		}

		this.renderPostProcess( this._pmremRender.postprocess, this._pmremRender.resolution );

		this._pmremRender.swap();

		for ( let i = 0; i < stack.camera.length; i ++ ) {

			const cameraEntity = stack.camera[ i ];
			const cameraComponent = cameraEntity.getComponent( RenderCamera )!;

			// deferred

			this.gl.disable( this.gl.BLEND );

			if ( ! cameraComponent.renderTarget ) continue;

			this.renderCamera( "deferred", cameraEntity, stack.deferred, cameraComponent.renderTarget.gBuffer, this.resolution );

			this._deferredRenderer.setRenderCamera( cameraComponent );

			this.renderPostProcess( this._deferredRenderer.postprocess, this.resolution, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				viewMatrixPrev: cameraComponent.viewMatrixPrev,
				projectionMatrix: cameraComponent.projectionMatrix,
				projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
				cameraMatrixWorld: cameraEntity.matrixWorld
			} } );

			this._deferredRenderer.update( event );

			// forward

			this.gl.enable( this.gl.BLEND );

			this.renderCamera( "forward", cameraEntity, stack.forward, cameraComponent.renderTarget.forwardBuffer, this.resolution, {
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
						value: this._pmremRender.renderTarget.textures[ 0 ],
						type: '1i'
					}
				} },
				disableClear: true,
			} );

			this.gl.disable( this.gl.BLEND );

			// scene

			this._pipelinePostProcess.setRenderCamera( cameraComponent );

			this.renderPostProcess( this._pipelinePostProcess.postprocess, this.resolution, { cameraOverride: {
				viewMatrix: cameraComponent.viewMatrix,
				projectionMatrix: cameraComponent.projectionMatrix,
				cameraMatrixWorld: cameraEntity.matrixWorld,
				cameraNear: cameraComponent.near,
				cameraFar: cameraComponent.far,
			} } );

			this._pipelinePostProcess.update( event );

			let backBuffer = this._pipelinePostProcess.postprocess.output ? this._pipelinePostProcess.postprocess.output : null;

			// postprocess

			const postProcess = cameraEntity.getComponent( PostProcess );

			if ( postProcess && postProcess.enabled ) {

				postProcess.input = backBuffer ? backBuffer.textures : [];

				this.renderPostProcess( postProcess, this.resolution, { cameraOverride: {
					viewMatrix: cameraComponent.viewMatrix,
					projectionMatrix: cameraComponent.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					cameraNear: cameraComponent.near,
					cameraFar: cameraComponent.far,
				} } );

				backBuffer = postProcess.output;

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

			this.renderCamera( "forward", cameraEntity, stack.ui, cameraComponent.renderTarget.uiBuffer, this.resolution, {
				cameraOverride: {
					uniforms: { uDeferredTexture: { value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ], type: '1i' } }
				},
				disableClear: true
			} );

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

	}

	public renderCamera( renderType: MaterialRenderType, cameraEntity: Entity, entities: Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, canvasSize: GLP.Vector, renderOption?: RenderOption ) {

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

	private collectLight( lightEntity: Entity, lightComponent: Light ) {

		const type = lightComponent.lightType;

		const info: LightInfo = {
			position: new GLP.Vector( 0.0, 0.0, 0.0, 1.0 ).applyMatrix4( lightEntity.matrixWorld ),
			direction: new GLP.Vector( 0.0, 1.0, 0.0, 0.0 ).applyMatrix4( lightEntity.matrixWorld ).normalize(),
			color: new GLP.Vector( lightComponent.color.x, lightComponent.color.y, lightComponent.color.z ).multiply( lightComponent.intensity * Math.PI ),
			component: lightComponent,
		};

		if ( type == 'directional' ) {

			this._lights.directional.push( info );

		} else if ( type == 'spot' ) {

			this._lights.spot.push( info );

		}

		if ( lightComponent.castShadow && lightComponent.renderTarget == null ) {

			lightComponent.setShadowMap(
				new GLP.GLPowerFrameBuffer( this.gl ).setTexture( [ new GLP.GLPowerTexture( this.gl ).setting( { magFilter: this.gl.LINEAR, minFilter: this.gl.LINEAR } ) ] )
			);

		}

	}

	public renderPostProcess( postprocess: PostProcess, canvasSize?: GLP.Vector, renderOption?: RenderOption ) {

		// render

		let backbuffers: GLP.GLPowerTexture[] | undefined = postprocess.input;

		if ( ! postprocess.passes ) return;

		for ( let i = 0; i < postprocess.passes.length; i ++ ) {

			const pass = postprocess.passes[ i ];

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

		if ( this.noDraw ) {

			this.drawParams.push( { drawId, renderType, geometry, material, param: { ...param } } );

			return;

		}

		TextureUnitCounter = 0;

		// cull face

		let gpuStateType: number = this.gl.CULL_FACE;

		const cullStateCache = this._glStateCahce[ gpuStateType ];

		if ( cullStateCache === undefined || cullStateCache.state != material.cullFace ) {

			if ( material.cullFace ) {

				this.gl.enable( gpuStateType );

			} else {

				this.gl.disable( gpuStateType );

			}

		}

		// depth

		gpuStateType = this.gl.DEPTH_TEST;

		const depthStateCache = this._glStateCahce[ gpuStateType ];

		if ( depthStateCache === undefined || depthStateCache.state != material.depthTest ) {

			if ( material.depthTest ) {

				this.gl.enable( gpuStateType );

			} else {

				this.gl.disable( gpuStateType );

			}

		}

		this.gl.depthMask( material.depthWrite );

		// program

		let program = material.programCache[ renderType ];

		if ( ! program || this._lightsUpdated ) {

			const defines = { ...material.defines };

			if ( renderType == 'deferred' ) defines.IS_DEFERRED = "";
			else if ( renderType == 'forward' || renderType == 'envMap' ) defines.IS_FORWARD = "";
			else if ( renderType == 'shadowMap' ) defines.IS_DEPTH = "";

			const vert = shaderParse( material.vert, defines, this._lights );
			const frag = shaderParse( material.frag, defines, this._lights );

			program = this.programManager.get( vert, frag );

			material.programCache[ renderType ] = program;

		}

		if ( param ) {

			if ( param.modelMatrixWorld ) {

				program.setUniform( 'modelMatrix', 'Matrix4fv', param.modelMatrixWorld.elm );
				program.setUniform( 'modelMatrixInverse', 'Matrix4fv', this._tmpModelMatrixInverse.copy( param.modelMatrixWorld ).inverse().elm );

				if ( param.modelMatrixWorldPrev ) {

					program.setUniform( 'modelMatrixPrev', 'Matrix4fv', param.modelMatrixWorldPrev.elm );

				}

				if ( param.viewMatrix ) {

					this._tmpModelViewMatrix.copy( param.modelMatrixWorld ).preMultiply( param.viewMatrix );
					this._tmpNormalMatrix.copy( this._tmpModelViewMatrix );
					this._tmpNormalMatrix.inverse();
					this._tmpNormalMatrix.transpose();

					program.setUniform( 'normalMatrix', 'Matrix4fv', this._tmpNormalMatrix.elm );

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
				program.setUniform( 'projectionMatrixInverse', 'Matrix4fv', this._tmpProjectionMatrixInverse.copy( param.projectionMatrix ).inverse().elm );

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

			for ( let i = 0; i < this._lights.directional.length; i ++ ) {

				const dLight = this._lights.directional[ i ];

				program.setUniform( 'directionalLight[' + i + '].direction', '3fv', dLight.direction.getElm( 'vec3' ) );
				program.setUniform( 'directionalLight[' + i + '].color', '3fv', dLight.color.getElm( 'vec3' ) );

				if ( dLight.component.renderTarget ) {

					const texture = dLight.component.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					const dc = `directionalLightCamera[${i}]`;

					program.setUniform( dc + '.near', '1fv', [ dLight.component.near ] );
					program.setUniform( dc + '.far', '1fv', [ dLight.component.far ] );
					program.setUniform( dc + '.viewMatrix', 'Matrix4fv', dLight.component.viewMatrix.elm );
					program.setUniform( dc + '.projectionMatrix', 'Matrix4fv', dLight.component.projectionMatrix.elm );
					program.setUniform( dc + '.resolution', '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( 'directionalLightShadowMap[' + i + ']', '1i', [ texture.unit ] );

				}

			}

			for ( let i = 0; i < this._lights.spot.length; i ++ ) {

				const sLight = this._lights.spot[ i ];

				if ( param && param.viewMatrix ) {

					this._tmpLightDirection.copy( sLight.direction ).applyMatrix3( param.viewMatrix );

				}

				const sl = `spotLight[${i}]`;

				program.setUniform( sl + '.position', '3fv', sLight.position.getElm( 'vec3' ) );
				program.setUniform( sl + '.direction', '3fv', sLight.direction.getElm( 'vec3' ) );
				program.setUniform( sl + '.color', '3fv', sLight.color.getElm( 'vec3' ) );
				program.setUniform( sl + '.angle', '1fv', [ Math.cos( sLight.component.angle / 2 ) ] );
				program.setUniform( sl + '.blend', '1fv', [ sLight.component.blend ] );
				program.setUniform( sl + '.distance', '1fv', [ sLight.component.distance ] );
				program.setUniform( sl + '.decay', '1fv', [ sLight.component.decay ] );


				if ( sLight.component.renderTarget ) {

					const texture = sLight.component.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					const sc = `spotLightCamera[${i}]`;

					program.setUniform( sc + '.near', '1fv', [ sLight.component.near ] );
					program.setUniform( sc + '.far', '1fv', [ sLight.component.far ] );
					program.setUniform( sc + '.viewMatrix', 'Matrix4fv', sLight.component.viewMatrix.elm );
					program.setUniform( sc + '.projectionMatrix', 'Matrix4fv', sLight.component.projectionMatrix.elm );
					program.setUniform( sc + '.resolution', '2fv', texture.size.getElm( "vec2" ) );
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

				// query ------------------------

				let query: WebGLQuery | null = null;

				if ( process.env.NODE_ENV == 'development' ) {

					query = this._queryList.pop() || null;

					if ( query == null ) {

						query = this.gl.createQuery();

					}

					if ( query ) {

						this.gl.beginQuery( this._extDisJointTimerQuery.TIME_ELAPSED_EXT, query );

					}

				}

				// -----------------------------

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

				if ( process.env.NODE_ENV == 'development' ) {

					if ( query ) {

						this.gl.endQuery( this._extDisJointTimerQuery.TIME_ELAPSED_EXT );

						const label = param && param.label || "_";

						this._queryListQueued.push( {
							name: `${renderType}/${label}/ [${drawId}]`,
							query: query
						} );

					}

				}

				// ----------------------------

				this.gl.bindVertexArray( null );

			} );

		}

	}

	public resize( resolution: GLP.Vector ) {

		this.resolution.copy( resolution );
		this._deferredRenderer.resize( resolution );
		this._pipelinePostProcess.resize( resolution );

	}

	public async compile( cb: ( label: string, loaded: number, total: number ) => void ) {

		const total = this.drawParams.length;
		let loaded = 0;

		for ( let i = 0; i < this.drawParams.length; i ++ ) {

			const param = this.drawParams[ i ];

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
