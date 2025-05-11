import * as GLP from 'glpower';

import { Geometry } from '../../../Geometry';
import { Material, MaterialRenderType } from '../../../Material';
import { shaderParse } from "../../../Utils/ShaderParser";
import { CollectedLights } from '../LightManager';
import { ProgramManager } from '../ProgramManager';

// texture unit
export let TextureUnitCounter = 0;

// draw param
export interface CameraParam {
	viewMatrix?: GLP.Matrix;
	viewMatrixPrev?: GLP.Matrix;
	projectionMatrix?: GLP.Matrix;
	projectionMatrixPrev?: GLP.Matrix;
	cameraMatrixWorld?: GLP.Matrix;
	cameraNear?: number,
	cameraFar?:number,
}

export interface DrawParam extends CameraParam {
	label?: string;
	modelMatrixWorld?: GLP.Matrix;
	modelMatrixWorldPrev?: GLP.Matrix;
	renderTarget?: GLP.GLPowerFrameBuffer | null;
	uniformOverride?: GLP.Uniforms,
}

// gpu state
type GPUState = {
	[key: string] : {state: boolean},
}

export class DrawManager {

	private gl: WebGL2RenderingContext;
	public programManager: ProgramManager;

	// gpu state
	private glStateCahce: GPUState;

	// tmp
	private tmpNormalMatrix: GLP.Matrix;
	private tmpModelViewMatrix: GLP.Matrix;
	private tmpViewMatrixInverseMatrix: GLP.Matrix;
	private tmpLightDirection: GLP.Vector;
	private tmpModelMatrixInverse: GLP.Matrix;
	private tmpProjectionMatrixInverse: GLP.Matrix;

	// render query
	private queryList: WebGLQuery[];
	private queryListQueued: {name: string, query: WebGLQuery}[];
	private extDisJointTimerQuery: any;

	// no draw mode
	public noDraw: boolean;
	public drawParams: any[];

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;
		this.programManager = new ProgramManager( this.gl );
		this.glStateCahce = {};

		// tmp
		this.tmpLightDirection = new GLP.Vector();
		this.tmpModelMatrixInverse = new GLP.Matrix();
		this.tmpViewMatrixInverseMatrix = new GLP.Matrix();
		this.tmpProjectionMatrixInverse = new GLP.Matrix();
		this.tmpModelViewMatrix = new GLP.Matrix();
		this.tmpNormalMatrix = new GLP.Matrix();

		// query
		this.queryList = [];
		this.queryListQueued = [];
		this.extDisJointTimerQuery = this.gl.getExtension( "EXT_disjoint_timer_query_webgl2" );

		// no draw
		this.noDraw = false;
		this.drawParams = [];

	}

	public draw( drawId: string, renderType: MaterialRenderType, geometry: Geometry, material: Material, lights: CollectedLights, param?: DrawParam ) {

		if ( this.noDraw ) {

			this.drawParams.push( { drawId, renderType, geometry, material, param: { ...param } } );
			return;

		}

		TextureUnitCounter = 0;

		// cull face
		let gpuStateType: number = this.gl.CULL_FACE;
		const cullStateCache = this.glStateCahce[ gpuStateType ];

		if ( cullStateCache === undefined || cullStateCache.state != material.cullFace ) {

			if ( material.cullFace ) {

				this.gl.enable( gpuStateType );

			} else {

				this.gl.disable( gpuStateType );

			}

		}

		// depth
		gpuStateType = this.gl.DEPTH_TEST;
		const depthStateCache = this.glStateCahce[ gpuStateType ];

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

		if ( ! program || material.programCache.needsUpdate ) {

			const defines = { ...material.defines };

			if ( renderType == 'deferred' ) defines.IS_DEFERRED = "";
			else if ( renderType == 'forward' || renderType == 'envMap' ) defines.IS_FORWARD = "";
			else if ( renderType == 'shadowMap' ) defines.IS_DEPTH = "";

			const vert = shaderParse( material.vert, defines, lights );
			const frag = shaderParse( material.frag, defines, lights );

			program = this.programManager.get( vert, frag );

			material.programCache[ renderType ] = program;

		}

		if ( param ) {

			// modelMatrix
			if ( param.modelMatrixWorld ) {

				program.setUniform( 'uModelMatrix', 'Matrix4fv', param.modelMatrixWorld.elm );
				program.setUniform( 'uModelMatrixInverse', 'Matrix4fv', this.tmpModelMatrixInverse.copy( param.modelMatrixWorld ).inverse().elm );

				if ( param.modelMatrixWorldPrev ) {

					program.setUniform( 'uModelMatrixPrev', 'Matrix4fv', param.modelMatrixWorldPrev.elm );

				}

				if ( param.viewMatrix ) {

					this.tmpModelViewMatrix.copy( param.modelMatrixWorld ).preMultiply( param.viewMatrix );
					this.tmpNormalMatrix.copy( this.tmpModelViewMatrix );
					this.tmpNormalMatrix.inverse();
					this.tmpNormalMatrix.transpose();

					program.setUniform( 'uNormalMatrix', 'Matrix4fv', this.tmpNormalMatrix.elm );
					program.setUniform( 'uViewMatrixInverse', 'Matrix4fv', this.tmpViewMatrixInverseMatrix.copy( param.viewMatrix ).inverse().elm );

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
				program.setUniform( 'uProjectionMatrixInverse', 'Matrix4fv', this.tmpProjectionMatrixInverse.copy( param.projectionMatrix ).inverse().elm );

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

			for ( let i = 0; i < lights.directional.length; i ++ ) {

				const dLight = lights.directional[ i ];

				program.setUniform( 'directionalLight[' + i + '].direction', '3fv', dLight.direction.getElm( 'vec3' ) );
				program.setUniform( 'directionalLight[' + i + '].color', '3fv', dLight.color.getElm( 'vec3' ) );

				if ( dLight.component.renderTarget ) {

					const texture = dLight.component.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					const dc = `uDirectionalLightCamera[${i}]`;

					program.setUniform( dc + '.near', '1fv', [ dLight.component.near ] );
					program.setUniform( dc + '.far', '1fv', [ dLight.component.far ] );
					program.setUniform( dc + '.viewMatrix', 'Matrix4fv', dLight.component.viewMatrix.elm );
					program.setUniform( dc + '.projectionMatrix', 'Matrix4fv', dLight.component.projectionMatrix.elm );
					program.setUniform( dc + '.resolution', '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( 'directionalLightShadowMap[' + i + ']', '1i', [ texture.unit ] );

				}

			}

			for ( let i = 0; i < lights.spot.length; i ++ ) {

				const sLight = lights.spot[ i ];

				if ( param && param.viewMatrix ) {

					this.tmpLightDirection.copy( sLight.direction ).applyMatrix3( param.viewMatrix );

				}

				const sl = `uSpotLight[${i}]`;

				program.setUniform( sl + '.position', '3fv', sLight.position.getElm( 'vec3' ) );
				program.setUniform( sl + '.direction', '3fv', sLight.direction.getElm( 'vec3' ) );
				program.setUniform( sl + '.color', '3fv', sLight.color.getElm( 'vec3' ) );
				program.setUniform( sl + '.angle', '1fv', [ Math.cos( sLight.component.angle / 2 ) ] );
				program.setUniform( sl + '.blend', '1fv', [ sLight.component.blend ] );
				program.setUniform( sl + '.distance', '1fv', [ sLight.component.distance ] );
				program.setUniform( sl + '.decay', '1fv', [ sLight.component.decay ] );

				if ( sLight.component.renderTarget ) {

					const texture = sLight.component.renderTarget.textures[ 0 ].activate( TextureUnitCounter ++ );

					const sc = `uSpotLightCamera[${i}]`;

					program.setUniform( sc + '.near', '1fv', [ sLight.component.near ] );
					program.setUniform( sc + '.far', '1fv', [ sLight.component.far ] );
					program.setUniform( sc + '.viewMatrix', 'Matrix4fv', sLight.component.viewMatrix.elm );
					program.setUniform( sc + '.projectionMatrix', 'Matrix4fv', sLight.component.projectionMatrix.elm );
					program.setUniform( sc + '.resolution', '2fv', texture.size.getElm( "vec2" ) );
					program.setUniform( 'spotLightShadowMap[' + i + ']', '1i', [ texture.unit ] );

				}

			}

		}

		this.setUniforms( program, { ...material.uniforms, ...( param && param.uniformOverride ) } );

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

				if ( import.meta.env.DEV ) {

					query = this.queryList.pop() || null;

					if ( query == null ) {

						query = this.gl.createQuery();

					}

					if ( query ) {

						this.gl.beginQuery( this.extDisJointTimerQuery.TIME_ELAPSED_EXT, query );

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
				if ( import.meta.env.DEV ) {

					if ( query ) {

						this.gl.endQuery( this.extDisJointTimerQuery.TIME_ELAPSED_EXT );

						const label = param && param.label || "_";

						this.queryListQueued.push( {
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

	public setUniforms( program: GLP.GLPowerProgram, uniforms: GLP.Uniforms ) {

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

	}

	public processQueries( onTimer: ( updatedList: any[] ) => void ) {

		if ( import.meta.env.DEV ) {

			const disjoint = this.gl.getParameter( this.extDisJointTimerQuery.GPU_DISJOINT_EXT );

			if ( disjoint ) {

				this.queryList.forEach( q => this.gl.deleteQuery( q ) );
				this.queryList.length = 0;

			} else {

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

				if ( updatedList.length > 0 ) {

					onTimer( updatedList );

				}

			}

		}

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

			const defaultLights: CollectedLights = {
				directional: [],
				spot: []
			};

			this.draw( param.drawId, param.renderType, param.geometry, param.material, defaultLights, param.param );

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
