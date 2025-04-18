import { OREngineProjectData } from "packages/orengine/ts/Engine/ProjectSerializer";
import { useEffect } from "react";

import { OREngineContext } from "./Context/OREngineContext";
import { useOREngineContext } from "./Hooks/useOREngineContext";

export const OREngine: React.FC<{children?: React.ReactNode, gl: WebGL2RenderingContext, project:OREngineProjectData | undefined }> = ( props ) => {

	const context = useOREngineContext( props.gl );
	const { load } = context;

	useEffect( () => {

		load( props.project );

	}, [ load, props.project ] );

	return <OREngineContext.Provider value={context}>{props.children}</OREngineContext.Provider>;

};
