import * as GLP from 'glpower';

import { Component, ComponentParams, ComponentUpdateEvent } from "..";
import { BLidge, BLidgeNode, BLidgeLightParam, BLidgeCameraParam } from "../../BLidge";
import { Geometry } from '../../Geometry';
import { CubeGeometry } from '../../Geometry/CubeGeometry';
import { CylinderGeometry } from '../../Geometry/CylinderGeometry';
import { PlaneGeometry } from '../../Geometry/PlaneGeometry';
import { SphereGeometry } from '../../Geometry/SphereGeometry';
import { Camera } from '../Camera';
import { Light } from '../Light';
import { Mesh } from '../Mesh';

export class BLidger extends Component {

	public node: BLidgeNode;
	public rotationOffsetX: number;
	public animations: Map<string, GLP.FCurveGroup>;
	public uniforms: GLP.Uniforms;
	public uniformCurves: Map<string, GLP.FCurveGroup>;
	public transformAutoUpdate: boolean;

	private _blidge: BLidge;
	private _cameraComponent?: Camera;
	private _lightComponent?: Light;

	constructor( params: ComponentParams ) {

		super( params );

		this.rotationOffsetX = 0;
		this.animations = new Map();
		this.uniforms = {};
		this.uniformCurves = new Map();
		this.transformAutoUpdate = true;
		this._blidge = params.args.blidge;
		this.node = params.args.node;

		// rotationOffset

		if ( this.node.type == "camera" ) {

			this.rotationOffsetX = - Math.PI / 2;

		}

		// animations

		const animationCurveKeys = Object.keys( this.node.animations );

		for ( let i = 0; i < animationCurveKeys.length; i ++ ) {

			const name = animationCurveKeys[ i ];

			this.animations.set( name, this._blidge.getCurveGroup( this.node.animations[ name ] ) );

		}

		// uniforms

		const uniformCurveKeys = Object.keys( this.node.material.uniforms );

		for ( let i = 0; i < uniformCurveKeys.length; i ++ ) {

			const name = uniformCurveKeys[ i ];
			const accessor = this.node.material.uniforms[ name ];
			const curve = this._blidge.curveGroups[ accessor ];

			if ( curve ) {

				this.uniformCurves.set( name, curve );

				this.uniforms[ name ] = {
					type: '4fv',
					value: curve.value
				};

			}

		}

		const entity = this.entity;

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
						mesh.material = gltfMesh.material;

					}

				}

				entity.noticeEventParent( "update/blidge/scene", [ entity ] );

			} );

		}

		// light

		if ( this.node.type == "light" ) {

			const lightParam = this.node.param as BLidgeLightParam;

			this._lightComponent = entity.addComponent( Light );
			this._lightComponent.deserialize( {
				...lightParam,
				lightType: lightParam.type,
				color: new GLP.Vector().copy( lightParam.color ),
				castShadow: lightParam.shadowMap,
			} );

		}

		// camera

		if ( this.node.type == 'camera' ) {

			this._cameraComponent = entity.getComponentsByTag<Camera>( "camera" )[ 0 ];

			if ( this._cameraComponent ) {

				const cameraParam = this.node.param as BLidgeCameraParam;

				this._cameraComponent.fov = cameraParam.fov;

			}

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

	protected preUpdateImpl( event: ComponentUpdateEvent ): void {

		if ( ! this._blidge || ! this.node ) return;

		const entity = event.entity;
		const frame = ( event.timeCode * this._blidge.frame.fps );

		// animations

		this.animations.forEach( ( anim ) => {

			anim.setFrame( frame );

		} );

		// transform

		if ( this.transformAutoUpdate ) {

			const curvePosition = this.animations.get( 'position' );

			if ( this.entity.name == "camera" ) {

				console.log( curvePosition );


			}

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

		if ( this._lightComponent ) {

			const curveColor = this.animations.get( 'color' );

			if ( curveColor ) {

				this._lightComponent.color.copy( curveColor.setFrame( frame ).value );

			}

		}

		// uniforms

		this.uniformCurves.forEach( ( curve, name ) => {

			this.uniforms[ name ].value = curve.setFrame( frame ).value;

		} );

	}

}
