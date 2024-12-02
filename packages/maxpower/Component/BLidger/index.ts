import * as GLP from 'glpower';
import { Camera, Mesh } from 'maxpower';

import { Component, ComponentParams, ComponentUpdateEvent } from "..";
import { BLidge, BLidgeEntity, BLidgeLightParam, BLidgeCameraParam } from "../../BLidge";
import { Entity } from '../../Entity';
import { Geometry } from "../Geometry";
import { CubeGeometry } from "../Geometry/CubeGeometry";
import { CylinderGeometry } from "../Geometry/CylinderGeometry";
import { PlaneGeometry } from "../Geometry/PlaneGeometry";
import { SphereGeometry } from "../Geometry/SphereGeometry";
import { Light } from '../Light';
import { Material } from '../Material';

interface BLidgerParams extends ComponentParams {
	blidge: BLidge;
	node: BLidgeEntity;
}

export class BLidger extends Component {

	public node: BLidgeEntity;
	public rotationOffsetX: number;
	public animations: Map<string, GLP.FCurveGroup>;
	public uniforms: GLP.Uniforms;
	public uniformCurves: Map<string, GLP.FCurveGroup>;
	public transformAutoUpdate: boolean;

	private blidge: BLidge;

	private cameraComponent?: Camera;
	private lightComponent?: Light;

	constructor( params: BLidgerParams ) {

		super( params );

		this.blidge = params.blidge;
		this.node = params.node;

		// rotation offset

		this.rotationOffsetX = 0;

		if ( this.node.type == "camera" ) {

			this.rotationOffsetX = - Math.PI / 2;

		}

		// animations

		this.animations = new Map();

		const animationCurveKeys = Object.keys( this.node.animations );

		for ( let i = 0; i < animationCurveKeys.length; i ++ ) {

			const name = animationCurveKeys[ i ];

			this.animations.set( name, this.blidge.getCurveGroup( this.node.animations[ name ] ) );

		}

		// uniforms

		this.uniforms = {};
		this.uniformCurves = new Map();

		const uniformCurveKeys = Object.keys( this.node.material.uniforms );

		for ( let i = 0; i < uniformCurveKeys.length; i ++ ) {

			const name = uniformCurveKeys[ i ];
			const accessor = this.node.material.uniforms[ name ];
			const curve = this.blidge.curveGroups[ accessor ];

			if ( curve ) {

				this.uniformCurves.set( name, curve );

				this.uniforms[ name ] = {
					type: '4fv',
					value: curve.value
				};

			}

		}

		this.transformAutoUpdate = true;

	}

	protected setEntityImpl( entity: Entity ): void {

		entity.name = this.node.name;

		// transform

		entity.position.set( this.node.position[ 0 ], this.node.position[ 1 ], this.node.position[ 2 ] );

		entity.quaternion.setFromEuler( {
			x: this.node.rotation[ 0 ] + this.rotationOffsetX,
			y: this.node.rotation[ 1 ],
			z: this.node.rotation[ 2 ],
		}, 'YZX' );

		entity.quaternion.updated = false;

		entity.euler.setFromQuaternion( entity.quaternion );

		entity.scale.set( this.node.scale[ 0 ], this.node.scale[ 1 ], this.node.scale[ 2 ] );

		// geometry

		if ( this.node.type == 'cube' ) {

			const mesh = new Mesh();

			const cubeParam = this.node.param as any;

			mesh.geometry = new CubeGeometry( { disableEdit: true, width: cubeParam.x, height: cubeParam.y, depth: cubeParam.z, segmentsWidth: 10, segmentsHeight: 10, segmentsDepth: 10 } );

			entity.addComponent( mesh );

		} else if ( this.node.type == 'sphere' ) {

			const mesh = new Mesh();

			const sphereParam = this.node.param as any;

			mesh.geometry = new SphereGeometry( { disableEdit: true,
				radius: sphereParam.r,
				widthSegments: 32,
				heightSegments: 16
			} );

			entity.addComponent( mesh );

		} else if ( this.node.type == 'cylinder' ) {

			const mesh = new Mesh();

			mesh.geometry = new CylinderGeometry( { disableEdit: true } );

			entity.addComponent( mesh );

		} else if ( this.node.type == 'plane' ) {

			const mesh = new Mesh();

			const planeParam = this.node.param as any;

			mesh.geometry = new PlaneGeometry( { disableEdit: true, width: planeParam.x, height: planeParam.y } );

			entity.addComponent( mesh );


		} else if ( this.node.type == 'mesh' ) {

			const mesh = new Mesh();

			const geometryParam = this.node.param as any;

			const geometry = new Geometry( { disableEdit: true } );

			geometry.setAttribute( 'position', geometryParam.position, 3 );
			geometry.setAttribute( 'uv', geometryParam.uv, 2 );
			geometry.setAttribute( 'normal', geometryParam.normal, 3 );
			geometry.setAttribute( 'index', geometryParam.index, 3 );

			mesh.geometry = geometry;

		} else if ( this.node.type == 'gltf' ) {

			const mesh = new Mesh();

			this.blidge.gltfPrm.then( gltf => {

				const gltfEntity = gltf.scene.findEntityByName( this.node.name );

				if ( gltfEntity ) {

					const geo = gltfEntity.getComponentsByTag<Geometry>( "geometry" );

					if ( geo ) {

						geo.disableEdit = true;
						mesh.geometry = geo;

					}

					const mat = gltfEntity.getComponentsByTag<Material>( "material" );

					if ( mat ) {

						mat.disableEdit = true;
						mesh.material = mat;

					}

				}

				entity.noticeEventParent( "update/blidge/scene", [ entity ] );

			} );

			entity.addComponent( mesh );

		}

		// light

		if ( this.node.type == "light" ) {

			const lightParam = this.node.param as BLidgeLightParam;
			this.lightComponent = entity.addComponent( new Light( { disableEdit: true } ) );

			this.lightComponent.deserialize( {
				...lightParam,
				lightType: lightParam.type,
				color: new GLP.Vector().copy( lightParam.color ),
				castShadow: lightParam.shadowMap,
			} );

		}

		// camera

		if ( this.node.type == 'camera' ) {

			this.cameraComponent = entity.getComponentsByTag<Camera>( "camera" );

			if ( this.cameraComponent ) {

				const cameraParam = this.node.param as BLidgeCameraParam;

				this.cameraComponent.fov = cameraParam.fov;

			}

		}

		// visibility

		entity.visible = this.node.visible;

	}

	protected unsetEntityImpl( prevEntity: Entity ): void {

		this.cameraComponent = undefined;

	}

	protected preUpdateImpl( event: ComponentUpdateEvent ): void {

		const entity = event.entity;
		const frame = ( event.timeCode * this.blidge.frame.fps );

		// animations

		this.animations.forEach( ( anim ) => {

			anim.setFrame( frame );

		} );

		// transform

		if ( this.transformAutoUpdate ) {

			const curvePosition = this.animations.get( 'position' );

			if ( curvePosition ) {

				const position = curvePosition.value;

				if ( curvePosition.getFCurve( 'x' ) ) {

					entity.position.x = position.x;

				}

				if ( curvePosition.getFCurve( 'y' ) ) {

					entity.position.y = position.y;

				}

				if ( curvePosition.getFCurve( 'z' ) ) {

					entity.position.z = position.z;

				}

			}

			const curveRotation = this.animations.get( 'rotation' );

			if ( curveRotation ) {

				const rot = {
					x: this.node.rotation[ 0 ],
					y: this.node.rotation[ 1 ],
					z: this.node.rotation[ 2 ],
				};

				const rotValue = curveRotation.value;

				if ( curveRotation.getFCurve( 'x' ) ) {

					rot.x = rotValue.x;

				}

				if ( curveRotation.getFCurve( 'y' ) ) {

					rot.y = rotValue.y;

				}

				if ( curveRotation.getFCurve( 'z' ) ) {

					rot.z = rotValue.z;

				}

				entity.quaternion.setFromEuler( {
					x: rot.x + this.rotationOffsetX,
					y: rot.y,
					z: rot.z
				}, 'YZX' );

			}

			const curveScale = this.animations.get( 'scale' );

			if ( curveScale ) {

				const scaleValue = curveScale.setFrame( frame ).value;

				if ( curveScale.getFCurve( 'x' ) ) {

					entity.scale.x = scaleValue.x;

				}

				if ( curveScale.getFCurve( 'y' ) ) {

					entity.scale.y = scaleValue.y;

				}

				if ( curveScale.getFCurve( 'z' ) ) {

					entity.scale.z = scaleValue.z;

				}

			}

		}

		// visibility

		const curveHide = this.animations.get( 'hide' );

		if ( curveHide ) {

			entity.visible = curveHide.value.x < 0.5;

		}

		// light

		if ( this.lightComponent ) {

			const curveColor = this.animations.get( 'color' );

			if ( curveColor ) {

				this.lightComponent.color.copy( curveColor.setFrame( frame ).value );

			}

		}

		// uniforms

		this.uniformCurves.forEach( ( curve, name ) => {

			this.uniforms[ name ].value = curve.setFrame( frame ).value;

		} );

	}

	private assignUniforms( targetUniforms: GLP.Uniforms ) {

		Object.keys( this.uniforms ).forEach( ( name ) => {

			targetUniforms[ name ] = this.uniforms[ name ];

		} );

	}

	public onCompleteSyncScene() {
	}

}
