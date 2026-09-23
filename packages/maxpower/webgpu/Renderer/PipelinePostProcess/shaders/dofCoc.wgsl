// 錯乱円（CoC）を求めつつ、ボケ用に1/2解像度へ落とす（KinoBokeh の Prefilter.cginc）

fn sampleDepth( uv: vec2f ) -> f32 {

	return - ( frame.uViewMatrix * vec4f( textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz, 1.0 ) ).z;

}

// 明るい画素ほど重みを下げてちらつきを抑える（KinoBokeh の PREFILTER_LUMA_WEIGHT）
fn lumaWeight( c: vec3f ) -> f32 {

	return 1.0 / ( max( c.x, max( c.y, c.z ) ) + 1.0 );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let focusDistance = pp.uParams.x;
	let maxCoc = pp.uParams.y;
	let rcpMaxCoc = pp.uParams.z;
	let lensCoeff = pp.uParams.w;

	// 縮小元（フル解像度）の texel。出力先（1/2 解像度）の uPPPixelSize を使うと、
	// CoC の前乗算の幅が倍になってピントの境界が黒ずむ
	let texel = 1.0 / vec2f( textureDimensions( uBackBuffer0 ) );
	let duv = vec3f( texel.x, texel.y, - texel.x ) * 0.5;

	let c0 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv - duv.xy, 0.0 ).xyz;
	let c1 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv - duv.zy, 0.0 ).xyz;
	let c2 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv + duv.zy, 0.0 ).xyz;
	let c3 = textureSampleLevel( uBackBuffer0, ppSampler, input.uv + duv.xy, 0.0 ).xyz;

	let depths = vec4f(
		sampleDepth( input.uv - duv.xy ),
		sampleDepth( input.uv - duv.zy ),
		sampleDepth( input.uv + duv.zy ),
		sampleDepth( input.uv + duv.xy )
	);

	var cocs = ( depths - focusDistance ) * lensCoeff / depths;
	cocs = clamp( cocs, vec4f( - maxCoc ), vec4f( maxCoc ) );

	let weights = clamp( abs( cocs ) * rcpMaxCoc, vec4f( 0.0 ), vec4f( 1.0 ) ) * vec4f( lumaWeight( c0 ), lumaWeight( c1 ), lumaWeight( c2 ), lumaWeight( c3 ) );

	var avg = c0 * weights.x + c1 * weights.y + c2 * weights.z + c3 * weights.w;
	avg /= dot( weights, vec4f( 1.0 ) ) + 0.0001;

	let coc = dot( cocs, vec4f( 0.25 ) );

	avg *= smoothstep( 0.0, texel.y * 2.0, abs( coc ) );

	return vec4f( avg, coc );

}
