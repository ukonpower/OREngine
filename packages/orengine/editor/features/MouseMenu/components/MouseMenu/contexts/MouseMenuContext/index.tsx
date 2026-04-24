import { createContext } from "react";
import { useMouseMenuContext } from "../../../../hooks/useMouseMenuContext";

export const MouseMenuContext = createContext<ReturnType<typeof useMouseMenuContext> | null>( null );
