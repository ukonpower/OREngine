import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useContext, useState } from 'react';

import style from './index.module.scss';

import { EditorContext } from '~/ts/components/gl/useEditor';
import { ArrowIcon } from '~/ts/components/ui/icon/ArrowIcon';

type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { glEditor, active: selected } = useContext( EditorContext );

	const depth = props.depth || 0;
	const childs = props.entity.children;
	const hasChild = childs.length > 0;
	const offsetPx = depth * 20;

	// click fold controls

	const [ open, setOpen ] = useState<boolean>( true );

	const onClickFoldControls = useCallback( ( e: MouseEvent ) => {

		setOpen( ! open );
		e.stopPropagation();

	}, [ open ] );

	// click node

	const onClickNode = useCallback( () => {

		if ( ! glEditor ) return;

		glEditor.selectEntity( props.entity );

	}, [ glEditor, props.entity ] );

	return <div className={style.node} >
		<div className={style.self} style={{ paddingLeft: offsetPx }} onClick={onClickNode} data-selected={selected && selected.uuid == props.entity.uuid}>
			<div className={style.fold} data-hnode_open={open}>
				{hasChild && <button className={style.fold_button} onClick={onClickFoldControls} ><ArrowIcon open={open}/></button> }
			</div>
			<div className={style.self_name}>
				<p>{props.entity.name || "<noname>"}</p>
			</div>
		</div>
		{hasChild && <div className={style.child} data-open={open} >
			{
				childs.map( item => {

					return <HierarchyNode key={item.uuid} entity={item} depth={depth + 1} />;

				} )
			}
			<div className={style.child_line} style={{ marginLeft: offsetPx + 4 }}></div>
		</div>}
	</div>;

};
