
import { useCallback, useState } from "react";

export type InputWindowConfig = {
	type: "number" | "text";
	value: number | string;
	label?: string;
	onChange: ( value: number | string ) => void;
	step?: number;
	min?: number;
	max?: number;
	precision?: number;
};

export const useInputWindowContext = () => {

	const [ config, setConfig ] = useState<InputWindowConfig | null>( null );

	const open = useCallback( ( config: InputWindowConfig ) => {

		setConfig( config );

	}, [] );

	const close = useCallback( () => {

		setConfig( null );

	}, [] );

	return {
		config,
		open,
		close,
	};

};
