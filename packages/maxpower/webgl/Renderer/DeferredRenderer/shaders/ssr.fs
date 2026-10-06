// 反射方向へレイマーチしてシーンを引く。今フレームの結果だけを出し、時間方向の蓄積は ssrTemporal.fs が行う。
// シェーディングより前に走るので今フレームのシーン色はまだ無い。当たった面の速度で前フレームの位置へ戻し、
// 前フレームの forward まで描き終えたシーン（uPrevScene）を引く。
// 出力の a は当たった度合い（0 = 外れ）で、deferredShading.fs が環境マップの鏡面反射と混ぜる割合に使う。webgpu 側 ssr.wgsl と同じ処理

#include <module:common>
#include <module:random>

// uniforms

uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;
uniform sampler2D uVelTex;
uniform sampler2D uPrevScene;

uniform float uTimeEF;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform float uCameraFar;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;
#define MARCH 16.0
#define LENGTH 5.0
#define OBJDEPTH 0.5

// 画面の端に近い当たりを弱める幅（uv）。画面の外は引けないので、端で反射が急に切れて見えないようにする
#define EDGE_FADE 0.1

// HDR のヒット色を輝度 1 未満へ圧縮する。一瞬だけ当たった高輝度の点が履歴に大きく残って尾を引かないように、
// ssrTemporal.fs は圧縮した値どうしで近傍の範囲を取って混ぜる。deferredShading.fs の ssrDecompress と対
vec3 ssrCompress( vec3 c ) {

	return c / ( 1.0 + dot( c, vec3( 0.2126, 0.7152, 0.0722 ) ) );

}

void main( void ) {

	outColor = vec4( 0.0 );

	vec3 rayPos = texture( uGbufferPos, vUv ).xyz;

	if( isBackground( rayPos, uCameraPosition, uCameraFar ) || length( rayPos - uCameraPosition ) > 100.0 ) return;

	vec3 rayDir = reflect( - viewDirection( rayPos, uCameraPosition, uViewMatrix, uProjectionMatrix ), texture( uGbufferNormal, vUv ).xyz );

	float rayStepLength = LENGTH / MARCH;
	vec3 rayStep = rayDir * rayStepLength;

	rayPos += rayDir * ( random( vUv + uTimeEF ) * rayStepLength + 0.1 );

	for( int i = 0; i < int( MARCH ); i ++ ) {

		vec4 depthCoord = ( uProjectionMatrix * uViewMatrix * vec4( rayPos, 1.0 ) );
		depthCoord.xy /= depthCoord.w;

		if( abs( depthCoord.x ) > 1.0 || abs( depthCoord.y ) > 1.0 ) break;

		vec2 uv = depthCoord.xy * 0.5 + 0.5;

		vec3 gBufferPos = texture( uGbufferPos, uv ).xyz;

		if( length( gBufferPos ) == 0.0 ) break;

		vec4 samplerPos = ( uViewMatrix * vec4( gBufferPos, 1.0 ) );
		vec4 sampleViewPos = uViewMatrix * vec4( rayPos, 1.0 );

		if( sampleViewPos.z < samplerPos.z && sampleViewPos.z >= samplerPos.z - OBJDEPTH ) {

			// 速度は「NDC の移動量 × 0.2」（vert_out.part.glsl）。uv の移動量は NDC の半分なので 0.5 / 0.2 = 2.5 倍して戻す
			vec2 prevUv = uv - texture( uVelTex, uv ).xy * 2.5;

			vec2 edge = min( prevUv, 1.0 - prevUv );
			float weight = smoothstep( 0.0, EDGE_FADE, min( edge.x, edge.y ) );

			vec3 color = texture( uPrevScene, prevUv ).xyz;

			// 時間方向に均したあとも rgb / a が当たった色の平均になるよう、色にも重みを掛けておく
			outColor = vec4( ssrCompress( color ) * weight, weight );
			return;

		}

		rayPos += rayStep;

	}

}
