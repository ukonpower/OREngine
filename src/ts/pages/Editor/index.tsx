import style from './index.module.scss';

import { GLCanvas } from '~/ts/gl/GLCanvas';
import { useGL, GLContext } from '~/ts/gl/useGL';

export const EditorPage = () => {

	const glContext = useGL();

	return <GLContext.Provider value={glContext}>
		<div className={style.editor}>
			<GLCanvas />
		</div>
	</GLContext.Provider>;

};
