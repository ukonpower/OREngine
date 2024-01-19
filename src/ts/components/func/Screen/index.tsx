import style from './index.module.scss';

import { GLCanvas } from '~/ts/gl/GLCanvas';

export const Screen = () => {

	return <div className={style.screen}>
		<div className={style.header}></div>
		<div className={style.content}>
			<GLCanvas />
		</div>
	</div>;

};
