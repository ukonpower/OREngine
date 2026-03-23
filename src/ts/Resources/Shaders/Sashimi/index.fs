#include <common>
#include <frag_h>
#include <sdf>
#include <rotate>
#include <rm_h>

// グローバルテクスチャユニフォーム
uniform sampler2D uNoiseTex;

// 刺身のSDF定義
SDFResult D( vec3 p ) {

	vec3 sashimiP = p;
	sashimiP.y -= 0.2;

	vec3 pp = sashimiP;
	pp.yz *= rotate( smoothstep( 0.0, 0.8, abs(pp.z) ) * sign( pp.z ) * 0.3);
	pp.xy *= rotate( -smoothstep( 0.0, 0.3, abs(pp.x) ) * sign( pp.x ) * 0.4);

	float d = 9999999.0;

	vec4 n = texture( uNoiseTex, p.xz * 0.1 - vec2( 0.1, 0.3 ) );
	vec4 n2 = texture( uNoiseTex, p.xz * 2.0 - vec2( 0.1, 0.3 ) );
	pp.y += n2.x * 0.02;

	// マグロ（薄め）
	vec3 sashimiSize = vec3( 0.2, 0.01 + n.x * 0.08, 0.65 );
	d = sdBox( pp, sashimiSize );

	vec3 trimP = pp;
	trimP.xz += vec2( -0.0, 0.0);
	trimP.xz *= rotate( 0.3 );
	d = opAnd( sdBox(trimP, vec3( 1.0, 0.2, 0.4 )), d );

	return SDFResult(
		d,
		p,
		1.0
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	SDFResult dist;
	bool hit = false;

	for( int i = 0; i < 64; i++ ) {

		dist = D( rayPos );
		rayPos += dist.d * rayDir * 0.7;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	vec4 n = texture( uNoiseTex, rayPos.xz * 0.1 + 0.5 );
	vec4 n2 = texture( uNoiseTex, rayPos.xz * 4.0 + 0.5 );

	outNormal = N( rayPos, 0.01 );
	outNormal = normalize( outNormal + (n2.y - 0.5) * 0.4 );

	#include <rm_out_obj>

	float dnv = dot( rayDir, -outNormal.xyz );

	// マグロの赤身
	vec3 sashimiColor = vec3( 0.9, 0.15, 0.1 );
	vec3 sashimiEmission = vec3( 0.9, 0.1, 0.2 );

	outColor.xyz = sashimiColor;
	outColor.xyz = mix( outColor.xyz, vec3( 1.0 ), smoothstep( 0.8, 1.0, fract(length( rayPos.xz + 0.5 + n.xy * 0.3 ) * 5.0 ) ) * n.y * 0.8 );

	outEmission.xyz += sashimiEmission * 0.3 * smoothstep( 1.5, 0.0, dnv );
	outRoughness = 0.2 + n2.y * 0.2;
	outMetallic = 0.3;
	outEmission += outColor.xyz * 0.2;

	// グラデーション効果
	outColor.xyz *= smoothstep( 1.5, 0.4, length( rayPos ) );

	#include <frag_out>

}
