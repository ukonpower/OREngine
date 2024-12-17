import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import colorCollectionFrag from './shaders/colorCollection.fs';
import dofBokehFrag from './shaders/dofBokeh.fs';
import dofCocFrag from './shaders/dofCoc.fs';
import dofCompositeFrag from './shaders/dofComposite.fs';
import motionBlurFrag from './shaders/motionBlur.fs';
import motionBlurNeighborFrag from './shaders/motionBlurNeighbor.fs';
import motionBlurTileFrag from './shaders/motionBlurTile.fs';
import ssCompositeFrag from './shaders/ssComposite.fs';
import ssrFrag from './shaders/ssr.fs';

export class PipelinePostProcess {

	public dofCoc: MXP.PostProcessPass;
	public dofBokeh: MXP.PostProcessPass;
	public dofComposite: MXP.PostProcessPass;
	public rtSSR1: GLP.GLPowerFrameBuffer;
	public rtSSR2: GLP.GLPowerFrameBuffer;
	public postprocess: MXP.PostProcess;

	private _timeUniforms: GLP.Uniforms;
	private _ssr: MXP.PostProcessPass;
	private _ssComposite: MXP.PostProcessPass;
	private _dofParams: GLP.Vector;
	private _motionBlur: MXP.PostProcessPass;
	private _motionBlurTile: MXP.PostProcessPass;
	private _renderCamera: MXP.RenderCamera | null;

	constructor( gl: WebGL2RenderingContext ) {

		// uniforms

		const timeUniforms: GLP.Uniforms = {
			uTimeEF: {
				value: 0,
				type: "1f"
			}
		};

		const colorCollection = new MXP.PostProcessPass( gl, {
			name: 'collection',
			frag: colorCollectionFrag,
		} );

		// ssr

		const rtSSR1 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const rtSSR2 = new GLP.GLPowerFrameBuffer( gl ).setTexture( [
			new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		const ssr = new MXP.PostProcessPass( gl, {
			name: 'ssr',
			frag: MXP.hotGet( "ssr", ssrFrag ),
			renderTarget: rtSSR1,
			uniforms: MXP.UniformsUtils.merge( timeUniforms, {
				uGbufferPos: {
					value: null,
					type: '1i'
				},
				uGbufferNormal: {
					value: null,
					type: '1i'
				},
				uSceneTex: {
					value: null,
					type: '1i'
				},
				uSSRBackBuffer: {
					value: rtSSR2.textures[ 0 ],
					type: '1i'
				},
			} ),
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssr.fs", ( module ) => {

				if ( module ) {

					this._ssr.frag = MXP.hotUpdate( 'ssr', module.default );

				}

				this._ssr.requestUpdate();

			} );

		}

		// ss-composite

		const ssComposite = new MXP.PostProcessPass( gl, {
			name: 'ssComposite',
			frag: MXP.hotGet( "ssComposite", ssCompositeFrag ),
			uniforms: MXP.UniformsUtils.merge( {
				uGbufferPos: {
					value: null,
					type: '1i'
				},
				uGbufferNormal: {
					value: null,
					type: '1i'
				},
				uSSRTexture: {
					value: rtSSR2.textures[ 0 ],
					type: '1i'
				},
			} ),
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssComposite.fs", ( module ) => {

				if ( module ) {

					this._ssComposite.frag = MXP.hotUpdate( 'ssComposite', module.default );

				}

				this._ssComposite.requestUpdate();

			} );

		}

		// dof

		const dofParams = new GLP.Vector( 10, 0.05, 20, 0.05 );

		const dofCoc = new MXP.PostProcessPass( gl, {
			name: 'dof/coc',
			frag: dofCocFrag,
			uniforms: MXP.UniformsUtils.merge( timeUniforms, {
				uGbufferPos: {
					value: null,
					type: "1i"
				},
				uParams: {
					value: dofParams,
					type: '4f'
				},
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR, internalFormat: gl.RGBA16F, type: gl.HALF_FLOAT, format: gl.RGBA } ),
			] ),
			passThrough: true,
			resolutionRatio: 0.5,
		} );

		const dofBokeh = new MXP.PostProcessPass( gl, {
			name: 'dof/bokeh',
			frag: dofBokehFrag,
			uniforms: MXP.UniformsUtils.merge( timeUniforms, {
				uCocTex: {
					value: dofCoc.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uParams: {
					value: dofParams,
					type: '4f'
				}
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
			] ),
			passThrough: true,
			resolutionRatio: 0.5,
		} );

		const dofComposite = new MXP.PostProcessPass( gl, {
			name: 'dof/composite',
			frag: dofCompositeFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uBokeTex: {
					value: dofBokeh.renderTarget!.textures[ 0 ],
					type: '1i'
				}
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR, internalFormat: gl.RGBA16F, type: gl.HALF_FLOAT, format: gl.RGBA } ),
			] )
		} );

		// motion blur

		const motionBlurTileNum = 16;

		const motionBlurTile = new MXP.PostProcessPass( gl, {
			name: 'motionBlurTile',
			frag: motionBlurTileFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uVelTex: {
					value: null,
					type: '1i'
				},
			} ),
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
			] ),
			defines: {
				"TILE": motionBlurTileNum,
			},
			resolutionRatio: 1 / motionBlurTileNum,
			passThrough: true,
		} );

		const motionBlurNeighbor = new MXP.PostProcessPass( gl, {
			name: 'motionBlurNeighbor',
			frag: motionBlurNeighborFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uVelTex: {
					value: motionBlurTile.renderTarget!.textures[ 0 ],
					type: '1i'
				}
			} ),
			defines: {
				"TILE": motionBlurTileNum,
			},
			renderTarget: new GLP.GLPowerFrameBuffer( gl ).setTexture( [
				new GLP.GLPowerTexture( gl ).setting( { type: gl.FLOAT, internalFormat: gl.RGBA32F, format: gl.RGBA } ),
			] ),
			resolutionRatio: 1 / motionBlurTileNum,
			passThrough: true,
		} );

		const motionBlur = new MXP.PostProcessPass( gl, {
			name: 'motionBlur',
			frag: motionBlurFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uVelNeighborTex: {
					value: motionBlurNeighbor.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uVelTex: {
					value: null,
					type: '1i'
				},
				uDepthTexture: {
					value: null,
					type: '1i'
				},
			} ),
			defines: {
				"TILE": motionBlurTileNum,
			},
		} );

		// Postprocess

		this.postprocess = new MXP.PostProcess( { entity: new MXP.Entity(), args: undefined } );

		this.postprocess.passes = [
			colorCollection,
			ssr,
			ssComposite,
			dofCoc,
			dofBokeh,
			dofComposite,
			motionBlurTile,
			motionBlurNeighbor,
			motionBlur,
		];

		this._timeUniforms = timeUniforms;
		this._ssr = ssr;
		this._ssComposite = ssComposite;
		this.dofCoc = dofCoc;
		this.dofBokeh = dofBokeh;
		this.dofComposite = dofComposite;
		this._motionBlur = motionBlur;
		this._motionBlurTile = motionBlurTile;
		this._dofParams = dofParams;
		this.rtSSR1 = rtSSR1;
		this.rtSSR2 = rtSSR2;
		this._renderCamera = null;

	}

	public update( event: MXP.EntityUpdateEvent ): void {

		if ( ! this._renderCamera ) return;

		// uniforms

		this._timeUniforms.uTimeEF.value = ( this._timeUniforms.uTimeEF.value + event.timeDelta ) % 1;

		// dof params

		const fov = this._renderCamera.fov;
		const focusDistance = this._renderCamera.dofParams.focusDistance;
		const kFilmHeight = this._renderCamera.dofParams.kFilmHeight;
		const flocalLength = kFilmHeight / Math.tan( 0.5 * ( fov / 180 * Math.PI ) );

		const maxCoc = ( 1 / this.dofBokeh.renderTarget!.size.y ) * ( 5 );
		const rcpMaxCoC = 1.0 / maxCoc;
		const coeff = flocalLength * flocalLength / ( 0.3 * ( focusDistance - flocalLength ) * kFilmHeight * 2.0 );

		this._dofParams.set( focusDistance, maxCoc, rcpMaxCoC, coeff );

		// ssr swap

		const tmp = this.rtSSR1;
		this.rtSSR1 = this.rtSSR2;
		this.rtSSR2 = tmp;

		this._ssr.setRendertarget( this.rtSSR1 );
		this._ssComposite.uniforms.uSSRTexture.value = this.rtSSR1.textures[ 0 ];
		this._ssr.uniforms.uSSRBackBuffer.value = this.rtSSR2.textures[ 0 ];

	}

	public resize( resolution: GLP.Vector ) {

		this.postprocess.resize( resolution );

	}

	public setRenderCamera( renderCamera: MXP.RenderCamera ) {

		this._renderCamera = renderCamera;

		const renderTarget = renderCamera.renderTarget;

		if ( ! renderTarget ) return;

		this.postprocess.input = renderTarget.shadingBuffer.textures;

		// ssr

		this._ssr.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		this._ssr.uniforms.uGbufferNormal.value = renderTarget.normalBuffer.textures[ 0 ];
		this._ssr.uniforms.uSceneTex.value = renderTarget.forwardBuffer.textures[ 0 ];

		// ssComposite

		this._ssComposite.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		this._ssComposite.uniforms.uGbufferNormal.value = renderTarget.gBuffer.textures[ 1 ];

		// dofCoc

		this.dofCoc.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];

		// motionBlurTile

		this._motionBlurTile.uniforms.uVelTex.value = renderTarget.gBuffer.textures[ 4 ];

		// motionBlur

		this._motionBlur.uniforms.uVelTex.value = renderTarget.gBuffer.textures[ 4 ];
		this._motionBlur.uniforms.uDepthTexture.value = renderTarget.gBuffer.depthTexture;


	}

}
