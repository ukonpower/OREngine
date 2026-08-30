import * as GLP from 'glpower';
import * as MTP from 'mathpower';

import { Entity } from '../../../core/Entity';
import { GL, GLBackend } from '../../backend/GLBackend';
import { DeferredRenderer } from '../DeferredRenderer';
import { PipelinePostProcess } from '../PipelinePostProcess';

import type { PipelineConfig, RenderViewContract } from '../../../core/Contracts/RenderViewContract';

export type RenderCameraTarget = {
	gBuffer: GLP.GLPowerFrameBuffer,
	shadingBuffer: GLP.GLPowerFrameBuffer,
	forwardBuffer: GLP.GLPowerFrameBuffer,
	refractionBuffer: GLP.GLPowerFrameBuffer,
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
	onDispose: ( view: RenderView ) => void;
}

const createRenderTarget = ( backend: GLBackend ): RenderCameraTarget => {

	const gBuffer = backend.createFrameBuffer();
	gBuffer.setTexture( [
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA, magFilter: GL.NEAREST, minFilter: GL.NEAREST } ),
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA } ),
		backend.createTexture(),
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

	const uiBuffer = backend.createFrameBuffer( { disableDepthBuffer: true } );
	uiBuffer.setDepthTexture( gBuffer.depthTexture );
	uiBuffer.setTexture( [ backend.createTexture() ] );

	const normalBuffer = backend.createFrameBuffer();
	normalBuffer.setTexture( [
		backend.createTexture().setting( { type: GL.FLOAT, internalFormat: GL.RGBA32F, format: GL.RGBA, magFilter: GL.NEAREST, minFilter: GL.NEAREST } )
	] );

	return { gBuffer, shadingBuffer, forwardBuffer, refractionBuffer, uiBuffer, normalBuffer };

};

// 視点ごとの描画資源。G-Buffer と、時間的に蓄積するポストプロセス（SSAO / LightShaft / SSR の履歴）は
// 視点が違うと混ざるので、ビュー単位で持つ
export class RenderView implements RenderViewContract {

	public camera: Entity | null;
	public readonly renderTarget: RenderCameraTarget;
	public readonly deferredRenderer: DeferredRenderer;
	public readonly pipelinePostProcess: PipelinePostProcess;

	private _pipelineOverride: PipelineConfig | null;
	private _sceneConfig: PipelineConfig;
	private _onDispose: ( view: RenderView ) => void;

	constructor( params: RenderViewParams ) {

		this.camera = null;
		this._pipelineOverride = null;
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

		if ( params.resolution.x > 0 && params.resolution.y > 0 ) {

			this.resize( params.resolution );

		}

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
		} );
		this.pipelinePostProcess.setPassEnabled( {
			motionBlur: config.motionBlur,
			ssr: config.ssr,
			dof: config.dof,
		} );

		this.pipelinePostProcess.setMotionBlurPower( config.motionBlurPower ?? 1 );

	}

	public resize( resolution: MTP.Vector ) {

		const rt = this.renderTarget;

		rt.gBuffer.setSize( resolution );
		rt.shadingBuffer.setSize( resolution );
		rt.forwardBuffer.setSize( resolution );
		rt.refractionBuffer.setSize( resolution );
		rt.uiBuffer.setSize( resolution );
		rt.normalBuffer.setSize( resolution );

		this.deferredRenderer.resize( resolution );
		this.pipelinePostProcess.resize( resolution );

	}

	public dispose() {

		this._onDispose( this );

		const rt = this.renderTarget;

		// forwardBuffer は gBuffer / shadingBuffer のテクスチャを借りているので、FBO だけ捨てる
		rt.forwardBuffer.dispose();

		const owners = [ rt.gBuffer, rt.shadingBuffer, rt.refractionBuffer, rt.uiBuffer, rt.normalBuffer ];

		for ( let i = 0; i < owners.length; i ++ ) {

			const fb = owners[ i ];

			for ( let j = 0; j < fb.textures.length; j ++ ) fb.textures[ j ].dispose();

			fb.dispose();

		}

		if ( rt.gBuffer.depthTexture ) rt.gBuffer.depthTexture.dispose();

		this.deferredRenderer.dispose();
		this.pipelinePostProcess.dispose();

	}

}
