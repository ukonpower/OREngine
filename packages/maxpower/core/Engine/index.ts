import type { Entity, EntityParams, EntityUpdateEvent } from '../Entity';
import type { Serializable } from '../Serializable';
import type * as GLP from 'glpower';

// Engineがレンダラーに要求する口。バックエンドごとのRendererがこれを満たす
export interface RendererContract extends Serializable {

	globalUniforms: GLP.Uniforms;
	readonly resolution: GLP.Vector;
	readonly canvas: HTMLCanvasElement;

	render( root: Entity, camera: Entity, event: EntityUpdateEvent ): void;
	resize( resolution: GLP.Vector ): void;

}

export interface Engine<TRenderer extends RendererContract = RendererContract> {
	readonly renderer: TRenderer;
	createEntity( params?: Omit<EntityParams, 'engine'> ): Entity;
}
