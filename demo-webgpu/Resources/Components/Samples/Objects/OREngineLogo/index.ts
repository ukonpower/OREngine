import * as MXP from 'maxpower/webgpu';

import fragWgsl from './shaders/main.wgsl';

// BLidgerが読み込んだglTFメッシュ（ロゴ）へ独自マテリアルを差し込む
export class OREngineLogo extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const mesh = this.entity.getComponent( MXP.Mesh );

		if ( mesh ) {

			mesh.material = new MXP.Material( {
				name: "OREngineLogo",
				phase: [ "deferred", "shadowMap" ],
				wgsl: MXP.standardVertexWgsl + fragWgsl,
			} );

		}

	}

}
