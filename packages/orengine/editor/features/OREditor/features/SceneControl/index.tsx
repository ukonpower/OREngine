import { useState } from 'react';

import { ArrowIcon, Block, Button, Label, pointAnchor } from 'uipower';

import { useOREditor } from '../../hooks/useOREditor';

import { SceneWindow } from './components/SceneWindow';
import style from './index.module.scss';

import type { AnchorRect } from 'uipower';

// 開いているシーンの表示と保存。選択・追加・削除は Scenes ウィンドウに集約する
export const SceneControl = () => {

	const { editor, projectName, scenes } = useOREditor();

	// ウィンドウを開いたクリックの位置。null なら閉じている
	const [ windowAnchor, setWindowAnchor ] = useState<AnchorRect | null>( null );

	let sceneElm = null;

	if ( scenes ) {

		sceneElm = <Label title='scene'>
			<button className={style.select} onClick={( event ) => {

				setWindowAnchor( pointAnchor( event.clientX, event.clientY ) );

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
				<div className={style.save}>
					<Button onClick={() => {

						editor.save();

					}}>Save</Button>
				</div>
			</Block>
		</div>
		{windowAnchor && scenes && <SceneWindow scenes={scenes} projectName={projectName} anchor={windowAnchor} onClose={() => {

			setWindowAnchor( null );

		}} />}
	</div>;

};
