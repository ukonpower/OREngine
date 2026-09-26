import { type KeyFrameState } from 'orengine/editor';
import { KeyframeIcon } from 'uipower';

import style from './index.module.scss';

// フィールドのキーの状態の印（Blender のプロパティの色と同じ意味）。
// 塗りは今の時刻にキーがあるか、色は 手で変えた（橙）> キーがある（黄）> アニメーションしている（緑）の順に決める
export const KeyFrameIndicator = ( props: { state: KeyFrameState } ) => {

	let tone = "animated";

	if ( props.state.changed ) {

		tone = "changed";

	} else if ( props.state.keyed ) {

		tone = "keyed";

	}

	return <span className={style.indicator} data-tone={tone}>
		<KeyframeIcon size={10} filled={props.state.keyed} />
	</span>;

};
