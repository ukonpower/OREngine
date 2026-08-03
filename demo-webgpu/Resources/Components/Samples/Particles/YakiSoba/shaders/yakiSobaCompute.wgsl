// demo-webgl の yakiSobaCompute.glsl のWGSL移植。
// 前置される名前: GPU_COUNT / GPU_WORKGROUP / SEG / TRAILS（定数）,
// frame（FrameUniforms）, src / dst（array<TrailPoint>）, TrailPoint

#include <module:noise>

// 値ノイズ3つから向きを作る（webgl側の4Dシンプレックスノイズの代替）
fn noiseDir( p: vec3f, t: f32 ) -> vec3f {

	return normalize( vec3f(
		noiseValue( p + vec3f( 0.0, 0.0, t ) ) - 0.5,
		noiseValue( p + vec3f( 123.4, 0.0, t ) ) - 0.5,
		noiseValue( p + vec3f( 567.8, 0.0, t ) ) - 0.5
	) + vec3f( 1e-5 ) );

}

@compute @workgroup_size(GPU_WORKGROUP)
fn csMain( @builtin(global_invocation_id) id: vec3u ) {

	let i = id.x;

	if ( i >= GPU_COUNT ) {

		return;

	}

	let seg = i % SEG;
	let trail = i / SEG;
	let trailRatio = f32( trail ) / f32( TRAILS );

	var pos = src[ i ].pos;
	var vel = src[ i ].vel;

	let tOffset = frame.uTimeE * 0.4 + trailRatio * 0.8;
	let noise = noiseDir( pos.xyz * 1.23, tOffset ) * ( 0.002 + trailRatio * 0.001 );

	if ( seg == 0u ) {

		// 先頭: ノイズと引力・斥力で速度を更新して進む

		let gPos = pos.xyz * vec3f( 1.0, 1.0, 5.0 ) - vec3f( 0.0, 0.0, 3.0 );
		let gLen = length( gPos );

		var v = vel.xyz + noise;
		v += - gPos * smoothstep( 0.0, 6.0, gLen ) * 0.002;
		v += gPos * ( 1.0 - smoothstep( 0.5, 1.5, gLen ) ) * 0.02;
		v *= 0.98;

		vel = vec4f( v, vel.w );
		pos = vec4f( pos.xyz + v, pos.w );

	} else {

		// 後続: ひとつ頭側の点を追いかける

		let ahead = src[ i - 1u ].pos.xyz;

		pos = vec4f( mix( ahead, pos.xyz, 0.1 ) + noise * 5.0, pos.w );

	}

	pos.w = pos.w + frame.uDeltaTime * 0.1;

	dst[ i ] = TrailPoint( pos, vel );

}
