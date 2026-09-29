import React, { useCallback, useRef } from 'react';

import { trackPointerDrag } from 'uipower';

import { useTimeline } from '../../hooks/useTimeline';
import { useViewWheel } from '../../hooks/useViewWheel';
import { dragZoomFactor, hasZoomModifier } from '../../lib/ViewGesture';

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

	// 押しているボタン。押している間は wheel での移動を止める
	const pointerDownButtonRef = useRef<number | null>( null );

	// 左ボタンで押している間、ポインタの位置の時刻に合わせる
	const onPointerMove = useCallback( ( e: PointerEvent ) => {

		const elmWidth = elmRef.current && elmRef.current.clientWidth || 1;

		if ( pointerDownButtonRef.current == 0 && setFrame && getFrameViewPort && elmBoundingRectRef.current ) {

			const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / elmWidth;

			setFrame( getFrameViewPort( pointerX ) );

		}

	}, [ setFrame, getFrameViewPort ] );

	// 中ボタンのドラッグで横にパンし、Ctrl（Cmd）なら横に拡大縮小する。ずれで動かすので、画面端で止まらないよう Pointer Lock を取る
	const trackViewDrag = useCallback( ( e: React.PointerEvent<HTMLElement>, pointerX: number ) => {

		const elmWidth = e.currentTarget.clientWidth || 1;
		const startCenterFrame = ( viewPortRef.current[ 2 ] + viewPortRef.current[ 0 ] ) / 2;

		// 拡大縮小しても動かない位置（幅に対する 0〜1）は押した位置
		const zoomDrag = hasZoomModifier( e );
		let lastDx = 0;

		trackPointerDrag( e, {
			lock: true,
			onMove: ( dx ) => {

				if ( zoomDrag ) {

					zoom( dragZoomFactor( lastDx - dx ), pointerX );
					lastDx = dx;

					return;

				}

				setViewPortCenter( startCenterFrame - dx / elmWidth * viewPortRangeRef.current[ 0 ] );

			},
			onEnd: () => {

				pointerDownButtonRef.current = null;

			},
		} );

	}, [ zoom, setViewPortCenter ] );

	const onPointerDown = useCallback( ( e: React.PointerEvent<HTMLElement> ) => {

		pointerDownButtonRef.current = e.button;

		elmBoundingRectRef.current = e.currentTarget.getBoundingClientRect();

		const pointerX = ( e.clientX - elmBoundingRectRef.current.left ) / e.currentTarget.clientWidth;

		if ( e.button == 1 ) {

			trackViewDrag( e, pointerX );

			return;

		}

		if ( e.button == 0 && setFrame && getFrameViewPort ) {

			setFrame( getFrameViewPort( pointerX ) );

		}

		window.addEventListener( 'pointermove', onPointerMove );

		const onPointerUp = () => {

			pointerDownButtonRef.current = null;
			window.removeEventListener( 'pointermove', onPointerMove );
			window.removeEventListener( "pointerup", onPointerUp );

		};

		window.addEventListener( "pointerup", onPointerUp );

	}, [ getFrameViewPort, setFrame, onPointerMove, trackViewDrag ] );

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
