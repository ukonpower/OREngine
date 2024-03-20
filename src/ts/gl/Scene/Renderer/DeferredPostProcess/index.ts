import * as GLP from 'glpower';
import * as MXP from 'maxpower';
import { RenderCameraTarget } from 'packages/maxpower/Component/Camera/RenderCamera';

import { gaussWeights } from '../../utils/Math';

import deferredShadingFrag from './shaders/deferredShading.fs';
import lightShaftFrag from './shaders/lightShaft.fs';
import ssaoFrag from './shaders/ssao.fs';
import ssaoBlurFrag from './shaders/ssaoBlur.fs';


import { gl, power, globalUniforms } from '~/ts/Globals/';

const ssaoKernel = ( kernelSize: number ) => {

	const kernel = [];
	for ( let i = 0; i < kernelSize; i ++ ) {

		const sample = new GLP.Vector();
		sample.x = Math.random() * 2.0 - 1.0;
		sample.y = Math.random() * 2.0 - 1.0;
		sample.z = i / kernelSize * 0.95 + 0.05;
		sample.normalize();

		sample.multiply( i / kernelSize * 0.95 + 0.05 );

		kernel.push( ...sample.getElm( "vec3" ) );

	}

	return kernel;

};

type DeferredRendererParams = {
	envMap: GLP.GLPowerTexture;
	envMapCube?: GLP.GLPowerTextureCube
}

export class DeferredRenderer extends MXP.PostProcess {

	// light shaft

	private lightShaft: MXP.PostProcessPass;
	public rtLightShaft1: GLP.GLPowerFrameBuffer;
	public rtLightShaft2: GLP.GLPowerFrameBuffer;

	// ssao

	private ssao: MXP.PostProcessPass;
	public rtSSAO1: GLP.GLPowerFrameBuffer;
	public rtSSAO2: GLP.GLPowerFrameBuffer;

	private ssaoBlur: MXP.PostProcessPass;

	// shading

	private shading: MXP.PostProcessPass;

	constructor( params: DeferredRendererParams ) {

		// light shaft

		const rtLightShaft1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const rtLightShaft2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const lightShaft = new MXP.PostProcessPass( {
			name: 'lightShaft',
			frag: lightShaftFrag,
			renderTarget: rtLightShaft1,
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uLightShaftBackBuffer: {
					value: rtLightShaft2.textures[ 0 ],
					type: '1i'
				},
				uDepthTexture: {
					value: null,
					type: '1i'
				},
			} ),
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		// ssao

		const rtSSAO1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const rtSSAO2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const ssao = new MXP.PostProcessPass( {
			name: 'ssao',
			frag: ssaoFrag,
			renderTarget: MXP.hotGet( "ssao", rtSSAO1 ),
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uSSAOBackBuffer: {
					value: rtSSAO2.textures[ 0 ],
					type: '1i'
				},
				uSSAOKernel: {
					value: ssaoKernel( 16 ),
					type: "3fv"
				}
			} ),
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssao.fs", ( module ) => {

				if ( module ) {

					ssao.frag = MXP.hotUpdate( 'ssao', module.default );

				}

				ssao.requestUpdate();

			} );

		}

		const ssaoBlurUni = GLP.UniformsUtils.merge( globalUniforms.time, {
			uSSAOTexture: {
				value: rtSSAO2.textures[ 0 ],
				type: '1i'
			},
			uDepthTexture: {
				value: null,
				type: '1i'
			},
			uNormalTexture: {
				value: null,
				type: '1i'
			},
			uWeights: {
				type: '1fv',
				value: gaussWeights( 16 )
			},
		} );

		const ssaoBlurH = new MXP.PostProcessPass( {
			name: 'ssaoBlur/h',
			frag: MXP.hotGet( "ssaoBlur", ssaoBlurFrag ),
			uniforms: ssaoBlurUni,
			resolutionRatio: 1.0,
			passThrough: true,
		} );

		const ssaoBlurV = new MXP.PostProcessPass( {
			name: 'ssaoBlur/v',
			frag: MXP.hotGet( "ssaoBlur", ssaoBlurFrag ),
			uniforms: GLP.UniformsUtils.merge( ssaoBlurUni, {
				uSSAOTexture: {
					value: ssaoBlurH.renderTarget!.textures[ 0 ],
					type: '1i'
				},
			} ),
			defines: {
				IS_VIRT: ''
			},
			resolutionRatio: 1.0,
			passThrough: true,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssaoBlur.fs", ( module ) => {

				if ( module ) {

					ssaoBlurH.frag = ssaoBlurV.frag = MXP.hotUpdate( 'ssaoBlur', module.default );

				}

				ssaoBlurH.requestUpdate();
				ssaoBlurV.requestUpdate();

			} );

		}

		// shading

		const shading = new MXP.PostProcessPass( {
			name: "deferredShading",
			frag: MXP.hotGet( "deferredShading", deferredShadingFrag ),
			uniforms: GLP.UniformsUtils.merge( {
				uLightShaftTexture: {
					value: null,
					type: '1i'
				},
				uSSAOTexture: {
					value: ssaoBlurV.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uSSAOResolutionInv: {
					value: ssao.resolutionInv,
					type: '2fv'
				},
				// uEnvMap: globalUniforms.tex.uEnvTex,
				uEnvMap: {
					value: params.envMap,
					type: '1i'
				},
				// uEnvMapCube: {
				// 	value: params.envMapCube,
				// 	type: '1i'
				// },
				uTime: globalUniforms.time.uTime,
			} ),
		} );

		super( { passes: [
			lightShaft,
			ssao,
			ssaoBlurH,
			ssaoBlurV,
			shading,
		] } );

		this.shading = shading;
		this.lightShaft = lightShaft;
		this.ssao = ssao;

		this.rtSSAO1 = rtSSAO1;
		this.rtSSAO2 = rtSSAO2;

		this.ssaoBlur = ssaoBlurH;

		this.rtLightShaft1 = rtLightShaft1;
		this.rtLightShaft2 = rtLightShaft2;

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/deferredShading.fs", ( module ) => {

				if ( module ) {

					shading.frag = MXP.hotUpdate( 'deferredShading', module.default );

				}

				shading.requestUpdate();

			} );

		}

	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		// light shaft swap

		let tmp = this.rtLightShaft1;
		this.rtLightShaft1 = this.rtLightShaft2;
		this.rtLightShaft2 = tmp;

		this.lightShaft.setRendertarget( this.rtLightShaft1 );
		this.shading.uniforms.uLightShaftTexture.value = this.rtLightShaft1.textures[ 0 ];
		this.lightShaft.uniforms.uLightShaftBackBuffer.value = this.rtLightShaft2.textures[ 0 ];

		// ssao swap

		tmp = this.rtSSAO1;
		this.rtSSAO1 = this.rtSSAO2;
		this.rtSSAO2 = tmp;

		this.ssao.setRendertarget( this.rtSSAO1 );
		this.ssaoBlur.uniforms.uSSAOTexture.value = this.rtSSAO1.textures[ 0 ];
		this.ssao.uniforms.uSSAOBackBuffer.value = this.rtSSAO2.textures[ 0 ];

	}

	public setRenderTarget( renderTarget: RenderCameraTarget ) {

		for ( let i = 0; i < renderTarget.gBuffer.textures.length; i ++ ) {

			const tex = renderTarget.gBuffer.textures[ i ];

			this.shading.uniforms[ "sampler" + i ] = this.ssao.uniforms[ "sampler" + i ] = {
				type: '1i',
				value: tex
			};

		}

		this.ssaoBlur.uniforms.uDepthTexture.value = renderTarget.gBuffer.textures[ 0 ];
		this.ssaoBlur.uniforms.uNormalTexture.value = renderTarget.gBuffer.textures[ 1 ];

		this.lightShaft.uniforms.uDepthTexture.value = renderTarget.gBuffer.depthTexture;

		this.shading.renderTarget = renderTarget.shadingBuffer;

	}

}
