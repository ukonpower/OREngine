import { TimelineContext, useTimeline } from './hooks/useTimeline';
import style from './index.module.scss';
import { TimelineCanvas } from './TimelineCanvas';
import { TimelineControls } from './TimelineControls';
import { TimelineCursor } from './TimelineCursor';
import { TimelineLoop } from './TimelineLoop';
import { TimelineScale } from './TimelineScale';
import { TimelineSetting } from './TimelineSetting';

import { useOREditor } from '~/tsx/gl/OREditor';


export const Timeline = () => {

	const { editor } = useOREditor();
	const timelineContext = useTimeline( editor );

	return <TimelineContext.Provider value={timelineContext}>
		<div className={style.timeline}>
			<div className={style.inner}>
				<div className={style.setting}>
					<TimelineSetting />
				</div>
				<div className={style.content} >
					<TimelineCanvas />
					<TimelineCursor />
					<TimelineControls>
						<TimelineLoop />
					</TimelineControls>
					<TimelineScale />
				</div>
			</div>
		</div>
	</TimelineContext.Provider>;

};
