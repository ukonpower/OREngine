import * as MXP from 'maxpower/webgpu';

import fragWgsl from './shaders/main.wgsl';

// BLidgerが作ったキューブのメッシュへ独自マテリアルを差し込む
export class OREngineCube extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			mesh.material = new MXP.Material( {
				name: "OREngineCube",
				phase: [ "shadowMap", "deferred" ],
				wgsl: MXP.standardVertexWgsl + fragWgsl,
			} );

		}

	}

}
