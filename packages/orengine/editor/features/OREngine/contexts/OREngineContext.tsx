import { createContext } from "react";

import { useOREngineContext } from "../hooks/useOREngineContext";

export const OREngineContext = createContext<ReturnType<typeof useOREngineContext> | null>( null );
