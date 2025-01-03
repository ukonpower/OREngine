import React, { useEffect } from "react";

import { Engine } from "../../../../../ts/Engine";

export const useOREngineContext = ( gl: WebGL2RenderingContext ) => {

	const [ engine, setEngine ] = React.useState<Engine>( () => new Engine( gl ) );
	const engineRef = React.useRef<Engine>( engine );
	engineRef.current = engine;

	useEffect( () => {

		if ( ! engineRef.current.disposed ) return;

		const newEngine = new Engine( gl );

		setEngine( newEngine );

	}, [ gl ] );

	useEffect( () => {

		return () => {

			engine.dispose();

		};


	}, [ engine ] );

	return {
		engine
	};

};
