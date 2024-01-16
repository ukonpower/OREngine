import * as GLP from 'glpower';

import { Component, ComponentUpdateEvent } from "..";
import { Entity } from '../../Entity';
import { Light } from '../Light';
import { Material } from '../Material';
import { SphereGeometry } from "../Geometry/SphereGeometry";
import { CubeGeometry } from "../Geometry/CubeGeometry";
import { BLidge, BLidgeNode, BLidgeLightParam } from "../../BLidge";
import { CylinderGeometry } from "../Geometry/CylinderGeometry";
import { Geometry } from "../Geometry";
import { PlaneGeometry } from "../Geometry/PlaneGeometry";

export class BLidger extends Component {

	private blidge: BLidge;

	public node: BLidgeNode;

	public rotationOffsetX: number;

	public curvePosition?: GLP.FCurveGroup;
	public curveRotation?: GLP.FCurveGroup;
	public curveScale?: GLP.FCurveGroup;
	public curveHide?: GLP.FCurveGroup;

	public uniforms: GLP.Uniforms;
	public uniformCurves: {name: string, curve: GLP.FCurveGroup}[];

	constructor( blidge: BLidge, node: BLidgeNode ) {

		super();

		this.blidge = blidge;

		this.node = node;

		this.rotationOffsetX = 0;

		if ( this.node.type == "camera" ) {

			this.rotationOffsetX = - Math.PI / 2;

		}

		this.curvePosition = blidge.getCurveGroup( node.animation.position );
		this.curveRotation = blidge.getCurveGroup( node.animation.rotation );
		this.curveScale = blidge.getCurveGroup( node.animation.scale );
		this.curveHide = blidge.getCurveGroup( node.animation.hide );

		// uniforms

		this.uniforms = {};
		this.uniformCurves = [];

		const keys = Object.keys( node.material.uniforms );

		for ( let i = 0; i < keys.length; i ++ ) {

			const name = keys[ i ];
			const accessor = node.material.uniforms[ name ];
			const curve = blidge.curveGroups.find( curve => curve.name == accessor );

			if ( curve ) {

				this.uniformCurves.push( {
					name: name,
					curve: curve
				} );

				this.uniforms[ name ] = {
					type: '4fv',
					value: curve.value
				};

			}

		}

	}

	protected setEntityImpl( entity: Entity | null, prevEntity: Entity | null ): void {

		if ( entity ) {

			entity.name = this.node.name;

			// transform

			entity.position.set( this.node.position[ 0 ], this.node.position[ 1 ], this.node.position[ 2 ] );

			entity.quaternion.setFromEuler( {
				x: this.node.rotation[ 0 ] + this.rotationOffsetX,
				y: this.node.rotation[ 1 ],
				z: this.node.rotation[ 2 ],
			}, 'YZX' );

			entity.scale.set( this.node.scale[ 0 ], this.node.scale[ 1 ], this.node.scale[ 2 ] );

			// geometry

			if ( this.node.type == 'cube' ) {

				const cubeParam = this.node.param as any;

				entity.addComponent( 'geometry', new CubeGeometry( cubeParam.x, cubeParam.y, cubeParam.z, 10, 10, 10 ) );

			} else if ( this.node.type == 'sphere' ) {

				const sphereParam = this.node.param as any;
				entity.addComponent( 'geometry', new SphereGeometry( sphereParam.r ) );

			} else if ( this.node.type == 'cylinder' ) {

				const cylinderParam = this.node.param as any;

				entity.addComponent( 'geometry', new CylinderGeometry() );

			} else if ( this.node.type == 'plane' ) {

				const planeParam = this.node.param as any;

				entity.addComponent( 'geometry', new PlaneGeometry( planeParam.x, planeParam.y ) );

			} else if ( this.node.type == 'mesh' ) {

				const geometryParam = this.node.param as any;

				const geometry = new Geometry();
				geometry.setAttribute( 'position', geometryParam.position, 3 );
				geometry.setAttribute( 'uv', geometryParam.uv, 2 );
				geometry.setAttribute( 'normal', geometryParam.normal, 3 );
				geometry.setAttribute( 'index', geometryParam.index, 3 );
				entity.addComponent( 'geometry', geometry );

			} else if ( this.node.type == 'gltf' ) {

				this.blidge.gltfPrm.then( gltf => {

					const gltfEntity = gltf.scene.getEntityByName( this.node.name );

					if ( gltfEntity ) {

						const geo = gltfEntity.getComponent<Geometry>( "geometry" );

						if ( geo ) {

							entity.addComponent( 'geometry', geo );

						}

						const mat = gltfEntity.getComponent<Material>( "material" );

						if ( mat ) {

							entity.addComponent( 'material', mat );

						}

					}

				} );

			}

			// base material

			const mat = entity.getComponent<Material>( "material" );

			if ( mat ) {

				mat.uniforms = GLP.UniformsUtils.merge( mat.uniforms, this.uniforms );

			} else if ( entity.getComponent( "geometry" ) ) {

				entity.addComponent( "material", new Material( { name: entity.name, type: [ "deferred", "shadowMap" ] } ) );

			}

			// light

			if ( this.node.type == "light" ) {

				const lightParam = this.node.param as BLidgeLightParam;

				entity.addComponent( 'light', new Light( {
					...lightParam,
					lightType: lightParam.type,
					color: new GLP.Vector().copy( lightParam.color ),
					useShadowMap: lightParam.shadowMap,
				} ) );

			}

			entity.visible = this.node.visible;

		}

	}

	protected preUpdateImpl( event: ComponentUpdateEvent ): void {

		const entity = event.entity;
		const frame = this.blidge.frame.current;

		if ( this.curvePosition ) {

			const position = this.curvePosition.setFrame( frame ).value;

			if ( this.curvePosition.getFCurve( 'x' ) ) {

				entity.position.x = position.x;

			}

			if ( this.curvePosition.getFCurve( 'y' ) ) {

				entity.position.y = position.y;

			}

			if ( this.curvePosition.getFCurve( 'z' ) ) {

				entity.position.z = position.z;

			}

		}

		if ( this.curveRotation ) {

			const rot = {
				x: this.node.rotation[ 0 ],
				y: this.node.rotation[ 1 ],
				z: this.node.rotation[ 2 ],
			};

			const rotValue = this.curveRotation.setFrame( frame ).value;

			if ( this.curveRotation.getFCurve( 'x' ) ) {

				rot.x = rotValue.x;

			}

			if ( this.curveRotation.getFCurve( 'y' ) ) {

				rot.y = rotValue.y;

			}

			if ( this.curveRotation.getFCurve( 'z' ) ) {

				rot.z = rotValue.z;

			}

			entity.quaternion.setFromEuler( {
				x: rot.x + this.rotationOffsetX,
				y: rot.y,
				z: rot.z
			}, 'YZX' );

		}

		if ( this.curveScale ) {

			const scaleValue = this.curveScale.setFrame( frame ).value;

			if ( this.curveScale.getFCurve( 'x' ) ) {

				entity.scale.x = scaleValue.x;

			}

			if ( this.curveScale.getFCurve( 'y' ) ) {

				entity.scale.y = scaleValue.y;

			}

			if ( this.curveScale.getFCurve( 'z' ) ) {

				entity.scale.z = scaleValue.z;

			}

		}

		if ( this.curveHide ) {

			entity.visible = this.curveHide.setFrame( frame ).value.x < 0.5;

		}

		for ( let i = 0; i < this.uniformCurves.length; i ++ ) {

			const curve = this.uniformCurves[ i ];
			this.uniforms[ curve.name ].value = curve.curve.setFrame( frame ).value;

		}

	}

	public onCompleteSyncScene() {
	}

}
