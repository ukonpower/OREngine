import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useContext, useState } from 'react';

import { MouseMenuContext } from '../../MouseMenu/useMouseMenu';

import style from './index.module.scss';

import { ArrowIcon } from '~/tsx/Icon/ArrowIcon';
import { InputGroup } from '~/tsx/ui/InputGroup';
import { Picker } from '~/tsx/ui/Picker';
import { useSerializableField } from '~/tsx/hooks/useSerializableProps';
import { useOREngineGUI } from '~/tsx/components/OREngineGUI';

type HierarchyNodeProps = {
	depth?: number;
	entity: MXP.Entity
}

export const HierarchyNode = ( props: HierarchyNodeProps ) => {

	const { gui } = useOREngineGUI();

	const [ children ] = useSerializableField<MXP.Entity[]>( props.entity, "children" );
	
	const depth = props.depth || 0;
	const sortedChildren = children && children.concat().sort( ( a, b ) => a.name.localeCompare( b.name ) ) || [];
	const hasChild = sortedChildren.length > 0;
	const offsetPx = depth * 20;
	
	const [ selectedEntityId ] = useSerializableField<string>( gui, "selectedEntityId" );
	const selectedEntity = selectedEntityId !== undefined && gui.engine.findEntityById( selectedEntityId );

	const noEditable = props.entity.initiator == "script";

	// click fold controls

	const [ open, setOpen ] = useState<boolean>( true );

	const onClickFoldControls = useCallback( ( e: MouseEvent ) => {

		setOpen( ! open );
		e.stopPropagation();

	}, [ open ] );

	// click node

	const onClickNode = useCallback( () => {

		if ( ! gui ) return;

		gui.selectEntity( props.entity );

	}, [ gui, props.entity ] );

	// right click node

	const { pushContent, closeAll } = useContext( MouseMenuContext );

	const onRightClickNode = useCallback( ( e: MouseEvent ) => {

		e.preventDefault();

		if ( ! gui || ! pushContent || ! closeAll || noEditable ) return;

		gui.selectEntity( props.entity );

		pushContent( <Picker label={props.entity.name} list={[
			{
				label: "Add Entity",
				onClick: () => {

					pushContent(
						<InputGroup initialValues={{ name: '' }} onSubmit={( e ) => {

							const newEntity = gui.createEntity( props.entity, e.name as string );

							gui.selectEntity( newEntity );

							closeAll();

						}}>
						</InputGroup>
					);

				},
			},
			{
				label: "Delete Entity",
				onClick: () => {

					gui.deleteEntity( props.entity );

					closeAll();

				},
			}
		]}></Picker> );

	}, [ gui, props.entity, pushContent, closeAll, noEditable ] );

	return <div className={style.node} data-no_export={noEditable}>
		<div className={style.self} style={{ paddingLeft: offsetPx }} onClick={onClickNode} onContextMenu={onRightClickNode} data-selected={selectedEntity && selectedEntity.uuid == props.entity.uuid}>
			<div className={style.fold} data-hnode_open={open}>
				{hasChild && <button className={style.fold_button} onClick={onClickFoldControls} ><ArrowIcon open={open}/></button> }
			</div>
			<div className={style.self_name}>
				<p>{props.entity.name || "-"} <span>[{ props.entity.uuid }]</span></p>
			</div>
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
