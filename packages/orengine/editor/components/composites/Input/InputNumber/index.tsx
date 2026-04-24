
import { useRef, useCallback, useState, MouseEvent } from 'react';

import { useInputWindow } from '../../../../features/InputWindow/hooks/useInputWindow';
import { useMobileDevice } from '../../../../features/MobileDevice/hooks/useMobileDevice';
import { ValueProps } from '../../Value';

import style from './index.module.scss';


type Props = ValueProps<number> & {
	onChange?: ( value: number ) => void;
	step?: number;
	min?: number;
	max?: number;
	precision?: number;
};

const DRAG_THRESHOLD = 3;

export const InputNumber = ( props: Props ) => {

	const { open } = useInputWindow();
	const isSP = useMobileDevice();

	const inputRef = useRef<HTMLInputElement>( null );
	const [ editing, setEditing ] = useState( false );
	const [ localValue, setLocalValue ] = useState( "" );

	const pointerDownRef = useRef( false );
	const pointerStartRef = useRef<{ x: number, y: number } | null>( null );
	const draggedRef = useRef( false );

	const onChangeRef = useRef<( value: number ) => void>();
	onChangeRef.current = props.onChange;

	const valueRef = useRef<number>();
	valueRef.current = props.value;

	const onPointerMoveNumber = useCallback( ( e: PointerEvent ) => {

		const value = valueRef.current;

		if ( pointerDownRef.current === false ) return;

		const start = pointerStartRef.current;

		if ( start ) {

			const dx = e.clientX - start.x;
			const dy = e.clientY - start.y;

			if ( Math.sqrt( dx * dx + dy * dy ) >= DRAG_THRESHOLD ) {

				draggedRef.current = true;

			}

		}

		if ( ! draggedRef.current ) return;

		const delta = e.movementX;

		if ( typeof value == "number" ) {

			const deltaValue = delta * 0.05 * ( props.step || 1 );

			if ( onChangeRef.current ) {

				onChangeRef.current( ( value + deltaValue ) );

			}

			e.stopPropagation();

		}

		e.preventDefault();


	}, [ props.step ] );

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
		draggedRef.current = false;

		const onPointerUp = () => {

			if ( ! draggedRef.current ) {

				if ( isSP ) {

					openInputWindow();

				} else {

					setEditing( true );
					setLocalValue( String( Number( ( valueRef.current ?? 0 ).toFixed( props.precision ?? 3 ) ) ) );

					requestAnimationFrame( () => {

						inputRef.current?.focus();
						inputRef.current?.select();

					} );

				}

			}

			pointerDownRef.current = false;
			pointerStartRef.current = null;
			draggedRef.current = false;

			window.removeEventListener( "pointerup", onPointerUp );

			if ( ! isSP ) {

				window.removeEventListener( "pointermove", onPointerMoveNumber );

			}

		};

		window.addEventListener( "pointerup", onPointerUp );

		if ( ! isSP ) {

			window.addEventListener( "pointermove", onPointerMoveNumber );

		}

	}, [ onPointerMoveNumber, isSP, openInputWindow ] );

	const displayValue = editing
		? localValue
		: String( Number( ( props.value ?? 0 ).toFixed( props.precision ?? 3 ) ) );

	return <div className={style.inputNumber}>
		<input ref={inputRef} className={style.input} type={editing ? "text" : "number"} inputMode={editing ? "decimal" : undefined} value={displayValue} disabled={props.disabled} readOnly={isSP || props.readOnly} data-lo={props.readOnly }
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
