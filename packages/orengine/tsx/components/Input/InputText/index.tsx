

import { useCallback, useEffect, useState } from 'react';

import { useInputWindow } from '../../../hooks/useInputWindow';
import { useLayout } from '../../../hooks/useLayout';

import style from './index.module.scss';

interface InputTextProps {
	value: string;
	onChange?: ( value: string ) => void;
	disabled?: boolean;
	readOnly?: boolean;
}

export const InputText = ( { onChange, value, ...props }: InputTextProps ) => {

	const { open } = useInputWindow();
	const { isSP } = useLayout();

	const [ currentInput, setCurrentInput ] = useState( value );

	const submit = useCallback( () => {

		if ( onChange ) {

			onChange( currentInput );

		}

	}, [ currentInput, onChange ] );

	useEffect( () => {

		setCurrentInput( value );

	}, [ value ] );

	const onClickInput = useCallback( () => {

		if ( ! isSP || props.readOnly || props.disabled ) return;

		open( {
			type: "text",
			value: currentInput,
			onChange: ( v ) => {

				if ( onChange ) onChange( v as string );

			}
		} );

	}, [ isSP, currentInput, onChange, open, props.readOnly, props.disabled ] );

	return <div className={style.container}>
		<input className={style.input} type="text" value={currentInput} placeholder={props.readOnly ? '-' : ''} disabled={props.disabled} readOnly={isSP || props.readOnly} data-lo={props.readOnly }
			onChange={( e ) => {

				setCurrentInput( e.target.value );

			}}
			onBlur={() => {

				submit();

			}}
			onClick={onClickInput}
			onKeyDown={( e ) => {

				if ( e.key === 'Enter' ) {

					e.currentTarget.blur();

				}

			}}
		/>
	</div>;


};
