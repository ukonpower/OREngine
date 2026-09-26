import { useEffect, type MouseEvent } from 'react';

import * as MXP from 'maxpower';
import { type KeyFrameHandleType } from 'orengine/editor';
import { Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';

import { KeyCurveGraph } from './components/KeyCurveGraph';
import { KeyDopeSheet } from './components/KeyDopeSheet';
import { useKeyEditor } from './hooks/useKeyEditor';
import style from './index.module.scss';
import { isAllSelected, readRefs } from './lib/KeySelection';

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

// タイムラインのキーの領域（目盛りの段より下）。キー表示とカーブ表示を切り替えて出し、右クリックメニューと、
// ポインタが乗っている間のキーボードの削除・コピー・貼り付け（Editor が受けて回してくる）を受け持つ
export const KeyEditor = () => {

	const { editor } = useOREditor();
	const { open, closeAll } = usePopover();
	const {
		entity, channels, mode, selection, select, timelineActions,
		deleteSelectedKeys, copySelectedKeys, pasteCopiedKeys, setSelectedInterpolation, setSelectedHandleType,
	} = useKeyEditor();

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

	let view = <KeyDopeSheet />;

	if ( mode == "curves" ) view = <KeyCurveGraph />;

	return <div
		className={style.keyEditor}
		onPointerEnter={() => editor.enterTimeline( timelineActions )}
		onPointerLeave={() => editor.leaveTimeline( timelineActions )}
		onContextMenu={onContextMenu}
	>
		{view}
	</div>;

};
