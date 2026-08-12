// 半球状に散らしたサンプル点で遮蔽を測る。
// SSAO_SAMPLES / SSAO_KERNEL は生成時に値が決まるため buildSsaoWgsl が前置する

#include "./random.wgsl"

// ワールド座標をカメラのクリップ空間へ落としてテクスチャ座標にする。
// WebGPUのテクスチャ座標はY下向きなので、ここでYを反転して規約差を吸収する
fn worldToUv( worldPosition: vec3f ) -> vec2f {

	let projected = frame.uProjectionMatrix * frame.uViewMatrix * vec4f( worldPosition, 1.0 );
	let ndc = projected.xy / projected.w;

	return vec2f( ndc.x * 0.5 + 0.5, ndc.y * - 0.5 + 0.5 );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let rayPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;

	// gBufferが書かれていない画素と、遠すぎる画素は遮蔽なし
	if ( dot( rayPos, rayPos ) == 0.0 || length( rayPos - frame.uCameraPosition ) > 100.0 ) {

		return vec4f( 0.0, 0.0, 0.0, 1.0 );

	}

	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;

	let dist = 0.5;
	let objectDepth = 0.2;

	let seed = input.uv + frame.uTimeEF;
	let rand = vec3f( random( seed ), random( seed + 0.25 ), random( seed + 0.5 ) ) * 2.0 - 1.0;

	let tangent = normalize( rand - normal * dot( rand, normal ) );
	let bitangent = cross( tangent, normal );
	let kernelMatrix = mat3x3f( tangent, bitangent, normal );

	var occlusion = 0.0;

	for ( var i = 0; i < SSAO_SAMPLES; i ++ ) {

		let sampleOffset = kernelMatrix * SSAO_KERNEL[ i ];
		let samplePos = rayPos + sampleOffset * dist;

		let sampledWorld = textureSampleLevel( uGbufferPos, ppSamplerNearest, worldToUv( samplePos ), 0.0 ).xyz;

		let sampledViewZ = ( frame.uViewMatrix * vec4f( sampledWorld, 1.0 ) ).z;
		let sampleViewZ = ( frame.uViewMatrix * vec4f( samplePos, 1.0 ) ).z;

		if ( sampleViewZ < sampledViewZ && sampleViewZ >= sampledViewZ - objectDepth ) {

			occlusion += 1.0 - pow( length( sampleOffset ), 2.0 );

		}

	}

	return vec4f( vec3f( occlusion / f32( SSAO_SAMPLES ) * pp.uIntensity ), 1.0 );

}
