
import { createContext } from "react";

import { useInputWindowContext } from "../../hooks/useInputWindowContext";

export const InputWindowContext = createContext<ReturnType<typeof useInputWindowContext> | null>( null );
