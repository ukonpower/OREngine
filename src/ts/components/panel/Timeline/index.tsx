import { useContext } from 'react';

import { EditorContext } from '../../gl/useEditor';

import { TimelineContext, useTimeline } from './hooks/useTimeline';
import style from './index.module.scss';
import { TimelineCanvas } from './TimelineCanvas';
import { TimelineControls } from './TimelineControls';
import { TimelineCursor } from './TimelineCursor';
import { TimelineScale } from './TimelineScale';
import { TimelineSetting } from './TimelineSetting';


export const Timeline = () => {

	const { glEditor } = useContext( EditorContext );
	const timelineContext = useTimeline( glEditor );

	return <TimelineContext.Provider value={timelineContext}>
		<div className={style.timeline}>
			<div className={style.inner}>
				<div className={style.setting}>
					<TimelineSetting />
				</div>
				<div className={style.content} >
					<TimelineCanvas />
					<TimelineCursor />
					<TimelineControls />
					<TimelineScale />
				</div>
			</div>
		</div>
	</TimelineContext.Provider>;

};
