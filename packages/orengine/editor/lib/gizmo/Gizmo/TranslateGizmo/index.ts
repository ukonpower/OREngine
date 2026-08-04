import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Gizmo, GizmoAxis, GizmoDragResult } from '..';
import { getAxisWorldDir, getWorldQuaternion, projectRayOnLine, TransformOrientation } from '../../../transform/TransformUtils';

export class TranslateGizmo implements Gizmo {

	private static readonly BASE_SCALE_FACTOR = 0.15;

	private _engine: MXP.EngineContract;
	private _draw: MXP.EditorDrawContract;
	public entity: MXP.Entity;
	private _xAxis: MXP.Entity;
	private _yAxis: MXP.Entity;
	private _zAxis: MXP.Entity;
	private _orientation: TransformOrientation;
	private _activeAxis: GizmoAxis | null;
	private _dragging: boolean;
	private _dragStartPos: GLP.Vector;
	private _dragAxisDir: GLP.Vector;
	private _dragStartProjection: number;

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		this._engine = engine;
		this._draw = draw;
		this.entity = engine.createEntity( { name: "__gizmo" } );
		this.entity.initiator = "god";
		this.entity.visible = false;

		this._orientation = 'global';
		this._activeAxis = null;
		this._dragging = false;
		this._dragStartPos = new GLP.Vector();
		this._dragAxisDir = new GLP.Vector( 1, 0, 0 );
		this._dragStartProjection = 0;

		this._xAxis = this._createAxis( new GLP.Vector( 1, 0, 0 ), [ 1.0, 0.2, 0.2 ] );
		this._yAxis = this._createAxis( new GLP.Vector( 0, 1, 0 ), [ 0.2, 1.0, 0.2 ] );
		this._zAxis = this._createAxis( new GLP.Vector( 0, 0, 1 ), [ 0.4, 0.4, 1.0 ] );

		this.entity.add( this._xAxis );
		this.entity.add( this._yAxis );
		this.entity.add( this._zAxis );

	}

	private _createAxis( direction: GLP.Vector, color: number[] ): MXP.Entity {

		const axisEntity = this._engine.createEntity( { name: "__gizmo_axis" } );
		axisEntity.initiator = "god";

		const shaftLength = 0.8;
		const shaftRadius = 0.015;
		const headLength = 0.2;
		const headRadius = 0.05;

		// shaft
		const shaft = this._engine.createEntity( { name: "__gizmo_shaft" } );
		shaft.initiator = "god";

		const shaftGeo = new MXP.CylinderGeometry( {
			radiusTop: shaftRadius,
			radiusBottom: shaftRadius,
			height: shaftLength,
			radSegments: 6,
			heightSegments: 1,
			caps: false,
		} );

		const shaftMat = this._draw.materials.flat( { color, depthTest: false, depthWrite: false } );

		shaft.addComponent( MXP.Mesh, { geometry: shaftGeo, material: shaftMat } );
		shaft.position.set( direction.x * shaftLength / 2, direction.y * shaftLength / 2, direction.z * shaftLength / 2 );

		// head (cone-like cylinder)
		const head = this._engine.createEntity( { name: "__gizmo_head" } );
		head.initiator = "god";

		const headGeo = new MXP.CylinderGeometry( {
			radiusTop: 0.001,
			radiusBottom: headRadius,
			height: headLength,
			radSegments: 6,
			heightSegments: 1,
			caps: true,
		} );

		const headMat = this._draw.materials.flat( { color, depthTest: false, depthWrite: false } );

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

		// hit area - shaft
		const hitShaft = this._engine.createEntity( { name: "__gizmo_hit_shaft" } );
		hitShaft.initiator = "god";
		const hitShaftGeo = new MXP.CylinderGeometry( {
			radiusTop: 0.06, radiusBottom: 0.06,
			height: shaftLength, radSegments: 6, heightSegments: 1, caps: true,
		} );
		hitShaft.addComponent( MXP.Mesh, { geometry: hitShaftGeo } );
		hitShaft.position.copy( shaft.position );
		hitShaft.euler.copy( shaft.euler );

		// hit area - head
		const hitHead = this._engine.createEntity( { name: "__gizmo_hit_head" } );
		hitHead.initiator = "god";
		const hitHeadGeo = new MXP.CylinderGeometry( {
			radiusTop: 0.001, radiusBottom: 0.1,
			height: headLength * 1.5, radSegments: 6, heightSegments: 1, caps: true,
		} );
		hitHead.addComponent( MXP.Mesh, { geometry: hitHeadGeo } );
		hitHead.position.copy( head.position );
		hitHead.euler.copy( head.euler );

		axisEntity.add( shaft );
		axisEntity.add( head );
		axisEntity.add( hitShaft );
		axisEntity.add( hitHead );

		return axisEntity;

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
				const s = Math.max( 0.01, dist * TranslateGizmo.BASE_SCALE_FACTOR );
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

				if ( mesh && ! mesh.material ) {

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

		// ドラッグ中も setTarget が毎フレーム走るので、軸方向は開始時のものに固定する
		this._dragAxisDir = getAxisWorldDir( targetEntity, axis, this._orientation );
		this._dragStartProjection = projectRayOnLine( ray, this._dragStartPos, this._dragAxisDir );

	}

	public updateDrag( ray: MXP.Ray, _targetEntity: MXP.Entity ): GizmoDragResult | null {

		if ( ! this._dragging || ! this._activeAxis ) return null;

		const delta = projectRayOnLine( ray, this._dragStartPos, this._dragAxisDir ) - this._dragStartProjection;

		const newPos = new GLP.Vector(
			this._dragStartPos.x + this._dragAxisDir.x * delta,
			this._dragStartPos.y + this._dragAxisDir.y * delta,
			this._dragStartPos.z + this._dragAxisDir.z * delta,
		);

		return { position: newPos };

	}

	public endDrag(): void {

		this._activeAxis = null;
		this._dragging = false;

	}

}
