// 既定マテリアル。フェーズごとのentry pointの最小形でもある

#include "./standardVertex.wgsl"

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	return packGBuffer( input, defaultSurface( input ) );

}

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	let normal = normalize( input.normal );
	let lightDir = normalize( vec3f( 0.5, 1.0, 0.4 ) );
	let diffuse = max( dot( normal, lightDir ), 0.0 ) * 0.8 + 0.2;

	return vec4f( vec3f( diffuse ), 1.0 );

}
