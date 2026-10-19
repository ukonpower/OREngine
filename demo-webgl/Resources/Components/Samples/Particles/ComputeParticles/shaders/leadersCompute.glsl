// 群れの先頭。エンティティの原点へ引くばねで周回させる。前のステップの状態を読み、次の状態を書く。
// demo-webgpu の leadersCompute.wgsl と同じ計算

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

// 前のステップの pos / vel
uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
// 1ステップで進める秒
uniform float uDelta;

in vec2 vUv;

// 原点へ引くばねの強さ。demo-webgpu の leadersCompute.wgsl と同じ値
const float LEADER_STIFFNESS = 6.0;

void main( void ) {

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// 速度を先に変え、変えた速度で位置を進める（この順だと周回の半径が少しずつ広がっていかない）
	velocity.xyz -= position.xyz * LEADER_STIFFNESS * uDelta;
	position.xyz += velocity.xyz * uDelta;

	outColor0 = position;
	outColor1 = velocity;

}
