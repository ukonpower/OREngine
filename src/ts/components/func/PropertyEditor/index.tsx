import * as MXP from 'maxpower';
import { useContext } from 'react';

import style from './index.module.scss';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const PropertyEditor = () => {

	const { active } = useContext( EditorContext );

	if ( ! active ) return null;

	const componentArray: {key: string, component: MXP.Component }[] = [];

	active.components.forEach( ( component, key ) => {

		componentArray.push( {
			key,
			component
		} );

	} );

	return <div className={style.property}>
		<div className={style.content}>
			{active.name}
			{
				componentArray.map( ( component, index ) => <div key={index}>
					{
						component.key
					}
				</div> )
			}
		</div>
	</div>;


};
