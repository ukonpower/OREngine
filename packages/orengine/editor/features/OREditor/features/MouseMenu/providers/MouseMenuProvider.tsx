import { ReactNode } from "react";

import { MouseMenuContext } from "../contexts/MouseMenuContext";
import { useMouseMenuContext } from "../hooks/useMouseMenuContext";

// マウスメニューの状態を配下ツリーへ提供する
export const MouseMenuProvider: React.FC<{ children?: ReactNode }> = ( props ) => {

	const context = useMouseMenuContext();

	return <MouseMenuContext.Provider value={context}>{props.children}</MouseMenuContext.Provider>;

};
