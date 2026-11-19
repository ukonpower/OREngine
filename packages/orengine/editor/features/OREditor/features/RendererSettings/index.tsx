import { Block, InputSelect, Label } from 'uipower';

import { RENDERER_TYPES, type RendererType } from '../../../../lib/RendererType';
import { useOREngine } from '../../../OREngine/hooks/useOREngine';
import { useOREditor } from '../../hooks/useOREditor';
import { SerializeFieldView } from '../SerializableField/components/SerializeFieldView';

import style from './index.module.scss';

export const RendererSettings = () => {

	const { editor } = useOREditor();
	const { rendererType, canChangeRendererType, changeRendererType } = useOREngine();

	const renderer = editor.engine.renderer;

	return <div className={style.renderer}>
		<div className={style.renderer_inner}>
			<Block label="Renderer" accordion>
				<Label title="type">
					<InputSelect value={rendererType} selectList={RENDERER_TYPES} disabled={! canChangeRendererType} onChange={( value ) => {

						changeRendererType( value as RendererType );

					}} />
				</Label>
			</Block>
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
