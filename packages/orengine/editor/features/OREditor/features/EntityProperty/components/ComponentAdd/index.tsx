import { MouseEvent, useCallback } from 'react';

import * as MXP from 'maxpower';
import { ComponentGroup, Engine, ResouceComponentItem } from 'orengine';
import { Button, Menu, pointAnchor, usePopover } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';

import style from './index.module.scss';

import type { MenuItem } from 'uipower';


type ComponentAddProps= {
	entity: MXP.Entity
}

// Resources のコンポーネント木を Menu の項目に詰め替える
const toMenuItem = ( group: ComponentGroup | ResouceComponentItem, onSelect: ( compItem: ResouceComponentItem ) => void ): MenuItem => {

	// "_Built-in" のような内部都合の接頭辞 "_" はメニューには出さない
	let label = group.name;

	if ( label.startsWith( "_" ) ) label = label.slice( 1 );

	if ( "child" in group ) {

		const children: MenuItem[] = [];

		for ( const child of group.child ) {

			children.push( toMenuItem( child, onSelect ) );

		}

		return { label, children };

	}

	return { label, onClick: () => onSelect( group ) };

};

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { editor } = useOREditor();
	const { open, closeAll } = usePopover();
	const resources = Engine.resources;

	const onClickAdd = useCallback( ( e: MouseEvent ) => {

		if ( ! resources ) return;

		const onSelect = ( compItem: ResouceComponentItem ) => {

			editor.api.addComponent( props.entity, compItem.component );

			closeAll();

		};

		const items: MenuItem[] = [];

		for ( const group of resources.componentGroups ) {

			items.push( toMenuItem( group, onSelect ) );

		}

		open( <Menu items={items} />, pointAnchor( e.clientX, e.clientY ) );

	}, [ open, resources, props.entity, closeAll, editor ] );

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
