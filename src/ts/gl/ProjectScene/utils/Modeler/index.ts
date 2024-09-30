import * as GLP from 'glpower';
import * as MXP from 'maxpower';


type BakeAttribute = {
	[key: string]: {size: number, type: Float32ArrayConstructor | Uint16ArrayConstructor | Uint8ArrayConstructor}
}

export class Modeler {

	private power: GLP.Power;
	private gl: WebGL2RenderingContext;
	private tf: GLP.GLPowerTransformFeedback;

	constructor( power: GLP.Power ) {

		this.power = power;
		this.gl = this.power.gl;
		this.tf = new GLP.GLPowerTransformFeedback( this.power.gl );

	}

	public bakeTf( baseGeometry: MXP.Geometry, vertexShader: string, uniforms?: any, defines?: any ) {

		const resultGeo = new MXP.Geometry();

		const program = new GLP.GLPowerProgram( this.gl );
		const tf = new GLP.GLPowerTransformFeedback( this.gl );

		let instanceCount = 1;

		baseGeometry.attributes.forEach( attr => {

			if ( attr.opt && attr.opt.instanceDivisor ) {

				instanceCount = attr.array.length / attr.size;

			}

		} );

		const outBufferPosition = new GLP.GLPowerBuffer( this.gl );
		outBufferPosition.setData( new Float32Array( ( baseGeometry.attributes.get( 'position' )?.array.length || 0 ) * instanceCount ), 'vbo', this.gl.DYNAMIC_COPY );

		const outBufferNormal = new GLP.GLPowerBuffer( this.gl );
		outBufferNormal.setData( new Float32Array( ( baseGeometry.attributes.get( 'normal' )?.array.length || 0 ) * instanceCount ), 'vbo', this.gl.DYNAMIC_COPY );

		tf.setBuffer( "position", outBufferPosition, 0 );
		tf.setBuffer( "normal", outBufferNormal, 1 );

		tf.bind( () => {

			program.setShader( MXP.shaderParse( vertexShader, { ...defines, "TF_MODELER": "" } ), "#version 300 es\n void main(){ discard; }", { transformFeedbackVaryings: [ 'o_position', 'o_normal' ] } );

		} );

		const vao = program.getVAO();

		if ( vao ) {

			baseGeometry.createBuffers( this.gl );

			baseGeometry.attributes.forEach( ( attr, key ) => {

				if ( attr.buffer ) {

					vao.setAttribute( key, attr.buffer, attr.size, attr.opt );

				}

			} );

			if ( uniforms ) {

				MXP.setUniforms( program, uniforms );

			}

			program.use( () => {

				program.uploadUniforms();

				tf.use( () => {

					this.gl.beginTransformFeedback( this.gl.POINTS );
					this.gl.enable( this.gl.RASTERIZER_DISCARD );

					vao.use( () => {

						if ( vao.instanceCount > 0 ) {

							this.gl.drawArraysInstanced( this.gl.POINTS, 0, vao.vertCount, vao.instanceCount );

						} else {

							this.gl.drawArrays( this.gl.POINTS, 0, vao.vertCount );

						}

					} );

					this.gl.disable( this.gl.RASTERIZER_DISCARD );
					this.gl.endTransformFeedback();

				} );


				const outPos = new Float32Array( outBufferPosition.array!.length );
				const outNormal = new Float32Array( outBufferNormal.array!.length );

				this.gl.bindBuffer( this.gl.ARRAY_BUFFER, outBufferPosition.buffer );
				this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, outPos );

				this.gl.bindBuffer( this.gl.ARRAY_BUFFER, outBufferNormal.buffer );
				this.gl.getBufferSubData( this.gl.ARRAY_BUFFER, 0, outNormal );

				resultGeo.setAttribute( 'position', outPos, 3 );
				resultGeo.setAttribute( 'normal', outNormal, 3 );

			} );

		}

		const indexArray: number[] = [];

		const baseIndex = baseGeometry.getAttribute( 'index' );

		let TypedArray: Uint16ArrayConstructor | Uint32ArrayConstructor = Uint16Array;

		if ( baseIndex ) {

			for ( let i = 0; i < instanceCount; i ++ ) {

				for ( let j = 0; j < baseIndex.array.length; j ++ ) {

					const index = baseIndex.array[ j ] + i * ( baseGeometry.vertCount );
					indexArray.push( baseIndex.array[ j ] + i * ( baseGeometry.vertCount ) );

					if ( index > 65535 ) {

						TypedArray = Uint32Array;

					}

				}

			}

		}

		resultGeo.setAttribute( 'index', new ( TypedArray )( indexArray ), 1 );

		return resultGeo;

	}


	public bakeEntity( entity: MXP.Entity, attrs?: BakeAttribute ) {

		const resultGeo = new MXP.Geometry();
		const posArray: number[] = [];
		const normalArray : number[] = [];
		const tangentArray : number[] = [];
		const indexArray: number[] = [];

		const customAttributes: BakeAttribute = {
			uv: { size: 2, type: Float32Array },
			...attrs,
		};

		const bakedAttributes: {[key: string]: number[]} = {};

		const _ = ( e: MXP.Entity, matrix: GLP.Matrix ) => {

			let geo = e.getComponentByTag<MXP.Geometry>( "geometry" );

			if ( geo ) {

				const mat = e.getComponentByTag<MXP.Material>( "material" );

				if ( mat ) {

					geo = this.bakeTf( geo, mat.vert, mat.uniforms, { ...mat.defines } );

				}


				const currentIndex = posArray.length / 3;

				const pos = geo.getAttribute( 'position' );

				if ( pos ) {

					for ( let i = 0; i < pos.array.length; i += 3 ) {

						const p = new GLP.Vector( pos.array[ i + 0 ], pos.array[ i + 1 ], pos.array[ i + 2 ], 1 );
						p.applyMatrix4( matrix );
						posArray.push( p.x, p.y, p.z );

					}

				}

				const normal = geo.getAttribute( 'normal' );

				if ( normal ) {

					for ( let i = 0; i < normal.array.length; i += 3 ) {

						const p = new GLP.Vector( normal.array[ i + 0 ], normal.array[ i + 1 ], normal.array[ i + 2 ], 0 );
						p.applyMatrix4( matrix );
						normalArray.push( p.x, p.y, p.z );

					}

				}

				const tangent = geo.getAttribute( 'tangent' );

				if ( tangent ) {

					for ( let i = 0; i < tangent.array.length; i += 4 ) {

						const w = tangent.array[ i + 3 ];
						const t = new GLP.Vector( tangent.array[ i + 0 ] * w, tangent.array[ i + 1 ] * w, tangent.array[ i + 2 ] * w, 0 );
						t.applyMatrix4( matrix );


						tangentArray.push( t.x, t.y, t.z, 1 );

					}

				} else {

					for ( let i = 0; i < geo.vertCount; i ++ ) {

						tangentArray.push( 0, 0, 0, 0 );

					}

				}

				const index = geo.getAttribute( 'index' );

				if ( index ) {

					for ( let i = 0; i < index.array.length; i ++ ) {

						indexArray.push( index.array[ i ] + currentIndex );

					}

				}

				// custom attributes

				const customAttributeKeys = Object.keys( customAttributes );

				for ( let i = 0; i < customAttributeKeys.length; i ++ ) {

					const attrName = customAttributeKeys[ i ];
					const attrInfo = customAttributes[ attrName ];
					const attr = geo.getAttribute( attrName );

					let attrArray = bakedAttributes[ attrName ];

					if ( ! attrArray ) {

						bakedAttributes[ attrName ] = attrArray = [];

					}

					if ( attr ) {

						for ( let j = 0; j < attr.array.length; j += attrInfo.size ) {

							const array = [ attr.array[ j + 0 ], attr.array[ j + 1 ], attr.array[ j + 2 ], attr.array[ j + 3 ] ];
							attrArray.push( ...array.slice( 0, attrInfo.size ) );

						}

					}

				}

			}

			e.children.forEach( c => {

				c.updateMatrix( );

				_( c, matrix.clone().multiply( c.matrix ) );

			} );

		};

		_( entity, new GLP.Matrix() );

		const attributeKeys = Object.keys( customAttributes );

		for ( let i = 0; i < attributeKeys.length; i ++ ) {

			const attrName = attributeKeys[ i ];
			const attrInfo = customAttributes[ attrName ];

			resultGeo.setAttribute( attrName, new attrInfo.type( bakedAttributes[ attrName ] ), attrInfo.size );

		}

		resultGeo.setAttribute( "position", new Float32Array( posArray ), 3 );
		resultGeo.setAttribute( "normal", new Float32Array( normalArray ), 3 );
		resultGeo.setAttribute( "tangent", new Float32Array( tangentArray ), 4 );
		resultGeo.setAttribute( "index", new Uint32Array( indexArray ), 1 );

		return resultGeo;

	}

}
