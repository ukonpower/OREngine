import { useEffect, useRef } from "react";

import { useOREditor } from "./useOREditor";

// エディタの毎フレームの処理（エンジンの update と各ビューの描画）の後に callback を呼ぶ。
// canvas を自前の requestAnimationFrame で回すとエディタのフレームとずれるので、こちらに揃える
export const useEditorFrame = ( callback: () => void ) => {

	const { editor } = useOREditor();

	const callbackRef = useRef( callback );
	callbackRef.current = callback;

	useEffect( () => {

		const onFrame = () => {

			callbackRef.current();

		};

		editor.on( "frame", onFrame );

		return () => {

			editor.off( "frame", onFrame );

		};

	}, [ editor ] );

};
