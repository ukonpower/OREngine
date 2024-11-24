
import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useMemo } from 'react';

import style from './index.module.scss';

import { useSerializableField } from '~/tsx/gl/useSerializableProps';
import { useWatchSerializable } from '~/tsx/gl/useWatchSerializable';
import { CrossIcon } from '~/tsx/ui/Icon/CrossIcon';
import { InputBoolean } from '~/tsx/ui/Input/InputCheckBox';
import { Block } from '~/tsx/ui/Property/PropertyBlock';
import { Value, ValueType } from '~/tsx/ui/Property/Value';

type ComponentViewProps = {
	component: MXP.Component
};

export const ComponentView = ( { component }: ComponentViewProps ) => {

	useWatchSerializable( component, [] );

	const [ enabled, setEnabled ] = useSerializableField<boolean>( component, "enabled" );

	const disableEdit = component.initiator !== "user";

	const propElms: JSX.Element[] = [
		<Value key='-2' label={"tag"} value={component.tag} readOnly />
	];

	const onClickDelete = useCallback( ( e: MouseEvent ) => {

		if ( disableEdit ) return;

		e.stopPropagation();

		const entity = component.entity;

		if ( entity ) {


			entity.removeComponent( component );

		}

	}, [ disableEdit, component ] );

	const compoProps = component.serializeToObject();

	const onChangeProps = useCallback( ( value: ValueType, label: string ) => {

		component.setField( label, value );

	}, [ component ] );

	if ( compoProps ) {

		const parseProps = ( depth: number, path: string, elmArray: JSX.Element[], props: any ): JSX.Element[] => {

			const propKeys = Object.keys( props );

			for ( let i = 0; i < propKeys.length; i ++ ) {

				const key = propKeys[ i ];
				const prop = props[ key ];

				const path_ = path + key;

				if ( key == "enabled" ) continue;

				if ( prop === undefined ) continue;

				if ( "value" in prop ) {

					const value = prop.value;
					const opt = prop as MXP.SerializableFieldOpt;

					elmArray.push( <Value key={i} label={key} value={value} onChange={( value ) => {

						onChangeProps( value, path_ );

					}} {...opt} readOnly={opt?.readOnly || disableEdit} /> );

				} else {

					const elms = parseProps( depth + 1, path_ + "/", [], prop );

					const dd = depth + 1;
					const col = "#" + dd + dd + dd;

					elmArray.push( <div className={style.propertyBlock} key={i}><Block key={i} label={key} bg={col} accordion >{elms}</Block></div> );

				}

			}


			return elmArray;

		};

		parseProps( 0, "", propElms, compoProps );

	}

	return <div className={style.compoView} data-disable_component={disableEdit }>
		<div className={style.content}>
			<Block label={<div className={style.head}>
				<div className={style.check}>
					<InputBoolean checked={enabled || false} onChange={setEnabled} readOnly={disableEdit} />
				</div>
				<div className={style.name}>
					{component.constructor.name}
				</div>
				<div className={style.delete}>
					<button onClick={onClickDelete}><CrossIcon /></button>
				</div>
			</div>} accordion={true} defaultClose={false} bg>
				{propElms}
			</Block>
		</div>
	</div>;

};
