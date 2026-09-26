import { useCallback, useEffect, useState } from 'react';

import { Engine } from 'orengine';
import { InputSelect } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';

import type { SelectOption } from 'uipower';

interface InputComponentRefProps {
	value: string | null;
	onChange?: ( value: string | null ) => void;
}

export const InputComponentRef = ( props: InputComponentRefProps ) => {

	const { engine } = useOREditor();

	const buildList = useCallback( () => {

		const list: SelectOption[] = [ { label: "(None)", value: "" } ];

		engine.root.traverse( ( entity ) => {

			entity.components.forEach( ( component ) => {

				list.push( {
					label: `${entity.getScenePath( engine.root )} > ${Engine.resources.getComponentName( component )}`,
					value: component.uuid,
				} );

			} );

		} );

		return list;

	}, [ engine ] );

	const [ selectList, setSelectList ] = useState<SelectOption[]>( buildList );

	useEffect( () => {

		const onUpdate = () => setSelectList( buildList() );

		engine.on( "update/graph", onUpdate );

		return () => {

			engine.off( "update/graph", onUpdate );

		};

	}, [ engine, buildList ] );

	return <InputSelect value={props.value || ""} selectList={selectList} onChange={( value ) => {

		if ( props.onChange ) {

			props.onChange( value || null );

		}

	}} />;

};
