import { useEffect, useRef, useState } from 'react';

import { useAnchoredPosition } from '../hooks/useAnchoredPosition';
import { ListItem } from '../ListItem';

import style from './index.module.scss';

import type { AnchorRect } from '../hooks/useAnchoredPosition';
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';

// クリックで確定する葉。検索欄の Enter でも確定するので、マウスのイベントは渡さない
export type MenuLeaf = {
	label: string;
	onClick?: () => void;
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

			if ( item.onClick ) item.onClick();

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

// 項目を縦に並べた箱。anchor を渡すとサブメニューとしてその右側に浮く。header はタイトルと項目の間に置く
const MenuBox = ( props: { title?: string, header?: ReactNode, items: MenuItem[], anchor?: AnchorRect } ) => {

	const anchored = useAnchoredPosition( props.anchor );

	const nodeElms: ReactNode[] = [];

	for ( let i = 0; i < props.items.length; i ++ ) {

		nodeElms.push( <MenuNode key={i} item={props.items[ i ]} /> );

	}

	return <div ref={anchored.ref} className={style.menu} style={anchored.style}>
		{props.title && <div className={style.title}>{props.title}</div>}
		{props.header}
		<div className={style.list}>{nodeElms}</div>
	</div>;

};

// 検索語を名前に含む葉を階層を無視して集める。どこにある項目か分かるよう、表示名の前に親の枝の名前を付ける
const searchLeaves = ( items: MenuItem[], query: string, parents: string[], hits: MenuLeaf[] ) => {

	for ( const item of items ) {

		if ( "children" in item ) {

			searchLeaves( item.children, query, [ ...parents, item.label ], hits );

		} else if ( item.label.toLowerCase().includes( query ) ) {

			hits.push( { label: [ ...parents, item.label ].join( " ▸ " ), onClick: item.onClick } );

		}

	}

	return hits;

};

// 階層メニュー。Popover に open して使う。
// 先頭の検索欄は開いた時点でフォーカスするので、そのままタイプして絞り込み、Enter で先頭の項目を確定できる（Blender と同じ）
export const Menu = ( props: MenuProps ) => {

	const [ query, setQuery ] = useState( '' );
	const inputRef = useRef<HTMLInputElement>( null );

	useEffect( () => {

		// Popover は開いた直後に位置を合わせるので、フォーカスでスクロールさせない
		inputRef.current?.focus( { preventScroll: true } );

	}, [] );

	const normalizedQuery = query.trim().toLowerCase();

	let items = props.items;

	if ( normalizedQuery !== '' ) {

		items = searchLeaves( props.items, normalizedQuery, [], [] );

	}

	const onKeyDown = ( e: KeyboardEvent<HTMLInputElement> ) => {

		if ( e.key !== 'Enter' || e.nativeEvent.isComposing ) return;

		if ( normalizedQuery === '' ) return;

		const first = items[ 0 ];

		if ( first && ! ( "children" in first ) && first.onClick ) first.onClick();

	};

	const search = <input
		ref={inputRef}
		className={style.search}
		type="text"
		placeholder="Search"
		size={1}
		value={query}
		onChange={( e ) => setQuery( e.target.value )}
		onKeyDown={onKeyDown}
	/>;

	return <MenuBox title={props.title} header={search} items={items} />;

};
