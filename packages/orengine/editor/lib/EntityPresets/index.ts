import * as MXP from 'maxpower';

// 追加メニューに並ぶエンティティの雛形。name はそのまま生成されるエンティティの既定名になる
export type EntityPreset = {
	name: string;
	components: ( typeof MXP.Component )[];
};

// Mesh を含む雛形は置かない。Mesh の geometry / material はシーン JSON に載らない
// （ProjectSerializer はコンポーネントの SerializeField しか書き出さない）ため、
// エディタで足しても読み込み直すと形の無いエンティティに戻ってしまう
export const ENTITY_PRESETS: EntityPreset[] = [
	{ name: "Empty", components: [] },
	{ name: "Light", components: [ MXP.Light ] },
	{ name: "Camera", components: [ MXP.Camera ] },
];
