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

			glEditor.on( "update/timeline", onUpdateTimeline );
			onUpdateTimeline( glEditor.timeline );

		}

		return () => {

			if ( glEditor ) {

				glEditor.off( "update/timeline" );

			}

		};

	}, [ glEditor, onUpdateTimeline ] );

	return {
		timeline,
		viewPort,
	};

};
