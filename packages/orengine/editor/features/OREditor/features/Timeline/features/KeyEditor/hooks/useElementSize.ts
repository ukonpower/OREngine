import { useEffect, useState, type RefObject } from "react";

// 要素の大きさ（px）を追う。カーブ表示の座標の計算に使う
export const useElementSize = ( ref: RefObject<HTMLElement | null> ) => {

	const [ size, setSize ] = useState( { width: 0, height: 0 } );

	useEffect( () => {

		const element = ref.current;

		if ( ! element ) return;

		const update = () => {

			setSize( { width: element.clientWidth, height: element.clientHeight } );

		};

		update();

		const observer = new ResizeObserver( update );

		observer.observe( element );

		return () => {

			observer.disconnect();

		};

	}, [ ref ] );

	return size;

};
