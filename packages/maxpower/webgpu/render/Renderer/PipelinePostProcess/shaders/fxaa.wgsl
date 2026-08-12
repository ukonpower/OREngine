// 輝度の勾配方向にだけ2タップ足す簡易FXAA

const LUMA = vec3f( 0.299, 0.587, 0.114 );
const EDGE_THRESHOLD = 0.0312;
const SPAN_MAX = 8.0;

fn luma( uv: vec2f ) -> f32 {

	return dot( textureSampleLevel( uBackBuffer0, ppSampler, uv, 0.0 ).xyz, LUMA );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let texel = pp.uPPPixelSize;

	let lumaM = luma( input.uv );
	let lumaNW = luma( input.uv + vec2f( - texel.x, - texel.y ) );
	let lumaNE = luma( input.uv + vec2f( texel.x, - texel.y ) );
	let lumaSW = luma( input.uv + vec2f( - texel.x, texel.y ) );
	let lumaSE = luma( input.uv + vec2f( texel.x, texel.y ) );

	let lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );
	let lumaMax = max( lumaM, max( max( lumaNW, lumaNE ), max( lumaSW, lumaSE ) ) );

	if ( lumaMax - lumaMin < lumaMax * EDGE_THRESHOLD ) {

		return textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 );

	}

	var dir = vec2f(
		- ( ( lumaNW + lumaNE ) - ( lumaSW + lumaSE ) ),
		( ( lumaNW + lumaSW ) - ( lumaNE + lumaSE ) )
	);

	let reduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * 0.03125, 0.0078125 );
	let scale = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + reduce );

	dir = clamp( dir * scale, vec2f( - SPAN_MAX ), vec2f( SPAN_MAX ) ) * texel;

	let rgbA = 0.5 * (
		textureSampleLevel( uBackBuffer0, ppSampler, input.uv + dir * ( 1.0 / 3.0 - 0.5 ), 0.0 ).xyz
		+ textureSampleLevel( uBackBuffer0, ppSampler, input.uv + dir * ( 2.0 / 3.0 - 0.5 ), 0.0 ).xyz
	);

	let rgbB = rgbA * 0.5 + 0.25 * (
		textureSampleLevel( uBackBuffer0, ppSampler, input.uv - dir * 0.5, 0.0 ).xyz
		+ textureSampleLevel( uBackBuffer0, ppSampler, input.uv + dir * 0.5, 0.0 ).xyz
	);

	let lumaB = dot( rgbB, LUMA );

	if ( lumaB < lumaMin || lumaB > lumaMax ) {

		return vec4f( rgbA, 1.0 );

	}

	return vec4f( rgbB, 1.0 );

}
