import * as MXP from 'maxpower';
import { useContext } from 'react';

import { Block } from '../../ui/Properties/Block';

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
			<Block head={"Info"}>
				{active.name}
			</Block>
			<Block head={"Transform"}>
				<Block head={"Position"} >
					{active.position.x}<br/>
					{active.position.y}<br/>
					{active.position.z}
				</Block>
				<Block head={"Rotation"} >
					{active.quaternion.x}<br/>
					{active.quaternion.y}<br/>
					{active.quaternion.z}<br/>
					{active.quaternion.w}
				</Block>
				<Block head={"Scale"} >
					{active.scale.x}<br/>
					{active.scale.y}<br/>
					{active.scale.z}
				</Block>
			</Block>
			<Block head={"Components"
			}>
				{
					componentArray.map( ( { component, key }, index ) => {

						return <ComponentView key={component.uuid} keyName={key} component={component}/>;

					} )
				}
			</Block>
		</div>
	</div>;


};
