import { createContext } from "react";

import { useOREditorContext } from "../Hooks";

export const OREditorContext = createContext<ReturnType<typeof useOREditorContext >| null>( null );
