import { createContext } from "react";

import { useOREditorContext } from "../hooks/useOREditorContext";

import type { FieldUIDefinition } from "../lib/fieldUI";
import type { SceneSelection } from "../providers/OREditorProvider";

export type OREditorContextValue = ReturnType<typeof useOREditorContext> & {
	scenes?: SceneSelection;
	fieldUIs?: FieldUIDefinition[];
};

export const OREditorContext = createContext<OREditorContextValue | null>( null );
