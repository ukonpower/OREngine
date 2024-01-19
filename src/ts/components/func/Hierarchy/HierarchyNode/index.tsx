import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useState } from 'react';

import style from './index.module.scss';

type HierarchyNodeProps = {
	entity: MXP.Entity
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const childs = props.entity.children;

	const [ open, setOpen ] = useState<boolean>( true );

	const onClick = useCallback( ( e: MouseEvent ) => {

		setOpen( ! open );

		e.stopPropagation();

	}, [ open ] );

	return <div className={style.node} onClick={onClick}>
		<div className={style.node_name}>{props.entity.name || "obj"}</div>
		<div className={style.child} data-open={open}>
			{
				childs.map( item => {

					return <HierarchyNode key={item.uuid} entity={item} />;

				} )
			}
		</div>
	</div>;

};
