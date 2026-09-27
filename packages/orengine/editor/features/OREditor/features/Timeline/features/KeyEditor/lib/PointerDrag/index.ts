// ここまで動くまではクリックとみなす距離（px）。Blender の既定のドラッグの閾値と同じ
const DRAG_THRESHOLD = 3;

type PointerDragCallbacks = {
	// 押した位置からのずれ（px）
	onMove: ( dx: number, dy: number, e: PointerEvent ) => void;
	onEnd: ( dragged: boolean, e: PointerEvent ) => void;
};

// ポインタを押してから離すまでを追う。ずれが DRAG_THRESHOLD に届くまでは onMove を呼ばず、クリックとして終える
export const trackPointerDrag = ( start: { clientX: number, clientY: number }, callbacks: PointerDragCallbacks ) => {

	let dragged = false;

	const onMove = ( e: PointerEvent ) => {

		const dx = e.clientX - start.clientX;
		const dy = e.clientY - start.clientY;

		if ( ! dragged && Math.hypot( dx, dy ) < DRAG_THRESHOLD ) return;

		dragged = true;

		callbacks.onMove( dx, dy, e );

	};

	const onUp = ( e: PointerEvent ) => {

		window.removeEventListener( "pointermove", onMove );
		window.removeEventListener( "pointerup", onUp );

		callbacks.onEnd( dragged, e );

	};

	window.addEventListener( "pointermove", onMove );
	window.addEventListener( "pointerup", onUp );

};

// 押した位置と今の位置を対角とする矩形（画面座標）
export const dragRect = ( start: { clientX: number, clientY: number }, current: { clientX: number, clientY: number } ) => {

	return {
		left: Math.min( start.clientX, current.clientX ),
		top: Math.min( start.clientY, current.clientY ),
		right: Math.max( start.clientX, current.clientX ),
		bottom: Math.max( start.clientY, current.clientY ),
	};

};

// 右クリックで取り消した操作のあとに、同じ右クリックでメニューが開かないよう次の contextmenu を1回だけ止める。
// contextmenu が来ないまま次のボタンが押されたら（OS によっては来ない）止めるのをやめ、そのクリックのメニューは通す
export const suppressNextContextMenu = () => {

	const onContextMenu = ( e: MouseEvent ) => {

		e.preventDefault();
		e.stopPropagation();

		dispose();

	};

	const dispose = () => {

		window.removeEventListener( "contextmenu", onContextMenu, { capture: true } );
		window.removeEventListener( "pointerdown", dispose, { capture: true } );

	};

	// 押している最中のこの pointerdown の配信中に足したリスナーは、この配信では呼ばれない
	window.addEventListener( "contextmenu", onContextMenu, { capture: true } );
	window.addEventListener( "pointerdown", dispose, { capture: true } );

};
