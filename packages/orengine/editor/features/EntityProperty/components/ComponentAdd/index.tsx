
import * as MXP from 'maxpower';
import { ComponentGroup, Engine, ResouceComponentItem } from 'orengine';
import React, { MouseEvent, ReactNode, useCallback, useState } from 'react';

import { Button } from '../../../../components/primitives/Button';
import { useMouseMenu } from '../../../MouseMenu/hooks/useMouseMenu';
import { useMouseMenuItem } from '../../../MouseMenu/hooks/useMouseMenuItem';
import { useOREditor } from '../../../OREditor/hooks/useOREditor';

import style from './index.module.scss';


type ComponentAddProps= {
	entity: MXP.Entity
}

const ComponentDirectory: React.FC<{
	group: ComponentGroup | ResouceComponentItem;
	onClickAdd: ( compItem: ResouceComponentItem ) => void;
}> = ( { group, onClickAdd } ) => {

	const menuContext = useMouseMenuItem();

	const [ v, setV ] = useState( false );

	let childItem = null;
	let onClick = undefined;
	let type = "dir";

	const displayName = group.name.startsWith( "_" ) ? group.name.slice( 1 ) : group.name;

	if ( "child" in group ) {

		childItem = <>
			{group.child.map( ( item, index ) => {

				return <ComponentDirectory key={index} group={item} onClickAdd={onClickAdd} />;

			} )}
		</>;

	} else {

	       onClick = () => onClickAdd( group );
	       type = "item";

	}

	const canHover = window.matchMedia( "(hover: hover)" ).matches;

	return <div className={style.directory}
		onPointerEnter={canHover ? () => setV( true ) : undefined}
		onPointerLeave={canHover ? () => setV( false ) : undefined}
		onClick={( e ) => {

			if ( onClick ) {

				onClick();

			} else {

				e.stopPropagation();
				setV( ! v );

			}

		}}
		data-type={type}
		data-direction={menuContext?.direction}
	>

		{displayName}
		{v && <div className={style.subDirectory}>
			{childItem}
		</div>}
	</div>;


};

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { editor } = useOREditor();
	const { pushContent, closeAll } = useMouseMenu();
	const resources = Engine.resources;

	const onClickAdd = useCallback( ( _e: MouseEvent ) => {

		if ( ! resources || ! pushContent || ! closeAll ) return;

		const cagegoryGroupList: ReactNode[] = [];

		const onClickComponentItem = ( compItem: ResouceComponentItem ) => {

			editor.api.addComponent( props.entity, compItem.component );

			closeAll();

		};

		resources.componentGroups.forEach( ( group, index ) => {

			cagegoryGroupList.push(
				<ComponentDirectory key={index} group={group} onClickAdd={onClickComponentItem} />
			);

		} );

		pushContent(

			<div className={style.picker}>
				{cagegoryGroupList}
			</div>

		);

	}, [ pushContent, resources, props.entity, closeAll, editor ] );

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
