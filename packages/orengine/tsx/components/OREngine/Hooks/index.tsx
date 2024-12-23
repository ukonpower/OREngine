import React, { useEffect } from "react";

import { Engine } from "../../../../ts/Engine";

export const useOREngineContext = () => {

	const [ engine ] = React.useState<Engine>( new Engine() );

	useEffect( () => {

	  return () => {

			engine.dispose();

		};

	}, [ engine ] );

	return {
		engine
	};

};
