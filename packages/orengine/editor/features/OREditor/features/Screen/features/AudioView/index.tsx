import { useState, useRef, useEffect, useCallback } from 'react';

import { FramePlay } from 'orengine';

import { useOREditor } from '../../../../hooks/useOREditor';

import style from './index.module.scss';
import { AudioViewRenderer } from './lib/AudioViewRenderer';


export const AudioView = () => {

	const { editor: gui } = useOREditor();

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

	const musicBuffer = gui && gui.audioBuffer;
	const [ musicBufferVersion, setMusicBufferVersion ] = useState<number>();

	const [ framePlay, setFramePlay ] = useState<FramePlay>( {
		current: 0,
		playing: false,
	} );

	useEffect( () => {

		if ( ! gui ) return;

		const engine = gui.engine;

		let bufferVersion = 0;

		const onUpdateMusic = () => {

			setMusicBufferVersion( bufferVersion ++ );

		};

		const onUpdateFramePlay = ( frame: FramePlay ) => {

			setFramePlay( { ...frame } );

		};

		onUpdateFramePlay( engine.frame );

		engine.on( "update/music", onUpdateMusic );
		engine.on( "update/frame/play", onUpdateFramePlay );


		return () => {

			engine.off( "update/music", onUpdateMusic );
			engine.off( "update/frame/play", onUpdateFramePlay );

		};


	}, [ gui ] );

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
