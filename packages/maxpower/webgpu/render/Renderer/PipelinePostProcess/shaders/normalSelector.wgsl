// gBufferの法線と、位置から復元した法線を選択的に混ぜる（SSR用のなめらかな法線）

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let normalTex = textureSampleLevel( uNormalTexture, ppSamplerNearest, input.uv, 0.0 );
	let texel = pp.uPPPixelSize;

	let center = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let right = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv + vec2f( texel.x, 0.0 ), 0.0 ).xyz;
	let top = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv + vec2f( 0.0, texel.y ), 0.0 ).xyz;
	let left = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv - vec2f( texel.x, 0.0 ), 0.0 ).xyz;
	let bottom = textureSampleLevel( uPosTexture, ppSamplerNearest, input.uv - vec2f( 0.0, texel.y ), 0.0 ).xyz;

	let dx1 = right - center;
	let dy1 = top - center;
	let dx2 = - ( left - center );
	let dy2 = - ( bottom - center );

	let calcNormal = normalize( cross(
		select( dx2, dx1, length( dx1 ) < length( dx2 ) ),
		select( dy2, dy1, length( dy1 ) < length( dy2 ) )
	) );

	let selector = textureSampleLevel( uSelectorTexture, ppSampler, input.uv, 0.0 );

	return vec4f( mix( normalTex.xyz, calcNormal, selector.z ), normalTex.w );

}
