import { useCallback, useContext, useEffect } from 'react';

import { TimelineContext, useTimeline } from './hooks/useTimeline';
import style from './index.module.scss';
import { TimelineCanvas } from './TimelineCanvas';
import { TimelineCursor } from './TimelineCursor';

import { EditorContext } from '~/ts/gl/React/useEditor';

export const Timeline = () => {

	const { glEditor } = useContext( EditorContext );

	const timelineContext = useTimeline( glEditor );

	const onMouseDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		const viewPort = timelineContext.viewPort;


		if ( glEditor && viewPort ) {

			const frame = viewPort[ 0 ] + ( viewPort[ 2 ] - viewPort[ 0 ] ) * ( e.clientX / e.currentTarget.clientWidth );

			glEditor.setFrame( frame );

		}

	}, [ glEditor, timelineContext.viewPort ] );

	return <TimelineContext.Provider value={timelineContext}>
		<div className={style.timeline}>
			<div className={style.content}>
				<div className={style.content_inner} onPointerDown={onMouseDown} onPointerMove={onMouseDown}>
					<TimelineCanvas />
					<TimelineCursor />
				</div>
			</div>
		</div>
	</TimelineContext.Provider>;

};
