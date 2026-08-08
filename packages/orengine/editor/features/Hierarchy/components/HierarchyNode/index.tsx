import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useMemo } from 'react';

import { InputGroup } from '../../../../components/composites/InputGroup';
import { ArrowIcon } from '../../../../components/primitives/Icons/ArrowIcon';
import { CameraIcon } from '../../../../components/primitives/Icons/CameraIcon';
import { CursorIcon } from '../../../../components/primitives/Icons/CursorIcon';
import { EyeIcon } from '../../../../components/primitives/Icons/EyeIcon';
import { LightIcon } from '../../../../components/primitives/Icons/LightIcon';
import { MeshIcon } from '../../../../components/primitives/Icons/MeshIcon';
import { Picker } from '../../../MouseMenu/components/Picker';
import { useMouseMenu } from '../../../MouseMenu/hooks/useMouseMenu';
import { useOREditor } from '../../../OREditor/hooks/useOREditor';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';

import style from './index.module.scss';

type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
	openNodes: Set<string>;
	setNodeOpen: ( uuid: string, open: boolean ) => void;
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { editor, engine } = useOREditor();
	const [ selectedEntityId ] = useSerializableField<string>( editor, "selectedEntityId" );
	const selectedEntity = selectedEntityId !== undefined && engine.root.findEntityByUUID( selectedEntityId );

	const [ entityVisible, setEntityVisible ] = useSerializableField<boolean>( props.entity, "visible" );
	const [ unselectableIds, setUnselectableIds ] = useSerializableField<string[]>( editor, "unselectableEntityIds" );
	const [ childrenIdList ] = useSerializableField<string[]>( props.entity, "children" );

	const entitySelectable = ! ( unselectableIds || [] ).includes( props.entity.uuid );

	const childrens = ( childrenIdList || [] ).map( id => engine.root.findEntityByUUID( id ) ).filter( e => e !== undefined ) as MXP.Entity[];

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

	const open = props.openNodes.has( props.entity.uuid );

	const onClickFoldControls = useCallback( ( e: MouseEvent ) => {

		props.setNodeOpen( props.entity.uuid, ! open );

		e.stopPropagation();

	}, [ open, props ] );

	// click node

	const onClickNode = useCallback( () => {

		if ( ! editor ) return;

		editor.selectEntity( props.entity );

	}, [ editor, props.entity ] );

	// toggle visibility

	const onClickVisibility = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		if ( setEntityVisible ) {

			setEntityVisible( ! entityVisible );

		}

	}, [ entityVisible, setEntityVisible ] );

	// toggle selectable

	const onClickSelectable = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		const ids = new Set( unselectableIds || [] );

		if ( entitySelectable ) {

			ids.add( props.entity.uuid );

		} else {

			ids.delete( props.entity.uuid );

		}

		setUnselectableIds( Array.from( ids ) );

	}, [ entitySelectable, unselectableIds, setUnselectableIds, props.entity.uuid ] );

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
			<button className={style.selectable} onClick={onClickSelectable} data-selectable={entitySelectable}><CursorIcon size={14} selectable={entitySelectable} /></button>
			<button className={style.visibility} onClick={onClickVisibility} data-visible={entityVisible !== false}><EyeIcon size={14} visible={entityVisible !== false} /></button>
			{! noEditable && <button className={style.menu} onClick={onRightClickNode}>⋯</button>}
		</div>
		{hasChild && <div className={style.child} data-open={open} >
			{
				sortedChildren.map( item => {

					return <HierarchyNode key={item.uuid} entity={item} depth={depth + 1} openNodes={props.openNodes} setNodeOpen={props.setNodeOpen} />;

				} )
			}
			<div className={style.child_line} style={{ marginLeft: offsetPx + 4 }}></div>
		</div>}
	</div>;

};
