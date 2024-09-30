import * as GLP from 'glpower';
import { Camera, SerializableProps } from 'maxpower';

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
	public animationCurves: Map<string, GLP.FCurveGroup>;
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

		this.animationCurves = new Map();

		const animationCurveKeys = Object.keys( this.node.animations );

		for ( let i = 0; i < animationCurveKeys.length; i ++ ) {

			const name = animationCurveKeys[ i ];

			this.animationCurves.set( name, this.blidge.getCurveGroup( this.node.animations[ name ] ) );

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

	public getProps(): SerializableProps | null {

		return {
			name: { value: this.node.name, opt: { readOnly: true } },
			class: { value: this.node.class, opt: { readOnly: true } },
			type: { value: this.node.type, opt: { readOnly: true } },
		};

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

			const cubeParam = this.node.param as any;

			entity.addComponent( new CubeGeometry( { disableEdit: true, width: cubeParam.x, height: cubeParam.y, depth: cubeParam.z, segmentsWidth: 10, segmentsHeight: 10, segmentsDepth: 10 } ) );

		} else if ( this.node.type == 'sphere' ) {

			const sphereParam = this.node.param as any;
			entity.addComponent( new SphereGeometry( { disableEdit: true,
				radius: sphereParam.r,
				widthSegments: 32,
				heightSegments: 16
			} ) );

		} else if ( this.node.type == 'cylinder' ) {

			entity.addComponent( new CylinderGeometry( { disableEdit: true } ) );

		} else if ( this.node.type == 'plane' ) {

			const planeParam = this.node.param as any;

			entity.addComponent( new PlaneGeometry( { disableEdit: true, width: planeParam.x, height: planeParam.y } ) );

		} else if ( this.node.type == 'mesh' ) {

			const geometryParam = this.node.param as any;

			const geometry = new Geometry( { disableEdit: true } );
			geometry.setAttribute( 'position', geometryParam.position, 3 );
			geometry.setAttribute( 'uv', geometryParam.uv, 2 );
			geometry.setAttribute( 'normal', geometryParam.normal, 3 );
			geometry.setAttribute( 'index', geometryParam.index, 3 );
			entity.addComponent( geometry );

		} else if ( this.node.type == 'gltf' ) {

			this.blidge.gltfPrm.then( gltf => {

				const gltfEntity = gltf.scene.getEntityByName( this.node.name );

				if ( gltfEntity ) {

					const geo = gltfEntity.getComponentByTag<Geometry>( "geometry" );

					if ( geo ) {

						geo.disableEdit = true;
						entity.addComponent( geo );

					}

					const mat = gltfEntity.getComponentByTag<Material>( "material" );

					if ( mat ) {

						mat.disableEdit = true;
						entity.addComponent( mat );

					}

				}

				entity.noticeParent( "update/blidge/scene", [ entity ] );

			} );

		}

		// base material

		const mat = entity.getComponentByTag<Material>( "material" );

		if ( mat ) {

			mat.uniforms = GLP.UniformsUtils.merge( mat.uniforms, this.uniforms );

		} else if ( entity.getComponentByTag<Geometry>( "geometry" ) ) {

			entity.addComponent( new Material( { disableEdit: true, name: entity.name, phase: [ "deferred", "shadowMap" ] } ) );

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

		this.cameraComponent = entity.getComponentByTag<Camera>( "camera" );

		if ( this.node.type == 'camera' && this.cameraComponent ) {

			const cameraParam = this.node.param as BLidgeCameraParam;

			this.cameraComponent.fov = cameraParam.fov;

		}

		// visibility

		entity.visible = this.node.visible;

		// onAddcomponent

		const onEntityAddComponent = ( component: Component ) => {

			if ( component instanceof Material ) {

				component.uniforms = GLP.UniformsUtils.merge( component.uniforms, this.uniforms );

			}

		};

		entity.on( "add/component", onEntityAddComponent );

		const onUnset = () => {

			entity.off( "add/component", onEntityAddComponent );

		};

		this.once( "unsetEntity", onUnset );

	}

	protected unsetEntityImpl( prevEntity: Entity ): void {

		this.cameraComponent = undefined;

		this.emit( "unsetEntity", [ prevEntity ] );

	}

	protected preUpdateImpl( event: ComponentUpdateEvent ): void {

		const entity = event.entity;
		const frame = event.timeCode * this.blidge.frame.fps;

		// animations

		this.animationCurves.forEach( ( curve ) => {

			curve.setFrame( frame );

		} );

		// transform

		if ( this.transformAutoUpdate ) {

			const curvePosition = this.animationCurves.get( 'position' );

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

			const curveRotation = this.animationCurves.get( 'rotation' );

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

			const curveScale = this.animationCurves.get( 'scale' );

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

		const curveHide = this.animationCurves.get( 'hide' );

		if ( curveHide ) {

			entity.visible = curveHide.value.x < 0.5;

		}

		// camera

		if ( this.cameraComponent ) {

			const curveFov = this.animationCurves.get( 'fov' );

			if ( curveFov ) {

				this.cameraComponent.fov = 2 * Math.atan( 12 / ( 2 * curveFov.setFrame( frame ).value.x ) ) / Math.PI * 180;

			}

		}

		// light

		if ( this.lightComponent ) {

			const curveColor = this.animationCurves.get( 'color' );

			if ( curveColor ) {

				this.lightComponent.color.copy( curveColor.setFrame( frame ).value );

			}

		}

		// uniforms

		this.uniformCurves.forEach( ( curve, name ) => {

			this.uniforms[ name ].value = curve.setFrame( frame ).value;

		} );

	}

	public onCompleteSyncScene() {
	}

}
