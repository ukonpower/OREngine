import { Vector } from "..";

export namespace MathUtils {

	export const gauss = ( x: number, x0: number, sx: number ) => {

		const a = ( x - x0 );
		const arg = - ( a * a ) / ( 2.0 * sx * sx );

		return 1.0 / ( Math.sqrt( 2. * Math.PI * sx ) ) * Math.exp( arg );

	};

	export const gaussWeights = ( length: number ) => {

		let total = 0.0;
		const res = [];

		if ( length <= 1 ) return [ 0.5 ];

		for ( let i = 0; i < length; i ++ ) {

			const x = i / ( length - 1 );

			const w = gauss( x, 0.0, 1.0 );

			total += w * ( i > 0 ? 2 : 1 );

			res.push( w );

		}

		for ( let i = 0; i < length; i ++ ) {

			res[ i ] /= total;

		}

		return res;

	};

	export const randomSeed = ( s: number ) => {

		// Xorshift128 (init seed with Xorshift32)
		s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
		let x = 123456789 ^ s;
		s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
		let y = 362436069 ^ s;
		s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
		let z = 521288629 ^ s;
		s ^= s << 13; s ^= 2 >>> 17; s ^= s << 5;
		let w = 88675123 ^ s;
		let t;

		const random = () => {

			t = x ^ ( x << 11 );
			x = y; y = z; z = w;
			// >>>0 means 'cast to uint32'
			w = ( ( w ^ ( w >>> 19 ) ) ^ ( t ^ ( t >>> 8 ) ) ) >>> 0;
			return w / 0x100000000;

		};

		return random;

	};

	export const randomRange = ( a: number = - 1, b: number = 1 ) => {

		return a + Math.random() * ( b - a );

	};

	export const randomVector = ( a: Vector = new Vector( - 1, - 1, - 1, - 1 ), b: Vector = new Vector( 1, 1, 1, 1 ) ) => {

		return new Vector(
			randomRange( a.x, b.x ),
			randomRange( a.y, b.y ),
			randomRange( a.z, b.z ),
			randomRange( a.w, b.w ),
		);

	};

	/**
	 * 球の内部に均一分布する3D座標を生成
	 * @param radius 球の半径（デフォルトは1）
	 * @param random オプションの乱数生成関数（デフォルトはMath.random）
	 * @returns {x, y, z} 球の内部に均一分布する座標
	 */
	export const randomInSphere = ( radius: number = 1, random: () => number = Math.random ) => {

		// 球面座標のパラメータ
		const u = random();
		const v = random();
		const w = random();

		// 球面方向
		const theta = 2 * Math.PI * u; // 方位角
		const phi = Math.acos( 2 * v - 1 ); // 極角

		// 半径補正（体積に比例した均一分布）
		const r = Math.cbrt( w ) * radius;

		// 直交座標に変換
		const sinPhi = Math.sin( phi );

		return {
			x: r * sinPhi * Math.cos( theta ),
			y: r * sinPhi * Math.sin( theta ),
			z: r * Math.cos( phi ),
		};

	};

	export const smoothstep = ( min: number, max: number, x: number ) => {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	};

}
