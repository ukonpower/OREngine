
import { OREngineProjectData } from "packages/orengine/ts/Engine/ProjectSerializer";
import { useEffect } from "react";

import { Engine } from "../../../ts/Engine";

import { OREngineContext } from "./Context/OREngineContext";
import { useOREngineContext } from "./Hooks/useOREngineContext";

export const OREngine: React.FC<{children?: React.ReactNode, project:OREngineProjectData | undefined, onEngineInit?: ( engine: Engine ) => void }> = ( props ) => {

	const context = useOREngineContext();
	const { engine } = context;

	useEffect( () => {

		if ( props.onEngineInit ) {

			props.onEngineInit( engine );

		}

	}, [ engine ] );

	useEffect( () => {

		if ( props.project ) {

			engine.load( props.project );

		} else {

			engine.init();

		}

	}, [ engine, props.project ] );

	return <OREngineContext.Provider value={context}>{props.children}</OREngineContext.Provider>;

};
