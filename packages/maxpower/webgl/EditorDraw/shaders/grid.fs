#include <module:common>
#include <part:frag_h>

uniform vec3 uColor;
// x = セルサイズ / y = 細かい格子の濃さ / z = フェード距離
uniform vec3 uParams;

// 軸線の色は TranslateGizmo と揃える
const vec3 AXIS_COLOR_X = vec3( 1.0, 0.2, 0.2 );
const vec3 AXIS_COLOR_Z = vec3( 0.4, 0.4, 1.0 );

const float MINOR_ALPHA = 0.25;
const float MAJOR_ALPHA = 0.5;

// 格子線の被覆率。線幅が画面上で1px前後に収まるよう、画素あたりの座標変化量で割る
float gridCoverage( vec2 p, float cell ) {

	vec2 coord = p / cell;
	vec2 g = abs( fract( coord + 0.5 ) - 0.5 ) / fwidth( coord );

	return 1.0 - min( min( g.x, g.y ), 1.0 );

}

void main( void ) {

	vec2 p = vPos.xz;
	float cell = uParams.x;

	// 視点が離れるほど細かい格子は薄れ、10倍の格子へ主役が移る
	float minorLine = gridCoverage( p, cell ) * uParams.y * MINOR_ALPHA;
	float majorLine = gridCoverage( p, cell * 10.0 ) * MAJOR_ALPHA;

	float alpha = max( minorLine, majorLine );
	vec3 color = uColor;

	// 原点を通る2本だけ軸色にする
	vec2 axis = vec2( 1.0 ) - min( abs( p ) / fwidth( p ), vec2( 1.0 ) );

	if ( axis.y > 0.0 ) {

		color = AXIS_COLOR_X;
		alpha = max( alpha, axis.y );

	} else if ( axis.x > 0.0 ) {

		color = AXIS_COLOR_Z;
		alpha = max( alpha, axis.x );

	}

	// 板の縁が直線で見えないよう、フェード距離までに消し切る
	float dist = length( p - uCameraPosition.xz );
	alpha *= 1.0 - smoothstep( uParams.z * 0.5, uParams.z, dist );

	if ( alpha <= 0.0 ) discard;

	outColor0 = vec4( color, alpha );

}
