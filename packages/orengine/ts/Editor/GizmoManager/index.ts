import * as MXP from 'maxpower';

import { Engine } from '../../Engine';
import { Gizmo, GizmoMode } from '../Gizmo';
import { RotateGizmo } from '../Gizmo/RotateGizmo';
import { ScaleGizmo } from '../Gizmo/ScaleGizmo';
import { TranslateGizmo } from '../Gizmo/TranslateGizmo';

export class GizmoManager {

	private _translateGizmo: TranslateGizmo;
	private _rotateGizmo: RotateGizmo;
	private _scaleGizmo: ScaleGizmo;
	private _activeGizmo: Gizmo | null;
	private _mode: GizmoMode;

	constructor() {

		this._translateGizmo = new TranslateGizmo();
		this._rotateGizmo = new RotateGizmo();
		this._scaleGizmo = new ScaleGizmo();
		this._mode = 'select';
		this._activeGizmo = null;

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

	public render( selectedEntity: MXP.Entity | null, cameraEntity: MXP.Entity | null, engine: Engine ) {

		this._translateGizmo.entity.visible = false;
		this._rotateGizmo.entity.visible = false;
		this._scaleGizmo.entity.visible = false;

		if ( ! this._activeGizmo ) return;

		this._activeGizmo.setTarget( selectedEntity || null, cameraEntity );

		if ( ! this._activeGizmo.entity.visible ) return;

		this._activeGizmo.entity.updateMatrix( true );

		const event = engine.createEntityUpdateEvent();
		this._activeGizmo.entity.update( event );

		if ( ! cameraEntity ) return;

		const gizmoEntities: MXP.Entity[] = [];

		this._activeGizmo.entity.traverse( ( child ) => {

			const mesh = child.getComponent( MXP.Mesh );

			if ( mesh && mesh.material && mesh.material.visibilityFlag.forward ) {

				gizmoEntities.push( child );

			}

		} );

		if ( gizmoEntities.length > 0 ) {

			engine.renderer.renderCamera(
				"forward",
				cameraEntity,
				gizmoEntities,
				engine.renderer.renderTarget.uiBuffer,
				engine.renderer.resolution,
				{ disableClear: true }
			);

		}

	}

}
