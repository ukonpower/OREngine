import { UniformType } from "basepower";
import { Matrix, Vector } from "mathpower";

import { GLPowerTexture } from "../GLPowerTexture";
import { GLPowerVAO } from "../GLPowerVAO";


export type Uniformable = boolean | number | Vector | Matrix | GLPowerTexture;

export type Uniform = {
	location: WebGLUniformLocation | null;
	value: ( number | boolean )[];
	type: string;
	cache?: ( number | boolean )[];
	needsUpdate?: boolean
}

export type ShaderOptions = {
	transformFeedbackVaryings?: string[]
}

export const shaderErrors: Map<string, string> = new Map();

export class GLPowerProgram {

	public gl: WebGL2RenderingContext;
	public program: WebGLProgram | null;
	public name = '';

	private vao: Map<string, GLPowerVAO>;
	protected uniforms: Map<string, Uniform>;

	constructor( gl: WebGL2RenderingContext ) {

		this.gl = gl;

		this.program = this.gl.createProgram();

		this.vao = new Map();
		this.uniforms = new Map();

	}

	/*-------------------------------
		Shader
	-------------------------------*/

	public setShader( vertexShaderSrc: string, fragmentShaderSrc: string, opt?: ShaderOptions ) {

		if ( this.program === null ) {

			console.warn( 'program is null.' );

			return;

		}

		const vsResult = this.createShader( vertexShaderSrc, this.gl.VERTEX_SHADER );
		const fsResult = this.createShader( fragmentShaderSrc, this.gl.FRAGMENT_SHADER );

		// エラー集約: vertex/fragment 両方の結果を見てから shaderErrors に格納
		if ( this.name ) {

			const errors: string[] = [];

			if ( vsResult.error ) errors.push( '[VERTEX]\n' + vsResult.error );
			if ( fsResult.error ) errors.push( '[FRAGMENT]\n' + fsResult.error );

			if ( errors.length > 0 ) {

				shaderErrors.set( this.name, errors.join( '\n\n' ) );

			} else {

				shaderErrors.delete( this.name );

			}

		}

		if ( ! vsResult.shader || ! fsResult.shader ) return;

		this.gl.attachShader( this.program, vsResult.shader );
		this.gl.attachShader( this.program, fsResult.shader );

		if ( opt && opt.transformFeedbackVaryings ) {

			this.gl.transformFeedbackVaryings( this.program, opt.transformFeedbackVaryings, this.gl.SEPARATE_ATTRIBS );

		}

		this.gl.linkProgram( this.program );

		if ( ! this.gl.getProgramParameter( this.program, this.gl.LINK_STATUS ) ) {

			const linkError = this.gl.getProgramInfoLog( this.program );

			console.error( 'program link error:', linkError );

			if ( this.name && linkError ) {

				const existing = shaderErrors.get( this.name );
				shaderErrors.set( this.name, ( existing ? existing + '\n\n' : '' ) + '[LINK]\n' + linkError );

			}

		}

		return this;

	}

	protected createShader( shaderSrc: string, type: number ): { shader: WebGLShader | null; error: string | null } {

		const shader = this.gl.createShader( type );

		if ( ! shader ) {

			return { shader: null, error: null };

		}

		this.gl.shaderSource( shader, shaderSrc );
		this.gl.compileShader( shader );

		if ( this.gl.getShaderParameter( shader, this.gl.COMPILE_STATUS ) ) {

			return { shader, error: null };

		} else {

			const errorLog = this.gl.getShaderInfoLog( shader );

			if ( errorLog ) {

				if ( process.env.NODE_ENV == "development" ) {

					const splitShaderSrc = shaderSrc.split( '\n' );

					const lines = errorLog.matchAll( /ERROR: 0:(\d+)/g );

					Array.from( lines ).forEach( ( line, index ) => {

						const lineNum = Number( line[ 1 ] );

						const start = Math.max( 0, lineNum - 5 );
						const end = Math.min( splitShaderSrc.length, lineNum + 2 );

						let error = errorLog.split( '\n' )[ index ] + '\n';

						splitShaderSrc.forEach( ( t, i ) => {

							if ( start <= i && i <= end ) {

								error += `${i + 1}: ${t}\n`;

							}

						} );

						console.error( error );

					} );

				}

			}

			return { shader: null, error: errorLog || 'Unknown shader error' };

		}

	}

	/*-------------------------------
		Uniforms
	-------------------------------*/

	public setUniform( name: string, type: UniformType, value: ( number | boolean )[] ) {

		const uniform = this.uniforms.get( name );

		if ( uniform ) {

			uniform.type = type;

			// 呼び出し側が配列を使い回せるよう、参照保持せず内部配列へコピーする
			const dst = uniform.value;
			dst.length = value.length;

			for ( let i = 0; i < value.length; i ++ ) {

				dst[ i ] = value[ i ];

			}

			if ( uniform.cache ) {

				if ( uniform.cache.length !== dst.length ) {

					uniform.needsUpdate = true;

				} else {

					for ( let i = 0; i < dst.length; i ++ ) {

						if ( uniform.cache[ i ] !== dst[ i ] ) {

							uniform.needsUpdate = true;
							break;

						}

					}

				}

			} else {

				uniform.needsUpdate = true;

			}

		} else {

			this.uniforms.set( name, {
				value: value.concat(),
				type: type,
				location: null,
				needsUpdate: true
			} );

			this.updateUniformLocations();

		}

	}

	private updateUniformLocations( force?: boolean ) {

		if ( ! this.program ) return;

		this.uniforms.forEach( ( uniform, key ) => {

			if ( uniform.location === null || force ) {

				uniform.location = this.gl.getUniformLocation( this.program!, key );

			}

		} );

	}

	public uploadUniforms() {

		this.uniforms.forEach( uniform => {

			if ( uniform.needsUpdate && uniform.location !== null ) {

				if ( /Matrix[2|3|4]fv/.test( uniform.type ) ) {

					( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, false, uniform.value );

				} else if ( /[1|2|3|4][f|i]$/.test( uniform.type ) ) {

					( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, ...uniform.value );

				} else {

					( this.gl as any )[ 'uniform' + uniform.type ]( uniform.location, uniform.value );

				}

				uniform.cache = uniform.value.concat();
				uniform.needsUpdate = false;

			}

		} );

	}

	/*-------------------------------
		VAO
	-------------------------------*/

	public getVAO( id: string = '_' ) {

		if ( ! this.program ) return null;

		let vao = this.vao.get( id );

		if ( vao ) return vao;

		vao = new GLPowerVAO( this.gl, this.program );

		this.vao.set( id, vao );

		return vao;

	}

	/*-------------------------------
		Draw??
	-------------------------------*/

	public use( cb?: ( program: GLPowerProgram ) => void ) {

		if ( ! this.program ) return;

		this.gl.useProgram( this.program );

		if ( cb ) {

			cb( this );

		}

		this.gl.useProgram( null );

	}

	public getProgram() {

		return this.program;

	}

	public dispose() {

		this.vao.forEach( vao => {

			vao.dispose();

		} );

		this.vao.clear();

		this.gl.deleteProgram( this.program );

	}

}
