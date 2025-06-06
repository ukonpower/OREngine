
import * as GLP from 'glpower';
import { OREngineProjectData } from "packages/orengine/ts/Engine/ProjectSerializer";
import { useEffect } from "react";

import { OREngineContext } from "./Context/OREngineContext";
import { useOREngineContext } from "./Hooks/useOREngineContext";

export const OREngine: React.FC<{children?: React.ReactNode, gl: WebGL2RenderingContext, project:OREngineProjectData | undefined }> = ( props ) => {

	const context = useOREngineContext( props.gl );
	const { engine } = context;

	useEffect( () => {

		engine.setSize( new GLP.Vector( 1920, 1080 ) );

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
