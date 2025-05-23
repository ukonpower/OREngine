
import * as GLP from 'glpower';

import { PostProcessPassParam, PostProcessPass } from '../../PostProcess/PostProcessPass';
import { UniformsUtils } from '../../Utils/Uniforms';

import quadVert from './shaders/quad.vs';

export interface GPUComputePassParam extends Omit<PostProcessPassParam, 'renderTarget'>{
	size: GLP.Vector,
	dataLayerCount: number,
	textureParam?: Partial<GLP.GLPowerTextureSetting>
}

export class GPUComputePass extends PostProcessPass {

	private gl: WebGL2RenderingContext;

	public readonly size: GLP.Vector;
	public readonly layerCnt: number;

	public clearColor: GLP.Vector | null;

	public rt1: GLP.GLPowerFrameBuffer;
	public rt2: GLP.GLPowerFrameBuffer;

	public outputUniforms: GLP.Uniforms;

	constructor( gl: WebGL2RenderingContext, param: GPUComputePassParam ) {

		const textureSetting = Object.assign( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA, magFilter: gl.NEAREST, minFilter: gl.NEAREST }, param.textureParam );

		const rt1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( new Array( param.dataLayerCount ).fill( 0 ).map( () => new GLP.GLPowerTexture( gl ).setting( textureSetting ) ) ).setSize( param.size );
		const rt2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( new Array( param.dataLayerCount ).fill( 0 ).map( () => new GLP.GLPowerTexture( gl ).setting( textureSetting ) ) ).setSize( param.size );

		const outputUniforms: GLP.Uniforms = {
			uGPUResolution: {
				value: param.size,
				type: "2fv"
			}
		};

		for ( let i = 0; i < param.dataLayerCount; i ++ ) {

			outputUniforms[ 'uGPUSampler' + i ] = {
				value: rt2.textures[ i ],
				type: '1i'
			};

		}

		super( gl, { ...param, vert: param.vert || quadVert, renderTarget: rt1, uniforms: UniformsUtils.merge( param.uniforms, outputUniforms, {
			uDeltaTime: {
				value: 0.0,
				type: '1f'
			}
		} ) } );

		this.gl = gl;

		this.size = param.size;
		this.layerCnt = param.dataLayerCount;

		this.rt1 = rt1;
		this.rt2 = rt2;

		this.renderTarget = this.rt1;
		this.clearColor = param.clearColor ?? null;

		this.outputUniforms = outputUniforms;

	}

	public onAfterRender(): void {

		super.onAfterRender();

		for ( let i = 0; i < this.layerCnt; i ++ ) {

			this.outputUniforms[ 'uGPUSampler' + i ].value = this.renderTarget!.textures[ i ];

		}

		const tmp = this.rt1;
		this.rt1 = this.rt2;
		this.rt2 = tmp;
		this.renderTarget = this.rt1;

	}

	public initTexture( cb:( layerCnt:number, x: number, y: number ) => number[] ) {

		for ( let i = 0; i < this.layerCnt; i ++ ) {

			this.gl.bindTexture( this.gl.TEXTURE_2D, this.rt2.textures[ i ].getTexture() );

			const array = [];

			for ( let j = 0; j < this.size.y; j ++ ) {

				for ( let k = 0; k < this.size.x; k ++ ) {

					const x = k;
					const y = j;

					array.push( ...cb( i, x, y ) );

				}

			}

			this.gl.texSubImage2D( this.gl.TEXTURE_2D, 0, 0, 0, this.size.x, this.size.y, this.gl.RGBA, this.gl.FLOAT, new Float32Array( array ) );

		}

		this.gl.bindTexture( this.gl.TEXTURE_2D, null );

	}

}
