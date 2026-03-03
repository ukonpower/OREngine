import { useCallback, useEffect, useState } from 'react';

import { useOREditor } from '../../../../hooks/useOREditor';
import { SelectList } from '../InputSelect';

import style from '../InputSelect/index.module.scss';

interface InputEntityRefProps {
	value: string | null;
	onChange?: ( value: string | null ) => void;
}

export const InputEntityRef = ( props: InputEntityRefProps ) => {

	const { engine } = useOREditor();

	const buildList = useCallback( () => {

		const list: SelectList = [ { label: "(None)", value: "" } ];

		engine.root.traverse( ( entity ) => {

			list.push( {
				label: entity.getScenePath( engine.root ),
				value: entity.uuid,
			} );

		} );

		return list;

	}, [ engine ] );

	const [ selectList, setSelectList ] = useState<SelectList>( buildList );

	useEffect( () => {

		const onUpdate = () => setSelectList( buildList() );

		engine.on( "update/graph", onUpdate );

		return () => {

			engine.off( "update/graph", onUpdate );

		};

	}, [ engine, buildList ] );

	return <div className={style.inputSelect}>
		<select className={style.input} onChange={( e ) => {

			if ( props.onChange ) {

				props.onChange( e.target.value || null );

			}

		}} value={props.value || ""}>
			{selectList.map( ( v, i ) => {

				const label = typeof v === "string" ? v : v.label;
				const value = typeof v === "string" ? v : v.value;

				return <option key={i} value={value}>{label}</option>;

			} )}
		</select>
	</div>;

};
