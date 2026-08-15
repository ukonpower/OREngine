import type { Entity } from '../../core/Entity';
import type { HeadlessEngine } from '../Renderer';

// webgl側の setupCameraPostProcess と同じ口。
// ポストプロセスのパスを持たないので何も足さない。戻り値は取り外し関数
export const setupCameraPostProcess = ( _engine: HeadlessEngine, _entity: Entity ) => {

	return () => {};

};
