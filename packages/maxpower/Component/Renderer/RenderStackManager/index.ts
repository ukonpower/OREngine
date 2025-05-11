import { Entity } from '../../../Entity';
import { Camera } from '../../Camera';
import { RenderCamera } from '../../Camera/RenderCamera';
import { Light } from '../../Light';
import { Mesh } from '../../Mesh';

export type RenderStack = {
	light: Entity[];
	camera: Entity[];
	envMap: Entity[];
	shadowMap: Entity[];
	deferred: Entity[];
	forward: Entity[];
	ui: Entity[];
}

export class RenderStackManager {

	constructor() {}

	public getRenderStack( entity: Entity ): RenderStack {

		const stack: RenderStack = {
			camera: [],
			light: [],
			deferred: [],
			forward: [],
			ui: [],
			shadowMap: [],
			envMap: [],
		};

		const _ = ( event: {entity: Entity, visibility: boolean} ) => {

			const entity = event.entity;

			const visibility = ( event.visibility || event.visibility === undefined ) && entity.visible;
			const mesh = entity.getComponent( Mesh );

			if ( mesh && visibility ) {

				const material = mesh.material;

				if ( material.visibilityFlag.deferred ) stack.deferred.push( entity );
				if ( material.visibilityFlag.shadowMap ) stack.shadowMap.push( entity );
				if ( material.visibilityFlag.forward ) stack.forward.push( entity );
				if ( material.visibilityFlag.ui ) stack.ui.push( entity );
				if ( material.visibilityFlag.envMap ) stack.envMap.push( entity );

			}

			const camera = entity.getComponent( RenderCamera );

			if ( camera && camera.enabled ) {

				stack.camera.push( entity );

			}

			const light = entity.getComponent( Light );

			if ( light && light.enabled && visibility ) {

				stack.light.push( entity );

			}

			for ( let i = 0; i < entity.children.length; i ++ ) {

				_( {
					entity: entity.children[ i ],
					visibility
				} );

			}

			return stack;

		};

		_( { entity, visibility: true } );

		return stack;

	}

}
