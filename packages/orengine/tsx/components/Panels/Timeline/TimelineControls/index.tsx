import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineControls: React.FC<{children?: React.ReactNode}> = ( props ) => {

	const { viewPort, setCurrentFrame: setFrame, getFrameViewPort, zoom, scroll, setViewPortCenter } = useContext( TimelineContext );

	const viewPortRef = useRef( [ 0, 0, 0, 0 ] );
	const viewPortRangeRef = useRef( [ 0, 0 ] );

	if ( viewPort ) {

		viewPortRef.current = viewPort;
		viewPortRangeRef.current = [ viewPort[ 2 ] - viewPort[ 0 ], viewPort[ 3 ] - viewPort[ 1 ] ];

	}

	const elmRef = useRef<HTMLDivElement>( null );
	const elmBoundingRectRef = useRef<DOMRect | null>( null );

	// pointer

	const pointerDownButtonRef = useRef<number | null>( null );
	const pointerDownPosRef = useRef<[number, number] | null>( null );
	const pointerDownCenterFrameRef = useRef<number | null>( null );

	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		const elmWidth = elmRef.current && elmRef.current.clientWidth || 1;

		if ( pointerDownButtonRef.current == 0 ) {

			if ( setFrame && getFrameViewPort && elmBoundingRectRef.current ) {

				const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / elmWidth;

				setFrame( getFrameViewPort( pointerX ) );

			}

		} else if ( pointerDownButtonRef.current == 1 ) {

			const pos = [ e.clientX, e.clientY ];

			if ( pointerDownPosRef.current && pointerDownCenterFrameRef.current ) {

				const movement = - ( pos[ 0 ] - pointerDownPosRef.current[ 0 ] ) / elmWidth * viewPortRangeRef.current[ 0 ];

				if ( setViewPortCenter ) {

					setViewPortCenter( pointerDownCenterFrameRef.current + movement );

				}

			}

		}

	}, [ setFrame, getFrameViewPort, setViewPortCenter ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		pointerDownButtonRef.current = e.button;
		pointerDownCenterFrameRef.current = ( viewPortRef.current[ 2 ] + viewPortRef.current[ 0 ] ) / 2;
		pointerDownPosRef.current = [ e.clientX, e.clientY ];

		elmBoundingRectRef.current = e.currentTarget.getBoundingClientRect();

		const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / e.currentTarget.clientWidth;

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

	const onWheel = useCallback( ( e: WheelEvent ) => {

		if ( pointerDownButtonRef.current !== null || ! zoom || ! scroll ) return;

		e.preventDefault();

		const width = e.target && ( e.target as HTMLElement ).clientWidth || 1;

		const absY = Math.abs( e.deltaY );

		if ( Math.abs( e.deltaX ) < absY ) {

			if ( absY > 50 ) {

					 zoom( e.deltaY < 0 ? 0.9 : 1.1 );

			} else {

				zoom( 1.0 + e.deltaY * 0.005 );

			}

		} else {

			scroll( e.deltaX / width * 0.5 );

		}

	}, [ zoom, scroll ] );

	useEffect( () => {

		const elm = elmRef.current;

		if ( elm ) {

			elm.addEventListener( "wheel", onWheel, { passive: false } );

		}

		return () => {

			if ( elm ) {

				elm.removeEventListener( "wheel", onWheel );

			}

		};

	}, [ onWheel ] );

	if ( ! viewPort ) return null;

	return <div className={style.controls} onPointerDown={onPointerDown} ref={elmRef}>
		{props.children}
	</div>;

};
