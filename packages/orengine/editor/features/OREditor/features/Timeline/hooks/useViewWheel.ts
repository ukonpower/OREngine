import { useEffect, useRef, type RefObject } from "react";

import { readWheelGesture, watchControlKey, type ViewGesture } from "../lib/ViewGesture";

// 要素の上の wheel を、表示を動かす操作（パン / 拡大縮小）に読み替えて受け取る。
// 横（時刻）は TimelineControls、縦はカーブ表示・キー表示がそれぞれ同じ wheel から自分の軸だけを使う
export const useViewWheel = ( ref: RefObject<HTMLElement | null>, onGesture: ( gesture: ViewGesture, e: WheelEvent ) => void ) => {

	const onGestureRef = useRef( onGesture );
	onGestureRef.current = onGesture;

	useEffect( () => {

		const element = ref.current;

		if ( ! element ) return;

		const onWheel = ( e: WheelEvent ) => {

			onGestureRef.current( readWheelGesture( e ), e );

		};

		element.addEventListener( "wheel", onWheel, { passive: false } );

		const unwatchControlKey = watchControlKey();

		return () => {

			element.removeEventListener( "wheel", onWheel );
			unwatchControlKey();

		};

	}, [ ref ] );

};
