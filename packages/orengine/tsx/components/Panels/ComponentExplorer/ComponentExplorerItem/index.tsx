
import { ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';
import { MouseEvent, useCallback } from 'react';

import { useMouseMenu } from '../../../../hooks/useMouseMenu';
import { Picker } from '../../../Picker';

import style from './index.module.scss';

type ComponentExplorerItemProps = {
	item: ResouceComponentItem;
	isBuiltin: boolean;
	selected: boolean;
	onSelect: ( item: ResouceComponentItem ) => void;
	componentPath?: string;
};

export const ComponentExplorerItem = ( { item, isBuiltin, selected, onSelect, componentPath }: ComponentExplorerItemProps ) => {

	const { pushContent, closeAll } = useMouseMenu();

	const onClick = useCallback( () => {

		onSelect( item );

	}, [ item, onSelect ] );

	const onContextMenu = useCallback( ( e: MouseEvent ) => {

		e.preventDefault();

		if ( isBuiltin || ! pushContent || ! closeAll || ! componentPath ) return;

		pushContent( <Picker label={item.name} list={[
			{
				label: "Open in Editor",
				onClick: () => {

					fetch( `/api/components/${encodeURIComponent( componentPath )}/filepath` )
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

					if ( ! confirm( `Delete component "${item.name}"?` ) ) {

						closeAll();
						return;

					}

					fetch( `/api/components/${encodeURIComponent( componentPath )}`, { method: 'DELETE' } )
						.then( () => closeAll() );

				},
			},
		]} /> );

	}, [ isBuiltin, item, componentPath, pushContent, closeAll ] );

	return <div className={style.item} data-selected={selected} onClick={onClick} onContextMenu={onContextMenu}>
		<span className={style.name}>{item.name}</span>
		{! isBuiltin && componentPath && <button className={style.menu} onClick={onContextMenu}>⋯</button>}
	</div>;

};
