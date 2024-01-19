
import * as MXP from 'maxpower';

import style from './index.module.scss';

import { Block } from '~/ts/components/ui/Block';

type ComponentViewProps = {
	component: MXP.Component
	keyName: string
};

export const ComponentView = ( props: ComponentViewProps ) => {

	const component = props.component;

	return <div className={style.compoView}>
		<div className={style.content}>
			<Block title={component.constructor.name} accordion>datadata</Block>
		</div>
	</div>;

};
