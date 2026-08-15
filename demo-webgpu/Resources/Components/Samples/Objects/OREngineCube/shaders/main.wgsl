// demo-webgl の OREngineCube/shaders/main.fs のWGSL移植。
// webgl側はノイズテクスチャ(.tex)を参照するが、webgpuは.tex未対応のため
// 値ノイズで同等の模様を手続き的に作る

#include <module:noise>

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	// uvを別のノイズで歪ませてから模様を引く（webgl側の二重テクスチャ参照の代替）
	let warp = vec2f(
		noiseFbm( vec3f( input.uv * 4.0, 0.0 ) ),
		noiseFbm( vec3f( input.uv * 4.0, 7.3 ) )
	);

	let noise = noiseFbm( vec3f( input.uv * 0.8 + warp * 0.8, 3.1 ) );

	surface.roughness = smoothstep( 0.2, 0.9, noise );
	surface.albedo = vec3f( 1.0 - surface.roughness * 0.3 );

	var normal = surface.normal;
	let n2 = noiseFbm( vec3f( input.uv * 4.0 + warp * 0.8, 11.7 ) );
	let n3 = noiseFbm( vec3f( input.uv * 4.0 + warp * 0.8, 21.3 ) );
	normal = normalize( normal + vec3f( n2 - 0.5, 0.0, n3 - 0.5 ) * 0.06 );
	surface.normal = normal;

	return packGBuffer( input, surface );

}
