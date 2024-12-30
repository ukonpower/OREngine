import { createContext } from "react";

import { useOREngineContext } from "../../Hooks/useOREngineContext";

export const OREngineContext = createContext<ReturnType<typeof useOREngineContext> | null>( null );
