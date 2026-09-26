import * as MXP from 'maxpower';
import { ComponentGroup, Engine, ResouceComponentItem } from 'orengine';

import type { MenuItem } from 'uipower';

// Resources のコンポーネント木を Menu の項目に詰め替える。exclude のクラスは項目に出さない
const toMenuItem = ( group: ComponentGroup | ResouceComponentItem, onSelect: ( compItem: ResouceComponentItem ) => void, exclude: ( typeof MXP.Component )[] ): MenuItem | null => {

	// "_Built-in" のような内部都合の接頭辞 "_" はメニューには出さない
	let label = group.name;

	if ( label.startsWith( "_" ) ) label = label.slice( 1 );

	if ( "child" in group ) {

		const children: MenuItem[] = [];

		for ( const child of group.child ) {

			const item = toMenuItem( child, onSelect, exclude );

			if ( item ) children.push( item );

		}

		return { label, children };

	}

	if ( exclude.includes( group.component ) ) return null;

	return { label, onClick: () => onSelect( group ) };

};

// 登録済みコンポーネントをグループ階層つきのメニュー項目にする。エンティティ追加メニューと Add Component で共有し、
// 違いはクリック時の onSelect だけ
export const useComponentMenuItems = ( onSelect: ( compItem: ResouceComponentItem ) => void, exclude: ( typeof MXP.Component )[] = [] ): MenuItem[] => {

	const items: MenuItem[] = [];

	for ( const group of Engine.resources.componentGroups ) {

		const item = toMenuItem( group, onSelect, exclude );

		if ( item ) items.push( item );

	}

	return items;

};
