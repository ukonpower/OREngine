import React, { useCallback, useEffect, useRef, useState } from "react";

export type Direction = "right-top" | "right-bottom" | "left-top" | "left-bottom";

export type MouseMenuItem = {
	id: number,
	elm: React.ReactNode,
	direction: Direction,
	pos: { x: number, y: number },
	close: () => void,
}

let id = 0;

export const useMouseMenuContext = () => {

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

		itemListRef.current = itemListRef.current.filter( ( item ) => item.id !== id );

		setContentList( itemListRef.current );

	}, [] );

	const closeAll = useCallback( () => {

		setContentList( [] );

	}, [] );

	const pushContent = useCallback( ( elm: React.ReactNode | null ) => {

		const contentId = id ++;

		const pos = { x: posRef.current.x, y: posRef.current.y };

		const direction: Direction = ( pos.x < window.innerWidth / 2 ? "right" : "left" ) + '-' + ( pos.y < window.innerHeight / 2 ? "bottom" : "top" ) as Direction;

		const itemId = {
			id: contentId,
			elm,
			pos,
			direction,
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
