import type { EntityUpdateEvent } from '../../Entity';

// 2 つの時刻を同じとみなす幅（秒）。shot は 1/60 秒ずつ進めるので、それより十分小さくする
const TIME_EPSILON = 1e-4;

// offline のコマ（shot・書き出し）が、前のコマから時刻を飛ばしたか。
// 同じ時刻の描き直しと、timeDelta だけ進めたコマは続きとみなす。
// 飛んだときは、時間方向に積んだ履歴（環境マップの積算）が今の時刻の絵と関係なくなるので捨てる合図に使う
export const isOfflineTimeJump = ( prevTimeElapsed: number | undefined, event: EntityUpdateEvent ) => {

	if ( ! event.offline ) return false;

	// 最初のコマは捨てる履歴が無い
	if ( prevTimeElapsed === undefined ) return false;

	const step = event.timeElapsed - prevTimeElapsed;

	if ( Math.abs( step ) < TIME_EPSILON ) return false;

	if ( Math.abs( step - event.timeDelta ) < TIME_EPSILON ) return false;

	return true;

};
