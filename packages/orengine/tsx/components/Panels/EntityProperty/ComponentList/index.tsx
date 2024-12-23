import * as MXP from 'maxpower';
import { useMemo } from 'react';

import { useSerializableField } from '../../../../hooks/useSerializableProps';
import { ComponentView } from '../ComponentView';

import style from './index.module.scss';


export const ComponentList: React.FC<{ entity: MXP.Entity }> = ( { entity } ) => {

	const [ components ] = useSerializableField<string[]>( entity, "components" );

	const componentViewList = useMemo( () => {

		const componentViewList: React.ReactNode[] = [];

		if ( ! components ) {

			return null;

		}

		components.forEach( uuid => {

			const component = entity.getComponentByUUID( uuid );

			if ( ! component ) return;

			componentViewList.push(
				<ComponentView key={component.uuid} component={component} />
			);

		} );

		return componentViewList;

	}, [ components, entity ] );

	return <div className={style.container}>
		{componentViewList}
	</div>;

};
