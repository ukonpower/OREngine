import { createContext } from "react";

import { useOREditorContext } from "../../Hooks/useOREditorContext";

export const OREditorContext = createContext<ReturnType<typeof useOREditorContext >| null>( null );
