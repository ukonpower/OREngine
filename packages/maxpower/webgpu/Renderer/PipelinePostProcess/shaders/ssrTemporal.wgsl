// ssr.wgsl の今フレームの結果を、前フレームの結果と混ぜて均す。
// 履歴は今フレームの近傍 3x3 の範囲へクランプしてから混ぜる（TAA の近傍クランプ）。
// 反射像は反射先の奥行きで動くので面の速度で再投影してもずれが残り、ディスオクルージョンでは別の物の反射を引き継ぐ。
// どちらも今フレームの近傍に無い色として捨てられる。
//
// 外から与えられる名前:
//   uSSRCurrent（ssr.wgsl の結果。圧縮済み）/ uSSRBackBuffer（前フレームのこのパスの結果）

#include "../../shaders/view.wgsl"

// 新しい結果に与える重み
const BLEND = 0.2;

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	// 空・背景には反射を足さないので、履歴も持たない
	if ( isBackground( textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz ) ) {

		return vec4f( 0.0 );

	}

	let current = textureSampleLevel( uSSRCurrent, ppSamplerNearest, input.uv, 0.0 );

	var minCol = current;
	var maxCol = current;

	for ( var y = -1; y <= 1; y ++ ) {

		for ( var x = -1; x <= 1; x ++ ) {

			let neighbor = textureSampleLevel( uSSRCurrent, ppSamplerNearest, input.uv + vec2f( f32( x ), f32( y ) ) * pp.uPPPixelSize, 0.0 );

			minCol = min( minCol, neighbor );
			maxCol = max( maxCol, neighbor );

		}

	}

	// 速度は「NDC の移動量 × 0.2」を uv の向きへ y 反転したもの（standardVertex.wgsl）。
	// uv の移動量は NDC の半分なので 0.5 / 0.2 = 2.5 倍して戻す
	let prevUv = input.uv - textureSampleLevel( uVelTex, ppSamplerNearest, input.uv, 0.0 ).xy * 2.5;

	// 画面の外から来た画素には履歴が無いので、そのフレームの値だけを使う
	if ( any( prevUv < vec2f( 0.0 ) ) || any( prevUv > vec2f( 1.0 ) ) ) {

		return current;

	}

	let history = clamp( textureSampleLevel( uSSRBackBuffer, ppSampler, prevUv, 0.0 ), minCol, maxCol );

	return mix( history, current, BLEND );

}
