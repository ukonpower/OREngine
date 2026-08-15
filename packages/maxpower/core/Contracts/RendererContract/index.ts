import type { Entity, EntityUpdateEvent } from '../../Entity';
import type { Serializable } from '../../Serializable';
import type { TexProceduralContract, TexProceduralParam } from '../TexProceduralContract';
import type * as BSP from 'basepower';
import type * as MTP from 'mathpower';

// バックエンドごとのRendererが満たす口。EntityUpdateEvent.renderer としてComponentも触る
export interface RendererContract extends Serializable {

	globalUniforms: BSP.Uniforms;
	readonly resolution: MTP.Vector;
	readonly canvas: HTMLCanvasElement;

	// 画面中心にあるシーンのビュー空間深度（オートフォーカス用）。
	// 非同期リードバックのため数フレーム遅れる。未対応バックエンドは undefined、
	// 中心に何も描かれていないフレームは null
	readonly centerDepth?: number | null;

	render( root: Entity, camera: Entity, event: EntityUpdateEvent ): void;
	resize( resolution: MTP.Vector ): void;

	// .tex（プロシージャルテクスチャ）をバックエンド固有の実装で組み立てる
	createTexProcedural( param: TexProceduralParam ): TexProceduralContract;

}
