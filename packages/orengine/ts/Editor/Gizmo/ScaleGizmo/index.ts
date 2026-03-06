import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gizmoVert from '../../shaders/gizmo.vs';
import gizmoFrag from '../../shaders/gizmo.fs';

import { Gizmo, GizmoAxis, GizmoDragResult, createHitAreaMaterial } from '..';

export class ScaleGizmo implements Gizmo {

	private static readonly BASE_SCALE_FACTOR = 0.15;

	public entity: MXP.Entity;
	private _xAxis: MXP.Entity;
	private _yAxis: MXP.Entity;
	private _zAxis: MXP.Entity;
	private _activeAxis: GizmoAxis | null;
	private _dragging: boolean;
	private _dragStartPos: GLP.Vector;
	private _dragStartProjection: number;
	private _dragStartScale: GLP.Vector;

	constructor() {

		this.entity = new MXP.Entity( { name: "__gizmo_scale" } );
		this.entity.initiator = "god";
		this.entity.visible = false;

		this._activeAxis = null;
		this._dragging = false;
		this._dragStartPos = new GLP.Vector();
		this._dragStartProjection = 0;
		this._dragStartScale = new GLP.Vector();

		this._xAxis = this._createAxis( new GLP.Vector( 1, 0, 0 ), [ 1.0, 0.2, 0.2 ] );
		this._yAxis = this._createAxis( new GLP.Vector( 0, 1, 0 ), [ 0.2, 1.0, 0.2 ] );
		this._zAxis = this._createAxis( new GLP.Vector( 0, 0, 1 ), [ 0.4, 0.4, 1.0 ] );

		this.entity.add( this._xAxis );
		this.entity.add( this._yAxis );
		this.entity.add( this._zAxis );

	}

	private _createAxis( direction: GLP.Vector, color: number[] ): MXP.Entity {

		const axisEntity = new MXP.Entity( { name: "__gizmo_axis" } );
		axisEntity.initiator = "god";

		const shaftLength = 0.8;
		const shaftRadius = 0.015;
		const headSize = 0.08;

		// shaft
		const shaft = new MXP.Entity( { name: "__gizmo_shaft" } );
		shaft.initiator = "god";

		const shaftGeo = new MXP.CylinderGeometry( {
			radiusTop: shaftRadius,
			radiusBottom: shaftRadius,
			height: shaftLength,
			radSegments: 6,
			heightSegments: 1,
			caps: false,
		} );

		const shaftMat = new MXP.Material( {
			vert: gizmoVert,
			frag: gizmoFrag,
		} );

		shaftMat.uniforms.uColor = { value: color, type: '3fv' };
		shaftMat.depthTest = false;
		shaftMat.visibilityFlag = { deferred: false, forward: true, shadowMap: false, envMap: false, ui: false, postprocess: false };

		shaft.addComponent( MXP.Mesh, { geometry: shaftGeo, material: shaftMat } );
		shaft.position.set( direction.x * shaftLength / 2, direction.y * shaftLength / 2, direction.z * shaftLength / 2 );

		// head (cube)
		const head = new MXP.Entity( { name: "__gizmo_head" } );
		head.initiator = "god";

		const headGeo = new MXP.CubeGeometry( {
			width: headSize,
			height: headSize,
			depth: headSize,
		} );

		const headMat = new MXP.Material( {
			vert: gizmoVert,
			frag: gizmoFrag,
		} );

		headMat.uniforms.uColor = { value: color, type: '3fv' };
		headMat.depthTest = false;
		headMat.visibilityFlag = { deferred: false, forward: true, shadowMap: false, envMap: false, ui: false, postprocess: false };

		head.addComponent( MXP.Mesh, { geometry: headGeo, material: headMat } );
		head.position.set(
			direction.x * ( shaftLength + headSize / 2 ),
			direction.y * ( shaftLength + headSize / 2 ),
			direction.z * ( shaftLength + headSize / 2 )
		);

		// orient shaft along the axis direction
		if ( direction.x > 0.5 ) {

			shaft.euler.set( 0, 0, - Math.PI / 2 );

		} else if ( direction.z > 0.5 ) {

			shaft.euler.set( Math.PI / 2, 0, 0 );

		}

		// hit area - shaft
		const hitShaft = new MXP.Entity( { name: "__gizmo_hit_shaft" } );
		hitShaft.initiator = "god";
		const hitShaftGeo = new MXP.CylinderGeometry( {
			radiusTop: 0.06, radiusBottom: 0.06,
			height: shaftLength, radSegments: 6, heightSegments: 1, caps: true,
		} );
		hitShaft.addComponent( MXP.Mesh, { geometry: hitShaftGeo, material: createHitAreaMaterial() } );
		hitShaft.position.copy( shaft.position );
		hitShaft.euler.copy( shaft.euler );

		// hit area - head
		const hitHead = new MXP.Entity( { name: "__gizmo_hit_head" } );
		hitHead.initiator = "god";
		const hitHeadGeo = new MXP.CubeGeometry( {
			width: headSize * 2, height: headSize * 2, depth: headSize * 2,
		} );
		hitHead.addComponent( MXP.Mesh, { geometry: hitHeadGeo, material: createHitAreaMaterial() } );
		hitHead.position.copy( head.position );

		axisEntity.add( shaft );
		axisEntity.add( head );
		axisEntity.add( hitShaft );
		axisEntity.add( hitHead );

		return axisEntity;

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
				const s = Math.max( 0.01, dist * ScaleGizmo.BASE_SCALE_FACTOR );
				this.entity.scale.set( s, s, s );

			}

		} else {

			this.entity.visible = false;

		}

	}

	public getAxisEntities(): { axis: GizmoAxis, entity: MXP.Entity }[] {

		const result: { axis: GizmoAxis, entity: MXP.Entity }[] = [];

		const collectHitEntities = ( axisEntity: MXP.Entity, axis: GizmoAxis ) => {

			axisEntity.traverse( ( child ) => {

				const mesh = child.getComponent( MXP.Mesh );

				if ( mesh && mesh.material && ! mesh.material.visibilityFlag.forward ) {

					result.push( { axis, entity: child } );

				}

			} );

		};

		collectHitEntities( this._xAxis, 'x' );
		collectHitEntities( this._yAxis, 'y' );
		collectHitEntities( this._zAxis, 'z' );

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
		this._dragStartPos.copy( this.entity.position );
		this._dragStartProjection = this._getAxisProjection( ray, axis );
		this._dragStartScale.set( targetEntity.scale.x, targetEntity.scale.y, targetEntity.scale.z );

	}

	public updateDrag( ray: MXP.Ray, _targetEntity: MXP.Entity ): GizmoDragResult | null {

		if ( ! this._dragging || ! this._activeAxis ) return null;

		const currentProjection = this._getAxisProjection( ray, this._activeAxis );
		const delta = currentProjection - this._dragStartProjection;

		const newScale = this._dragStartScale.clone();

		if ( this._activeAxis === 'x' ) newScale.x += delta;
		else if ( this._activeAxis === 'y' ) newScale.y += delta;
		else newScale.z += delta;

		// スケールが0以下にならないように制限
		newScale.x = Math.max( 0.01, newScale.x );
		newScale.y = Math.max( 0.01, newScale.y );
		newScale.z = Math.max( 0.01, newScale.z );

		return { scale: newScale };

	}

	public endDrag(): void {

		this._activeAxis = null;
		this._dragging = false;

	}

	private _getAxisProjection( ray: MXP.Ray, axis: GizmoAxis ): number {

		const axisDir = new GLP.Vector(
			axis === 'x' ? 1 : 0,
			axis === 'y' ? 1 : 0,
			axis === 'z' ? 1 : 0,
		);

		const gizmoPos = this._dragStartPos;

		const diff = new GLP.Vector(
			ray.origin.x - gizmoPos.x,
			ray.origin.y - gizmoPos.y,
			ray.origin.z - gizmoPos.z,
		);

		const dotDirAxis = ray.direction.x * axisDir.x + ray.direction.y * axisDir.y + ray.direction.z * axisDir.z;
		const dotDiffAxis = diff.x * axisDir.x + diff.y * axisDir.y + diff.z * axisDir.z;

		const denom = 1.0 - dotDirAxis * dotDirAxis + 0.0001;
		const t = - dotDiffAxis / denom;

		return dotDiffAxis + t * dotDirAxis;

	}

}
