
import * as MXP from 'maxpower';
import { useCallback, useContext, useState } from 'react';

import style from './index.module.scss';

import { Button } from "~/ts/components/ui/Button";
import { Picker } from '~/ts/components/ui/Picker';
import { ValueType, Value } from '~/ts/components/ui/Properties/Value';
import { EditorContext } from '~/ts/gl/React/useEditor';

type ComponentAddProps= {
	entity: MXP.Entity
}

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { resources, reflesh } = useContext( EditorContext );

	// picker

	const [ pickerVisibility, setPickerVisibility ] = useState<boolean>( false );

	const onClickAdd = useCallback( () => {

		setPickerVisibility( ! pickerVisibility );

	}, [ pickerVisibility ] );

	// args

	const [ willAddComponent, setWillAddComponent ] = useState<any>();
	const [ willAddArgs, setWillAddArgs ] = useState<any>();

	const listItem = resources?.componentList.map( ( compItem ) => {

		return {
			label: compItem.component.name,
			onClick: () => {

				// props.entity.addComponent( compItem.name, new compItem.component() );
				// reflesh && reflesh();
				// setPickerVisibility( false );

				setWillAddArgs( { ...compItem.defaultArgs } );
				setWillAddComponent( compItem );

			}
		};

	} ) || [];

	// args

	const argsElms: JSX.Element[] = [];

	const onChange = useCallback( ( key: string, value: ValueType ) => {

		// component.property = {
		// 	...component.property,
		// 	[ key ]: { value }
		// };

		// reflesh && reflesh();

	}, [ reflesh ] );

	if ( willAddArgs ) {

		const propKeys = Object.keys( willAddArgs );

		for ( let i = 0; i < propKeys.length; i ++ ) {

			const key = propKeys[ i ];
			const prop = willAddArgs[ key ];
			const value = { value: prop };
			const opt = { editable: true };

			const onChange = ( key: string, v:ValueType ) => {

				willAddArgs[ key ] = v;
				reflesh && reflesh();

			};


			argsElms.push( <Value key={i} label={key} value={value.value} onChange={onChange} {...opt}/> );

		}

	}

	return <div className={style.compAdd}>
		<div className={style.picker}>
			<div className={style.picker_inner}>
				{pickerVisibility && <Picker list={listItem}/>}
			</div>
		</div>
		{willAddArgs && <div className={style.argsInput}>
			{argsElms}
		</div>}
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
