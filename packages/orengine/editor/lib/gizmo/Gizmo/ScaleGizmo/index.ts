import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { GizmoAxis, GizmoDragResult, GizmoHandle, GizmoPlane } from '..';
import { getAxisWorldDir, getWorldQuaternion, intersectRayPlane, projectRayOnLine, TransformOrientation } from '../../../transform/TransformUtils';
import { AXIS_COLORS, GizmoBase, PLANE_AXES, PLANE_NORMAL_AXIS } from '../GizmoBase';

// 軸ハンドルの寸法。中心付近を空けて中心ハンドル・平面ハンドルと取り合わないようにする
const SHAFT_START = 0.25;
const SHAFT_END = 0.85;
const SHAFT_RADIUS = 0.02;
const HEAD_SIZE = 0.1;

// スケール倍率の下限。0 で行列が潰れるのを防ぐ（符号は通すのでミラーはできる）
const MIN_SCALE_RATIO = 0.001;

// 比率の分母の下限。中心ぴったりを掴んだときの発散を防ぐ
const MIN_START_AMOUNT = 1e-4;

const AXES: readonly GizmoAxis[] = [ 'x', 'y', 'z' ];
const PLANES: readonly GizmoPlane[] = [ 'xy', 'yz', 'xz' ];

// 回転済みオブジェクトをグローバル軸でスケールすると TRS で表現できないシアーになるため、
// このギズモは orientation を無視して常にローカル軸で表示・ドラッグする（Blender との意図的な差異）
export class ScaleGizmo extends GizmoBase {

	private _centerRoot: MXP.Entity;
	private _dragStartPos: GLP.Vector;
	private _dragAxisDir: GLP.Vector;
	private _dragStartAmount: number;
	private _dragPlaneNormal: GLP.Vector;
	private _dragStartScale: GLP.Vector;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		super( engine, draw, '__gizmo_scale' );

		this._dragStartPos = new GLP.Vector();
		this._dragAxisDir = new GLP.Vector( 1, 0, 0 );
		this._dragStartAmount = 1;
		this._dragPlaneNormal = new GLP.Vector( 0, 0, 1 );
		this._dragStartScale = new GLP.Vector( 1, 1, 1 );

		for ( const axis of AXES ) this._addAxisHandle( axis );
		for ( const plane of PLANES ) this._addPlaneHandle( plane );

		this._centerRoot = this._addCenterHandle();

	}

	// 軸ハンドル（シャフト+立方体ヘッド）。+Y向きに組んでから軸の向きへ回す
	private _addAxisHandle( axis: GizmoAxis ) {

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

		const head = this._addVisual( root, new MXP.CubeGeometry( {
			width: HEAD_SIZE,
			height: HEAD_SIZE,
			depth: HEAD_SIZE,
		} ), color );

		head.position.set( 0, SHAFT_END + HEAD_SIZE / 2, 0 );

		const hitShaft = this._addHit( root, new MXP.CylinderGeometry( {
			radiusTop: 0.07, radiusBottom: 0.07,
			height: shaftLength, radSegments: 6, heightSegments: 1, caps: true,
		} ) );

		hitShaft.position.copy( shaft.position );

		const hitHead = this._addHit( root, new MXP.CubeGeometry( {
			width: HEAD_SIZE * 2, height: HEAD_SIZE * 2, depth: HEAD_SIZE * 2,
		} ) );

		hitHead.position.copy( head.position );

		if ( axis === 'x' ) root.euler.set( 0, 0, - Math.PI / 2 );
		else if ( axis === 'z' ) root.euler.set( Math.PI / 2, 0, 0 );

	}

	protected _rootQuaternion( entity: MXP.Entity, _orientation: TransformOrientation ): GLP.Quaternion {

		return getWorldQuaternion( entity );

	}

	protected _onTargetUpdated(): void {

		this._centerRoot.quaternion.copy( this._billboardQuat() );

	}

	protected _onStartDrag( handle: GizmoHandle, ray: MXP.Ray, targetEntity: MXP.Entity ): void {

		// ドラッグ中も setTarget が毎フレーム走るので、基準は開始時のものに固定する
		this._dragStartPos.copy( this.entity.position );
		this._dragStartScale.set( targetEntity.scale.x, targetEntity.scale.y, targetEntity.scale.z );

		if ( handle === 'x' || handle === 'y' || handle === 'z' ) {

			this._dragAxisDir = getAxisWorldDir( targetEntity, handle, 'local' );

			const t = projectRayOnLine( ray, this._dragStartPos, this._dragAxisDir );

			this._dragStartAmount = Math.abs( t ) < MIN_START_AMOUNT ? MIN_START_AMOUNT : t;

			return;

		}

		// 平面ハンドルは法線軸に垂直な面、中心はビュー平面上で、中心からの距離の比を倍率にする
		this._dragPlaneNormal = handle === 'center'
			? ray.origin.clone().sub( this._dragStartPos ).normalize()
			: getAxisWorldDir( targetEntity, PLANE_NORMAL_AXIS[ handle as GizmoPlane ], 'local' );

		const hit = intersectRayPlane( ray, this._dragStartPos, this._dragPlaneNormal );
		const dist = hit ? hit.sub( this._dragStartPos ).length() : 0;

		this._dragStartAmount = Math.max( MIN_START_AMOUNT, dist );

	}

	public updateDrag( ray: MXP.Ray, _targetEntity: MXP.Entity ): GizmoDragResult | null {

		if ( ! this.dragging || ! this.activeHandle ) return null;

		const handle = this.activeHandle;

		let ratio: number;

		if ( handle === 'x' || handle === 'y' || handle === 'z' ) {

			// 軸ハンドルは中心を跨ぐと符号が反転する（ミラー）
			ratio = projectRayOnLine( ray, this._dragStartPos, this._dragAxisDir ) / this._dragStartAmount;

		} else {

			const hit = intersectRayPlane( ray, this._dragStartPos, this._dragPlaneNormal );

			if ( ! hit ) return null;

			ratio = hit.sub( this._dragStartPos ).length() / this._dragStartAmount;

		}

		if ( Math.abs( ratio ) < MIN_SCALE_RATIO ) ratio = ratio < 0 ? - MIN_SCALE_RATIO : MIN_SCALE_RATIO;

		const inConstraint: Record<GizmoAxis, boolean> = { x: false, y: false, z: false };

		if ( handle === 'center' ) {

			inConstraint.x = inConstraint.y = inConstraint.z = true;

		} else if ( handle === 'x' || handle === 'y' || handle === 'z' ) {

			inConstraint[ handle ] = true;

		} else {

			for ( const axis of PLANE_AXES[ handle as GizmoPlane ] ) inConstraint[ axis ] = true;

		}

		return {
			scale: new GLP.Vector(
				this._dragStartScale.x * ( inConstraint.x ? ratio : 1 ),
				this._dragStartScale.y * ( inConstraint.y ? ratio : 1 ),
				this._dragStartScale.z * ( inConstraint.z ? ratio : 1 ),
			),
		};

	}

}
