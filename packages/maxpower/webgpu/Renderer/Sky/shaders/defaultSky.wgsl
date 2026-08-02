// レンダラー既定の空。プロジェクト側が renderer.sky.mesh.material を差し替えると使われなくなる

#include "../../../Material/shaders/standardVertex.wgsl"

// 上向きほど空色、下向きほど地面色
fn skyColor( normal: vec3f ) -> vec3f {

	let t = clamp( dot( normalize( normal ), vec3f( 0.0, 1.0, 0.0 ) ) * 0.5 + 0.5, 0.0, 1.0 );

	return mix( material.uGroundColor, material.uSkyColor * 2.0, t ) * material.uSkyIntensity;

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	// ライティングを受けず、放射だけで色を出す
	surface.albedo = vec3f( 0.0 );
	surface.emission = skyColor( input.normal );
	surface.roughness = 1.0;
	surface.envIntensity = 0.0;

	return packGBuffer( input, surface );

}

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	return vec4f( skyColor( input.normal ), 1.0 );

}
