import { useEffect, useRef } from 'react';

import type { PanelId } from '../lib/types';

// iOS Safari は長押しで contextmenu を出さないので、タッチでは長押しを自前で測ってタブメニューを開く
const LONG_PRESS_MS = 500;

// これより指が動いたらタブヘッダーの横スクロールとみなして長押しをやめる
const LONG_PRESS_SLOP = 8;

// タブのタッチ長押しを検知する。長押しが成立したら onLongPress を押した位置で呼ぶ
export function useTabLongPress( onLongPress: ( paneId: string, panelId: PanelId, x: number, y: number ) => void ) {

	// タイマー（押下中は固定の closure）から常に最新を呼ぶための ref
	const onLongPressRef = useRef( onLongPress );
	onLongPressRef.current = onLongPress;

	const cleanupRef = useRef<( () => void ) | null>( null );

	// 押下中にアンマウントされた場合のタイマー・window リスナー掃除
	useEffect( () => () => cleanupRef.current?.(), [] );

	const onTabPointerDown = ( paneId: string, panelId: PanelId, e: React.PointerEvent ) => {

		cleanupRef.current?.();

		const pointerId = e.pointerId;
		const startX = e.clientX;
		const startY = e.clientY;

		const onMove = ( ev: PointerEvent ) => {

			if ( ev.pointerId !== pointerId ) return;

			if ( Math.hypot( ev.clientX - startX, ev.clientY - startY ) > LONG_PRESS_SLOP ) cleanup();

		};

		const onEnd = ( ev: PointerEvent ) => {

			if ( ev.pointerId === pointerId ) cleanup();

		};

		const timer = window.setTimeout( () => {

			cleanup();
			swallowNextClick();
			onLongPressRef.current( paneId, panelId, startX, startY );

		}, LONG_PRESS_MS );

		const cleanup = () => {

			window.clearTimeout( timer );
			window.removeEventListener( 'pointermove', onMove );
			window.removeEventListener( 'pointerup', onEnd );
			window.removeEventListener( 'pointercancel', onEnd );
			cleanupRef.current = null;

		};

		cleanupRef.current = cleanup;
		window.addEventListener( 'pointermove', onMove );
		window.addEventListener( 'pointerup', onEnd );
		window.addEventListener( 'pointercancel', onEnd );

	};

	return { onTabPointerDown };

}

// 指を離したときの click を捨てる。開いたメニューの背面（クリックで閉じる backdrop）がその click を受けて、
// 開いた直後にメニューが閉じてしまうため。click が来ない場合に備え、次の押下でも解除する
function swallowNextClick() {

	const onClick = ( e: MouseEvent ) => {

		e.stopPropagation();
		e.preventDefault();
		release();

	};

	const release = () => {

		window.removeEventListener( 'click', onClick, true );
		window.removeEventListener( 'pointerdown', release, true );

	};

	window.addEventListener( 'click', onClick, true );
	window.addEventListener( 'pointerdown', release, true );

}
