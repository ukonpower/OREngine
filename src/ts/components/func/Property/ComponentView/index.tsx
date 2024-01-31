
import * as MXP from 'maxpower';
import { useCallback, useContext } from 'react';

import style from './index.module.scss';

import { InputBoolean } from '~/ts/components/ui/Input/InputCheckBox';
import { PropertyBlock } from '~/ts/components/ui/Property/PropertyBlock';
import { Value, ValueType } from '~/ts/components/ui/Property/Value';
import { EditorContext } from '~/ts/gl/React/useEditor';

type ComponentViewProps = {
	component: MXP.Component
	keyName: string
};

export const ComponentView = ( props: ComponentViewProps ) => {

	const { reflesh } = useContext( EditorContext );

	const component = props.component;
	const compoProps = component.property;
	const accordion = compoProps !== null;
	const propElms: JSX.Element[] = [];

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

	const Check = () => {

		return <div className={style.head}>
			{component.name || component.constructor.name}
			<div className={style.check}>
				<InputBoolean checked={component.enabled} onChange={onChangeEnabled} />
			</div>
		</div>;

	};

	return <div className={style.compoView}>
		<div className={style.content}>
			<PropertyBlock label={<Check />} accordion={accordion} defaultClose={true} bg>
				{propElms}
			</PropertyBlock>
		</div>
	</div>;

};
