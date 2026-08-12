@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	return vec4f( textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz, 1.0 );

}
