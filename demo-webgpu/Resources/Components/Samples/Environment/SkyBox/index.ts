import * as MXP from 'maxpower/webgpu';

import skyBoxWgsl from './shaders/skyBox.wgsl';

// レンダラーが持つ空の球へ独自マテリアルを差し込む
export class SkyBox extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as MXP.GPUEngine;

		const material = new MXP.Material( {
			name: "SkyBox",
			phase: [ "deferred", "envMap" ],
			wgsl: MXP.standardVertexWgsl + skyBoxWgsl,
		} );

		engine.renderer.sky.mesh.material = material;

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/skyBox.wgsl', ( m ) => {

				if ( m ) material.wgsl = MXP.standardVertexWgsl + m.default;

				MXP.requestShaderReload();

			} );

		}

	}

}
