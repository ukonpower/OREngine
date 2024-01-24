
import * as MXP from 'maxpower';
import { useCallback, useContext, useState } from 'react';

import style from './index.module.scss';

import { Button } from "~/ts/components/ui/Button";
import { Picker } from '~/ts/components/ui/Picker';
import { EditorContext } from '~/ts/gl/React/useEditor';

type ComponentAddProps= {
	entity: MXP.Entity
}

export const ComponentAdd = ( props: ComponentAddProps ) => {

	const { component, reflesh } = useContext( EditorContext );

	const [ pickerVisibility, setPickerVisibility ] = useState<boolean>( false );

	const onClickAdd = useCallback( () => {

		setPickerVisibility( ! pickerVisibility );

	}, [ pickerVisibility ] );

	const listItem = component?.componentList.map( ( compItem ) => {

		return {
			label: compItem.component.name,
			onClick: () => {

				props.entity.addComponent( compItem.name, new compItem.component() );
				reflesh && reflesh();

				setPickerVisibility( false );

			}
		};

	} ) || [];

	return <div className={style.compAdd}>
		<div className={style.picker}>
			<div className={style.picker_inner}>
				{pickerVisibility && <Picker list={listItem}/>}
			</div>
		</div>
		<Button onClick={onClickAdd}>Add Component</Button>
	</div>;

};
