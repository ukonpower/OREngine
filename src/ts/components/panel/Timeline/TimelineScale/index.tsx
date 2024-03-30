import { useContext } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineScale = () => {

	const { viewPort, viewPortScale, sceneFrame: timeline } = useContext( TimelineContext );

	if ( ! viewPort || ! viewPortScale ) return null;


	const elms = [];

	let frame = Math.ceil( viewPort[ 0 ] / viewPortScale ) * viewPortScale;
	let cnt = 0;

	while ( frame < viewPort[ 2 ] && cnt < 100 ) {

		const x = ( frame - viewPort[ 0 ] ) / ( viewPort[ 2 ] - viewPort[ 0 ] );

		elms.push(
			<div key={frame} className={style.scale_item} style={{ left: x * 100 + "%" }}>
				{frame}
			</div>
		);

		frame += viewPortScale;
		cnt ++;

	}

	return <div className={style.scale}>
		<div className={style.scale_inner}>
			{elms}
		</div>
	</div>;

};
