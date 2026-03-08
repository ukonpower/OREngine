import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gizmoVert from '../../shaders/gizmo.vs';
import gizmoFrag from '../../shaders/gizmo.fs';

import { Gizmo, GizmoAxis, GizmoDragResult, createHitAreaMaterial } from '..';

export class RotateGizmo implements Gizmo {

	private static readonly BASE_SCALE_FACTOR = 0.15;

	public entity: MXP.Entity;
	private _xRing: MXP.Entity;
	private _yRing: MXP.Entity;
	private _zRing: MXP.Entity;
	private _activeAxis: GizmoAxis | null;
	private _dragging: boolean;
	private _dragStartAngle: number;
	private _dragStartEuler: GLP.Vector;

	constructor() {

		this.entity = new MXP.Entity( { name: "__gizmo_rotate" } );
		this.entity.initiator = "god";
		this.entity.visible = false;

		this._activeAxis = null;
		this._dragging = false;
		this._dragStartAngle = 0;
		this._dragStartEuler = new GLP.Vector();

		this._xRing = this._createRing( 'x', [ 1.0, 0.2, 0.2 ] );
		this._yRing = this._createRing( 'y', [ 0.2, 1.0, 0.2 ] );
		this._zRing = this._createRing( 'z', [ 0.4, 0.4, 1.0 ] );

		this.entity.add( this._xRing );
		this.entity.add( this._yRing );
		this.entity.add( this._zRing );

	}

	private _createRing( axis: GizmoAxis, color: number[] ): MXP.Entity {

		const wrapperEntity = new MXP.Entity( { name: "__gizmo_ring_wrapper" } );
		wrapperEntity.initiator = "god";

		const ringEntity = new MXP.Entity( { name: "__gizmo_ring" } );
		ringEntity.initiator = "god";

		const geo = new MXP.RingGeometry( {
			innerRadius: 0.75,
			outerRadius: 0.8,
			thetaSegments: 32,
			phiSegments: 1,
		} );

		const mat = new MXP.Material( {
			vert: gizmoVert,
			frag: gizmoFrag,
			phase: [ "forward" ],
			depthTest: false,
			depthWrite: false,
			cullFace: false,
			uniforms: { uColor: { value: color, type: '3fv' } },
		} );

		ringEntity.addComponent( MXP.Mesh, { geometry: geo, material: mat } );

		// hit area
		const hitRing = new MXP.Entity( { name: "__gizmo_hit_ring" } );
		hitRing.initiator = "god";
		const hitGeo = new MXP.RingGeometry( {
			innerRadius: 0.6, outerRadius: 0.95,
			thetaSegments: 32, phiSegments: 1,
		} );
		const hitMat = createHitAreaMaterial();
		hitMat.cullFace = false;
		hitRing.addComponent( MXP.Mesh, { geometry: hitGeo, material: hitMat } );

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

	public setTarget( entity: MXP.Entity | null, cameraEntity: MXP.Entity | null ): void {

		if ( entity ) {

			this.entity.visible = true;
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

				if ( mesh && mesh.material && ! mesh.material.visibilityFlag.forward ) {

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
		this._dragStartAngle = this._getAngleFromRay( ray, axis );
		this._dragStartEuler.set( targetEntity.euler.x, targetEntity.euler.y, targetEntity.euler.z );

	}

	public updateDrag( ray: MXP.Ray, _targetEntity: MXP.Entity ): GizmoDragResult | null {

		if ( ! this._dragging || ! this._activeAxis ) return null;

		const currentAngle = this._getAngleFromRay( ray, this._activeAxis );
		const deltaAngle = currentAngle - this._dragStartAngle;

		const newEuler = this._dragStartEuler.clone();

		if ( this._activeAxis === 'x' ) newEuler.x += deltaAngle;
		else if ( this._activeAxis === 'y' ) newEuler.y += deltaAngle;
		else newEuler.z += deltaAngle;

		return { euler: newEuler };

	}

	public endDrag(): void {

		this._activeAxis = null;
		this._dragging = false;

	}

	private _getAngleFromRay( ray: MXP.Ray, axis: GizmoAxis ): number {

		const gizmoPos = this.entity.position;

		const normal = new GLP.Vector(
			axis === 'x' ? 1 : 0,
			axis === 'y' ? 1 : 0,
			axis === 'z' ? 1 : 0,
		);

		const denom = ray.direction.x * normal.x + ray.direction.y * normal.y + ray.direction.z * normal.z;

		if ( Math.abs( denom ) < 0.0001 ) return 0;

		const diffX = gizmoPos.x - ray.origin.x;
		const diffY = gizmoPos.y - ray.origin.y;
		const diffZ = gizmoPos.z - ray.origin.z;
		const t = ( diffX * normal.x + diffY * normal.y + diffZ * normal.z ) / denom;

		const hitX = ray.origin.x + ray.direction.x * t;
		const hitY = ray.origin.y + ray.direction.y * t;
		const hitZ = ray.origin.z + ray.direction.z * t;

		const localX = hitX - gizmoPos.x;
		const localY = hitY - gizmoPos.y;
		const localZ = hitZ - gizmoPos.z;

		if ( axis === 'x' ) return Math.atan2( localZ, localY );
		if ( axis === 'y' ) return Math.atan2( localX, localZ );
		return Math.atan2( localY, localX );

	}

}
