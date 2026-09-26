import { useMemo, useRef, useState } from 'react';

import { type KeyFrameHandleSide } from 'orengine/editor';

import { useTimeline } from '../../../../hooks/useTimeline';
import { useElementSize } from '../../hooks/useElementSize';
import { useKeyEditor } from '../../hooks/useKeyEditor';
import { curveColor, curvePath, fitValueRange, roundToPixel, valueTicks, type ValueRange } from '../../lib/CurveGraph';
import { getCurveKeys } from '../../lib/KeyChannels';
import { keyRef, readRefs, readRefsInRect } from '../../lib/KeySelection';
import { dragRect, trackPointerDrag } from '../../lib/PointerDrag';

import style from './index.module.scss';

type Box = { left: number, top: number, width: number, height: number };

type HandlePoint = {
	curveId: string;
	index: number;
	side: KeyFrameHandleSide;
	x: number;
	y: number;
	keyX: number;
	keyY: number;
};

// ハンドルの点から、どのカーブの何番のキーのどちら側かを読む
const readHandle = ( target: EventTarget | null ) => {

	if ( ! ( target instanceof Element ) ) return null;

	const element = target.closest( "[data-side]" );

	if ( ! element ) return null;

	return {
		curveId: element.getAttribute( "data-curve" ) || "",
		index: Number( element.getAttribute( "data-index" ) ),
		side: element.getAttribute( "data-side" ) as KeyFrameHandleSide,
	};

};

// カーブ表示（グラフエディタ）。カーブの生の値（倍率・足し算をかける前）を、再生と同じ評価で線にする。
// 選んだキーのハンドルを出し、キー・ハンドルをドラッグで動かせる。値の範囲は表示するカーブに合わせる
export const KeyCurveGraph = () => {

	const { viewPort, setCurrentFrame, getFrameViewPort } = useTimeline();
	const { curves, graphCurves, selection, pressKeys, selectRefs, select, beginMove, beginHandleMove } = useKeyEditor();

	const rootRef = useRef<HTMLDivElement>( null );
	const { width, height } = useElementSize( rootRef );
	const [ box, setBox ] = useState<Box | null>( null );

	// ドラッグ中は値の範囲を止めておく。合わせ直すと、掴んだキーがポインタから逃げていく
	const [ frozenRange, setFrozenRange ] = useState<ValueRange | null>( null );

	const curveIds: string[] = [];

	for ( const graphCurve of graphCurves ) {

		curveIds.push( graphCurve.id );

	}

	let range = fitValueRange( curves, curveIds );

	if ( frozenRange ) range = frozenRange;

	const frameRange = viewPort[ 2 ] - viewPort[ 0 ];
	const framePerPx = frameRange / Math.max( 1, width );
	const valuePerPx = ( range.max - range.min ) / Math.max( 1, height );

	const toX = ( frame: number ) => ( frame - viewPort[ 0 ] ) / framePerPx;
	const toY = ( value: number ) => ( range.max - value ) / valuePerPx;

	// 再生中はタイムラインの時刻が毎フレーム変わって描き直されるので、線は表示の範囲とカーブが変わったときだけ取り直す
	const rangeMax = range.max;

	const paths = useMemo( () => {

		const result: { id: string, element: number | null, d: string }[] = [];
		const toPathFrame = ( x: number ) => viewPort[ 0 ] + x * framePerPx;
		const toPathY = ( value: number ) => ( rangeMax - value ) / valuePerPx;

		for ( const graphCurve of graphCurves ) {

			result.push( { id: graphCurve.id, element: graphCurve.element, d: curvePath( curves[ graphCurve.id ], toPathFrame, toPathY, width ) } );

		}

		return result;

	}, [ graphCurves, curves, viewPort, framePerPx, valuePerPx, rangeMax, width ] );

	/*-------------------------------
		Pointer
	-------------------------------*/

	const onPointerDown = ( e: React.PointerEvent<HTMLDivElement> ) => {

		if ( e.button != 0 ) return;

		e.stopPropagation();

		const root = rootRef.current;

		if ( ! root ) return;

		const rect = root.getBoundingClientRect();
		const shift = e.shiftKey;
		const start = { clientX: e.clientX, clientY: e.clientY };
		const handle = readHandle( e.target );
		const refs = readRefs( e.target );

		// 押した時点の目盛りでずれを値に直す
		const pressFramePerPx = framePerPx;
		const pressValuePerPx = valuePerPx;

		if ( handle ) {

			const key = getCurveKeys( curves[ handle.curveId ] )[ handle.index ];

			let origin = key.handleRight;

			if ( handle.side == "left" ) origin = key.handleLeft;

			let move: ReturnType<typeof beginHandleMove> | null = null;

			setFrozenRange( range );

			trackPointerDrag( start, {
				onMove: ( dx, dy ) => {

					if ( ! move ) move = beginHandleMove( handle.curveId, handle.index, handle.side );

					move.move( {
						x: roundToPixel( origin.x + dx * pressFramePerPx, pressFramePerPx ),
						y: roundToPixel( origin.y - dy * pressValuePerPx, pressValuePerPx ),
					} );

				},
				onEnd: () => {

					if ( move ) move.end();

					setFrozenRange( null );

				},
			} );

			return;

		}

		if ( refs ) {

			const wasSelected = pressKeys( refs, shift );

			let move: ReturnType<typeof beginMove> | null = null;

			setFrozenRange( range );

			trackPointerDrag( start, {
				onMove: ( dx, dy ) => {

					if ( ! move ) move = beginMove( new Set( curveIds ) );

					move.move( { x: dx * pressFramePerPx, y: - dy * pressValuePerPx }, ( value ) => roundToPixel( value, pressValuePerPx ) );

				},
				onEnd: () => {

					setFrozenRange( null );

					if ( move ) {

						move.end();

					} else if ( ! shift && wasSelected ) {

						select( new Set( refs ) );

					}

				},
			} );

			return;

		}

		trackPointerDrag( start, {
			onMove: ( _dx, _dy, moveEvent ) => {

				const area = dragRect( start, moveEvent );

				setBox( { left: area.left - rect.left, top: area.top - rect.top, width: area.right - area.left, height: area.bottom - area.top } );

			},
			onEnd: ( dragged, upEvent ) => {

				setBox( null );

				if ( dragged ) {

					selectRefs( readRefsInRect( root, dragRect( start, upEvent ) ), shift );

					return;

				}

				if ( ! shift ) select( new Set() );

				setCurrentFrame( getFrameViewPort( ( start.clientX - rect.left ) / rect.width ) );

			},
		} );

	};

	/*-------------------------------
		Points
	-------------------------------*/

	const keyPoints: { ref: string, x: number, y: number }[] = [];
	const handlePoints: HandlePoint[] = [];
	const sharedLabels: { id: string, x: number, y: number, text: string }[] = [];

	for ( const graphCurve of graphCurves ) {

		const keys = getCurveKeys( curves[ graphCurve.id ] );

		for ( let i = 0; i < keys.length; i ++ ) {

			const key = keys[ i ];
			const ref = keyRef( graphCurve.id, i );
			const x = toX( key.coordinate.x );
			const y = toY( key.coordinate.y );

			if ( x < 0 || x > width ) continue;

			keyPoints.push( { ref, x, y } );

			if ( ! selection.has( ref ) ) continue;

			// ハンドルは Bezier の区間に効いている側だけを出す
			if ( i > 0 && keys[ i - 1 ].interpolation == "BEZIER" ) {

				handlePoints.push( { curveId: graphCurve.id, index: i, side: "left", x: toX( key.handleLeft.x ), y: toY( key.handleLeft.y ), keyX: x, keyY: y } );

			}

			if ( key.interpolation == "BEZIER" && i < keys.length - 1 ) {

				handlePoints.push( { curveId: graphCurve.id, index: i, side: "right", x: toX( key.handleRight.x ), y: toY( key.handleRight.y ), keyX: x, keyY: y } );

			}

		}

		if ( graphCurve.shared && keys.length > 0 ) {

			sharedLabels.push( {
				id: graphCurve.id,
				x: Math.max( 0, toX( keys[ 0 ].coordinate.x ) ),
				y: toY( keys[ 0 ].coordinate.y ),
				text: `⇄ ${graphCurve.shared.name} (${graphCurve.shared.count})`,
			} );

		}

	}

	const ticks = valueTicks( range, height );

	return <div className={style.graph} ref={rootRef} onPointerDown={onPointerDown}>
		{width > 0 && <svg className={style.svg} width={width} height={height}>
			{ticks.map( ( value ) => <line key={value} className={style.tick} x1={0} x2={width} y1={toY( value )} y2={toY( value )} /> )}
			{paths.map( ( path ) => <path
				key={path.id}
				className={style.curve}
				style={{ stroke: curveColor( path.element ) }}
				d={path.d}
			/> )}
			{handlePoints.map( ( point ) => <line
				key={point.curveId + point.index + point.side}
				className={style.handleLine}
				x1={point.keyX}
				y1={point.keyY}
				x2={point.x}
				y2={point.y}
			/> )}
		</svg>}
		{ticks.map( ( value ) => <div key={value} className={style.tickLabel} style={{ top: toY( value ) }}>{value}</div> )}
		{sharedLabels.map( ( label ) => <div key={label.id} className={style.sharedLabel} style={{ left: label.x, top: label.y }}>{label.text}</div> )}
		{keyPoints.map( ( point ) => <div
			key={point.ref}
			className={style.point}
			data-refs={point.ref}
			data-selected={selection.has( point.ref )}
			style={{ left: point.x, top: point.y }}
		/> )}
		{handlePoints.map( ( point ) => <div
			key={point.curveId + point.index + point.side}
			className={style.handle}
			data-curve={point.curveId}
			data-index={point.index}
			data-side={point.side}
			style={{ left: point.x, top: point.y }}
		/> )}
		{box && <div className={style.box} style={box} />}
	</div>;

};
