import { randomUUID } from 'crypto';

import type { SceneFileData, SceneDataEntity, SceneDataComponent, EntityTreeResponse, EntityDetailResponse } from '../Project/types';

export class SceneDataEditor {

	private _data: SceneFileData;

	constructor( data: SceneFileData ) {

		this._data = data;

	}

	// --- 読み取り系 ---

	getScene(): EntityTreeResponse {

		return this._buildSceneTree( this._data.scene );

	}

	getEntity( uuid: string ): EntityDetailResponse {

		const entity = this._findEntity( uuid );

		if ( ! entity ) throw new Error( `Entity not found: ${uuid}` );

		const parentInfo = this._findEntityParent( uuid );

		return {
			uuid: entity.uuid,
			name: entity.name,
			position: this._toXYZ( entity.pos ),
			euler: this._toXYZ( entity.rot ),
			scale: this._toXYZ( entity.scale, 1 ),
			components: ( entity.components || [] ).map( c => ( {
				uuid: c.uuid,
				name: c.name,
				fields: c.props || {},
			} ) ),
			childrenCount: entity.childs?.length || 0,
			parentUuid: parentInfo?.parent.uuid ?? null,
		};

	}

	searchEntities( query: string ): unknown[] {

		const q = query.toLowerCase();
		const results: unknown[] = [];

		this._traverse( this._data.scene, ( entity, parent ) => {

			if ( entity.name.toLowerCase().includes( q ) ) {

				results.push( {
					uuid: entity.uuid,
					name: entity.name,
					parentUuid: parent?.uuid ?? null,
					components: ( entity.components || [] ).map( c => c.name ),
				} );

			}

		} );

		return results;

	}

	// --- 書き込み系 ---

	createEntity( parentUuid: string, name: string ): { uuid: string; name: string } {

		const parent = this._findEntity( parentUuid );

		if ( ! parent ) throw new Error( `Parent entity not found: ${parentUuid}` );

		const uuid = this._allocUuid();

		const newEntity: SceneDataEntity = {
			name,
			uuid,
		};

		if ( ! parent.childs ) parent.childs = [];
		parent.childs.push( newEntity );

		return { uuid, name };

	}

	deleteEntity( uuid: string ): void {

		if ( uuid === this._data.scene.uuid ) throw new Error( 'Cannot delete root entity' );

		const parentInfo = this._findEntityParent( uuid );

		if ( ! parentInfo ) throw new Error( `Entity not found: ${uuid}` );

		parentInfo.parent.childs!.splice( parentInfo.index, 1 );

	}

	addComponent( entityUuid: string, componentName: string ): { uuid: string; componentName: string } {

		const entity = this._findEntity( entityUuid );

		if ( ! entity ) throw new Error( `Entity not found: ${entityUuid}` );

		if ( ! entity.components ) entity.components = [];

		// 同名コンポーネントが既存なら置換（削除→追加）
		const existingIndex = entity.components.findIndex( c => c.name === componentName );

		if ( existingIndex !== - 1 ) {

			entity.components.splice( existingIndex, 1 );

		}

		const uuid = this._allocUuid();

		entity.components.push( {
			name: componentName,
			uuid,
		} );

		return { uuid, componentName };

	}

	removeComponent( entityUuid: string, componentName: string ): void {

		const entity = this._findEntity( entityUuid );

		if ( ! entity ) throw new Error( `Entity not found: ${entityUuid}` );

		if ( ! entity.components ) throw new Error( `Component ${componentName} not found on entity` );

		const index = entity.components.findIndex( c => c.name === componentName );

		if ( index === - 1 ) throw new Error( `Component ${componentName} not found on entity` );

		entity.components.splice( index, 1 );

	}

	setField( targetUuid: string, fieldPath: string, value: unknown ): void {

		// エンティティのtransformフィールド
		const entity = this._findEntity( targetUuid );

		if ( entity ) {

			this._setEntityField( entity, fieldPath, value );
			return;

		}

		// コンポーネントのpropsフィールド
		const compInfo = this._findComponentByUuid( targetUuid );

		if ( compInfo ) {

			if ( ! compInfo.component.props ) compInfo.component.props = {};
			compInfo.component.props[ fieldPath ] = value;
			return;

		}

		throw new Error( `Serializable not found: ${targetUuid}` );

	}

	// --- ヘルパー ---

	private _allocUuid(): string {

		return randomUUID();

	}

	private _findEntity( uuid: string ): SceneDataEntity | null {

		return this._traverseFind( this._data.scene, ( e ) => e.uuid === uuid );

	}

	private _findEntityParent( uuid: string ): { parent: SceneDataEntity; index: number } | null {

		return this._traverseFindParent( this._data.scene, uuid );

	}

	private _findComponentByUuid( uuid: string ): { entity: SceneDataEntity; component: SceneDataComponent; index: number } | null {

		let result: { entity: SceneDataEntity; component: SceneDataComponent; index: number } | null = null;

		this._traverse( this._data.scene, ( entity ) => {

			if ( result ) return;

			if ( entity.components ) {

				for ( let i = 0; i < entity.components.length; i ++ ) {

					if ( entity.components[ i ].uuid === uuid ) {

						result = { entity, component: entity.components[ i ], index: i };
						return;

					}

				}

			}

		} );

		return result;

	}

	private _setEntityField( entity: SceneDataEntity, fieldPath: string, value: unknown ): void {

		switch ( fieldPath ) {

		case 'name':
			entity.name = String( value );
			break;

		case 'position':
			entity.pos = this._toArray( value );
			break;

		case 'euler':
			entity.rot = this._toArray( value );
			break;

		case 'scale':
			entity.scale = this._toArray( value );
			break;

		default:
			throw new Error( `Unknown entity field: ${fieldPath}` );

		}

	}

	private _toArray( value: unknown ): number[] {

		if ( Array.isArray( value ) ) return value as number[];

		if ( value && typeof value === 'object' ) {

			const v = value as Record<string, number>;
			return [ v.x ?? 0, v.y ?? 0, v.z ?? 0 ];

		}

		return [ 0, 0, 0 ];

	}

	private _toXYZ( arr?: number[], defaultVal = 0 ): { x: number; y: number; z: number } {

		if ( ! arr ) return { x: defaultVal, y: defaultVal, z: defaultVal };
		return { x: arr[ 0 ] ?? defaultVal, y: arr[ 1 ] ?? defaultVal, z: arr[ 2 ] ?? defaultVal };

	}

	private _buildSceneTree( entity: SceneDataEntity ): EntityTreeResponse {

		return {
			uuid: entity.uuid,
			name: entity.name,
			position: this._toXYZ( entity.pos ),
			euler: this._toXYZ( entity.rot ),
			scale: this._toXYZ( entity.scale, 1 ),
			components: ( entity.components || [] ).map( c => ( { uuid: c.uuid, name: c.name } ) ),
			children: ( entity.childs || [] ).map( c => this._buildSceneTree( c ) ),
		};

	}

	private _traverse(
		entity: SceneDataEntity,
		callback: ( entity: SceneDataEntity, parent: SceneDataEntity | null ) => void,
		parent: SceneDataEntity | null = null,
	): void {

		callback( entity, parent );

		if ( entity.childs ) {

			for ( const child of entity.childs ) {

				this._traverse( child, callback, entity );

			}

		}

	}

	private _traverseFind(
		entity: SceneDataEntity,
		predicate: ( entity: SceneDataEntity ) => boolean,
	): SceneDataEntity | null {

		if ( predicate( entity ) ) return entity;

		if ( entity.childs ) {

			for ( const child of entity.childs ) {

				const found = this._traverseFind( child, predicate );
				if ( found ) return found;

			}

		}

		return null;

	}

	private _traverseFindParent(
		entity: SceneDataEntity,
		targetUuid: string,
	): { parent: SceneDataEntity; index: number } | null {

		if ( entity.childs ) {

			for ( let i = 0; i < entity.childs.length; i ++ ) {

				if ( entity.childs[ i ].uuid === targetUuid ) {

					return { parent: entity, index: i };

				}

				const found = this._traverseFindParent( entity.childs[ i ], targetUuid );
				if ( found ) return found;

			}

		}

		return null;

	}

}
