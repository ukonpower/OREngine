import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { EntityHelper, HelperType } from '../Helpers/EntityHelper';

export class HelperManager {

	private _engine: Engine;
	private _draw: MXP.EditorDrawContract;
	private _showHelpers: boolean;
	private _showEmptyHelpers: boolean;
	private _showCameraHelpers: boolean;
	private _showLightHelpers: boolean;
	private _helpers: Map<string, EntityHelper>;

	constructor( engine: Engine, draw: MXP.EditorDrawContract ) {

		this._engine = engine;
		this._draw = draw;
		this._showHelpers = true;
		this._showEmptyHelpers = true;
		this._showCameraHelpers = true;
		this._showLightHelpers = true;
		this._helpers = new Map();

	}

	public get showHelpers() {

		return this._showHelpers;

	}

	public set showHelpers( v: boolean ) {

		this._showHelpers = v;

	}

	public get showEmptyHelpers() {

		return this._showEmptyHelpers;

	}

	public set showEmptyHelpers( v: boolean ) {

		this._showEmptyHelpers = v;

	}

	public get showCameraHelpers() {

		return this._showCameraHelpers;

	}

	public set showCameraHelpers( v: boolean ) {

		this._showCameraHelpers = v;

	}

	public get showLightHelpers() {

		return this._showLightHelpers;

	}

	public set showLightHelpers( v: boolean ) {

		this._showLightHelpers = v;

	}

	public render( cameraEntity: MXP.Entity | null, engine: Engine, selectedEntityId: string | null ) {

		if ( ! this._showHelpers ) return;

		if ( ! cameraEntity ) return;

		const activeUUIDs = new Set<string>();
		const helperEntities: MXP.Entity[] = [];

		engine.root.traverse( ( entity ) => {

			if ( entity.initiator === "god" ) return;
			if ( ! entity.visible ) return;

			// 視点にしているカメラ自身のヘルパーは画面を覆うだけなので出さない
			if ( entity === cameraEntity ) return;

			const helperType = this._getHelperType( entity );
			if ( ! helperType ) return;
			if ( ! this._isHelperTypeEnabled( helperType ) ) return;

			activeUUIDs.add( entity.uuid );

			let helper = this._helpers.get( entity.uuid );

			if ( ! helper ) {

				helper = new EntityHelper( this._engine, this._draw, helperType, entity.uuid );
				this._helpers.set( entity.uuid, helper );

			}

			const event = engine.createEntityUpdateEvent();
			helper.entity.update( event );
			helper.hitAreaEntity.update( event );

			helper.setSelected( entity.uuid === selectedEntityId );
			helper.syncTransform( entity );

			helper.entity.traverse( ( child ) => {

				if ( child.getComponent( MXP.Mesh ) ) {

					helperEntities.push( child );

				}

			} );

		} );

		this._helpers.forEach( ( _, uuid ) => {

			if ( ! activeUUIDs.has( uuid ) ) {

				this._helpers.delete( uuid );

			}

		} );

		if ( helperEntities.length > 0 ) {

			this._draw.renderEntities( {
				camera: cameraEntity,
				entities: helperEntities,
				target: null,
			} );

		}

	}

	public getHitAreaEntities(): { hitEntity: MXP.Entity, targetEntityUUID: string }[] {

		const result: { hitEntity: MXP.Entity, targetEntityUUID: string }[] = [];

		this._helpers.forEach( ( helper ) => {

			result.push( {
				hitEntity: helper.hitAreaEntity,
				targetEntityUUID: helper.targetEntityUUID,
			} );

		} );

		return result;

	}

	private _getHelperType( entity: MXP.Entity ): HelperType | null {

		const light = entity.getComponent( MXP.Light );

		if ( light ) {

			return light.lightType === 'spot' ? 'spotLight' : 'directionalLight';

		}

		const camera = entity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( camera ) return 'camera';

		const mesh = entity.getComponent( MXP.Mesh );

		if ( ! mesh ) return 'empty';

		return null;

	}

	private _isHelperTypeEnabled( type: HelperType ): boolean {

		switch ( type ) {

		case 'empty': return this._showEmptyHelpers;
		case 'camera': return this._showCameraHelpers;
		case 'spotLight':
		case 'directionalLight': return this._showLightHelpers;

		}

	}

}
