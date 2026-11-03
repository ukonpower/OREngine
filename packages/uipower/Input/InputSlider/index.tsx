import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

import { trackPointerDrag } from '../../PointerDrag';

import style from './index.module.scss';

type Props = {
	value: number;
	min: number;
	max: number;
	onChange?: ( value: number ) => void;
	// 値の刻み。min から数えた倍数に丸める。省略時は丸めない
	step?: number;
	// 塗りの始まる値。パンのように真ん中が基準の値は 0 を渡すと、そこから左右へ塗る。省略時は min
	origin?: number;
	// ダブルクリックで戻す値。省略時はダブルクリックで何もしない
	defaultValue?: number;
	// 値の表示の小数の桁数
	precision?: number;
	disabled?: boolean;
	// 押してから離すまでを undo 1回にまとめるため。押した時点で値が変わるので、ドラッグしなくても押した時点で呼ぶ
	onDragStart?: () => void;
	// 離したとき（pointercancel での打ち切りを含む）
	onDragEnd?: () => void;
	// 押している間の右クリック / Esc での取り消し。渡せば戻すのは呼び出し側に任せ、無ければ onChange で押す前の値へ戻す。どちらでも onDragEnd は呼ばない
	onDragCancel?: () => void;
};

const clamp = ( value: number, min: number, max: number ) => {

	return Math.min( max, Math.max( min, value ) );

};

// 横向きのスライダー。押した位置へ値を合わせ、そのままドラッグで動かす（つまみはカーソルの下を追うので Pointer Lock は取らない）
export const InputSlider = ( props: Props ) => {

	const trackRef = useRef<HTMLDivElement>( null );

	// ドラッグは押した時点から描画をまたいで続くので、props は ref で最新を引く
	const propsRef = useRef( props );
	propsRef.current = props;

	// ポインタの X をトラックの上の値にする
	const valueAt = ( clientX: number ) => {

		const current = propsRef.current;
		const rect = trackRef.current!.getBoundingClientRect();
		const ratio = clamp( ( clientX - rect.left ) / rect.width, 0, 1 );

		let value = current.min + ratio * ( current.max - current.min );

		if ( current.step ) {

			value = current.min + Math.round( ( value - current.min ) / current.step ) * current.step;

		}

		return clamp( value, current.min, current.max );

	};

	const change = ( value: number ) => {

		const current = propsRef.current;

		if ( current.onChange && value !== current.value ) current.onChange( value );

	};

	const onPointerDown = ( e: ReactPointerEvent<HTMLDivElement> ) => {

		if ( props.disabled || e.button !== 0 ) return;

		e.preventDefault();

		const startValue = props.value;
		const startX = e.clientX;

		if ( props.onDragStart ) props.onDragStart();

		change( valueAt( startX ) );

		trackPointerDrag( e, {
			onMove: ( dx ) => {

				change( valueAt( startX + dx ) );

			},
			onEnd: () => {

				const onDragEnd = propsRef.current.onDragEnd;

				if ( onDragEnd ) onDragEnd();

			},
			onCancel: () => {

				const onDragCancel = propsRef.current.onDragCancel;

				if ( onDragCancel ) {

					onDragCancel();

				} else {

					change( startValue );

				}

			},
		} );

	};

	const onDoubleClick = () => {

		if ( props.disabled || props.defaultValue === undefined ) return;

		change( props.defaultValue );

	};

	const range = props.max - props.min;
	const ratioOf = ( value: number ) => clamp( ( value - props.min ) / range, 0, 1 );

	const valueRatio = ratioOf( props.value );
	const originRatio = ratioOf( props.origin ?? props.min );

	// --from / --to が塗りの左右の端、--value がつまみの位置（どれも 0〜100%）
	const trackStyle = {
		"--from": `${Math.min( valueRatio, originRatio ) * 100}%`,
		"--to": `${Math.max( valueRatio, originRatio ) * 100}%`,
		"--value": `${valueRatio * 100}%`,
	} as CSSProperties;

	// 押して動かすのはトラックの部分だけ。値の文字の上で押してもトラックの外なので端の値へ飛ばさない
	return <div className={style.slider} data-disabled={props.disabled}>
		<div
			className={style.track}
			role="slider"
			aria-valuenow={props.value}
			aria-valuemin={props.min}
			aria-valuemax={props.max}
			aria-disabled={props.disabled}
			style={trackStyle}
			onPointerDown={onPointerDown}
			onDoubleClick={onDoubleClick}
		>
			<div ref={trackRef} className={style.track_line}>
				<div className={style.track_fill} />
				<div className={style.track_thumb} />
			</div>
		</div>
		<span className={style.value}>{props.value.toFixed( props.precision ?? 2 )}</span>
	</div>;

};
