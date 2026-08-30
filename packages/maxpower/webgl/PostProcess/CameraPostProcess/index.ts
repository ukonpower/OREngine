import { Entity } from '../../../core/Entity';
import { PostProcessPipeline } from '../../Components/PostProcessPipeline';
import { Bloom } from '../Bloom';
import { ColorGrading } from '../ColorGrading';
import { Finalize } from '../Finalize';
import { FXAA } from '../FXAA';

import type { GLEngine } from '../../Renderer';

// カメラ標準のポストプロセス（FXAA → Bloom → ColorGrading → Finalize）をエンティティへ付ける。
// webgpu側は同名のno-op（同等のパスがレンダラーのPipelinePostProcessに組み込み済み）を輸出する。
// 戻り値は取り外し関数
export const setupCameraPostProcess = ( engine: GLEngine, entity: Entity ) => {

	const pipeline = entity.addComponent( PostProcessPipeline );
	const backend = engine.renderer.backend;

	const bloom = new Bloom( backend );
	bloom.threshold = 1.0;
	bloom.brightness = 1;

	pipeline.add( new FXAA( backend ) );
	pipeline.add( bloom );
	pipeline.add( new ColorGrading( backend ) );
	pipeline.add( new Finalize( backend ) );

	return () => {

		entity.removeComponent( PostProcessPipeline );

	};

};
