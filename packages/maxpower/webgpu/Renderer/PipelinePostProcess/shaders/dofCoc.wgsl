// 錯乱円（CoC）を求めつつ、ボケ用に1/2解像度へ落とす（KinoBokeh 由来）

fn sampleDepth( uv: vec2f ) -> f32 {

	return - ( frame.uViewMatrix * vec4f( textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz, 1.0 ) ).z;

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let focusDistance = pp.uParams.x;
	let maxCoc = pp.uParams.y;
	let rcpMaxCoc = pp.uParams.z;
	let lensCoeff = pp.uParams.w;

	let texel = pp.uPPPixelSize;
	let duv = vec3f( texel.x, texel.y, - texel.x ) * 0.5;

	let c0 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv - duv.xy, 0.0 ).xyz;
	let c1 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv - duv.zy, 0.0 ).xyz;
	let c2 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv + duv.zy, 0.0 ).xyz;
	let c3 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv + duv.xy, 0.0 ).xyz;

	let depth = sampleDepth( input.uv );
	let depths = vec4f( depth );

	var cocs = ( depths - focusDistance ) * lensCoeff / depths;
	cocs = clamp( cocs, vec4f( - maxCoc ), vec4f( maxCoc ) );

	let weights = clamp( abs( cocs ) * rcpMaxCoc, vec4f( 0.0 ), vec4f( 1.0 ) );

	var avg = c0 * weights.x + c1 * weights.y + c2 * weights.z + c3 * weights.w;
	avg /= dot( weights, vec4f( 1.0 ) ) + 0.0001;

	let coc = dot( cocs, vec4f( 0.25 ) );

	avg *= smoothstep( 0.0, texel.y * 2.0, abs( coc ) );

	return vec4f( avg, coc );

}
