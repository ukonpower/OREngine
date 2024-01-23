import * as MXP from 'maxpower';
import { useContext } from 'react';

import { Block } from '../../ui/Properties/Block';
import { Value } from '../../ui/Properties/Value';
import { Vector } from '../../ui/Properties/Vector';

import { ComponentView } from './ComponentView';
import style from './index.module.scss';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const Property = () => {

	const { active, reflesh } = useContext( EditorContext );

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
				<Value label="Name" value={active.name}/>
			</Block>
			<Block head={"Transform"} accordion={true}>
				<Block head={"Position"} >
					<Vector type='vec3' value={active.position} onChange={( value ) => {

						active.position.copy( value );
						reflesh && reflesh();

					}}/>
				</Block>
				<Block head={"Rotation"} >
					<Vector type='vec4' value={active.quaternion} onChange={( value ) => {

						active.quaternion.copy( value );
						reflesh && reflesh();

					}}/>
				</Block>
				<Block head={"Scale"} >
					<Vector type='vec3' value={active.scale} onChange={( value ) => {

						active.scale.copy( value );
						reflesh && reflesh();

					}}/>

				</Block>
			</Block>
			<Block head={"Components"} accordion={true}>
				{
					componentArray.map( ( { component, key }, index ) => {

						return <ComponentView key={component.uuid} keyName={key} component={component}/>;

					} )
				}
			</Block>
		</div>
	</div>;


};
