import * as MXP from 'maxpower';

import gizmoFrag from '../shaders/gizmo.fs';
import gizmoVert from '../shaders/gizmo.vs';

import { CameraHelperGeometry } from './Geometries/CameraHelperGeometry';
import { DirectionalLightHelperGeometry } from './Geometries/DirectionalLightHelperGeometry';
import { EmptyHelperGeometry } from './Geometries/EmptyHelperGeometry';
import { SpotLightHelperGeometry } from './Geometries/SpotLightHelperGeometry';

export type HelperType = 'empty' | 'camera' | 'spotLight' | 'directionalLight';

export class EntityHelper {

	public entity: MXP.Entity;
	public type: HelperType;
	public targetEntityUUID: string;
	private _geometry: MXP.Geometry;

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

	public syncTransform( targetEntity: MXP.Entity ) {

		this.entity.matrixWorld.copy( targetEntity.matrixWorld );

		if ( this.type === 'camera' ) {

			const camera = targetEntity.getComponentsByTag<MXP.Camera>( 'camera' )[ 0 ];

			if ( camera && this._geometry instanceof CameraHelperGeometry ) {

				this._geometry.update( camera.fov, 1.0, 0.1, 2.0 );

			}

		} else if ( this.type === 'spotLight' ) {

			const light = targetEntity.getComponent( MXP.Light );

			if ( light && this._geometry instanceof SpotLightHelperGeometry ) {

				this._geometry.update( light.angle, Math.min( light.distance, 10 ) );

			}

		}

	}

}
