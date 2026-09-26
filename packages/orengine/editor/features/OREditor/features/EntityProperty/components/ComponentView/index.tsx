
import { MouseEvent, useCallback } from 'react';

import * as MXP from 'maxpower';
import { Engine } from 'orengine';
import { Block, CrossIcon, InputBoolean } from 'uipower';

import { useOREditor } from '../../../../hooks/useOREditor';
import { KeyFrameIndicator } from '../../../KeyFrame/components/KeyFrameIndicator';
import { useKeyFrameField } from '../../../KeyFrame/hooks/useKeyFrameField';
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
	const [ enabled ] = useSerializableField<boolean>( component, "enabled" );

	// enabled はフィールドの行に出ない（hidden）ので、見出しのチェックボックスがその行の代わりになる（I・右クリック・キーの状態）
	const enabledKeyFrame = useKeyFrameField( component, "enabled" );

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

	const onChangeEnabled = useCallback( ( value: boolean ) => {

		editor.api.setField( component, "enabled", value );

	}, [ component, editor ] );

	let enabledIndicator = null;

	if ( enabledKeyFrame.state ) {

		enabledIndicator = <KeyFrameIndicator state={enabledKeyFrame.state} />;

	}

	const labelElm = <div className={style.head}>
		<div className={style.check} {...enabledKeyFrame.rowProps}>
			<InputBoolean checked={enabled || false} onChange={onChangeEnabled} readOnly={disableEdit} />
		</div>
		{enabledIndicator}
		<div className={style.name}>
			{Engine.resources.getComponentName( component )}
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
