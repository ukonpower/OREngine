// シャドウマップの参照。シェーディングパスもlightShaftも同じものを使う。
// shadowSampler などの束縛宣言は buildLightWgsl が前置する

// シャドウの自己遮蔽よけ。補正後のクリップ空間 z（0〜1）に対する定数ぶん
const SHADOW_BIAS = 0.0015;

// ライト空間へ射影してシャドウマップと深度比較する。
// WebGPUのNDCはY上向き・テクスチャ座標はY下向きなので、UVのYをここで反転して規約差を吸収する
fn sampleShadow( shadowMap: texture_depth_2d_array, layer: i32, shadowMatrix: mat4x4f, worldPosition: vec3f ) -> f32 {

	let projected = shadowMatrix * vec4f( worldPosition, 1.0 );
	let ndc = projected.xyz / projected.w;
	let uv = vec2f( ndc.x * 0.5 + 0.5, ndc.y * - 0.5 + 0.5 );

	if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || ndc.z < 0.0 || ndc.z > 1.0 ) {

		return 1.0;

	}

	let texel = 1.0 / f32( textureDimensions( shadowMap ).x );

	var sum = 0.0;

	for ( var y = - 1; y <= 1; y ++ ) {

		for ( var x = - 1; x <= 1; x ++ ) {

			let offset = vec2f( f32( x ), f32( y ) ) * texel;

			sum += textureSampleCompareLevel( shadowMap, shadowSampler, uv + offset, layer, ndc.z - SHADOW_BIAS );

		}

	}

	return sum / 9.0;

}
