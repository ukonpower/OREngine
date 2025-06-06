
import * as MXP from 'maxpower';
import { ComponentGroup, ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';
import React, { MouseEvent, ReactNode, useCallback, useState } from 'react';

import { Engine } from '../../../../../ts/Engine';
import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { useMouseMenuItem } from '../../../../hooks/useMouseMenuItem';
import { Button } from '../../../Button';
import { MouseMenuItemContext } from '../../../MouseMenu/Context/MouseMenuItemContext';


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

	if ( group.name.startsWith( "_" ) ) return null;

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

	return <div className={style.directory}
		onPointerEnter={()=> setV( true )}
		onPointerLeave={() => setV( false )}
		onClick={onClick}
		data-type={type}
		data-direction={menuContext?.direction}
	>

		{group.name}
		{v && <div className={style.subDirectory}>
			{childItem}
		</div>}
	</div>;


};

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { pushContent, closeAll } = useMouseMenu();
	const resources = Engine.resources;

	const onClickAdd = useCallback( ( e: MouseEvent ) => {

		if ( ! resources || ! pushContent || ! closeAll ) return;

		const cagegoryGroupList: ReactNode[] = [];

		const onClickComponentItem = ( compItem: ResouceComponentItem ) => {

			props.entity.addComponent( compItem.component ).initiator = 'user';

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

	}, [ pushContent, resources, props.entity, closeAll ] );

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
