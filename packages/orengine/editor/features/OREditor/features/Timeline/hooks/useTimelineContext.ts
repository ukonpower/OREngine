import { useState, useCallback, useEffect, useRef } from "react";

import { FramePlay } from "orengine";

import { useOREditor } from "../../../hooks/useOREditor";

export const useTimelineContext = () => {

	const { editor: glEditor } = useOREditor();

	// timeline

	const [ framePlay, setFramePlay ] = useState<FramePlay>( {
		current: 0,
		playing: false,
	} );

	// range

	const [ viewPort, setViewPort ] = useState<number[]>( [ 0, 0, 100, 0 ] );
	const viewPortRef = useRef<number[]>( [ 0, 0, 0, 0 ] );
	viewPortRef.current = viewPort;

	const w = ( viewPort[ 2 ] - viewPort[ 0 ] );

	let viewPortScale = 10 * Math.pow( 2, 0 + Math.floor( Math.log2( w / 100 ) ) );
	viewPortScale = Math.max( 1, Math.floor( viewPortScale ) );

	// audio buffer

	const musicBuffer = glEditor?.audioBuffer;
	const [ musicBufferVersion, setMusicBufferVersion ] = useState<number>();

	// events

	useEffect( () => {

		if ( glEditor ) {

			const scene = glEditor.engine;

			// frame

			const onUpdateFramePlay = ( frame: FramePlay ) => {

				setFramePlay( { ...frame } );

			};

			onUpdateFramePlay( scene.frame );


			// music

			let bufferVersion = 0;

			const onUpdateMusic = () => {

				setMusicBufferVersion( bufferVersion ++ );

			};

			// load

			const onLoadProject = () => {

				setViewPort( [ 0, 0, scene.frameSetting.duration, 0 ] );

			};

			onLoadProject();

			// addlistener

			scene.on( "update/frame/play", onUpdateFramePlay );
			scene.on( "update/music", onUpdateMusic );
			scene.on( "loaded", onLoadProject );

			return () => {

				scene.off( "update/frame/play", onUpdateFramePlay );
				scene.off( "update/music", onUpdateMusic );
				scene.off( "loaded", onLoadProject );

			};

		}

	}, [ glEditor ] );

	// api

	const setCurrentFrame = useCallback( ( frame: number ) => {

		if ( glEditor ) {

			glEditor.engine.seek( frame );

		}

	}, [ glEditor ] );

	const getFrameViewPort = useCallback( ( x: number ) => {

		const w = viewPort[ 2 ] - viewPort[ 0 ];
		return Math.floor( viewPort[ 0 ] + w * x );

	}, [ viewPort ] );

	// 次の state を待たずに続けて動かせるよう（1フレームに wheel が何度も来る）、ref も同時に更新する
	const applyViewPort = useCallback( ( next: number[] ) => {

		viewPortRef.current = next;
		setViewPort( next );

	}, [] );

	// 表示の範囲を scale 倍にする。anchor は拡大縮小しても動かない位置（表示の幅に対する 0〜1）
	const zoom = useCallback( ( scale: number, anchor: number ) => {

		const vp = viewPortRef.current;

		const pivot = vp[ 0 ] + ( vp[ 2 ] - vp[ 0 ] ) * anchor;

		const s = ( vp[ 0 ] - pivot ) * scale + pivot;
		const e = ( vp[ 2 ] - pivot ) * scale + pivot;

		applyViewPort( [ s, vp[ 1 ], e, vp[ 3 ] ] );

	}, [ applyViewPort ] );

	// 表示の範囲を動かす。delta は表示の幅に対する割合
	const scroll = useCallback( ( delta: number ) => {

		const vp = viewPortRef.current;

		const deltaFrame = delta * ( vp[ 2 ] - vp[ 0 ] );

		applyViewPort( [ vp[ 0 ] + deltaFrame, vp[ 1 ], vp[ 2 ] + deltaFrame, vp[ 3 ] ] );

	}, [ applyViewPort ] );

	const setViewPortCenter = useCallback( ( frame: number ) => {

		const vp = viewPortRef.current;

		const w = vp[ 2 ] - vp[ 0 ];

		applyViewPort( [ frame - w / 2, vp[ 1 ], frame + w / 2, vp[ 3 ] ] );

	}, [ applyViewPort ] );

	return {
		glEditor,
		framePlay,
		viewPort,
		viewPortScale,
		musicBuffer,
		musicBufferVersion,
		setCurrentFrame,
		getFrameViewPort,
		zoom,
		scroll,
		setViewPortCenter,
	};

};
