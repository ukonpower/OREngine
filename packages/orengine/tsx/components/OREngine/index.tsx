
import { OREngineProjectData } from "packages/orengine/ts/Engine/ProjectSerializer";
import { useEffect } from "react";

import { OREngineContext } from "./Context/OREngineContext";
import { useOREngineContext } from "./Hooks/useOREngineContext";

export const OREngine: React.FC<{children?: React.ReactNode, gl: WebGL2RenderingContext, project:OREngineProjectData | undefined, onEngineInit?: ( gl: WebGL2RenderingContext ) => void }> = ( props ) => {

	const context = useOREngineContext( props.gl );
	const { engine } = context;

	useEffect( () => {

		if ( props.onEngineInit ) {

			props.onEngineInit( props.gl );

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
