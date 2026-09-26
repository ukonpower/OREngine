import type { KeyFrameData } from '../../Animation/KeyFrameDecoder';
import type { Entity, EntityParams } from '../../Entity';
import type { RendererContract } from '../RendererContract';

// シーンのカーブの1本。name は共有するカーブに付ける表示名で、実行時は読まない
export type CurveData = {
	name?: string;
	k: KeyFrameData[];
};

// シーンに1つのカーブの表。キーはカーブ ID で、Animation コンポーネントのリンクが ID で指す
export type CurveTable = { [id: string]: CurveData };

// Entity / Component が所属先のエンジンに要求する口。実体は orengine の Engine
export interface EngineContract<TRenderer extends RendererContract = RendererContract> {
	readonly renderer: TRenderer;
	// 編集・読み込みのたびに表ごと差し替わる。使う側は差し替わりを見てカーブを作り直す
	readonly curves: CurveTable;
	createEntity( params?: Omit<EntityParams, 'engine'> ): Entity;
}
