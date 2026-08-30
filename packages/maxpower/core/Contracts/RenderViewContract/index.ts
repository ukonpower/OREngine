import type { Entity } from '../../Entity';

// ポストエフェクトの有効/無効。シーン設定（Renderer）と、ビューが一時的に被せる上書き（RenderView）で同じ型を使う
export type PipelineConfig = {
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// lightShaft の細かい調整（WebGPU バックエンドのみ。WebGL は無視する）
	lightShaftIntensity?: number;
	lightShaftBlur?: boolean;
	lightShaftTemporal?: boolean;
	lightShaftTemporalBlend?: number;
};

// createView の指定。offscreen のビューは最終出力を自分のバッファに留め、canvas へは出さない
// （エディタが重ね描きしてから任意の canvas へ写すため）。省略時は render の最後で renderer の canvas に出る
export type RenderViewOptions = {
	offscreen?: boolean;
};

// 視点ごとの描画資源（G-Buffer・ポストプロセスの履歴RT）とその視点の設定。
// シーン全体で共有する資源（ライト・シャドウ・環境マップ）は Renderer が持つ
export interface RenderViewContract {

	// null = シーンの displayOut カメラで描く
	camera: Entity | null;

	// シーン設定に触れずに一時的に被せるパイプライン設定（null で解除）
	pipelineOverride: PipelineConfig | null;

	dispose(): void;

}
