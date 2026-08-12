// ガウスぼかし。BLUR_SAMPLES / BLUR_WEIGHTS / BLUR_DIRECTION は buildGaussBlurWgsl が前置する

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var sum = BLUR_WEIGHTS[ 0 ] * textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	for ( var i = 1; i < BLUR_SAMPLES; i ++ ) {

		let offset = f32( i ) * BLUR_DIRECTION * pp.uBlurRange * pp.uPPPixelSize;

		sum += BLUR_WEIGHTS[ i ] * textureSampleLevel( uBackBuffer0, ppSampler, input.uv + offset, 0.0 ).xyz;
		sum += BLUR_WEIGHTS[ i ] * textureSampleLevel( uBackBuffer0, ppSampler, input.uv - offset, 0.0 ).xyz;

	}

	return vec4f( sum, 1.0 );

}
