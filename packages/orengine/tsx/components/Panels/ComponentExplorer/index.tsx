
import { ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';
import { useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../ts/Engine';

import { ComponentCreateForm } from './ComponentCreateForm';
import { ComponentDetail } from './ComponentDetail';
import { ComponentExplorerNode } from './ComponentExplorerNode';
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

	return <div className={style.explorer}>
		<ComponentCreateForm />
		{groups.map( ( g, i ) => (

			<ComponentExplorerNode
				key={i}
				node={g}
				depth={0}
				isBuiltin={g.name.startsWith( '_' )}
				selectedItem={selectedItem}
				onSelect={onSelect}
			/>

		) )}
		{selectedItem && <ComponentDetail
			item={selectedItem}
			componentPath={selectedPath}
		/>}
	</div>;

};
