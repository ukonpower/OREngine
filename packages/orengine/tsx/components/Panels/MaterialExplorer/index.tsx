
import { ResourceMaterialItem } from 'packages/orengine/ts/Engine/Resources';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../ts/Engine';
import { useMouseMenu } from '../../../hooks/useMouseMenu';
import { Block } from '../../Block';
import { Button } from '../../Button';
import { Picker } from '../../Picker';

import { MaterialCreateForm } from './MaterialCreateForm';
import style from './index.module.scss';

export const MaterialExplorer = () => {

	const [ selected, setSelected ] = useState<ResourceMaterialItem | null>( null );
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

	const onContextMenu = useCallback( ( e: MouseEvent, item: ResourceMaterialItem ) => {

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

					fetch( `/api/materials/${encodeURIComponent( item.name )}`, { method: 'DELETE' } )
						.then( () => {

							if ( selected === item ) setSelected( null );

							closeAll();

						} );

				},
			},
		]} /> );

	}, [ pushContent, closeAll, selected ] );

	return <div className={style.explorer}>
		<MaterialCreateForm />
		{materials.map( ( m, i ) => (

			<div
				key={i}
				className={style.item}
				data-selected={selected === m}
				onClick={() => setSelected( m )}
				onContextMenu={( e ) => onContextMenu( e, m )}
			>
				<div className={style.item_name}>{m.name}</div>
				{m.vert && <span className={style.item_shader}>shader</span>}
				<button className={style.item_menu} onClick={( e ) => onContextMenu( e, m )}>⋯</button>
			</div>

		) )}
		{selected && <div className={style.detail}>
			<Block label={`Selected: ${selected.name}`} accordion>
				{Object.entries( selected ).filter( ( [ k ] ) => k !== 'name' ).map( ( [ key, value ] ) => (

					<div key={key} className={style.detailRow}>
						{key}: {typeof value === 'object' ? JSON.stringify( value ) : String( value )}
					</div>

				) )}
				<div className={style.actions}>
					<Button onClick={() => {

						fetch( `/api/materials/${encodeURIComponent( selected.name )}/filepath` )
							.then( r => r.json() )
							.then( data => {

								if ( data.absolutePath ) {

									window.open( `vscode://file/${data.absolutePath}`, '_blank' );

								}

							} );

					}}>Open in Editor</Button>
				</div>
			</Block>
		</div>}
	</div>;

};
