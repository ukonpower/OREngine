
import { useCallback, useEffect, useRef, useState } from "react";

import { useInputWindow } from "./hooks/useInputWindow";
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

	return <div className={style.inputWindow}>
		<div className={style.overlay} onClick={cancel} />
		<div className={style.window}>
			{config.label && <div className={style.label}>{config.label}</div>}
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
				<div className={style.buttons}>
					<button type="button" className={style.cancelBtn} onClick={cancel}>Cancel</button>
					<button type="submit" className={style.okBtn}>OK</button>
				</div>
			</form>
		</div>
	</div>;

};
