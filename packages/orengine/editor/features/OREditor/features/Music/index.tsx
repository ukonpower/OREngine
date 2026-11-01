import { useState } from 'react';

import { Music as MusicComponent } from '../../../../../builtin/Components/Utility/Music';
import { useEditorFrame } from '../../hooks/useEditorFrame';

import { MusicTimeline } from './components/MusicTimeline';
import style from './index.module.scss';

// Music パネル。シーンの Music（Music.instance）のトラックと帯を編集する。
// Music はシーンの読み込み・コンポーネントの追加削除で入れ替わるので、エディタのフレームごとに今のものを確かめる
export const Music = () => {

	const [ music, setMusic ] = useState<MusicComponent | null>( MusicComponent.instance );

	useEditorFrame( () => {

		if ( MusicComponent.instance !== music ) {

			setMusic( MusicComponent.instance );

		}

	} );

	if ( ! music ) {

		return <div className={style.empty}>No Music component in the scene</div>;

	}

	// Music が入れ替わったら表示範囲・選択ごと作り直す（前のシーンの帯の番号を指したまま残さない）
	return <MusicTimeline key={music.uuid} music={music} />;

};
