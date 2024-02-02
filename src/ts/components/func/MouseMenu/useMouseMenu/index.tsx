import React, { createContext, useCallback, useEffect, useRef, useState } from "react";

export const MouseMenuContext = createContext<HooksContext<typeof useMouseMenu>>( {} );

type MouseMenuItem = {
	id: number,
	elm: React.ReactNode,
	pos: { x: number, y: number },
	close: () => void,
}

let id = 0;

export const useMouseMenu = () => {

	const containerRef = useRef<HTMLDivElement>( null );

	// position

	const posRef = useRef<{ x: number, y: number }>( { x: 0, y: 0 } );

	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		posRef.current.x = e.clientX;
		posRef.current.y = e.clientY;

	}, [] );

	useEffect( () => {

		window.addEventListener( "pointermove", onPointerMove );

		return () => {

			window.removeEventListener( "pointermove", onPointerMove );

		};

	}, [ onPointerMove ] );

	// content

	const [ itemList, setContentList ] = useState<MouseMenuItem[]>( [] );

	const itemListRef = useRef( itemList );
	itemListRef.current = itemList;

	const closeContent = useCallback( ( id: number ) => {

		setContentList( itemListRef.current.filter( ( item ) => item.id !== id ) );

	}, [] );

	const closeAll = useCallback( () => {

		setContentList( [] );

	}, [] );

	const pushContent = useCallback( ( elm: React.ReactNode | null ) => {

		const contentId = id ++;

		const itemId = {
			id: contentId,
			elm,
			pos: { x: posRef.current.x, y: posRef.current.y },
			close: () => closeContent( contentId ),
		};

		setContentList( [ ...itemListRef.current, itemId ] );

		return itemId;

	}, [ closeContent ] );

	return {
		itemList,
		pushContent,
		closeAll,
		containerRef,
	};

};
