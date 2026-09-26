import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

// 同じ時刻とみなすキーの時刻の差（秒×60）。キーは timeline/fps のコマに揃えて打つので、コマの間隔より十分小さければよい
const TIME_TOLERANCE = 0.0001;

// Blender の自動ハンドルの長さの係数（calchandleNurb_intern の 2.5614）
const AUTO_HANDLE_SCALE = 2.5614;

// 自動ハンドルで、前後の区間の長さの比をここまでに抑える（Blender と同じ 5 倍）
const AUTO_HANDLE_MAX_RATIO = 5;

// 自動ハンドルの座標を丸めるときの、キーからのずれに対する有効桁数
const AUTO_HANDLE_DIGITS = 4;

// frame にあるキーの番号。無ければ -1
export const findKeyFrame = ( keyframes: MXP.FCurveKeyFrame[], frame: number ) => {

	for ( let i = 0; i < keyframes.length; i ++ ) {

		if ( Math.abs( keyframes[ i ].coordinate.x - frame ) < TIME_TOLERANCE ) return i;

	}

	return - 1;

};

// キー列の frame にキーを打つ。同じ時刻にキーがあれば、補間はそのままで値だけ置き換える。
// 打ったキーと前後のキーのハンドルを自動クランプで置き直す
export const setKeyFrame = ( k: MXP.KeyFrameData[], frame: number, value: number, interpolation: MXP.FCurveInterpolation ) => {

	const keyframes = MXP.decodeKeyFrames( k );

	let index = findKeyFrame( keyframes, frame );

	if ( index >= 0 ) {

		keyframes[ index ].coordinate = { x: keyframes[ index ].coordinate.x, y: value };

	} else {

		index = 0;

		while ( index < keyframes.length && keyframes[ index ].coordinate.x < frame ) {

			index ++;

		}

		keyframes.splice( index, 0, new MXP.FCurveKeyFrame( { x: frame, y: value }, undefined, undefined, interpolation ) );

	}

	recalcAutoHandles( keyframes, index - 1, index + 1 );

	return encodeKeyFrames( keyframes );

};

// キー列から frame のキーを消し、前後のキーのハンドルを置き直す。frame にキーが無ければ null
export const deleteKeyFrame = ( k: MXP.KeyFrameData[], frame: number ) => {

	const keyframes = MXP.decodeKeyFrames( k );

	const index = findKeyFrame( keyframes, frame );

	if ( index < 0 ) return null;

	keyframes.splice( index, 1 );

	recalcAutoHandles( keyframes, index - 1, index );

	return encodeKeyFrames( keyframes );

};

// FCurveKeyFrame の列を BLidge v2 形式のキー列にする（MXP.decodeKeyFrames の逆）。
// ハンドルは decodeKeyFrames が要素数で読み分けるのと同じ規則で、左は「自分か前のキーが Bezier」、右は「自分が Bezier」のときだけ書く
const encodeKeyFrames = ( keyframes: MXP.FCurveKeyFrame[] ) => {

	const k: MXP.KeyFrameData[] = [];

	let prevFrame = 0;
	let prevBezier = false;

	for ( const keyframe of keyframes ) {

		const bezier = keyframe.interpolation == "BEZIER";
		const values = [ keyframe.coordinate.x - prevFrame, keyframe.coordinate.y ];

		if ( bezier || prevBezier ) {

			values.push( keyframe.handleLeft.x, keyframe.handleLeft.y );

		}

		if ( bezier ) {

			values.push( keyframe.handleRight.x, keyframe.handleRight.y );

		}

		const code = MXP.KEYFRAME_INTERPOLATIONS.indexOf( keyframe.interpolation ) as MXP.KeyFrameInterpolationCode;

		k.push( [ code, values ] );

		prevFrame = keyframe.coordinate.x;
		prevBezier = bezier;

	}

	return k;

};

/*-------------------------------
	Auto Handle
-------------------------------*/

// from〜to 番のキーのハンドルを置き直す（範囲外の番号は飛ばす）。
// 自動ハンドルは前後のキーの座標だけで決まるので、キーを足し引きしたら前後1つずつを置き直せば足りる
const recalcAutoHandles = ( keyframes: MXP.FCurveKeyFrame[], from: number, to: number ) => {

	for ( let i = Math.max( 0, from ); i <= Math.min( keyframes.length - 1, to ); i ++ ) {

		recalcAutoHandle( keyframes, i );

	}

};

// i 番のキーのハンドルを Blender の自動クランプ（F-Curve のスムージング無し）で置き直す。
// 前後の区間の傾きを足した向きに伸ばし、山・谷と両端では水平にする（Blender の calchandleNurb_intern と同じ手順）
const recalcAutoHandle = ( keyframes: MXP.FCurveKeyFrame[], i: number ) => {

	const keyframe = keyframes[ i ];
	const key = keyframe.coordinate;
	const prevKeyFrame = keyframes[ i - 1 ];
	const nextKeyFrame = keyframes[ i + 1 ];

	// キーが1つだけなら補間に使われないので、長さ 0 にしておく
	if ( ! prevKeyFrame && ! nextKeyFrame ) {

		keyframe.handleLeft = { x: key.x, y: key.y };
		keyframe.handleRight = { x: key.x, y: key.y };

		return;

	}

	// 片側しか無いときは、ある側をキーの反対側へ映した点を仮の隣にする
	let prev: MTP.IVector2;
	let next: MTP.IVector2;

	if ( prevKeyFrame && nextKeyFrame ) {

		prev = prevKeyFrame.coordinate;
		next = nextKeyFrame.coordinate;

	} else if ( nextKeyFrame ) {

		next = nextKeyFrame.coordinate;
		prev = { x: 2 * key.x - next.x, y: 2 * key.y - next.y };

	} else {

		prev = prevKeyFrame.coordinate;
		next = { x: 2 * key.x - prev.x, y: 2 * key.y - prev.y };

	}

	let lengthPrev = key.x - prev.x;
	let lengthNext = next.x - key.x;

	// 同じ時刻のキーは作らないが、0 で割らないようにしておく
	if ( lengthPrev == 0 ) lengthPrev = 1;
	if ( lengthNext == 0 ) lengthNext = 1;

	// 前後の区間の傾きを足した向き。x はそれぞれ区間の長さで割るので 2 になる
	const directionX = ( next.x - key.x ) / lengthNext + ( key.x - prev.x ) / lengthPrev;
	const directionY = ( next.y - key.y ) / lengthNext + ( key.y - prev.y ) / lengthPrev;
	const length = directionX * AUTO_HANDLE_SCALE;

	// 片側の区間だけ極端に長いとき、その側のハンドルが伸びすぎないようにする
	if ( lengthPrev > AUTO_HANDLE_MAX_RATIO * lengthNext ) lengthPrev = AUTO_HANDLE_MAX_RATIO * lengthNext;
	if ( lengthNext > AUTO_HANDLE_MAX_RATIO * lengthPrev ) lengthNext = AUTO_HANDLE_MAX_RATIO * lengthPrev;

	const left = {
		x: key.x - directionX * lengthPrev / length,
		y: key.y - directionY * lengthPrev / length,
	};

	const right = {
		x: key.x + directionX * lengthNext / length,
		y: key.y + directionY * lengthNext / length,
	};

	if ( prevKeyFrame && nextKeyFrame ) {

		clampAutoHandle( prev, key, next, left, right );

	} else {

		// 両端は水平にする（Blender の既定の外挿「一定」のときと同じ）
		left.y = key.y;
		right.y = key.y;

	}

	keyframe.handleLeft = { x: roundHandle( left.x, key.x ), y: roundHandle( left.y, key.y ) };
	keyframe.handleRight = { x: roundHandle( right.x, key.x ), y: roundHandle( right.y, key.y ) };

};

// 自動ハンドルの座標を、キーからのずれに対して有効数字 AUTO_HANDLE_DIGITS 桁に丸める。
// 求めたままの座標は桁が長く、player に焼き込むシーン JSON が大きくなる（240 キーで圧縮後およそ 600B）。
// キーの座標は丸めないので、カーブは必ずキーを通る。水平なハンドルはキーと同じ値のまま残す
const roundHandle = ( value: number, origin: number ) => {

	const offset = Math.abs( value - origin );

	if ( offset == 0 ) return value;

	const digits = Math.max( 0, AUTO_HANDLE_DIGITS - 1 - Math.floor( Math.log10( offset ) ) );
	const scale = Math.pow( 10, digits );

	return Math.round( value * scale ) / scale;

};

// 山・谷ではハンドルを水平にし、それ以外ではハンドルが前後のキーの高さを越えないように抑える（自動クランプの「クランプ」）。
// 片側を抑えたら、反対側もキーを通る一直線に揃えて、キーの前後で傾きが折れないようにする
const clampAutoHandle = ( prev: MTP.IVector2, key: MTP.IVector2, next: MTP.IVector2, left: MTP.IVector2, right: MTP.IVector2 ) => {

	const prevDiff = prev.y - key.y;
	const nextDiff = next.y - key.y;

	if ( ( prevDiff <= 0 && nextDiff <= 0 ) || ( prevDiff >= 0 && nextDiff >= 0 ) ) {

		left.y = key.y;
		right.y = key.y;

		return;

	}

	let leftClamped = false;
	let rightClamped = false;

	if ( prevDiff <= 0 ) {

		// 上り
		if ( prev.y > left.y ) {

			left.y = prev.y;
			leftClamped = true;

		}

		if ( next.y < right.y ) {

			right.y = next.y;
			rightClamped = true;

		}

	} else {

		// 下り
		if ( prev.y < left.y ) {

			left.y = prev.y;
			leftClamped = true;

		}

		if ( next.y > right.y ) {

			right.y = next.y;
			rightClamped = true;

		}

	}

	if ( leftClamped ) {

		right.y = key.y + ( key.y - left.y ) / ( key.x - left.x ) * ( right.x - key.x );

	} else if ( rightClamped ) {

		left.y = key.y - ( right.y - key.y ) / ( right.x - key.x ) * ( key.x - left.x );

	}

};
