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

// ハンドルの種類（Blender の5種）。CurveData の h にはこの並びの番号で書き、0 の自動クランプを既定にする
export type KeyFrameHandleType = "AUTO_CLAMPED" | "AUTO" | "VECTOR" | "ALIGNED" | "FREE";

export const KEYFRAME_HANDLE_TYPES: KeyFrameHandleType[] = [ "AUTO_CLAMPED", "AUTO", "VECTOR", "ALIGNED", "FREE" ];

// 編集するキー1つ。座標とハンドルは絶対座標（時刻は秒×60）
export type EditKey = {
	coordinate: MTP.IVector2;
	handleLeft: MTP.IVector2;
	handleRight: MTP.IVector2;
	interpolation: MXP.FCurveInterpolation;
	handleType: KeyFrameHandleType;
};

export type KeyFrameHandleSide = "left" | "right";

// frame にあるキーの番号。無ければ -1
export const findKeyFrame = ( keyframes: { coordinate: MTP.IVector2 }[], frame: number ) => {

	for ( let i = 0; i < keyframes.length; i ++ ) {

		if ( Math.abs( keyframes[ i ].coordinate.x - frame ) < TIME_TOLERANCE ) return i;

	}

	return - 1;

};

/*-------------------------------
	Decode / Encode
-------------------------------*/

// カーブを編集用のキーの列にする。自動・ベクトルのハンドルは種類に従って置き直す
// （Bezier でないキーはハンドルを書かないので、読んだだけでは欠けている）
export const decodeCurve = ( curve: MXP.CurveData | undefined ): EditKey[] => {

	const keys: EditKey[] = [];

	if ( ! curve ) return keys;

	const keyframes = MXP.decodeKeyFrames( curve.k );

	for ( let i = 0; i < keyframes.length; i ++ ) {

		const keyframe = keyframes[ i ];

		let handleType: KeyFrameHandleType = "AUTO_CLAMPED";

		if ( curve.h && KEYFRAME_HANDLE_TYPES[ curve.h[ i ] ] ) {

			handleType = KEYFRAME_HANDLE_TYPES[ curve.h[ i ] ];

		}

		// decodeKeyFrames は無いハンドルにキーの座標そのものを入れるので、写して別のものにしておく
		keys.push( {
			coordinate: { ...keyframe.coordinate },
			handleLeft: { ...keyframe.handleLeft },
			handleRight: { ...keyframe.handleRight },
			interpolation: keyframe.interpolation,
			handleType,
		} );

	}

	recalcHandles( keys );

	return keys;

};

// 編集したキーの列をカーブに戻す。name などキー以外はそのまま残し、ハンドルの種類がすべて既定なら h を書かない
export const encodeCurve = ( keys: EditKey[], base: MXP.CurveData | undefined ): MXP.CurveData => {

	const curve: MXP.CurveData = { ...base, k: encodeKeyFrames( keys ) };

	const h: number[] = [];
	let custom = false;

	for ( const key of keys ) {

		const code = KEYFRAME_HANDLE_TYPES.indexOf( key.handleType );

		if ( code != 0 ) custom = true;

		h.push( code );

	}

	if ( custom ) {

		curve.h = h;

	} else {

		delete curve.h;

	}

	return curve;

};

// EditKey の列を BLidge v2 形式のキー列にする（MXP.decodeKeyFrames の逆）。
// ハンドルは decodeKeyFrames が要素数で読み分けるのと同じ規則で、左は「自分か前のキーが Bezier」、右は「自分が Bezier」のときだけ書く
const encodeKeyFrames = ( keys: EditKey[] ) => {

	const k: MXP.KeyFrameData[] = [];

	let prevFrame = 0;
	let prevBezier = false;

	for ( const key of keys ) {

		const bezier = key.interpolation == "BEZIER";
		const values = [ key.coordinate.x - prevFrame, key.coordinate.y ];

		if ( bezier || prevBezier ) {

			values.push( key.handleLeft.x, key.handleLeft.y );

		}

		if ( bezier ) {

			values.push( key.handleRight.x, key.handleRight.y );

		}

		const code = MXP.KEYFRAME_INTERPOLATIONS.indexOf( key.interpolation ) as MXP.KeyFrameInterpolationCode;

		k.push( [ code, values ] );

		prevFrame = key.coordinate.x;
		prevBezier = bezier;

	}

	return k;

};

/*-------------------------------
	Insert / Delete (I / Alt+I)
-------------------------------*/

// カーブの frame にキーを打つ（カーブが無ければ作る）。同じ時刻にキーがあれば、補間とハンドルの種類はそのままで値だけ置き換える
export const setKeyFrame = ( curve: MXP.CurveData | undefined, frame: number, value: number, interpolation: MXP.FCurveInterpolation ) => {

	const keys = decodeCurve( curve );

	const index = findKeyFrame( keys, frame );

	if ( index >= 0 ) {

		moveKey( keys[ index ], keys[ index ].coordinate.x, value );

	} else {

		const point = { x: frame, y: value };

		keys.push( { coordinate: point, handleLeft: { ...point }, handleRight: { ...point }, interpolation, handleType: "AUTO_CLAMPED" } );

		sortKeys( keys );

	}

	recalcHandles( keys );

	return encodeCurve( keys, curve );

};

// カーブから frame のキーを消す。frame にキーが無ければ null
export const deleteKeyFrame = ( curve: MXP.CurveData, frame: number ) => {

	const keys = decodeCurve( curve );

	const index = findKeyFrame( keys, frame );

	if ( index < 0 ) return null;

	keys.splice( index, 1 );

	recalcHandles( keys );

	return encodeCurve( keys, curve );

};

/*-------------------------------
	Edit (Timeline)
-------------------------------*/

// indices 番のキーを消す
export const deleteKeys = ( curve: MXP.CurveData, indices: number[] ) => {

	const keys = decodeCurve( curve );
	const removes = new Set( indices );
	const rest: EditKey[] = [];

	for ( let i = 0; i < keys.length; i ++ ) {

		if ( ! removes.has( i ) ) rest.push( keys[ i ] );

	}

	recalcHandles( rest );

	return encodeCurve( rest, curve );

};

// indices 番のキーを offset だけ動かす。時刻は snapTime で揃え（timeline/fps のコマ）、値を動かすときは snapValue で丸める。
// 動かした先に動かしていないキーがあれば消す（Blender の移動の確定と同じ）。動かしたキーの新しい番号も返す
export const moveKeys = ( curve: MXP.CurveData, indices: number[], offset: MTP.IVector2, snapTime: ( frame: number ) => number, snapValue?: ( value: number ) => number ) => {

	const keys = decodeCurve( curve );
	const selected = new Set( indices );
	const moved: EditKey[] = [];
	const rest: EditKey[] = [];

	for ( let i = 0; i < keys.length; i ++ ) {

		const key = keys[ i ];

		if ( selected.has( i ) ) {

			let value = key.coordinate.y;

			// 値を動かさないときは丸めない（打った値をそのまま残す）
			if ( offset.y != 0 ) {

				value += offset.y;

				if ( snapValue ) value = snapValue( value );

			}

			moveKey( key, snapTime( key.coordinate.x + offset.x ), value );
			moved.push( key );

		} else {

			rest.push( key );

		}

	}

	return placeKeys( curve, rest, moved );

};

// keys（コピーしたキー）を時刻 offset だけずらしてカーブに足す。同じ時刻のキーは置き換える。足したキーの番号も返す
export const pasteKeys = ( curve: MXP.CurveData | undefined, keys: EditKey[], offset: number, snap: ( frame: number ) => number ) => {

	const pasted: EditKey[] = [];

	for ( const key of keys ) {

		const copy = copyKey( key );

		moveKey( copy, snap( key.coordinate.x + offset ), key.coordinate.y );
		pasted.push( copy );

	}

	return placeKeys( curve, decodeCurve( curve ), pasted );

};

// indices 番のキーの補間を変える
export const setInterpolation = ( curve: MXP.CurveData, indices: number[], interpolation: MXP.FCurveInterpolation ) => {

	const keys = decodeCurve( curve );

	for ( const index of indices ) {

		if ( keys[ index ] ) keys[ index ].interpolation = interpolation;

	}

	recalcHandles( keys );

	return encodeCurve( keys, curve );

};

// indices 番のキーのハンドルの種類を変え、種類に従って置き直す。整列にしたキーは、右のハンドルを左と一直線に揃える
export const setHandleType = ( curve: MXP.CurveData, indices: number[], handleType: KeyFrameHandleType ) => {

	const keys = decodeCurve( curve );

	for ( const index of indices ) {

		const key = keys[ index ];

		if ( ! key ) continue;

		key.handleType = handleType;

		if ( handleType == "ALIGNED" ) alignHandle( key, "left" );

	}

	recalcHandles( keys );

	return encodeCurve( keys, curve );

};

// index 番のキーの side のハンドルを point へ動かす。自動・ベクトルのハンドルを掴んだら、Blender と同じく
// 手で置ける種類に変える（自動 → 整列、ベクトル → 自由）。ハンドルはキーの反対側へは越えさせない
export const moveHandle = ( curve: MXP.CurveData, index: number, side: KeyFrameHandleSide, point: MTP.IVector2 ) => {

	const keys = decodeCurve( curve );
	const key = keys[ index ];

	if ( ! key ) return curve;

	if ( key.handleType == "AUTO_CLAMPED" || key.handleType == "AUTO" ) {

		key.handleType = "ALIGNED";

	} else if ( key.handleType == "VECTOR" ) {

		key.handleType = "FREE";

	}

	const center = key.coordinate;

	if ( side == "left" ) {

		key.handleLeft = { x: Math.min( point.x, center.x ), y: point.y };

	} else {

		key.handleRight = { x: Math.max( point.x, center.x ), y: point.y };

	}

	if ( key.handleType == "ALIGNED" ) alignHandle( key, side );

	recalcHandles( keys );

	return encodeCurve( keys, curve );

};

// キーを (x, y) へ動かす。ハンドルも同じだけずらす（自動・ベクトルは後で置き直される）
const moveKey = ( key: EditKey, x: number, y: number ) => {

	const dx = x - key.coordinate.x;
	const dy = y - key.coordinate.y;

	key.coordinate = { x, y };
	key.handleLeft = { x: key.handleLeft.x + dx, y: key.handleLeft.y + dy };
	key.handleRight = { x: key.handleRight.x + dx, y: key.handleRight.y + dy };

};

const copyKey = ( key: EditKey ): EditKey => {

	return {
		coordinate: { ...key.coordinate },
		handleLeft: { ...key.handleLeft },
		handleRight: { ...key.handleRight },
		interpolation: key.interpolation,
		handleType: key.handleType,
	};

};

const sortKeys = ( keys: EditKey[] ) => {

	keys.sort( ( a, b ) => a.coordinate.x - b.coordinate.x );

};

// rest に placed を加えてカーブにする。placed と同じ時刻にある rest のキーは消し、placed どうしが重なったら後のものを残す。
// placed の並び替え後の番号を返す
const placeKeys = ( curve: MXP.CurveData | undefined, rest: EditKey[], placed: EditKey[] ) => {

	const placedKeys: EditKey[] = [];

	for ( const key of placed ) {

		const index = findKeyFrame( placedKeys, key.coordinate.x );

		if ( index >= 0 ) {

			placedKeys[ index ] = key;

		} else {

			placedKeys.push( key );

		}

	}

	const keys: EditKey[] = [];

	for ( const key of rest ) {

		if ( findKeyFrame( placedKeys, key.coordinate.x ) < 0 ) keys.push( key );

	}

	for ( const key of placedKeys ) {

		keys.push( key );

	}

	sortKeys( keys );
	recalcHandles( keys );

	const indices: number[] = [];

	for ( const key of placedKeys ) {

		indices.push( keys.indexOf( key ) );

	}

	return { curve: encodeCurve( keys, curve ), indices };

};

// 整列のハンドルで、side の反対側のハンドルを side と一直線に揃える（長さはそのまま）
const alignHandle = ( key: EditKey, side: KeyFrameHandleSide ) => {

	const center = key.coordinate;

	let moved = key.handleRight;
	let other = key.handleLeft;

	if ( side == "left" ) {

		moved = key.handleLeft;
		other = key.handleRight;

	}

	const movedLength = Math.hypot( moved.x - center.x, moved.y - center.y );
	const otherLength = Math.hypot( other.x - center.x, other.y - center.y );

	// 向きが決まらない（長さ 0）ときは揃えない
	if ( movedLength == 0 ) return;

	const aligned = {
		x: center.x - ( moved.x - center.x ) / movedLength * otherLength,
		y: center.y - ( moved.y - center.y ) / movedLength * otherLength,
	};

	if ( side == "left" ) {

		key.handleRight = aligned;

	} else {

		key.handleLeft = aligned;

	}

};

/*-------------------------------
	Handle
-------------------------------*/

// 全部のキーのハンドルを種類に従って置き直す。自動・ベクトルは前後のキーの座標だけで決まるので、
// 置き直しても変わらないキーはそのままの値になる
const recalcHandles = ( keys: EditKey[] ) => {

	for ( let i = 0; i < keys.length; i ++ ) {

		const handleType = keys[ i ].handleType;

		if ( handleType == "AUTO_CLAMPED" ) {

			recalcAutoHandle( keys, i, true );

		} else if ( handleType == "AUTO" ) {

			recalcAutoHandle( keys, i, false );

		} else if ( handleType == "VECTOR" ) {

			recalcVectorHandle( keys, i );

		} else {

			limitHandles( keys, i );

		}

	}

};

// i 番のキーの前後の点。片側しか無いときは、ある側をキーの反対側へ映した点を仮の隣にする。キーが1つだけなら null
const neighborPoints = ( keys: EditKey[], i: number ) => {

	const key = keys[ i ].coordinate;
	const prevKey = keys[ i - 1 ];
	const nextKey = keys[ i + 1 ];

	if ( prevKey && nextKey ) {

		return { prev: prevKey.coordinate, next: nextKey.coordinate };

	}

	if ( nextKey ) {

		const next = nextKey.coordinate;

		return { prev: { x: 2 * key.x - next.x, y: 2 * key.y - next.y }, next };

	}

	if ( prevKey ) {

		const prev = prevKey.coordinate;

		return { prev, next: { x: 2 * key.x - prev.x, y: 2 * key.y - prev.y } };

	}

	return null;

};

// i 番のキーのハンドルを Blender の自動（clamp で自動クランプ）で置き直す（F-Curve のスムージング無し）。
// 前後の区間の傾きを足した向きに伸ばし、両端では水平にする。自動クランプはさらに山・谷で水平にする（Blender の calchandleNurb_intern と同じ手順）
const recalcAutoHandle = ( keys: EditKey[], i: number, clamp: boolean ) => {

	const keyframe = keys[ i ];
	const key = keyframe.coordinate;
	const neighbors = neighborPoints( keys, i );

	// キーが1つだけなら補間に使われないので、長さ 0 にしておく
	if ( ! neighbors ) {

		keyframe.handleLeft = { x: key.x, y: key.y };
		keyframe.handleRight = { x: key.x, y: key.y };

		return;

	}

	const prev = neighbors.prev;
	const next = neighbors.next;

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

	if ( keys[ i - 1 ] && keys[ i + 1 ] ) {

		if ( clamp ) clampAutoHandle( prev, key, next, left, right );

	} else {

		// 両端は水平にする（Blender の既定の外挿「一定」のときと同じ）
		left.y = key.y;
		right.y = key.y;

	}

	keyframe.handleLeft = { x: roundHandle( left.x, key.x ), y: roundHandle( left.y, key.y ) };
	keyframe.handleRight = { x: roundHandle( right.x, key.x ), y: roundHandle( right.y, key.y ) };

};

// i 番のキーのハンドルを、前後のキーへ向けて区間の 1/3 の長さに置く（Blender のベクトル）
const recalcVectorHandle = ( keys: EditKey[], i: number ) => {

	const keyframe = keys[ i ];
	const key = keyframe.coordinate;
	const neighbors = neighborPoints( keys, i );

	if ( ! neighbors ) {

		keyframe.handleLeft = { x: key.x, y: key.y };
		keyframe.handleRight = { x: key.x, y: key.y };

		return;

	}

	const prev = neighbors.prev;
	const next = neighbors.next;

	keyframe.handleLeft = {
		x: roundHandle( key.x + ( prev.x - key.x ) / 3, key.x ),
		y: roundHandle( key.y + ( prev.y - key.y ) / 3, key.y ),
	};

	keyframe.handleRight = {
		x: roundHandle( key.x + ( next.x - key.x ) / 3, key.x ),
		y: roundHandle( key.y + ( next.y - key.y ) / 3, key.y ),
	};

};

// 手で置いたハンドル（整列・自由）が隣のキーの時刻を越えないよう、向きを保ったまま縮める。
// 越えると区間の中で時刻が行き来し、Bezier の評価（時刻から t を解く）が崩れる
const limitHandles = ( keys: EditKey[], i: number ) => {

	const key = keys[ i ];
	const prevKey = keys[ i - 1 ];
	const nextKey = keys[ i + 1 ];

	if ( prevKey ) {

		key.handleLeft = limitHandle( key.coordinate, key.handleLeft, key.coordinate.x - prevKey.coordinate.x );

	}

	if ( nextKey ) {

		key.handleRight = limitHandle( key.coordinate, key.handleRight, nextKey.coordinate.x - key.coordinate.x );

	}

};

const limitHandle = ( key: MTP.IVector2, handle: MTP.IVector2, maxLength: number ) => {

	const length = Math.abs( handle.x - key.x );

	if ( length <= maxLength ) return handle;

	const scale = maxLength / length;

	return {
		x: key.x + ( handle.x - key.x ) * scale,
		y: key.y + ( handle.y - key.y ) * scale,
	};

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
