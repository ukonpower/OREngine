
import { useRef, useCallback, MouseEvent } from 'react';

import { ValueProps, ValueType } from '../../Value';

import style from './index.module.scss';


type Props = ValueProps<number> & {
	onChange: ( value: number ) => void;
};

export const InputNumber = ( props: Props ) => {

	const pointerDownRef = useRef( false );

	const onChangeRef = useRef<( value: number ) => void>();
	onChangeRef.current = props.onChange;

	const valueRef = useRef<ValueType>();
	valueRef.current = props.value;

	const onPointerMoveNumber = useCallback( ( e: PointerEvent ) => {

		const value = valueRef.current;

		if ( pointerDownRef.current === false ) return;

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

	const v = Number( ( props.value || 0 ).toFixed( props.precision ?? 3 ) );

	return <div className={style.inputNumber}>
		<input className={style.input} type="number" value={v} disabled={props.disabled} readOnly={props.readOnly} data-lo={props.readOnly }
			step={props.step || 1}
			min={props.min}
			max={props.max}
			onChange={( e ) => {

				props.onChange( Number( e.target.value ) );

			}}
			onPointerDown={onPointerDown}
		/>
	</div>;


};
