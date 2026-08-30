import type { Entity, EntityUpdateEvent } from '../../Entity';
import type { Serializable } from '../../Serializable';
import type { RenderViewContract } from '../RenderViewContract';
import type { TexProceduralContract, TexProceduralParam } from '../TexProceduralContract';
import type * as BSP from 'basepower';
import type * as MTP from 'mathpower';

// バックエンドごとのRendererが満たす口。EntityUpdateEvent.renderer としてComponentも触る
export interface RendererContract extends Serializable {

	globalUniforms: BSP.Uniforms;
	readonly resolution: MTP.Vector;
	readonly canvas: HTMLCanvasElement;

	// 画面中心にあるシーンのビュー空間深度（オートフォーカス用）。
	// シーンカメラで描いたビューの直近値で、非同期リードバックのため数フレーム遅れる。
	// 未対応バックエンドは undefined、中心に何も描かれていないフレームは null
	readonly centerDepth?: number | null;

	createView(): RenderViewContract;

	// フレーム1回。シーン全体で共有する資源（ライト・シャドウ・環境マップ）を更新する
	prepareScene( root: Entity, event: EntityUpdateEvent ): void;

	// view の視点でシーンを view の出力バッファへ描く（canvas には出さない）
	render( view: RenderViewContract, event: EntityUpdateEvent ): void;

	// view の出力を自分の canvas へ出す
	present( view: RenderViewContract ): void;

	resize( resolution: MTP.Vector ): void;

	// .tex（プロシージャルテクスチャ）をバックエンド固有の実装で組み立てる
	createTexProcedural( param: TexProceduralParam ): TexProceduralContract;

}
