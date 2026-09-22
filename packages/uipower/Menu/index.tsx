import { useRef, useState } from 'react';

import { useAnchoredPosition } from '../hooks/useAnchoredPosition';
import { ListItem } from '../ListItem';

import style from './index.module.scss';

import type { AnchorRect } from '../hooks/useAnchoredPosition';
import type { MouseEvent, ReactNode } from 'react';

// クリックで確定する葉
export type MenuLeaf = {
	label: string;
	onClick?: ( event: MouseEvent ) => void;
};

// サブメニューを開く枝
export type MenuBranch = {
	label: string;
	children: MenuItem[];
};

export type MenuItem = MenuLeaf | MenuBranch;

export type MenuProps = {
	title?: string;
	items: MenuItem[];
};

// hover できる環境ではポインタの出入りでサブメニューを開閉し、できない環境ではクリックで切り替える
const canHover = () => window.matchMedia( "(hover: hover)" ).matches;

// メニューの1項目。枝は項目の右側にサブメニューを開き、右に入らなければ左側へ折り返す
const MenuNode = ( props: { item: MenuItem } ) => {

	const item = props.item;

	const nodeRef = useRef<HTMLDivElement>( null );
	const [ subAnchor, setSubAnchor ] = useState<AnchorRect | null>( null );

	const isBranch = "children" in item;

	const openSub = () => {

		const rect = nodeRef.current?.getBoundingClientRect();

		if ( ! rect ) return;

		setSubAnchor( { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom } );

	};

	const closeSub = () => {

		setSubAnchor( null );

	};

	const onClick = ( event: MouseEvent ) => {

		if ( ! isBranch ) {

			if ( item.onClick ) item.onClick( event );

			return;

		}

		// 親の枝まで伝わると開いた先が畳まれてしまうので止める
		event.stopPropagation();

		if ( subAnchor ) {

			closeSub();

		} else {

			openSub();

		}

	};

	let onPointerEnter = undefined;
	let onPointerLeave = undefined;

	if ( isBranch && canHover() ) {

		onPointerEnter = openSub;
		onPointerLeave = closeSub;

	}

	let subElm = null;

	if ( isBranch && subAnchor ) {

		// サブメニューはこの項目の子要素にしておく。fixed でも DOM 上は子なので、
		// ポインタがサブメニューへ移っても pointerleave にならない
		subElm = <MenuBox anchor={subAnchor} items={item.children} />;

	}

	return <div ref={nodeRef} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onClick={onClick}>
		<ListItem className={style.item}>
			<span className={style.item_label}>{item.label}</span>
			{isBranch && <span className={style.item_arrow}>›</span>}
		</ListItem>
		{subElm}
	</div>;

};

// 項目を縦に並べた箱。anchor を渡すとサブメニューとしてその右側に浮く
const MenuBox = ( props: { title?: string, items: MenuItem[], anchor?: AnchorRect } ) => {

	const anchored = useAnchoredPosition( props.anchor );

	const nodeElms: ReactNode[] = [];

	for ( let i = 0; i < props.items.length; i ++ ) {

		nodeElms.push( <MenuNode key={i} item={props.items[ i ]} /> );

	}

	return <div ref={anchored.ref} className={style.menu} style={anchored.style}>
		{props.title && <div className={style.title}>{props.title}</div>}
		<div className={style.list}>{nodeElms}</div>
	</div>;

};

// 階層メニュー。Popover に open して使う
export const Menu = ( props: MenuProps ) => {

	return <MenuBox title={props.title} items={props.items} />;

};
