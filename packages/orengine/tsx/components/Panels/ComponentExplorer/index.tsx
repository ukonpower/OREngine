
import { ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';
import { useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../ts/Engine';
import { Block } from '../../Block';

import { ComponentCreateForm } from './ComponentCreateForm';
import { ComponentDetail } from './ComponentDetail';
import { ComponentExplorerGroup } from './ComponentExplorerGroup';
import style from './index.module.scss';

export const ComponentExplorer = () => {

	const [ selectedItem, setSelectedItem ] = useState<ResouceComponentItem | null>( null );
	const [ selectedPath, setSelectedPath ] = useState<string | undefined>( undefined );
	const [ , setUpdateCount ] = useState( 0 );

	useEffect( () => {

		const onUpdate = () => setUpdateCount( c => c + 1 );

		Engine.resources.on( "update", onUpdate );

		return () => {

			Engine.resources.off( "update", onUpdate );

		};

	}, [] );

	const onSelect = useCallback( ( item: ResouceComponentItem, path?: string ) => {

		setSelectedItem( item );
		setSelectedPath( path );

	}, [] );

	const groups = Engine.resources.componentGroups;
	const builtinGroups = groups.filter( g => g.name.startsWith( "_" ) );
	const customGroups = groups.filter( g => ! g.name.startsWith( "_" ) );

	return <div className={style.explorer}>
		<ComponentCreateForm />
		{builtinGroups.length > 0 && <Block label="Built-in" accordion defaultClose>
			{builtinGroups.map( ( g, i ) => (

				<ComponentExplorerGroup
					key={i}
					group={g}
					displayName={g.name.replace( /^_/, '' )}
					isBuiltin={true}
					onSelect={onSelect}
					selected={selectedItem}
				/>

			) )}
		</Block>}
		{customGroups.map( ( g, i ) => (

			<ComponentExplorerGroup
				key={i}
				group={g}
				isBuiltin={false}
				onSelect={onSelect}
				selected={selectedItem}
			/>

		) )}
		{selectedItem && <ComponentDetail
			item={selectedItem}
			componentPath={selectedPath}
		/>}
	</div>;

};
