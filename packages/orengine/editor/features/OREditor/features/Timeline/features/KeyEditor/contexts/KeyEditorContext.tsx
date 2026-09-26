import { createContext } from "react";

import { useKeyEditorContext } from "../hooks/useKeyEditorContext";

export const KeyEditorContext = createContext<ReturnType<typeof useKeyEditorContext> | null>( null );
