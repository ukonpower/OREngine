import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

import sphereWgsl from './sphere.wgsl';

const SPHERES = [
	{ name: 'mirror', x: - 3.5, color: new GLP.Vector( 0.95, 0.93, 0.88 ), roughness: 0.05, metallic: 1.0 },
	{ name: 'brushed', x: 0, color: new GLP.Vector( 0.9, 0.85, 0.55 ), roughness: 0.35, metallic: 1.0 },
	{ name: 'diffuse', x: 3.5, color: new GLP.Vector( 0.8, 0.3, 0.35 ), roughness: 0.8, metallic: 0.0 },
];

// 環境マップの映り込みを見るための金属球。roughnessを変えて事前フィルタのミップ差を確認する
export class Spheres extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		for ( const sphere of SPHERES ) {

			const entity = this.engine.createEntity( { name: sphere.name } );

			entity.position.set( sphere.x, 1.4, - 3 );

			entity.addComponent( MXP.Mesh, {
				geometry: new MXP.SphereGeometry( { radius: 1.4, widthSegments: 32, heightSegments: 24 } ),
				material: new MXP.Material( {
					name: sphere.name,
					wgsl: MXP.standardVertexWgsl + sphereWgsl,
					uniforms: {
						uColor: { value: sphere.color, type: '3fv' },
						uRoughness: { value: sphere.roughness, type: '1f' },
						uMetallic: { value: sphere.metallic, type: '1f' },
					},
				} ),
			} );

			this.entity.add( entity );

		}

	}

}
