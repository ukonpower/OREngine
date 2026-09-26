import { useAnchoredPosition } from '../hooks/useAnchoredPosition';
import { usePopover } from '../hooks/usePopover';

import style from './index.module.scss';

import type { PopoverItem } from '../contexts/PopoverContext';

// 開いている要素の1つ。anchor のそばに収まる位置へ置く
const PopoverWindow = ( props: { item: PopoverItem } ) => {

	const anchored = useAnchoredPosition( props.item.anchor );

	return <div ref={anchored.ref} className={style.window} style={anchored.style}>{props.item.elm}</div>;

};

// usePopover().open で渡された要素を、背面を塞がずに浮かせる層。外側のクリックで全部閉じる。
// 右クリックメニュー・ボタンから開くメニュー・その場の入力フォームなどに使う
export const Popover = () => {

	const { items, closeAll } = usePopover();

	if ( items.length === 0 ) return null;

	const windowElms = [];

	for ( const item of items ) {

		windowElms.push( <PopoverWindow key={item.id} item={item} /> );

	}

	return <div className={style.popover}>
		<div className={style.backdrop} onClick={closeAll} />
		{windowElms}
	</div>;

};
