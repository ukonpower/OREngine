
import { MouseEvent, useCallback, useRef } from 'react';

import { ValueType } from '..';
import { CheckBox } from '../../../CheckBox';

import style from './index.module.scss';

export type ValueInputProps<T> = {
	value: T,
	onChange: ( value: T ) => void
}

export const ValueInput = <T extends number | boolean | string, >( { value, onChange }: ValueInputProps<T> ) => {

	const pointerDownRef = useRef( false );
	const onChangeRef = useRef( onChange );

	const valueRef = useRef<ValueType>();
	valueRef.current = value;

	const onPointerMoveNumber = useCallback( ( e: PointerEvent ) => {

		const value = valueRef.current;

		if ( pointerDownRef.current === false ) return;

		const delta = e.movementX;

		if ( typeof value == "number" ) {

			const deltaValue = Math.pow( delta * 0.1, 2 ) * Math.sign( delta );

			onChangeRef.current( ( value + deltaValue ) as T );

			e.stopPropagation();

		}

		e.preventDefault();


	}, [] );

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

	if ( typeof value == "number" ) {

		const v = Number( value.toFixed( 3 ) );

		return <div className={style.input}>
			<input className={style.input_value} type="number" value={v}
				onChange={( e ) => onChange( e.target.value as T )}
				onPointerDown={onPointerDown}
			/>
		</div>;

	}

	if ( typeof value == "string" ) {

		return <div className={style.input}>
			<input className={style.input_value} type="text" value={value} onChange={( e ) => onChange( e.target.value as T )} />
		</div>;

	}


	if ( typeof value == "boolean" ) {

		return <div className={style.input}>
			<CheckBox checked={value} onChange={( checked ) => onChange( checked as T )} />
		</div>;

	}

};
