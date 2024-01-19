import { Panel } from '../../ui/Panel';

import style from './index.module.scss';

export const PropertyEditor = () => {

	return <Panel title='Property'>
		<div className={style.property}></div>
	</Panel>;

};
