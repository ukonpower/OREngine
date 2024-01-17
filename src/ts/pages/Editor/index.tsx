import { GLContext, useGL } from '~/ts/hooks/useGL';
import style from './index.module.scss'
import { GLCanvas } from '~/ts/components/GLCanvas';

export const EditorPage = () => {
	const glContext = useGL()
	
	return <GLContext.Provider value={glContext}>
		<div className={style.editor}>
			<GLCanvas />
		</div>
	</GLContext.Provider>;
};
