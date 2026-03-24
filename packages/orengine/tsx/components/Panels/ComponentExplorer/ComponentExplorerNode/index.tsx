
import { ComponentGroup, ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';
import { MouseEvent, useCallback, useState } from 'react';

import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { useOREditor } from '../../../../hooks/useOREditor';
import { ArrowIcon } from '../../../Icons/ArrowIcon';
import { Picker } from '../../../Picker';

import style from './index.module.scss';

type ComponentExplorerNodeProps = {
	node: ComponentGroup | ResouceComponentItem;
	depth?: number;
	isBuiltin: boolean;
	selectedItem: ResouceComponentItem | null;
	onSelect: ( item: ResouceComponentItem, path?: string ) => void;
	parentPath?: string;
};

export const ComponentExplorerNode = ( { node, depth = 0, isBuiltin, selectedItem, onSelect, parentPath }: ComponentExplorerNodeProps ) => {

	const isGroup = 'child' in node;
	const [ open, setOpen ] = useState<boolean>( ! isBuiltin );
	const { pushContent, closeAll } = useMouseMenu();
	const { projectName } = useOREditor();
	const nodePath = parentPath ? `${parentPath}/${node.name}` : node.name;
	const offsetPx = depth * 20;

	const onClickFold = useCallback( ( e: MouseEvent ) => {

		setOpen( ! open );
		e.stopPropagation();

	}, [ open ] );

	const onClick = useCallback( () => {

		if ( ! isGroup ) {

			const componentPath = isBuiltin ? undefined : nodePath;
			onSelect( node as ResouceComponentItem, componentPath );

		} else {

			setOpen( ! open );

		}

	}, [ isGroup, node, isBuiltin, nodePath, onSelect, open ] );

	const onContextMenu = useCallback( ( e: MouseEvent ) => {

		e.preventDefault();

		if ( isGroup || isBuiltin || ! pushContent || ! closeAll ) return;

		const componentPath = nodePath;

		pushContent( <Picker label={node.name} list={[
			{
				label: "Open in Editor",
				onClick: () => {

					fetch( `/api/projects/${projectName}/components/${encodeURIComponent( componentPath )}/filepath` )
						.then( r => r.json() )
						.then( data => {

							if ( data.absolutePath ) {

								window.open( `vscode://file/${data.absolutePath}`, '_blank' );

							}

						} );

					closeAll();

				},
			},
			{
				label: "Delete",
				onClick: () => {

					if ( ! confirm( `Delete component "${node.name}"?` ) ) {

						closeAll();
						return;

					}

					fetch( `/api/projects/${projectName}/components/${encodeURIComponent( componentPath )}`, { method: 'DELETE' } )
						.then( () => closeAll() );

				},
			},
		]} /> );

	}, [ isGroup, isBuiltin, node, nodePath, pushContent, closeAll, projectName ] );

	const isSelected = ! isGroup && selectedItem === node;
	const hasChild = isGroup && ( node as ComponentGroup ).child.length > 0;
	const displayName = isBuiltin && node.name.startsWith( '_' ) ? node.name.replace( /^_/, '' ) : node.name;

	return <div className={style.node} data-builtin={isBuiltin}>
		<div className={style.row} style={{ paddingLeft: offsetPx }} onClick={onClick} onContextMenu={onContextMenu} data-selected={isSelected}>
			<div className={style.fold}>
				{hasChild && <button className={style.fold_button} onClick={onClickFold}><ArrowIcon open={open} /></button>}
			</div>
			<div className={style.name}>
				{displayName}
			</div>
			{! isGroup && ! isBuiltin && <button className={style.menu} onClick={onContextMenu}>⋯</button>}
		</div>
		{isGroup && hasChild && <div className={style.child} data-open={open}>
			{( node as ComponentGroup ).child.map( ( child, i ) => (

				<ComponentExplorerNode
					key={i}
					node={child}
					depth={depth + 1}
					isBuiltin={isBuiltin}
					selectedItem={selectedItem}
					onSelect={onSelect}
					parentPath={nodePath}
				/>

			) )}
		</div>}
	</div>;

};
