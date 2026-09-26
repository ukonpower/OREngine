/*-------------------------------
	SSS（スクリーンスペース表面下散乱）のぼかしカーネル

	Jimenez の Separable Subsurface Scattering の肌の拡散プロファイルから作る。
	プロファイルの係数・falloff・strength は SeparableSSS の既定値そのまま。
-------------------------------*/

// 肌のプロファイルを近似するガウスの和。[ 重み, 分散 ]
const SKIN_PROFILE = [
	[ 0.100, 0.0484 ],
	[ 0.118, 0.187 ],
	[ 0.113, 0.567 ],
	[ 0.358, 1.99 ],
	[ 0.078, 7.41 ],
];

// RGB ごとの散乱距離の比。赤ほど遠くまで散る
const SKIN_FALLOFF = [ 1.0, 0.37, 0.3 ];

// RGB ごとのぼかしの効き。残りはぼかさない元の色が占める
const SKIN_STRENGTH = [ 0.48, 0.41, 0.28 ];

// カーネルの端（中心からの距離）。SeparableSSS はサンプル数 20 以下で 2.0 を使う
const RANGE = 2.0;

// 中心から距離 r でのプロファイルの値（channel は 0=R, 1=G, 2=B）
const skinProfile = ( r: number, channel: number ) => {

	const rr = r / ( 0.001 + SKIN_FALLOFF[ channel ] );

	let sum = 0;

	for ( const [ weight, variance ] of SKIN_PROFILE ) {

		sum += weight * Math.exp( - ( rr * rr ) / ( 2.0 * variance ) ) / ( 2.0 * Math.PI * variance );

	}

	return sum;

};

// 中心から片側ぶんのカーネルを返す。左右対称なので、シェーダーは中心以外を ± の両側に使う。
// 並びは [ r, g, b, 中心からの距離（0〜1） ] × samples
export const sssKernel = ( samples: number ) => {

	// サンプル位置は中心ほど密になるよう距離の2乗で並べる（SeparableSSS と同じ）
	const offsets: number[] = [];

	for ( let i = 0; i < samples; i ++ ) {

		const o = RANGE * i / ( samples - 1 );

		offsets.push( o * o / RANGE );

	}

	// 各サンプルが受け持つ区間の幅。中心は両隣が offsets[ 1 ]
	const areas: number[] = [];

	for ( let i = 0; i < samples; i ++ ) {

		let area = 0;

		if ( i === 0 ) {

			area = offsets[ 1 ];

		} else if ( i === samples - 1 ) {

			area = ( offsets[ i ] - offsets[ i - 1 ] ) / 2;

		} else {

			area = ( offsets[ i + 1 ] - offsets[ i - 1 ] ) / 2;

		}

		areas.push( area );

	}

	const kernel: number[] = [];

	for ( let channel = 0; channel < 3; channel ++ ) {

		const weights: number[] = [];
		let total = 0;

		for ( let i = 0; i < samples; i ++ ) {

			const w = areas[ i ] * skinProfile( offsets[ i ], channel );

			weights.push( w );

			// 中心以外は両側で2回使われる
			if ( i === 0 ) {

				total += w;

			} else {

				total += w * 2;

			}

		}

		const strength = SKIN_STRENGTH[ channel ];

		for ( let i = 0; i < samples; i ++ ) {

			let w = weights[ i ] / total * strength;

			if ( i === 0 ) {

				w += 1.0 - strength;

			}

			kernel[ i * 4 + channel ] = w;

		}

	}

	for ( let i = 0; i < samples; i ++ ) {

		kernel[ i * 4 + 3 ] = offsets[ i ] / RANGE;

	}

	return kernel;

};
