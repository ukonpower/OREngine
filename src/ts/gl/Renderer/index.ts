import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { gl, gpuState, power } from "~/ts/Globals";
import { ProgramManager } from "./ProgramManager";
import { shaderParse } from "./ShaderParser";
import { DeferredPostProcess } from './DeferredPostProcess';
import { RenderCamera } from '~/ts/libs/maxpower/Component/Camera/RenderCamera';

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

type LightInfo = {
	position: GLP.Vector;
	direction: GLP.Vector;
	color: GLP.Vector;
	component: MXP.Light;
}

export type CollectedLights = {[K in MXP.LightType]: LightInfo[]}

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

type GPUState = {
	key: string,
	command: number,
	state: boolean,
}[]

export let textureUnit = 0;

export class Renderer extends MXP.Entity {


	private canvasSize: GLP.Vector;

	// program

	private programManager: ProgramManager;

	// lights

	private lights: CollectedLights;
	private lightsUpdated: boolean;

	// deferred

	private deferredPostProcess: DeferredPostProcess;

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

	constructor( ) {

		super();

		this.programManager = new ProgramManager( gl );
		this.canvasSize = new GLP.Vector();

		// lights

		this.lights = {
			directional: [],
			spot: [],
		};

		this.lightsUpdated = false;

		// deferred

		this.deferredPostProcess = new DeferredPostProcess();
		this.addComponent( "deferredPostProcess", this.deferredPostProcess );

		// quad

		this.quad = new MXP.PlaneGeometry( 2.0, 2.0 );

		// gpu

		this.glState = [
			{
				key: "cullFace",
				command: gl.CULL_FACE,
				state: false
			},
			{
				key: "depthTest",
				command: gl.DEPTH_TEST,
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

		gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

	}

	public render( stack: RenderStack ) {

		if ( process.env.NODE_ENV == 'development' && power.extDisJointTimerQuery && gpuState ) {

			const disjoint = gl.getParameter( power.extDisJointTimerQuery.GPU_DISJOINT_EXT );

			if ( disjoint ) {

				this.queryList.forEach( q => gl.deleteQuery( q ) );

				this.queryList.length = 0;

			} else {

				if ( this.queryListQueued.length > 0 ) {

					const l = this.queryListQueued.length;

					for ( let i = l - 1; i >= 0; i -- ) {

						const q = this.queryListQueued[ i ];

						const resultAvailable = gl.getQueryParameter( q.query, gl.QUERY_RESULT_AVAILABLE );

						if ( resultAvailable ) {

							const result = gl.getQueryParameter( q.query, gl.QUERY_RESULT );

							this.queryList.push( q.query );

							this.queryListQueued.splice( i, 1 );

							if ( gpuState ) {

								gpuState.setRenderTime( q.name, result / 1000 / 1000 );

							}

						}

					}

				}

			}

		}

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

		for ( let i = 0; i < stack.camera.length; i ++ ) {

			const cameraEntity = stack.camera[ i ];
			const cameraComponent = cameraEntity.getComponent<RenderCamera>( 'camera' )!;

			// deferred

			gl.disable( gl.BLEND );

			this.renderCamera( "deferred", cameraEntity, stack.deferred, cameraComponent.renderTarget.gBuffer );

			this.deferredPostProcess.setRenderTarget( cameraComponent.renderTarget );

			this.renderPostProcess( this.deferredPostProcess, {
				viewMatrix: cameraComponent.viewMatrix,
				viewMatrixPrev: cameraComponent.viewMatrixPrev,
				projectionMatrix: cameraComponent.projectionMatrix,
				projectionMatrixPrev: cameraComponent.projectionMatrixPrev,
				cameraMatrixWorld: cameraEntity.matrixWorld
			} );

			// forward

			gl.enable( gl.BLEND );

			this.renderCamera( "forward", cameraEntity, stack.forward, cameraComponent.renderTarget.forwardBuffer, { uniforms: { uDeferredTexture: { value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ], type: '1i' } } }, false );

			gl.disable( gl.BLEND );

			// scene

			const prePostprocess = cameraEntity.getComponent<MXP.PostProcess>( 'scenePostProcess' );

			if ( prePostprocess ) {

				this.renderPostProcess( prePostprocess, {
					viewMatrix: cameraComponent.viewMatrix,
					projectionMatrix: cameraComponent.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					cameraNear: cameraComponent.near,
					cameraFar: cameraComponent.far,
				} );

				if ( prePostprocess.output ) {

					gl.bindFramebuffer( gl.READ_FRAMEBUFFER, prePostprocess.output.getFrameBuffer() );
					gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, cameraComponent.renderTarget.uiBuffer.getFrameBuffer() );

					const size = prePostprocess.output.size;

					gl.blitFramebuffer(
						0, 0, size.x, size.y,
						0, 0, size.x, size.y,
						gl.COLOR_BUFFER_BIT, gl.NEAREST );

				}

			}

			// ui

			gl.enable( gl.BLEND );

			this.renderCamera( "forward", cameraEntity, stack.ui, cameraComponent.renderTarget.uiBuffer, { uniforms: { uDeferredTexture: { value: cameraComponent.renderTarget.shadingBuffer.textures[ 1 ], type: '1i' } } }, false );

			gl.disable( gl.BLEND );

			// postprocess

			const postProcess = cameraEntity.getComponent<MXP.PostProcess>( 'postProcess' );

			if ( postProcess ) {

				this.renderPostProcess( postProcess, {
					viewMatrix: cameraComponent.viewMatrix,
					projectionMatrix: cameraComponent.projectionMatrix,
					cameraMatrixWorld: cameraEntity.matrixWorld,
					cameraNear: cameraComponent.near,
					cameraFar: cameraComponent.far,
				} );

				// display out

				if ( cameraComponent.displayOut ) {

					if ( postProcess.output ) {

						gl.bindFramebuffer( gl.READ_FRAMEBUFFER, postProcess.output.getFrameBuffer() );
						gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, null );

						gl.blitFramebuffer(
							0, 0, this.canvasSize.x, this.canvasSize.y,
							0, 0, this.canvasSize.x, this.canvasSize.y,
							gl.COLOR_BUFFER_BIT, gl.NEAREST );

					}

				}

			}

		}

	}

	public renderCamera( renderType: MXP.MaterialRenderType, cameraEntity: MXP.Entity, entities: MXP.Entity[], renderTarget: GLP.GLPowerFrameBuffer | null, override?: CameraOverride, clear:boolean = true ) {

		const camera = cameraEntity.getComponent<MXP.Camera>( "camera" ) || cameraEntity.getComponent<MXP.Light>( "light" )!;

		const drawParam: DrawParam = {
			viewMatrix: camera.viewMatrix,
			viewMatrixPrev: camera.viewMatrixPrev,
			projectionMatrix: camera.projectionMatrix,
			projectionMatrixPrev: camera.projectionMatrixPrev,
			cameraMatrixWorld: cameraEntity.matrixWorld,
			cameraNear: camera.near,
			cameraFar: camera.far,
			...override
		};

		if ( renderTarget ) {

			gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );
			gl.bindFramebuffer( gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
			gl.drawBuffers( renderTarget.textureAttachmentList );

		} else {

			gl.viewport( 0, 0, this.canvasSize.x, this.canvasSize.y );
			gl.bindFramebuffer( gl.FRAMEBUFFER, null );

		}

		// clear

		if ( clear ) {

			if ( renderType == "shadowMap" ) {

				gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
				gl.clearDepth( 1.0 );


			} else {

				gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
				gl.clearDepth( 1.0 );

			}

			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

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

	public renderPostProcess( postprocess: MXP.PostProcess, matrix?: CameraOverride ) {

		// render

		let backbuffers: GLP.GLPowerTexture[] | null = postprocess.input;

		for ( let i = 0; i < postprocess.passes.length; i ++ ) {

			const pass = postprocess.passes[ i ];

			const renderTarget = pass.renderTarget;

			if ( renderTarget ) {

				gl.viewport( 0, 0, renderTarget.size.x, renderTarget.size.y );
				gl.bindFramebuffer( gl.FRAMEBUFFER, renderTarget.getFrameBuffer() );
				gl.drawBuffers( renderTarget.textureAttachmentList );

			} else {

				gl.viewport( 0, 0, this.canvasSize.x, this.canvasSize.y );
				gl.bindFramebuffer( gl.FRAMEBUFFER, null );

			}

			// clear

			let clear = 0;

			if ( pass.clearColor ) {

				gl.clearColor( pass.clearColor.x, pass.clearColor.y, pass.clearColor.z, pass.clearColor.w );
				clear |= gl.COLOR_BUFFER_BIT;

			}

			if ( pass.clearDepth !== null ) {

				gl.clearDepth( pass.clearDepth );
				clear |= gl.DEPTH_BUFFER_BIT;

			}

			if ( clear !== 0 ) {

				gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

			}

			if ( backbuffers ) {

				for ( let i = 0; i < backbuffers.length; i ++ ) {

					pass.uniforms[ 'backbuffer' + i ] = {
						type: '1i',
						value: backbuffers[ i ]
					};

				}

			}

			this.draw( postprocess.uuid.toString(), "postprocess", this.quad, pass, matrix );

			pass.onAfterRender();

			if ( ! pass.passThrough && pass.renderTarget ) {

				backbuffers = pass.renderTarget.textures;

			}

			this.emit( "drawPass", [ pass.renderTarget, pass.name ] );

		}

	}

	private draw( drawId: string, renderType: MXP.MaterialRenderType, geometry: MXP.Geometry, material: MXP.Material, param?: DrawParam ) {

		textureUnit = 0;

		// status

		for ( let i = 0; i < this.glState.length; i ++ ) {

			const item = this.glState[ i ];
			const newState = ( material as any )[ item.key ];

			if ( item.state != newState ) {

				item.state = newState;
				item.state ? gl.enable( item.command ) : gl.disable( item.command );

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

					const texture = dLight.component.renderTarget.textures[ 0 ].activate( textureUnit ++ );

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

					const texture = sLight.component.renderTarget.textures[ 0 ].activate( textureUnit ++ );

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

				geometry.createBuffer( power );

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

				gl.bindVertexArray( vao.getVAO() );

				// query ------------------------

				let query: WebGLQuery | null = null;

				if ( process.env.NODE_ENV == 'development' && power.extDisJointTimerQuery && gpuState ) {

					query = this.queryList.pop() || null;

					if ( query == null ) {

						query = gl.createQuery();

					}

					if ( query ) {

						gl.beginQuery( power.extDisJointTimerQuery.TIME_ELAPSED_EXT, query );

					}

				}

				// -----------------------------

				const indexBuffer = vao.indexBuffer;

				let indexBufferArrayType: number = gl.UNSIGNED_SHORT;

				if ( indexBuffer && indexBuffer.array && indexBuffer.array.BYTES_PER_ELEMENT == 4 ) {

					indexBufferArrayType = gl.UNSIGNED_INT;

				}

				if ( vao.instanceCount > 0 ) {

					if ( indexBuffer ) {

						gl.drawElementsInstanced( material.drawType, vao.indexCount, indexBufferArrayType, 0, vao.instanceCount );

					} else {

						gl.drawArraysInstanced( material.drawType, 0, vao.vertCount, vao.instanceCount );

					}

				} else {

					if ( indexBuffer ) {

						gl.drawElements( material.drawType, vao.indexCount, indexBufferArrayType, 0 );

					} else {

						gl.drawArrays( material.drawType, 0, vao.vertCount );

					}

				}

				// query ------------------------

				if ( process.env.NODE_ENV == 'development' && gpuState ) {

					if ( query ) {

						gl.endQuery( power.extDisJointTimerQuery.TIME_ELAPSED_EXT );

						this.queryListQueued.push( {
							name: `${renderType}/${material.name}[${drawId}]`,
							query: query
						} );

					}

				}

				// ----------------------------

				gl.bindVertexArray( null );

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

				v.activate( textureUnit ++ );

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
