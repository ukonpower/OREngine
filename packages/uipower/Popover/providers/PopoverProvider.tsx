import { ReactNode } from "react";

import { PopoverContext } from "../../contexts/PopoverContext";
import { usePopoverContext } from "../hooks/usePopoverContext";

// 浮き要素の開閉状態を配下ツリーへ提供する
export const PopoverProvider: React.FC<{ children?: ReactNode }> = ( props ) => {

	const context = usePopoverContext();

	return <PopoverContext.Provider value={context}>{props.children}</PopoverContext.Provider>;

};
