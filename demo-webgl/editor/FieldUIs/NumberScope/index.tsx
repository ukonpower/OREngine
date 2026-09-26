import { useRef, type PointerEvent } from 'react';

import { useEditorFrame, type FieldEdit, type FieldUIProps } from 'orengine/react';

import style from './index.module.scss';

// 描く履歴の長さ（フレーム数）
const HISTORY_LENGTH = 180;

// 数値フィールドの値の推移を canvas に描き、横ドラッグで値を変えるフィールド UI
export const NumberScope = ( { value, beginEdit, target, path, opt }: FieldUIProps<number> ) => {

	const canvasRef = useRef<HTMLCanvasElement>( null );
	const historyRef = useRef<number[]>( [] );
	const dragRef = useRef<{ edit: FieldEdit, startX: number, startValue: number } | null>( null );

	// undo や CLI からの変更も拾えるように、props ではなく毎フレーム target から読む
	useEditorFrame( () => {

		const canvas = canvasRef.current;

		if ( ! canvas ) return;

		const history = historyRef.current;
		history.push( target.getField<number>( path ) ?? 0 );

		if ( history.length > HISTORY_LENGTH ) history.shift();

		const width = canvas.clientWidth * window.devicePixelRatio;
		const height = canvas.clientHeight * window.devicePixelRatio;

		if ( canvas.width !== width || canvas.height !== height ) {

			canvas.width = width;
			canvas.height = height;

		}

		const ctx = canvas.getContext( '2d' );

		if ( ! ctx ) return;

		let min = Infinity;
		let max = - Infinity;

		for ( const v of history ) {

			min = Math.min( min, v );
			max = Math.max( max, v );

		}

		// 値が一定のときも線が中央に出るように、幅を最低 1 確保する
		const range = Math.max( max - min, 1 );
		const center = ( max + min ) / 2;

		ctx.clearRect( 0, 0, width, height );
		ctx.strokeStyle = getComputedStyle( canvas ).getPropertyValue( '--or-text' );
		ctx.lineWidth = window.devicePixelRatio;
		ctx.beginPath();

		for ( let i = 0; i < history.length; i ++ ) {

			const x = i / ( HISTORY_LENGTH - 1 ) * width;
			const y = height / 2 - ( history[ i ] - center ) / range * height * 0.8;

			if ( i === 0 ) {

				ctx.moveTo( x, y );

			} else {

				ctx.lineTo( x, y );

			}

		}

		ctx.stroke();

	} );

	const onPointerDown = ( e: PointerEvent<HTMLCanvasElement> ) => {

		e.currentTarget.setPointerCapture( e.pointerId );

		dragRef.current = { edit: beginEdit(), startX: e.clientX, startValue: value };

	};

	const onPointerMove = ( e: PointerEvent<HTMLCanvasElement> ) => {

		const drag = dragRef.current;

		if ( ! drag ) return;

		// 刻みは既定の数値入力（uipower の InputNumber）と同じく 1px あたり step * 0.05
		const step = opt?.step ?? 1;

		drag.edit.set( drag.startValue + ( e.clientX - drag.startX ) * step * 0.05 );

	};

	const onPointerUp = () => {

		const drag = dragRef.current;

		if ( ! drag ) return;

		drag.edit.commit();
		dragRef.current = null;

	};

	return <div className={style.scope}>
		<canvas
			ref={canvasRef}
			className={style.scope_canvas}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
			onPointerCancel={onPointerUp}
		/>
		<div className={style.scope_value}>{value.toFixed( 3 )}</div>
	</div>;

};
