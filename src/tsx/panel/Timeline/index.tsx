import { TimelineContext, useTimeline } from './hooks/useTimeline';
import style from './index.module.scss';
import { TimelineCanvas } from './TimelineCanvas';
import { TimelineControls } from './TimelineControls';
import { TimelineCursor } from './TimelineCursor';
import { TimelineLoop } from './TimelineLoop';
import { TimelineScale } from './TimelineScale';
import { TimelineSetting } from './TimelineSetting';

import { useOREngineGUI } from '~/tsx/components/OREngineGUI';

export const Timeline = () => {

	const { gui } = useOREngineGUI();
	const timelineContext = useTimeline( gui );

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
