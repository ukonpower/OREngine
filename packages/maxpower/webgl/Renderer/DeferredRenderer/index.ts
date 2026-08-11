import * as BSP from 'basepower';
import { EventEmitter } from 'basepower';
import * as GLP from 'glpower';
import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { GL, GLBackend } from '../../GLBackend';

import deferredShadingFrag from './shaders/deferredShading.fs';
import lightShaftFrag from './shaders/lightShaft.fs';
import normalSelectorFrag from './shaders/normalSelector.fs';
import ssaoFrag from './shaders/ssao.fs';
import ssaoBlurFrag from './shaders/ssaoBlur.fs';


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
	envMapCube?: GLP.GLPowerTextureCube
}

export type DeferredRendererPassConfig = {
	ssao?: boolean;
	lightShaft?: boolean;
};

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
	private ssaoBlurUni: BSP.Uniforms;

	// shading

	public shading: MXP.PostProcessPass;

	constructor( params: Params ) {

		super();

		const backend = params.backend;

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

		this.postprocess = new MXP.PostProcess( { passes: [
			normalSelector,
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
		this.ssaoBlurV = ssaoBlurV;
		this.ssaoBlurUni = ssaoBlurUni;

		this.rtLightShaft1 = rtLightShaft1;
		this.rtLightShaft2 = rtLightShaft2;

		this.normalSelector_ = normalSelector;

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/deferredShading.fs", ( module ) => {

				if ( module ) {

					shading.frag = MXP.hotUpdate( 'deferredShading', module.default );

				}

				shading.requestUpdate();

			} );

		}

	}

	public update( _event: MXP.EntityUpdateEvent ): void {

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

		if ( config.lightShaft !== undefined ) {

			this.lightShaft.enabled = config.lightShaft;

			if ( ! config.lightShaft ) {

				this.rtLightShaft1.clear();
				this.rtLightShaft2.clear();

			}

		}

	}

	public setRenderCamera( _camera: MXP.Camera, renderTarget: MXP.RenderCameraTarget ) {

		for ( let i = 0; i < renderTarget.gBuffer.textures.length; i ++ ) {

			let tex = renderTarget.gBuffer.textures[ i ];

			if ( i === 1 ) {

				tex = renderTarget.normalBuffer.textures[ 0 ];

			}

			this.shading.uniforms[ "sampler" + i ] = this.ssao.uniforms[ "sampler" + i ] = {
				type: '1i',
				value: tex
			};

		}

		this.ssaoBlur.uniforms.uDepthTexture.value = renderTarget.gBuffer.textures[ 0 ];
		this.lightShaft.uniforms.uDepthTexture.value = renderTarget.gBuffer.depthTexture;
		this.shading.renderTarget = renderTarget.shadingBuffer;

		this.normalSelector_.renderTarget = renderTarget.normalBuffer;
		this.normalSelector_.uniforms.uNormalTexture.value = renderTarget.gBuffer.textures[ 1 ];
		this.normalSelector_.uniforms.uPosTexture.value = renderTarget.gBuffer.textures[ 0 ];
		this.normalSelector_.uniforms.uSelectorTexture.value = renderTarget.gBuffer.textures[ 3 ];

		this.ssaoBlurUni.uNormalTexture.value = renderTarget.normalBuffer.textures[ 0 ];

	}

	public resize( resolution: MTP.Vector ) {

		this.postprocess.resize( resolution );

	}

}
