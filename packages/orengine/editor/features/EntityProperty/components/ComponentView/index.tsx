
import { MouseEvent, useCallback } from 'react';

import * as MXP from 'maxpower';

import { Block } from '../../../../components/ui/Block';
import { CrossIcon } from '../../../../components/ui/Icons/CrossIcon';
import { useOREditor } from '../../../OREditor/hooks/useOREditor';
import { SerializeFieldView } from '../../../SerializableField/components/SerializeFieldView';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';

import style from './index.module.scss';

type ComponentViewProps = {
	component: MXP.Component
};

const hasVisibleFields = ( folder: MXP.SerializeFieldDirectoryFolder ): boolean => {

	const keys = Object.keys( folder.childs );

	for ( let i = 0; i < keys.length; i ++ ) {

		const field = folder.childs[ keys[ i ] ];
		const { opt } = field;

		let hidden = false;

		if ( opt ) {

			if ( typeof opt.hidden === "function" ) {

				hidden = opt.hidden( field.type === "value" ? field.value : null );

			} else {

				hidden = opt.hidden || false;

			}

		}

		if ( hidden ) continue;

		if ( field.type === "value" ) return true;

		if ( hasVisibleFields( field ) ) return true;

	}

	return false;

};

export const ComponentView = ( { component }: ComponentViewProps ) => {

	const { editor } = useOREditor();
	const [ _enabled, _setEnabled ] = useSerializableField<boolean>( component, "enabled" );

	const disableEdit = component.initiator !== "user";

	const hasFields = hasVisibleFields( component.serializeToDirectory() );

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
			<Block label={labelElm} accordion={hasFields} bg defaultClose={false}>
				{hasFields && <SerializeFieldView target={component} />}
			</Block>
		</div>
	</div>;

};
