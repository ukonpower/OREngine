import { useState } from 'react';

import { ArrowIcon, Block, Button, Label } from 'uipower';

import { useOREditor } from '../../hooks/useOREditor';

import { SceneWindow } from './components/SceneWindow';
import style from './index.module.scss';

// 開いているシーンの表示と保存。選択・追加・削除は Scenes ウィンドウに集約する
export const SceneControl = () => {

	const { editor, projectName, scenes } = useOREditor();
	const [ windowOpen, setWindowOpen ] = useState( false );

	let sceneElm = null;

	if ( scenes ) {

		sceneElm = <Label title='scene'>
			<button className={style.select} onClick={() => {

				setWindowOpen( true );

			}}>
				<span className={style.select_name}>{scenes.current ?? '-'}</span>
				{/* 押すと一覧が開くことを示す下向きの三角 */}
				<ArrowIcon open />
			</button>
		</Label>;

	}

	return <div className={style.sceneControl}>
		<div className={style.sceneControl_inner}>
			<Block label={projectName} accordion >
				{sceneElm}
				<Button onClick={() => {

					editor.save();

				}}>Save</Button>
			</Block>
		</div>
		{windowOpen && scenes && <SceneWindow scenes={scenes} projectName={projectName} onClose={() => {

			setWindowOpen( false );

		}} />}
	</div>;

};
