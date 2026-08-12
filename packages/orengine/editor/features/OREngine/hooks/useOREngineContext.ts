import { createRenderer } from "@or-renderer";
import React, { useCallback, useEffect } from "react";

import { OREngineProjectData } from "orengine";

import { Engine } from "../../../../core/Engine";

export const useOREngineContext = () => {

	const [ engine, setEngine ] = React.useState<Engine>( () => new Engine( createRenderer ) );
	const engineRef = React.useRef<Engine>( engine );
	engineRef.current = engine;

	useEffect( () => {

		if ( ! engineRef.current.disposed ) return;

		setEngine( new Engine( createRenderer ) );

	}, [] );

	useEffect( () => {

		return () => {

			engine.dispose();

		};


	}, [ engine ] );

	const load = useCallback( ( data: OREngineProjectData | undefined ) => {

		if ( data ) {

			engine.load( data );

		}

	}, [ engine ] );

	return {
		engine,
		load
	};

};
