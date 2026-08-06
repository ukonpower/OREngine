import type { Entity, EntityUpdateEvent } from '../../Entity';
import type { Serializable } from '../../Serializable';
import type * as GLP from 'glpower';

// バックエンドごとのRendererが満たす口。EntityUpdateEvent.renderer としてComponentも触る
export interface RendererContract extends Serializable {

	globalUniforms: GLP.Uniforms;
	readonly resolution: GLP.Vector;
	readonly canvas: HTMLCanvasElement;

	// 画面中心にあるシーンのビュー空間深度（オートフォーカス用）。
	// 非同期リードバックのため数フレーム遅れる。未対応バックエンドは undefined、
	// 中心に何も描かれていないフレームは null
	readonly centerDepth?: number | null;

	render( root: Entity, camera: Entity, event: EntityUpdateEvent ): void;
	resize( resolution: GLP.Vector ): void;

}
