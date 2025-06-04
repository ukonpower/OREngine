import { useRef, useEffect } from "react";

import { useOREditor } from "../../hooks/useOREditor";

import style from './index.module.scss';

export const Canvas: React.FC = () => {

	const { engine } = useOREditor();
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		const wrapperElm = wrapperElmRef.current;
		if ( ! engine || ! wrapperElm ) return;

		const canvas = engine.canvas as HTMLCanvasElement;
		if ( ! canvas ) {

			console.error( 'Canvas element not found in engine' );
			return;

		}

		// キャンバスの追加
		wrapperElm.appendChild( canvas );

		// クリーンアップ関数
		return () => {

			if ( wrapperElm.contains( canvas ) ) {

				wrapperElm.removeChild( canvas );

			}

		};

	}, [ engine ] );

	return (
		<div
			className={style.container}
			ref={wrapperElmRef}
			role="presentation"
			aria-label="3D Canvas"
		/>
	);

};
