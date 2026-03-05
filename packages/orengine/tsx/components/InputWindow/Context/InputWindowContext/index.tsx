
import { createContext } from "react";

import { useInputWindowContext } from "../../Hooks/useInputWindowContext";

export const InputWindowContext = createContext<ReturnType<typeof useInputWindowContext> | null>( null );
