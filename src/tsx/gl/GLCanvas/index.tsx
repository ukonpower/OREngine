import { useContext, useRef, useEffect } from "react";

import { GLContext } from "../useGL";

import style from './index.module.scss';

export const GLCanvas = () => {

	const { glEditor: gl } = useContext( GLContext );
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		if ( gl && wrapperElmRef.current ) {

			const screen = document.getElementById( 'screen' );

			if ( screen ) {

				screen.remove();

			}

			wrapperElmRef.current.appendChild( gl.screenElm );
			gl.setWrapperElm( wrapperElmRef.current );


		}

	}, [ wrapperElmRef, gl ] );

	return <div className={style.glCanvas} ref={wrapperElmRef}></div>;

};
