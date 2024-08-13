import { useContext, useEffect, useRef } from 'react';

import { TimelineContext } from '../hooks/useTimeline';

import style from './index.module.scss';
import { TimelineLoopCursor } from './TimelineLoopCursor';

import { useWatchExportable } from '~/ts/components/gl/useWatchExportable';

export const TimelineLoop = () => {

	const { viewPort, framePlay, glEditor } = useContext( TimelineContext );

	const elmRef = useRef<HTMLDivElement>( null );

	useWatchExportable( glEditor, [
		"frameLoop/enabled",
		"frameLoop/start",
		"frameLoop/end",
	] );

	if ( glEditor === undefined ) return null;

	const enabled = glEditor.prop<boolean>( "frameLoop/enabled" );

	if ( enabled.value !== true ) return null;

	const start = glEditor.prop<number>( "frameLoop/start" );
	const end = glEditor.prop<number>( "frameLoop/end" );

	if ( ! viewPort || ! framePlay || start.value === undefined || end.value === undefined ) return null;

	const rangeWidth = viewPort[ 2 ] - viewPort[ 0 ];
	const startPos = ( start.value - viewPort[ 0 ] ) / rangeWidth;
	const endPos = ( end.value - viewPort[ 0 ] ) / rangeWidth;

	const calcFrame = ( elm: HTMLElement, pos: number ) => {

		const rect = elm.getBoundingClientRect();

		return ( pos - rect.x ) / rect.width * ( viewPort[ 2 ] - viewPort[ 0 ] ) + viewPort[ 0 ];

	};

	return <div className={style.timelineLoop} ref={elmRef}>
		<div className={style.timelineLoop_inner}>
			<div className={style.start} style={{ left: startPos * 100 + "%" }}>
				<TimelineLoopCursor onMove={( m ) => {

					if ( elmRef.current ) {

						start.set( calcFrame( elmRef.current, m ) );

					}

				}}/>
			</div>
			<div className={style.end} style={{ left: endPos * 100 + "%" }}>
				<TimelineLoopCursor onMove={( m ) => {

					if ( elmRef.current ) {

						end.set( calcFrame( elmRef.current, m ) );

					}

				}} />
			</div>
		</div>
	</div>;

};
