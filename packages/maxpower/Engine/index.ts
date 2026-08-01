import type { Backend } from '../Backend';
import type { Entity, EntityParams } from '../Entity';

export interface Engine {
	readonly backend: Backend;
	createEntity( params?: Omit<EntityParams, 'engine'> ): Entity;
}
