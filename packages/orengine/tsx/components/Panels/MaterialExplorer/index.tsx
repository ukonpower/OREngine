
import { MaterialResource } from 'packages/orengine/ts/Engine/Resources/MaterialResource';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../ts/Engine';
import { useMouseMenu } from '../../../hooks/useMouseMenu';
import { Picker } from '../../Picker';

import { MaterialCreateForm } from './MaterialCreateForm';
import { MaterialDetail } from './MaterialDetail';
import style from './index.module.scss';

export const MaterialExplorer = () => {

	const [ selected, setSelected ] = useState<MaterialResource | null>( null );
	const [ , setUpdateCount ] = useState( 0 );
	const { pushContent, closeAll } = useMouseMenu();

	useEffect( () => {

		const onUpdate = () => setUpdateCount( c => c + 1 );

		Engine.resources.on( "update", onUpdate );

		return () => {

			Engine.resources.off( "update", onUpdate );

		};

	}, [] );

	const materials = Engine.resources.materialList;

	const onContextMenu = useCallback( ( e: MouseEvent, item: MaterialResource ) => {

		e.preventDefault();

		if ( ! pushContent || ! closeAll ) return;

		pushContent( <Picker label={item.name} list={[
			{
				label: "Open in Editor",
				onClick: () => {

					fetch( `/api/materials/${encodeURIComponent( item.name )}/filepath` )
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

					if ( ! confirm( `Delete material "${item.name}"?` ) ) {

						closeAll();
						return;

					}

					Engine.resources.removeMaterial( item.name );

					if ( selected === item ) setSelected( null );

					closeAll();

				},
			},
		]} /> );

	}, [ pushContent, closeAll, selected ] );

	return <div className={style.explorer}>
		<MaterialCreateForm />
		{materials.map( ( m ) => (

			<div
				key={m.uuid}
				className={style.item}
				data-selected={selected === m}
				onClick={() => setSelected( m )}
				onContextMenu={( e ) => onContextMenu( e, m )}
			>
				<div className={style.item_name}>{m.name}</div>
				<button className={style.item_menu} onClick={( e ) => onContextMenu( e, m )}>⋯</button>
			</div>

		) )}
		{selected && <div className={style.detail}>
			<MaterialDetail resource={selected} />
		</div>}
	</div>;

};
