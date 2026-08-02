// demo-webgl の SkyBox/shaders/skyBox.fs のWGSL移植。
// 前置される宣言: VertexOutput / GBufferOutput / frame / Surface系（Bindings）

#include "../../../_common/noise.wgsl"

struct SkyResult {
	albedo: vec3f,
	emission: vec3f,
};

fn skyBox( input: VertexOutput ) -> SkyResult {

	var result: SkyResult;

	result.albedo = vec3f( 0.0, 0.05, 0.1 );

	let sPos = input.worldPosition * 0.1;

	let n = noiseValue( sPos * 0.05 + frame.uTimeE * 0.1 );

	var n2Pos = sPos;
	let xz = n2Pos.xz * rotate2d( n2Pos.y * 0.02 );
	n2Pos = vec3f( xz.x, n2Pos.y, xz.y );
	let n2 = noiseValue( n2Pos * 0.01 + vec3f( 0.0, 0.0, frame.uTimeE * 0.5 + n ) );

	let phase = 4.5;

	let line = smoothstep( 0.88, 0.9, fract( n2 * phase ) );

	let uv = input.uv;
	let patternUv = ( uv + vec2f( floor( uv.y * 150.0 ) / 150.0 * 0.25, 0.0 ) ) * vec2f( 2.0, 1.0 ) * 150.0;
	let pattern = smoothstep( 0.2, 0.1, length( fract( patternUv ) - 0.5 ) ) * step( n2 * phase, 2.0 ) * 0.8;

	let emit = min( line + pattern, 1.0 );

	result.emission = vec3f( emit * 3.0 * smoothstep( 0.4, 1.0, n ) );

	return result;

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	let sky = skyBox( input );

	surface.albedo = sky.albedo;
	surface.emission = sky.emission;
	surface.roughness = 1.0;
	surface.envIntensity = 0.0;

	return packGBuffer( input, surface );

}

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	let sky = skyBox( input );

	return vec4f( sky.albedo + sky.emission, 1.0 );

}
