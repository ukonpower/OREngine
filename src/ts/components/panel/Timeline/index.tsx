import { useContext } from 'react';

import { TimelineContext, useTimeline } from './hooks/useTimeline';
import style from './index.module.scss';
import { TimelineCanvas } from './TimelineCanvas';
import { TimelineControls } from './TimelineControls';
import { TimelineCursor } from './TimelineCursor';
import { TimelineScale } from './TimelineScale';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const Timeline = () => {

	const { glEditor } = useContext( EditorContext );
	const timelineContext = useTimeline( glEditor );

	return <TimelineContext.Provider value={timelineContext}>
		<div className={style.timeline}>
			<div className={style.content}>
				<div className={style.content_inner} >
					<TimelineCanvas />
					<TimelineCursor />
					<TimelineControls />
					<div className={style.scale}>
						<TimelineScale />
					</div>
				</div>
			</div>
		</div>
	</TimelineContext.Provider>;

};
