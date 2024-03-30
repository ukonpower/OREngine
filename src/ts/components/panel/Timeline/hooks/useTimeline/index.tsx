import { useState, useCallback, useEffect, createContext, useRef } from "react";

import { GLEditor } from "~/ts/gl/Editor";
import { SceneFrame } from '~/ts/gl/Scene';

export const TimelineContext = createContext<HooksContext<typeof useTimeline>>( {} );

export const useTimeline = ( glEditor: GLEditor | undefined ) => {

	// timeline

	const [ frame, setSceneFrame ] = useState<SceneFrame>( {
		current: 0,
		duration: 0,
		fps: 0,
		playing: false,
	} );

	// range

	const [ viewPort, setViewPort ] = useState<number[]>( [ 0, 0, 100, 0 ] );
	const viewPortRef = useRef<number[]>( [ 0, 0, 0, 0 ] );
	viewPortRef.current = viewPort;

	const w = ( viewPort[ 2 ] - viewPort[ 0 ] );

	let viewPortScale = 10 * Math.pow( 2, 0 + Math.floor( Math.log2( w / 100 ) ) );
	viewPortScale = Math.max( 1, Math.floor( viewPortScale ) );

	// update

	const onUpdateFrame = useCallback( ( frame: SceneFrame ) => {

		setSceneFrame( { ...frame } );

	}, [] );

	useEffect( () => {

		if ( glEditor ) {

			onUpdateFrame( glEditor.scene.frame );

			glEditor.scene.on( "update/frame", onUpdateFrame );

		}

		return () => {

			if ( glEditor ) {

				glEditor.scene.off( "update/frame" );

			}

		};

	}, [ glEditor, onUpdateFrame ] );

	// play / pause

	const onKeyDown = useCallback( ( e:KeyboardEvent ) => {

		if ( ! glEditor ) return;

		if ( e.key == ' ' ) {

			if ( glEditor.scene.frame.playing ) {

				glEditor.scene.stop( );

			} else {

				glEditor.scene.play();

			}

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

			glEditor.scene.setFrame( frame );

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
		frame,
		viewPort,
		viewPortScale,
		setFrame,
		getFrameViewPort,
		zoom,
		setViewPortCenter,
	};

};
