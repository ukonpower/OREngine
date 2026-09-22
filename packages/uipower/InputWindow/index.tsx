
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "../Button";
import { useInputWindow } from "../hooks/useInputWindow";
import { Modal } from "../Modal";

import style from './index.module.scss';

export const InputWindow = () => {

	const { config, close } = useInputWindow();
	const inputRef = useRef<HTMLInputElement>( null );
	const [ tempValue, setTempValue ] = useState<string>( "" );
	const shouldSelectRef = useRef( false );

	useEffect( () => {

		if ( config ) {

			setTempValue( String( config.value ) );
			shouldSelectRef.current = true;

		}

	}, [ config ] );

	useEffect( () => {

		if ( shouldSelectRef.current ) {

			shouldSelectRef.current = false;
			inputRef.current?.focus();
			inputRef.current?.select();

		}

	}, [ tempValue ] );

	const submit = useCallback( () => {

		if ( ! config ) return;

		if ( config.type === "number" ) {

			config.onChange( Number( tempValue ) );

		} else {

			config.onChange( tempValue );

		}

		close();

	}, [ config, tempValue, close ] );

	const cancel = useCallback( () => {

		close();

	}, [ close ] );

	if ( ! config ) return null;

	const footerElm = <>
		<Button onClick={cancel}>Cancel</Button>
		<Button onClick={submit}>OK</Button>
	</>;

	return <Modal title={config.label} onClose={cancel} footer={footerElm}>
		<form onSubmit={( e ) => {

			e.preventDefault();
			submit();

		}}>
			<input
				ref={inputRef}
				className={style.input}
				type="text"
				inputMode={config.type === "number" ? "decimal" : "text"}
				value={tempValue}
				step={config.step}
				min={config.min}
				max={config.max}
				onChange={( e ) => setTempValue( e.target.value )}
				onKeyDown={( e ) => {

					if ( e.key === "Escape" ) cancel();

				}}
			/>
		</form>
	</Modal>;

};
