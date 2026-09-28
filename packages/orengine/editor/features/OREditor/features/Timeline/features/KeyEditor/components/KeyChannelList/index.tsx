import { ArrowIcon, SegmentedControl } from 'uipower';

import { useKeyEditor } from '../../hooks/useKeyEditor';
import { curveColor } from '../../lib/CurveGraph';

import style from './index.module.scss';

import type { KeyEditorMode } from '../../hooks/useKeyEditorContext';
import type { SegmentedControlOption } from 'uipower';


// 上の帯で選ぶ、右の領域の表示（キー表示 / カーブ表示）
const modeOptions: SegmentedControlOption<KeyEditorMode>[] = [
	{ value: "keys", label: "Keys", title: "Dope Sheet" },
	{ value: "curves", label: "Curves", title: "Graph Editor" },
];

// タイムラインの左のチャンネル一覧。
// 行の高さと縦のスクロールは右のキーの表示とそろえる（スクロール量は context で共有する）
export const KeyChannelList = () => {

	const { entity, visibleChannels, mode, setMode, collapsed, toggleCollapsed, activeChannelId, setActiveChannelId, channelListRef, setScrollTop } = useKeyEditor();

	return <div className={style.channelList}>
		<div className={style.header}>
			<SegmentedControl options={modeOptions} value={mode} onChange={setMode} />
		</div>
		<div className={style.list} ref={channelListRef} onScroll={( e ) => setScrollTop( e.currentTarget.scrollTop )}>
			{! entity && <div className={style.empty}>No entity selected</div>}
			{visibleChannels.map( ( channel ) => {

				let labelColor: string | undefined = undefined;

				// カーブ表示では、線と同じ色で要素の行を示す
				if ( mode == "curves" && channel.element !== null ) labelColor = curveColor( channel.element );

				return <div
					key={channel.id}
					className={style.row}
					data-depth={channel.depth}
					data-active={mode == "curves" && channel.id == activeChannelId}
					onClick={() => setActiveChannelId( channel.id )}
				>
					<span className={style.toggle}>
						{channel.hasChildren && <button onClick={( e ) => {

							e.stopPropagation();
							toggleCollapsed( channel.id );

						}}><ArrowIcon open={! collapsed.has( channel.id )} /></button>}
					</span>
					{channel.component && <span className={style.component}>{channel.component}</span>}
					<span className={style.label} style={{ color: labelColor }}>{channel.label}</span>
					{channel.shared && <span className={style.shared} title={`Shared with ${channel.shared.count} fields`}>
						⇄ {channel.shared.name} ({channel.shared.count})
					</span>}
				</div>;

			} )}
		</div>
	</div>;

};
