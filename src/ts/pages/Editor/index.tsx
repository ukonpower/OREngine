import style from './index.module.scss';

import { Controls } from '~/ts/components/func/Controls';
import { Hierarchy } from '~/ts/components/func/Hierarchy';
import { PropertyEditor } from '~/ts/components/func/PropertyEditor';
import { Screen } from '~/ts/components/func/Screen';
import { useGL, GLContext } from '~/ts/gl/useGL';

export const EditorPage = () => {

	const glContext = useGL();

	return <GLContext.Provider value={glContext}>
		<div className={style.editor}>
			<div className={style.vert}>
				<div className={style.horiz}>
					<div className={style.hierarchy}>
						<Hierarchy />
					</div>
					<div className={style.preview}>
						<Screen />
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
