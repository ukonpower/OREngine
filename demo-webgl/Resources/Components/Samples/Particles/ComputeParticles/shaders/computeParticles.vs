// 粒の描画。インスタンスごとの particleUv で計算の結果（uGPUSampler0）から位置を読んで箱を置く。
// demo-webgpu の computeParticles.wgsl と同じ見た目

#include <module:common>
#include <part:vert_h>

layout ( location = 3 ) in vec2 particleUv;

// 粒の pos と、粒のテクスチャの大きさ（PER_LEADER x LEADERS）
uniform sampler2D uGPUSampler0;
uniform vec2 uGPUResolution;

out vec3 vColor;

// 色相 [0,1) を彩度・明度が最大の色にする
vec3 hueToRgb( float hue ) {

	vec3 k = abs( fract( hue + vec3( 0.0, 2.0 / 3.0, 1.0 / 3.0 ) ) * 6.0 - 3.0 ) - 1.0;

	return clamp( k, 0.0, 1.0 );

}

void main( void ) {

	#include <part:vert_in>

	outPos += texture( uGPUSampler0, particleUv ).xyz;

	// 先頭ごとに色を分ける。粒のテクスチャは1行が1つの先頭の粒
	vColor = hueToRgb( floor( particleUv.y * uGPUResolution.y ) / uGPUResolution.y ) * 0.8;

	#include <part:vert_out>

}
