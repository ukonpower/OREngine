import { useRef } from 'react';

import { KeyframeIcon } from 'uipower';

import { useTimeline } from '../../../../hooks/useTimeline';
import { useViewWheel } from '../../../../hooks/useViewWheel';
import { hasZoomModifier } from '../../../../lib/ViewGesture';
import { useKeyEditor } from '../../hooks/useKeyEditor';
import { buildMarks } from '../../lib/KeyChannels';
import { isAllSelected, readRefs } from '../../lib/KeySelection';
import { trackPointerDrag } from '../../lib/PointerDrag';

import style from './index.module.scss';

// 表示の範囲の外でも、左右にこれだけ（範囲の幅に対する割合）はみ出した印までは置いておく（ドラッグ中に端で消えないように）
const OUTSIDE_MARGIN = 0.05;

// キー表示（ドープシート）。行ごとに、その行のカーブのキーを時刻の位置へ並べる。
// キーを押して選ぶ・ドラッグで動かす。何もない所の左クリックはタイムラインの時刻合わせに任せる（矩形選択は B のときだけ KeyEditor が受ける）。
// wheel と中ボタンのドラッグは、縦を左のチャンネル一覧のスクロールで動かす（横は同じ操作を親の TimelineControls が動かす）。
// 縦の拡大縮小は無いので、Ctrl+2本指の縦の量は時刻の拡大縮小に回す
export const KeyDopeSheet = () => {

	const { viewPort, zoom } = useTimeline();
	const { curves, visibleChannels, selection, scrollTop, channelListRef, pressKeys, select, beginDrag } = useKeyEditor();

	const rootRef = useRef<HTMLDivElement>( null );

	useViewWheel( rootRef, ( gesture, e ) => {

		const list = channelListRef.current;
		const root = rootRef.current;

		if ( gesture.type == "pan" ) {

			if ( list ) list.scrollTop += gesture.y;

		} else if ( ! gesture.linked && gesture.y != 1 && root ) {

			// 縦横そろえた拡大縮小（ホイール・ピンチ）の縦は、横と同じ倍率なので足すと二重になる
			const rect = root.getBoundingClientRect();

			zoom( gesture.y, ( e.clientX - rect.left ) / Math.max( 1, rect.width ) );

		}

	} );

	const range = viewPort[ 2 ] - viewPort[ 0 ];

	const onPointerDown = ( e: React.PointerEvent<HTMLDivElement> ) => {

		const list = channelListRef.current;

		// 中ボタンのドラッグで縦にスクロールする。Ctrl・Cmd（横の拡大縮小）と横のパンは親の TimelineControls に任せるので伝播は止めない
		if ( e.button == 1 && ! hasZoomModifier( e ) && list ) {

			const startScrollTop = list.scrollTop;

			trackPointerDrag( { clientX: e.clientX, clientY: e.clientY }, {
				onMove: ( _dx, dy ) => {

					list.scrollTop = startScrollTop - dy;

				},
				onEnd: () => {},
			} );

			return;

		}

		// 右ボタン（メニュー）はタイムラインの操作に任せる
		if ( e.button != 0 ) return;

		const refs = readRefs( e.target );

		// 何もない所は、親の TimelineControls が時刻を合わせる（選択は外さない）
		if ( ! refs ) return;

		// タイムラインの時刻合わせ（親の TimelineControls）へ伝えない
		e.stopPropagation();

		const shift = e.shiftKey;
		const wasSelected = pressKeys( refs, shift );

		let drag: ReturnType<typeof beginDrag> = null;
		let started = false;

		trackPointerDrag( { clientX: e.clientX, clientY: e.clientY }, {
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
	</div>;

};
