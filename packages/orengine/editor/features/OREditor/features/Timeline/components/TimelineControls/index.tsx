import React, { useCallback, useRef } from 'react';

import { useTimeline } from '../../hooks/useTimeline';
import { useViewWheel } from '../../hooks/useViewWheel';
import { dragZoomFactor } from '../../lib/ViewGesture';

import style from './index.module.scss';

export const TimelineControls: React.FC<{children?: React.ReactNode}> = ( props ) => {

	const { viewPort, setCurrentFrame: setFrame, getFrameViewPort, zoom, scroll, setViewPortCenter } = useTimeline();

	const viewPortRef = useRef( [ 0, 0, 0, 0 ] );
	const viewPortRangeRef = useRef( [ 0, 0 ] );

	if ( viewPort ) {

		viewPortRef.current = viewPort;
		viewPortRangeRef.current = [ viewPort[ 2 ] - viewPort[ 0 ], viewPort[ 3 ] - viewPort[ 1 ] ];

	}

	const elmRef = useRef<HTMLDivElement>( null );
	const elmBoundingRectRef = useRef<DOMRect | null>( null );

	// pointer

	const pointerDownButtonRef = useRef<number | null>( null );
	const pointerDownPosRef = useRef<[number, number] | null>( null );
	const pointerDownCenterFrameRef = useRef<number | null>( null );

	// Ctrl+中ボタンのドラッグ（横の拡大縮小）の、拡大縮小しても動かない位置（幅に対する 0〜1）と、前回までに反映したずれ（px）
	const zoomDragRef = useRef<{ anchor: number, lastDx: number } | null>( null );

	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		const elmWidth = elmRef.current && elmRef.current.clientWidth || 1;

		if ( pointerDownButtonRef.current == 0 ) {

			if ( setFrame && getFrameViewPort && elmBoundingRectRef.current ) {

				const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / elmWidth;

				setFrame( getFrameViewPort( pointerX ) );

			}

		} else if ( pointerDownButtonRef.current == 1 && pointerDownPosRef.current ) {

			const dx = e.clientX - pointerDownPosRef.current[ 0 ];
			const zoomDrag = zoomDragRef.current;

			if ( zoomDrag ) {

				zoom( dragZoomFactor( zoomDrag.lastDx - dx ), zoomDrag.anchor );
				zoomDrag.lastDx = dx;

			} else if ( pointerDownCenterFrameRef.current !== null ) {

				const movement = - dx / elmWidth * viewPortRangeRef.current[ 0 ];

				setViewPortCenter( pointerDownCenterFrameRef.current + movement );

			}

		}

	}, [ setFrame, getFrameViewPort, setViewPortCenter, zoom ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		pointerDownButtonRef.current = e.button;
		pointerDownCenterFrameRef.current = ( viewPortRef.current[ 2 ] + viewPortRef.current[ 0 ] ) / 2;
		pointerDownPosRef.current = [ e.clientX, e.clientY ];

		elmBoundingRectRef.current = e.currentTarget.getBoundingClientRect();

		const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / e.currentTarget.clientWidth;

		if ( pointerDownButtonRef.current == 0 && setFrame && getFrameViewPort ) {

			setFrame( getFrameViewPort( pointerX ) );

		}

		zoomDragRef.current = null;

		if ( e.button == 1 && e.ctrlKey ) zoomDragRef.current = { anchor: pointerX, lastDx: 0 };

		window.addEventListener( 'pointermove', onPointerMove );

		const onPointerUp = () => {

			pointerDownPosRef.current = null;
			pointerDownButtonRef.current = null;
			pointerDownCenterFrameRef.current = null;
			zoomDragRef.current = null;
			window.removeEventListener( 'pointermove', onPointerMove );

		};

		window.addEventListener( "pointerup", onPointerUp );

		return () => {

			window.removeEventListener( "pointerup", onPointerUp );
			window.removeEventListener( 'pointermove', onPointerMove );

		};

	}, [ getFrameViewPort, setFrame, onPointerMove ] );

	// wheel。横（時刻）の軸だけを動かす。縦はカーブ表示・キー表示が同じ wheel を先に受けて動かす

	useViewWheel( elmRef, ( gesture, e ) => {

		e.preventDefault();

		const elm = elmRef.current;

		if ( pointerDownButtonRef.current !== null || ! elm ) return;

		// キーの印の上でも同じ速さで動くよう、イベントの来た要素ではなくタイムライン全体の幅で割る
		const rect = elm.getBoundingClientRect();
		const width = Math.max( 1, rect.width );

		if ( gesture.type == "pan" ) {

			if ( gesture.x != 0 ) scroll( gesture.x / width );

		} else if ( gesture.x != 1 ) {

			zoom( gesture.x, ( e.clientX - rect.left ) / width );

		}

	} );

	if ( ! viewPort ) return null;

	return <div className={style.controls} onPointerDown={onPointerDown} ref={elmRef}>
		{props.children}
	</div>;

};
