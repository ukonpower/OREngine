import { useMemo, useRef } from 'react';

import { useTimeline } from '../../../../hooks/useTimeline';
import { useViewWheel } from '../../../../hooks/useViewWheel';
import { dragZoomFactor } from '../../../../lib/ViewGesture';
import { useElementSize } from '../../hooks/useElementSize';
import { useKeyEditor } from '../../hooks/useKeyEditor';
import { activeHandleSides, curveColor, curvePath, graphScale, valueTicks, zoomValueRange } from '../../lib/CurveGraph';
import { getCurveKeys } from '../../lib/KeyChannels';
import { handleRef, isHandleSelected, keyRef, readRefs } from '../../lib/KeySelection';
import { trackPointerDrag } from '../../lib/PointerDrag';

import style from './index.module.scss';

type HandlePoint = {
	ref: string;
	selected: boolean;
	x: number;
	y: number;
	keyX: number;
	keyY: number;
};

// 値の範囲の幅の下限。拡大しすぎて目盛り・座標の計算が崩れないようにする
const MIN_VALUE_RANGE = 1e-6;

// カーブ表示（グラフエディタ）。カーブの生の値（倍率・足し算をかける前）を、再生と同じ評価で線にする。
// 選んだキーとハンドルを持つキーのハンドルを出し、キー・ハンドルを押して選ぶ・ドラッグで動かす。
// 値の範囲は context が持ち、wheel と中ボタンのドラッグで縦を動かす（横は同じ操作を親の TimelineControls が動かす）
export const KeyCurveGraph = () => {

	const { viewPort } = useTimeline();
	const { curves, graphCurves, selection, valueRange, setValueRange, pressKeys, select, beginDrag } = useKeyEditor();

	const rootRef = useRef<HTMLDivElement>( null );
	const { width, height } = useElementSize( rootRef );

	const scale = graphScale( viewPort, valueRange, width, height );
	const { toX, toY } = scale;

	// 再生中はタイムラインの時刻が毎フレーム変わって描き直されるので、線は表示の範囲とカーブが変わったときだけ取り直す
	const paths = useMemo( () => {

		const result: { id: string, element: number | null, d: string }[] = [];
		const pathScale = graphScale( viewPort, valueRange, width, height );

		for ( const graphCurve of graphCurves ) {

			result.push( { id: graphCurve.id, element: graphCurve.element, d: curvePath( curves[ graphCurve.id ], pathScale.toFrame, pathScale.toY, width ) } );

		}

		return result;

	}, [ graphCurves, curves, viewPort, valueRange, width, height ] );

	// 値の範囲を scale 倍にする。position は拡大縮小しても動かない位置（高さに対する 0〜1）
	const zoomValue = ( scale: number, position: number ) => {

		setValueRange( ( current ) => {

			const center = current.max - position * ( current.max - current.min );
			const next = zoomValueRange( current, center, scale );

			if ( next.max - next.min < MIN_VALUE_RANGE ) return current;

			return next;

		} );

	};

	useViewWheel( rootRef, ( gesture, e ) => {

		const root = rootRef.current;

		if ( ! root ) return;

		const rect = root.getBoundingClientRect();
		const graphHeight = Math.max( 1, rect.height );

		if ( gesture.type == "pan" ) {

			if ( gesture.y == 0 ) return;

			// 下へのスクロールで、表示を下（小さい値）へ動かす
			setValueRange( ( current ) => {

				const delta = gesture.y * ( current.max - current.min ) / graphHeight;

				return { min: current.min - delta, max: current.max - delta };

			} );

		} else if ( gesture.y != 1 ) {

			zoomValue( gesture.y, ( e.clientY - rect.top ) / graphHeight );

		}

	} );

	/*-------------------------------
		Pointer
	-------------------------------*/

	const onPointerDown = ( e: React.PointerEvent<HTMLDivElement> ) => {

		const start = { clientX: e.clientX, clientY: e.clientY };

		if ( e.button == 1 ) {

			// 横は親の TimelineControls が動かすので、伝播は止めずにここでは縦だけを動かす。Ctrl なら拡大縮小
			const startRange = valueRange;
			const pressValuePerPx = scale.valuePerPx;
			const rect = e.currentTarget.getBoundingClientRect();
			const position = ( e.clientY - rect.top ) / Math.max( 1, rect.height );
			const zoomDrag = e.ctrlKey;
			let lastDy = 0;

			trackPointerDrag( start, {
				onMove: ( _dx, dy ) => {

					if ( zoomDrag ) {

						zoomValue( dragZoomFactor( dy - lastDy ), position );
						lastDy = dy;

						return;

					}

					setValueRange( { min: startRange.min + dy * pressValuePerPx, max: startRange.max + dy * pressValuePerPx } );

				},
				onEnd: () => {},
			} );

			return;

		}

		if ( e.button != 0 ) return;

		const refs = readRefs( e.target );

		// 何もない所は、親の TimelineControls が時刻を合わせる（選択は外さない）
		if ( ! refs ) return;

		e.stopPropagation();

		const shift = e.shiftKey;
		const wasSelected = pressKeys( refs, shift );

		let drag: ReturnType<typeof beginDrag> = null;
		let started = false;

		trackPointerDrag( start, {
			onMove: ( dx, dy ) => {

				if ( ! started ) {

					started = true;
					drag = beginDrag();

				}

				if ( drag ) drag.move( dx, dy );

			},
			onEnd: ( dragged ) => {

				if ( drag ) drag.end();

				// 複数選んだ中の1つをドラッグせずにクリックしたら、それだけを選び直す
				if ( ! dragged && ! shift && wasSelected ) select( new Set( refs ) );

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

			// ハンドルは Bezier の区間に効いている側だけを、キーかどちらかのハンドルを選んでいるときに出す
			const sides = activeHandleSides( keys, i );

			let showHandles = selection.has( ref );

			for ( const side of sides ) {

				if ( selection.has( handleRef( graphCurve.id, i, side ) ) ) showHandles = true;

			}

			if ( ! showHandles ) continue;

			for ( const side of sides ) {

				let handle = key.handleRight;

				if ( side == "left" ) handle = key.handleLeft;

				handlePoints.push( {
					ref: handleRef( graphCurve.id, i, side ),
					selected: isHandleSelected( selection, graphCurve.id, i, side ),
					x: toX( handle.x ),
					y: toY( handle.y ),
					keyX: x,
					keyY: y,
				} );

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

	const ticks = valueTicks( valueRange, height );

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
				key={point.ref}
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
			key={point.ref}
			className={style.handle}
			data-refs={point.ref}
			data-selected={point.selected}
			style={{ left: point.x, top: point.y }}
		/> )}
	</div>;

};
