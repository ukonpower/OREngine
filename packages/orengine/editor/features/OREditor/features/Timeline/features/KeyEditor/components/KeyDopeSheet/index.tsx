import { useRef, useState } from 'react';

import { KeyframeIcon } from 'uipower';

import { useTimeline } from '../../../../hooks/useTimeline';
import { useKeyEditor } from '../../hooks/useKeyEditor';
import { buildMarks } from '../../lib/KeyChannels';
import { isAllSelected, readRefs, readRefsInRect } from '../../lib/KeySelection';
import { dragRect, trackPointerDrag } from '../../lib/PointerDrag';

import style from './index.module.scss';

type Box = { left: number, top: number, width: number, height: number };

// 表示の範囲の外でも、左右にこれだけ（範囲の幅に対する割合）はみ出した印までは置いておく（ドラッグ中に端で消えないように）
const OUTSIDE_MARGIN = 0.05;

// キー表示（ドープシート）。行ごとに、その行のカーブのキーを時刻の位置へ並べる。
// キーを押して選ぶ・ドラッグで動かす、空いた所をドラッグで矩形選択、クリックで選択を外して時刻を合わせる
export const KeyDopeSheet = () => {

	const { viewPort, setCurrentFrame, getFrameViewPort } = useTimeline();
	const { curves, visibleChannels, selection, scrollTop, pressKeys, selectRefs, select, beginMove } = useKeyEditor();

	const rootRef = useRef<HTMLDivElement>( null );
	const [ box, setBox ] = useState<Box | null>( null );

	const range = viewPort[ 2 ] - viewPort[ 0 ];

	const onPointerDown = ( e: React.PointerEvent<HTMLDivElement> ) => {

		// 中ボタン（パン）・右ボタン（メニュー）はタイムラインの操作に任せる
		if ( e.button != 0 ) return;

		// タイムラインの時刻合わせ（親の TimelineControls）へ伝えない
		e.stopPropagation();

		const root = rootRef.current;

		if ( ! root ) return;

		const rect = root.getBoundingClientRect();
		const refs = readRefs( e.target );
		const shift = e.shiftKey;
		const start = { clientX: e.clientX, clientY: e.clientY };

		if ( refs ) {

			const wasSelected = pressKeys( refs, shift );

			let move: ReturnType<typeof beginMove> | null = null;

			trackPointerDrag( start, {
				onMove: ( dx ) => {

					if ( ! move ) move = beginMove( null );

					move.move( { x: dx / rect.width * range, y: 0 } );

				},
				onEnd: () => {

					if ( move ) {

						move.end();

					} else if ( ! shift && wasSelected ) {

						// 複数選んだ中の1つをドラッグせずにクリックしたら、それだけを選び直す
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

	return <div className={style.dopeSheet} ref={rootRef} onPointerDown={onPointerDown}>
		<div className={style.rows} style={{ transform: `translateY(${- scrollTop}px)` }}>
			{visibleChannels.map( ( channel ) => {

				const event = channel.kind == "event";

				return <div key={channel.id} className={style.row} data-depth={channel.depth}>
					{buildMarks( curves, channel.curveIds ).map( ( mark ) => {

						const position = ( mark.frame - viewPort[ 0 ] ) / range;

						if ( position < - OUTSIDE_MARGIN || position > 1 + OUTSIDE_MARGIN ) return null;

						return <div
							key={mark.frame}
							className={style.key}
							data-refs={mark.refs.join( " " )}
							data-selected={isAllSelected( selection, mark.refs )}
							data-event={event}
							style={{ left: position * 100 + "%" }}
						>
							{! event && <KeyframeIcon size={10} />}
						</div>;

					} )}
				</div>;

			} )}
		</div>
		{box && <div className={style.box} style={box} />}
	</div>;

};
