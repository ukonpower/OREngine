// ボケ結果をシーンへ重ねる

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let scene = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 );
	let boke = textureSampleLevel( uBokeTex, ppSampler, input.uv, 0.0 );

	return vec4f( scene.rgb * boke.a + boke.rgb, 1.0 );

}
