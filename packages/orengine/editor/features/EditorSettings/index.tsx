import { Block } from '../../components/ui/Block';
import { Label } from '../../components/ui/Label';
import { Value } from '../../components/ui/Value';

import { useUISetting } from './hooks/useUISetting';
import style from './index.module.scss';

// エディタ自体のUI設定画面。端末ごとの好み（localStorage 保存）をここに集約する
export const EditorSettings = () => {

	const [ showAudioView, setShowAudioView ] = useUISetting( 'showAudioView' );

	return <div className={style.editorSettings}>
		<div className={style.editorSettings_inner}>
			<Block label="View" accordion>
				<Label title='AudioView'>
					<Value value={showAudioView} onChange={( v ) => setShowAudioView( v )}/>
				</Label>
			</Block>
		</div>
	</div>;

};
