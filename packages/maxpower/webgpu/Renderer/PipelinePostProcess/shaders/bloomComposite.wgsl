// ぼかし各段をシーンへ足す。
// 段ごとの textureSampleLevel を並べた bloomSum() は buildBloomCompositeWgsl が前置する

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	var color = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;

	color += bloomSum( input.uv );

	return vec4f( color, 1.0 );

}
