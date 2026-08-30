import { useRef, useEffect } from "react";

import { useOREditor } from "../../../../hooks/useOREditor";

import style from './index.module.scss';

// ビューポートの表示先。マウント中だけエディタにビューポートを作り、アンマウントで破棄する。
// canvas はパネルごとに自前で持ち、描画結果は drawToCanvas でここへ出してもらう（サイズは Viewport が解像度に合わせる）
export const Canvas: React.FC<{ viewportId: string }> = ( { viewportId } ) => {

	const { engine, editor } = useOREditor();
	const canvasRef = useRef<HTMLCanvasElement | null>( null );

	useEffect( () => {

		const canvas = canvasRef.current;
		if ( ! engine || ! canvas ) return;

		const viewport = editor.createViewport( viewportId, canvas );

		return () => {

			viewport.dispose();

		};

	}, [ engine, editor, viewportId ] );

	return (
		<div
			className={style.container}
			role="presentation"
			aria-label="3D Canvas"
		>
			<canvas ref={canvasRef} />
		</div>
	);

};
