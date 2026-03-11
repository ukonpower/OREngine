#include <common>
#include <packing>
#include <frag_h>

// hue→RGB変換
vec3 hue2rgb( float h ) {

	h = fract( h );
	float r = abs( h * 6.0 - 3.0 ) - 1.0;
	float g = 2.0 - abs( h * 6.0 - 2.0 );
	float b = 2.0 - abs( h * 6.0 - 4.0 );
	return clamp( vec3( r, g, b ), 0.0, 1.0 );

}

void main( void ) {

	#include <frag_in>

	float t = uTimeE;

	// 虹色サイクル（位置＋時間でハイカラに）
	float hue = fract( outPos.y * 0.3 + outPos.x * 0.2 + outPos.z * 0.1 + t * 0.4 );
	vec3 rainbow = hue2rgb( hue );

	// ネオンパルス（高速＋スローの二重パルス）
	float fastPulse = pow( sin( t * 12.0 ) * 0.5 + 0.5, 3.0 );
	float slowPulse = pow( sin( t * 2.5 ) * 0.5 + 0.5, 2.0 );
	float pulse = mix( slowPulse, 1.0, fastPulse * 0.6 );

	// スキャンライン（Y方向に流れるライン）
	float scanLine = pow( fract( outPos.y * 4.0 - t * 1.5 ), 8.0 );

	// エミッション（ガンガンに光らせる）
	float emissionIntensity = 3.0 + pulse * 5.0 + scanLine * 8.0;
	outEmission = rainbow * emissionIntensity;

	// アルベドも虹色
	outColor = vec4( rainbow, 1.0 );

	// フレネル的な輝き（法線ベース）
	float rim = 1.0 - abs( dot( normalize( outNormal ), vec3( 0.0, 0.0, 1.0 ) ) );
	outEmission += hue2rgb( hue + 0.33 ) * pow( rim, 2.0 ) * ( 4.0 + pulse * 6.0 );

	// PBRパラメータ
	outRoughness = 0.05;
	outMetalic = 0.9;

	#include <frag_out>

}
