// 粒。自分の先頭へばねで引かれ、速さに比例した抵抗で揺れが収まっていく。ばねの強さは粒ごとに pos.w に持つ。
// 前のステップの状態を読み、次の状態を書く。demo-webgpu の particlesCompute.wgsl と同じ計算

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

// 前のステップの pos / vel
uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
// 同じステップで先に計算した先頭の pos（先頭の数 x 1 のテクスチャ）
uniform sampler2D uLeaderPos;
// 1ステップで進める秒
uniform float uDelta;

in vec2 vUv;

// 速さに比例した抵抗の強さ。demo-webgpu の particlesCompute.wgsl と同じ値
const float DAMPING = 2.0;

void main( void ) {

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	// 粒のテクスチャは1行が1つの先頭の粒なので、行の中心の y がそのまま先頭のテクスチャの x になる
	vec3 leader = texture( uLeaderPos, vec2( vUv.y, 0.5 ) ).xyz;

	vec3 acceleration = ( leader - position.xyz ) * position.w - velocity.xyz * DAMPING;

	velocity.xyz += acceleration * uDelta;
	position.xyz += velocity.xyz * uDelta;

	outColor0 = position;
	outColor1 = velocity;

}
