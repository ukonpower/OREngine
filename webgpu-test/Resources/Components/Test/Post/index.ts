import * as GLP from 'glpower';
import * as MXP from 'maxpower/webgpu';

import tintWgsl from './tint.wgsl';

// プロジェクト側から差し込むポストプロセスの見本。走っていれば四隅がわずかに色づく

// PostProcessPipeline コンポーネントの口を webgpu-test で使う例
export class Post extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		this.entity.addComponent( MXP.PostProcessPipeline ).add( {
			name: 'tint',
			wgsl: tintWgsl,
			uniforms: {
				uTint: { value: new GLP.Vector( 1.05, 0.96, 0.9 ), type: '3fv' },
			},
		} );

	}

}
