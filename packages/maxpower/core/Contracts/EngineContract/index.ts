import type { Entity, EntityParams } from '../../Entity';
import type { RendererContract } from '../RendererContract';

// Entity / Component が所属先のエンジンに要求する口。実体は orengine の Engine
export interface EngineContract<TRenderer extends RendererContract = RendererContract> {
	readonly renderer: TRenderer;
	createEntity( params?: Omit<EntityParams, 'engine'> ): Entity;
}
