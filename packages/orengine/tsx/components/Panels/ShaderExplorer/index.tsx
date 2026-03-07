
import { ShaderResource } from 'packages/orengine/ts/Engine/Resources';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../ts/Engine';
import { useMouseMenu } from '../../../hooks/useMouseMenu';
import { Picker } from '../../Picker';

import { ShaderCreateForm } from './ShaderCreateForm';
import style from './index.module.scss';

export const ShaderExplorer = () => {

	const [ , setUpdateCount ] = useState( 0 );
	const { pushContent, closeAll } = useMouseMenu();

	useEffect( () => {

		const onUpdate = () => setUpdateCount( c => c + 1 );

		Engine.resources.on( "update", onUpdate );

		return () => {

			Engine.resources.off( "update", onUpdate );

		};

	}, [] );

	const shaders = Engine.resources.shaderList;

	const onContextMenu = useCallback( ( e: MouseEvent, item: ShaderResource ) => {

		e.preventDefault();

		if ( ! pushContent || ! closeAll ) return;

		pushContent( <Picker label={item.name} list={[
			{
				label: "Open in Editor",
				onClick: () => {

					fetch( `/api/shaders/${encodeURIComponent( item.name )}/filepath` )
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

					if ( ! confirm( `Delete shader "${item.name}"?` ) ) {

						closeAll();
						return;

					}

					fetch( `/api/shaders/${encodeURIComponent( item.name )}`, { method: 'DELETE' } )
						.then( () => closeAll() );

				},
			},
		]} /> );

	}, [ pushContent, closeAll ] );

	return <div className={style.explorer}>
		<ShaderCreateForm />
		{shaders.map( ( s, i ) => (

			<div
				key={i}
				className={style.item}
				onContextMenu={( e ) => onContextMenu( e, s )}
			>
				<div className={style.item_name}>{s.name}</div>
				<span className={style.item_tags}>
					{s.name.endsWith( "/vert" ) && <span>VS</span>}
					{s.name.endsWith( "/frag" ) && <span>FS</span>}
				</span>
				<button className={style.item_menu} onClick={( e ) => onContextMenu( e, s )}>⋯</button>
			</div>

		) )}
	</div>;

};
