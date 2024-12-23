import { createContext } from "react";

import { useOREngineContext } from "../Hooks";

export const OREngineContext = createContext<ReturnType<typeof useOREngineContext> | null>( null );
