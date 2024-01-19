import style from './index.module.scss';

import { Controls } from '~/ts/components/Controls';
import { PropertyEditor } from '~/ts/components/PropertyEditor';
import { GLCanvas } from '~/ts/gl/GLCanvas';
import { useGL, GLContext } from '~/ts/gl/useGL';

export const EditorPage = () => {

	const glContext = useGL();

	return <GLContext.Provider value={glContext}>
		<div className={style.editor}>
			<div className={style.vert}>
				<div className={style.horiz}>
					<div className={style.preview}>
						<GLCanvas />
					</div>
					<div className={style.property}>
						<PropertyEditor />
					</div>
				</div>
				<div className={style.controls}>
					<Controls />
				</div>
			</div>
		</div>
	</GLContext.Provider>;

};
