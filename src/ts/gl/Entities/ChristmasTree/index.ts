import * as GLP from 'glpower';
import * as MXP from 'maxpower';


import leafFrag from './shaders/leaf.fs';
import branchFrag from './shaders/branch.fs';
import plantFrag from './shaders/plant.fs';
import plantVert from './shaders/plant.vs';

import ornamentFrag from './shaders/ornament.fs';

import { pane, power } from '~/ts/Globals';
import { randomSeed } from '../../utils/Math';
import { Modeler } from '../../utils/Modeler';
import { paneRegister } from '../../utils/Pane';

let PlantParam = {
	root: {
		num: { value: 1, min: 0, max: 10, step: 1 },
		up: { value: 1, min: 0, max: 1, step: 0.01 }
	},
	branch: {
		num: { value: 60, min: 0, max: 80, step: 1 },
		depth: { value: 2, min: 0, max: 5, step: 1 },
		start: { value: 0.6, min: 0, max: 1, step: 0.01 },
		end: { value: 1.0, min: 0, max: 1, step: 0.01 },
		up: { value: - 0.2, min: - 1, max: 1, step: 0.01 },
		wide: { value: 1.0, min: 0, max: 1, step: 0.01 },
		curve: { value: - 0.3, min: - 1, max: 1, step: 0.01 },
		lengthMultiplier: { value: 1.0, min: 0, max: 2, step: 0.01 },
		lengthRandom: { value: 0.0, min: 0, max: 1, step: 0.01 },
		cone: { value: 1.0, min: 0, max: 1, step: 0.01 },
	},
	shape: {
		length: { value: 0.72, min: 0, max: 2, step: 0.01 },
		radius: { value: 0.005, min: 0, max: 0.05, step: 0.001 },
	},
	leaf: {
		size: { value: 0.6, min: 0, max: 1, step: 0.01 },
		dpeth: { value: 1, min: 0, max: 5, step: 1 },
	},
	seed: { value: 3, min: 0, max: 9999, step: 1 }
};

const local = localStorage.getItem( "plant" );

if ( local ) {

	PlantParam = PlantParam;
	// PlantParam = JSON.parse( local );

}

const plantFolder = pane.addFolder( { title: "plant" } );

paneRegister( plantFolder, PlantParam );

let random = randomSeed( PlantParam.seed.value );

export class ChristmasTree extends MXP.Entity {

	private assets: MXP.Entity | null = null;
	private leaf: MXP.Entity | null = null;
	private root: MXP.Entity | null = null;

	constructor() {

		super();

		const branch = ( i : number, direction: GLP.Vector, radius: number, length: number ): MXP.Entity => {

			const branchEntity = new MXP.Entity();

			// branch curve

			const curve = new MXP.Curve();
			const points: MXP.CurvePoint[] = [];

			points.push( {
				x: 0,
				y: 0,
				z: 0,
			} );

			const segs = 3;

			for ( let i = 0; i < segs; i ++ ) {

				const w = ( i / ( segs - 1 ) );

				const p = new GLP.Vector();
				p.add( direction.clone().multiply( length * w ) );

				const offsetY = ( Math.log2( w + 1 ) - w ) * PlantParam.branch.curve.value * 4.0;
				p.y += offsetY * length;

				points.push( {
					x: p.x, y: p.y, z: p.z,
					weight: 1.0 - w * 0.8
				} );

			}

			curve.setPoints( points );

			// branch mesh

			const geo = new MXP.CurveGeometry( curve, radius, 12, 8 );
			geo.setAttribute( "materialId", new Float32Array( new Array( geo.vertCount ).fill( 0 ) ), 1 );
			branchEntity.addComponent( "geometry", geo );

			// leaf

			if ( i >= PlantParam.leaf.dpeth.value && this.leaf ) {

				const num = 6;

				for ( let j = 0; j < num; j ++ ) {

					const point = curve.getPoint( ( j / num ) * 0.2 + 0.8 );

					const leafEntity = new MXP.Entity();

					const geo = this.leaf.getComponent<MXP.Geometry>( "geometry" )!;
					geo.setAttribute( "materialId", new Float32Array( new Array( geo.vertCount ).fill( 1 ) ), 1 );
					leafEntity.addComponent( "geometry", geo );

					const size = PlantParam.leaf.size.value;
					leafEntity.scale.set( size );

					leafEntity.position.copy( point.position );
					leafEntity.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.0, 0.0, Math.PI / 2 ) ) );
					leafEntity.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0.0, j / num * Math.PI * 3.0, 0.0 ) ) );
					leafEntity.quaternion.multiply( new GLP.Quaternion().setFromMatrix( point.matrix ) );

					const pos = new GLP.Vector( 0, 0.0, 0.0 );
					pos.applyMatrix3( point.matrix );

					leafEntity.position.add( pos );

					branchEntity.add( leafEntity );

				}

			}

			// child branch

			if ( i < PlantParam.branch.depth.value - 1 ) {

				const branches = PlantParam.branch.num.value;

				for ( let j = 0; j < branches; j ++ ) {

					let p = j / ( branches - 1 ) * ( PlantParam.branch.end.value - PlantParam.branch.start.value ) + PlantParam.branch.start.value;

					if ( i < 2 ) {

						p = j / ( branches - 1 ) * 0.4 + 0.6;

					}

					const pointPos = ( branches == 1 ? 0.5 : p );
					const point = curve.getPoint( pointPos );

					const nd = direction.clone();
					nd.normalize();

					const theta = ( j / branches ) * Math.PI * 11.0;
					nd.x += Math.sin( theta ) * PlantParam.branch.wide.value;
					nd.z += Math.cos( theta ) * PlantParam.branch.wide.value;
					nd.normalize();

					const nextDir = new GLP.Vector( 0.0, Math.sin( PlantParam.branch.up.value * Math.PI / 2.0 ), Math.cos( PlantParam.branch.up.value * Math.PI / 2.0 ) ).normalize();
					const nextLength = length * PlantParam.branch.lengthMultiplier.value * ( 1.0 - random() * PlantParam.branch.lengthRandom.value ) * ( 1.0 - pointPos * PlantParam.branch.cone.value );

					const child = branch( i + 1, nextDir, radius * point.weight, nextLength );
					child.quaternion.setFromEuler( new GLP.Euler( 0.0, Math.atan2( nd.x, nd.z ), 0.0 ) );

					child.position.add( point.position );
					branchEntity.add( child );

				}

			}

			return branchEntity;

		};

		let plant: MXP.Entity | null = null;

		const create = () => {

			random = randomSeed( PlantParam.seed.value );

			if ( plant ) {

				this.remove( plant );

			}

			plant = new MXP.Entity();

			const modeler = new Modeler( power );

			for ( let i = 0; i < PlantParam.root.num.value; i ++ ) {

				const dir = new GLP.Vector( 0.0, Math.sin( PlantParam.root.up.value * Math.PI / 2.0 ), Math.cos( PlantParam.root.up.value * Math.PI / 2.0 ) ).normalize();
				const b = branch( 0, dir, PlantParam.shape.radius.value, PlantParam.shape.length.value );

				const bModel = new MXP.Entity();
				bModel.quaternion.setFromEuler( new GLP.Euler( 0.0, i / PlantParam.root.num.value * Math.PI * 2.0, 0.0 ) );

				bModel.addComponent( "geometry", modeler.bakeEntity( b, { materialId: { size: 1, type: Float32Array } } ) );
				bModel.addComponent( "material", new MXP.Material() );
				const mat = bModel.addComponent( "material", this.leaf!.getComponent<MXP.Material>( "material" )! );
				mat.frag = plantFrag;
				mat.vert = plantVert;
				mat.cullFace = false;

				const ornamentNum = 50;

				for ( let i = 0; i < ornamentNum; i ++ ) {

					// ornament

					if ( this.assets ) {

						const index = i / ornamentNum;
						const theta = index * Math.PI * 8.5 + Math.PI / 2;

						const posX = Math.sin( theta );
						const posZ = Math.cos( theta );

						const rad = 0.3 * ( 1.0 - index );
						const oPos = new GLP.Vector( posX * rad, Math.pow( index, 1.8 ) * 0.6 + 0.2, posZ * rad );

						const ornamentEntity = new MXP.Entity();

						const ornamentList = [
							"Ornament_1",
							"Ornament_1",
							"Ornament_1",
							"Ornament_1",
							"Ornament_1",
							"Ornament_2",
							"Ornament_2",
							"Ornament_3",
							"Ornament_3",
							"Ornament_4",
						];

						const ornamentType = ornamentList[ Math.floor( random() * ornamentList.length ) ];

						const geo = this.assets.getEntityByName( ornamentType )!.getComponent<MXP.Geometry>( "geometry" )!;
						const mat = this.assets.getEntityByName( ornamentType )!.getComponent<MXP.Material>( "material" )!;

						ornamentEntity.addComponent( "geometry", geo );
						const oMat = ornamentEntity.addComponent<MXP.Material>( "material", new MXP.Material( {
							uniforms: { ...mat.uniforms, uType: {
								value: Math.floor( random() * 2.0 ),
								type: "1f"
							} },
							defines: {
								...mat.defines,
							},
							frag: ornamentFrag,
							vert: mat.vert
						} ) );

						( oMat.defines as any )[ ornamentType.toUpperCase() ] = "";

						ornamentEntity.position.copy( oPos );
						ornamentEntity.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( 0, Math.random() * Math.PI * 2.0, 0.0 ) ) );
						ornamentEntity.scale.multiply( 0.6 );

						bModel.add( ornamentEntity );

					}

				}

				plant.add( bModel );

			}

			this.add( plant );

			this.root = plant;

		};

		// onchange

		plantFolder.on( "change", ( e ) =>{

			create();

			localStorage.setItem( "plant", JSON.stringify( PlantParam ) );

		} );

		// assets

		const loader = new MXP.GLTFLoader();

		loader.load( BASE_PATH + "/scene.glb" ).then( gltf => {

			const leaf = gltf.scene.getEntityByName( "LeafPine" );

			this.leaf = leaf!;
			this.assets = gltf.scene.getEntityByName( "Assets" )!;

			create();

		} );

	}

	protected updateImpl( event: MXP.EntityUpdateEvent ): void {

		this.root?.children.forEach( ( item, i ) => {

			const wind = ( Math.sin( event.time * 1.0 ) * 0.5 + 0.5 ) * ( Math.sin( event.time * 1.4 ) * 0.5 + 0.5 );
			// item.quaternion.multiply( new GLP.Quaternion().setFromEuler( new GLP.Euler( Math.sin( event.time * 8.0 + i ) * wind * 0.006, 0.0, 0.0 ) ) );

		} );


	}

}
