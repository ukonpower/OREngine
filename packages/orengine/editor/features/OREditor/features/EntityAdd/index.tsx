import { useEffect, useRef } from 'react';

import { Menu, pointAnchor, usePopover } from 'uipower';

import { useEntityAddMenuItems } from '../../hooks/useEntityAddMenuItems';
import { useOREditor } from '../../hooks/useOREditor';

// Shift+A（editor 側の "request/addEntity"）を受けて追加メニューを開く常駐要素。
// メニュー自体は Popover の層に出るので、この要素は何も描かない
export const EntityAdd = () => {

	const { editor, engine } = useOREditor();
	const { open, closeAll } = usePopover();
	const buildMenuItems = useEntityAddMenuItems();

	// キーボードから開くときの表示位置。Blender と同じくポインタの居る場所に出す
	const pointer = useRef( { x: 0, y: 0 } );

	useEffect( () => {

		const onPointerMove = ( e: PointerEvent ) => {

			pointer.current.x = e.clientX;
			pointer.current.y = e.clientY;

		};

		window.addEventListener( "pointermove", onPointerMove );

		return () => {

			window.removeEventListener( "pointermove", onPointerMove );

		};

	}, [] );

	useEffect( () => {

		const onRequest = () => {

			// 連打で同じメニューが積み上がらないよう、開いているものは畳んでから出す
			closeAll();

			// Blender と同じくシーン直下へ足す。選択中エンティティの子にしたいときは Hierarchy の右クリックから
			open(
				<Menu title="Add Entity" items={buildMenuItems( engine.root )} />,
				pointAnchor( pointer.current.x, pointer.current.y )
			);

		};

		editor.on( "request/addEntity", onRequest );

		return () => {

			editor.off( "request/addEntity", onRequest );

		};

	}, [ editor, engine, open, closeAll, buildMenuItems ] );

	return null;

};
