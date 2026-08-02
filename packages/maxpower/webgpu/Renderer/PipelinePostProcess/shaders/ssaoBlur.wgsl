// 法線と深度で重みを付けたバイラテラルぼかし。縦横で2回かける。
// BLUR_SAMPLES / BLUR_WEIGHTS / BLUR_DIRECTION は buildSsaoBlurWgsl が前置する

const ALPHA = 32.0;
const BETA = 0.25;

// 深度はgBufferのワールド座標からカメラ距離として求める
fn viewDepth( uv: vec2f ) -> f32 {

	return length( textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz - frame.uCameraPosition );

}

fn bilateralWeight( uv: vec2f, normalBasis: vec3f, depthBasis: f32 ) -> f32 {

	let normalOffset = textureSampleLevel( uGbufferNormal, ppSamplerNearest, uv, 0.0 ).xyz;
	let depthOffset = viewDepth( uv );

	return pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, ALPHA )
		* pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), BETA );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let normalBasis = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let depthBasis = viewDepth( input.uv );

	var occlusion = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).x * BLUR_WEIGHTS[ 0 ];
	var weight = BLUR_WEIGHTS[ 0 ];

	for ( var i = 1; i < BLUR_SAMPLES; i ++ ) {

		let offset = f32( i ) * BLUR_DIRECTION * pp.uPPPixelSize;

		let uvP = input.uv + offset;
		let uvN = input.uv - offset;

		let wP = bilateralWeight( uvP, normalBasis, depthBasis ) * BLUR_WEIGHTS[ i ];
		let wN = bilateralWeight( uvN, normalBasis, depthBasis ) * BLUR_WEIGHTS[ i ];

		occlusion += textureSampleLevel( uBackBuffer0, ppSampler, uvP, 0.0 ).x * wP;
		occlusion += textureSampleLevel( uBackBuffer0, ppSampler, uvN, 0.0 ).x * wN;

		weight += wP + wN;

	}

	return vec4f( vec3f( occlusion / weight ), 1.0 );

}
