// マテリアルが書き込む面の情報と、gBufferへの詰め込み。
// 出力先の struct GBufferOutput は Bindings のアタッチメント表から生成して前置される

struct Surface {
	albedo: vec3f,
	normal: vec3f,
	roughness: f32,
	metallic: f32,
	emission: vec3f,
	envIntensity: f32,
};

// マテリアルが値を上書きする土台
fn defaultSurface( input: VertexOutput ) -> Surface {

	return Surface( vec3f( 0.8 ), normalize( input.normal ), 0.5, 0.0, vec3f( 0.0 ), 1.0 );

}

// Surface を gBuffer の5枚へ詰める
fn packGBuffer( input: VertexOutput, surface: Surface ) -> GBufferOutput {

	var output: GBufferOutput;

	output.position = vec4f( input.worldPosition, surface.emission.x );
	output.normal = vec4f( normalize( surface.normal ), surface.emission.y );
	output.albedo = vec4f( surface.albedo, 0.0 );
	output.material = vec4f( surface.roughness, surface.metallic, 0.0, surface.envIntensity );
	output.velocity = vec4f( input.velocity, 0.0, surface.emission.z );

	return output;

}
