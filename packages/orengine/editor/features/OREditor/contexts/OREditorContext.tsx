import { createContext } from "react";

import { useOREditorContext } from "../hooks/useOREditorContext";

export const OREditorContext = createContext<ReturnType<typeof useOREditorContext >| null>( null );
