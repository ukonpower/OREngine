import { EventEmitter } from 'basepower';
import * as GLP from 'glpower';
import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { sssKernel } from '../../../core/utils/SSSKernel';
import { GL, GLBackend } from '../../backend/GLBackend';

import deferredShadingFrag from './shaders/deferredShading.fs';
import lightShaftFrag from './shaders/lightShaft.fs';
import normalSelectorFrag from './shaders/normalSelector.fs';
import ssaoFrag from './shaders/ssao.fs';
import ssaoBlurFrag from './shaders/ssaoBlur.fs';
import sssFrag from './shaders/sss.fs';


const ssaoKernel = ( kernelSize: number ) => {

	const kernel = [];
	for ( let i = 0; i < kernelSize; i ++ ) {

		const sample = new MTP.Vector();
		sample.x = Math.random() * 2.0 - 1.0;
		sample.y = Math.random() * 2.0 - 1.0;
		sample.z = i / kernelSize * 0.95 + 0.05;
		sample.normalize();

		sample.multiply( i / kernelSize * 0.95 + 0.05 );

		kernel.push( ...sample.getElm( "vec3" ) );

	}

	return kernel;

};

type Params = {
	backend: GLBackend;
	envMap: GLP.GLPowerTexture;
	envMapCube?: GLP.GLPowerTextureCube;
	// 描画元の G-Buffer。ビュー固有なので生成時に一度だけ繋ぐ
	renderTarget: MXP.RenderCameraTarget;
}

export type DeferredRendererPassConfig = {
	ssao?: boolean;
	lightShaft?: boolean;
	sss?: boolean;
};

// SSS のカーネルの片側のサンプル数（中心を含む）。両側で 17 タップになり、SeparableSSS の既定と同じ
const SSS_SAMPLES = 9;

export class DeferredRenderer extends EventEmitter {

	// renderer postprocess

	public postprocess: MXP.PostProcess;

	// nromal buffer

	public normalSelector_: MXP.PostProcessPass;

	// light shaft

	public lightShaft: MXP.PostProcessPass;
	public rtLightShaft1: GLP.GLPowerFrameBuffer;
	public rtLightShaft2: GLP.GLPowerFrameBuffer;

	// ssao

	public ssao: MXP.PostProcessPass;
	public rtSSAO1: GLP.GLPowerFrameBuffer;
	public rtSSAO2: GLP.GLPowerFrameBuffer;

	public ssaoBlur: MXP.PostProcessPass;
	public ssaoBlurV: MXP.PostProcessPass;

	// shading

	public shading: MXP.PostProcessPass;

	// sss

	public sssH: MXP.PostProcessPass;
	public sssV: MXP.PostProcessPass;
	public sssCopy: MXP.PostProcessPass;

	constructor( params: Params ) {

		super();

		const backend = params.backend;
		const renderTarget = params.renderTarget;

		// normal buffer

		const normalSelector = new MXP.PostProcessPass( backend, {
			name: 'normalSelector',
			frag: normalSelectorFrag,
			renderTarget: null,
			uniforms: MXP.UniformsUtils.merge( {
				uNormalTexture: {
					value: null,
					type: '1i'
				},
				uPosTexture: {
					value: null,
					type: '1i'
				},
				uSelectorTexture: {
					value: null,
					type: '1i'
				},
			} ),
			passThrough: true,
		} );

		// light shaft

		const rtLightShaft1 = backend.createFrameBuffer().setTexture( [
			backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
		] );

		const rtLightShaft2 = backend.createFrameBuffer().setTexture( [
			backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
		] );

		const lightShaft = new MXP.PostProcessPass( backend, {
			name: 'lightShaft',
			frag: lightShaftFrag,
			renderTarget: rtLightShaft1,
			uniforms: MXP.UniformsUtils.merge( {
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

		const rtSSAO1 = backend.createFrameBuffer().setTexture( [
			backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
		] );

		const rtSSAO2 = backend.createFrameBuffer().setTexture( [
			backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
		] );

		const ssao = new MXP.PostProcessPass( backend, {
			name: 'ssao',
			frag: ssaoFrag,
			renderTarget: MXP.hotGet( "ssao", rtSSAO1 ),
			uniforms: MXP.UniformsUtils.merge( {
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

		const SSAOSAMPLE = 8;

		const ssaoBlurUni = MXP.UniformsUtils.merge( {
			uSSAOTexture: {
				value: rtSSAO2.textures[ 0 ],
				type: '1i'
			},
			uPosTexture: {
				value: null,
				type: '1i'
			},
			uNormalTexture: {
				value: null,
				type: '1i'
			},
			uWeights: {
				type: '1fv',
				value: MTP.MathUtils.gaussWeights( SSAOSAMPLE )
			},
		} );

		const ssaoBlurH = new MXP.PostProcessPass( backend, {
			name: 'ssaoBlur/h',
			frag: MXP.hotGet( "ssaoBlur", ssaoBlurFrag ),
			uniforms: ssaoBlurUni,
			resolutionRatio: 1.0,
			passThrough: true,
			defines: {
				SSAOSAMPLE
			}
		} );

		const ssaoBlurV = new MXP.PostProcessPass( backend, {
			name: 'ssaoBlur/v',
			frag: MXP.hotGet( "ssaoBlur", ssaoBlurFrag ),
			uniforms: MXP.UniformsUtils.merge( ssaoBlurUni, {
				uSSAOTexture: {
					value: ssaoBlurH.renderTarget!.textures[ 0 ],
					type: '1i'
				},
			} ),
			defines: {
				SSAOSAMPLE,
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

		const shading = new MXP.PostProcessPass( backend, {
			name: "deferredShading",
			frag: MXP.hotGet( "deferredShading", deferredShadingFrag ),
			uniforms: MXP.UniformsUtils.merge( {
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
				uEnvMap: {
					value: params.envMap,
					type: '1i'
				},
			} ),
		} );

		// sss（shading が2枚目に出した diffuse だけをぼかし、1枚目の diffuse と置き換える）

		const sssTarget = () => backend.createFrameBuffer( { disableDepthBuffer: true } ).setTexture( [
			backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA, magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
		] );

		const sssUni = MXP.UniformsUtils.merge( {
			uDiffuseTexture: {
				value: renderTarget.shadingBuffer.textures[ 1 ],
				type: '1i'
			},
			uAlbedoTexture: {
				value: renderTarget.gBuffer.textures[ 2 ],
				type: '1i'
			},
			uPosTexture: {
				value: renderTarget.gBuffer.textures[ 0 ],
				type: '1i'
			},
			uNormalTexture: {
				value: renderTarget.normalBuffer.textures[ 0 ],
				type: '1i'
			},
			uSSSRadius: {
				value: 0.05,
				type: '1f'
			},
			uKernel: {
				value: sssKernel( SSS_SAMPLES ),
				type: '4fv'
			},
		} );

		const sssH = new MXP.PostProcessPass( backend, {
			name: 'sss/h',
			frag: MXP.hotGet( "sss", sssFrag ),
			uniforms: sssUni,
			renderTarget: sssTarget(),
			passThrough: true,
			defines: {
				SSS_SAMPLES
			}
		} );

		// 入力と出力が同じ shadingBuffer[0] にならないよう、縦は別の描画先に出してから写し戻す
		const sssV = new MXP.PostProcessPass( backend, {
			name: 'sss/v',
			frag: MXP.hotGet( "sss", sssFrag ),
			uniforms: MXP.UniformsUtils.merge( sssUni, {
				uDiffuseTexture: {
					value: sssH.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uShadingTexture: {
					value: renderTarget.shadingBuffer.textures[ 0 ],
					type: '1i'
				},
				uShadingDiffuseTexture: {
					value: renderTarget.shadingBuffer.textures[ 1 ],
					type: '1i'
				},
			} ),
			renderTarget: sssTarget(),
			defines: {
				SSS_SAMPLES,
				IS_VIRT: ''
			},
		} );

		// forward がこの上に重ねるので、結果は shadingBuffer[0] に置く
		const sssCopy = new MXP.PostProcessPass( backend, {
			name: 'sss/copy',
			renderTarget: backend.createFrameBuffer( { disableDepthBuffer: true } ).setTexture( [
				renderTarget.shadingBuffer.textures[ 0 ],
			] ),
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/sss.fs", ( module ) => {

				if ( module ) {

					sssH.frag = sssV.frag = MXP.hotUpdate( 'sss', module.default );

				}

				sssH.requestUpdate();
				sssV.requestUpdate();

			} );

		}

		this.postprocess = new MXP.PostProcess( { passes: [
			normalSelector,
			lightShaft,
			ssao,
			ssaoBlurH,
			ssaoBlurV,
			shading,
			sssH,
			sssV,
			sssCopy,
		] } );

		this.shading = shading;
		this.lightShaft = lightShaft;
		this.ssao = ssao;

		this.rtSSAO1 = rtSSAO1;
		this.rtSSAO2 = rtSSAO2;

		this.ssaoBlur = ssaoBlurH;
		this.ssaoBlurV = ssaoBlurV;

		this.sssH = sssH;
		this.sssV = sssV;
		this.sssCopy = sssCopy;

		this.rtLightShaft1 = rtLightShaft1;
		this.rtLightShaft2 = rtLightShaft2;

		this.normalSelector_ = normalSelector;

		for ( let i = 0; i < renderTarget.gBuffer.textures.length; i ++ ) {

			let tex = renderTarget.gBuffer.textures[ i ];

			if ( i === 1 ) {

				tex = renderTarget.normalBuffer.textures[ 0 ];

			}

			shading.uniforms[ "sampler" + i ] = ssao.uniforms[ "sampler" + i ] = {
				type: '1i',
				value: tex
			};

		}

		lightShaft.uniforms.uDepthTexture.value = renderTarget.gBuffer.depthTexture;
		shading.renderTarget = renderTarget.shadingBuffer;

		normalSelector.renderTarget = renderTarget.normalBuffer;
		normalSelector.uniforms.uNormalTexture.value = renderTarget.gBuffer.textures[ 1 ];
		normalSelector.uniforms.uPosTexture.value = renderTarget.gBuffer.textures[ 0 ];
		normalSelector.uniforms.uSelectorTexture.value = renderTarget.gBuffer.textures[ 3 ];

		ssaoBlurUni.uPosTexture.value = renderTarget.gBuffer.textures[ 0 ];
		ssaoBlurUni.uNormalTexture.value = renderTarget.normalBuffer.textures[ 0 ];

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/deferredShading.fs", ( module ) => {

				if ( module ) {

					shading.frag = MXP.hotUpdate( 'deferredShading', module.default );

				}

				shading.requestUpdate();

			} );

		}

	}

	// 描画後に呼び、LightShaft / SSAO の履歴を進める
	public update(): void {

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

	public setPassEnabled( config: DeferredRendererPassConfig ): void {

		if ( config.ssao !== undefined ) {

			this.ssao.enabled = config.ssao;
			this.ssaoBlur.enabled = config.ssao;
			this.ssaoBlurV.enabled = config.ssao;

			if ( ! config.ssao ) {

				this.rtSSAO1.clear();
				this.rtSSAO2.clear();
				if ( this.ssaoBlur.renderTarget ) this.ssaoBlur.renderTarget.clear();
				if ( this.ssaoBlurV.renderTarget ) this.ssaoBlurV.renderTarget.clear();

			}

		}

		if ( config.sss !== undefined ) {

			this.sssH.enabled = config.sss;
			this.sssV.enabled = config.sss;
			this.sssCopy.enabled = config.sss;

		}

		if ( config.lightShaft !== undefined ) {

			this.lightShaft.enabled = config.lightShaft;

			if ( ! config.lightShaft ) {

				this.rtLightShaft1.clear();
				this.rtLightShaft2.clear();

			}

		}

	}

	// SSS の散乱半径（ワールド単位）を設定する。uniform は縦横のパスで共有している
	public setSSSRadius( radius: number ): void {

		this.sssH.uniforms.uSSSRadius.value = radius;

	}

	public resize( resolution: MTP.Vector ) {

		this.postprocess.resize( resolution );

	}

	public dispose() {

		this.postprocess.dispose();
		this.rtLightShaft1.dispose();
		this.rtLightShaft2.dispose();
		this.rtSSAO1.dispose();
		this.rtSSAO2.dispose();

		for ( const pass of [ this.sssH, this.sssV ] ) {

			pass.renderTarget!.textures[ 0 ].dispose();
			pass.renderTarget!.dispose();

		}

		// sssCopy の描画先は shadingBuffer のテクスチャを借りているので、FBO だけ捨てる
		this.sssCopy.renderTarget!.dispose();

	}

}
