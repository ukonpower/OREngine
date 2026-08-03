import type { Entity, EntityUpdateEvent } from '../../Entity';
import type { Serializable } from '../../Serializable';
import type * as GLP from 'glpower';

// バックエンドごとのRendererが満たす口。EntityUpdateEvent.renderer としてComponentも触る
export interface RendererContract extends Serializable {

	globalUniforms: GLP.Uniforms;
	readonly resolution: GLP.Vector;
	readonly canvas: HTMLCanvasElement;

	render( root: Entity, camera: Entity, event: EntityUpdateEvent ): void;
	resize( resolution: GLP.Vector ): void;

}
