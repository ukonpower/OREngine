#include <module:common>
#include <part:frag_h>
#include <module:noise_value>

// 汚れの模様の 1 成分。demo-webgl の Resources/Textures/shaders/noise.fs（noise.tex）と同じ式を、テクスチャを引かずに計算する。
// demo-webgpu の OREngineCube の main.wgsl と同じ式にして、両バックエンドで同じ素材にする。
// テクスチャは REPEAT で引いていたので uv は fract で折り返す
float cubeNoise( vec2 uv, float seed ) {

	vec2 p = fract( uv );
	vec2 v = p * 15.0;
	vec2 lv = abs( p - 0.5 ) * 15.0;

	// 折り返しの継ぎ目が目立たないよう、端へ向けて中心からの距離で引いた模様へ寄せる
	float lw = sin( p.x * PI ) * sin( p.y * PI );

	return mix( fbm( vec3( lv, seed ) ), fbm( vec3( v, seed ) ), lw );

}

void main( void ) {

	#include <part:frag_in>

	// 模様を引く uv を別の模様でゆがめる
	vec2 warp = vec2( cubeNoise( vUv * 0.5, 0.0 ), cubeNoise( vUv * 0.5, 100.0 ) );
	vec2 noiseUv = vUv * 0.1 + 0.1 * warp;

	float roughnessNoise = cubeNoise( noiseUv, 0.0 );
	vec2 normalNoise = vec2( cubeNoise( noiseUv, 100.0 ), cubeNoise( noiseUv, 200.0 ) );

	outRoughness = smoothstep( 0.2, 0.9, roughnessNoise );
	outColor = vec4( 1.0 - ( outRoughness * 0.3 ) );

	outNormal.xz += normalNoise * 0.03;
	outNormal = normalize( outNormal );

	#include <part:frag_out>

}
