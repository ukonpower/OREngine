@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	surface.albedo = material.uColor;
	surface.roughness = 0.35;
	surface.metallic = 0.0;

	return packGBuffer( input, surface );

}
