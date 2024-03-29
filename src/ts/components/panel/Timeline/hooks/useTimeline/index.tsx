import * as GLP from 'glpower';
import { useState, useCallback, useEffect, createContext, useRef } from "react";

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

	const [ viewPort, setViewPort ] = useState<number[]>( [ 0, 0, 100, 0 ] );
	const viewPortRef = useRef<number[]>( [ 0, 0, 0, 0 ] );
	viewPortRef.current = viewPort;

	const w = ( viewPort[ 2 ] - viewPort[ 0 ] );

	let viewPortScale = 10 * Math.pow( 2, 0 + Math.floor( Math.log2( w / 100 ) ) );
	viewPortScale = Math.max( 1, Math.floor( viewPortScale ) );

	// update

	const onUpdateTimeline = useCallback( ( timeline: EditorTimeline ) => {

		setTimeline( timeline );

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

	const zoom = useCallback( ( scale: number ) => {

		const vp = viewPortRef.current;

		const mid = ( vp[ 2 ] + vp[ 0 ] ) / 2;

		const s = ( vp[ 0 ] - mid ) * ( scale ) + mid;
		const e = ( vp[ 2 ] - mid ) * ( scale ) + mid;

		setViewPort( [ s, vp[ 1 ], e, vp[ 3 ] ] );

	}, [] );

	const setViewPortCenter = useCallback( ( frame: number ) => {

		const vp = viewPortRef.current;

		const w = vp[ 2 ] - vp[ 0 ];

		setViewPort( [ frame - w / 2, vp[ 1 ], frame + w / 2, vp[ 3 ] ] );

	}, [] );

	return {
		glEditor,
		timeline,
		viewPort,
		viewPortScale,
		setFrame,
		getFrameViewPort,
		zoom,
		setViewPortCenter,
	};

};
