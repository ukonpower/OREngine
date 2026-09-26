import { useEffect, useRef } from 'react';

import style from './index.module.scss';

import type { TabDragState } from '../../hooks/useTabDrag';

// カーソル直下の要素判定（elementFromPoint）や視認性を邪魔しないよう、ゴーストは少し右下へずらす
const GHOST_OFFSET = 12;

// ドラッグ中だけ重ねる装飾層。ドロップ先ハイライトは props 駆動、
// ゴーストの追従は pointermove で style を直接書く（毎フレーム再レンダリングしない）
export const DragOverlay = ( props: { drag: TabDragState } ) => {

	const ghostRef = useRef<HTMLDivElement>( null );

	const startX = props.drag.startX;
	const startY = props.drag.startY;

	useEffect( () => {

		const move = ( x: number, y: number ) => {

			const el = ghostRef.current;

			if ( el ) el.style.transform = `translate(${ x + GHOST_OFFSET }px, ${ y + GHOST_OFFSET }px)`;

		};

		move( startX, startY );

		const onMove = ( e: PointerEvent ) => move( e.clientX, e.clientY );

		window.addEventListener( 'pointermove', onMove );

		// ドラッグで通過する要素のテキストが選択されないよう、掴んでいる間だけ選択を切る
		const prevUserSelect = document.body.style.userSelect;
		document.body.style.userSelect = 'none';

		return () => {

			window.removeEventListener( 'pointermove', onMove );
			document.body.style.userSelect = prevUserSelect;

		};

	}, [ startX, startY ] );

	const target = props.drag.target;

	return <div className={style.overlay}>
		{target && <div
			className={target.kind === "tabs" ? style.insert : style.zone}
			style={{
				left: `${ target.rect.left }px`,
				top: `${ target.rect.top }px`,
				width: `${ target.rect.width }px`,
				height: `${ target.rect.height }px`,
			}}
		/>}
		<div className={style.ghost} ref={ghostRef}>{props.drag.title}</div>
	</div>;

};
