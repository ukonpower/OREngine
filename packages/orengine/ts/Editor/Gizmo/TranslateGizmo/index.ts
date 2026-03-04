import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import gizmoVert from '../../shaders/gizmo.vs';
import gizmoFrag from '../../shaders/gizmo.fs';

type GizmoAxis = 'x' | 'y' | 'z';

export class TranslateGizmo {

	public entity: MXP.Entity;
	private _xAxis: MXP.Entity;
	private _yAxis: MXP.Entity;
	private _zAxis: MXP.Entity;
	private _activeAxis: GizmoAxis | null;
	private _dragging: boolean;
	private _dragStartPos: GLP.Vector;

	constructor() {

		this.entity = new MXP.Entity( { name: "__gizmo" } );
		this.entity.initiator = "god";
		this.entity.visible = false;

		this._activeAxis = null;
		this._dragging = false;
		this._dragStartPos = new GLP.Vector();

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
		const headLength = 0.2;
		const headRadius = 0.05;

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

		// head (cone-like cylinder)
		const head = new MXP.Entity( { name: "__gizmo_head" } );
		head.initiator = "god";

		const headGeo = new MXP.CylinderGeometry( {
			radiusTop: 0.001,
			radiusBottom: headRadius,
			height: headLength,
			radSegments: 6,
			heightSegments: 1,
			caps: true,
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
			direction.x * ( shaftLength + headLength / 2 ),
			direction.y * ( shaftLength + headLength / 2 ),
			direction.z * ( shaftLength + headLength / 2 )
		);

		// orient shaft and head along the axis direction
		if ( direction.x > 0.5 ) {

			shaft.euler.set( 0, 0, - Math.PI / 2 );
			head.euler.set( 0, 0, - Math.PI / 2 );

		} else if ( direction.z > 0.5 ) {

			shaft.euler.set( Math.PI / 2, 0, 0 );
			head.euler.set( Math.PI / 2, 0, 0 );

		}

		axisEntity.add( shaft );
		axisEntity.add( head );

		return axisEntity;

	}

	public setTarget( entity: MXP.Entity | null ): void {

		if ( entity ) {

			this.entity.visible = true;
			this.entity.position.set(
				entity.matrixWorld.elm[ 12 ],
				entity.matrixWorld.elm[ 13 ],
				entity.matrixWorld.elm[ 14 ]
			);

		} else {

			this.entity.visible = false;

		}

	}

	public getAxisEntities(): { axis: GizmoAxis, entity: MXP.Entity }[] {

		const result: { axis: GizmoAxis, entity: MXP.Entity }[] = [];

		const collectMeshEntities = ( axisEntity: MXP.Entity, axis: GizmoAxis ) => {

			axisEntity.traverse( ( child ) => {

				if ( child.getComponent( MXP.Mesh ) ) {

					result.push( { axis, entity: child } );

				}

			} );

		};

		collectMeshEntities( this._xAxis, 'x' );
		collectMeshEntities( this._yAxis, 'y' );
		collectMeshEntities( this._zAxis, 'z' );

		return result;

	}

	public get activeAxis(): GizmoAxis | null {

		return this._activeAxis;

	}

	public get dragging(): boolean {

		return this._dragging;

	}

	public startDrag( axis: GizmoAxis, ray: MXP.Ray ): void {

		this._activeAxis = axis;
		this._dragging = true;
		this._dragStartPos.copy( this.entity.position );

	}

	public updateDrag( ray: MXP.Ray, targetEntity: MXP.Entity ): GLP.Vector | null {

		if ( ! this._dragging || ! this._activeAxis ) return null;

		const axisDir = new GLP.Vector(
			this._activeAxis === 'x' ? 1 : 0,
			this._activeAxis === 'y' ? 1 : 0,
			this._activeAxis === 'z' ? 1 : 0,
		);

		const gizmoPos = new GLP.Vector(
			this.entity.position.x,
			this.entity.position.y,
			this.entity.position.z
		);

		// closest point on ray to axis line
		const diff = new GLP.Vector(
			ray.origin.x - gizmoPos.x,
			ray.origin.y - gizmoPos.y,
			ray.origin.z - gizmoPos.z,
		);

		const dotDirAxis = ray.direction.x * axisDir.x + ray.direction.y * axisDir.y + ray.direction.z * axisDir.z;
		const dotDiffAxis = diff.x * axisDir.x + diff.y * axisDir.y + diff.z * axisDir.z;

		const t = - dotDiffAxis / ( 1.0 - dotDirAxis * dotDirAxis + 0.0001 );

		const projected = dotDiffAxis + t * dotDirAxis;

		const newPos = new GLP.Vector(
			gizmoPos.x + axisDir.x * projected,
			gizmoPos.y + axisDir.y * projected,
			gizmoPos.z + axisDir.z * projected,
		);

		return newPos;

	}

	public endDrag(): void {

		this._activeAxis = null;
		this._dragging = false;

	}

}
