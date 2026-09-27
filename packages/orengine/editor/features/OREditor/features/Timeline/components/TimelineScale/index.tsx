import { useTimeline } from '../../hooks/useTimeline';


import style from './index.module.scss';


const formatTime = ( sec: number ) => {

	const m = ( "00" + Math.floor( ( sec % 3600 ) / 60 ) ).slice( - 2 );
	const s = ( "00" + Math.floor( sec % 60 ) ).slice( - 2 );

	return `${m}:${s}`;

};

export const TimelineScale = () => {

	const { viewPort, viewPortScale } = useTimeline();

	if ( ! viewPort || ! viewPortScale ) return null;

	const elms = [];

	let frame = Math.ceil( viewPort[ 0 ] / viewPortScale ) * viewPortScale;
	let cnt = 0;

	while ( frame < viewPort[ 2 ] && cnt < 100 ) {

		const x = ( frame - viewPort[ 0 ] ) / ( viewPort[ 2 ] - viewPort[ 0 ] );
		// 時間軸の単位は timeline/fps によらず秒×60（Engine の frame.current = time.code * 60）
		const sec = frame / 60;

		elms.push(
			<div key={frame} className={style.scale_item} style={{ left: x * 100 + "%" }}>
				<div className={style.scale_item_frame}>
					{frame}
				</div>
				<div className={style.scale_item_time}>
					{formatTime( sec )}
				</div>
			</div>
		);

		frame += viewPortScale;
		cnt ++;

	}

	return <div className={style.scale}>
		<div className={style.band} />
		<div className={style.scale_inner}>
			{elms}
		</div>
	</div>;

};
