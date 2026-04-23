import { Engine, Entity, EntityParams } from 'maxpower';

export function createMockEngine(): Engine {

	const engine: Engine = {
		createEntity: ( params ) => new Entity( { ...params, engine } ),
	};

	return engine;

}

export const mockEngine = createMockEngine();

export function createTestEntity( params?: Omit<EntityParams, 'engine'> ): Entity {

	return mockEngine.createEntity( params );

}
