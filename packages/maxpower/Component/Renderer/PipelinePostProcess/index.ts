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

export class PipelinePostProcess extends MXP.PostProcess {

	// uniforms

	private timeUniforms: GLP.Uniforms;

	// ssr

	private ssr: MXP.PostProcessPass;
	public rtSSR1: GLP.GLPowerFrameBuffer;
	public rtSSR2: GLP.GLPowerFrameBuffer;

	// ss composite

	private ssComposite: MXP.PostProcessPass;

	// dof

	private dofParams: GLP.Vector;

	public dofCoc: MXP.PostProcessPass;
	public dofBokeh: MXP.PostProcessPass;
	public dofComposite: MXP.PostProcessPass;

	// motion blur

	private motionBlur: MXP.PostProcessPass;
	private motionBlurTile: MXP.PostProcessPass;

	// renderCamera

	private renderCamera: MXP.RenderCamera | null;

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
			uniforms: GLP.UniformsUtils.merge( timeUniforms, {
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

					this.ssr.frag = MXP.hotUpdate( 'ssr', module.default );

				}

				this.ssr.requestUpdate();

			} );

		}

		// ss-composite

		const ssComposite = new MXP.PostProcessPass( gl, {
			name: 'ssComposite',
			frag: MXP.hotGet( "ssComposite", ssCompositeFrag ),
			uniforms: GLP.UniformsUtils.merge( {
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

					this.ssComposite.frag = MXP.hotUpdate( 'ssComposite', module.default );

				}

				this.ssComposite.requestUpdate();

			} );

		}

		// dof

		const dofParams = new GLP.Vector( 10, 0.05, 20, 0.05 );

		const dofCoc = new MXP.PostProcessPass( gl, {
			name: 'dof/coc',
			frag: dofCocFrag,
			uniforms: GLP.UniformsUtils.merge( timeUniforms, {
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
			uniforms: GLP.UniformsUtils.merge( timeUniforms, {
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
			uniforms: GLP.UniformsUtils.merge( {
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
			uniforms: GLP.UniformsUtils.merge( {
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
			uniforms: GLP.UniformsUtils.merge( {
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
			uniforms: GLP.UniformsUtils.merge( {
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

		super( {
			idOverride: 'scenePostProcess',
			passes: [
				colorCollection,
				ssr,
				ssComposite,
				dofCoc,
				dofBokeh,
				dofComposite,
				motionBlurTile,
				motionBlurNeighbor,
				motionBlur,
			]
		} );

		this.timeUniforms = timeUniforms;

		this.ssr = ssr;
		this.ssComposite = ssComposite;
		this.dofCoc = dofCoc;
		this.dofBokeh = dofBokeh;
		this.dofComposite = dofComposite;
		this.motionBlur = motionBlur;
		this.motionBlurTile = motionBlurTile;

		// dof

		this.dofParams = dofParams;

		// rt

		this.rtSSR1 = rtSSR1;
		this.rtSSR2 = rtSSR2;

		// rendercamera

		this.renderCamera = null;


	}

	protected updateImpl( event: MXP.ComponentUpdateEvent ): void {

		if ( ! this.renderCamera ) return;

		// uniforms

		this.timeUniforms.uTimeEF.value = ( this.timeUniforms.uTimeEF.value + event.timeDelta ) % 1;

		// dof params

		const fov = this.renderCamera.fov;
		const focusDistance = this.renderCamera.dof.focusDistance;
		const kFilmHeight = this.renderCamera.dof.kFilmHeight;
		const flocalLength = kFilmHeight / Math.tan( 0.5 * ( fov / 180 * Math.PI ) );

		const maxCoc = ( 1 / this.dofBokeh.renderTarget!.size.y ) * ( 5 );
		const rcpMaxCoC = 1.0 / maxCoc;
		const coeff = flocalLength * flocalLength / ( 0.3 * ( focusDistance - flocalLength ) * kFilmHeight * 2.0 );

		this.dofParams.set( focusDistance, maxCoc, rcpMaxCoC, coeff );

		// ssr swap

		const tmp = this.rtSSR1;
		this.rtSSR1 = this.rtSSR2;
		this.rtSSR2 = tmp;

		this.ssr.setRendertarget( this.rtSSR1 );
		this.ssComposite.uniforms.uSSRTexture.value = this.rtSSR1.textures[ 0 ];
		this.ssr.uniforms.uSSRBackBuffer.value = this.rtSSR2.textures[ 0 ];

	}

	public setRenderCamera( renderCamera: MXP.RenderCamera ) {

		this.renderCamera = renderCamera;

		const renderTarget = renderCamera.renderTarget;

		this.input = renderTarget.shadingBuffer.textures;

		// ssr

		this.ssr.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		this.ssr.uniforms.uGbufferNormal.value = renderTarget.normalBuffer.textures[ 0 ];
		this.ssr.uniforms.uSceneTex.value = renderTarget.forwardBuffer.textures[ 0 ];

		// ssComposite

		this.ssComposite.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		this.ssComposite.uniforms.uGbufferNormal.value = renderTarget.gBuffer.textures[ 1 ];

		// dofCoc

		this.dofCoc.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];

		// motionBlurTile

		this.motionBlurTile.uniforms.uVelTex.value = renderTarget.gBuffer.textures[ 4 ];

		// motionBlur

		this.motionBlur.uniforms.uVelTex.value = renderTarget.gBuffer.textures[ 4 ];
		this.motionBlur.uniforms.uDepthTexture.value = renderTarget.gBuffer.depthTexture;


	}

}
