
import * as MXP from 'maxpower';
import { ResouceComponentItem } from 'packages/orengine/ts/Engine/Resources';
import { useCallback, useEffect, useMemo } from 'react';

import { Block } from '../../../Block';
import { Button } from '../../../Button';
import { SerializeFieldView } from '../../../SerializeFieldView';

import style from './index.module.scss';

type ComponentDetailProps = {
	item: ResouceComponentItem;
	componentPath?: string;
};

export const ComponentDetail = ( { item, componentPath }: ComponentDetailProps ) => {

	const dummy = useMemo( () => {

		const entity = new MXP.Entity();

		try {

			entity.addComponent( item.component );

		} catch {
			// some components may fail to init without proper context
		}

		return entity;

	}, [ item ] );

	useEffect( () => {

		return () => {

			dummy.disposeRecursive();

		};

	}, [ dummy ] );

	const component = dummy.getComponent( item.component );

	const onClickOpen = useCallback( () => {

		if ( ! componentPath ) return;

		fetch( `/api/components/${encodeURIComponent( componentPath )}/filepath` )
			.then( r => r.json() )
			.then( data => {

				if ( data.absolutePath ) {

					window.open( `vscode://file/${data.absolutePath}`, '_blank' );

				}

			} );

	}, [ componentPath ] );

	return <div className={style.detail}>
		<Block label={`Selected: ${item.name}`} accordion>
			{componentPath && <div className={style.path}>
				{componentPath}
			</div>}
			{componentPath && <div className={style.actions}>
				<Button onClick={onClickOpen}>Open in Editor</Button>
			</div>}
			{component && <Block label="Fields" accordion defaultClose>
				<SerializeFieldView target={component} />
			</Block>}
		</Block>
	</div>;

};
