import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Entity } from '../../../core/Entity';
import { GL, GLBackend } from '../../backend/GLBackend';
import { PostProcess } from '../../PostProcess';
import { PostProcessPass } from '../../PostProcess/PostProcessPass';
import { DeferredRenderer } from '../DeferredRenderer';
import { PipelinePostProcess } from '../PipelinePostProcess';

import type { PipelineConfig, RenderViewContract } from '../../../core/Contracts/RenderViewContract';
import type { PostProcessPipelinePassParam } from '../../Components/PostProcessPipeline';

export type RenderCameraTarget = {
	gBuffer: GLP.GLPowerFrameBuffer,
	shadingBuffer: GLP.GLPowerFrameBuffer,
	forwardBuffer: GLP.GLPowerFrameBuffer,
	refractionBuffer: GLP.GLPowerFrameBuffer,
	prevSceneBuffer: GLP.GLPowerFrameBuffer,
	uiBuffer: GLP.GLPowerFrameBuffer,
	normalBuffer: GLP.GLPowerFrameBuffer,
}

type RenderViewParams = {
	backend: GLBackend;
	envMap: GLP.GLPowerTexture;
	envMapCube: GLP.GLPowerTextureCube;
	// Renderer のシーン設定と同じオブジェクト（Renderer 側で書き換わる）。上書きと合成した実効値をパスへ流す
	sceneConfig: PipelineConfig;
	resolution: MTP.Vector;
	offscreen: boolean;
	onDispose: ( view: RenderView ) => void;
}

const createRenderTarget = ( backend: GLBackend ): RenderCameraTarget => {

	const gBuffer = backend.createFrameBuffer();
	gBuffer.setTexture( [
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA, magFilter: GL.NEAREST, minFilter: GL.NEAREST } ),
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA } ),
		// albedo。リニアの値を 8bit で持つと暗部が潰れるので、書き込みで sRGB へ encode・読み出しで decode させる
		backend.createTexture().setting( { internalFormat: GL.SRGB8_ALPHA8 } ),
		backend.createTexture(),
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA } ),
	] );

	const shadingBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
	shadingBuffer.setTexture( [
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA } ),
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA } ),
	] );

	const forwardBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
	forwardBuffer.setDepthTexture( gBuffer.depthTexture );
	forwardBuffer.setTexture( [
		shadingBuffer.textures[ 0 ],
		gBuffer.textures[ 0 ],
		gBuffer.textures[ 4 ],
	] );

	const refractionBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
	refractionBuffer.setTexture( [
		backend.createTexture().setting( {
			type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA,
			magFilter: GL.LINEAR, minFilter: GL.LINEAR,
		} ),
	] );

	// 前フレームの不透明の forward まで描き終えたシーン。シェーディングより前に走る SSR が反射色として引く
	const prevSceneBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
	prevSceneBuffer.setTexture( [
		backend.createTexture().setting( {
			type: GL.FLOAT, internalFormat: GL.RGBA16F, format: GL.RGBA,
			magFilter: GL.LINEAR, minFilter: GL.LINEAR,
		} ),
	] );

	const uiBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
	uiBuffer.setDepthTexture( gBuffer.depthTexture );
	uiBuffer.setTexture( [ backend.createTexture() ] );

	const normalBuffer = backend.createFrameBuffer();
	normalBuffer.setTexture( [
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA, magFilter: GL.NEAREST, minFilter: GL.NEAREST } )
	] );

	return { gBuffer, shadingBuffer, forwardBuffer, refractionBuffer, prevSceneBuffer, uiBuffer, normalBuffer };

};

// 視点ごとの描画資源。G-Buffer と、時間的に蓄積するポストプロセス（SSAO / LightShaft / SSR の履歴）は
// 視点が違うと混ざるので、ビュー単位で持つ
export class RenderView implements RenderViewContract {

	public camera: Entity | null;
	public size: MTP.Vector | null;

	// 中間バッファの今の大きさ
	public readonly resolution: MTP.Vector;

	// true なら最終出力を uiBuffer に留め canvas へ出さない（エディタが重ね描きしてから出す）
	public readonly offscreen: boolean;

	public readonly renderTarget: RenderCameraTarget;
	public readonly deferredRenderer: DeferredRenderer;
	public readonly pipelinePostProcess: PipelinePostProcess;

	private _backend: GLBackend;
	private _pipelineOverride: PipelineConfig | null;
	private _sceneConfig: PipelineConfig;
	private _onDispose: ( view: RenderView ) => void;

	// シーンカメラの PostProcessPipeline の宣言から組んだ、このビュー専用の実体と、組んだときの宣言の配列
	private _userPostProcess: PostProcess | null;
	private _userPostProcessParams: PostProcessPipelinePassParam[] | null;

	constructor( params: RenderViewParams ) {

		this.camera = null;
		this.size = null;
		this.resolution = new MTP.Vector();
		this.offscreen = params.offscreen;
		this._backend = params.backend;
		this._pipelineOverride = null;
		this._userPostProcess = null;
		this._userPostProcessParams = null;
		this._sceneConfig = params.sceneConfig;
		this._onDispose = params.onDispose;

		this.renderTarget = createRenderTarget( params.backend );

		this.deferredRenderer = new DeferredRenderer( {
			backend: params.backend,
			envMap: params.envMap,
			envMapCube: params.envMapCube,
			renderTarget: this.renderTarget,
		} );

		this.pipelinePostProcess = new PipelinePostProcess( params.backend, this.renderTarget );

		this.fit( params.resolution );

		this.applyPipelineConfig();

	}

	public get pipelineOverride() {

		return this._pipelineOverride;

	}

	public set pipelineOverride( override: PipelineConfig | null ) {

		this._pipelineOverride = override;
		this.applyPipelineConfig();

	}

	// シーン設定に上書きを重ねた実効値をパスへ流す
	public applyPipelineConfig() {

		const config = { ...this._sceneConfig, ...this._pipelineOverride };

		this.deferredRenderer.setPassEnabled( {
			ssao: config.ssao,
			lightShaft: config.lightShaft,
			ssr: config.ssr,
			sss: config.sss,
		} );
		this.deferredRenderer.setSSSRadius( config.sssRadius ?? 0.05 );
		this.pipelinePostProcess.setPassEnabled( {
			toneMap: config.toneMap,
			motionBlur: config.motionBlur,
			dof: config.dof,
			bloom: config.bloom,
		} );

		this.pipelinePostProcess.setMotionBlurPower( config.motionBlurPower ?? 1 );
		this.pipelinePostProcess.setExposure( config.exposure ?? 0 );
		this.pipelinePostProcess.setBloomParams( config.bloomThreshold ?? 1, config.bloomBrightness ?? 1 );

	}

	// 中間バッファを指定の大きさにする。GLPowerFrameBuffer.setSize は同じ大きさでも作り直すので、変わったときだけ呼ぶ
	public fit( resolution: MTP.Vector ) {

		if ( resolution.x <= 0 || resolution.y <= 0 ) return;

		if ( this.resolution.x === resolution.x && this.resolution.y === resolution.y ) return;

		this.resize( resolution );

	}

	public resize( resolution: MTP.Vector ) {

		this.resolution.copy( resolution );

		const rt = this.renderTarget;

		rt.gBuffer.setSize( resolution );
		rt.shadingBuffer.setSize( resolution );
		rt.forwardBuffer.setSize( resolution );
		rt.refractionBuffer.setSize( resolution );
		rt.prevSceneBuffer.setSize( resolution );
		rt.uiBuffer.setSize( resolution );
		rt.normalBuffer.setSize( resolution );

		this.deferredRenderer.resize( resolution );
		this.pipelinePostProcess.resize( resolution );

		if ( this._userPostProcess ) {

			this._userPostProcess.resize( resolution );

		}

	}

	// PostProcessPipeline の宣言から、このビュー専用の実体を組んで返す。宣言の配列が差し替わったときだけ組み直す
	public fitUserPostProcess( params: PostProcessPipelinePassParam[] | null ) {

		if ( params === this._userPostProcessParams ) return this._userPostProcess;

		this._disposeUserPostProcess();

		this._userPostProcessParams = params;

		if ( ! params || params.length === 0 ) return null;

		const passes: PostProcessPass[] = [];

		for ( const param of params ) {

			// 描画のたびに uBackBuffer0 などをパスの uniforms へ書き込むので、ビュー間で共有しないよう入れ物だけ複製する
			passes.push( new PostProcessPass( this._backend, { ...param, uniforms: { ...param.uniforms } } ) );

		}

		this._userPostProcess = new PostProcess( { passes } );
		this._userPostProcess.resize( this.resolution );

		return this._userPostProcess;

	}

	private _disposeUserPostProcess() {

		const postProcess = this._userPostProcess;

		if ( ! postProcess ) return;

		for ( const pass of postProcess.passes ) {

			const renderTarget = pass.renderTarget;

			if ( ! renderTarget ) continue;

			for ( const texture of renderTarget.textures ) texture.dispose();

			renderTarget.dispose();

		}

		postProcess.dispose();

		this._userPostProcess = null;

	}

	public dispose() {

		this._onDispose( this );

		const rt = this.renderTarget;

		// forwardBuffer は gBuffer / shadingBuffer のテクスチャを借りているので、FBO だけ捨てる
		rt.forwardBuffer.dispose();

		const owners = [ rt.gBuffer, rt.shadingBuffer, rt.refractionBuffer, rt.prevSceneBuffer, rt.uiBuffer, rt.normalBuffer ];

		for ( let i = 0; i < owners.length; i ++ ) {

			const fb = owners[ i ];

			for ( let j = 0; j < fb.textures.length; j ++ ) fb.textures[ j ].dispose();

			fb.dispose();

		}

		if ( rt.gBuffer.depthTexture ) rt.gBuffer.depthTexture.dispose();

		this.deferredRenderer.dispose();
		this.pipelinePostProcess.dispose();
		this._disposeUserPostProcess();

	}

}
