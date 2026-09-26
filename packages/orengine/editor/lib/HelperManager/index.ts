import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';
import { EntityHelper, HelperType } from '../Helpers/EntityHelper';

// ヘルパーの表示フラグ。ビューポートごとに持つ（Editor の ViewportSettings.helpers の一部）
export type HelperVisibility = {
	show: boolean;
	empty: boolean;
	camera: boolean;
	light: boolean;
};

// シーン中のエンティティに対応するヘルパーを保持し、ビューごとの表示フラグで絞って描く
export class HelperManager {

	private _engine: Engine;
	private _draw: MXP.EditorDrawContract;
	private _helpers: Map<string, EntityHelper>;

	constructor( engine: Engine, draw: MXP.EditorDrawContract ) {

		this._engine = engine;
		this._draw = draw;
		this._helpers = new Map();

	}

	// ヘルパーの生成・破棄と姿勢の同期を1フレームに1回行う。
	// 表示フラグはビューごとに違うので、ここでは絞らず全種類を用意する（絞ると別ビューの描画のたびに作り直しになる）
	public sync( engine: Engine, selectedEntityId: string | null ) {

		const activeUUIDs = new Set<string>();

		engine.root.traverse( ( entity ) => {

			if ( entity.initiator === "god" ) return;
			if ( ! entity.visible ) return;

			const helperType = this._getHelperType( entity );
			if ( ! helperType ) return;

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

		} );

		this._helpers.forEach( ( _, uuid ) => {

			if ( ! activeUUIDs.has( uuid ) ) {

				this._helpers.delete( uuid );

			}

		} );

	}

	public render( view: MXP.RenderViewContract, cameraEntity: MXP.Entity | null, visibility: HelperVisibility ) {

		if ( ! cameraEntity ) return;

		const helperEntities: MXP.Entity[] = [];

		for ( const helper of this._helpers.values() ) {

			if ( ! this.isVisible( helper, visibility ) ) continue;

			// 視点にしているカメラ自身のヘルパーは画面を覆うだけなので出さない
			if ( helper.targetEntityUUID === cameraEntity.uuid ) continue;

			helper.entity.traverse( ( child ) => {

				if ( child.getComponent( MXP.Mesh ) ) {

					helperEntities.push( child );

				}

			} );

		}

		if ( helperEntities.length > 0 ) {

			this._draw.renderEntities( {
				view,
				camera: cameraEntity,
				entities: helperEntities,
				target: null,
			} );

		}

	}

	public getHelpers(): EntityHelper[] {

		return Array.from( this._helpers.values() );

	}

	// ヘルパーがその表示フラグで描かれるか。ポインタのヒット判定も同じ基準で絞る
	public isVisible( helper: EntityHelper, visibility: HelperVisibility ): boolean {

		if ( ! visibility.show ) return false;

		switch ( helper.type ) {

		case 'empty': return visibility.empty;
		case 'camera': return visibility.camera;
		case 'spotLight':
		case 'directionalLight': return visibility.light;

		}

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

}
