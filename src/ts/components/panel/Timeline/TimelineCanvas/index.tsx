import { useContext, useEffect, useRef, useState } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';
import { TimelineCanvasRenderer } from './TimelineCanvasRenderer';


export const TimelineCanvas = ( ) => {

	const { viewPort, viewPortScale, frameSetting: frame, musicBuffer } = useContext( TimelineContext );

	const [ renderer, setRenderer ] = useState<TimelineCanvasRenderer>();

	const wrapperElmRef = useRef<HTMLDivElement>( null );

	useEffect( () => {

		const renderer = new TimelineCanvasRenderer();

		setRenderer( renderer );

		if ( wrapperElmRef.current ) {

			renderer.setWrapperElm( wrapperElmRef.current );

		}

		return () => {

			renderer.dispose();

		};

	}, [] );

	useEffect( () => {

		if ( renderer && viewPort && viewPortScale ) {

			renderer.setViewPort( viewPort, viewPortScale );

		}

	}, [ renderer, viewPort, viewPortScale ] );

	useEffect( () => {

		if ( renderer && frame ) {

			renderer.setFrame( frame );

		}

	}, [ renderer, frame ] );

	useEffect( () => {

		if ( renderer && musicBuffer ) {

			renderer.setMusicBuffer( musicBuffer );

		}

	}, [ renderer, musicBuffer ] );

	return <div className={style.timelineCanvas} ref={wrapperElmRef}>
	</div>;

};
