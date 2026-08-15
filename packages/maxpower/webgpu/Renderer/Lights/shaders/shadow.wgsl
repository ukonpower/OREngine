// シャドウマップの参照。シェーディングパスもlightShaftも同じものを使う。
// shadowSampler などの束縛宣言は buildLightWgsl が前置する

// シャドウの自己遮蔽よけ。補正後のクリップ空間 z（0〜1）に対する定数ぶん
const SHADOW_BIAS = 0.0015;

struct ShadowCoord {
	uv: vec2f,
	depth: f32,
	inside: bool,
}

// ライト空間へ射影してシャドウマップの参照位置を求める。
// WebGPUのNDCはY上向き・テクスチャ座標はY下向きなので、UVのYをここで反転して規約差を吸収する
fn shadowCoord( shadowMatrix: mat4x4f, worldPosition: vec3f ) -> ShadowCoord {

	let projected = shadowMatrix * vec4f( worldPosition, 1.0 );
	let ndc = projected.xyz / projected.w;
	let uv = vec2f( ndc.x * 0.5 + 0.5, ndc.y * - 0.5 + 0.5 );

	var coord: ShadowCoord;

	coord.uv = uv;
	coord.depth = ndc.z - SHADOW_BIAS;
	coord.inside = uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0 && ndc.z >= 0.0 && ndc.z <= 1.0;

	return coord;

}

// 3×3のPCF。1点の可視性をそのまま画に出すシェーディング用
fn sampleShadow( shadowMap: texture_depth_2d_array, layer: i32, shadowMatrix: mat4x4f, worldPosition: vec3f ) -> f32 {

	let coord = shadowCoord( shadowMatrix, worldPosition );

	if ( ! coord.inside ) {

		return 1.0;

	}

	let texel = 1.0 / f32( textureDimensions( shadowMap ).x );

	var sum = 0.0;

	for ( var y = - 1; y <= 1; y ++ ) {

		for ( var x = - 1; x <= 1; x ++ ) {

			let offset = vec2f( f32( x ), f32( y ) ) * texel;

			sum += textureSampleCompareLevel( shadowMap, shadowSampler, coord.uv + offset, layer, coord.depth );

		}

	}

	return sum / 9.0;

}

// フィルタなしの1タップ。レイマーチのように多点を積算する側は積算自体が平滑化になるため、
// PCFの9タップは丸ごと無駄になる
fn sampleShadowPoint( shadowMap: texture_depth_2d_array, layer: i32, shadowMatrix: mat4x4f, worldPosition: vec3f ) -> f32 {

	let coord = shadowCoord( shadowMatrix, worldPosition );

	if ( ! coord.inside ) {

		return 1.0;

	}

	return textureSampleCompareLevel( shadowMap, shadowSampler, coord.uv, layer, coord.depth );

}
