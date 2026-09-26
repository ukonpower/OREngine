
import { useRef, useCallback, useState, MouseEvent } from 'react';

import { useInputWindow } from '../../hooks/useInputWindow';
import { useMobileDevice } from '../../hooks/useMobileDevice';

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
	// ドラッグの終わり（pointercancel での打ち切りを含む）。範囲選択から指を離してテキスト編集へ移るときは呼ばない
	onDragEnd?: () => void;
	// PC で渡すと、縦向きに動かし始めたドラッグを値の変更ではなく範囲選択として扱い、動かすたびにポインタの Y を渡す
	onSelectDrag?: ( clientY: number ) => void;
};

// 押してからこれだけ動いたらドラッグとみなす。動かさずに離したらテキスト編集（SP は入力ウィンドウ）
const DRAG_THRESHOLD = 3;

// ドラッグ 1px あたりの変化量（step に掛ける）。SP は指で動かす量が PC と違うので分けている。SP の値は仮置きで、実機で触って調整する
const DRAG_SENSITIVITY_PC = 0.05;
const DRAG_SENSITIVITY_SP = 0.1;

// 範囲選択の途中で横にこれだけ動いたら、選択を確定して値のドラッグへ移る。
// 縦に動かしている間の手ぶれで移らないよう DRAG_THRESHOLD より大きくしている
const SELECT_TO_DRAG_THRESHOLD = 10;

// none: まだ DRAG_THRESHOLD を越えていない / drag: 横ドラッグで値を変えている / select: 縦ドラッグで範囲選択している
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

	const pointerDownRef = useRef( false );
	const pointerStartRef = useRef<{ x: number, y: number } | null>( null );
	const modeRef = useRef<DragMode>( "none" );

	// 直前の pointermove の X。movementX は iOS Safari のタッチで 0 になるため、差分は clientX から自前で取る
	const lastXRef = useRef( 0 );

	// 範囲選択に入ったときの X。ここから横に SELECT_TO_DRAG_THRESHOLD 動いたら値のドラッグへ移る
	const selectStartXRef = useRef( 0 );

	// ドラッグで積み上げている丸める前の値。表示中の値に毎回足すと、int のとき 1px ぶんの小さな変化が丸めで消えて動かなくなる
	const dragValueRef = useRef( 0 );

	// pointermove / pointerup は押した時点で window に登録するので、呼び出し側の関数は ref で最新を引く
	const onChangeRef = useRef<( ( value: number ) => void ) | undefined>( undefined );
	onChangeRef.current = props.onChange;

	const onDragRef = useRef<( ( deltaValue: number ) => void ) | undefined>( undefined );
	onDragRef.current = props.onDrag;

	const onDragEndRef = useRef<( () => void ) | undefined>( undefined );
	onDragEndRef.current = props.onDragEnd;

	const onSelectDragRef = useRef<( ( clientY: number ) => void ) | undefined>( undefined );
	onSelectDragRef.current = props.onSelectDrag;

	const valueRef = useRef<number | undefined>( undefined );
	valueRef.current = props.value;

	// 押している間のポインタ移動を、範囲選択か値のドラッグに振り分ける
	const onPointerMoveNumber = useCallback( ( e: PointerEvent ) => {

		if ( pointerDownRef.current === false ) return;

		const start = pointerStartRef.current;

		if ( ! start ) return;

		if ( modeRef.current === "none" ) {

			const dx = e.clientX - start.x;
			const dy = e.clientY - start.y;

			if ( Math.sqrt( dx * dx + dy * dy ) < DRAG_THRESHOLD ) return;

			const selectable = ! isSP && onSelectDragRef.current !== undefined;

			if ( selectable && Math.abs( dy ) > Math.abs( dx ) ) {

				modeRef.current = "select";
				selectStartXRef.current = e.clientX;

			} else {

				modeRef.current = "drag";

			}

			lastXRef.current = e.clientX;

		}

		if ( modeRef.current === "select" ) {

			const onSelectDrag = onSelectDragRef.current;

			if ( Math.abs( e.clientX - selectStartXRef.current ) < SELECT_TO_DRAG_THRESHOLD ) {

				if ( onSelectDrag ) onSelectDrag( e.clientY );

				e.preventDefault();

				return;

			}

			modeRef.current = "drag";
			lastXRef.current = e.clientX;

		}

		const deltaX = e.clientX - lastXRef.current;
		lastXRef.current = e.clientX;

		let sensitivity = DRAG_SENSITIVITY_PC;

		if ( isSP ) sensitivity = DRAG_SENSITIVITY_SP;

		const deltaValue = deltaX * sensitivity * ( props.step || 1 );

		const onDrag = onDragRef.current;
		const value = valueRef.current;

		if ( onDrag ) {

			onDrag( deltaValue );

			e.stopPropagation();

		} else if ( typeof value == "number" ) {

			dragValueRef.current = clamp( dragValueRef.current + deltaValue, props.min, props.max );

			let nextValue = dragValueRef.current;

			if ( props.int ) nextValue = Math.round( nextValue );

			if ( onChangeRef.current && nextValue !== value ) {

				onChangeRef.current( nextValue );

			}

			e.stopPropagation();

		}

		e.preventDefault();

	}, [ isSP, props.step, props.min, props.max, props.int ] );

	const openInputWindow = useCallback( () => {

		if ( props.readOnly || props.disabled ) return;

		open( {
			type: "number",
			value: valueRef.current ?? 0,
			step: props.step,
			min: props.min,
			max: props.max,
			precision: props.precision,
			onChange: ( v ) => {

				if ( onChangeRef.current ) onChangeRef.current( v as number );

			}
		} );

	}, [ open, props.step, props.min, props.max, props.precision, props.readOnly, props.disabled ] );

	const onPointerDown = useCallback( ( e: MouseEvent ) => {

		e.preventDefault();

		pointerDownRef.current = true;
		pointerStartRef.current = { x: e.clientX, y: e.clientY };
		modeRef.current = "none";
		lastXRef.current = e.clientX;
		dragValueRef.current = valueRef.current ?? 0;

		const finish = () => {

			pointerDownRef.current = false;
			pointerStartRef.current = null;
			modeRef.current = "none";

			window.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( "pointercancel", onPointerCancel );
			window.removeEventListener( "pointermove", onPointerMoveNumber );

		};

		const onPointerUp = () => {

			if ( modeRef.current === "drag" ) {

				if ( onDragEndRef.current ) onDragEndRef.current();

			} else if ( isSP ) {

				openInputWindow();

			} else {

				setEditing( true );
				setLocalValue( String( Number( ( valueRef.current ?? 0 ).toFixed( props.precision ?? 3 ) ) ) );

				requestAnimationFrame( () => {

					inputRef.current?.focus();
					inputRef.current?.select();

				} );

			}

			finish();

		};

		// SP で縦に動かすと touch-action: pan-y によりブラウザがスクロールを始めて pointercancel が届く。
		// そこでドラッグを打ち切り、入力ウィンドウも開かない
		const onPointerCancel = () => {

			if ( modeRef.current !== "none" && onDragEndRef.current ) {

				onDragEndRef.current();

			}

			finish();

		};

		window.addEventListener( "pointerup", onPointerUp );
		window.addEventListener( "pointercancel", onPointerCancel );
		window.addEventListener( "pointermove", onPointerMoveNumber );

	}, [ onPointerMoveNumber, isSP, openInputWindow, props.precision ] );

	const displayValue = editing
		? localValue
		: String( Number( ( props.value ?? 0 ).toFixed( props.precision ?? 3 ) ) );

	return <div className={style.inputNumber}>
		<input ref={inputRef} className={style.input} type={editing ? "text" : "number"} inputMode={editing ? "decimal" : undefined} value={displayValue} disabled={props.disabled} readOnly={isSP || props.readOnly} data-lo={props.readOnly} data-selected={props.selected}
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

				setLocalValue( e.target.value );

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
