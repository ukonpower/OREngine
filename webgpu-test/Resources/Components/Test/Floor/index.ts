import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

import floorWgsl from './floor.wgsl';

// シャドウの受け手になる床
export class Floor extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entity.addComponent( MXP.Mesh, {
			geometry: new MXP.PlaneGeometry( { width: 16, height: 16, floor: true } ),
			material: new MXP.Material( {
				name: 'Floor',
				wgsl: MXP.standardVertexWgsl + floorWgsl,
				uniforms: {
					uColor: { value: new GLP.Vector( 0.75, 0.75, 0.78 ), type: '3fv' },
				},
			} ),
		} );

	}

}
