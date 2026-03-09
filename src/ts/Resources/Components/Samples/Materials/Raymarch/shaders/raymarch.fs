#include <common>
#include <frag_h>
#include <sdf>
#include <rm_h>
#include <uniform_time>

mat2 rot2( float a ) {
	float s = sin(a), c = cos(a);
	return mat2(c, -s, s, c);
}

float sdGyroid( vec3 p, float scale, float thickness ) {
	p *= scale;
	return (abs(dot(sin(p), cos(p.zxy))) - thickness) / scale;
}

SDFResult D( vec3 p ) {

	vec2 d = vec2( 99999.0, 0.0 );

	float t = uTime * 0.6;

	// 全体をゆっくり回転
	p.xz *= rot2( t * 0.3 );
	p.yz *= rot2( t * 0.2 );

	vec3 p1 = p;

	// 呼吸する球体
	float breathe = sin( t * 1.5 ) * 0.15;
	float sphere = sdSphere( p1, 0.55 + breathe );

	// 回転トーラス
	vec3 p2 = p;
	p2.xy *= rot2( t * 0.7 );
	float torus = sdTorus( p2, vec2( 0.7, 0.12 + sin(t * 2.0) * 0.04 ) );

	// 2つ目のトーラス（直交）
	vec3 p3 = p;
	p3.xz *= rot2( t * 0.5 + 1.57 );
	p3 = p3.xzy;
	float torus2 = sdTorus( p3, vec2( 0.65, 0.1 + cos(t * 1.8) * 0.03 ) );

	// スムース結合
	float body = opSmoothAdd( sphere, torus, 0.25 );
	body = opSmoothAdd( body, torus2, 0.2 );

	// ジャイロイドで表面を彫る
	float gyroid = sdGyroid( p + vec3( sin(t * 0.4) * 0.3 ), 5.0, 0.03 + sin(t) * 0.015 );
	body = opSmoothSub( gyroid, body, 0.08 );

	// 浮遊する小球体群
	for( int i = 0; i < 5; i++ ) {
		float fi = float(i);
		float angle = fi * 1.2566 + t * (0.5 + fi * 0.1);
		float radius = 1.1 + sin(t * 0.8 + fi) * 0.2;
		float h = sin(t * 0.6 + fi * 1.5) * 0.3;
		vec3 orbPos = vec3( cos(angle) * radius, h, sin(angle) * radius );
		float orb = sdSphere( p - orbPos, 0.08 + sin(t * 2.0 + fi * 1.3) * 0.03 );
		d = opAdd( d, vec2( orb, 2.0 ) );
	}

	d = opAdd( d, vec2( body, 1.0 ) );

	return SDFResult(
		d.x,
		p,
		d.y
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	bool hit = false;

	SDFResult dist;

	for( int i = 0; i < 64; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 0.8;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	outNormal = N( rayPos, 0.001 );

	// マテリアル分岐
	if( dist.mat > 1.5 ) {
		// 浮遊球: エミッション
		float pulse = sin( uTime * 3.0 ) * 0.5 + 0.5;
		outEmission = vec3( 0.4, 0.7, 1.0 ) * ( 1.5 + pulse );
		outColor = vec4( 0.2, 0.5, 0.9, 1.0 );
		outRoughness = 0.1;
		outMetalic = 1.0;
	} else {
		// メインボディ
		outColor = vec4( 0.9, 0.92, 0.95, 1.0 );
		outRoughness = 0.15;
		outMetalic = 0.9;
		outEmission = vec3( 0.02, 0.04, 0.08 );
	}

	#include <rm_out_obj>
	#include <frag_out>

}
