// 反射方向へレイマーチしてシーンを引く。今フレームの結果だけを出し、時間方向の蓄積は ssrTemporal.wgsl が行う。
// シェーディングより前に走るので今フレームのシーン色はまだ無い。当たった面の速度で前フレームの位置へ戻し、
// 前フレームの forward まで描き終えたシーンを引く。
// 出力の a は当たった度合い（0 = 外れ）で、シェーディングが環境マップの鏡面反射と混ぜる割合に使う。
//
// 外から与えられる名前:
//   uPrevScene（前フレームの forward 後のシーン）
//   pp.uEnabled … 0 で常に外れを返す（シェーディングが読む先に古い結果を残さない）

#include "./random.wgsl"
#include "../../shaders/view.wgsl"

const MARCH = 16;
const LENGTH = 5.0;
const OBJDEPTH = 0.5;

// 画面の端に近い当たりを弱める幅（uv）。画面の外は引けないので、端で反射が急に切れて見えないようにする
const EDGE_FADE = 0.1;

// HDR のヒット色を輝度 1 未満へ圧縮する。一瞬だけ当たった高輝度の点が履歴に大きく残って尾を引かないように、
// ssrTemporal.wgsl は圧縮した値どうしで近傍の範囲を取って混ぜる。shading.wgsl の ssrDecompress と対
fn ssrCompress( c: vec3f ) -> vec3f {

	return c / ( 1.0 + dot( c, vec3f( 0.2126, 0.7152, 0.0722 ) ) );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var rayPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;

	if ( pp.uEnabled < 0.5 || isBackground( rayPos ) || length( rayPos - frame.uCameraPosition ) > 100.0 ) {

		return vec4f( 0.0 );

	}

	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let rayDir = reflect( - viewDirection( rayPos ), normal );

	let rayStepLength = LENGTH / f32( MARCH );
	let rayStep = rayDir * rayStepLength;

	rayPos += rayDir * ( random( input.uv + frame.uTimeEF ) * rayStepLength + 0.1 );

	for ( var i = 0; i < MARCH; i ++ ) {

		let projected = frame.uProjectionMatrix * frame.uViewMatrix * vec4f( rayPos, 1.0 );
		let coord = projected.xy / projected.w;

		if ( abs( coord.x ) > 1.0 || abs( coord.y ) > 1.0 ) {

			break;

		}

		let uv = ndcToUv( coord );
		let gPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz;

		if ( dot( gPos, gPos ) == 0.0 ) {

			break;

		}

		let sampledViewZ = ( frame.uViewMatrix * vec4f( gPos, 1.0 ) ).z;
		let rayViewZ = ( frame.uViewMatrix * vec4f( rayPos, 1.0 ) ).z;

		if ( rayViewZ < sampledViewZ && rayViewZ >= sampledViewZ - OBJDEPTH ) {

			// 速度は「NDC の移動量 × 0.2」を uv の向きへ y 反転したもの（standardVertex.wgsl）。
			// uv の移動量は NDC の半分なので 0.5 / 0.2 = 2.5 倍して戻す
			let prevUv = uv - textureSampleLevel( uVelTex, ppSamplerNearest, uv, 0.0 ).xy * 2.5;

			let edge = min( min( prevUv.x, 1.0 - prevUv.x ), min( prevUv.y, 1.0 - prevUv.y ) );
			let weight = smoothstep( 0.0, EDGE_FADE, edge );

			let color = textureSampleLevel( uPrevScene, ppSampler, prevUv, 0.0 ).xyz;

			// 時間方向に均したあとも rgb / a が当たった色の平均になるよう、色にも重みを掛けておく
			return vec4f( ssrCompress( color ) * weight, weight );

		}

		rayPos += rayStep;

	}

	return vec4f( 0.0 );

}
