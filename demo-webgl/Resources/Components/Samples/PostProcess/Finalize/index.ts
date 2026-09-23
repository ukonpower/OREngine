import * as MXP from 'maxpower';
import { Engine } from 'orengine';

import finalizeFrag from './shaders/finalize.fs';

// レンズ歪み・色収差・周辺減光をかける作風のパス。
// シーンカメラに付けると、エンジンの仕上げ（トーンマップ・FXAA・ブルーム）の後に走る
export class Finalize extends MXP.Component {

	constructor( params: MXP.ComponentParams ) {

		super( params );

		const engine = this.engine as Engine;

		let pipeline = this.entity.getComponent( MXP.PostProcessPipeline );

		if ( ! pipeline ) {

			pipeline = this.entity.addComponent( MXP.PostProcessPipeline );

		}

		const pass = new MXP.PostProcessPass( engine.renderer.backend, {
			name: 'finalize',
			frag: finalizeFrag,
		} );

		const postProcess = pipeline.add( new MXP.PostProcess( {
			name: 'Finalize',
			passes: [ pass ],
		} ) );

		// 同じエンティティの PostProcessPipeline には他のコンポーネントのパスも載りうるので、自分の分だけ外す
		this.once( 'dispose', () => {

			pipeline.remove( postProcess );

		} );

		if ( import.meta.hot ) {

			import.meta.hot.accept( './shaders/finalize.fs', ( module ) => {

				if ( module ) {

					pass.frag = module.default;

				}

				pass.requestUpdate();

			} );

		}

	}

}
