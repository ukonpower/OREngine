import { useCallback, useState } from "react";

import { PopoverContextValue, PopoverItem } from "../../contexts/PopoverContext";
import { AnchorRect } from "../../hooks/useAnchoredPosition";

import type { ReactNode } from "react";

let nextId = 0;

// PopoverContext へ渡す開閉状態を生成する。open は重ねられ（メニューから次の窓を出す等）、closeAll で全部閉じる
export const usePopoverContext = (): PopoverContextValue => {

	const [ items, setItems ] = useState<PopoverItem[]>( [] );

	const open = useCallback( ( elm: ReactNode, anchor: AnchorRect ) => {

		const item: PopoverItem = { id: nextId ++, elm, anchor };

		setItems( ( prev ) => [ ...prev, item ] );

	}, [] );

	const closeAll = useCallback( () => {

		setItems( [] );

	}, [] );

	return {
		items,
		open,
		closeAll,
	};

};
