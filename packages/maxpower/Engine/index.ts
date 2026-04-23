import type { Entity, EntityParams } from '../Entity';

export interface Engine {
	readonly gl: WebGL2RenderingContext;
	createEntity( params?: Omit<EntityParams, 'engine'> ): Entity;
}
