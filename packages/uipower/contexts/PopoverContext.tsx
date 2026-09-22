import { createContext } from "react";

import type { AnchorRect } from "../hooks/useAnchoredPosition";
import type { ReactNode } from "react";

// 開いている浮き要素の1つ
export type PopoverItem = {
	id: number;
	elm: ReactNode;
	anchor: AnchorRect;
};

// 浮き要素の開閉契約。Provider 実装は Popover が担う
export type PopoverContextValue = {
	items: PopoverItem[];
	open: ( elm: ReactNode, anchor: AnchorRect ) => void;
	closeAll: () => void;
};

export const PopoverContext = createContext<PopoverContextValue | null>( null );
