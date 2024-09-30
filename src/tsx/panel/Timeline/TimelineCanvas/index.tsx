import { useContext, useEffect, useRef, useState } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';
import { TimelineCanvasRenderer } from './TimelineCanvasRenderer';

import { useSerializableProps } from '~/tsx/gl/useSerializableProps';


export const TimelineCanvas = () => {

	const { viewPort, viewPortScale, musicBuffer, musicBufferVersion, glEditor } = useContext( TimelineContext );

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

	const [ duration ] = useSerializableProps<number>( glEditor?.scene, "timeline/duration" );
	const [ fps ] = useSerializableProps<number>( glEditor?.scene, "timeline/fps" );

	useEffect( () => {

		if ( renderer && duration && fps ) {

			renderer.setFrameSetting( {
				duration: duration || 0,
				fps: fps || 0,
			} );

		}

	}, [ renderer, duration, fps ] );

	// loop

	const [ loopEnabled ] = useSerializableProps<boolean>( glEditor, "frameLoop/enabled" );
	const [ loopStart ] = useSerializableProps<number>( glEditor, "frameLoop/start" );
	const [ loopEnd ] = useSerializableProps<number>( glEditor, "frameLoop/end" );

	useEffect( () => {

		if ( renderer ) {

			renderer.setLoopSetting(
				loopEnabled || false,
				loopStart || 0,
				loopEnd || 0,
			);

		}

	}, [ renderer, loopEnabled, loopStart, loopEnd ] );

	useEffect( () => {

		if ( renderer && musicBuffer ) {

			renderer.setMusicBuffer( musicBuffer );

		}

	}, [ renderer, musicBuffer, musicBufferVersion ] );

	return <div className={style.timelineCanvas} ref={wrapperElmRef}>
	</div>;

};
