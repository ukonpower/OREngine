
import * as MXP from 'maxpower';
import { MouseEvent, useCallback } from 'react';

import { useOREditor } from '../../../../hooks/useOREditor';
import { useSerializableField } from '../../../../hooks/useSerializableProps';
import { Block } from '../../../Block';
import { CrossIcon } from '../../../Icons/CrossIcon';
import { SerializeFieldView } from '../../../SerializeFieldView';

import style from './index.module.scss';

type ComponentViewProps = {
	component: MXP.Component
};

export const ComponentView = ( { component }: ComponentViewProps ) => {

	const { editor } = useOREditor();
	const [ _enabled, _setEnabled ] = useSerializableField<boolean>( component, "enabled" );

	const disableEdit = component.initiator !== "user";

	const onClickDelete = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		const entity = component.entity;

		if ( entity ) {

			for ( const [ compClass, comp ] of entity.components ) {

				if ( comp.uuid === component.uuid ) {

					editor.api.removeComponent( entity, compClass, component );
					break;

				}

			}

		}

	}, [ component, editor ] );

	const labelElm = <div className={style.head}>
		{/* <div className={style.check}>
			<InputBoolean checked={enabled || false} onChange={setEnabled} readOnly={disableEdit} />
		</div> */}
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
				<SerializeFieldView target={component} />
			</Block>
		</div>
	</div>;

};
