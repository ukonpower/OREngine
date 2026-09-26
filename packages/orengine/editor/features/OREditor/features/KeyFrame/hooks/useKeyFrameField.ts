import { createElement, useEffect, useMemo, useState } from 'react';

import * as MXP from 'maxpower';
import { getKeyFrameState, isKeyFrameField, keyFrameTime, type KeyFrameState } from 'orengine/editor';
import { Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import { useEditorFrame } from '../../../hooks/useEditorFrame';
import { useOREditor } from '../../../hooks/useOREditor';

import type { MouseEvent } from 'react';

// プロパティパネルの1行をキーフレームの操作の対象にする。行の上での I / Alt+I（Editor が受ける）と右クリックメニュー、
// 行に出すキーの状態を受け持つ。キーを打てないフィールドでは rowProps も state も返さない
export const useKeyFrameField = ( target: MXP.Serializable, path: string ) => {

	const { editor, engine } = useOREditor();
	const { open, closeAll } = usePopover();

	const field = useMemo( () => ( { target, path } ), [ target, path ] );
	const keyable = isKeyFrameField( field );

	const [ animated, setAnimated ] = useState( false );
	const [ keyed, setKeyed ] = useState( false );
	const [ changed, setChanged ] = useState( false );

	// 時刻・フィールドの値・カーブのどれが変わっても状態が変わるので、エディタのフレームごとに取り直す（同じ値なら再描画されない）
	useEditorFrame( () => {

		if ( ! keyable ) return;

		const state = getKeyFrameState( engine, field, keyFrameTime( engine ), engine.frame.current );

		setAnimated( state !== null );
		setKeyed( state !== null && state.keyed );
		setChanged( state !== null && state.changed );

	} );

	// 行ごと消えたとき（選択の切り替え等）は pointerleave が来ないので、ここで I の対象から外す
	useEffect( () => {

		return () => {

			editor.leaveKeyField( field );

		};

	}, [ editor, field ] );

	if ( ! keyable ) {

		return { state: null, rowProps: undefined };

	}

	const onContextMenu = ( e: MouseEvent ) => {

		e.preventDefault();

		const items: MenuItem[] = [
			{
				label: "Insert Keyframe",
				onClick: () => {

					editor.insertKeys( [ field ] );

					closeAll();

				},
			},
		];

		if ( keyed ) {

			items.push( {
				label: "Delete Keyframe",
				onClick: () => {

					editor.deleteKeys( [ field ] );

					closeAll();

				},
			} );

		}

		open( createElement( Menu, { title: path, items } ), pointAnchor( e.clientX, e.clientY ) );

	};

	let state: KeyFrameState | null = null;

	if ( animated ) {

		state = { keyed, changed };

	}

	return {
		state,
		rowProps: {
			onPointerEnter: () => editor.enterKeyField( field ),
			onPointerLeave: () => editor.leaveKeyField( field ),
			onContextMenu,
		},
	};

};
