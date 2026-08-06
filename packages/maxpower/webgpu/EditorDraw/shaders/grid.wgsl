// エディタのXZ平面グリッド。板のワールドXZ座標から格子を描き、遠方は円状にフェードさせる。
// 外から与えられる名前:
//   material.uColor   格子線の色
//   material.uParams  x = セルサイズ / y = 細かい格子の濃さ / z = フェード距離
//   frame.uCameraPosition  フェードの中心

#include "../../Material/shaders/standardVertex.wgsl"

// 軸線の色は TranslateGizmo と揃える
const AXIS_COLOR_X = vec3f( 1.0, 0.2, 0.2 );
const AXIS_COLOR_Z = vec3f( 0.4, 0.4, 1.0 );

const MINOR_ALPHA = 0.25;
const MAJOR_ALPHA = 0.5;

// 格子線の被覆率。線幅が画面上で1px前後に収まるよう、画素あたりの座標変化量で割る
fn gridCoverage( p: vec2f, cell: f32 ) -> f32 {

	let coord = p / cell;
	let g = abs( fract( coord + 0.5 ) - 0.5 ) / fwidth( coord );

	return 1.0 - min( min( g.x, g.y ), 1.0 );

}

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	let p = input.worldPosition.xz;
	let cell = material.uParams.x;

	// 視点が離れるほど細かい格子は薄れ、10倍の格子へ主役が移る
	let minor = gridCoverage( p, cell ) * material.uParams.y * MINOR_ALPHA;
	let major = gridCoverage( p, cell * 10.0 ) * MAJOR_ALPHA;

	var alpha = max( minor, major );
	var color = material.uColor;

	// 原点を通る2本だけ軸色にする
	let axis = vec2f( 1.0 ) - min( abs( p ) / fwidth( p ), vec2f( 1.0 ) );

	if ( axis.y > 0.0 ) {

		color = AXIS_COLOR_X;
		alpha = max( alpha, axis.y );

	} else if ( axis.x > 0.0 ) {

		color = AXIS_COLOR_Z;
		alpha = max( alpha, axis.x );

	}

	// 板の縁が直線で見えないよう、フェード距離までに消し切る
	let dist = length( p - frame.uCameraPosition.xz );
	alpha *= 1.0 - smoothstep( material.uParams.z * 0.5, material.uParams.z, dist );

	if ( alpha <= 0.0 ) {

		discard;

	}

	return vec4f( color, alpha );

}
