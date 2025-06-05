import { createContext } from "react";
import type { MouseMenuItem } from "../../Hooks/useMouseMenuContext";

export const MouseMenuItemContext = createContext<MouseMenuItem | undefined>( undefined );
