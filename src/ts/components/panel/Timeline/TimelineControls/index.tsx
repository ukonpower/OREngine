import React, { useCallback, useContext, useRef } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineControls = () => {

	const { viewPort, timeline, setFrame, getFrameViewPort, zoom, scroll } = useContext( TimelineContext );

	const elmRef = useRef<HTMLDivElement>( null );

	// pointer

	const pointerDownRef = useRef<number | null>( null );
	const pointerDownPos = useRef<number | null>( null );

	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		const elmWidth = elmRef.current && elmRef.current.clientWidth || 1;

		if ( pointerDownRef.current == 0 ) {

			if ( setFrame && getFrameViewPort ) {

				const x = e.clientX / elmWidth;

				setFrame( getFrameViewPort( x ) );

			}

		} else if ( pointerDownRef.current == 1 ) {

			scroll && scroll( - e.movementX / elmWidth );

		}

	}, [ setFrame, getFrameViewPort, scroll ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		pointerDownRef.current = e.button;

		const x = e.clientX / e.currentTarget.clientWidth;
		pointerDownPos.current = x;

		if ( pointerDownRef.current == 0 && setFrame && getFrameViewPort ) {

			setFrame( getFrameViewPort( x ) );

		}

		window.addEventListener( 'pointermove', onPointerMove );

		const onPointerUp = () => {

			pointerDownRef.current = null;
			pointerDownPos.current = null;
			window.removeEventListener( 'pointermove', onPointerMove );

		};

		window.addEventListener( "pointerup", onPointerUp );

		return () => {

			window.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( 'pointermove', onPointerMove );

		};

	}, [ getFrameViewPort, setFrame, onPointerMove ] );

	// scroll

	const onWheel = useCallback( ( e: React.WheelEvent<HTMLDivElement> ) => {

		if ( pointerDownRef.current !== null ) return;

		zoom && zoom( e.deltaY < 0 ? 0.9 : 1.1 );

	}, [ zoom ] );

	if ( ! viewPort || ! timeline ) return null;

	return <div className={style.controls} onPointerDown={onPointerDown} onWheel={onWheel} ref={elmRef}>
	</div>;

};
