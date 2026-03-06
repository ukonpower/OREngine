import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { createHitAreaMaterial } from '../Gizmo';
import gizmoFrag from '../shaders/gizmo.fs';
import gizmoVert from '../shaders/gizmo.vs';

import { CameraHelperGeometry } from './Geometries/CameraHelperGeometry';
import { DirectionalLightHelperGeometry } from './Geometries/DirectionalLightHelperGeometry';
import { EmptyHelperGeometry } from './Geometries/EmptyHelperGeometry';
import { SpotLightHelperGeometry } from './Geometries/SpotLightHelperGeometry';

export type HelperType = 'empty' | 'camera' | 'spotLight' | 'directionalLight';

export class EntityHelper {

	public entity: MXP.Entity;
	public hitAreaEntity: MXP.Entity;
	public type: HelperType;
	public targetEntityUUID: string;
	private _geometry: MXP.Geometry;
	private _matrixOffset: GLP.Quaternion | null;

	constructor( type: HelperType, targetEntityUUID: string ) {

		this.type = type;
		this.targetEntityUUID = targetEntityUUID;

		this.entity = new MXP.Entity( { name: "__helper" } );
		this.entity.initiator = "god";

		const color = this._getColor();

		const mat = new MXP.Material( {
			vert: gizmoVert,
			frag: gizmoFrag,
			drawType: 'LINES',
		} );
		mat.uniforms.uColor = { value: color, type: '3fv' };
		mat.depthTest = false;
		mat.visibilityFlag = {
			deferred: false, forward: true,
			shadowMap: false, envMap: false,
			ui: false, postprocess: false
		};

		this._geometry = this._createGeometry();
		this.entity.addComponent( MXP.Mesh, { geometry: this._geometry, material: mat } );

		// hit area
		this.hitAreaEntity = new MXP.Entity( { name: "__helper_hit" } );
		this.hitAreaEntity.initiator = "god";
		this.hitAreaEntity.addComponent( MXP.Mesh, {
			geometry: this._createHitAreaGeometry(),
			material: createHitAreaMaterial(),
		} );

		if ( type === 'spotLight' || type === 'directionalLight' ) {

			this._matrixOffset = new GLP.Quaternion().setFromEuler( { x: - Math.PI / 2, y: 0, z: 0 } );

		} else {

			this._matrixOffset = null;

		}

	}

	private _getColor(): number[] {

		switch ( this.type ) {

		case 'empty': return [ 0.8, 0.5, 0.2 ];
		case 'camera': return [ 0.6, 0.8, 1.0 ];
		case 'spotLight': return [ 1.0, 0.9, 0.4 ];
		case 'directionalLight': return [ 1.0, 0.9, 0.4 ];

		}

	}

	private _createGeometry(): MXP.Geometry {

		switch ( this.type ) {

		case 'empty': return new EmptyHelperGeometry();
		case 'camera': return new CameraHelperGeometry();
		case 'spotLight': return new SpotLightHelperGeometry();
		case 'directionalLight': return new DirectionalLightHelperGeometry();

		}

	}

	private _createHitAreaGeometry(): MXP.Geometry {

		switch ( this.type ) {

		case 'empty': return new MXP.CubeGeometry( { width: 0.3, height: 0.3, depth: 0.3 } );
		case 'camera': return this._createOffsetCube( 1.5, 1.5, 2.0, 0, 0, - 1.0 );
		case 'spotLight': return this._createOffsetCube( 2.0, 2.0, 5.0, 0, 0, - 2.5 );
		case 'directionalLight': return this._createOffsetCube( 0.6, 0.6, 1.2, 0, 0, - 0.6 );

		}

	}

	private _createOffsetCube( w: number, h: number, d: number, ox: number, oy: number, oz: number ): MXP.Geometry {

		const geo = new MXP.CubeGeometry( { width: w, height: h, depth: d } );
		const posAttr = geo.getAttribute( 'position' );

		if ( posAttr ) {

			const arr = posAttr.array as Float32Array;

			for ( let i = 0; i < arr.length; i += 3 ) {

				arr[ i ] += ox;
				arr[ i + 1 ] += oy;
				arr[ i + 2 ] += oz;

			}

		}

		return geo;

	}

	public syncTransform( targetEntity: MXP.Entity ) {

		this.entity.matrixWorld.copy( targetEntity.matrixWorld );
		this.hitAreaEntity.matrixWorld.copy( targetEntity.matrixWorld );

		if ( this._matrixOffset ) {

			this.entity.matrixWorld.applyQuaternion( this._matrixOffset );
			this.hitAreaEntity.matrixWorld.applyQuaternion( this._matrixOffset );

		}

		if ( this.type === 'camera' ) {

			const camera = targetEntity.getComponentsByTag<MXP.Camera>( 'camera' )[ 0 ];

			if ( camera && this._geometry instanceof CameraHelperGeometry ) {

				this._geometry.update( camera.fov, camera.aspect, 0.1, 2.0 );

			}

		} else if ( this.type === 'spotLight' ) {

			const light = targetEntity.getComponent( MXP.Light );

			if ( light && this._geometry instanceof SpotLightHelperGeometry ) {

				this._geometry.update( light.angle, Math.min( light.distance, 10 ) );

			}

		}

	}

}
