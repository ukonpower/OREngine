import { useEffect, useState, type PointerEvent } from 'react';

import * as MXP from 'maxpower';
import { type KeyFrameHandleType } from 'orengine/editor';
import { Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';

import { KeyCurveGraph } from './components/KeyCurveGraph';
import { KeyDopeSheet } from './components/KeyDopeSheet';
import { useKeyEditor } from './hooks/useKeyEditor';
import style from './index.module.scss';
import { readRefs, readRefsInRect } from './lib/KeySelection';
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

// タイムラインのキーの領域（目盛りの段より下）。キー表示とカーブ表示を切り替えて出し、Blender の右クリック選択と同じ操作を受け持つ。
// 右クリックでキーを選び、右ドラッグでキーを動かす（何もない所からなら矩形選択）。左クリックはキーの上でもタイムラインの時刻合わせに任せる。
// ほかに B の矩形選択と、ポインタが乗っている間のキーボードの操作（W のメニュー等。Editor が受けて回してくる）を受け持つ
export const KeyEditor = () => {

	const { editor } = useOREditor();
	const { open, closeAll } = usePopover();
	const {
		entity, channels, mode, select, selectRefs, pressKeys, beginDrag, timelineActions, areaRef, pointerRef, openMenuRef,
		boxSelecting, endBoxSelect, deleteSelectedKeys, copySelectedKeys, pasteCopiedKeys, setSelectedInterpolation, setSelectedHandleType,
		distributeSelectedKeys, straightenSelectedKeys, applyActiveHandles,
	} = useKeyEditor();

	const [ box, setBox ] = useState<Box | null>( null );

	// 領域ごと消えたとき（選択の切り替え等）は pointerleave が来ないので、ここでキーボードの向け先から外す
	useEffect( () => {

		return () => {

			editor.leaveTimeline( timelineActions );

		};

	}, [ editor, timelineActions ] );

	// W のメニュー。選んでいるキーを対象に、ポインタの位置へ開く
	openMenuRef.current = () => {

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

		const alignItems: MenuItem[] = [
			{ label: "Distribute", onClick: run( distributeSelectedKeys ) },
			{ label: "Straighten Values", onClick: run( straightenSelectedKeys ) },
		];

		const items: MenuItem[] = [
			{ label: "Interpolation", children: interpolationItems },
			{ label: "Handle Type", children: handleTypeItems },
			{ label: "Align", children: alignItems },
			{ label: "Apply Active Handles", onClick: run( applyActiveHandles ) },
			{ label: "Copy", onClick: run( copySelectedKeys ) },
			{ label: "Paste", onClick: run( pasteCopiedKeys ) },
			{ label: "Delete", onClick: run( deleteSelectedKeys ) },
		];

		open( <Menu title="Keyframes" items={items} />, pointAnchor( pointerRef.current.x, pointerRef.current.y ) );

	};

	// キーのある行が無ければ、タイムラインの時刻合わせを塞がないよう何も置かない
	if ( ! entity || channels.length <= 1 ) return null;

	// 押した位置からの矩形選択。囲んだもので選択を置き換え、Shift なら足す。ドラッグせずに離したら何も囲んでいないので、選択を外す（Shift なら今のまま）
	const trackBoxSelect = ( e: PointerEvent ) => {

		const root = areaRef.current;

		if ( ! root ) return;

		const rect = root.getBoundingClientRect();
		const shift = e.shiftKey;
		const start = { clientX: e.clientX, clientY: e.clientY };

		trackPointerDrag( start, {
			onMove: ( _dx, _dy, moveEvent ) => {

				const area = dragRect( start, moveEvent );

				setBox( { left: area.left - rect.left, top: area.top - rect.top, width: area.right - area.left, height: area.bottom - area.top } );

			},
			onEnd: ( dragged, upEvent ) => {

				setBox( null );

				let refs: string[] = [];

				if ( dragged ) refs = readRefsInRect( root, dragRect( start, upEvent ) );

				selectRefs( refs, shift );

			},
		} );

	};

	// キーの印を右ボタンで押したとき。押した時点で選び、そのままドラッグすれば選んだキーを動かす
	const trackKeyPress = ( e: PointerEvent, refs: string[] ) => {

		const shift = e.shiftKey;
		const wasSelected = pressKeys( refs, shift );

		let drag: ReturnType<typeof beginDrag> = null;
		let started = false;

		trackPointerDrag( { clientX: e.clientX, clientY: e.clientY }, {
			onMove: ( dx, dy ) => {

				if ( ! started ) {

					started = true;
					drag = beginDrag();

				}

				if ( drag ) drag.move( dx, dy );

			},
			onEnd: ( dragged ) => {

				if ( drag ) drag.end();

				// 複数選んだ中の1つをドラッグせずにクリックしたら、それだけを選び直す
				if ( ! dragged && ! shift && wasSelected ) select( new Set( refs ) );

			},
		} );

	};

	// B の後の左ドラッグ。キー・ハンドルの上から始めても矩形選択にするので、capture で子（キー表示・カーブ表示）より先に受ける
	const onPointerDownCapture = ( e: PointerEvent ) => {

		if ( e.button != 0 || ! boxSelecting ) return;

		e.stopPropagation();
		endBoxSelect();
		trackBoxSelect( e );

	};

	// 右ボタン。キー・ハンドルの上なら選択とドラッグ、何もない所なら矩形選択（クリックだけなら選択を外す）
	const onPointerDown = ( e: PointerEvent ) => {

		if ( e.button != 2 ) return;

		// タイムラインの操作（親の TimelineControls）へ伝えない
		e.stopPropagation();

		const refs = readRefs( e.target );

		if ( refs ) {

			trackKeyPress( e, refs );

		} else {

			trackBoxSelect( e );

		}

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
		onPointerDown={onPointerDown}
	>
		{view}
		{box && <div className={style.box} style={box} />}
	</div>;

};
