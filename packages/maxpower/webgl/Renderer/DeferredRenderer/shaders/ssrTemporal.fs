// ssr.fs の今フレームの結果を、前フレームの結果と混ぜて均す。
// 履歴は今フレームの近傍 3x3 の範囲へクランプしてから混ぜる（TAA の近傍クランプ）。
// 反射像は反射先の奥行きで動くので面の速度で再投影してもずれが残り、ディスオクルージョンでは別の物の反射を引き継ぐ。
// どちらも今フレームの近傍に無い色として捨てられる。webgpu 側 ssrTemporal.wgsl と同じ処理

#include <module:common>

uniform sampler2D uSSRCurrent;
uniform sampler2D uSSRBackBuffer;
uniform sampler2D uGbufferPos;
uniform sampler2D uVelTex;

uniform vec2 uPPPixelSize;
uniform vec3 uCameraPosition;
uniform float uCameraFar;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// 新しい結果に与える重み
#define BLEND 0.2

void main( void ) {

	// isBackground の引数へ直接 texture() を渡すと、shader_minifier が uniform の引数を削って関数本体へ移し、
	// uniform の宣言より前で参照する壊れたコードになる。いったんローカル変数に受ける
	vec3 pos = texture( uGbufferPos, vUv ).xyz;

	// 空・背景には反射を足さないので、履歴も持たない
	if( isBackground( pos, uCameraPosition, uCameraFar ) ) {

		outColor = vec4( 0.0 );
		return;

	}

	// uSSRCurrent はこのパスと同じ解像度なので、画素中心を引けば線形補間でも隣と混ざらない
	vec4 current = texture( uSSRCurrent, vUv );

	vec4 minCol = current;
	vec4 maxCol = current;

	for( int y = -1; y <= 1; y ++ ) {

		for( int x = -1; x <= 1; x ++ ) {

			vec4 neighbor = texture( uSSRCurrent, vUv + vec2( x, y ) * uPPPixelSize );

			minCol = min( minCol, neighbor );
			maxCol = max( maxCol, neighbor );

		}

	}

	// 速度は「NDC の移動量 × 0.2」（vert_out.part.glsl）。uv の移動量は NDC の半分なので 0.5 / 0.2 = 2.5 倍して戻す
	vec2 prevUv = vUv - texture( uVelTex, vUv ).xy * 2.5;

	// 画面の外から来た画素には履歴が無いので、そのフレームの値だけを使う
	if( any( lessThan( prevUv, vec2( 0.0 ) ) ) || any( greaterThan( prevUv, vec2( 1.0 ) ) ) ) {

		outColor = current;
		return;

	}

	vec4 history = clamp( texture( uSSRBackBuffer, prevUv ), minCol, maxCol );

	outColor = mix( history, current, BLEND );

}
