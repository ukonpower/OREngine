import * as GLP from 'glpower';
import { useState, useCallback, useEffect, createContext } from "react";

import { EditorTimeline, GLEditor } from "~/ts/gl/Editor";

export const TimelineContext = createContext<HooksContext<typeof useTimeline>>( {} );

export const useTimeline = ( glEditor: GLEditor | undefined ) => {

	// timeline

	const [ timeline, setTimeline ] = useState<EditorTimeline>( {
		currentFrame: 0,
		endFrame: 0,
		timeCode: 0,
		playing: false,
		fps: 0
	} );

	// range

	const [ viewPort, setViewPort ] = useState<number[]>( [ 0, 0, 0, 0 ] );

	// update

	const onUpdateTimeline = useCallback( ( timeline: EditorTimeline ) => {

		setTimeline( timeline );
		setViewPort( [ 0, 0, timeline.endFrame, 0 ] );

	}, [] );

	useEffect( () => {

		if ( glEditor ) {

			onUpdateTimeline( glEditor.timeline );

			glEditor.on( "update/timeline", onUpdateTimeline );

		}

		return () => {

			if ( glEditor ) {

				glEditor.off( "update/timeline" );

			}

		};

	}, [ glEditor, onUpdateTimeline ] );

	// play / pause

	const onKeyDown = useCallback( ( e:KeyboardEvent ) => {

		if ( ! glEditor ) return;

		if ( e.key == ' ' ) {

			glEditor.setPlaying( ! glEditor.timeline.playing );

		}

	}, [ glEditor ] );

	useEffect( () => {

		window.addEventListener( 'keydown', onKeyDown );

		return () => {

			window.removeEventListener( 'keydown', onKeyDown );

		};

	}, [ onKeyDown ] );


	// api

	const setFrame = useCallback( ( frame: number ) => {

		if ( glEditor ) {

			glEditor.setFrame( frame );

		}

	}, [ glEditor ] );

	const getFrameViewPort = useCallback( ( x: number ) => {

		const w = viewPort[ 2 ] - viewPort[ 0 ];
		return Math.floor( viewPort[ 0 ] + w * x );

	}, [ viewPort ] );

	return {
		glEditor,
		timeline,
		viewPort,
		setFrame,
		getFrameViewPort,
	};

};
