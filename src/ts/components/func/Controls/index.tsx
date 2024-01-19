import { Panel } from '../../ui/Panel';
import { PanelContainer } from '../../ui/PanelContainer';

import style from './index.module.scss';

export const Controls = () => {

	return <PanelContainer >
		<Panel title='Assets'>
			<div className={style.controls}>
				Assets
			</div>
		</Panel>
		<Panel title='Timeline'>
			<div className={style.controls}>
			Timeline
			</div>
		</Panel>
	</PanelContainer>;

};
