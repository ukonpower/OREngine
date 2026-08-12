import { ReactNode } from "react";

import { InputWindowContext } from "../../../../../contexts/InputWindowContext";
import { useInputWindowContext } from "../hooks/useInputWindowContext";

// 入力ウィンドウの開閉状態を配下ツリーへ提供する
export const InputWindowProvider: React.FC<{ children?: ReactNode }> = ( props ) => {

	const context = useInputWindowContext();

	return <InputWindowContext.Provider value={context}>{props.children}</InputWindowContext.Provider>;

};
