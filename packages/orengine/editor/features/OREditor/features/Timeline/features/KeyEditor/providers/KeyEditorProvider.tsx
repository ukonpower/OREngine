import { ReactNode } from "react";

import { KeyEditorContext } from "../contexts/KeyEditorContext";
import { useKeyEditorContext } from "../hooks/useKeyEditorContext";

// タイムラインのキー編集の状態（行・選んだキー・表示の切り替え）を、チャンネル一覧とキーの表示へ配る
export const KeyEditorProvider: React.FC<{ children?: ReactNode }> = ( props ) => {

	const context = useKeyEditorContext();

	return <KeyEditorContext.Provider value={context}>{props.children}</KeyEditorContext.Provider>;

};
