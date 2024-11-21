import { useRef, useEffect } from "react";


import style from './index.module.scss';
import { useOREngineGUI } from "../OREngineGUI";

export const GLCanvas = () => {

	const { editor } = useOREngineGUI();
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		if ( editor && wrapperElmRef.current ) {

			const screen = document.getElementById( 'screen' );

			if ( screen ) {

				screen.remove();

			}

			wrapperElmRef.current.appendChild( editor.screenElm );
			editor.setWrapperElm( wrapperElmRef.current );


		}

	}, [ wrapperElmRef, editor ] );

	return <div className={style.glCanvas} ref={wrapperElmRef}></div>;

};
