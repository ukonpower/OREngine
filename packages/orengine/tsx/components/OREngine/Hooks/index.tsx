import React, { useEffect } from "react";

import { Engine } from "../../../../ts/Engine";

import { canvas } from "~/ts/Globals";

export const useOREngineContext = () => {

	const [ engine, setEngine ] = React.useState<Engine>( () => new Engine( canvas ) );
	const engineRef = React.useRef<Engine>( engine );
	engineRef.current = engine;

	useEffect( () => {

		if ( ! engineRef.current.disposed ) return;

		const newEngine = new Engine( canvas );

		setEngine( newEngine );

	}, [] );

	useEffect( () => {

		return () => {

			engine.dispose();

		};


	}, [ engine ] );

	return {
		engine
	};

};
