
import { useRef, useCallback, MouseEvent } from 'react';

import { useInputWindow } from '../../../hooks/useInputWindow';
import { useLayout } from '../../../hooks/useLayout';
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
	const { isSP } = useLayout();

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
			value: valueRef.current || 0,
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

		pointerDownRef.current = true;
		pointerStartRef.current = { x: e.clientX, y: e.clientY };
		draggedRef.current = false;

		const onPointerUp = () => {

			if ( ! draggedRef.current ) {

				if ( isSP ) {

					openInputWindow();

				}

			}

			pointerDownRef.current = false;
			pointerStartRef.current = null;
			draggedRef.current = false;

			window.removeEventListener( "pointerup", onPointerUp );

			if ( !isSP ) {

				window.removeEventListener( "pointermove", onPointerMoveNumber );

			}

		};

		window.addEventListener( "pointerup", onPointerUp );

		if ( !isSP ) {

			window.addEventListener( "pointermove", onPointerMoveNumber );

		}

	}, [ onPointerMoveNumber, isSP, openInputWindow ] );

	const v = Number( ( props.value || 0 ).toFixed( props.precision ?? 3 ) );

	return <div className={style.inputNumber}>
		<input className={style.input} type="number" value={v} disabled={props.disabled} readOnly={isSP || props.readOnly} data-lo={props.readOnly }
			step={props.step || 1}
			min={props.min}
			max={props.max}
			onChange={( e ) => {

				if ( props.onChange ) props.onChange( Number( e.target.value ) );

			}}
			onPointerDown={onPointerDown}
		/>
	</div>;


};
