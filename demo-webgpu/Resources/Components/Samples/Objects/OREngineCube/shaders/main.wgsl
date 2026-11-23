// demo-webgl の OREngineCube/shaders/main.fs と同じ式の素材。両バックエンドでテクスチャを引かずに模様を計算する
// 前置される名前: VertexOutput / Surface / defaultSurface / packGBuffer

#include <module:noise>

const CUBE_PI = 3.14159265359;

// webgl 側 module:noise_value の fbm と同じ 5 オクターブ（module:noise の noiseFbm は 3 オクターブなので別に持つ）
fn cubeFbm( x: vec3f ) -> f32 {

	var v = 0.0;
	var a = 0.5;
	var p = x;

	for ( var i = 0; i < 5; i ++ ) {

		v += a * noiseValue( p );
		p = p * 2.0 + vec3f( 100.0 );
		a *= 0.5;

	}

	return v;

}

// 汚れの模様の 1 成分。webgl 側 main.fs の cubeNoise と同じ式
fn cubeNoise( uv: vec2f, seed: f32 ) -> f32 {

	let p = fract( uv );
	let v = p * 15.0;
	let lv = abs( p - 0.5 ) * 15.0;

	// 折り返しの継ぎ目が目立たないよう、端へ向けて中心からの距離で引いた模様へ寄せる
	let lw = sin( p.x * CUBE_PI ) * sin( p.y * CUBE_PI );

	return mix( cubeFbm( vec3f( lv, seed ) ), cubeFbm( vec3f( v, seed ) ), lw );

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	// 模様を引く uv を別の模様でゆがめる
	let warp = vec2f( cubeNoise( input.uv * 0.5, 0.0 ), cubeNoise( input.uv * 0.5, 100.0 ) );
	let noiseUv = input.uv * 0.1 + 0.1 * warp;

	let roughnessNoise = cubeNoise( noiseUv, 0.0 );
	let normalNoise = vec2f( cubeNoise( noiseUv, 100.0 ), cubeNoise( noiseUv, 200.0 ) );

	surface.roughness = smoothstep( 0.2, 0.9, roughnessNoise );
	surface.albedo = vec3f( 1.0 - surface.roughness * 0.3 );

	var normal = surface.normal;
	normal.x += normalNoise.x * 0.03;
	normal.z += normalNoise.y * 0.03;
	surface.normal = normalize( normal );

	return packGBuffer( input, surface );

}
