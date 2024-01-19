import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useContext, useState } from 'react';

import style from './index.module.scss';

import { EditorContext } from '~/ts/gl/React/useEditor';

type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { gl, active: selected } = useContext( EditorContext );

	const depth = props.depth || 0;
	const childs = props.entity.children;
	const hasChild = childs.length > 0;
	const offsetPx = depth * 20;

	// click fold controls

	const [ openChilds, setOpenChild ] = useState<boolean>( true );

	const onClickFoldControls = useCallback( ( e: MouseEvent ) => {

		setOpenChild( ! openChilds );
		e.stopPropagation();

	}, [ openChilds ] );

	// click node

	const onClickNode = useCallback( () => {

		if ( ! gl ) return;

		gl.editor.select( props.entity );

	}, [ gl, props.entity ] );

	return <div className={style.node} >
		<div className={style.self} style={{ paddingLeft: offsetPx }} onClick={onClickNode} data-selected={selected && selected.uuid == props.entity.uuid}>
			<div className={style.fold} data-hnode_open={openChilds}>
				{hasChild && <button className={style.fold_button} onClick={onClickFoldControls} ><span /></button> }
			</div>
			<div className={style.self_name}>
				<p>{props.entity.name || "<noname>"}</p>
			</div>
		</div>
		{hasChild && <div className={style.child} data-open={openChilds} >
			{
				childs.map( item => {

					return <HierarchyNode key={item.uuid} entity={item} depth={depth + 1} />;

				} )
			}
			<div className={style.child_line} style={{ marginLeft: offsetPx + 4 }}></div>
		</div>}
	</div>;

};
