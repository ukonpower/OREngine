
import { ResourceTextureItem } from 'packages/orengine/ts/Engine/Resources';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../ts/Engine';
import { useMouseMenu } from '../../../hooks/useMouseMenu';
import { Picker } from '../../Picker';

import { TextureCreateForm } from './TextureCreateForm';
import { TextureDetail } from './TextureDetail';
import style from './index.module.scss';

export const TextureExplorer = () => {

	const [ selected, setSelected ] = useState<ResourceTextureItem | null>( null );
	const [ , setUpdateCount ] = useState( 0 );
	const { pushContent, closeAll } = useMouseMenu();

	useEffect( () => {

		const onUpdate = () => setUpdateCount( c => c + 1 );

		Engine.resources.on( "update", onUpdate );

		return () => {

			Engine.resources.off( "update", onUpdate );

		};

	}, [] );

	const textures = Engine.resources.textureList;

	const onContextMenu = useCallback( ( e: MouseEvent, item: ResourceTextureItem ) => {

		e.preventDefault();

		if ( ! pushContent || ! closeAll ) return;

		pushContent( <Picker label={item.name} list={[
			{
				label: "Open in Editor",
				onClick: () => {

					fetch( `/api/textures/${encodeURIComponent( item.name )}/filepath` )
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

					if ( ! confirm( `Delete texture "${item.name}"?` ) ) {

						closeAll();
						return;

					}

					Engine.resources.removeTextureResource( item.name );

					if ( selected === item ) setSelected( null );

					closeAll();

				},
			},
		]} /> );

	}, [ pushContent, closeAll, selected ] );

	return <div className={style.explorer}>
		<TextureCreateForm />
		{textures.map( ( t, i ) => (

			<div
				key={i}
				className={style.item}
				data-selected={selected === t}
				onClick={() => setSelected( t )}
				onContextMenu={( e ) => onContextMenu( e, t )}
			>
				<div className={style.item_name}>{t.name}</div>
				{t.resolution && <span className={style.item_res}>{t.resolution[ 0 ]}x{t.resolution[ 1 ]}</span>}
				<button className={style.item_menu} onClick={( e ) => onContextMenu( e, t )}>⋯</button>
			</div>

		) )}
		{selected && <div className={style.detail}>
			<TextureDetail name={selected.name} />
		</div>}
	</div>;

};
