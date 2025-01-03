import { useRef, useEffect } from "react";


import { useOREditor } from "../../hooks/useOREditor";

import style from './index.module.scss';

export const Canvas = () => {

	const { engine } = useOREditor();
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		const wrapperElm = wrapperElmRef.current;

		if ( engine && wrapperElm ) {

			wrapperElm.appendChild( engine.canvasWrapElm );
			engine.resize();

			return () => {

				if ( wrapperElm ) {

					wrapperElm.removeChild( engine.canvasWrapElm );

				}

			};

		}


	}, [ engine ] );

	return <div className={style.glCanvas} ref={wrapperElmRef}></div>;

};
