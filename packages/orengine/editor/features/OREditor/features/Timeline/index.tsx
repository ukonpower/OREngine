import { TimelineCanvas } from './components/TimelineCanvas';
import { TimelineControls } from './components/TimelineControls';
import { TimelineCursor } from './components/TimelineCursor';
import { TimelineLoop } from './components/TimelineLoop';
import { TimelineScale } from './components/TimelineScale';
import { TimelineSetting } from './components/TimelineSetting';
import style from './index.module.scss';
import { TimelineProvider } from './providers/TimelineProvider';


export const Timeline = () => {

	return <TimelineProvider>
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
	</TimelineProvider>;

};
