import * as MXP from 'maxpower/webgpu';

import skyBoxWgsl from './shaders/main.wgsl';

// レンダラーが持つ空の球へ独自マテリアルを差し込む
export class SkyBox extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as MXP.GPUEngine;

		engine.renderer.sky.mesh.material = new MXP.Material( {
			name: "SkyBox",
			phase: [ "deferred", "envMap" ],
			wgsl: MXP.standardVertexWgsl + skyBoxWgsl,
		} );

	}

}
