import { useCallback, useState } from "react";

import { InputWindowConfig, InputWindowContextValue } from "../../../../../contexts/InputWindowContext";

// InputWindowContext へ渡す開閉状態を生成する
export const useInputWindowContext = (): InputWindowContextValue => {

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
