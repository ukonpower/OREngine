import { Panel } from '../../ui/Panel';
import { PanelContainer } from '../../ui/PanelContainer';

import style from './index.module.scss';

export const PropertyEditor = () => {

	return <PanelContainer >
		<Panel title='Property'>
			<div className={style.property}></div>
		</Panel>
	</PanelContainer>;

};
