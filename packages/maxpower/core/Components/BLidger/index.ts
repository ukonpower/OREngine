import * as BSP from 'basepower';
import * as MTP from 'mathpower';

import { BLidge, BLidgeNode, BLidgeLightParam, BLidgeCameraParam } from "../../BLidge";
import { Component, ComponentParams } from "../../Component";
import { CubeGeometry } from '../../Geometries/CubeGeometry';
import { CylinderGeometry } from '../../Geometries/CylinderGeometry';
import { PlaneGeometry } from '../../Geometries/PlaneGeometry';
import { SphereGeometry } from '../../Geometries/SphereGeometry';
import { Geometry } from '../../Geometry';
import { Camera } from '../Camera';
import { Light } from '../Light';
import { Mesh } from '../Mesh';

import type { SerializeField } from '../../Serializable';

// BLidge のノード1つぶんの初期状態（変形・形状・ライト・カメラ）をエンティティに入れる。
// アニメーションは評価しない（BLidgeClient がシーンのカーブの表と Animation のリンクへ流し込む）
export class BLidger extends Component {

	public node: BLidgeNode;
	// euler の x に足す角度。Blender のカメラは -Z を向くので、Y-up の前向きに合わせる
	public rotationOffsetX: number;
	// Blender のカスタムプロパティの uniform（4fv）。値は uniforms/<名前> のフィールドから Animation が入れる。
	// 値の Vector は入れ替えないので、マテリアルの uniforms へ写せばそのまま追従する
	public uniforms: BSP.Uniforms;

	private _blidge: BLidge;

	constructor( params: ComponentParams<{blidge: BLidge, node: BLidgeNode}> ) {

		super( params );

		this.rotationOffsetX = 0;
		this.uniforms = {};
		this._blidge = params.args.blidge;
		this.node = params.args.node;

		// rotationOffset

		if ( this.node.type == "camera" ) {

			this.rotationOffsetX = - Math.PI / 2;

		}

		// uniforms

		for ( const name of Object.keys( this.node.uniforms ) ) {

			const value = new MTP.Vector();

			this.uniforms[ name ] = {
				type: '4fv',
				value
			};

			this.field( "uniforms/" + name, () => value.getElm( "vec4" ), ( v: number[] ) => value.setFromArray( v ), {
				noExport: true,
				readOnly: true,
			} );

		}

		const entity = this.entity;

		entity.name = this.node.name;

		// transform

		entity.position.set( this.node.position[ 0 ], this.node.position[ 1 ], this.node.position[ 2 ] );

		// Blender の回転は YZX の順のオイラー角で来る。XYZ へ直すと軸ごとのカーブのリンクで表せないので、euler の順のほうを合わせる
		entity.euler.order = 'YZX';
		entity.euler.set( this.node.rotation[ 0 ] + this.rotationOffsetX, this.node.rotation[ 1 ], this.node.rotation[ 2 ] );
		entity.quaternion.setFromEuler( entity.euler );
		entity.quaternion.updated = false;

		entity.scale.set( this.node.scale[ 0 ], this.node.scale[ 1 ], this.node.scale[ 2 ] );

		// geometry

		if ( this.node.type == 'cube' ) {

			const mesh = entity.addComponent( Mesh );

			const cubeParam = this.node.param as any;

			mesh.geometry = new CubeGeometry( { width: cubeParam.x, height: cubeParam.y, depth: cubeParam.z, segmentsWidth: 10, segmentsHeight: 10, segmentsDepth: 10 } );


		} else if ( this.node.type == 'sphere' ) {

			const mesh = entity.addComponent( Mesh );

			const sphereParam = this.node.param as any;

			mesh.geometry = new SphereGeometry( {
				radius: sphereParam.r,
				widthSegments: 32,
				heightSegments: 16
			} );


		} else if ( this.node.type == 'cylinder' ) {

			const mesh = entity.addComponent( Mesh );

			mesh.geometry = new CylinderGeometry();

		} else if ( this.node.type == 'plane' ) {

			const mesh = entity.addComponent( Mesh );

			const planeParam = this.node.param as any;

			mesh.geometry = new PlaneGeometry( { width: planeParam.x, height: planeParam.y } );


		} else if ( this.node.type == 'mesh' ) {

			const mesh = entity.addComponent( Mesh );

			const geometryParam = this.node.param as any;

			const geometry = new Geometry();

			geometry.setAttribute( 'position', geometryParam.position, 3 );
			geometry.setAttribute( 'uv', geometryParam.uv, 2 );
			geometry.setAttribute( 'normal', geometryParam.normal, 3 );
			geometry.setAttribute( 'index', geometryParam.index, 3 );

			mesh.geometry = geometry;

		} else if ( this.node.type == 'gltf' ) {

			const mesh = entity.addComponent( Mesh );

			this._blidge.gltfPrm.then( gltf => {

				const gltfEntity = gltf.scene.findEntityByName( this.node.name );

				if ( gltfEntity ) {

					const gltfMesh = gltfEntity.getComponent( Mesh );

					if ( gltfMesh ) {

						mesh.geometry = gltfMesh.geometry;

						if ( ! mesh.material ) {

							mesh.material = gltfMesh.material;

						}

					}

				}

			} );

		}

		// camera: attachments で後から Camera コンポーネントが add されるタイミングで fov を反映する

		if ( this.node.type == 'camera' ) {

			const applyCameraParam = ( camera: Camera ) => {

				const cameraParam = this.node.param as BLidgeCameraParam;
				camera.fov = cameraParam.fov;
				camera.needsUpdateProjectionMatrix = true;

			};

			const existing = entity.getComponentsByTag<Camera>( "camera" )[ 0 ];

			if ( existing ) applyCameraParam( existing );

			const onComponentAdded = ( c: Component ) => {

				if ( c instanceof Camera ) applyCameraParam( c );

			};

			entity.on( "componentAdded", onComponentAdded );

			this.once( "dispose", () => {

				entity.off( "componentAdded", onComponentAdded );

			} );

		}

		// light

		if ( this.node.type == "light" ) {

			const lightParam = this.node.param as BLidgeLightParam;

			const light = entity.addComponent( Light );

			// BLidge の distance（Blender のカスタム距離＝光を切る距離）は Light.distance（シャドウカメラの far）と意味が違うので渡さない
			const lightProps: SerializeField = {
				lightType: lightParam.type,
				color: [ lightParam.color.x, lightParam.color.y, lightParam.color.z ],
				intensity: lightParam.intensity,
				castShadow: lightParam.shadow_map,
			};

			if ( lightParam.type == 'spot' ) {

				lightProps.angle = lightParam.angle;
				lightProps.blend = lightParam.blend;

			}

			light.deserialize( lightProps );

		}

		// visibility

		entity.visible = this.node.visible;

		// fields

		if ( import.meta.env.DEV ) {

			this.field( "type", () => this.node.type, undefined, {
				noExport: true,
				readOnly: true,
			} );

			this.field( "param", () => JSON.stringify( this.node.param ), undefined, {
				noExport: true,
				readOnly: true,
			} );

		}

	}

}
