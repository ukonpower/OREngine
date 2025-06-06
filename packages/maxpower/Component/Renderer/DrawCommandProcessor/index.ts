import * as GLP from 'glpower';
import { Geometry } from '../../../Geometry';
import { MaterialRenderType, Material } from '../../../Material';
import { shaderParse } from "../../../Utils/ShaderParser";
import { CollectedLights } from '../LightManager';
import { ProgramManager } from '../ProgramManager';
import { GLStateManager } from '../GLStateManager';
import { RenderQueryManager } from '../RenderQueryManager';

export let TextureUnitCounter = 0;

interface CameraParam {
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

export class DrawCommandProcessor {

	private gl: WebGL2RenderingContext;
	private programManager: ProgramManager;
	private glStateManager: GLStateManager;
	private queryManager: RenderQueryManager;

	// tmp matrices
	private _tmpNormalMatrix: GLP.Matrix;
	private _tmpModelViewMatrix: GLP.Matrix;
	private _tmpViewMatrixInverseMatrix: GLP.Matrix;
	private _tmpLightDirection: GLP.Vector;
	private _tmpModelMatrixInverse: GLP.Matrix;
	private _tmpProjectionMatrixInverse: GLP.Matrix;

	constructor( 
		gl: WebGL2RenderingContext, 
		programManager: ProgramManager, 
		glStateManager: GLStateManager,
		queryManager: RenderQueryManager
	) {

		this.gl = gl;
		this.programManager = programManager;
		this.glStateManager = glStateManager;
		this.queryManager = queryManager;

		// tmp
		this._tmpLightDirection = new GLP.Vector();
		this._tmpModelMatrixInverse = new GLP.Matrix();
		this._tmpViewMatrixInverseMatrix = new GLP.Matrix();
		this._tmpProjectionMatrixInverse = new GLP.Matrix();
		this._tmpModelViewMatrix = new GLP.Matrix();
		this._tmpNormalMatrix = new GLP.Matrix();

	}

	public draw( 
		drawId: string, 
		renderType: MaterialRenderType, 
		geometry: Geometry, 
		material: Material, 
		lights: CollectedLights,
		lightsUpdated: boolean,
		param?: DrawParam 
	) {

		TextureUnitCounter = 0;

		// set material states
		this.glStateManager.setMaterialStates( material );

		// program
		let program = material.programCache[ renderType ];

		if ( ! program || lightsUpdated ) {

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

			this.setMatrixUniforms( program, param );

		}

		this.setLightUniforms( program, material, renderType, lights, param );

		this.setUniforms( program, { ...material.uniforms, ...( param && param.uniformOverride ) } );

		this.drawGeometry( program, geometry, material, drawId, renderType, param );

	}

	private setMatrixUniforms( program: GLP.GLPowerProgram, param: DrawParam ) {

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

		if ( param.cameraNear && param.cameraFar ) {

			program.setUniform( 'uCameraNear', '1f', [ param.cameraNear ] );
			program.setUniform( 'uCameraFar', '1f', [ param.cameraFar ] );

		}

	}

	private setLightUniforms( 
		program: GLP.GLPowerProgram, 
		material: Material, 
		renderType: MaterialRenderType, 
		lights: CollectedLights,
		param?: DrawParam 
	) {

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

					this._tmpLightDirection.copy( sLight.direction ).applyMatrix3( param.viewMatrix );

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

	}

	private setUniforms( program: GLP.GLPowerProgram, uniforms: GLP.Uniforms ) {

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

	private drawGeometry( 
		program: GLP.GLPowerProgram, 
		geometry: Geometry, 
		material: Material, 
		drawId: string, 
		renderType: MaterialRenderType, 
		param?: DrawParam 
	) {

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

				this.glStateManager.setBlendMode( material );

				const drawType = this.gl[ material.drawType ];

				// query
				const query = this.queryManager.beginQuery();

				// draw
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

				// end query
				const label = param && param.label || "_";
				this.queryManager.endQuery( query, `${renderType}/${label}/ [${drawId}]` );

				this.gl.bindVertexArray( null );

			} );

		}

	}

}
