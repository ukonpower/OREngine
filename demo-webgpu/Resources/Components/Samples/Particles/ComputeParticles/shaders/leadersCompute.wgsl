// 群れの先頭。エンティティの原点へ引くばねで周回させる。前のステップの状態（src）を読み、次の状態（dst）を書く。
// demo-webgl の leadersCompute.glsl と同じ計算。
// 前置される名前: GPU_COUNT / GPU_WORKGROUP（定数）, gpu.uDelta（1ステップで進める秒）, src / dst（array<Leader>）, Leader

// 原点へ引くばねの強さ。demo-webgl の leadersCompute.glsl と同じ値
const LEADER_STIFFNESS = 6.0;

@compute @workgroup_size(GPU_WORKGROUP)
fn csMain( @builtin(global_invocation_id) id: vec3u ) {

	let i = id.x;

	if ( i >= GPU_COUNT ) {

		return;

	}

	let leader = src[ i ];

	// 速度を先に変え、変えた速度で位置を進める（この順だと周回の半径が少しずつ広がっていかない）
	let vel = leader.vel.xyz - leader.pos.xyz * LEADER_STIFFNESS * gpu.uDelta;
	let pos = leader.pos.xyz + vel * gpu.uDelta;

	dst[ i ] = Leader( vec4f( pos, leader.pos.w ), vec4f( vel, leader.vel.w ) );

}
