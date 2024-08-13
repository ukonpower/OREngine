import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useContext, useRef, useState } from 'react';

import { MouseMenuContext } from '../../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { EditorContext } from '~/ts/components/gl/useEditor';
import { ArrowIcon } from '~/ts/components/ui/icon/ArrowIcon';
import { InputGroup } from '~/ts/components/ui/InputGroup';
import { Picker } from '~/ts/components/ui/Picker';

type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { glEditor, active: selected } = useContext( EditorContext );

	const depth = props.depth || 0;
	const childs = props.entity.children.concat().sort( ( a, b ) => a.name.localeCompare( b.name ) );
	const hasChild = childs.length > 0;
	const offsetPx = depth * 20;
	const noEditable = props.entity.initiator == "script";

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

	// right click node

	const { pushContent, closeAll } = useContext( MouseMenuContext );

	const onRightClickNode = useCallback( ( e: MouseEvent ) => {

		e.preventDefault();

		if ( ! glEditor || ! pushContent || ! closeAll || noEditable ) return;

		glEditor.selectEntity( props.entity );

		pushContent( <Picker label={props.entity.name} list={[
			{
				label: "Add Entity",
				onClick: () => {

					pushContent(
						<InputGroup initialValues={{ name: '' }} onSubmit={( e ) => {

							const newEntity = glEditor.createEntity( props.entity, e.name as string );

							glEditor.selectEntity( newEntity );

							closeAll();

						}}>
						</InputGroup>
					);

				},
			},
			{
				label: "Delete Entity",
				onClick: () => {

					glEditor.deleteEntity( props.entity );

					closeAll();

				},
			}
		]}></Picker> );

	}, [ glEditor, props.entity, pushContent, closeAll, noEditable ] );

	return <div className={style.node} data-no_export={noEditable}>
		<div className={style.self} style={{ paddingLeft: offsetPx }} onClick={onClickNode} onContextMenu={onRightClickNode} data-selected={selected && selected.uuid == props.entity.uuid}>
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
