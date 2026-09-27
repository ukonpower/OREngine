import { useRef } from 'react';

import { isAllSelected, trackPointerDrag } from 'orengine/editor';
import { KeyframeIcon } from 'uipower';

import { useTimeline } from '../../../../hooks/useTimeline';
import { useViewWheel } from '../../../../hooks/useViewWheel';
import { hasZoomModifier } from '../../../../lib/ViewGesture';
import { useKeyEditor } from '../../hooks/useKeyEditor';
import { buildMarks } from '../../lib/KeyChannels';

import style from './index.module.scss';

// 表示の範囲の外でも、左右にこれだけ（範囲の幅に対する割合）はみ出した印までは置いておく（ドラッグ中に端で消えないように）
const OUTSIDE_MARGIN = 0.05;

// キー表示（ドープシート）。行ごとに、その行のカーブのキーを時刻の位置へ並べる。
// キーの選択・ドラッグ（右ボタン）と矩形選択は KeyEditor が受け、左クリックはキーの上でもタイムラインの時刻合わせに任せる。
// wheel と中ボタンのドラッグは、縦を左のチャンネル一覧のスクロールで動かす（横は同じ操作を親の TimelineControls が動かす）。
// 縦の拡大縮小は無いので、Ctrl+2本指の縦の量は時刻の拡大縮小に回す
export const KeyDopeSheet = () => {

	const { viewPort, zoom } = useTimeline();
	const { curves, visibleChannels, selection, active, scrollTop, channelListRef } = useKeyEditor();

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
		if ( e.button != 1 || hasZoomModifier( e ) || ! list ) return;

		const startScrollTop = list.scrollTop;

		trackPointerDrag( { clientX: e.clientX, clientY: e.clientY }, {
			onMove: ( _dx, dy ) => {

				list.scrollTop = startScrollTop - dy;

			},
			onEnd: () => {},
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
							data-active={active != null && mark.refs.indexOf( active ) >= 0}
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
