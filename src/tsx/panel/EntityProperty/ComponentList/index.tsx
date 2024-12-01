import * as MXP from 'maxpower';
import { useMemo } from 'react';

import { ComponentView } from '../ComponentView';

import style from './index.module.scss';

import { useSerializableField } from '~/tsx/hooks/useSerializableProps';

export const ComponentList: React.FC<{entity: MXP.Entity}> = ( { entity } ) => {

	const [ components ] = useSerializableField<string[]>( entity, "components" );

	const componentViewList = useMemo( () => {

		const componentViewList: React.ReactNode[] = [];

		if ( ! components ) {

			return null;

		}

		components.forEach( componentId => {

			const component = entity.getComponentByResourceId( componentId );

			if ( ! component ) return;

			componentViewList.push(
				<ComponentView key={componentId} component={component} />
			);

		} );

		return componentViewList;

	}, [ components, entity ] );


	return <div className={style.container}>
		{componentViewList}
	</div>;

};
