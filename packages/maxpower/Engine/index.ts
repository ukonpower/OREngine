import type { Entity, EntityParams } from '../Entity';

export interface Engine {
	createEntity( params?: Omit<EntityParams, 'engine'> ): Entity;
}
