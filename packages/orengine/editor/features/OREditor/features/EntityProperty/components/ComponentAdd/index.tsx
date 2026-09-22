import { MouseEvent, useCallback } from 'react';

import * as MXP from 'maxpower';
import { ComponentGroup, Engine, ResouceComponentItem } from 'orengine';
import { Button } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';
import { TreeMenu } from '../../../MouseMenu/components/TreeMenu';
import { useMouseMenu } from '../../../MouseMenu/hooks/useMouseMenu';

import style from './index.module.scss';

import type { TreeMenuItem } from '../../../MouseMenu/components/TreeMenu';


type ComponentAddProps= {
	entity: MXP.Entity
}

// Resources のコンポーネント木を TreeMenu の項目に詰め替える
const toMenuItem = ( group: ComponentGroup | ResouceComponentItem, onSelect: ( compItem: ResouceComponentItem ) => void ): TreeMenuItem => {

	// "_Built-in" のような内部都合の接頭辞 "_" はメニューには出さない
	let label = group.name;

	if ( label.startsWith( "_" ) ) label = label.slice( 1 );

	if ( "child" in group ) {

		const children: TreeMenuItem[] = [];

		for ( const child of group.child ) {

			children.push( toMenuItem( child, onSelect ) );

		}

		return { label, children };

	}

	return { label, onClick: () => onSelect( group ) };

};

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { editor } = useOREditor();
	const { pushContent, closeAll } = useMouseMenu();
	const resources = Engine.resources;

	const onClickAdd = useCallback( ( _e: MouseEvent ) => {

		if ( ! resources ) return;

		const onSelect = ( compItem: ResouceComponentItem ) => {

			editor.api.addComponent( props.entity, compItem.component );

			closeAll();

		};

		const items: TreeMenuItem[] = [];

		for ( const group of resources.componentGroups ) {

			items.push( toMenuItem( group, onSelect ) );

		}

		pushContent( <TreeMenu items={items} /> );

	}, [ pushContent, resources, props.entity, closeAll, editor ] );

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
