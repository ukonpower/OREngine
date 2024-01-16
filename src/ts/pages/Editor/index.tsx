import { useGL } from '~/ts/hooks/useGL';
import style from './index.module.scss'

export const EditorPage = () => {
	useGL();
	return <div className={style.editor}>Editor</div>;
};
