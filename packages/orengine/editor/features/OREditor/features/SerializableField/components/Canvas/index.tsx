import { useRef, useEffect } from "react";

import { useOREditor } from "../../../../hooks/useOREditor";

import style from './index.module.scss';

// ビューポートの表示先。マウント中だけエディタにビューポートを作り、アンマウントで破棄する
export const Canvas: React.FC<{ viewportId: string }> = ( { viewportId } ) => {

	const { engine, editor } = useOREditor();
	const wrapperElmRef = useRef<HTMLDivElement | null>( null );

	useEffect( () => {

		const wrapperElm = wrapperElmRef.current;
		if ( ! engine || ! wrapperElm ) return;

		// 表示先には GL コンテキストを持つエンジンの canvas をそのまま使う
		const canvas = engine.canvas as HTMLCanvasElement;
		if ( ! canvas ) {

			console.error( 'Canvas element not found in engine' );
			return;

		}

		wrapperElm.appendChild( canvas );

		const viewport = editor.createViewport( viewportId, canvas );

		return () => {

			viewport.dispose();

			if ( wrapperElm.contains( canvas ) ) {

				wrapperElm.removeChild( canvas );

			}

		};

	}, [ engine, editor, viewportId ] );

	return (
		<div
			className={style.container}
			ref={wrapperElmRef}
			role="presentation"
			aria-label="3D Canvas"
		/>
	);

};
