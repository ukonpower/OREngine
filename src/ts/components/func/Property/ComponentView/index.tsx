
import * as MXP from 'maxpower';
import { useCallback } from 'react';

import style from './index.module.scss';

import { CheckBox } from '~/ts/components/ui/CheckBox';
import { Block } from '~/ts/components/ui/Properties/Block';
import { Value, ValueType } from '~/ts/components/ui/Properties/Value';

type ComponentViewProps = {
	component: MXP.Component
	keyName: string
};

export const ComponentView = ( props: ComponentViewProps ) => {

	const component = props.component;
	const compoProps = component.property;
	const accordion = compoProps !== null;
	const propElms: JSX.Element[] = [];

	const onChange = useCallback( ( key: string, value: ValueType ) => {

		component.property = {
			...component.property,
			[ key ]: { value }
		};

	}, [ component ] );

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

	}, [ component ] );

	const Check = () => {

		return <div className={style.head}>
			{component.constructor.name}
			<div className={style.check}>
				<CheckBox checked={component.enabled} onChange={onChangeEnabled}/>
			</div>
		</div>;

	};

	return <div className={style.compoView}>
		<div className={style.content}>
			<Block head={<Check />} accordion={accordion} defaultClose={true} bg>
				{propElms}
			</Block>
		</div>
	</div>;

};
