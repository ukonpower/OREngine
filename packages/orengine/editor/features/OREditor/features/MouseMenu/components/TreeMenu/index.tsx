import { useState } from 'react';

import { useMouseMenuItem } from '../../hooks/useMouseMenuItem';

import style from './index.module.scss';

import type { ReactNode } from 'react';

// サブメニューを開く枝
export type TreeMenuBranch = {
	label: string;
	children: TreeMenuItem[];
};

// クリックで確定する葉
export type TreeMenuLeaf = {
	label: string;
	onClick: () => void;
};

export type TreeMenuItem = TreeMenuBranch | TreeMenuLeaf;

// 木の1項目。枝はサブメニューを開き、葉はクリックで onClick を呼ぶ
const TreeMenuNode = ( props: { item: TreeMenuItem } ) => {

	const menuContext = useMouseMenuItem();

	const [ open, setOpen ] = useState( false );

	const item = props.item;

	let childNodes: ReactNode[] | null = null;
	let type = "item";

	if ( "children" in item ) {

		type = "dir";
		childNodes = [];

		for ( let i = 0; i < item.children.length; i ++ ) {

			childNodes.push( <TreeMenuNode key={i} item={item.children[ i ]} /> );

		}

	}

	const onClick = ( e: React.MouseEvent ) => {

		if ( "onClick" in item ) {

			item.onClick();

			return;

		}

		// 枝のクリックはサブメニューを開けない環境（hover なし）でのトグル。
		// 親の枝まで伝わると開いた先が畳まれてしまうので止める
		e.stopPropagation();
		setOpen( ! open );

	};

	// hover できる環境ではポインタの出入りで開閉する
	const canHover = window.matchMedia( "(hover: hover)" ).matches;

	let onPointerEnter = undefined;
	let onPointerLeave = undefined;

	if ( canHover ) {

		onPointerEnter = () => setOpen( true );
		onPointerLeave = () => setOpen( false );

	}

	return <div className={style.directory}
		onPointerEnter={onPointerEnter}
		onPointerLeave={onPointerLeave}
		onClick={onClick}
		data-type={type}
		data-direction={menuContext?.direction}
	>
		{item.label}
		{open && childNodes && <div className={style.subDirectory}>
			{childNodes}
		</div>}
	</div>;

};

type TreeMenuProps = {
	items: TreeMenuItem[];
};

// 階層メニュー。MouseMenu に pushContent して使う
export const TreeMenu = ( props: TreeMenuProps ) => {

	const nodes: ReactNode[] = [];

	for ( let i = 0; i < props.items.length; i ++ ) {

		nodes.push( <TreeMenuNode key={i} item={props.items[ i ]} /> );

	}

	return <div className={style.treeMenu}>
		{nodes}
	</div>;

};
