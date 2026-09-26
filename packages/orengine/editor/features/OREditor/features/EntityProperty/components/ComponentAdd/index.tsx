import { MouseEvent } from 'react';

import * as MXP from 'maxpower';
import { ResouceComponentItem } from 'orengine';
import { Button, Menu, pointAnchor, usePopover } from 'uipower';

import { useComponentMenuItems } from '../../../../hooks/useComponentMenuItems';
import { useOREditor } from '../../../../hooks/useOREditor';

import style from './index.module.scss';


type ComponentAddProps= {
	entity: MXP.Entity
}

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { editor } = useOREditor();
	const { open, closeAll } = usePopover();

	const onSelect = ( compItem: ResouceComponentItem ) => {

		editor.api.addComponent( props.entity, compItem.component );

		closeAll();

	};

	const items = useComponentMenuItems( onSelect );

	const onClickAdd = ( e: MouseEvent ) => {

		open( <Menu items={items} />, pointAnchor( e.clientX, e.clientY ) );

	};

	return <div className={style.compAdd}>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
