import { useRef, useEffect } from "react";


import { useOREditor } from "../../hooks/useOREditor";

import style from './index.module.scss';

export const GLCanvas = () => {

	const { gui } = useOREditor();
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
