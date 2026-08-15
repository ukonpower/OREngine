import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { CameraHelperGeometry } from './Geometries/CameraHelperGeometry';
import { CameraHitAreaGeometry } from './Geometries/CameraHitAreaGeometry';
import { DirectionalLightHelperGeometry } from './Geometries/DirectionalLightHelperGeometry';
import { DirectionalLightHitAreaGeometry } from './Geometries/DirectionalLightHitAreaGeometry';
import { EmptyHelperGeometry } from './Geometries/EmptyHelperGeometry';
import { SpotLightHelperGeometry } from './Geometries/SpotLightHelperGeometry';
import { SpotLightHitAreaGeometry } from './Geometries/SpotLightHitAreaGeometry';

export type HelperType = 'empty' | 'camera' | 'spotLight' | 'directionalLight';

export class EntityHelper {

	public entity: MXP.Entity;
	public hitAreaEntity: MXP.Entity;
	public type: HelperType;
	public targetEntityUUID: string;
	private _geometry: MXP.Geometry;
	private _hitAreaGeometry: MXP.Geometry | null;
	private _matrixOffset: MTP.Quaternion | null;
	private _baseColor: number[];
	private _colorUniform: number[];

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract, type: HelperType, targetEntityUUID: string ) {

		this.type = type;
		this.targetEntityUUID = targetEntityUUID;

		this.entity = engine.createEntity( { name: "__helper" } );
		this.entity.initiator = "god";

		const color = this._getColor();
		this._baseColor = color;
		this._colorUniform = [ ...color ];

		const mat = draw.materials.flat( { color: this._colorUniform, lines: true } );

		this._geometry = this._createGeometry();
		this.entity.addComponent( MXP.Mesh, { geometry: this._geometry, material: mat } );

		// hit area
		this._hitAreaGeometry = this._createHitAreaGeometry();
		this.hitAreaEntity = engine.createEntity( { name: "__helper_hit" } );
		this.hitAreaEntity.initiator = "god";

		if ( this._hitAreaGeometry ) {

			this.hitAreaEntity.addComponent( MXP.Mesh, { geometry: this._hitAreaGeometry } );

		}

		if ( type === 'spotLight' || type === 'directionalLight' ) {

			this._matrixOffset = new MTP.Quaternion().setFromEuler( { x: - Math.PI / 2, y: 0, z: 0 } );

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

	// emptyは体積の当たり判定を持たない（描かれる十字線への画面上の近接で選択する。PointerHandler の isNearHelperLines）
	private _createHitAreaGeometry(): MXP.Geometry | null {

		switch ( this.type ) {

		case 'empty': return null;
		case 'camera': return new CameraHitAreaGeometry();
		case 'spotLight': return new SpotLightHitAreaGeometry();
		case 'directionalLight': return new DirectionalLightHitAreaGeometry();

		}

	}

	// ヘルパーのワイヤ線分をワールド空間の端点ペアで返す（枠線クリックの判定に使う）
	public getWorldSegments(): { a: MTP.Vector, b: MTP.Vector }[] {

		const posAttr = this._geometry.getAttribute( 'position' );

		if ( ! posAttr ) return [];

		const pos = posAttr.array;
		const segments: { a: MTP.Vector, b: MTP.Vector }[] = [];

		// ヘルパーのジオメトリはラインリスト（2頂点で1線分）
		for ( let i = 0; i + 5 < pos.length; i += 6 ) {

			segments.push( {
				a: new MTP.Vector( pos[ i + 0 ], pos[ i + 1 ], pos[ i + 2 ] ).applyMatrix4AsPosition( this.entity.matrixWorld ),
				b: new MTP.Vector( pos[ i + 3 ], pos[ i + 4 ], pos[ i + 5 ] ).applyMatrix4AsPosition( this.entity.matrixWorld ),
			} );

		}

		return segments;

	}

	public setSelected( selected: boolean ) {

		const c = selected ? [ 1.0, 0.6, 0.0 ] : this._baseColor;
		this._colorUniform[ 0 ] = c[ 0 ];
		this._colorUniform[ 1 ] = c[ 1 ];
		this._colorUniform[ 2 ] = c[ 2 ];

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

			if ( camera ) {

				if ( this._geometry instanceof CameraHelperGeometry ) {

					this._geometry.update( camera.fov, camera.aspect, 0.1, 2.0 );

				}

				if ( this._hitAreaGeometry instanceof CameraHitAreaGeometry ) {

					this._hitAreaGeometry.update( camera.fov, camera.aspect, 0.1, 2.0 );

				}

			}

		} else if ( this.type === 'spotLight' ) {

			const light = targetEntity.getComponent( MXP.Light );

			if ( light ) {

				const distance = Math.min( light.distance, 10 );

				if ( this._geometry instanceof SpotLightHelperGeometry ) {

					this._geometry.update( light.angle, distance );

				}

				if ( this._hitAreaGeometry instanceof SpotLightHitAreaGeometry ) {

					this._hitAreaGeometry.update( light.angle, distance );

				}

			}

		}

	}

}
