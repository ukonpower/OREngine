import { TimelineCanvas } from './components/TimelineCanvas';
import { TimelineControls } from './components/TimelineControls';
import { TimelineCursor } from './components/TimelineCursor';
import { TimelineLoop } from './components/TimelineLoop';
import { TimelineScale } from './components/TimelineScale';
import { TimelineSetting } from './components/TimelineSetting';
import { KeyEditor } from './features/KeyEditor';
import { KeyChannelList } from './features/KeyEditor/components/KeyChannelList';
import { KeyEditorProvider } from './features/KeyEditor/providers/KeyEditorProvider';
import style from './index.module.scss';
import { TimelineProvider } from './providers/TimelineProvider';


export const Timeline = () => {

	return <TimelineProvider>
		<KeyEditorProvider>
			<div className={style.timeline}>
				<div className={style.inner}>
					<div className={style.setting}>
						<TimelineSetting />
					</div>
					<div className={style.channels}>
						<KeyChannelList />
					</div>
					<div className={style.content} >
						<TimelineCanvas />
						<TimelineCursor />
						<TimelineControls>
							<KeyEditor />
							<TimelineLoop />
						</TimelineControls>
						<TimelineScale />
					</div>
				</div>
			</div>
		</KeyEditorProvider>
	</TimelineProvider>;

};
