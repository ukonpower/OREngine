
import * as MXP from 'maxpower';
import { MouseEvent, useCallback, useContext } from 'react';

import style from './index.module.scss';

import { CrossIcon } from '~/ts/components/ui/icon/CrossIcon';
import { InputBoolean } from '~/ts/components/ui/Input/InputCheckBox';
import { PropertyBlock } from '~/ts/components/ui/Property/PropertyBlock';
import { Value, ValueType } from '~/ts/components/ui/Property/Value';
import { EditorContext } from '~/ts/gl/React/useEditor';

type ComponentViewProps = {
	component: MXP.Component
	keyName: string
};

export const ComponentView = ( { component, keyName }: ComponentViewProps ) => {

	const { reflesh } = useContext( EditorContext );

	const propElms: JSX.Element[] = [
		<Value key='-1' label={"key"} value={keyName} readOnly/>
	];

	const compoProps = component.getProps();

	const onChange = useCallback( ( value: ValueType, label: string ) => {

		component.setProps( {
			...component.getPropsSerialized(),
			[ label ]: value
		} );

		reflesh && reflesh();

	}, [ component, reflesh ] );

	if ( compoProps ) {

		const _ = ( depth: number, path: string, elmArray: JSX.Element[], props: MXP.ExportableProps ): JSX.Element[] => {

			const propKeys = Object.keys( props );

			for ( let i = 0; i < propKeys.length; i ++ ) {

				const key = propKeys[ i ];
				const prop = props[ key ];

				const path_ = path + key;

				if ( "value" in prop ) {

					const value = prop.value;
					const opt = prop.opt as MXP.ExportablePropsOpt;

					elmArray.push( <Value key={i} label={key} value={value} onChange={( value ) => {

						onChange( value, path_ );

					}} {...opt} readOnly={opt?.readOnly || component.disableEdit}/> );

				} else {

					const elms = _( depth + 1, path_ + "/", [], prop );

					const dd = depth + 1;
					const col = "#" + dd + dd + dd;

					elmArray.push( <div className={style.propertyBlock} key={i}><PropertyBlock key={i} label={key} bg={col} accordion >{elms}</PropertyBlock></div> );

				}

			}


			return elmArray;

		};

		_( 0, "", propElms, compoProps );

	}

	const onChangeEnabled = useCallback( ( checked: boolean ) => {

		component.enabled = checked;

		reflesh && reflesh();

	}, [ component, reflesh ] );

	const onClickDelete = useCallback( ( e: MouseEvent ) => {

		e.stopPropagation();

		const entity = component.entity;

		if ( entity ) {

			entity.removeComponent( keyName );

		}

		reflesh && reflesh();

	}, [ component, keyName, reflesh ] );

	const Check = () => {

		return <div className={style.head}>
			<div className={style.check}>
				<InputBoolean checked={component.enabled} onChange={onChangeEnabled} readOnly={component.disableEdit} />
			</div>
			<div className={style.name}>
				{component.constructor.name}
			</div>
			<div className={style.delete}>
				<button onClick={onClickDelete}><CrossIcon /></button>
			</div>
		</div>;

	};

	return <div className={style.compoView} data-disable_component={component.disableEdit}>
		<div className={style.content}>
			<PropertyBlock label={<Check />} accordion={true} defaultClose={false} bg>
				{propElms}
			</PropertyBlock>
		</div>
	</div>;

};
