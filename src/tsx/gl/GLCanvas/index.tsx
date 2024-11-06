import { useRef, useEffect } from "react";

import { useOREditor } from "../OREditor";

import style from './index.module.scss';

export const GLCanvas = () => {

	const { editor } = useOREditor();
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
