import * as MTP from 'mathpower';

import { Camera } from '../../Components/Camera';
import { Mesh } from '../../Components/Mesh';
import { Entity } from '../../Entity';
import { Geometry } from '../../Geometry';
import { Ray } from '../Ray';

export type RaycastResult = {
	entity: Entity;
	distance: number;
	point: MTP.Vector;
};

export class Raycaster {

	public ray: Ray;
	private _v0: MTP.Vector;
	private _v1: MTP.Vector;
	private _v2: MTP.Vector;

	constructor() {

		this.ray = new Ray();
		this._v0 = new MTP.Vector();
		this._v1 = new MTP.Vector();
		this._v2 = new MTP.Vector();

	}

	public setFromCamera( ndc: MTP.Vector, cameraEntity: Entity ): void {

		const camera = cameraEntity.getComponentsByTag<Camera>( "camera" )[ 0 ];

		if ( ! camera ) return;

		const projInv = camera.projectionMatrix.clone().inverse();
		const viewInv = camera.viewMatrix.clone().inverse();

		this.ray.setFromCamera( ndc, projInv, viewInv );

	}

	public intersectEntities( entity: Entity ): RaycastResult[] {

		const results: RaycastResult[] = [];

		entity.traverse( ( child ) => {

			if ( ! child.visible ) return;

			const mesh = child.getComponent( Mesh );

			if ( ! mesh ) return;

			const meshResults = this.intersectMesh( child, mesh );

			if ( meshResults ) results.push( ...meshResults );

		} );

		results.sort( ( a, b ) => a.distance - b.distance );

		return results;

	}

	// メッシュとレイの最近交点を返す。AABB で足切りしてから三角形単位で判定する
	private intersectMesh( entity: Entity, mesh: Mesh ): RaycastResult[] | null {

		const geometry = mesh.geometry;
		const boundingBox = geometry.boundingBox;

		if ( ! boundingBox ) return null;

		const invMatrix = entity.matrixWorld.clone().inverse();

		const localRay = new Ray();
		localRay.origin.copy( this.ray.origin );
		localRay.origin.w = 1;
		localRay.origin.applyMatrix4( invMatrix );
		localRay.origin.x /= localRay.origin.w;
		localRay.origin.y /= localRay.origin.w;
		localRay.origin.z /= localRay.origin.w;

		const dirEnd = this.ray.origin.clone().add( this.ray.direction );
		dirEnd.w = 1;
		dirEnd.applyMatrix4( invMatrix );
		dirEnd.x /= dirEnd.w;
		dirEnd.y /= dirEnd.w;
		dirEnd.z /= dirEnd.w;

		localRay.direction.set(
			dirEnd.x - localRay.origin.x,
			dirEnd.y - localRay.origin.y,
			dirEnd.z - localRay.origin.z
		).normalize();

		if ( ! localRay.intersectAABB( boundingBox.min, boundingBox.max ) ) return null;

		const hit = this.intersectTriangles( localRay, geometry );

		if ( ! hit ) return null;

		const worldPoint = hit.point.clone();
		worldPoint.w = 1;
		worldPoint.applyMatrix4( entity.matrixWorld );
		worldPoint.x /= worldPoint.w;
		worldPoint.y /= worldPoint.w;
		worldPoint.z /= worldPoint.w;

		const dx = worldPoint.x - this.ray.origin.x;
		const dy = worldPoint.y - this.ray.origin.y;
		const dz = worldPoint.z - this.ray.origin.z;
		const worldDistance = Math.sqrt( dx * dx + dy * dy + dz * dz );

		return [ {
			entity,
			distance: worldDistance,
			point: worldPoint,
		} ];

	}

	// ローカル空間で全三角形と交差判定して最近ヒットを返す
	private intersectTriangles( ray: Ray, geometry: Geometry ): { distance: number, point: MTP.Vector } | null {

		const posAttr = geometry.getAttribute( 'position' );

		if ( ! posAttr ) return null;

		const pos = posAttr.array;
		const indexAttr = geometry.getAttribute( 'index' );
		const index = indexAttr ? indexAttr.array : null;
		const triCount = Math.floor( ( index ? index.length : geometry.vertCount ) / 3 );

		let closest: { distance: number, point: MTP.Vector } | null = null;

		for ( let t = 0; t < triCount; t ++ ) {

			const i0 = ( index ? index[ t * 3 + 0 ] : t * 3 + 0 ) * 3;
			const i1 = ( index ? index[ t * 3 + 1 ] : t * 3 + 1 ) * 3;
			const i2 = ( index ? index[ t * 3 + 2 ] : t * 3 + 2 ) * 3;

			this._v0.set( pos[ i0 ], pos[ i0 + 1 ], pos[ i0 + 2 ] );
			this._v1.set( pos[ i1 ], pos[ i1 + 1 ], pos[ i1 + 2 ] );
			this._v2.set( pos[ i2 ], pos[ i2 + 1 ], pos[ i2 + 2 ] );

			const hit = ray.intersectTriangle( this._v0, this._v1, this._v2 );

			if ( hit && ( ! closest || hit.distance < closest.distance ) ) {

				closest = hit;

			}

		}

		return closest;

	}

}
