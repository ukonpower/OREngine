import * as MXP from 'maxpower';
import { useContext } from 'react';

import { Block } from '../../ui/Block';

import { ComponentView } from './ComponentView';
import style from './index.module.scss';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const Property = () => {

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
			<div className={style.name}>
				{active.name}
			</div>
			<Block title="Components">
				{
					componentArray.map( ( component, index ) => {

						return <ComponentView key={index} keyName={component.key} component={component.component}/>;

					} )
				}
			</Block>
		</div>
	</div>;


};
