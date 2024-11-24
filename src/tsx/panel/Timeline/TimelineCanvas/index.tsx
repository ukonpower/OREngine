import { useContext, useEffect, useRef, useState } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';
import { TimelineCanvasRenderer } from './TimelineCanvasRenderer';

import { useSerializableField } from '~/tsx/hooks/useSerializableProps';

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

	const [ duration ] = useSerializableField<number>( glEditor?.engine, "timeline/duration" );
	const [ fps ] = useSerializableField<number>( glEditor?.engine, "timeline/fps" );

	useEffect( () => {

		if ( renderer && duration && fps ) {

			renderer.setFrameSetting( {
				duration: duration || 0,
				fps: fps || 0,
			} );

		}

	}, [ renderer, duration, fps ] );

	// loop

	const [ loopEnabled ] = useSerializableField<boolean>( glEditor, "frameLoop/enabled" );
	const [ loopStart ] = useSerializableField<number>( glEditor, "frameLoop/start" );
	const [ loopEnd ] = useSerializableField<number>( glEditor, "frameLoop/end" );

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
