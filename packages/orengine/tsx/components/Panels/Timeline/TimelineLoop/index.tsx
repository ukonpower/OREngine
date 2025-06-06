import { useRef } from 'react';

import { useSerializableField } from '../../../../hooks/useSerializableProps';
import { useWatchSerializable } from '../../../../hooks/useWatchSerializable';
import { useTimeline } from '../../../../hooks/useTimeline';

import style from './index.module.scss';
import { TimelineLoopCursor } from './TimelineLoopCursor';


export const TimelineLoop = () => {

        const { viewPort, framePlay, glEditor } = useTimeline();

	const elmRef = useRef<HTMLDivElement>( null );

	useWatchSerializable( glEditor, [
		"frameLoop/enabled",
		"frameLoop/start",
		"frameLoop/end",
	] );

	const [ enabled ] = useSerializableField<boolean>( glEditor, "frameLoop/enabled" );
	const [ start, setStart ] = useSerializableField<number>( glEditor, "frameLoop/start" );
	const [ end, setEnd ] = useSerializableField<number>( glEditor, "frameLoop/end" );

	if ( enabled !== true ) return null;
	if ( ! viewPort || ! framePlay || start === undefined || end === undefined ) return null;

	const rangeWidth = viewPort[ 2 ] - viewPort[ 0 ];
	const startPos = ( start - viewPort[ 0 ] ) / rangeWidth;
	const endPos = ( end - viewPort[ 0 ] ) / rangeWidth;

	const calcFrame = ( elm: HTMLElement, pos: number ) => {

		const rect = elm.getBoundingClientRect();

		return ( pos - rect.x ) / rect.width * ( viewPort[ 2 ] - viewPort[ 0 ] ) + viewPort[ 0 ];

	};

	return <div className={style.timelineLoop} ref={elmRef}>
		<div className={style.timelineLoop_inner}>
			<div className={style.start} style={{ left: startPos * 100 + "%" }}>
				<TimelineLoopCursor onMove={( m ) => {

					if ( elmRef.current ) {

						if ( setStart ) {

							setStart( calcFrame( elmRef.current, m ) );

						}

					}

				}}/>
			</div>
			<div className={style.end} style={{ left: endPos * 100 + "%" }}>
				<TimelineLoopCursor onMove={( m ) => {

					if ( elmRef.current ) {

						if ( setEnd ) {

							setEnd( calcFrame( elmRef.current, m ) );

						}

					}

				}} />
			</div>
		</div>
	</div>;

};
