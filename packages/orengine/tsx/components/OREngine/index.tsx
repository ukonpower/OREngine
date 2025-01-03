import { OREngineContext } from "./Context/OREngineContext";
import { useOREngineContext } from "./Hooks/useOREngineContext";

export const OREngine: React.FC<{children?: React.ReactNode, gl: WebGL2RenderingContext }> = ( props ) => {

	const context = useOREngineContext( props.gl );

	return <OREngineContext.Provider value={context}>{props.children}</OREngineContext.Provider>;

};
