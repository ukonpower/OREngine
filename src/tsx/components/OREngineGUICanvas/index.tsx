import { useRef, useEffect } from "react";


import style from './index.module.scss';
import { useOREngineGUI } from "../OREngineGUI";

export const GLCanvas = () => {

	const { gui } = useOREngineGUI();
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		if ( gui && wrapperElmRef.current ) {

			const screen = document.getElementById( 'screen' );

			if ( screen ) {

				screen.remove();

			}

			wrapperElmRef.current.appendChild( gui.screenElm );
			gui.setWrapperElm( wrapperElmRef.current );


		}

	}, [ wrapperElmRef, gui ] );

	return <div className={style.glCanvas} ref={wrapperElmRef}></div>;

};
