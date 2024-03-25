import { useContext } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineCursor = () => {

	const { viewPort, timeline } = useContext( TimelineContext );

	if ( ! viewPort || ! timeline ) return null;

	const rangeWidth = viewPort[ 2 ] - viewPort[ 0 ];
	const left = ( timeline.currentFrame - viewPort[ 0 ] ) / rangeWidth;

	return <div className={style.cursor} style={{ left: left * 100 + "%" }}>
		<div className={style.frame}>
			{Math.floor( timeline.currentFrame )}
		</div>
	</div>;

};
