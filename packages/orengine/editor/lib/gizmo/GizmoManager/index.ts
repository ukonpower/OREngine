import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { Gizmo, GizmoMode } from '../Gizmo';
import { RotateGizmo } from '../Gizmo/RotateGizmo';
import { ScaleGizmo } from '../Gizmo/ScaleGizmo';
import { TranslateGizmo } from '../Gizmo/TranslateGizmo';

import type { TransformOrientation } from '../../transform/TransformUtils';

export class GizmoManager {

	private _draw: MXP.EditorDrawContract;
	private _translateGizmo: TranslateGizmo;
	private _rotateGizmo: RotateGizmo;
	private _scaleGizmo: ScaleGizmo;
	private _activeGizmo: Gizmo | null;
	private _mode: GizmoMode;
	private _orientation: TransformOrientation;
	private _showGizmo: boolean;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		this._draw = draw;
		this._translateGizmo = new TranslateGizmo( engine, draw );
		this._rotateGizmo = new RotateGizmo( engine, draw );
		this._scaleGizmo = new ScaleGizmo( engine, draw );
		this._mode = 'select';
		this._orientation = 'global';
		this._activeGizmo = null;
		this._showGizmo = true;

	}

	public get showGizmo() {

		return this._showGizmo;

	}

	public set showGizmo( v: boolean ) {

		this._showGizmo = v;

	}

	public get activeGizmo(): Gizmo | null {

		return this._activeGizmo;

	}

	public get mode() {

		return this._mode;

	}

	public setMode( v: GizmoMode ) {

		this._mode = v;

		if ( v === 'translate' ) this._activeGizmo = this._translateGizmo;
		else if ( v === 'rotate' ) this._activeGizmo = this._rotateGizmo;
		else if ( v === 'scale' ) this._activeGizmo = this._scaleGizmo;
		else this._activeGizmo = null;

	}

	public get orientation() {

		return this._orientation;

	}

	public setOrientation( v: TransformOrientation ) {

		this._orientation = v;

	}

	public render( selectedEntity: MXP.Entity | null, cameraEntity: MXP.Entity | null, engine: Engine ) {

		this._translateGizmo.entity.visible = false;
		this._rotateGizmo.entity.visible = false;
		this._scaleGizmo.entity.visible = false;

		// 非表示中は visible も立てないので、ポインタ側のヒット判定もここで一緒に死ぬ
		if ( ! this._showGizmo ) return;

		if ( ! this._activeGizmo ) return;

		this._activeGizmo.setTarget( selectedEntity || null, cameraEntity, this._orientation );

		if ( ! this._activeGizmo.entity.visible ) return;

		this._activeGizmo.entity.updateMatrix( true );

		const event = engine.createEntityUpdateEvent();
		this._activeGizmo.entity.update( event );

		if ( ! cameraEntity ) return;

		const gizmoEntities: MXP.Entity[] = [];

		this._activeGizmo.entity.traverse( ( child ) => {

			const mesh = child.getComponent( MXP.Mesh );

			// マテリアルを持たないメッシュはヒット判定専用なので描かない
			if ( mesh && mesh.material ) {

				gizmoEntities.push( child );

			}

		} );

		if ( gizmoEntities.length > 0 ) {

			this._draw.renderEntities( {
				camera: cameraEntity,
				entities: gizmoEntities,
				target: null,
			} );

		}

	}

}
