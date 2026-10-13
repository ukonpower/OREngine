import { PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from 'react';

import * as MXP from 'maxpower';

import { useOREditor } from '../../hooks/useOREditor';
import { useSerializableField } from '../SerializableField/hooks/useSerializableProps';

import { HierarchyNode } from './components/HierarchyNode';
import style from './index.module.scss';
import { getVisibleEntities } from './lib/entityTree';

// 開閉状態は UI 状態なので editor.json ではなく localStorage に持つ（開いているノードの uuid 一覧）
const OPEN_NODES_STORAGE_KEY = "hierarchyOpenNodes";

// localStorage から開いているノードの uuid 集合を読む
const loadOpenNodes = (): Set<string> => {

	try {

		const raw = localStorage.getItem( OPEN_NODES_STORAGE_KEY );

		if ( raw ) return new Set( JSON.parse( raw ) as string[] );

	} catch ( e ) { /* 壊れた値は初期状態として扱う */ }

	return new Set();

};

const saveOpenNodes = ( nodes: Set<string> ) => {

	localStorage.setItem( OPEN_NODES_STORAGE_KEY, JSON.stringify( Array.from( nodes ) ) );

};

// 行を押してからこれより動かしたらドラッグ（親の付け替え）、動かさずに離したらクリック（選択）とみなす（px）
const DRAG_THRESHOLD_PX = 4;

// 行の要素に付ける、その行のエンティティの uuid の属性（HierarchyNode と一致させる）
const NODE_UUID_ATTRIBUTE = "data-hnode_uuid";

// クリックした時点の修飾キー。Ctrl / Cmd は選択の足し引き、Shift は範囲選択
type ClickModifiers = {
	toggle: boolean;
	range: boolean;
};

export const Hierarchy = () => {

	const { editor, engine } = useOREditor();
	const [ selectedEntityId ] = useSerializableField<string>( editor, "selectedEntityId" );

	const rootEntity = engine.root;

	// 各ノードの開閉はツリー全体で1つの集合として持つ（選択に追従して外から開けるようにするため）
	const [ openNodes, setOpenNodes ] = useState<Set<string>>( loadOpenNodes );

	const setNodeOpen = useCallback( ( uuid: string, open: boolean ) => {

		setOpenNodes( ( prev ) => {

			const next = new Set( prev );

			if ( open ) {

				next.add( uuid );

			} else {

				next.delete( uuid );

			}

			saveOpenNodes( next );

			return next;

		} );

	}, [] );

	// ビューポートやギズモから選択されたエンティティが折りたたみの中に隠れていると見えないので、先祖をすべて開く
	useEffect( () => {

		if ( ! selectedEntityId ) return;

		const selected = rootEntity.findEntityByUUID( selectedEntityId );

		if ( ! selected ) return;

		const ancestors: string[] = [];

		let parent = selected.parent;

		while ( parent ) {

			ancestors.push( parent.uuid );
			parent = parent.parent;

		}

		setOpenNodes( ( prev ) => {

			if ( ancestors.every( uuid => prev.has( uuid ) ) ) return prev;

			const next = new Set( prev );

			ancestors.forEach( uuid => next.add( uuid ) );

			saveOpenNodes( next );

			return next;

		} );

	}, [ selectedEntityId, rootEntity ] );

	// 行のクリック。Ctrl / Cmd は選択の足し引き、Shift はアクティブから押した行までの範囲選択（アクティブは変えない）
	const clickNode = useCallback( ( entity: MXP.Entity, modifiers: ClickModifiers ) => {

		if ( modifiers.toggle ) {

			editor.toggleEntitySelection( entity );

			return;

		}

		const anchor = editor.activeEntity;

		if ( ! modifiers.range || ! anchor ) {

			editor.selectEntity( entity );

			return;

		}

		const visible = getVisibleEntities( rootEntity, openNodes );
		const anchorIndex = visible.indexOf( anchor );
		const clickedIndex = visible.indexOf( entity );

		// アクティブが畳んだノードの中に隠れていると範囲が決まらないので、押した行だけを選ぶ
		if ( anchorIndex < 0 || clickedIndex < 0 ) {

			editor.selectEntity( entity );

			return;

		}

		const range = visible.slice( Math.min( anchorIndex, clickedIndex ), Math.max( anchorIndex, clickedIndex ) + 1 );

		editor.setSelection( range, anchor );

	}, [ editor, rootEntity, openNodes ] );

	// ドラッグ中、落とすと親になる行（付け替えられる行だけ）。null は無し
	const [ dropTargetId, setDropTargetId ] = useState<string | null>( null );

	// ドラッグの途中でパネルが消えても window のリスナーが残らないよう、外し方を持っておく
	const endPointerRef = useRef<( () => void ) | null>( null );

	useEffect( () => {

		return () => {

			if ( endPointerRef.current ) endPointerRef.current();

		};

	}, [] );

	// 行を押したところから、クリックかドラッグかを見分けて追う。ドラッグは選んでいる行ならその選択ごと、
	// 選んでいない行ならその行だけを動かし、離した行の子へ移す（ワールド座標は保つ）
	const onNodePointerDown = useCallback( ( e: ReactPointerEvent, entity: MXP.Entity ) => {

		if ( e.button !== 0 ) return;

		// 行の中のボタン（開閉・選択可否・表示・メニュー）と名前の入力欄は、それぞれのクリックに任せる
		if ( ( e.target as HTMLElement ).closest( "button, input" ) ) return;

		const startX = e.clientX;
		const startY = e.clientY;
		const modifiers: ClickModifiers = { toggle: e.ctrlKey || e.metaKey, range: e.shiftKey };

		let dragEntities: MXP.Entity[] | null = null;
		let dropTarget: MXP.Entity | null = null;

		// ポインタの下の行のエンティティ。行の外なら null
		const findNodeEntity = ( x: number, y: number ): MXP.Entity | null => {

			const element = document.elementFromPoint( x, y );

			if ( ! element ) return null;

			const node = element.closest( `[${NODE_UUID_ATTRIBUTE}]` );

			if ( ! node ) return null;

			return rootEntity.findEntityByUUID( node.getAttribute( NODE_UUID_ATTRIBUTE )! ) ?? null;

		};

		const onMove = ( ev: PointerEvent ) => {

			if ( ! dragEntities ) {

				const dx = ev.clientX - startX;
				const dy = ev.clientY - startY;

				if ( Math.sqrt( dx * dx + dy * dy ) < DRAG_THRESHOLD_PX ) return;

				const selected = editor.selectedEntities;

				if ( selected.includes( entity ) ) {

					dragEntities = selected;

				} else {

					editor.selectEntity( entity );
					dragEntities = [ entity ];

				}

			}

			const hovered = findNodeEntity( ev.clientX, ev.clientY );

			dropTarget = null;

			if ( hovered && editor.getReparentError( dragEntities, hovered ) === null ) {

				dropTarget = hovered;
				setDropTargetId( hovered.uuid );

			} else {

				setDropTargetId( null );

			}

		};

		const onUp = () => {

			endPointer();

			if ( ! dragEntities ) {

				clickNode( entity, modifiers );

				return;

			}

			if ( dropTarget ) {

				editor.reparentEntities( dragEntities, dropTarget );

			}

		};

		const endPointer = () => {

			window.removeEventListener( "pointermove", onMove );
			window.removeEventListener( "pointerup", onUp );
			window.removeEventListener( "pointercancel", endPointer );
			window.removeEventListener( "contextmenu", endPointer );

			endPointerRef.current = null;

			setDropTargetId( null );

		};

		if ( endPointerRef.current ) endPointerRef.current();

		endPointerRef.current = endPointer;

		window.addEventListener( "pointermove", onMove );
		window.addEventListener( "pointerup", onUp );
		window.addEventListener( "pointercancel", endPointer );
		// macOS の Ctrl+クリックは右クリックとして行のメニューを開くので、クリック（選択の足し引き）としては扱わない
		window.addEventListener( "contextmenu", endPointer );

	}, [ editor, rootEntity, clickNode ] );

	return <div className={style.hierarchy}>
		{rootEntity && <HierarchyNode
			entity={rootEntity}
			openNodes={openNodes}
			setNodeOpen={setNodeOpen}
			dropTargetId={dropTargetId}
			onNodePointerDown={onNodePointerDown}
		/>}
	</div>;

};
