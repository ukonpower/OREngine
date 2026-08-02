@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;
	let edge = length( input.uv - 0.5 ) * 1.4;

	return vec4f( mix( color, color * pp.uTint, edge * edge ), 1.0 );

}
