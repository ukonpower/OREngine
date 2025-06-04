import { useTimeline } from '../../../../hooks/useTimeline';

import style from './index.module.scss';

export const TimelineCursor = () => {

	const { viewPort, framePlay } = useTimeline();

	if ( ! viewPort || ! framePlay ) return null;

	const rangeWidth = viewPort[ 2 ] - viewPort[ 0 ];
	const left = ( framePlay.current - viewPort[ 0 ] ) / rangeWidth;

	return <div className={style.cursor} style={{ left: left * 100 + "%" }}>
		<div className={style.frame}>
			{/* {Math.floor( framePlay.current )} */}
		</div>
	</div>;

};
