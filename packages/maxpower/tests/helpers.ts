import { Engine, Entity, EntityParams } from 'maxpower';

export function createMockEngine(): Engine {

	const engine: Engine = {
		gl: {} as WebGL2RenderingContext,
		createEntity: ( params ) => new Entity( { ...params, engine } ),
	};

	return engine;

}

export const mockEngine = createMockEngine();

export function createTestEntity( params?: Omit<EntityParams, 'engine'> ): Entity {

	return mockEngine.createEntity( params );

}
