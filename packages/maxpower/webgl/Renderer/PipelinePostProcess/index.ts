import * as GLP from 'glpower';
import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { GL, GLBackend } from '../../backend/GLBackend';

import bloomBrightFrag from './shaders/bloomBright.fs';
import bloomCompositeFrag from './shaders/bloomComposite.fs';
import colorCollectionFrag from './shaders/colorCollection.fs';
import dofBlurFrag from './shaders/dofBlur.fs';
import dofBokehFrag from './shaders/dofBokeh.fs';
import dofCocFrag from './shaders/dofCoc.fs';
import dofCompositeFrag from './shaders/dofComposite.fs';
import fxaaFrag from './shaders/fxaa.fs';
import gaussBlurFrag from './shaders/gaussBlur.fs';
import motionBlurFrag from './shaders/motionBlur.fs';
import motionBlurNeighborFrag from './shaders/motionBlurNeighbor.fs';
import motionBlurTileFrag from './shaders/motionBlurTile.fs';
import ssCompositeFrag from './shaders/ssComposite.fs';
import ssrFrag from './shaders/ssr.fs';
import ssrTemporalFrag from './shaders/ssrTemporal.fs';


export type PipelinePostProcessPassConfig = {
	toneMap?: boolean;
	motionBlur?: boolean;
	ssr?: boolean;
	dof?: boolean;
	bloom?: boolean;
};

// ブルームのぼかしの段数。bloomComposite.fs の uBloomTexture[4] と一致させる
const BLOOM_LEVELS = 4;
const BLOOM_BLUR_SAMPLES = 8;

// DoF の最大 CoC（画面高さに対する比）。webgpu 側の PipelinePostProcess と一致させる。
// KinoBokeh の CalculateMaxCoCRadius は半径を 14px（経験式 kernelSize * 4 + 6 に dofBokeh.fs の 43 サンプル = KERNEL_LARGE を入れた値）÷ 画面高さで決めるが、
// それだと描画解像度を下げるほどボケが画面に対して大きくなる。高さ 1080 のときの比で固定して解像度に依存させない。
// 1080 より高い解像度ではサンプル同士のピクセル間隔が広がり、ボケに粒が出やすくなる
const DOF_MAX_COC = 14 / 1080;

// トーンマップより前のパスの描画先。HDR の値を 1 で切らずに持つ
const createHdrTarget = ( backend: GLBackend ) => backend.createFrameBuffer().setTexture( [
	backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA, magFilter: GL.LINEAR, minFilter: GL.LINEAR } ),
] );

export class PipelinePostProcess {

	public dofCoc: MXP.PostProcessPass;
	public dofBokeh: MXP.PostProcessPass;
	public dofBlur: MXP.PostProcessPass;
	public dofComposite: MXP.PostProcessPass;
	public rtSSR1: GLP.GLPowerFrameBuffer;
	public rtSSR2: GLP.GLPowerFrameBuffer;
	public postprocess: MXP.PostProcess;

	private _ssr: MXP.PostProcessPass;
	private _ssrTemporal: MXP.PostProcessPass;
	private _ssComposite: MXP.PostProcessPass;
	private _dofParams: MTP.Vector;
	private _motionBlur: MXP.PostProcessPass;
	private _motionBlurTile: MXP.PostProcessPass;
	private _motionBlurNeighbor: MXP.PostProcessPass;
	private _colorCollection: MXP.PostProcessPass;
	private _bloomBright: MXP.PostProcessPass;
	private _bloomPasses: MXP.PostProcessPass[];

	// 描画元の G-Buffer はビュー固有なので、生成時に一度だけ繋ぐ
	constructor( backend: GLBackend, renderTarget: MXP.RenderCameraTarget ) {

		// トーンマップを切っても linear→sRGB は掛けるので、パスは常に走らせて uToneMap で切り替える
		const colorCollection = new MXP.PostProcessPass( backend, {
			name: 'collection',
			frag: colorCollectionFrag,
			uniforms: {
				uToneMap: {
					value: 1,
					type: '1f'
				},
				uExposure: {
					value: 1,
					type: '1f'
				},
			},
		} );

		// ssr（レイマーチは今フレームだけを出し、時間方向の蓄積は ssrTemporal が今フレームの近傍で履歴をクランプして行う）

		const ssr = new MXP.PostProcessPass( backend, {
			name: 'ssr',
			frag: MXP.hotGet( "ssr", ssrFrag ),
			renderTarget: createHdrTarget( backend ),
			uniforms: MXP.UniformsUtils.merge( {
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

		const rtSSR1 = createHdrTarget( backend );
		const rtSSR2 = createHdrTarget( backend );

		const ssrTemporal = new MXP.PostProcessPass( backend, {
			name: 'ssrTemporal',
			frag: MXP.hotGet( "ssrTemporal", ssrTemporalFrag ),
			renderTarget: rtSSR1,
			uniforms: MXP.UniformsUtils.merge( {
				uSSRCurrent: {
					value: ssr.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uSSRBackBuffer: {
					value: rtSSR2.textures[ 0 ],
					type: '1i'
				},
				uGbufferPos: {
					value: null,
					type: '1i'
				},
				uVelTex: {
					value: null,
					type: '1i'
				},
			} ),
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ssrTemporal.fs", ( module ) => {

				if ( module ) {

					this._ssrTemporal.frag = MXP.hotUpdate( 'ssrTemporal', module.default );

				}

				this._ssrTemporal.requestUpdate();

			} );

		}

		// ss-composite

		const ssComposite = new MXP.PostProcessPass( backend, {
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
				uGbufferMaterial: {
					value: null,
					type: '1i'
				},
				uSSRTexture: {
					value: rtSSR1.textures[ 0 ],
					type: '1i'
				},
			} ),
			renderTarget: createHdrTarget( backend ),
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

		const dofParams = new MTP.Vector( 10, 0.05, 20, 0.05 );

		const dofCoc = new MXP.PostProcessPass( backend, {
			name: 'dof/coc',
			frag: dofCocFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uGbufferPos: {
					value: null,
					type: "1i"
				},
				uParams: {
					value: dofParams,
					type: '4f'
				},
			} ),
			renderTarget: backend.createFrameBuffer().setTexture( [
				backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR, internalFormat: GL.RGBA16F, type: GL.HALF_FLOAT, format: GL.RGBA } ),
			] ),
			passThrough: true,
			resolutionRatio: 0.5,
		} );

		const dofBokeh = new MXP.PostProcessPass( backend, {
			name: 'dof/bokeh',
			frag: dofBokehFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uCocTex: {
					value: dofCoc.renderTarget!.textures[ 0 ],
					type: '1i'
				},
				uParams: {
					value: dofParams,
					type: '4f'
				}
			} ),
			renderTarget: createHdrTarget( backend ),
			passThrough: true,
			resolutionRatio: 0.5,
		} );

		const dofBlur = new MXP.PostProcessPass( backend, {
			name: 'dof/blur',
			frag: dofBlurFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uBokeTex: {
					value: dofBokeh.renderTarget!.textures[ 0 ],
					type: '1i'
				}
			} ),
			renderTarget: createHdrTarget( backend ),
			passThrough: true,
			resolutionRatio: 0.5,
		} );

		const dofComposite = new MXP.PostProcessPass( backend, {
			name: 'dof/composite',
			frag: dofCompositeFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uBokeTex: {
					value: dofBlur.renderTarget!.textures[ 0 ],
					type: '1i'
				}
			} ),
			renderTarget: backend.createFrameBuffer().setTexture( [
				backend.createTexture().setting( { magFilter: GL.LINEAR, minFilter: GL.LINEAR, internalFormat: GL.RGBA16F, type: GL.HALF_FLOAT, format: GL.RGBA } ),
			] )
		} );

		// motion blur

		const motionBlurTileNum = 16;

		const motionBlurTile = new MXP.PostProcessPass( backend, {
			name: 'motionBlurTile',
			frag: motionBlurTileFrag,
			uniforms: MXP.UniformsUtils.merge( {
				uVelTex: {
					value: null,
					type: '1i'
				},
			} ),
			renderTarget: backend.createFrameBuffer().setTexture( [
				backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA } ),
			] ),
			defines: {
				"TILE": motionBlurTileNum,
			},
			resolutionRatio: 1 / motionBlurTileNum,
			passThrough: true,
		} );

		const motionBlurNeighbor = new MXP.PostProcessPass( backend, {
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
			renderTarget: backend.createFrameBuffer().setTexture( [
				backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA } ),
			] ),
			resolutionRatio: 1 / motionBlurTileNum,
			passThrough: true,
		} );

		const motionBlur = new MXP.PostProcessPass( backend, {
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
				uPower: {
					value: 1.0,
					type: "1f"
				}
			} ),
			defines: {
				"TILE": motionBlurTileNum,
			},
			renderTarget: createHdrTarget( backend ),
		} );

		// fxaa

		const fxaa = new MXP.PostProcessPass( backend, {
			name: 'fxaa',
			frag: fxaaFrag,
		} );

		// bloom

		// 輝度の抽出元は SSR などを掛ける前のシェーディングバッファ
		const bloomBright = new MXP.PostProcessPass( backend, {
			name: 'bloom/bright',
			frag: bloomBrightFrag,
			uniforms: {
				uShadingTexture: {
					value: renderTarget.shadingBuffer.textures[ 0 ],
					type: '1i'
				},
				uThreshold: {
					value: 1.0,
					type: '1f'
				},
				uBrightness: {
					value: 1.0,
					type: '1f'
				},
			},
			renderTarget: createHdrTarget( backend ),
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		const bloomPasses: MXP.PostProcessPass[] = [ bloomBright ];
		const bloomTextures: GLP.GLPowerTexture[] = [];

		let bloomInput = bloomBright.renderTarget!.textures[ 0 ];
		let bloomInvScale = 2.0;

		for ( let i = 0; i < BLOOM_LEVELS; i ++ ) {

			const rtVertical = createHdrTarget( backend );
			const rtHorizontal = createHdrTarget( backend );

			const blurParam: MXP.PostProcessPassParam = {
				name: 'bloom/blur/' + i + '/v',
				renderTarget: rtVertical,
				frag: gaussBlurFrag,
				uniforms: {
					uBackBlurTex: {
						value: bloomInput,
						type: '1i'
					},
					uIsVertical: {
						type: '1i',
						value: true
					},
					uWeights: {
						type: '1fv',
						value: MTP.MathUtils.gaussWeights( BLOOM_BLUR_SAMPLES )
					},
					uBlurRange: {
						value: 2.0,
						type: '1f'
					}
				},
				defines: {
					GAUSS_WEIGHTS: BLOOM_BLUR_SAMPLES.toString(),
					USE_BACKBLURTEX: "",
				},
				passThrough: true,
				resolutionRatio: 1.0 / bloomInvScale
			};

			bloomPasses.push( new MXP.PostProcessPass( backend, blurParam ) );

			bloomPasses.push( new MXP.PostProcessPass( backend, {
				...blurParam,
				name: 'bloom/blur/' + i + '/h',
				renderTarget: rtHorizontal,
				uniforms: {
					...blurParam.uniforms,
					uBackBlurTex: {
						value: rtVertical.textures[ 0 ],
						type: '1i'
					},
					uIsVertical: {
						type: '1i',
						value: false
					},
				},
			} ) );

			// 合成で足すのは各段の横ぼかし結果
			bloomTextures.push( rtHorizontal.textures[ 0 ] );

			bloomInput = rtHorizontal.textures[ 0 ];
			bloomInvScale *= 2.0;

		}

		bloomPasses.push( new MXP.PostProcessPass( backend, {
			name: 'bloom/composite',
			frag: bloomCompositeFrag,
			uniforms: {
				uBloomTexture: {
					value: bloomTextures,
					type: '1iv'
				},
			},
			renderTarget: createHdrTarget( backend ),
		} ) );

		// Postprocess

		// 並びは webgpu 側と同じ（SSR / DoF / モーションブラー → ブルーム合成 → トーンマップ + linear→sRGB → FXAA）。
		// トーンマップより前は HDR のまま処理し、FXAA は sRGB の LDR に掛ける
		this.postprocess = new MXP.PostProcess( { passes: [
			ssr,
			ssrTemporal,
			ssComposite,
			dofCoc,
			dofBokeh,
			dofBlur,
			dofComposite,
			motionBlurTile,
			motionBlurNeighbor,
			motionBlur,
			...bloomPasses,
			colorCollection,
			fxaa,
		] } );

		this._ssr = ssr;
		this._ssrTemporal = ssrTemporal;
		this._ssComposite = ssComposite;
		this.dofCoc = dofCoc;
		this.dofBokeh = dofBokeh;
		this.dofBlur = dofBlur;
		this.dofComposite = dofComposite;
		this._motionBlur = motionBlur;
		this._motionBlurTile = motionBlurTile;
		this._motionBlurNeighbor = motionBlurNeighbor;
		this._colorCollection = colorCollection;
		this._bloomBright = bloomBright;
		this._bloomPasses = bloomPasses;
		this._dofParams = dofParams;
		this.rtSSR1 = rtSSR1;
		this.rtSSR2 = rtSSR2;

		// ssr

		ssr.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		ssr.uniforms.uGbufferNormal.value = renderTarget.normalBuffer.textures[ 0 ];
		ssr.uniforms.uSceneTex.value = renderTarget.forwardBuffer.textures[ 0 ];

		// ssrTemporal

		ssrTemporal.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		ssrTemporal.uniforms.uVelTex.value = renderTarget.gBuffer.textures[ 4 ];

		// ssComposite

		ssComposite.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];
		ssComposite.uniforms.uGbufferNormal.value = renderTarget.gBuffer.textures[ 1 ];
		ssComposite.uniforms.uGbufferMaterial.value = renderTarget.gBuffer.textures[ 3 ];

		// dofCoc

		dofCoc.uniforms.uGbufferPos.value = renderTarget.gBuffer.textures[ 0 ];

		// motionBlurTile

		motionBlurTile.uniforms.uVelTex.value = renderTarget.gBuffer.textures[ 4 ];

		// motionBlur

		motionBlur.uniforms.uVelTex.value = renderTarget.gBuffer.textures[ 4 ];
		motionBlur.uniforms.uDepthTexture.value = renderTarget.gBuffer.depthTexture;

	}

	// 描画後に呼び、次フレーム用の DOF パラメータと SSR の履歴を進める
	public update( camera: MXP.Camera ): void {

		// dof params

		const kFilmHeight = camera.dofParams.kFilmHeight;
		const focalLength = 0.5 * kFilmHeight / Math.tan( 0.5 * ( camera.fov / 180 * Math.PI ) );

		// ピントの距離が焦点距離を下回ると係数の分母（focusDistance - focalLength）が 0 以下になる
		const focusDistance = Math.max( camera.dofParams.focusDistance, focalLength );

		const maxCoc = DOF_MAX_COC;
		const rcpMaxCoC = 1.0 / maxCoc;
		const coeff = focalLength * focalLength / ( camera.dofParams.fNumber * ( focusDistance - focalLength ) * kFilmHeight * 2.0 );

		this._dofParams.set( focusDistance, maxCoc, rcpMaxCoC, coeff );

		// ssr swap

		const tmp = this.rtSSR1;
		this.rtSSR1 = this.rtSSR2;
		this.rtSSR2 = tmp;

		this._ssrTemporal.setRendertarget( this.rtSSR1 );
		this._ssComposite.uniforms.uSSRTexture.value = this.rtSSR1.textures[ 0 ];
		this._ssrTemporal.uniforms.uSSRBackBuffer.value = this.rtSSR2.textures[ 0 ];

	}

	public resize( resolution: MTP.Vector ) {

		this.postprocess.resize( resolution );

	}

	public setPassEnabled( config: PipelinePostProcessPassConfig ): void {

		if ( config.toneMap !== undefined ) {

			this._colorCollection.uniforms.uToneMap.value = config.toneMap ? 1 : 0;

		}

		if ( config.bloom !== undefined ) {

			for ( const pass of this._bloomPasses ) {

				pass.enabled = config.bloom;

			}

		}

		if ( config.motionBlur !== undefined ) {

			this._motionBlurTile.enabled = config.motionBlur;
			this._motionBlurNeighbor.enabled = config.motionBlur;
			this._motionBlur.enabled = config.motionBlur;

			if ( ! config.motionBlur ) {

				if ( this._motionBlurTile.renderTarget ) this._motionBlurTile.renderTarget.clear();
				if ( this._motionBlurNeighbor.renderTarget ) this._motionBlurNeighbor.renderTarget.clear();

			}

		}

		if ( config.ssr !== undefined ) {

			this._ssr.enabled = config.ssr;
			this._ssrTemporal.enabled = config.ssr;
			this._ssComposite.enabled = config.ssr;

			if ( ! config.ssr ) {

				this.rtSSR1.clear();
				this.rtSSR2.clear();

			}

		}

		if ( config.dof !== undefined ) {

			this.dofCoc.enabled = config.dof;
			this.dofBokeh.enabled = config.dof;
			this.dofBlur.enabled = config.dof;
			this.dofComposite.enabled = config.dof;

			if ( ! config.dof ) {

				if ( this.dofBokeh.renderTarget ) this.dofBokeh.renderTarget.clear();
				if ( this.dofBlur.renderTarget ) this.dofBlur.renderTarget.clear();
				if ( this.dofComposite.renderTarget ) this.dofComposite.renderTarget.clear();

			}

		}

	}

	public setMotionBlurPower( power: number ): void {

		this._motionBlur.uniforms.uPower.value = power;

	}

	// 露出を EV で受け、トーンマップ前に掛ける倍率 2^exposure にする
	public setExposure( exposure: number ): void {

		this._colorCollection.uniforms.uExposure.value = Math.pow( 2, exposure );

	}

	public setBloomParams( threshold: number, brightness: number ): void {

		this._bloomBright.uniforms.uThreshold.value = threshold;
		this._bloomBright.uniforms.uBrightness.value = brightness;

	}

	public dispose() {

		this.postprocess.dispose();
		this.rtSSR1.dispose();
		this.rtSSR2.dispose();

	}

}
