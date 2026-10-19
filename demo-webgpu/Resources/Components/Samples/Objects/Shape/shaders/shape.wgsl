// demo-webgl の Shape/shaders/shape.fs と同じ面を作る。
// 前置される名前: VertexOutput / material（uColor / uRoughness / uMetallic / uEmission / uSSS）

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	surface.albedo = material.uColor;
	surface.roughness = material.uRoughness;
	surface.metallic = material.uMetallic;
	surface.emission = material.uColor * material.uEmission;
	surface.sss = material.uSSS;

	return packGBuffer( input, surface );

}
