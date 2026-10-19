// 粒。自分の先頭（leaders）へばねで引かれ、速さに比例した抵抗で揺れが収まっていく。ばねの強さは粒ごとに pos.w に持つ。
// 前のステップの状態（src）を読み、次の状態（dst）を書く。demo-webgl の particlesCompute.glsl と同じ計算。
// 前置される名前: GPU_COUNT / GPU_WORKGROUP / PER_LEADER（定数）, gpu.uDelta（1ステップで進める秒）,
// src / dst（array<Particle>）, leaders（array<Leader>。同じステップで先に計算した先頭）

// 速さに比例した抵抗の強さ。demo-webgl の particlesCompute.glsl と同じ値
const DAMPING = 2.0;

@compute @workgroup_size(GPU_WORKGROUP)
fn csMain( @builtin(global_invocation_id) id: vec3u ) {

	let i = id.x;

	if ( i >= GPU_COUNT ) {

		return;

	}

	let particle = src[ i ];
	let leader = leaders[ i / PER_LEADER ];
	let stiffness = particle.pos.w;

	let acceleration = ( leader.pos.xyz - particle.pos.xyz ) * stiffness - particle.vel.xyz * DAMPING;
	let vel = particle.vel.xyz + acceleration * gpu.uDelta;
	let pos = particle.pos.xyz + vel * gpu.uDelta;

	dst[ i ] = Particle( vec4f( pos, stiffness ), vec4f( vel, particle.vel.w ) );

}
