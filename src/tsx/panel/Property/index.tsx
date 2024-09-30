import * as GLP from 'glpower';
import * as MXP from 'maxpower'
;
import { useContext } from 'react';

import { EditorContext } from '../../gl/useEditor';
import { PropertyBlock } from '../../ui/Property/PropertyBlock';
import { Value } from '../../ui/Property/Value';
import { Vector } from '../../ui/Property/Vector';

import { ComponentAdd } from './ComponentAdd';
import { ComponentView } from './ComponentView';
import style from './index.module.scss';

import { useSerializableProps } from '~/tsx/gl/useSerializableProps';


export const Property = () => {

	const { glEditor } = useContext( EditorContext );

	// select entity

	const [ selectedEntityId ] = useSerializableProps<string>( glEditor, "selectedEntity" );
	const selectedEntity = selectedEntityId !== undefined ? glEditor?.scene.getEntityById( selectedEntityId ) : undefined;

	const [ position, setPosition ] = useSerializableProps<number[]>( selectedEntity, "position" );
	const [ euler, setEuler ] = useSerializableProps<number[]>( selectedEntity, "euler" );
	const [ scale, setScale ] = useSerializableProps<number[]>( selectedEntity, "scale" );
	const [ coponents ] = useSerializableProps<MXP.Component[]>( selectedEntity, "components" );

	if ( ! selectedEntity ) return null;

	const disabled = selectedEntity.initiator != "user";

	return <div className={style.property}>
		<div className={style.content}>
			<PropertyBlock label={"Info"}>
				<Value label="Name" value={selectedEntity.name} readOnly/>
				<Value label="Initiator" value={selectedEntity.initiator } readOnly/>
			</PropertyBlock>
			<PropertyBlock label={"Transform"} accordion={true}>
				<PropertyBlock label={"Position"} >
					<Vector type='vec3' disabled={disabled} value={new GLP.Vector().setFromArray( position || [] )} onChange={( value ) => {

						setPosition && setPosition( new GLP.Vector().copy( value ).getElm( 'vec3' ) );

					}}/>
				</PropertyBlock>
				<PropertyBlock label={"Rotation"} >
					<Vector type='vec3' disabled={disabled} value={ new GLP.Vector().setFromArray( euler || [] ).multiply( 1.0 / Math.PI * 180 )} step={50} onChange={( value ) => {

						setEuler && setEuler( new GLP.Vector().copy( value ).multiply( 1.0 / 180 * Math.PI ).getElm( 'vec3' ) );

					}}/>
				</PropertyBlock>
				<PropertyBlock label={"Scale"} >
					<Vector type='vec3' disabled={disabled} value={new GLP.Vector().setFromArray( scale || [] )} onChange={( value ) => {

						setScale && setScale( new GLP.Vector().copy( value ).getElm( 'vec3' ) );

					}}/>
				</PropertyBlock>
			</PropertyBlock>
			<PropertyBlock label={"Components"} accordion={true} noIndent>
				<div className={style.component_list}>
					{coponents && coponents.map( ( component ) => {

						return <ComponentView key={component.uuid} component={component}/>;

					} )
					}
				</div>
				<div className={style.component_controls}>
					<ComponentAdd entity={selectedEntity} />
				</div>
			</PropertyBlock>
		</div>
	</div>;


};
