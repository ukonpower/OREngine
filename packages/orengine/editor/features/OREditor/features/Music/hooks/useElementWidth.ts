import { useEffect, useState, type RefObject } from "react";

// 要素の幅（CSS px）。パネルの大きさが変わるたびに測り直す
export const useElementWidth = ( ref: RefObject<HTMLElement | null> ) => {

	const [ width, setWidth ] = useState( 0 );

	useEffect( () => {

		const element = ref.current;

		if ( ! element ) return;

		const observer = new ResizeObserver( () => {

			setWidth( element.clientWidth );

		} );

		observer.observe( element );
		setWidth( element.clientWidth );

		return () => {

			observer.disconnect();

		};

	}, [ ref ] );

	return width;

};
