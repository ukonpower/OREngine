
import * as MXP from 'maxpower';
import { useCallback, useContext, useState } from 'react';

import style from './index.module.scss';

import { Button } from "~/ts/components/ui/Button";
import { InputGroup } from '~/ts/components/ui/InputGroup';
import { Picker } from '~/ts/components/ui/Picker';
import { ValueInputProps } from '~/ts/components/ui/Property/Value/ValueInput';
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

	const listItem = resources?.componentList.map( ( compItem ) => {

		return {
			label: compItem.component.name,
			onClick: () => {

				setWillAddComponent( compItem );

			}
		};

	} ) || [];

	// args

	let initialValues: { [key: string]: ValueInputProps<any>} | null = null;

	if ( willAddComponent && willAddComponent.defaultArgs ) {

		const args = willAddComponent.defaultArgs;

		const propKeys = Object.keys( args );

		initialValues = {};

		for ( let i = 0; i < propKeys.length; i ++ ) {

			const key = propKeys[ i ];
			const prop = args[ key ];

			initialValues[ key ] = { value: prop };

		}

	}

	return <div className={style.compAdd}>
		<div className={style.picker}>
			<div className={style.picker_inner}>
				{pickerVisibility && <Picker list={listItem}/>}
			</div>
		</div>
		{initialValues && <div className={style.argsInput}>
			<InputGroup initialValues={initialValues}/>
		</div>}
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
