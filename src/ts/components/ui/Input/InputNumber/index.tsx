
import { useRef, useCallback, MouseEvent } from 'react';

import { ValueType } from '../../Property/Value';

import style from './index.module.scss';

interface InputNumberProps {
	value: number;
	slideScale?: number;
	onChange?: ( value: number ) => void;
	precision?: number;
	disabled?: boolean;
	readOnly?: boolean;
}

export const InputNumber = ( { onChange, value, slideScale, ...props }: InputNumberProps ) => {

	const pointerDownRef = useRef( false );

	const onChangeRef = useRef<( value: number ) => void>();
	onChangeRef.current = onChange;

	const valueRef = useRef<ValueType>();
	valueRef.current = value;

	const onPointerMoveNumber = useCallback( ( e: PointerEvent ) => {

		const value = valueRef.current;

		if ( pointerDownRef.current === false ) return;

		const delta = e.movementX;

		if ( typeof value == "number" ) {

			const deltaValue = delta * 0.05 * ( slideScale || 1 );

			if ( onChangeRef.current ) {

				onChangeRef.current( ( value + deltaValue ) );

			}

			e.stopPropagation();

		}

		e.preventDefault();


	}, [ slideScale ] );

	const onPointerDown = useCallback( ( e: MouseEvent ) => {

		pointerDownRef.current = true;

		const onPointerUp = () => {

			pointerDownRef.current = false;

			window.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( "pointermove", onPointerMoveNumber );

		};

		window.addEventListener( "pointerup", onPointerUp );
		window.addEventListener( "pointermove", onPointerMoveNumber );

	}, [ onPointerMoveNumber ] );

	const v = Number( value.toFixed( props.precision ?? 3 ) );

	return <div className={style.inputNumber}>
		<input className={style.input} type="number" value={v} disabled={props.disabled} readOnly={props.readOnly} data-lo={props.readOnly }
			onChange={( e ) => {

				onChange && onChange( Number( e.target.value ) );

			}}
			onPointerDown={onPointerDown}
		/>
	</div>;


};
