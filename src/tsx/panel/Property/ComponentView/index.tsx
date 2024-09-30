
import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useMemo } from 'react';

import style from './index.module.scss';

import { useSerializableProps } from '~/tsx/gl/useSerializableProps';
import { useWatchSerializable } from '~/tsx/gl/useWatchSerializable';
import { CrossIcon } from '~/tsx/ui/icon/CrossIcon';
import { InputBoolean } from '~/tsx/ui/Input/InputCheckBox';
import { PropertyBlock } from '~/tsx/ui/Property/PropertyBlock';
import { Value, ValueType } from '~/tsx/ui/Property/Value';

type ComponentViewProps = {
	component: MXP.Component
};

export const ComponentView = ( { component }: ComponentViewProps ) => {

	useWatchSerializable( component, [ ] );

	const [ enabled, setEnabled ] = useSerializableProps<boolean>( component, "enabled" );

	const disableEdit = component.initiator !== "user";

	const propElms: JSX.Element[] = [
		<Value key='-2' label={"tag"} value={component.tag} readOnly />
	];

	const compoProps = component.props;

	const onChangeProps = useCallback( ( value: ValueType, label: string ) => {

		component.deserialize( {
			...component.serialize(),
			[ label ]: value
		} );

	}, [ component ] );

	if ( compoProps ) {

		const parseProps = ( depth: number, path: string, elmArray: JSX.Element[], props: MXP.SerializableProps ): JSX.Element[] => {

			const propKeys = Object.keys( props );

			for ( let i = 0; i < propKeys.length; i ++ ) {

				const key = propKeys[ i ];
				const prop = props[ key ];

				const path_ = path + key;

				if ( key == "enabled" ) continue;

				if ( prop === undefined ) continue;

				if ( "value" in prop ) {

					const value = prop.value;
					const opt = prop as MXP.SerializablePropsOpt;

					elmArray.push( <Value key={i} label={key} value={value} onChange={( value ) => {

						onChangeProps( value, path_ );

					}} {...opt} readOnly={opt?.readOnly || disableEdit} /> );

				} else {

					const elms = parseProps( depth + 1, path_ + "/", [], prop );

					const dd = depth + 1;
					const col = "#" + dd + dd + dd;

					elmArray.push( <div className={style.propertyBlock} key={i}><PropertyBlock key={i} label={key} bg={col} accordion >{elms}</PropertyBlock></div> );

				}

			}


			return elmArray;

		};

		parseProps( 0, "", propElms, compoProps );

	}

	const onClickDelete = useCallback( ( e: MouseEvent ) => {

		if ( disableEdit ) return;

		e.stopPropagation();

		const entity = component.entity;

		if ( entity ) {


			entity.removeComponent( component );

		}

	}, [ disableEdit, component ] );

	return <div className={style.compoView} data-disable_component={disableEdit }>
		<div className={style.content}>
			<PropertyBlock label={<div className={style.head}>
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
			</PropertyBlock>
		</div>
	</div>;

};
