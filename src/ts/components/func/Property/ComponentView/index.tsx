
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

	const compoProps = component.property;

	const onChange = useCallback( ( value: ValueType, label: string ) => {

		component.property = {
			...component.property,
			[ label ]: { value }
		};

		reflesh && reflesh();

	}, [ component, reflesh ] );

	if ( compoProps ) {

		const propKeys = Object.keys( compoProps );

		for ( let i = 0; i < propKeys.length; i ++ ) {

			const key = propKeys[ i ];
			const prop = compoProps[ key ];
			const value = prop.value;
			const opt = prop.opt;

			propElms.push( <Value key={i} label={key} value={value} onChange={onChange} {...opt}/> );

		}

	}

	const onChangeEnabled = useCallback( ( checked: boolean ) => {

		component.enabled = checked;

		reflesh && reflesh();

	}, [ component, reflesh ] );

	const onClickDelete = useCallback( ( e: MouseEvent ) => {

		const entity = component.entity;

		if ( entity ) {

			entity.removeComponent( keyName );

			e.stopPropagation();

		}

		reflesh && reflesh();

	}, [ component, keyName, reflesh ] );

	const Check = () => {

		return <div className={style.head}>
			<div className={style.check}>
				<InputBoolean checked={component.enabled} onChange={onChangeEnabled} />
			</div>
			<div className={style.name}>
				{component.name || component.constructor.name}
			</div>
			<div className={style.delete}>
				<button onClick={onClickDelete}><CrossIcon /></button>
			</div>
		</div>;

	};

	return <div className={style.compoView}>
		<div className={style.content}>
			<PropertyBlock label={<Check />} accordion={true} defaultClose={true} bg>
				{propElms}
			</PropertyBlock>
		</div>
	</div>;

};
