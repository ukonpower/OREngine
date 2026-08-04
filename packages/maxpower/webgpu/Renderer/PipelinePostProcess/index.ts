import * as GLP from 'glpower';

import { PostProcessChain, PostProcessPass } from '../../PostProcess';

import {
	buildBloomCompositeWgsl,
	buildGaussBlurWgsl,
	buildLightShaftBlurWgsl,
	buildMotionBlurTileWgsl,
	buildMotionBlurWgsl,
	buildSsaoBlurWgsl,
	buildSsaoWgsl,
} from './shaders';
import bloomBrightWgsl from './shaders/bloomBright.wgsl';
import colorCollectionWgsl from './shaders/colorCollection.wgsl';
import colorGradingWgsl from './shaders/colorGrading.wgsl';
import dofBokehWgsl from './shaders/dofBokeh.wgsl';
import dofCocWgsl from './shaders/dofCoc.wgsl';
import dofCompositeWgsl from './shaders/dofComposite.wgsl';
import finalizeWgsl from './shaders/finalize.wgsl';
import fxaaWgsl from './shaders/fxaa.wgsl';
import lightShaftWgsl from './shaders/lightShaft.wgsl';
import motionBlurNeighborWgsl from './shaders/motionBlurNeighbor.wgsl';
import normalSelectorWgsl from './shaders/normalSelector.wgsl';
import ssCompositeWgsl from './shaders/ssComposite.wgsl';
import ssrWgsl from './shaders/ssr.wgsl';

import type { Camera } from '../../../core/Components/Camera';
import type { PostProcessPassParam } from '../../PostProcess';

type PassCallback = ( pass: PostProcessPass ) => void;

/*-------------------------------
	レンダラーが持つポストプロセス

	webgl側の DeferredRenderer（シェーディング以外）と PipelinePostProcess、
	それに CameraController が組んでいた仕上げ（FXAA / Bloom / ColorGrading /
	Finalize）をまとめたもの。

	シェーディングの前に走る系統（法線選択・lightShaft・SSAO）と、
	forwardのあとに走る系統（トーンマップ・SSR・DoF・モーションブラー・仕上げ）に分かれる。

	SSAO / lightShaft / SSR は前フレームの結果と混ぜて均す設計なので、
	webgl と同じく描画先を2枚持つピンポン方式で移植している。
-------------------------------*/

const BLOOM_LEVELS = 4;
const BLOOM_BLUR_SAMPLES = 8;
const SSAO_BLUR_SAMPLES = 8;
const LIGHT_SHAFT_BLUR_SAMPLES = 6;
const MOTION_BLUR_TILE = 16;

// 時間方向の蓄積で新しい結果に与える重み。ノイズと影の追従の速さの折り合いで、
// エディタから触れるよう uniform にも同じ値を入れている
const LIGHT_SHAFT_TEMPORAL_BLEND = 0.3;

// ジッタの巡回周期。蓄積されるフレーム数（1/LIGHT_SHAFT_TEMPORAL_BLEND）より十分長ければよい
const LIGHT_SHAFT_JITTER_CYCLE = 64;

// rgba32float のgBufferはfilteringサンプラーで引けない
const NEAREST = ( name: string ) => ( { name, filterable: false } );

// エディタから触るポストプロセスの有効フラグ
export type PipelineConfig = {
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	lightShaftBlur?: boolean;
	lightShaftTemporal?: boolean;
	lightShaftTemporalBlend?: number;
	dof?: boolean;
}

export class PipelinePostProcess {

	// シェーディングが読むテクスチャ
	public get normalView() {

		return this._normalSelector.targetView;

	}

	public get ssaoView() {

		return this._ssaoBlurV.targetView;

	}

	// ぼかしを切ると参照先がピンポンの描画先になり、フレームごとに入れ替わる
	public get lightShaftView() {

		return this._lightShaftBlurV.enabled ? this._lightShaftBlurV.targetView : this._lightShaft.targetView;

	}

	// 画面へ出す最終出力
	public get outputView() {

		return this._finishChain.passes[ this._finishChain.passes.length - 1 ].targetView;

	}

	private _normalSelector: PostProcessPass;
	private _lightShaft: PostProcessPass;
	private _lightShaftBlurH: PostProcessPass;
	private _lightShaftBlurV: PostProcessPass;
	private _ssao: PostProcessPass;
	private _ssaoBlurV: PostProcessPass;

	private _ssr: PostProcessPass;
	private _ssComposite: PostProcessPass;
	private _dofCoc: PostProcessPass;
	private _dofBokeh: PostProcessPass;
	private _dofComposite: PostProcessPass;
	private _motionBlurTile: PostProcessPass;
	private _motionBlurNeighbor: PostProcessPass;
	private _motionBlur: PostProcessPass;

	private _bright: PostProcessPass;
	private _bloomLevels: PostProcessPass[];
	private _composite: PostProcessPass;

	private _deferredChain: PostProcessChain;
	private _colorChain: PostProcessChain;
	private _screenChain: PostProcessChain;
	private _bloomChain: PostProcessChain;
	private _finishChain: PostProcessChain;

	private _dofParams: GLP.Vector;
	private _height: number;

	constructor( device: GPUDevice, frameLayout: GPUBindGroupLayout, lightLayout: GPUBindGroupLayout, resolution: GLP.Vector, pixelSize: GLP.Vector ) {

		const pass = ( param: PostProcessPassParam ) => new PostProcessPass( param, resolution, pixelSize );

		this._dofParams = new GLP.Vector( 10, 0.05, 20, 0.05 );
		this._height = 1;

		/*-------------------------------
			シェーディングの前
		-------------------------------*/

		// gBufferの法線と位置から復元した法線を混ぜる。以降の法線参照はすべてこの結果を使う
		this._normalSelector = pass( {
			name: 'normalSelector',
			wgsl: normalSelectorWgsl,
			inputs: [ NEAREST( 'uNormalTexture' ), NEAREST( 'uPosTexture' ), 'uSelectorTexture' ],
			format: 'rgba32float',
			passThrough: true,
		} );

		// ぼかしの入力はチェーン経由で受け取る（ピンポンで毎フレーム入れ替わる描画先を
		// 名指しで繋ぐと1フレームずれるため）
		this._lightShaft = pass( {
			name: 'lightShaft',
			wgsl: lightShaftWgsl,
			inputs: [ NEAREST( 'uGbufferPos' ) ],
			uniforms: {
				uIntensity: { value: 1, type: '1f' },
				uFrame: { value: 0, type: '1f' },
				uTemporal: { value: 1, type: '1f' },
				uTemporalBlend: { value: LIGHT_SHAFT_TEMPORAL_BLEND, type: '1f' },
			},
			pingPong: 'uLightShaftBackBuffer',
			lights: lightLayout,
			resolutionRatio: 0.5,
		} );

		this._lightShaftBlurH = pass( {
			name: 'lightShaft/blur/h',
			wgsl: buildLightShaftBlurWgsl( LIGHT_SHAFT_BLUR_SAMPLES, false ),
			inputs: [ 'uBackBuffer0', NEAREST( 'uGbufferPos' ) ],
			resolutionRatio: 0.5,
		} );

		this._lightShaftBlurV = pass( {
			name: 'lightShaft/blur/v',
			wgsl: buildLightShaftBlurWgsl( LIGHT_SHAFT_BLUR_SAMPLES, true ),
			inputs: [ 'uBackBuffer0', NEAREST( 'uGbufferPos' ) ],
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		this._ssao = pass( {
			name: 'ssao',
			wgsl: buildSsaoWgsl(),
			inputs: [ NEAREST( 'uGbufferPos' ), NEAREST( 'uGbufferNormal' ) ],
			uniforms: { uIntensity: { value: 1, type: '1f' } },
			format: 'rgba8unorm',
			resolutionRatio: 0.5,
		} );

		const ssaoBlurH = pass( {
			name: 'ssao/blur/h',
			wgsl: buildSsaoBlurWgsl( SSAO_BLUR_SAMPLES, false ),
			inputs: [ 'uBackBuffer0', NEAREST( 'uGbufferPos' ), NEAREST( 'uGbufferNormal' ) ],
			format: 'rgba8unorm',
		} );

		this._ssaoBlurV = pass( {
			name: 'ssao/blur/v',
			wgsl: buildSsaoBlurWgsl( SSAO_BLUR_SAMPLES, true ),
			inputs: [ 'uBackBuffer0', NEAREST( 'uGbufferPos' ), NEAREST( 'uGbufferNormal' ) ],
			format: 'rgba8unorm',
		} );

		this._deferredChain = new PostProcessChain( device, frameLayout, [
			this._normalSelector,
			this._lightShaft,
			this._lightShaftBlurH,
			this._lightShaftBlurV,
			this._ssao,
			ssaoBlurH,
			this._ssaoBlurV,
		] );

		/*-------------------------------
			トーンマップ
		-------------------------------*/

		this._colorChain = new PostProcessChain( device, frameLayout, [ pass( {
			name: 'colorCollection',
			wgsl: colorCollectionWgsl,
		} ) ] );

		/*-------------------------------
			スクリーンスペース（SSR / DoF / モーションブラー）
		-------------------------------*/

		this._ssr = pass( {
			name: 'ssr',
			wgsl: ssrWgsl,
			inputs: [ 'uBackBuffer0', NEAREST( 'uGbufferPos' ), NEAREST( 'uGbufferNormal' ) ],
			pingPong: 'uSSRBackBuffer',
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		this._ssComposite = pass( {
			name: 'ssComposite',
			wgsl: ssCompositeWgsl,
			inputs: [ 'uBackBuffer0', NEAREST( 'uGbufferPos' ), NEAREST( 'uGbufferNormal' ), 'uSSRTexture' ],
		} );

		const dofUniforms: GLP.Uniforms = { uParams: { value: this._dofParams, type: '4fv' } };

		this._dofCoc = pass( {
			name: 'dof/coc',
			wgsl: dofCocWgsl,
			inputs: [ 'uBackBuffer0', NEAREST( 'uGbufferPos' ) ],
			uniforms: dofUniforms,
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		this._dofBokeh = pass( {
			name: 'dof/bokeh',
			wgsl: dofBokehWgsl,
			inputs: [ 'uCocTex' ],
			uniforms: dofUniforms,
			resolutionRatio: 0.5,
			passThrough: true,
		} );

		this._dofComposite = pass( {
			name: 'dof/composite',
			wgsl: dofCompositeWgsl,
			inputs: [ 'uBackBuffer0', 'uBokeTex' ],
		} );

		this._motionBlurTile = pass( {
			name: 'motionBlur/tile',
			wgsl: buildMotionBlurTileWgsl( MOTION_BLUR_TILE ),
			inputs: [ NEAREST( 'uVelTex' ) ],
			resolutionRatio: 1 / MOTION_BLUR_TILE,
			passThrough: true,
		} );

		this._motionBlurNeighbor = pass( {
			name: 'motionBlur/neighbor',
			wgsl: motionBlurNeighborWgsl,
			inputs: [ 'uVelTex' ],
			resolutionRatio: 1 / MOTION_BLUR_TILE,
			passThrough: true,
		} );

		this._motionBlur = pass( {
			name: 'motionBlur',
			wgsl: buildMotionBlurWgsl( MOTION_BLUR_TILE ),
			inputs: [ 'uBackBuffer0', NEAREST( 'uVelTex' ), 'uVelNeighborTex', NEAREST( 'uGbufferPos' ) ],
			uniforms: { uPower: { value: 1.0, type: '1f' } },
		} );

		this._screenChain = new PostProcessChain( device, frameLayout, [
			this._ssr,
			this._ssComposite,
			this._dofCoc,
			this._dofBokeh,
			this._dofComposite,
			this._motionBlurTile,
			this._motionBlurNeighbor,
			this._motionBlur,
		] );

		/*-------------------------------
			ブルーム
		-------------------------------*/

		// 輝度の抽出元はトーンマップ前のHDRシーン（webgl側もCameraControllerが
		// shadingBuffer を渡している）。トーンマップ後だと閾値を超えなくなる
		this._bright = pass( {
			name: 'bloom/bright',
			wgsl: bloomBrightWgsl,
			inputs: [ 'uSceneHdr' ],
			uniforms: {
				uThreshold: { value: 1.0, type: '1f' },
				uBrightness: { value: 1.0, type: '1f' },
			},
			resolutionRatio: 0.5,
		} );

		const bloomPasses: PostProcessPass[] = [ this._bright ];

		this._bloomLevels = [];

		for ( let i = 0; i < BLOOM_LEVELS; i ++ ) {

			const ratio = 0.5 / Math.pow( 2, i );
			const uniforms: GLP.Uniforms = { uBlurRange: { value: 2.0, type: '1f' } };

			const vertical = pass( {
				name: `bloom/blur/${i}/v`,
				wgsl: buildGaussBlurWgsl( BLOOM_BLUR_SAMPLES, true ),
				uniforms,
				resolutionRatio: ratio,
			} );

			const horizontal = pass( {
				name: `bloom/blur/${i}/h`,
				wgsl: buildGaussBlurWgsl( BLOOM_BLUR_SAMPLES, false ),
				uniforms,
				resolutionRatio: ratio,
			} );

			bloomPasses.push( vertical, horizontal );

			// 合成で足すのは各段の横ぼかし結果
			this._bloomLevels.push( horizontal );

		}

		this._bloomChain = new PostProcessChain( device, frameLayout, bloomPasses );

		/*-------------------------------
			仕上げ
		-------------------------------*/

		this._composite = pass( {
			name: 'bloom/composite',
			wgsl: buildBloomCompositeWgsl( BLOOM_LEVELS ),
			inputs: [ 'uBackBuffer0', ...this._bloomLevels.map( ( _, i ) => `uBloom${i}` ) ],
		} );

		// webgl側 CameraController と同じ並び
		this._finishChain = new PostProcessChain( device, frameLayout, [
			pass( { name: 'fxaa', wgsl: fxaaWgsl } ),
			this._composite,
			pass( { name: 'colorGrading', wgsl: colorGradingWgsl } ),
			pass( { name: 'finalize', wgsl: finalizeWgsl } ),
		] );

	}

	public setSize( device: GPUDevice, width: number, height: number ) {

		this._height = height;

		this._deferredChain.setSize( device, width, height );
		this._colorChain.setSize( device, width, height );
		this._screenChain.setSize( device, width, height );
		this._bloomChain.setSize( device, width, height );
		this._finishChain.setSize( device, width, height );

		// 作り直されたビューを参照側へ張り直す
		for ( let i = 0; i < this._bloomLevels.length; i ++ ) {

			this._composite.setInput( `uBloom${i}`, this._bloomLevels[ i ].targetView! );

		}

		this._dofBokeh.setInput( 'uCocTex', this._dofCoc.targetView! );
		this._dofComposite.setInput( 'uBokeTex', this._dofBokeh.targetView! );
		this._motionBlur.setInput( 'uVelNeighborTex', this._motionBlurNeighbor.targetView! );

		// 法線を参照するパスは normalSelector の結果を見る（webgl側の normalBuffer と同じ）
		for ( const pass of [ ...this._deferredChain.passes, ...this._screenChain.passes ] ) {

			pass.setInput( 'uGbufferNormal', this._normalSelector.targetView! );

		}

	}

	// gBufferのビューが作り直されたときに繋ぎ直す
	public setGBuffer( position: GPUTextureView, normal: GPUTextureView, material: GPUTextureView, velocity: GPUTextureView ) {

		for ( const pass of [ ...this._deferredChain.passes, ...this._screenChain.passes ] ) {

			pass.setInput( 'uGbufferPos', position );
			pass.setInput( 'uPosTexture', position );
			pass.setInput( 'uNormalTexture', normal );
			pass.setInput( 'uSelectorTexture', material );
			pass.setInput( 'uVelTex', velocity );

		}

		// 近傍パスが読むのはタイルの結果（gBufferの速度ではない）
		this._motionBlurNeighbor.setInput( 'uVelTex', this._motionBlurTile.targetView! );

	}

	// トーンマップ前のシーンバッファを繋ぐ（ブルームの輝度抽出元）
	public setScene( scene: GPUTextureView ) {

		this._bright.setInput( 'uSceneHdr', scene );

	}

	// カメラのDoF設定からCoCの係数を作る（webgl側 PipelinePostProcess.update と同じ式）。
	// あわせて lightShaft のジッタを次のフレームへ進める
	public update( camera: Camera ) {

		const jitter = this._lightShaft.uniforms.uFrame;

		jitter.value = ( jitter.value + 1 ) % LIGHT_SHAFT_JITTER_CYCLE;

		const focusDistance = camera.dofParams.focusDistance;
		const kFilmHeight = camera.dofParams.kFilmHeight;
		const focalLength = kFilmHeight / Math.tan( 0.5 * ( camera.fov / 180 * Math.PI ) );

		const maxCoc = ( 1 / Math.max( this._height * 0.5, 1 ) ) * 5;
		const coeff = focalLength * focalLength / ( 0.3 * ( focusDistance - focalLength ) * kFilmHeight * 2.0 );

		this._dofParams.set( focusDistance, maxCoc, 1.0 / maxCoc, coeff );

	}

	// gBufferから法線・lightShaft・SSAOを作る（シェーディングの前）
	public renderDeferred( device: GPUDevice, encoder: GPUCommandEncoder, frameBindGroup: GPUBindGroup, input: GPUTextureView, lightBindGroup: GPUBindGroup, onPass?: PassCallback ) {

		this._deferredChain.render( device, encoder, frameBindGroup, input, lightBindGroup, onPass );

	}

	// シーンの仕上げ（forwardのあと）。画面へ出すビューを返す
	public renderPost( device: GPUDevice, encoder: GPUCommandEncoder, frameBindGroup: GPUBindGroup, scene: GPUTextureView, onPass?: PassCallback ) {

		// ピンポンで描画先が入れ替わるので参照を毎フレーム張り直す
		this._ssComposite.setInput( 'uSSRTexture', this._ssr.targetView! );

		const color = this._colorChain.render( device, encoder, frameBindGroup, scene, undefined, onPass );
		const screen = this._screenChain.render( device, encoder, frameBindGroup, color, undefined, onPass );

		this._bloomChain.render( device, encoder, frameBindGroup, screen, undefined, onPass );

		return this._finishChain.render( device, encoder, frameBindGroup, screen, undefined, onPass );

	}

	// SSAO / lightShaft はシェーディングが読む先に結果が残るため、無効時も走らせて出力を0にする。
	// SSR / DoF / モーションブラーはチェーンを素通りさせるだけでよい
	public applyPipelineConfig( config: PipelineConfig ) {

		if ( config.ssao !== undefined ) {

			this._ssao.uniforms.uIntensity.value = config.ssao ? 1 : 0;

		}

		if ( config.lightShaft !== undefined ) {

			this._lightShaft.uniforms.uIntensity.value = config.lightShaft ? 1 : 0;

		}

		if ( config.lightShaftBlur !== undefined ) {

			this._lightShaftBlurH.enabled = config.lightShaftBlur;
			this._lightShaftBlurV.enabled = config.lightShaftBlur;

		}

		if ( config.lightShaftTemporal !== undefined ) {

			this._lightShaft.uniforms.uTemporal.value = config.lightShaftTemporal ? 1 : 0;

		}

		if ( config.lightShaftTemporalBlend !== undefined ) {

			this._lightShaft.uniforms.uTemporalBlend.value = config.lightShaftTemporalBlend;

		}

		if ( config.ssr !== undefined ) {

			this._ssr.enabled = config.ssr;
			this._ssComposite.enabled = config.ssr;

		}

		if ( config.dof !== undefined ) {

			this._dofCoc.enabled = config.dof;
			this._dofBokeh.enabled = config.dof;
			this._dofComposite.enabled = config.dof;

		}

		if ( config.motionBlur !== undefined ) {

			this._motionBlurTile.enabled = config.motionBlur;
			this._motionBlurNeighbor.enabled = config.motionBlur;
			this._motionBlur.enabled = config.motionBlur;

		}

		if ( config.motionBlurPower !== undefined ) {

			this._motionBlur.uniforms.uPower.value = config.motionBlurPower;

		}

	}

	public dispose() {

		this._deferredChain.dispose();
		this._colorChain.dispose();
		this._screenChain.dispose();
		this._bloomChain.dispose();
		this._finishChain.dispose();

	}

}
