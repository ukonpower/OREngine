
import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { UniformsUtils } from '../../../core/utils/Uniforms';
import { GL, GLBackend } from '../../GLBackend';
import { PostProcessPassParam, PostProcessPass } from '../../PostProcess/PostProcessPass';

import quadVert from './shaders/quad.vs';


export interface GPUComputePassParam extends Omit<PostProcessPassParam, 'renderTarget'>{
	size: MTP.Vector,
	dataLayerCount: number,
	textureParam?: Partial<GLP.GLPowerTextureSetting>
}

export class GPUComputePass extends PostProcessPass {

	public readonly size: MTP.Vector;
	public readonly layerCnt: number;

	public clearColor: MTP.Vector | null;

	public rt1: GLP.GLPowerFrameBuffer;
	public rt2: GLP.GLPowerFrameBuffer;

	public outputUniforms: MTP.Uniforms;

	constructor( backend: GLBackend, param: GPUComputePassParam ) {

		const textureSetting = Object.assign( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA, magFilter: GL.NEAREST, minFilter: GL.NEAREST }, param.textureParam );

		const rt1 = backend.createFrameBuffer().setTexture( new Array( param.dataLayerCount ).fill( 0 ).map( () => backend.createTexture().setting( textureSetting ) ) ).setSize( param.size );
		const rt2 = backend.createFrameBuffer().setTexture( new Array( param.dataLayerCount ).fill( 0 ).map( () => backend.createTexture().setting( textureSetting ) ) ).setSize( param.size );

		const outputUniforms: MTP.Uniforms = {
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

		super( backend, { ...param, vert: param.vert || quadVert, renderTarget: rt1, uniforms: UniformsUtils.merge( param.uniforms, outputUniforms, {
			uDeltaTime: {
				value: 0.0,
				type: '1f'
			}
		} ) } );

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

			const array = [];

			for ( let j = 0; j < this.size.y; j ++ ) {

				for ( let k = 0; k < this.size.x; k ++ ) {

					const x = k;
					const y = j;

					array.push( ...cb( i, x, y ) );

				}

			}

			this.rt2.textures[ i ].subImage( new Float32Array( array ), this.size.x, this.size.y );

		}

	}

}
