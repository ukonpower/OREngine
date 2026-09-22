import { createContext } from "react";

import { useOREditorContext } from "../hooks/useOREditorContext";

import type { SceneSelection } from "../providers/OREditorProvider";

export type OREditorContextValue = ReturnType<typeof useOREditorContext> & {
	scenes?: SceneSelection;
};

export const OREditorContext = createContext<OREditorContextValue | null>( null );
