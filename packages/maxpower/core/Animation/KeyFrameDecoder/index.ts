import { IVector2 } from 'mathpower';

import { FCurveInterpolation, FCurveKeyFrame } from '../FCurveKeyFrame';

// 補間の番号。BLidge の INTERPOLATION_MAP（blidge/animation/parser.py）と対応する: 0=LINEAR / 1=CONSTANT / 2=BEZIER
export type KeyFrameInterpolationCode = 0 | 1 | 2;

// キーフレームは [ 補間, [ dx, y, ...ハンドル ] ]（BLidge v2 の形式。シーンのカーブの表も同じ形式で持つ）。
// dx は先頭だけ絶対フレーム、以降は前のキーとの差分。ハンドルは差分ではなく絶対座標で、
// 左（自分か前のキーが Bezier のとき）→ 右（自分が Bezier のとき）の順に、付くものだけが並ぶ
export type KeyFrameData = [KeyFrameInterpolationCode, number[]];

// KeyFrameInterpolationCode の番号で引く
export const KEYFRAME_INTERPOLATIONS: FCurveInterpolation[] = [ 'LINEAR', 'CONSTANT', 'BEZIER' ];

// キーフレーム列（差分フレーム・数値の補間）を FCurveKeyFrame に戻す
export function decodeKeyFrames( k: KeyFrameData[] ) {

	const keyframes: FCurveKeyFrame[] = [];

	let frame = 0;

	for ( const [ code, values ] of k ) {

		frame += values[ 0 ];

		// BLidge は「自分か前のキーが Bezier」なら左ハンドルを、「自分が Bezier」なら右ハンドルを付ける。
		// 1フレーム以内に次のキーがあると補間を Constant に書き換えるが、ハンドルは元の補間のまま残るので、
		// 補間の種類ではなく要素数で読む（右があれば左も必ずあるので、4要素なら左だけ・6要素なら左右）
		let handleLeft: IVector2 | undefined = undefined;
		let handleRight: IVector2 | undefined = undefined;

		if ( values.length >= 4 ) {

			handleLeft = { x: values[ 2 ], y: values[ 3 ] };

		}

		if ( values.length >= 6 ) {

			handleRight = { x: values[ 4 ], y: values[ 5 ] };

		}

		keyframes.push( new FCurveKeyFrame( { x: frame, y: values[ 1 ] }, handleLeft, handleRight, KEYFRAME_INTERPOLATIONS[ code ] ) );

	}

	return keyframes;

}
