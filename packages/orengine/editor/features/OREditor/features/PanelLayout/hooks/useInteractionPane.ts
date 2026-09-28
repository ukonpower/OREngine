import { useCallback, useEffect, useRef } from 'react';

// 指を離してから click（タッチでは touchend の後に来る）で選択されるまでの猶予。
// これより後に起きた選択は、直前のポインタ操作とは関係ない（シーン CLI・キー操作など）とみなす
const RELEASE_GRACE_MS = 500;

// いまのポインタ操作がどの pane の中で始まったかを追う。選択がどのパネルでの操作から来たかを、
// 選択する側（Hierarchy・ビューポート・利用者のパネル…）に経路を渡させずに判定するため
export function useInteractionPane() {

	const paneIdRef = useRef<string | null>( null );
	const pressingRef = useRef( false );
	const releasedAtRef = useRef( 0 );

	useEffect( () => {

		// パネル側が stopPropagation しても拾えるよう capture で受ける
		const onDown = ( e: PointerEvent ) => {

			let paneId: string | null = null;

			if ( e.target instanceof Element ) {

				const paneEl = e.target.closest( '[data-pane-id]' );

				if ( paneEl instanceof HTMLElement ) paneId = paneEl.dataset.paneId ?? null;

			}

			paneIdRef.current = paneId;
			pressingRef.current = true;

		};

		const onUp = () => {

			pressingRef.current = false;
			releasedAtRef.current = performance.now();

		};

		window.addEventListener( 'pointerdown', onDown, true );
		window.addEventListener( 'pointerup', onUp, true );
		window.addEventListener( 'pointercancel', onUp, true );

		return () => {

			window.removeEventListener( 'pointerdown', onDown, true );
			window.removeEventListener( 'pointerup', onUp, true );
			window.removeEventListener( 'pointercancel', onUp, true );

		};

	}, [] );

	// いま起きた変化がポインタ操作によるものなら、その操作が始まった pane の id。
	// pane の外（メニューなど）での操作や、ポインタ操作によらない変化なら null
	// ref だけを読むので identity を固定し、購読の effect の deps に載せても張り直さないようにする
	const currentPaneId = useCallback( () => {

		if ( pressingRef.current ) return paneIdRef.current;

		if ( performance.now() - releasedAtRef.current < RELEASE_GRACE_MS ) return paneIdRef.current;

		return null;

	}, [] );

	return { currentPaneId };

}
