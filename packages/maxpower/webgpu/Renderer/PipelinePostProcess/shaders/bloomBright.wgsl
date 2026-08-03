// トーンマップ前のHDRシーンから輝度を抜く

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let color = textureSampleLevel( uSceneHdr, ppSampler, input.uv, 0.0 ).xyz;

	return vec4f( max( color - pp.uThreshold, vec3f( 0.0 ) ) / 10.0 * pp.uBrightness, 1.0 );

}
