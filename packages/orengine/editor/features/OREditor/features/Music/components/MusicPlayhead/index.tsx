import { useEffect, useState } from 'react';

import { useOREditor } from '../../../../hooks/useOREditor';

import style from './index.module.scss';

type MusicPlayheadProps = {
	bpm: number;
	viewStart: number;
	pxPerBeat: number;
	laneWidth: number;
};

// 今の再生位置の縦線。再生中は毎フレーム動くので、パネル全体ではなくこの部品だけが描き直す
export const MusicPlayhead = ( props: MusicPlayheadProps ) => {

	const { engine } = useOREditor();

	const [ frame, setFrame ] = useState( engine.frame.current );

	useEffect( () => {

		const onUpdate = () => {

			setFrame( engine.frame.current );

		};

		engine.on( "update/frame/play", onUpdate );

		return () => {

			engine.off( "update/frame/play", onUpdate );

		};

	}, [ engine ] );

	// タイムラインの時刻の単位は timeline/fps によらず秒×60
	const beat = frame / 60 * props.bpm / 60;
	const x = ( beat - props.viewStart ) * props.pxPerBeat;

	if ( x < 0 || x > props.laneWidth ) return null;

	return <div className={style.playhead} style={{ '--x': `${x}px` } as React.CSSProperties} />;

};
