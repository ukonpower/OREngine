// 一括 minify は、どの呼び出しでも同じ uniform を渡している関数の引数を、その uniform の直接参照に置き換える。
// 置き換えられた関数より後ろで uniform を宣言しているとコンパイルが失敗するので、宣言（frag_h と uEnvMap）を module より前に置く。
// frag_h の uCameraPosition などは common の viewDirection（forward と軽量レンダラーのライティングの2か所で呼ぶ）、uEnvMap は pmrem の関数が読む
#include <part:frag_h>

// 値が入るのは forward だけだが、どのパスでも宣言しておく（無いと deferred / shadowMap のコンパイルが失敗する）
uniform sampler2D uEnvMap;

#include <module:common>
#include <module:light>
#include <module:pmrem>
#include <part:lite_h>

uniform vec3 uColor;
uniform float uRoughness;
uniform float uMetallic;
uniform float uEmission;
uniform float uSSS;
uniform float uOpacity;

// refraction で背後を読む位置のずれ（画面の uv。y は上向き）。面の位置の波で揺らし、背後を読んでいることが見て分かるようにする。
// demo-webgpu の shape.wgsl の refractionOffset と同じ式
vec2 refractionOffset( vec3 pos ) {

	return vec2( sin( pos.y * 25.0 ), sin( pos.x * 25.0 ) ) * 0.015;

}

void main( void ) {

	#include <part:frag_in>

	outColor = vec4( uColor, 1.0 );
	outRoughness = uRoughness;
	outMetallic = uMetallic;
	outEmission = uColor * uEmission;
	outSSS = uSSS;

	// forward 系の pass の色。envMap フェーズもここを通る（pass は index.ts が PASS_<名前> の define で渡す）
	#ifdef IS_FORWARD

		#if defined( PASS_DEFERRED )

			// deferred の Shape がここを通るのは envMap フェーズだけ。webgl はこのフェーズに環境マップを渡さないので、
			// 空（defaultSky.fs）と同じく発光だけを書く
			outColor = vec4( outEmission, 1.0 );

		#elif defined( PASS_REFRACTION )

			vec2 refractionUv = gl_FragCoord.xy / uDeferredResolution + refractionOffset( outPos );
			outColor = vec4( texture( uDeferredTexture, refractionUv ).xyz * uColor, uOpacity );

		#else

			// deferred のシェーディング（deferredShading.fs）と同じ part で、ライト・影・環境マップを当てる。
			// envMap フェーズにも入れたときは uEnvMap が渡らないので、そこでは環境マップの項が正しくない
			#include <part:lighting_forwardIn>

			// lighting_light は平行光の影を引く位置を gBuffer の tex0 から読むので、面の位置で用意する
			vec4 tex0 = vec4( outPos, 0.0 );

			#include <part:lighting_light>

			// SSR は forward の面には当たらないので、鏡面反射は環境マップだけから取る
			vec3 ssrHit = vec3( 0.0 );
			float ssrWeight = 0.0;

			#include <part:lighting_env>

			outColor = vec4( diffuse + specular + outEmission, uOpacity );

		#endif

	#endif

	// 軽量レンダラー（rendererType が lite のシーン）では、ここでライト・影・環境光・トーンマップまで済ませる
	#include <part:lite_out>
	#include <part:frag_out>

}
