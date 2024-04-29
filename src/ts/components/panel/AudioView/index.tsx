import * as MXP from 'maxpower';
import { useState, useRef, useEffect, useContext, useCallback } from 'react';

import { AudioViewRenderer } from './AudioViewRenderer';
import style from './index.module.scss';

import { OREngineProjectFrame } from '~/ts/gl/IO/ProjectSerializer';
import { FramePlay } from '~/ts/gl/ProjectScene';
import { GLContext } from '~/ts/gl/React/useGL';

export const AudioView = () => {

	const { glEditor } = useContext( GLContext );

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

	const [ musicBuffer, setMusicBuffer ] = useState<AudioBuffer>( );

	const [ frameSetting, setFrameSetting ] = useState<OREngineProjectFrame>( {
		duration: 0,
		fps: 0,
	} );

	const [ framePlay, setFramePlay ] = useState<FramePlay>( {
		current: 0,
		playing: false,
	} );

	useEffect( () => {

		if ( glEditor ) {

			const scene = glEditor.scene;

			const onUpdateSceneProps = ( props: MXP.ExportablePropsSerialized ) => {

				setFrameSetting( {
					duration: props[ "timeline/duration" ],
					fps: props[ "timeline/fps" ]
				} );

			};

			const onUpdateMusic = ( buffer: AudioBuffer ) => {

				setMusicBuffer( buffer );

			};

			const onUpdateFramePlay = ( frame: FramePlay ) => {

				setFramePlay( { ...frame } );

			};

			onUpdateSceneProps( glEditor.scene.getPropsSerialized() );
			onUpdateFramePlay( scene.framePlay );

			if ( glEditor.audioBuffer ) {

				onUpdateMusic( glEditor.audioBuffer );

			}

			scene.on( "update/props", onUpdateSceneProps );
			scene.on( "update/music", onUpdateMusic );
			scene.on( "update/frame/play", onUpdateFramePlay );


			return () => {

				scene.off( "update/frame/setting", onUpdateSceneProps );
				scene.off( "update/music", onUpdateMusic );
				scene.off( "update/frame/play", onUpdateFramePlay );

			};

		}

	}, [ glEditor ] );

	useEffect( () => {

		if ( renderer && musicBuffer ) {

			renderer.setMusicBuffer( musicBuffer );

		}

	}, [ renderer, musicBuffer ] );

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
