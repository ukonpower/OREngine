import { createContext } from "react";

import type { MouseMenuItem } from "../hooks/useMouseMenuContext";

export const MouseMenuItemContext = createContext<MouseMenuItem | undefined>( undefined );
