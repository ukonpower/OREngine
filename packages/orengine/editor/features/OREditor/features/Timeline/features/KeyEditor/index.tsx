import { useEffect, useState, type MouseEvent, type PointerEvent } from 'react';

import * as MXP from 'maxpower';
import { type KeyFrameHandleType } from 'orengine/editor';
import { Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';

import { KeyCurveGraph } from './components/KeyCurveGraph';
import { KeyDopeSheet } from './components/KeyDopeSheet';
import { useKeyEditor } from './hooks/useKeyEditor';
import style from './index.module.scss';
import { isAllSelected, readRefs, readRefsInRect } from './lib/KeySelection';
import { dragRect, trackPointerDrag } from './lib/PointerDrag';

const INTERPOLATION_ITEMS: { label: string, value: MXP.FCurveInterpolation }[] = [
	{ label: "Constant", value: "CONSTANT" },
	{ label: "Linear", value: "LINEAR" },
	{ label: "Bezier", value: "BEZIER" },
];

const HANDLE_TYPE_ITEMS: { label: string, value: KeyFrameHandleType }[] = [
	{ label: "Auto Clamped", value: "AUTO_CLAMPED" },
	{ label: "Auto", value: "AUTO" },
	{ label: "Vector", value: "VECTOR" },
	{ label: "Aligned", value: "ALIGNED" },
	{ label: "Free", value: "FREE" },
];

type Box = { left: number, top: number, width: number, height: number };

// タイムラインのキーの領域（目盛りの段より下）。キー表示とカーブ表示を切り替えて出し、右クリックメニューと、B の矩形選択と、
// ポインタが乗っている間のキーボードの操作（Editor が受けて回してくる）を受け持つ
export const KeyEditor = () => {

	const { editor } = useOREditor();
	const { open, closeAll } = usePopover();
	const {
		entity, channels, mode, selection, select, selectRefs, timelineActions, areaRef, pointerRef, boxSelecting, endBoxSelect,
		deleteSelectedKeys, copySelectedKeys, pasteCopiedKeys, setSelectedInterpolation, setSelectedHandleType,
	} = useKeyEditor();

	const [ box, setBox ] = useState<Box | null>( null );

	// 領域ごと消えたとき（選択の切り替え等）は pointerleave が来ないので、ここでキーボードの向け先から外す
	useEffect( () => {

		return () => {

			editor.leaveTimeline( timelineActions );

		};

	}, [ editor, timelineActions ] );

	// キーのある行が無ければ、タイムラインの時刻合わせを塞がないよう何も置かない
	if ( ! entity || channels.length <= 1 ) return null;

	const onContextMenu = ( e: MouseEvent ) => {

		e.preventDefault();

		const refs = readRefs( e.target );

		// 選んでいないキーの上で開いたら、そのキーを対象にする
		if ( refs && ! isAllSelected( selection, refs ) ) select( new Set( refs ) );

		const run = ( action: () => void ) => () => {

			action();
			closeAll();

		};

		const interpolationItems: MenuItem[] = [];

		for ( const item of INTERPOLATION_ITEMS ) {

			interpolationItems.push( { label: item.label, onClick: run( () => setSelectedInterpolation( item.value ) ) } );

		}

		const handleTypeItems: MenuItem[] = [];

		for ( const item of HANDLE_TYPE_ITEMS ) {

			handleTypeItems.push( { label: item.label, onClick: run( () => setSelectedHandleType( item.value ) ) } );

		}

		const items: MenuItem[] = [
			{ label: "Interpolation", children: interpolationItems },
			{ label: "Handle Type", children: handleTypeItems },
			{ label: "Copy", onClick: run( copySelectedKeys ) },
			{ label: "Paste", onClick: run( pasteCopiedKeys ) },
			{ label: "Delete", onClick: run( deleteSelectedKeys ) },
		];

		open( <Menu title="Keyframes" items={items} />, pointAnchor( e.clientX, e.clientY ) );

	};

	// B の後の左ドラッグ。キー・ハンドルの上から始めても矩形選択にするので、capture で子（キー表示・カーブ表示）より先に受ける
	const onPointerDownCapture = ( e: PointerEvent ) => {

		const root = areaRef.current;

		if ( e.button != 0 || ! boxSelecting || ! root ) return;

		e.stopPropagation();
		endBoxSelect();

		const rect = root.getBoundingClientRect();
		const shift = e.shiftKey;
		const start = { clientX: e.clientX, clientY: e.clientY };

		trackPointerDrag( start, {
			onMove: ( _dx, _dy, moveEvent ) => {

				const area = dragRect( start, moveEvent );

				setBox( { left: area.left - rect.left, top: area.top - rect.top, width: area.right - area.left, height: area.bottom - area.top } );

			},
			onEnd: ( _dragged, upEvent ) => {

				setBox( null );

				// 囲んだもので選択を置き換え、Shift なら足す
				selectRefs( readRefsInRect( root, dragRect( start, upEvent ) ), shift );

			},
		} );

	};

	const trackPointer = ( e: PointerEvent ) => {

		pointerRef.current = { x: e.clientX, y: e.clientY };

	};

	let view = <KeyDopeSheet />;

	if ( mode == "curves" ) view = <KeyCurveGraph />;

	return <div
		className={style.keyEditor}
		ref={areaRef}
		data-box-selecting={boxSelecting}
		onPointerEnter={( e ) => {

			trackPointer( e );
			editor.enterTimeline( timelineActions );

		}}
		onPointerMove={trackPointer}
		onPointerLeave={() => editor.leaveTimeline( timelineActions )}
		onPointerDownCapture={onPointerDownCapture}
		onContextMenu={onContextMenu}
	>
		{view}
		{box && <div className={style.box} style={box} />}
	</div>;

};
