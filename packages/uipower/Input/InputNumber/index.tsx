
import { useRef, useState, CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

import { useInputWindow } from '../../hooks/useInputWindow';
import { useMobileDevice } from '../../hooks/useMobileDevice';
import { trackPointerDrag } from '../../PointerDrag';

import style from './index.module.scss';


type Props = {
	value: number | undefined;
	onChange?: ( value: number ) => void;
	step?: number;
	min?: number;
	max?: number;
	// 整数に丸める。ドラッグ中も整数ずつ動く
	int?: boolean;
	precision?: number;
	disabled?: boolean;
	readOnly?: boolean;
	// 一括入力の対象として選ばれている見た目にする
	selected?: boolean;
	// 渡すと、ドラッグで値を自分では反映せず丸める前の変化量を渡す。Vector が選択中の全軸へ同じ変化量を配るため
	onDrag?: ( deltaValue: number ) => void;
	// 横ドラッグで値を変え始めたとき（範囲選択から移ったときを含む）
	onDragStart?: () => void;
	// ドラッグの終わり（pointercancel での打ち切りを含む）。範囲選択から指を離してテキスト編集へ移るときは呼ばない
	onDragEnd?: () => void;
	// 押している間の右クリック / Esc での取り消し（Blender と同じ操作）。onDrag が無ければ、呼ぶ前に onChange で押した時点の値へ戻す。
	// onDrag を渡した側は値を自分で持っているので、戻すのもそちらで行う
	onDragCancel?: () => void;
	// PC で渡すと、縦向きに動かし始めたドラッグを値の変更ではなく範囲選択として扱い、動かすたびにポインタの Y を渡す
	onSelectDrag?: ( clientY: number ) => void;
};

// ドラッグ 1px あたりの変化量（step に掛ける）。SP は指で動かす量が PC と違うので分けている。SP の値は仮置きで、実機で触って調整する
const DRAG_SENSITIVITY_PC = 0.05;
const DRAG_SENSITIVITY_SP = 0.1;

// 範囲選択の途中で横にこれだけ動いたら、選択を確定して値のドラッグへ移る。
// 縦に動かしている間の手ぶれで移らないよう、ドラッグの閾値（trackPointerDrag の 3px）より大きくしている
const SELECT_TO_DRAG_THRESHOLD = 10;

// スピンボタン（↑↓）の幅。CSS の ::-webkit-inner-spin-button と揃え、押した位置がそこかを判定する
const SPIN_BUTTON_WIDTH = 14;

// none: まだドラッグの閾値を越えていない / drag: 横ドラッグで値を変えている / select: 縦ドラッグで範囲選択している
type DragMode = "none" | "drag" | "select";

// min / max の範囲に収める。指定の無い側は制限しない
const clamp = ( value: number, min: number | undefined, max: number | undefined ) => {

	let result = value;

	if ( min !== undefined ) result = Math.max( min, result );
	if ( max !== undefined ) result = Math.min( max, result );

	return result;

};

export const InputNumber = ( props: Props ) => {

	const { open } = useInputWindow();
	const isSP = useMobileDevice();

	const inputRef = useRef<HTMLInputElement>( null );
	const [ editing, setEditing ] = useState( false );
	const [ localValue, setLocalValue ] = useState( "" );

	// ドラッグは押した時点から描画をまたいで続くので、props は ref で最新を引く
	const propsRef = useRef( props );
	propsRef.current = props;

	const openInputWindow = () => {

		const current = propsRef.current;

		if ( current.readOnly || current.disabled ) return;

		open( {
			type: "number",
			value: current.value ?? 0,
			step: current.step,
			min: current.min,
			max: current.max,
			precision: current.precision,
			onChange: ( v ) => {

				const onChange = propsRef.current.onChange;

				if ( onChange ) onChange( v as number );

			}
		} );

	};

	const startEditing = () => {

		setEditing( true );
		setLocalValue( String( Number( ( propsRef.current.value ?? 0 ).toFixed( propsRef.current.precision ?? 3 ) ) ) );

		requestAnimationFrame( () => {

			inputRef.current?.focus();
			inputRef.current?.select();

		} );

	};

	// 押した位置が input 右端のスピンボタン上か
	const isOnSpinButton = ( e: ReactPointerEvent<HTMLInputElement> ) => {

		const input = e.currentTarget;
		const rect = input.getBoundingClientRect();
		const paddingRight = parseFloat( getComputedStyle( input ).paddingRight ) || 0;

		return e.clientX >= rect.right - paddingRight - SPIN_BUTTON_WIDTH;

	};

	// 押してから離すまで。横ドラッグで値を変え、縦ドラッグで範囲選択し、動かさずに離したらテキスト編集（SP は入力ウィンドウ）へ移る
	const onPointerDown = ( e: ReactPointerEvent<HTMLInputElement> ) => {

		// スピンボタン上はブラウザに任せ、値の増減を onChange で受け取る
		if ( ! isSP && ! editing && isOnSpinButton( e ) ) return;

		e.preventDefault();

		const startValue = propsRef.current.value;

		let mode: DragMode = "none";

		// 範囲選択に入ったときの横のずれ。ここから横に SELECT_TO_DRAG_THRESHOLD 動いたら値のドラッグへ移る
		let selectStartDx = 0;

		// 前回までに値へ反映した横のずれ
		let lastDx = 0;

		// ドラッグで積み上げている丸める前の値。表示中の値に毎回足すと、int のとき 1px ぶんの小さな変化が丸めで消えて動かなくなる
		let dragValue = startValue ?? 0;

		// 値のドラッグに入る。範囲選択では縦の位置を使うので、カーソルを隠して画面端で止まらないようにするのはここから
		const beginValueDrag = ( dx: number ) => {

			mode = "drag";
			lastDx = dx;

			drag.lock();

			const onDragStart = propsRef.current.onDragStart;

			if ( onDragStart ) onDragStart();

		};

		const drag = trackPointerDrag( e, {
			onMove: ( dx, dy, moveEvent ) => {

				const current = propsRef.current;

				if ( mode === "none" ) {

					const selectable = ! isSP && current.onSelectDrag !== undefined;

					if ( selectable && Math.abs( dy ) > Math.abs( dx ) ) {

						mode = "select";
						selectStartDx = dx;

					} else {

						beginValueDrag( dx );

					}

				}

				if ( mode === "select" ) {

					if ( Math.abs( dx - selectStartDx ) < SELECT_TO_DRAG_THRESHOLD ) {

						if ( current.onSelectDrag ) current.onSelectDrag( moveEvent.clientY );

						moveEvent.preventDefault();

						return;

					}

					beginValueDrag( dx );

				}

				const deltaX = dx - lastDx;
				lastDx = dx;

				let sensitivity = DRAG_SENSITIVITY_PC;

				if ( isSP ) sensitivity = DRAG_SENSITIVITY_SP;

				const deltaValue = deltaX * sensitivity * ( current.step || 1 );

				if ( current.onDrag ) {

					current.onDrag( deltaValue );

				} else if ( typeof current.value == "number" ) {

					dragValue = clamp( dragValue + deltaValue, current.min, current.max );

					let nextValue = dragValue;

					if ( current.int ) nextValue = Math.round( nextValue );

					if ( current.onChange && nextValue !== current.value ) {

						current.onChange( nextValue );

					}

				}

				moveEvent.preventDefault();

			},
			onEnd: ( _dragged, upEvent ) => {

				const current = propsRef.current;

				// SP で縦に動かすと touch-action: pan-y によりブラウザがスクロールを始めて pointercancel が届く。
				// そこでドラッグを打ち切り、入力ウィンドウも開かない
				if ( upEvent.type === "pointercancel" ) {

					if ( mode !== "none" && current.onDragEnd ) current.onDragEnd();

					return;

				}

				if ( mode === "drag" ) {

					if ( current.onDragEnd ) current.onDragEnd();

				} else if ( isSP ) {

					openInputWindow();

				} else {

					startEditing();

				}

			},
			// 押している間の右クリック / Esc。値を押した時点へ戻し、テキスト編集にも移らない
			onCancel: () => {

				const current = propsRef.current;

				if ( mode === "drag" && ! current.onDrag && current.onChange && typeof startValue === "number" && current.value !== startValue ) {

					current.onChange( startValue );

				}

				if ( mode !== "none" && current.onDragCancel ) current.onDragCancel();

			},
		} );

	};

	const displayValue = editing
		? localValue
		: String( Number( ( props.value ?? 0 ).toFixed( props.precision ?? 3 ) ) );

	// min と max が両方あるときだけ、値の位置をスライダーのように背景の塗りで見せる。片側だけでは割合が出せない
	let sliderStyle: CSSProperties | undefined = undefined;

	if ( props.min !== undefined && props.max !== undefined && props.max > props.min ) {

		const ratio = clamp( ( ( props.value ?? 0 ) - props.min ) / ( props.max - props.min ), 0, 1 );

		sliderStyle = { "--ratio": `${ratio * 100}%` } as CSSProperties;

	}

	return <div className={style.inputNumber}>
		<input ref={inputRef} className={style.input} type={editing ? "text" : "number"} inputMode={editing ? "decimal" : undefined} value={displayValue} disabled={props.disabled} readOnly={isSP || props.readOnly} data-lo={props.readOnly} data-selected={props.selected}
			data-slider={sliderStyle !== undefined}
			style={sliderStyle}
			step={props.step || 1}
			min={props.min}
			max={props.max}
			onBlur={() => {

				if ( ! editing ) return;

				setEditing( false );

				if ( props.onChange ) {

					const num = Number( localValue );
					props.onChange( isNaN( num ) ? 0 : num );

				}

			}}
			onChange={( e ) => {

				if ( editing ) {

					setLocalValue( e.target.value );

					return;

				}

				// 編集中でないときの変化はスピンボタン / 矢印キーによる step 単位の増減
				const num = Number( e.target.value );

				if ( props.onChange && e.target.value !== "" && ! isNaN( num ) ) props.onChange( num );

			}}
			onKeyDown={( e ) => {

				if ( e.key === "Enter" ) {

					inputRef.current?.blur();

				}

			}}
			onPointerDown={onPointerDown}
		/>
	</div>;


};
