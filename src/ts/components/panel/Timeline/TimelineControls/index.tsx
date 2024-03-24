import { useCallback, useContext, useRef } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineControls = () => {

	const { viewPort, timeline, setFrame, getFrameViewPort } = useContext( TimelineContext );

	const pointerDownRef = useRef<boolean>( false );

	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		if ( pointerDownRef.current && setFrame && getFrameViewPort ) {

			const x = e.clientX / ( e.target as HTMLElement ).clientWidth;

			setFrame( getFrameViewPort( x ) );

		}

	}, [ setFrame, getFrameViewPort ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		pointerDownRef.current = true;

		const x = e.clientX / e.currentTarget.clientWidth;

		if ( setFrame && getFrameViewPort ) {


			setFrame( getFrameViewPort( x ) );

		}

		window.addEventListener( 'pointermove', onPointerMove );

		const onPointerUp = () => {

			pointerDownRef.current = false;
			window.removeEventListener( 'pointermove', onPointerMove );

		};

		window.addEventListener( "pointerup", onPointerUp );

		return () => {

			window.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( 'pointermove', onPointerMove );

		};


	}, [ getFrameViewPort, setFrame, onPointerMove ] );

	if ( ! viewPort || ! timeline ) return null;

	return <div className={style.controls} onPointerDown={onPointerDown} >
	</div>;

};
