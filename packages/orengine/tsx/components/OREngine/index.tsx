import { OREngineContext } from "./Context/OREngineContext";
import { useOREngineContext } from "./Hooks/useOREngineContext";

import { canvas } from "~/ts/Globals";

export const OREngine: React.FC<{children?: React.ReactNode}> = ( props ) => {

	const context = useOREngineContext( canvas );

	return <OREngineContext.Provider value={context}>{props.children}</OREngineContext.Provider>;

};
