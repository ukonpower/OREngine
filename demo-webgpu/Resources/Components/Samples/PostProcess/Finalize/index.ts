import * as MXP from 'maxpower/webgpu';

import finalizeWgsl from './shaders/finalize.wgsl';

// レンズ歪み・色収差・周辺減光をかける作風のパス。
// シーンカメラに付けると、エンジンの仕上げ（トーンマップ・FXAA・ブルーム）の後に走る。
// PostProcessPipeline のパスは requestShaderReload で作り直されないので、.wgsl の変更はフルリロードで反映する
export class Finalize extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		let pipeline = this.entity.getComponent( MXP.PostProcessPipeline );

		if ( ! pipeline ) {

			pipeline = this.entity.addComponent( MXP.PostProcessPipeline );

		}

		const param: MXP.PostProcessPassParam = { name: 'finalize', wgsl: finalizeWgsl };

		pipeline.add( param );

		// 同じエンティティの PostProcessPipeline には他のコンポーネントのパスも載りうるので、自分の分だけ外す
		this.once( 'dispose', () => {

			pipeline.remove( param );

		} );

	}

}
