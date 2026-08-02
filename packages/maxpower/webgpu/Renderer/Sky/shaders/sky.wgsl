// レンダラーが持つ空。deferred（背景として見える）と envMap（環境光の元）の両方に参加する

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
