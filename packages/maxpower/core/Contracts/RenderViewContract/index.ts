import type { Entity } from '../../Entity';
import type * as MTP from 'mathpower';

// ポストエフェクトの有効/無効。シーン設定（Renderer）と、ビューが一時的に被せる上書き（RenderView）で同じ型を使う
export type PipelineConfig = {
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// ACES トーンマップ。オフだとシェーダーで書いた色がそのまま画面へ出る
	toneMap?: boolean;
	// 露出（EV）。トーンマップの直前で色に 2^exposure を掛ける（Blender の Color Management > Exposure と同じ意味）。toneMap がオフだと掛からない
	exposure?: number;
	// ブルームの輝度抽出はトーンマップ前の HDR から行うので、しきい値は HDR の値で指定する
	bloom?: boolean;
	bloomThreshold?: number;
	bloomBrightness?: number;
	// SSS（肌の表面下散乱）。albedo.w に強さを書いたディファードの物体の diffuse をぼかす。
	// 半径はシーン全体で1つで、ワールド単位の散乱距離
	sss?: boolean;
	sssRadius?: number;
};

// readRenderImage で読み戻せる途中の絵の名前。バックエンドごとのパスのラベルに頼らず、同じ名前で同じ段の絵を指す。
// lit: 光の計算を終えた HDR・リニアの絵。不透明・透明の forward まで重ね、DoF・モーションブラー・ブルーム・トーンマップ・linear→sRGB の前
export type RenderImageName = 'lit';

// 読み戻す画素の矩形。原点は左下（WebGL の readPixels と同じ向き）
export type PixelRect = {
	x: number;
	y: number;
	width: number;
	height: number;
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

	// このビューの描画解像度。null = renderer の解像度に追従する。
	// エディタの Screen パネルごとに解像度スケールを変えるため、ビュー単位で持てるようにしている
	size: MTP.Vector | null;

	dispose(): void;

}
