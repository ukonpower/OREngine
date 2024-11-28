
import * as MXP from 'maxpower';
import { MouseEvent, useCallback } from 'react';

import style from './index.module.scss';

import { useSerializableField } from '~/tsx/hooks/useSerializableProps';
import { CrossIcon } from '~/tsx/Icon/CrossIcon';
import { Block } from '~/tsx/ui/Block';
import { InputBoolean } from '~/tsx/ui/Input/InputCheckBox';
import { SerializableFieldView } from '~/tsx/ui/SerializableFieldView';

type ComponentViewProps = {
	component: MXP.Component
};

export const ComponentView = ( { component }: ComponentViewProps ) => {

	const [ enabled, setEnabled ] = useSerializableField<boolean>( component, "enabled" );

	const disableEdit = component.initiator !== "user";

	const onClickDelete = useCallback( ( e: MouseEvent ) => {

		if ( disableEdit ) return;

		e.stopPropagation();

		const entity = component.entity;

		if ( entity ) {


			entity.removeComponent( component );

		}

	}, [ disableEdit, component ] );

	const labelElm = <div className={style.head}>
		<div className={style.check}>
			<InputBoolean checked={enabled || false} onChange={setEnabled} readOnly={disableEdit} />
		</div>
		<div className={style.name}>
			{component.constructor.name}
		</div>
		<div className={style.delete}>
			<button onClick={onClickDelete}><CrossIcon /></button>
		</div>
	</div>;

	return <div className={style.compoView} data-disable_component={disableEdit}>
		<div className={style.content}>
			<Block label={labelElm} accordion bg defaultClose={false}>
				<SerializableFieldView target={component} />
			</Block>
		</div>
	</div>;

};
