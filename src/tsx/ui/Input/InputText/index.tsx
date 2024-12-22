

import { useCallback, useState } from 'react';

import style from './index.module.scss';

interface InputTextProps {
	value: string;
	onChange?: ( value: string ) => void;
	disabled?: boolean;
	readOnly?: boolean;
}

export const InputText = ( { onChange, value, ...props }: InputTextProps ) => {

	const [ currentInput, setCurrentInput ] = useState( value );

	const submit = useCallback( () => {

		if ( onChange ) {

			onChange( currentInput );

		}

	}, [ currentInput, onChange ] );

	return <div className={style.container}>
		<input className={style.input} type="text" value={currentInput} placeholder={props.readOnly ? '-' : ''} disabled={props.disabled} readOnly={props.readOnly} data-lo={props.readOnly }
			onChange={( e ) => {

				setCurrentInput( e.target.value );

			}}
			onBlur={( e ) => {

				submit();

			}}
			onKeyDown={( e ) => {

				if ( e.key === 'Enter' ) {

					e.currentTarget.blur();

				}

			}}
		/>
	</div>;


};
