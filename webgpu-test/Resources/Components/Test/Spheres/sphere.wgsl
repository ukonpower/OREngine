@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	surface.albedo = material.uColor;
	surface.roughness = material.uRoughness;
	surface.metallic = material.uMetallic;

	return packGBuffer( input, surface );

}
