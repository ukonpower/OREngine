import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { useOREditor } from '../../../../hooks/useOREditor';
import { useSerializableField } from '../../../../hooks/useSerializableProps';
import { ArrowIcon } from '../../../Icons/ArrowIcon';
import { CameraIcon } from '../../../Icons/CameraIcon';
import { LightIcon } from '../../../Icons/LightIcon';
import { MeshIcon } from '../../../Icons/MeshIcon';
import { InputGroup } from '../../../InputGroup';
import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { Picker } from '../../../Picker';

import style from './index.module.scss';


type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { editor, engine } = useOREditor();
	const [ selectedEntityId ] = useSerializableField<string>( editor, "selectedEntityId" );
	const selectedEntity = selectedEntityId !== undefined && engine.findEntityByUUID( selectedEntityId );

	const [ childrenIdList ] = useSerializableField<string[]>( props.entity, "children" );

	const childrens = ( childrenIdList || [] ).map( id => engine.findEntityByUUID( id ) ).filter( e => e !== undefined ) as MXP.Entity[];

	const depth = props.depth || 0;
	const sortedChildren = childrens && childrens.concat().sort( ( a, b ) => a.name.localeCompare( b.name ) ) || [];
	const hasChild = sortedChildren.length > 0;
	const offsetPx = depth * 20;

	const noEditable = props.entity.initiator == "script";

	// component icon

	const icon = useMemo( () => {

		const iconSize = 14;

		if ( props.entity.getComponent( MXP.Light ) ) return <LightIcon size={iconSize} />;
		if ( props.entity.getComponent( MXP.Camera ) ) return <CameraIcon size={iconSize} />;
		if ( props.entity.getComponent( MXP.Mesh ) ) return <MeshIcon size={iconSize} />;

		return null;

	}, [ props.entity ] );

	// click fold controls

	const [ open, setOpen ] = useState<boolean>( true );

	const onClickFoldControls = useCallback( ( e: MouseEvent ) => {

		setOpen( ! open );
		e.stopPropagation();

	}, [ open ] );

	// click node

	const onClickNode = useCallback( () => {

		if ( ! editor ) return;

		editor.selectEntity( props.entity );

	}, [ editor, props.entity ] );

       // right click node

       const { pushContent, closeAll } = useMouseMenu();

	const onRightClickNode = useCallback( ( e: MouseEvent ) => {

		e.preventDefault();

		if ( ! editor || ! pushContent || ! closeAll || noEditable ) return;

		editor.selectEntity( props.entity );

		pushContent( <Picker label={props.entity.name} list={[
			{
				label: "Add Entity",
				onClick: () => {

					pushContent(
						<InputGroup initialValues={{ name: '' }} onSubmit={( e ) => {

							const newEntity = editor.api.createEntity( props.entity, e.name as string );

							editor.api.selectEntity( newEntity );

							closeAll();

						}}>
						</InputGroup>
					);

				},
			},
			{
				label: "Delete Entity",
				onClick: () => {

					editor.api.deleteEntity( props.entity );

					closeAll();

				},
			}
		]}></Picker> );

	}, [ editor, props.entity, pushContent, closeAll, noEditable ] );

	return <div className={style.node} data-no_export={noEditable}>
		<div className={style.self} style={{ paddingLeft: offsetPx }} onClick={onClickNode} onContextMenu={onRightClickNode} data-selected={selectedEntity && selectedEntity.uuid == props.entity.uuid}>
			<div className={style.fold} data-hnode_open={open}>
				{hasChild && <button className={style.fold_button} onClick={onClickFoldControls} ><ArrowIcon open={open}/></button> }
			</div>
			{icon && <div className={style.icon}>{icon}</div>}
			<div className={style.self_name}>
				<p>{props.entity.name || "-"}</p>
			</div>
			{! noEditable && <button className={style.menu} onClick={onRightClickNode}>⋯</button>}
		</div>
		{hasChild && <div className={style.child} data-open={open} >
			{
				sortedChildren.map( item => {

					return <HierarchyNode key={item.uuid} entity={item} depth={depth + 1} />;

				} )
			}
			<div className={style.child_line} style={{ marginLeft: offsetPx + 4 }}></div>
		</div>}
	</div>;

};
