import { createContext } from "react";
import { useMouseMenuContext } from "../../Hooks/useMouseMenuContext";

export const MouseMenuContext = createContext<ReturnType<typeof useMouseMenuContext> | null>( null );
