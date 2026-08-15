import { useOREditor } from '../../../../hooks/useOREditor';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';

import style from './index.module.scss';

// タッチ環境向けのカメラ操作ボタン。回転・パン・ズームはキャンバス直接タッチで行えるため、
// タッチだけでは行えない Focus / Scene Cam だけを置く
export const CameraPad = () => {

	const { editor } = useOREditor();

	const [ selectedEntityId ] = useSerializableField<string | null>( editor, "selectedEntityId" );

	return <div className={style.cameraPad}>
		<div
			className={style.btn}
			data-disabled={! selectedEntityId}
			onClick={() => {

				if ( ! selectedEntityId ) return;

				editor.focusSelected();

			}}
			title="Focus selected ( . )"
		>
			Focus
		</div>
		<div
			className={style.btn}
			onClick={() => {

				editor.syncToSceneCamera();

			}}
			title="Move to scene camera ( Esc )"
		>
			Scene Cam
		</div>
	</div>;

};
