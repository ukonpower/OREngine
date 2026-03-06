import crypto from 'crypto';

import type { SceneDataEntity, SceneDataComponent, EntityTreeResponse, EntityDetailResponse } from '../types';

export class EntityStore {

	// --- 検索 ---

	findEntity( root: SceneDataEntity, uuid: string ): SceneDataEntity | null {

		if ( root.uuid === uuid ) return root;

		if ( root.childs ) {

			for ( const child of root.childs ) {

				const found = this.findEntity( child, uuid );

				if ( found ) return found;

			}

		}

		return null;

	}

	findParent( root: SceneDataEntity, uuid: string ): SceneDataEntity | null {

		if ( root.childs ) {

			for ( const child of root.childs ) {

				if ( child.uuid === uuid ) return root;

				const found = this.findParent( child, uuid );

				if ( found ) return found;

			}

		}

		return null;

	}

	findComponent( root: SceneDataEntity, componentUuid: string ): { entity: SceneDataEntity; component: SceneDataComponent } | null {

		if ( root.components ) {

			for ( const comp of root.components ) {

				if ( comp.uuid === componentUuid ) return { entity: root, component: comp };

			}

		}

		if ( root.childs ) {

			for ( const child of root.childs ) {

				const found = this.findComponent( child, componentUuid );

				if ( found ) return found;

			}

		}

		return null;

	}

	searchEntities( root: SceneDataEntity, query: string ): { uuid: string; name: string; parentUuid: string | null; components: string[] }[] {

		const results: { uuid: string; name: string; parentUuid: string | null; components: string[] }[] = [];
		const q = query.toLowerCase();

		this._traverse( root, null, ( entity, parentUuid ) => {

			if ( entity.name.toLowerCase().includes( q ) ) {

				results.push( {
					uuid: entity.uuid,
					name: entity.name,
					parentUuid,
					components: ( entity.components || [] ).map( c => c.name ),
				} );

			}

		} );

		return results;

	}

	// --- Entity 操作 ---

	createEntity( root: SceneDataEntity, parentUuid: string, name: string ): SceneDataEntity {

		const parent = this.findEntity( root, parentUuid );

		if ( ! parent ) throw new Error( `Parent entity not found: ${parentUuid}` );

		const newEntity: SceneDataEntity = {
			name: name || 'New Entity',
			uuid: crypto.randomUUID(),
		};

		if ( ! parent.childs ) parent.childs = [];

		parent.childs.push( newEntity );

		return newEntity;

	}

	deleteEntity( root: SceneDataEntity, uuid: string ): void {

		if ( root.uuid === uuid ) throw new Error( 'Cannot delete root entity' );

		const parent = this.findParent( root, uuid );

		if ( ! parent ) throw new Error( `Entity not found: ${uuid}` );

		parent.childs = ( parent.childs || [] ).filter( c => c.uuid !== uuid );

		if ( parent.childs.length === 0 ) delete parent.childs;

	}

	// --- Component 操作 ---

	addComponent( root: SceneDataEntity, entityUuid: string, componentName: string ): SceneDataComponent {

		const entity = this.findEntity( root, entityUuid );

		if ( ! entity ) throw new Error( `Entity not found: ${entityUuid}` );

		const comp: SceneDataComponent = {
			name: componentName,
			uuid: crypto.randomUUID(),
		};

		if ( ! entity.components ) entity.components = [];

		entity.components.push( comp );

		return comp;

	}

	removeComponent( root: SceneDataEntity, entityUuid: string, componentName: string ): void {

		const entity = this.findEntity( root, entityUuid );

		if ( ! entity ) throw new Error( `Entity not found: ${entityUuid}` );

		if ( ! entity.components ) throw new Error( `Component ${componentName} not found` );

		const idx = entity.components.findIndex( c => c.name === componentName );

		if ( idx === - 1 ) throw new Error( `Component ${componentName} not found` );

		entity.components.splice( idx, 1 );

		if ( entity.components.length === 0 ) delete entity.components;

	}

	// --- Field 操作 ---

	setField( root: SceneDataEntity, targetUuid: string, fieldPath: string, value: unknown ): void {

		// まず Entity を探す
		const entity = this.findEntity( root, targetUuid );

		if ( entity ) {

			this._setEntityField( entity, fieldPath, value );
			return;

		}

		// Component を探す
		const compResult = this.findComponent( root, targetUuid );

		if ( compResult ) {

			if ( ! compResult.component.props ) compResult.component.props = {};

			this._setNestedValue( compResult.component.props, fieldPath, value );
			return;

		}

		throw new Error( `Target not found: ${targetUuid}` );

	}

	// --- レスポンス変換 ---

	buildSceneTree( entity: SceneDataEntity ): EntityTreeResponse {

		const pos = entity.pos || [ 0, 0, 0 ];
		const rot = entity.rot || [ 0, 0, 0 ];
		const scl = entity.scale || [ 1, 1, 1 ];

		return {
			uuid: entity.uuid,
			name: entity.name,
			position: { x: pos[ 0 ], y: pos[ 1 ], z: pos[ 2 ] },
			euler: { x: rot[ 0 ], y: rot[ 1 ], z: rot[ 2 ] },
			scale: { x: scl[ 0 ], y: scl[ 1 ], z: scl[ 2 ] },
			components: ( entity.components || [] ).map( c => ( { uuid: c.uuid, name: c.name } ) ),
			children: ( entity.childs || [] ).map( c => this.buildSceneTree( c ) ),
		};

	}

	serializeEntity( root: SceneDataEntity, uuid: string ): EntityDetailResponse {

		const entity = this.findEntity( root, uuid );

		if ( ! entity ) throw new Error( `Entity not found: ${uuid}` );

		const parent = this.findParent( root, uuid );
		const pos = entity.pos || [ 0, 0, 0 ];
		const rot = entity.rot || [ 0, 0, 0 ];
		const scl = entity.scale || [ 1, 1, 1 ];

		return {
			uuid: entity.uuid,
			name: entity.name,
			position: { x: pos[ 0 ], y: pos[ 1 ], z: pos[ 2 ] },
			euler: { x: rot[ 0 ], y: rot[ 1 ], z: rot[ 2 ] },
			scale: { x: scl[ 0 ], y: scl[ 1 ], z: scl[ 2 ] },
			components: ( entity.components || [] ).map( c => ( {
				uuid: c.uuid,
				name: c.name,
				fields: c.props || {},
			} ) ),
			childrenCount: ( entity.childs || [] ).length,
			parentUuid: parent ? parent.uuid : null,
		};

	}

	// --- private ---

	private _traverse( entity: SceneDataEntity, parentUuid: string | null, fn: ( entity: SceneDataEntity, parentUuid: string | null ) => void ): void {

		fn( entity, parentUuid );

		if ( entity.childs ) {

			for ( const child of entity.childs ) {

				this._traverse( child, entity.uuid, fn );

			}

		}

	}

	private _setEntityField( entity: SceneDataEntity, fieldPath: string, value: unknown ): void {

		// Entity レベルのフィールド（name, pos, rot, scale）
		switch ( fieldPath ) {

			case 'name':
				entity.name = value as string;
				return;

			case 'pos':
			case 'position':
				entity.pos = value as number[];
				return;

			case 'rot':
			case 'rotation':
			case 'euler':
				entity.rot = value as number[];
				return;

			case 'scale':
				entity.scale = value as number[];
				return;

		}

	}

	private _setNestedValue( obj: Record<string, unknown>, path: string, value: unknown ): void {

		const keys = path.split( '/' ).filter( k => k.length > 0 );

		if ( keys.length === 0 ) return;

		let current: Record<string, unknown> = obj;

		for ( let i = 0; i < keys.length - 1; i ++ ) {

			if ( ! current[ keys[ i ] ] || typeof current[ keys[ i ] ] !== 'object' ) {

				current[ keys[ i ] ] = {};

			}

			current = current[ keys[ i ] ] as Record<string, unknown>;

		}

		current[ keys[ keys.length - 1 ] ] = value;

	}

}
