import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { GizmoAxis, GizmoDragResult, GizmoHandle, GizmoPlane } from '..';
import { getAxisWorldDir, intersectRayPlane, projectRayOnLine } from '../../../transform/TransformUtils';
import { AXIS_COLORS, GizmoBase, PLANE_NORMAL_AXIS } from '../GizmoBase';

// 矢印の寸法。中心付近を空けて中心ハンドル・平面ハンドルと取り合わないようにする
const SHAFT_START = 0.25;
const SHAFT_END = 0.85;
const SHAFT_RADIUS = 0.02;
const HEAD_LENGTH = 0.22;
const HEAD_RADIUS = 0.06;

const AXES: readonly GizmoAxis[] = [ 'x', 'y', 'z' ];
const PLANES: readonly GizmoPlane[] = [ 'xy', 'yz', 'xz' ];

export class TranslateGizmo extends GizmoBase {

	private _centerRoot: MXP.Entity;
	private _dragStartPos: MTP.Vector;
	private _dragAxisDir: MTP.Vector;
	private _dragStartProjection: number;
	private _dragPlaneNormal: MTP.Vector;
	private _dragPlaneStart: MTP.Vector | null;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		super( engine, draw, '__gizmo_translate' );

		this._dragStartPos = new MTP.Vector();
		this._dragAxisDir = new MTP.Vector( 1, 0, 0 );
		this._dragStartProjection = 0;
		this._dragPlaneNormal = new MTP.Vector( 0, 0, 1 );
		this._dragPlaneStart = null;

		for ( const axis of AXES ) this._addArrowHandle( axis );
		for ( const plane of PLANES ) this._addPlaneHandle( plane );

		this._centerRoot = this._addCenterHandle();

	}

	// 軸ハンドル（シャフト+円錐ヘッド）。+Y向きに組んでから軸の向きへ回す
	private _addArrowHandle( axis: GizmoAxis ) {

		const root = this._createEntity( '__gizmo_axis_' + axis );
		const color = this._registerHandle( axis, root, AXIS_COLORS[ axis ] );

		const shaftLength = SHAFT_END - SHAFT_START;

		const shaft = this._addVisual( root, new MXP.CylinderGeometry( {
			radiusTop: SHAFT_RADIUS,
			radiusBottom: SHAFT_RADIUS,
			height: shaftLength,
			radSegments: 8,
			heightSegments: 1,
			caps: false,
		} ), color );

		shaft.position.set( 0, SHAFT_START + shaftLength / 2, 0 );

		const head = this._addVisual( root, new MXP.CylinderGeometry( {
			radiusTop: 0.001,
			radiusBottom: HEAD_RADIUS,
			height: HEAD_LENGTH,
			radSegments: 8,
			heightSegments: 1,
			caps: true,
		} ), color );

		head.position.set( 0, SHAFT_END + HEAD_LENGTH / 2, 0 );

		const hitShaft = this._addHit( root, new MXP.CylinderGeometry( {
			radiusTop: 0.07, radiusBottom: 0.07,
			height: shaftLength, radSegments: 6, heightSegments: 1, caps: true,
		} ) );

		hitShaft.position.copy( shaft.position );

		const hitHead = this._addHit( root, new MXP.CylinderGeometry( {
			radiusTop: 0.001, radiusBottom: 0.11,
			height: HEAD_LENGTH * 1.5, radSegments: 6, heightSegments: 1, caps: true,
		} ) );

		hitHead.position.copy( head.position );

		if ( axis === 'x' ) root.euler.set( 0, 0, - Math.PI / 2 );
		else if ( axis === 'z' ) root.euler.set( Math.PI / 2, 0, 0 );

	}

	protected _onTargetUpdated(): void {

		this._centerRoot.quaternion.copy( this._billboardQuat() );

	}

	protected _onStartDrag( handle: GizmoHandle, ray: MXP.Ray, targetEntity: MXP.Entity ): void {

		// ドラッグ中も setTarget が毎フレーム走るので、基準は開始時のものに固定する
		this._dragStartPos.copy( this.entity.position );
		this._dragPlaneStart = null;

		if ( handle === 'x' || handle === 'y' || handle === 'z' ) {

			this._dragAxisDir = getAxisWorldDir( targetEntity, handle, this._orientation );
			this._dragStartProjection = projectRayOnLine( ray, this._dragStartPos, this._dragAxisDir );

			return;

		}

		// 平面ハンドルは法線軸に垂直な面、中心はビュー平面（カメラへ向く面）を滑らせる
		this._dragPlaneNormal = handle === 'center'
			? ray.origin.clone().sub( this._dragStartPos ).normalize()
			: getAxisWorldDir( targetEntity, PLANE_NORMAL_AXIS[ handle as GizmoPlane ], this._orientation );

		this._dragPlaneStart = intersectRayPlane( ray, this._dragStartPos, this._dragPlaneNormal );

	}

	public updateDrag( ray: MXP.Ray, _targetEntity: MXP.Entity ): GizmoDragResult | null {

		if ( ! this.dragging || ! this.activeHandle ) return null;

		const handle = this.activeHandle;

		if ( handle === 'x' || handle === 'y' || handle === 'z' ) {

			const delta = projectRayOnLine( ray, this._dragStartPos, this._dragAxisDir ) - this._dragStartProjection;

			return { position: this._dragStartPos.clone().add( this._dragAxisDir.clone().multiply( delta ) ) };

		}

		if ( ! this._dragPlaneStart ) return null;

		const hit = intersectRayPlane( ray, this._dragStartPos, this._dragPlaneNormal );

		if ( ! hit ) return null;

		return { position: this._dragStartPos.clone().add( hit.sub( this._dragPlaneStart ) ) };

	}

}
