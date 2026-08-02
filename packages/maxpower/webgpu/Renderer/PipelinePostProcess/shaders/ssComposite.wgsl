// フレネルで重み付けして反射色を足す

fn ssFresnel( d: f32 ) -> f32 {

	let f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let position = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 );
	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 );

	var color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	let dir = normalize( frame.uCameraPosition - position.xyz );
	let f = ssFresnel( clamp( dot( dir, normal.xyz ), 0.0, 1.0 ) );

	color += f * textureSampleLevel( uSSRTexture, ppSampler, input.uv, 0.0 ).xyz * 0.15;

	return vec4f( color, 1.0 );

}
