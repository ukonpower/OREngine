import * as GLP from 'glpower';
import * as MXP from 'maxpower'
;
import { useContext } from 'react';

import { PropertyBlock } from '../../ui/Property/PropertyBlock';
import { Value } from '../../ui/Property/Value';
import { Vector } from '../../ui/Property/Vector';

import { ComponentAdd } from './ComponentAdd';
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
			<PropertyBlock label={"Info"}>
				<Value label="Name" value={active.name} readOnly/>
				<Value label="No Export" value={active.noExport} readOnly/>
			</PropertyBlock>
			<PropertyBlock label={"Transform"} accordion={true}>
				<PropertyBlock label={"Position"} >
					<Vector type='vec3' value={active.position} onChange={( value ) => {

						active.position.copy( value );
						reflesh && reflesh();

					}}/>
				</PropertyBlock>
				<PropertyBlock label={"Rotation"} >
					<Vector type='vec3' value={ new GLP.Vector().copy( active.euler ).multiply( 1.0 / Math.PI * 180 )} slideScale={50} onChange={( value ) => {

						active.euler.copy( value ).multiply( 1.0 / 180 * Math.PI );
						reflesh && reflesh();

					}}/>
				</PropertyBlock>
				<PropertyBlock label={"Scale"} >
					<Vector type='vec3' value={active.scale} onChange={( value ) => {

						active.scale.copy( value );
						reflesh && reflesh();

					}}/>
				</PropertyBlock>
			</PropertyBlock>
			<PropertyBlock label={"Components"} accordion={true}>
				<div className={style.component_list}>
					{
						componentArray.map( ( { component, key }, index ) => {

							return <ComponentView key={component.uuid} keyName={key} component={component}/>;

						} )
					}
				</div>
				<div className={style.component_controls}>
					<ComponentAdd entity={active} />
				</div>
			</PropertyBlock>
		</div>
	</div>;


};
