import { PointerEvent, useRef } from 'react';

import style from './index.module.scss';

export const TimelineLoopCursor: React.FC<{onMove?: ( movePx: number ) => void}> = ( { onMove } ) => {

	const pointerDownRef = useRef( false );

	return <div className={style.cursor}
		onPointerDown={e=> {

			if ( e.buttons == 1 ) {

				pointerDownRef.current = true;

				e.stopPropagation();

			}

		}}
		onPointerMove={( e: PointerEvent<HTMLDivElement> ) => {

			const elm = e.target as HTMLElement;

			if ( pointerDownRef.current === false ||	e.buttons != 1 ) return;

			elm.setPointerCapture( e.pointerId );

			if ( e.buttons == 1 ) {

				if ( onMove ) onMove( e.clientX );

			}

			e.nativeEvent.preventDefault();
			e.nativeEvent.stopPropagation();

		}}
		onPointerUp={()=> {

			pointerDownRef.current = false;

		}}
	></div>;

};
