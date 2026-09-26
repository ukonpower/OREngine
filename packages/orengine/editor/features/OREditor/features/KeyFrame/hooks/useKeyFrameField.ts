import { createElement, useEffect, useMemo, useState } from 'react';

import * as MXP from 'maxpower';
import { getCurveLinkInfo, getKeyFrameElementCount, getKeyFrameState, getSharedCurves, isKeyFrameField, keyFrameTime, type KeyFrameElementRef, type KeyFrameState, type SharedCurve } from 'orengine/editor';
import { Menu, MenuItem, pointAnchor, usePopover } from 'uipower';

import { useEditorFrame } from '../../../hooks/useEditorFrame';
import { useOREditor } from '../../../hooks/useOREditor';
import { CurveLinkForm } from '../components/CurveLinkForm';

import type { MouseEvent } from 'react';

// サブメニューに出す要素の名前。uipower の Vector の軸名と、色の成分名
const VECTOR_ELEMENT_LABELS = [ "x", "y", "z", "w" ];
const COLOR_ELEMENT_LABELS = [ "r", "g", "b", "a" ];

// 共有中のカーブの表示が前のフレームと同じか。同じなら state を差し替えず、毎フレームの再描画を避ける
const isSameShared = ( a: SharedCurve[], b: SharedCurve[] ) => {

	if ( a.length != b.length ) return false;

	for ( let i = 0; i < a.length; i ++ ) {

		if ( a[ i ].curveId != b[ i ].curveId || a[ i ].label != b[ i ].label || a[ i ].uses != b[ i ].uses ) return false;

	}

	return true;

};

// 右クリックした場所がどの要素の上か。数値配列の要素の行（data-element）の外なら null
const findElement = ( e: MouseEvent ) => {

	const elm = ( e.target as Element ).closest( "[data-element]" );

	if ( ! elm || ! ( e.currentTarget as Element ).contains( elm ) ) return null;

	return Number( elm.getAttribute( "data-element" ) );

};

// 要素の名前（サブメニューの見出し）
const elementLabel = ( opt: MXP.SerializableFieldOpt | undefined, element: number ) => {

	const format = opt && opt.format;

	if ( format && format.type == "vector" && VECTOR_ELEMENT_LABELS[ element ] ) return VECTOR_ELEMENT_LABELS[ element ];

	if ( format && format.type == "color" && COLOR_ELEMENT_LABELS[ element ] ) return COLOR_ELEMENT_LABELS[ element ];

	return String( element );

};

// プロパティパネルの1行をキーフレームの操作の対象にする。行の上での I / Alt+I（Editor が受ける）と右クリックメニュー、
// 行に出すキーの状態と共有中のカーブを受け持つ。キーを打てないフィールドでは rowProps も state も返さない
export const useKeyFrameField = ( target: MXP.Serializable, path: string ) => {

	const { editor, engine } = useOREditor();
	const { open, closeAll } = usePopover();

	const field = useMemo( () => ( { target, path } ), [ target, path ] );
	const keyable = isKeyFrameField( field );

	const [ animated, setAnimated ] = useState( false );
	const [ keyed, setKeyed ] = useState( false );
	const [ changed, setChanged ] = useState( false );
	const [ shared, setShared ] = useState<SharedCurve[]>( [] );

	// 時刻・フィールドの値・カーブ・リンクのどれが変わっても状態が変わるので、エディタのフレームごとに取り直す（同じ値なら再描画されない）
	useEditorFrame( () => {

		if ( ! keyable ) return;

		const state = getKeyFrameState( engine, field, keyFrameTime( engine ), engine.frame.current );

		setAnimated( state !== null );
		setKeyed( state !== null && state.keyed );
		setChanged( state !== null && state.changed );

		const nextShared = getSharedCurves( engine, field );

		setShared( ( prev ) => {

			if ( isSameShared( prev, nextShared ) ) return prev;

			return nextShared;

		} );

	} );

	// 行ごと消えたとき（選択の切り替え等）は pointerleave が来ないので、ここで I の対象から外す
	useEffect( () => {

		return () => {

			editor.leaveKeyField( field );

		};

	}, [ editor, field ] );

	if ( ! keyable ) {

		return { state: null, shared, rowProps: undefined };

	}

	// 要素1つぶんのカーブの操作（コピー・貼り付け・リンクの解除・リンクの設定）。使えるものだけを並べる
	const curveItems = ( ref: KeyFrameElementRef, x: number, y: number ) => {

		const items: MenuItem[] = [];
		const info = getCurveLinkInfo( engine, ref );
		const copiedCurveId = editor.copiedCurveId;

		if ( info ) {

			items.push( {
				label: "Copy Curve",
				onClick: () => {

					editor.copyCurve( info.curveId );

					closeAll();

				},
			} );

		}

		if ( copiedCurveId && engine.curves[ copiedCurveId ] ) {

			items.push( {
				label: "Paste Curve (Link)",
				onClick: () => {

					editor.pasteCurve( ref, "link" );

					closeAll();

				},
			} );

			items.push( {
				label: "Paste Curve (Duplicate)",
				onClick: () => {

					editor.pasteCurve( ref, "duplicate" );

					closeAll();

				},
			} );

		}

		if ( info && info.uses > 1 ) {

			items.push( {
				label: "Unlink Curve",
				onClick: () => {

					editor.unlinkCurve( ref );

					closeAll();

				},
			} );

		}

		if ( info ) {

			items.push( {
				label: "Link Settings",
				onClick: () => {

					closeAll();

					const form = createElement( CurveLinkForm, {
						info,
						onSubmit: ( settings ) => {

							editor.setCurveLinkSettings( ref, settings );

							closeAll();

						},
						onClose: closeAll,
					} );

					open( form, pointAnchor( x, y ) );

				},
			} );

		}

		return items;

	};

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

		// カーブの操作は要素1つ単位。数値配列で要素の上を右クリックしていなければ（ラベル・色の見本など）、要素ごとのサブメニューで選ばせる
		let element: number | null = 0;

		if ( Array.isArray( target.getField( path ) ) ) {

			element = findElement( e );

		}

		if ( element !== null ) {

			for ( const item of curveItems( { target, path, element }, e.clientX, e.clientY ) ) {

				items.push( item );

			}

		} else {

			const opt = target.getFieldOpt( path );
			const count = getKeyFrameElementCount( field );

			for ( let i = 0; i < count; i ++ ) {

				const children = curveItems( { target, path, element: i }, e.clientX, e.clientY );

				if ( children.length == 0 ) continue;

				items.push( { label: "Curve " + elementLabel( opt, i ), children } );

			}

		}

		open( createElement( Menu, { title: path, items } ), pointAnchor( e.clientX, e.clientY ) );

	};

	let state: KeyFrameState | null = null;

	if ( animated ) {

		state = { keyed, changed };

	}

	return {
		state,
		shared,
		rowProps: {
			onPointerEnter: () => editor.enterKeyField( field ),
			onPointerLeave: () => editor.leaveKeyField( field ),
			onContextMenu,
		},
	};

};
