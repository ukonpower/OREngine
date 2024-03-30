import React, { useCallback, useContext, useRef } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineControls = () => {

	const { viewPort, frame, setFrame, getFrameViewPort, zoom, setViewPortCenter } = useContext( TimelineContext );

	const viewPortRef = useRef( [ 0, 0, 0, 0 ] );
	const viewPortRangeRef = useRef( [ 0, 0 ] );

	if ( viewPort ) {

		viewPortRef.current = viewPort;
		viewPortRangeRef.current = [ viewPort[ 2 ] - viewPort[ 0 ], viewPort[ 3 ] - viewPort[ 1 ] ];

	}

	const elmRef = useRef<HTMLDivElement>( null );

	// pointer

	const pointerDownButtonRef = useRef<number | null>( null );
	const pointerDownPosRef = useRef<[number, number] | null>( null );
	const pointerDownCenterFrameRef = useRef<number | null>( null );

	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		const elmWidth = elmRef.current && elmRef.current.clientWidth || 1;

		if ( pointerDownButtonRef.current == 0 ) {

			if ( setFrame && getFrameViewPort ) {

				const x = e.clientX / elmWidth;

				setFrame( getFrameViewPort( x ) );

			}

		} else if ( pointerDownButtonRef.current == 1 ) {

			const pos = [ e.clientX, e.clientY ];

			if ( pointerDownPosRef.current && pointerDownCenterFrameRef.current ) {

				const movement = - ( pos[ 0 ] - pointerDownPosRef.current[ 0 ] ) / elmWidth * viewPortRangeRef.current[ 0 ];

				setViewPortCenter && setViewPortCenter( pointerDownCenterFrameRef.current + movement );

			}

		}

	}, [ setFrame, getFrameViewPort, setViewPortCenter ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		const pointerX = e.clientX / e.currentTarget.clientWidth;

		pointerDownButtonRef.current = e.button;
		pointerDownCenterFrameRef.current = ( viewPortRef.current[ 2 ] + viewPortRef.current[ 0 ] ) / 2;
		pointerDownPosRef.current = [ e.clientX, e.clientY ];

		if ( pointerDownButtonRef.current == 0 && setFrame && getFrameViewPort ) {

			setFrame( getFrameViewPort( pointerX ) );

		}

		window.addEventListener( 'pointermove', onPointerMove );

		const onPointerUp = () => {

			pointerDownPosRef.current = null;
			pointerDownButtonRef.current = null;
			pointerDownCenterFrameRef.current = null;
			window.removeEventListener( 'pointermove', onPointerMove );

		};

		window.addEventListener( "pointerup", onPointerUp );

		return () => {

			window.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( 'pointermove', onPointerMove );

		};

	}, [ getFrameViewPort, setFrame, onPointerMove ] );

	// wheel

	const onWheel = useCallback( ( e: React.WheelEvent<HTMLDivElement> ) => {

		if ( pointerDownButtonRef.current !== null ) return;

		zoom && zoom( e.deltaY < 0 ? 0.9 : 1.1 );

	}, [ zoom ] );

	if ( ! viewPort || ! frame ) return null;

	return <div className={style.controls} onPointerDown={onPointerDown} onWheel={onWheel} ref={elmRef}>
	</div>;

};
