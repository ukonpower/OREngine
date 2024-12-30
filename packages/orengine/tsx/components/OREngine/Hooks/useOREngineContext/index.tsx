import React, { useEffect } from "react";

import { Engine } from "../../../../../ts/Engine";

export const useOREngineContext = ( canvas: HTMLCanvasElement ) => {

	const [ engine, setEngine ] = React.useState<Engine>( () => new Engine( canvas ) );
	const engineRef = React.useRef<Engine>( engine );
	engineRef.current = engine;

	useEffect( () => {

		if ( ! engineRef.current.disposed ) return;

		const newEngine = new Engine( canvas );

		setEngine( newEngine );

	}, [ canvas ] );

	useEffect( () => {

		return () => {

			engine.dispose();

		};


	}, [ engine ] );

	return {
		engine
	};

};
