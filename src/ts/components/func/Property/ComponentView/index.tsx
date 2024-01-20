
import * as MXP from 'maxpower';
import { useCallback } from 'react';

import style from './index.module.scss';

import { CheckBox } from '~/ts/components/ui/CheckBox';
import { Block } from '~/ts/components/ui/Properties/Block';

type ComponentViewProps = {
	component: MXP.Component
	keyName: string
};

export const ComponentView = ( props: ComponentViewProps ) => {

	const component = props.component;

	const onClickEnableCheck = useCallback( () => {

		component.enabled = ! component.enabled;

	}, [ component ] );

	const Check = () => {

		return <div className={style.head}>
			{component.constructor.name}
			<div className={style.check}>
				<CheckBox checked={component.enabled} onClick={onClickEnableCheck}/>
			</div>
		</div>;

	};

	return <div className={style.compoView}>
		<div className={style.content}>
			<Block head={<Check />} accordion bg>
			</Block>
		</div>
	</div>;

};
