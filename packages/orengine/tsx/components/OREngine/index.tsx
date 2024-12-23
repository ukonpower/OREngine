import React from "react";

import { OREngineContext } from "./Context";
import { useOREngineContext } from "./Hooks";

export const OREngine: React.FC<{children?: React.ReactNode}> = ( props ) => {

	const context = useOREngineContext();

	return <OREngineContext.Provider value={context}>{props.children}</OREngineContext.Provider>;

};
