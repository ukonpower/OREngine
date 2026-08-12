
import { Block } from '../../components/ui/Block';
import { useOREditor } from '../OREditor/hooks/useOREditor';
import { SerializeFieldView } from '../SerializableField/components/SerializeFieldView';

import style from './index.module.scss';

export const RendererSettings = () => {

	const { editor } = useOREditor();

	const renderer = editor.engine.renderer;

	return <div className={style.renderer}>
		<div className={style.renderer_inner}>
			<Block label="Resolution" accordion>
				<SerializeFieldView target={editor} filter="resolution" />
			</Block>
			<Block label="Pipeline" accordion>
				<SerializeFieldView target={renderer} filter="pipeline" />
			</Block>
			<Block label="Sky" accordion>
				<SerializeFieldView target={renderer} filter="sky" />
			</Block>
		</div>
	</div>;

};
