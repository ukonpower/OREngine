import { useCallback, useEffect, useState } from 'react';

import { InputSelect } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';

import type { SelectOption } from 'uipower';

interface InputEntityRefProps {
	value: string | null;
	onChange?: ( value: string | null ) => void;
}

export const InputEntityRef = ( props: InputEntityRefProps ) => {

	const { engine } = useOREditor();

	const buildList = useCallback( () => {

		const list: SelectOption[] = [ { label: "(None)", value: "" } ];

		engine.root.traverse( ( entity ) => {

			list.push( {
				label: entity.getScenePath( engine.root ),
				value: entity.uuid,
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
