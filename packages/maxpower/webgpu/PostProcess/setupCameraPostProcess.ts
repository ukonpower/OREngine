import { Entity } from '../../core/Entity';

import type { GPUEngine } from '../Renderer';

// webgl側の setupCameraPostProcess と同じ口。
// FXAA / Bloom / ColorGrading / Finalize 相当はレンダラーのPipelinePostProcessに
// 組み込み済みのため、webgpuでは何も足さない
export const setupCameraPostProcess = ( _engine: GPUEngine, _entity: Entity ) => {

	return () => {};

};
