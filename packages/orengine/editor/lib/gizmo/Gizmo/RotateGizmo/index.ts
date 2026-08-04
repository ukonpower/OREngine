import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Gizmo, GizmoAxis, GizmoDragResult } from '..';
import { composeLocalQuat, getAxisWorldDir, getWorldQuaternion, intersectRayPlane, quaternionFromAxisAngle, TransformOrientation } from '../../../transform/TransformUtils';

export class RotateGizmo implements Gizmo {

	private static readonly BASE_SCALE_FACTOR = 0.15;

	// 回転面内で角度を測る基準軸の組。atan2( dot( p, v ), dot( p, u ) ) が回転軸まわりの右ねじ角になる（u × v = 回転軸）
	private static readonly PLANE_AXES: Record<GizmoAxis, { u: GizmoAxis, v: GizmoAxis }> = {
		x: { u: 'y', v: 'z' },
		y: { u: 'z', v: 'x' },
		z: { u: 'x', v: 'y' },
	};

	private _engine: MXP.EngineContract;
	private _draw: MXP.EditorDrawContract;
	public entity: MXP.Entity;
	private _xRing: MXP.Entity;
	private _yRing: MXP.Entity;
	private _zRing: MXP.Entity;
	private _orientation: TransformOrientation;
	private _activeAxis: GizmoAxis | null;
	private _dragging: boolean;
	private _dragStartAngle: number;
	private _dragAxisU: GLP.Vector;
	private _dragAxisV: GLP.Vector;
	private _dragAxisN: GLP.Vector;
	private _dragStartWorldQuat: GLP.Quaternion;
	private _parentWorldQuatInv: GLP.Quaternion;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		this._engine = engine;
		this._draw = draw;
		this.entity = engine.createEntity( { name: "__gizmo_rotate" } );
		this.entity.initiator = "god";
		this.entity.visible = false;

		this._orientation = 'global';
		this._activeAxis = null;
		this._dragging = false;
		this._dragStartAngle = 0;
		this._dragAxisU = new GLP.Vector( 1, 0, 0 );
		this._dragAxisV = new GLP.Vector( 0, 1, 0 );
		this._dragAxisN = new GLP.Vector( 0, 0, 1 );
		this._dragStartWorldQuat = new GLP.Quaternion();
		this._parentWorldQuatInv = new GLP.Quaternion();

		this._xRing = this._createRing( 'x', [ 1.0, 0.2, 0.2 ] );
		this._yRing = this._createRing( 'y', [ 0.2, 1.0, 0.2 ] );
		this._zRing = this._createRing( 'z', [ 0.4, 0.4, 1.0 ] );

		this.entity.add( this._xRing );
		this.entity.add( this._yRing );
		this.entity.add( this._zRing );

	}

	private _createRing( axis: GizmoAxis, color: number[] ): MXP.Entity {

		const wrapperEntity = this._engine.createEntity( { name: "__gizmo_ring_wrapper" } );
		wrapperEntity.initiator = "god";

		const ringEntity = this._engine.createEntity( { name: "__gizmo_ring" } );
		ringEntity.initiator = "god";

		const geo = new MXP.RingGeometry( {
			innerRadius: 0.75,
			outerRadius: 0.8,
			thetaSegments: 32,
			phiSegments: 1,
		} );

		const mat = this._draw.materials.flat( { color, depthTest: false, depthWrite: false } );

		ringEntity.addComponent( MXP.Mesh, { geometry: geo, material: mat } );

		// hit area
		const hitRing = this._engine.createEntity( { name: "__gizmo_hit_ring" } );
		hitRing.initiator = "god";
		const hitGeo = new MXP.RingGeometry( {
			innerRadius: 0.6, outerRadius: 0.95,
			thetaSegments: 32, phiSegments: 1,
		} );
		hitRing.addComponent( MXP.Mesh, { geometry: hitGeo } );

		wrapperEntity.add( ringEntity );
		wrapperEntity.add( hitRing );

		// RingGeometryはXY平面に生成される
		// x軸回転用: YZ平面 → Y軸周りに90度回転
		// y軸回転用: XZ平面 → X軸周りに90度回転
		// z軸回転用: XY平面 → そのまま
		if ( axis === 'x' ) {

			wrapperEntity.euler.set( 0, Math.PI / 2, 0 );

		} else if ( axis === 'y' ) {

			wrapperEntity.euler.set( Math.PI / 2, 0, 0 );

		}

		return wrapperEntity;

	}

	public setTarget( entity: MXP.Entity | null, cameraEntity: MXP.Entity | null, orientation: TransformOrientation ): void {

		this._orientation = orientation;

		if ( entity ) {

			this.entity.visible = true;

			// root を回すと表示メッシュもヒット用メッシュも子として一緒に向く
			if ( orientation === 'local' ) {

				this.entity.quaternion.copy( getWorldQuaternion( entity ) );

			} else {

				this.entity.quaternion.set( 0, 0, 0, 1 );

			}

			this.entity.position.set(
				entity.matrixWorld.elm[ 12 ],
				entity.matrixWorld.elm[ 13 ],
				entity.matrixWorld.elm[ 14 ]
			);

			if ( cameraEntity ) {

				const camX = cameraEntity.matrixWorld.elm[ 12 ];
				const camY = cameraEntity.matrixWorld.elm[ 13 ];
				const camZ = cameraEntity.matrixWorld.elm[ 14 ];
				const dx = this.entity.position.x - camX;
				const dy = this.entity.position.y - camY;
				const dz = this.entity.position.z - camZ;
				const dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
				const s = Math.max( 0.01, dist * RotateGizmo.BASE_SCALE_FACTOR );
				this.entity.scale.set( s, s, s );

			}

		} else {

			this.entity.visible = false;

		}

	}

	public getAxisEntities(): { axis: GizmoAxis, entity: MXP.Entity }[] {

		const result: { axis: GizmoAxis, entity: MXP.Entity }[] = [];

		const collectHitEntities = ( ringWrapper: MXP.Entity, axis: GizmoAxis ) => {

			ringWrapper.traverse( ( child ) => {

				const mesh = child.getComponent( MXP.Mesh );

				if ( mesh && ! mesh.material ) {

					result.push( { axis, entity: child } );

				}

			} );

		};

		collectHitEntities( this._xRing, 'x' );
		collectHitEntities( this._yRing, 'y' );
		collectHitEntities( this._zRing, 'z' );

		return result;

	}

	public get activeAxis(): GizmoAxis | null {

		return this._activeAxis;

	}

	public get dragging(): boolean {

		return this._dragging;

	}

	public startDrag( axis: GizmoAxis, ray: MXP.Ray, targetEntity: MXP.Entity ): void {

		this._activeAxis = axis;
		this._dragging = true;

		// ドラッグ中もリングは setTarget で向きが更新されるので、回転面は開始時のものに固定する
		const plane = RotateGizmo.PLANE_AXES[ axis ];
		this._dragAxisU = getAxisWorldDir( targetEntity, plane.u, this._orientation );
		this._dragAxisV = getAxisWorldDir( targetEntity, plane.v, this._orientation );
		this._dragAxisN = getAxisWorldDir( targetEntity, axis, this._orientation );

		this._dragStartAngle = this._getAngleFromRay( ray ) ?? 0;
		this._dragStartWorldQuat = getWorldQuaternion( targetEntity );
		this._parentWorldQuatInv = targetEntity.parent
			? getWorldQuaternion( targetEntity.parent ).inverse()
			: new GLP.Quaternion();

	}

	public updateDrag( ray: MXP.Ray, _targetEntity: MXP.Entity ): GizmoDragResult | null {

		if ( ! this._dragging || ! this._activeAxis ) return null;

		const currentAngle = this._getAngleFromRay( ray );

		if ( currentAngle === null ) return null;

		// ワールド空間の回転増分として合成する。euler へのローカル加算だとリングの見た目と実際の回転軸がずれる
		const deltaQ = quaternionFromAxisAngle( this._dragAxisN, currentAngle - this._dragStartAngle );
		const localQuat = composeLocalQuat( this._parentWorldQuatInv, deltaQ, this._dragStartWorldQuat );

		return { euler: new GLP.Euler().setFromQuaternion( localQuat ) };

	}

	public endDrag(): void {

		this._activeAxis = null;
		this._dragging = false;

	}

	// 回転面（開始時に固定した u / v / n）上でのポインタの角度。視線が面と平行なら null
	private _getAngleFromRay( ray: MXP.Ray ): number | null {

		const hit = intersectRayPlane( ray, this.entity.position, this._dragAxisN );

		if ( ! hit ) return null;

		const local = hit.sub( this.entity.position );

		return Math.atan2( local.dot( this._dragAxisV ), local.dot( this._dragAxisU ) );

	}

}
