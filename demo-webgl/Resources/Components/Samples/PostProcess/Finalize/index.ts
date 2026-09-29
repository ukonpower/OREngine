import * as MXP from 'maxpower';

import finalizeFrag from './shaders/finalize.fs';

// レンズ歪み・色収差・周辺減光をかける作風のパス。
// シーンカメラに付けると、エンジンの仕上げ（トーンマップ・FXAA・ブルーム）の後に走る
export class Finalize extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		let pipeline = this.entity.getComponent( MXP.PostProcessPipeline );

		if ( ! pipeline ) {

			pipeline = this.entity.addComponent( MXP.PostProcessPipeline );

		}

		const param: MXP.PostProcessPipelinePassParam = { name: 'finalize', frag: finalizeFrag };

		pipeline.add( param );

		// 同じエンティティの PostProcessPipeline には他のコンポーネントのパスも載りうるので、自分の分だけ外す
		this.once( 'dispose', () => {

			pipeline.remove( param );

		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/finalize.fs', ( module ) => {

				if ( module ) {

					param.frag = module.default;

				}

				// 実体はビューごとに宣言から組まれるので、宣言を書き換えてから組み直させる
				pipeline.rebuild();

			} );

		}

	}

}
