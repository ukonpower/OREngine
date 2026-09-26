import { useEffect, useRef, useState } from 'react';

import { collectPanes, moveTab, splitPane } from '../lib/layoutTree';

import type { PanelResolver, SplitEdge } from '../lib/layoutTree';
import type { LayoutNode, PaneNode, PanelId } from '../lib/types';

// 画面座標の矩形。DragOverlay がそのまま fixed 配置に使う
export type DropRect = { left: number; top: number; width: number; height: number };

// ドロップ先の候補。tabs = タブヘッダーへの挿入（rect は挿入位置の縦線）、
// zone = コンテンツ領域への合流・分割（rect はハイライト矩形）
export type DropTarget =
	| { kind: "tabs"; paneId: string; index: number; rect: DropRect }
	| { kind: "zone"; paneId: string; zone: "center" | SplitEdge; rect: DropRect };

export type TabDragState = {
	panelId: PanelId;
	title: string;
	// ゴーストの初期位置。以降の追従は DragOverlay が pointermove で行う
	startX: number;
	startY: number;
	target: DropTarget | null;
};

// クリック（タブ選択）とドラッグを分ける移動量
const DRAG_THRESHOLD = 4;

// コンテンツ領域の各辺からこの割合より内側は「タブ合流」、外側は最寄り辺の分割になる
const CENTER_RATIO = 0.25;

const zoneRect = ( rect: DOMRect, zone: "center" | SplitEdge ): DropRect => {

	const r = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };

	if ( zone === "left" || zone === "right" ) r.width /= 2;
	if ( zone === "right" ) r.left += r.width;
	if ( zone === "top" || zone === "bottom" ) r.height /= 2;
	if ( zone === "bottom" ) r.top += r.height;

	return r;

};

// タブヘッダー上の挿入位置を求める。index はカーソルより中心が左にあるタブの数
const findTabsTarget = ( x: number, header: HTMLElement, pane: PaneNode, fromPaneId: string, panelId: PanelId ): DropTarget | null => {

	// 既に同じタブを持つ pane へは挿し込めない（pane 内重複禁止）。自 pane の並べ替えは可
	if ( pane.id !== fromPaneId && pane.tabs.includes( panelId ) ) return null;

	const tabEls = [ ...header.querySelectorAll( '[data-panel-tab-id]' ) ].filter( ( t ): t is HTMLElement => t instanceof HTMLElement );

	let index = tabEls.length;

	for ( let i = 0; i < tabEls.length; i ++ ) {

		const r = tabEls[ i ].getBoundingClientRect();

		if ( x < r.left + r.width / 2 ) {

			index = i;
			break;

		}

	}

	const headerRect = header.getBoundingClientRect();
	const lineX = index < tabEls.length
		? tabEls[ index ].getBoundingClientRect().left
		: ( tabEls.length > 0 ? tabEls[ tabEls.length - 1 ].getBoundingClientRect().right : headerRect.left );

	return { kind: "tabs", paneId: pane.id, index, rect: { left: lineX - 1, top: headerRect.top, width: 2, height: headerRect.height } };

};

// 画面座標の直下にあるドロップ先を探す。ドロップできない場所（スプリッタ上・pane 外）や、
// 落としても何も変わらない場所は null
const findDropTarget = ( x: number, y: number, layout: LayoutNode, fromPaneId: string, panelId: PanelId ): DropTarget | null => {

	const el = document.elementFromPoint( x, y );

	if ( ! el ) return null;

	const paneEl = el.closest( '[data-pane-id]' );

	if ( ! ( paneEl instanceof HTMLElement ) ) return null;

	const pane = collectPanes( layout ).find( ( p ) => p.id === paneEl.dataset.paneId );

	if ( ! pane ) return null;

	const header = el.closest( '[data-panel-tab-header]' );

	if ( header instanceof HTMLElement ) return findTabsTarget( x, header, pane, fromPaneId, panelId );

	const content = paneEl.querySelector( '[data-panel-content]' );

	if ( ! ( content instanceof HTMLElement ) ) return null;

	const rect = content.getBoundingClientRect();

	if ( rect.width <= 0 || rect.height <= 0 ) return null;

	const rx = ( x - rect.left ) / rect.width;
	const ry = ( y - rect.top ) / rect.height;

	if ( rx < 0 || rx > 1 || ry < 0 || ry > 1 ) return null;

	if ( Math.min( rx, 1 - rx ) > CENTER_RATIO && Math.min( ry, 1 - ry ) > CENTER_RATIO ) {

		// 既に居る pane・同じタブを持つ pane への合流は何も起きないので候補にしない
		if ( pane.id === fromPaneId || pane.tabs.includes( panelId ) ) return null;

		return { kind: "zone", paneId: pane.id, zone: "center", rect: zoneRect( rect, "center" ) };

	}

	// 唯一のタブで自分自身を分割しても元の形に戻るだけなので候補にしない
	if ( pane.id === fromPaneId && pane.tabs.length === 1 ) return null;

	const dx = rx - 0.5;
	const dy = ry - 0.5;
	const zone: SplitEdge = Math.abs( dx ) >= Math.abs( dy ) ? ( dx < 0 ? "left" : "right" ) : ( dy < 0 ? "top" : "bottom" );

	return { kind: "zone", paneId: pane.id, zone, rect: zoneRect( rect, zone ) };

};

const sameTarget = ( a: DropTarget | null, b: DropTarget | null ): boolean => {

	if ( a === null || b === null ) return a === b;
	if ( a.paneId !== b.paneId ) return false;
	if ( a.kind === "tabs" && b.kind === "tabs" ) return a.index === b.index;
	if ( a.kind === "zone" && b.kind === "zone" ) return a.zone === b.zone;

	return false;

};

// タブの掴み上げからドロップ確定までを持つ。ドラッグ中は木を触らず（プレビューはオーバーレイのみ）、
// ドロップ確定時に1回だけ apply する
export function useTabDrag( layout: LayoutNode, apply: ( next: LayoutNode ) => void, resolve: PanelResolver ) {

	const [ dragState, setDragState ] = useState<TabDragState | null>( null );

	// window リスナー（ドラッグセッション中は固定の closure）から常に最新を読むための ref
	const layoutRef = useRef( layout );
	layoutRef.current = layout;
	const applyRef = useRef( apply );
	applyRef.current = apply;

	const cleanupRef = useRef<( () => void ) | null>( null );

	// ドラッグ中にアンマウントされた場合の window リスナー掃除
	useEffect( () => () => cleanupRef.current?.(), [] );

	const onTabPointerDown = ( paneId: string, panelId: PanelId, e: React.PointerEvent ) => {

		if ( e.button !== 0 || cleanupRef.current ) return;

		const startX = e.clientX;
		const startY = e.clientY;
		let started = false;
		let target: DropTarget | null = null;

		const onMove = ( ev: PointerEvent ) => {

			// ウィンドウ外で離された場合は pointerup を取り逃すので、戻ってきた move で検知して破棄する
			if ( ev.buttons === 0 ) {

				finish( false );

				return;

			}

			if ( ! started ) {

				if ( Math.hypot( ev.clientX - startX, ev.clientY - startY ) < DRAG_THRESHOLD ) return;

				started = true;
				setDragState( { panelId, title: resolve( panelId )?.title ?? panelId, startX: ev.clientX, startY: ev.clientY, target: null } );

			}

			const next = findDropTarget( ev.clientX, ev.clientY, layoutRef.current, paneId, panelId );

			if ( ! sameTarget( next, target ) ) {

				target = next;
				setDragState( ( prev ) => ( prev ? { ...prev, target: next } : prev ) );

			}

		};

		const finish = ( drop: boolean ) => {

			cleanup();

			if ( drop && started && target ) {

				const current = layoutRef.current;

				if ( target.kind === "tabs" ) {

					applyRef.current( moveTab( current, paneId, panelId, target.paneId, target.index ) );

				} else if ( target.zone === "center" ) {

					applyRef.current( moveTab( current, paneId, panelId, target.paneId ) );

				} else {

					applyRef.current( splitPane( current, target.paneId, target.zone, paneId, panelId ) );

				}

			}

			if ( started ) setDragState( null );

		};

		const onUp = () => finish( true );
		const onCancel = () => finish( false );

		const cleanup = () => {

			window.removeEventListener( 'pointermove', onMove );
			window.removeEventListener( 'pointerup', onUp );
			window.removeEventListener( 'pointercancel', onCancel );
			cleanupRef.current = null;

		};

		cleanupRef.current = cleanup;
		window.addEventListener( 'pointermove', onMove );
		window.addEventListener( 'pointerup', onUp );
		window.addEventListener( 'pointercancel', onCancel );

	};

	return { dragState, onTabPointerDown };

}
