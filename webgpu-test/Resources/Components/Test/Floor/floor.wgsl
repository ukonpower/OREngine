@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	// 影の落ち方が分かるようにチェッカー柄にする
	let checker = ( floor( input.worldPosition.x ) + floor( input.worldPosition.z ) ) % 2.0;

	surface.albedo = mix( material.uColor, material.uColor * 0.5, abs( checker ) );
	surface.roughness = 0.7;
	surface.metallic = 0.0;

	return packGBuffer( input, surface );

}
