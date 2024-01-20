
import * as MXP from 'maxpower';
import { useCallback } from 'react';

import style from './index.module.scss';

import { Block } from '~/ts/components/ui/Block';
import { CheckBox } from '~/ts/components/ui/CheckBox';

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
			<Block head={<Check />} accordion>
			</Block>
		</div>
	</div>;

};
