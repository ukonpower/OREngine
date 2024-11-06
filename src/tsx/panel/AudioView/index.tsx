import * as MXP from 'maxpower';
import { useState, useRef, useEffect, useContext, useCallback } from 'react';


import { AudioViewRenderer } from './AudioViewRenderer';
import style from './index.module.scss';

import { FramePlay } from '~/ts/gl/OREngine';
import { OREngineProjectFrame } from '~/ts/gl/OREngine/IO/ProjectSerializer';
import { useOREditor } from '~/tsx/gl/OREditor';


export const AudioView = () => {

	const { editor } = useOREditor();

	const wrapperElmRef = useRef<HTMLDivElement>( null );

	// render

	const [ renderer, setRenderer ] = useState<AudioViewRenderer>();

	useEffect( () => {

		const renderer = new AudioViewRenderer();

		setRenderer( renderer );

		if ( wrapperElmRef.current ) {

			renderer.setWrapperElm( wrapperElmRef.current );

			return () => {

				renderer.dispose();

			};

		}

	}, [] );

	// events

	const musicBuffer = editor.audioBuffer;
	const [ musicBufferVersion, setMusicBufferVersion ] = useState<number>();

	const [ frameSetting, setFrameSetting ] = useState<OREngineProjectFrame>( {
		duration: 0,
		fps: 0,
	} );

	const [ framePlay, setFramePlay ] = useState<FramePlay>( {
		current: 0,
		playing: false,
	} );

	useEffect( () => {

		const engine = editor.engine;

		const onUpdateSceneProps = ( props: MXP.SerializedProps ) => {

			setFrameSetting( {
				duration: props[ "timeline/duration" ],
				fps: props[ "timeline/fps" ]
			} );

		};

		let bufferVersion = 0;

		const onUpdateMusic = () => {

			setMusicBufferVersion( bufferVersion ++ );

		};

		const onUpdateFramePlay = ( frame: FramePlay ) => {

			setFramePlay( { ...frame } );

		};

		onUpdateSceneProps( engine.serialize() );
		onUpdateFramePlay( engine.frame );

		engine.on( "update/props", onUpdateSceneProps );
		engine.on( "update/music", onUpdateMusic );
		engine.on( "update/frame/play", onUpdateFramePlay );


		return () => {

			engine.off( "update/frame/setting", onUpdateSceneProps );
			engine.off( "update/music", onUpdateMusic );
			engine.off( "update/frame/play", onUpdateFramePlay );

		};


	}, [ editor ] );

	useEffect( () => {

		if ( renderer && musicBuffer ) {

			renderer.setMusicBuffer( musicBuffer );

		}

	}, [ renderer, musicBuffer, musicBufferVersion ] );

	useEffect( ()=> {

		if ( renderer && framePlay ) {

			renderer.setFramePlaying( framePlay );

		}

	}, [ renderer, framePlay ] );

	useEffect( ()=> {

		if ( renderer && frameSetting ) {

			renderer.setFrameSetting( frameSetting );

		}

	}, [ renderer, frameSetting ] );

	const onWheel = useCallback( ( e: WheelEvent ) => {

		if ( renderer ) {

			const scale = e.deltaY > 0.0 ? 1.1 : 0.9;

			renderer.setViewRangeFrame( renderer.viewRangeFrame * scale );

		}

		e.preventDefault();

	}, [ renderer ] );

	useEffect( () => {

		const elm = wrapperElmRef.current;

		if ( elm ) {

			elm.addEventListener( "wheel", onWheel, { passive: false } );

		}

		return () => {

			if ( elm ) {

				elm.removeEventListener( "wheel", onWheel );

			}

		};

	}, [ onWheel ] );


	return <div className={style.audioView} ref={wrapperElmRef} >
	</div>;

};
