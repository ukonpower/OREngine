import * as GLP from 'glpower';

import { Camera } from '../Component/Camera';
import { Mesh } from '../Component/Mesh';
import { Entity } from '../Entity';
import { Ray } from '../Ray';

export type RaycastResult = {
	entity: Entity;
	distance: number;
	point: GLP.Vector;
};

export class Raycaster {

	public ray: Ray;

	constructor() {

		this.ray = new Ray();

	}

	public setFromCamera( ndc: GLP.Vector, cameraEntity: Entity ): void {

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

	private intersectMesh( entity: Entity, mesh: Mesh ): RaycastResult[] | null {

		const geometry = mesh.geometry;
		const posAttr = geometry.getAttribute( 'position' );
		const indexAttr = geometry.getAttribute( 'index' );

		if ( ! posAttr ) return null;

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

		const results: RaycastResult[] = [];
		const positions = posAttr.array as Float32Array;

		const v0 = new GLP.Vector();
		const v1 = new GLP.Vector();
		const v2 = new GLP.Vector();

		const testTriangle = ( i0: number, i1: number, i2: number ) => {

			v0.set( positions[ i0 * 3 ], positions[ i0 * 3 + 1 ], positions[ i0 * 3 + 2 ] );
			v1.set( positions[ i1 * 3 ], positions[ i1 * 3 + 1 ], positions[ i1 * 3 + 2 ] );
			v2.set( positions[ i2 * 3 ], positions[ i2 * 3 + 1 ], positions[ i2 * 3 + 2 ] );

			const hit = localRay.intersectTriangle( v0, v1, v2 );

			if ( hit ) {

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

				results.push( {
					entity,
					distance: worldDistance,
					point: worldPoint,
				} );

			}

		};

		if ( indexAttr ) {

			const indices = indexAttr.array;

			for ( let i = 0; i < indices.length; i += 3 ) {

				testTriangle( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

			}

		} else {

			const vertCount = positions.length / 3;

			for ( let i = 0; i < vertCount; i += 3 ) {

				testTriangle( i, i + 1, i + 2 );

			}

		}

		return results.length > 0 ? results : null;

	}

}
