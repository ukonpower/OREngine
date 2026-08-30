import * as MTP from 'mathpower';

import { RenderTargets } from '../RenderTargets';

import type { PipelineConfig, RenderViewContract } from '../../../core/Contracts/RenderViewContract';
import type { Entity } from '../../../core/Entity';
import type { UniformBinder } from '../../backend/UniformBinder';
import type { PipelinePostProcess } from '../PipelinePostProcess';
import type * as BSP from 'basepower';

type RenderViewParams = {
	// Renderer のシーン設定と同じオブジェクト（Renderer 側で書き換わる）。上書きと合成した実効値をパスへ流す
	sceneConfig: PipelineConfig;
	onDispose: ( view: RenderView ) => void;
}

// 視点ごとの描画資源。中間バッファ・履歴を持つポストプロセス・カメラ行列の uniform・
// それらを参照する bind group をまとめて持ち、GPU 資源の組み立ては Renderer が行う。
// カメラ行列をビュー別バッファにするのは、writeBuffer が即時・エンコーダは submit 時実行で、
// 1本のバッファを書き換えると全ビューが最後の行列で描かれてしまうため
export class RenderView implements RenderViewContract {

	public camera: Entity | null;

	public readonly targets: RenderTargets;
	public pipeline: PipelinePostProcess | null;

	// frame（時間は globalUniforms から、カメラ行列はこのビューのカメラから入る）
	public readonly frameUniforms: BSP.Uniforms;
	public frameBinder: UniformBinder | null;
	public frameBindGroup: GPUBindGroup | null;

	// 中間バッファを参照する bind group。サイズ変更・シェーダー差し替えで作り直す
	public gBufferBindGroup: GPUBindGroup | null;
	public gBufferLightShaftView: GPUTextureView | null;
	public refractionBindGroup: GPUBindGroup | null;

	// 最終出力（present の元・エディタの重ね描き先）と、それを読む bind group（参照先が変わったら作り直す）
	public outputView: GPUTextureView | null;
	public outputBindGroup: GPUBindGroup | null;
	public outputBindGroupSource: GPUTextureView | null;

	// オートフォーカス用の中心深度リードバック
	public focusReadbackBuffer: GPUBuffer | null;
	public focusReadbackBusy: boolean;
	public focusReadbackEncoded: boolean;
	public readonly focusViewMatrix: MTP.Matrix;
	public readonly focusPosition: MTP.Vector;
	public centerDepth: number | null;

	private _pipelineOverride: PipelineConfig | null;
	private _sceneConfig: PipelineConfig;
	private _onDispose: ( view: RenderView ) => void;

	constructor( params: RenderViewParams ) {

		this.camera = null;
		this._pipelineOverride = null;
		this._sceneConfig = params.sceneConfig;
		this._onDispose = params.onDispose;

		this.targets = new RenderTargets();
		this.pipeline = null;

		this.frameUniforms = {
			uCameraNear: { value: 0.1, type: '1f' },
			uCameraFar: { value: 1000, type: '1f' },
			uCameraPosition: { value: new MTP.Vector(), type: '3fv' },
			uViewMatrix: { value: new MTP.Matrix(), type: 'Matrix4fv' },
			uProjectionMatrix: { value: new MTP.Matrix(), type: 'Matrix4fv' },
			uProjectionMatrixInverse: { value: new MTP.Matrix(), type: 'Matrix4fv' },
			uCameraMatrix: { value: new MTP.Matrix(), type: 'Matrix4fv' },
			uViewMatrixPrev: { value: new MTP.Matrix(), type: 'Matrix4fv' },
			uProjectionMatrixPrev: { value: new MTP.Matrix(), type: 'Matrix4fv' },
		};
		this.frameBinder = null;
		this.frameBindGroup = null;

		this.gBufferBindGroup = null;
		this.gBufferLightShaftView = null;
		this.refractionBindGroup = null;
		this.outputView = null;
		this.outputBindGroup = null;
		this.outputBindGroupSource = null;

		this.focusReadbackBuffer = null;
		this.focusReadbackBusy = false;
		this.focusReadbackEncoded = false;
		this.focusViewMatrix = new MTP.Matrix();
		this.focusPosition = new MTP.Vector();
		this.centerDepth = null;

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

		this.pipeline?.applyPipelineConfig( { ...this._sceneConfig, ...this._pipelineOverride } );

	}

	public dispose() {

		this._onDispose( this );

		this.targets.dispose();
		this.pipeline?.dispose();
		this.pipeline = null;
		this.frameBinder?.dispose();
		this.frameBinder = null;
		this.focusReadbackBuffer?.destroy();
		this.focusReadbackBuffer = null;

	}

}
