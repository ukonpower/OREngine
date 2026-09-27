import { KeyframeIcon } from 'uipower';

import { useTimeline } from '../../../../hooks/useTimeline';
import { useKeyEditor } from '../../hooks/useKeyEditor';
import { buildMarks } from '../../lib/KeyChannels';
import { isAllSelected, readRefs } from '../../lib/KeySelection';
import { trackPointerDrag } from '../../lib/PointerDrag';

import style from './index.module.scss';

// 表示の範囲の外でも、左右にこれだけ（範囲の幅に対する割合）はみ出した印までは置いておく（ドラッグ中に端で消えないように）
const OUTSIDE_MARGIN = 0.05;

// キー表示（ドープシート）。行ごとに、その行のカーブのキーを時刻の位置へ並べる。
// キーを押して選ぶ・ドラッグで動かす。何もない所の左クリックはタイムラインの時刻合わせに任せる（矩形選択は B のときだけ KeyEditor が受ける）
export const KeyDopeSheet = () => {

	const { viewPort } = useTimeline();
	const { curves, visibleChannels, selection, scrollTop, pressKeys, select, beginDrag } = useKeyEditor();

	const range = viewPort[ 2 ] - viewPort[ 0 ];

	const onPointerDown = ( e: React.PointerEvent<HTMLDivElement> ) => {

		// 中ボタン（パン）・右ボタン（メニュー）はタイムラインの操作に任せる
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

	return <div className={style.dopeSheet} onPointerDown={onPointerDown}>
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
