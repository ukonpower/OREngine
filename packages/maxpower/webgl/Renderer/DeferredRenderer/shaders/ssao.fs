// 半球状に散らしたサンプル点で遮蔽を測る。
// 1フレームぶんのサンプルでは足りないので、カーネルの向きをピクセルごと・フレームごとに回して
// 前フレームの結果へ足し込む。空間方向のならしは ssaoBlur が担当する。
// webgpu 側の ssao.wgsl と同じ処理

#include <module:common>
#include <module:random>

// uniforms

// 前フレームの自分の出力（x: 遮蔽、y: そのときのビュー空間Z）
uniform sampler2D uSSAOBackBuffer;

uniform sampler2D sampler0; // position
uniform sampler2D sampler1; // normal

// ジッタを回すためのフレーム番号（lightShaft と同じ値）
uniform float uFrame;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrixPrev;
uniform mat4 uProjectionMatrixPrev;
uniform vec3 uCameraPosition;

// core/utils/SSAOKernel の半球状のサンプル点
uniform vec3 uSSAOKernel[SSAO_SAMPLES];

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// 新しい結果の重み。小さいほどノイズは減るが、遮蔽の変化が尾を引く。
// lightShaft（0.3）より1フレームのばらつきが大きいので低めにしている
const float TEMPORAL_BLEND = 0.2;

// 再投影が画面上で動いた量に対して履歴を捨てる強さ。
// 画面の5%ぶん動いたら履歴を使わなくなる（lightShaft の TEMPORAL_REJECT と同じ値）
const float TEMPORAL_REJECT = 20.0;

// 前フレームに同じ場所で見えていた面との深度の食い違い（相対差）に対して履歴を捨てる境目。
// 再投影は静止物の前提なので、物体が動いた画素や遮蔽の入れ替わった画素はここで弾く
const float DEPTH_REJECT_LOW = 0.02;
const float DEPTH_REJECT_HIGH = 0.1;

// ワールド座標をカメラのクリップ空間へ落としてテクスチャ座標にする
vec2 worldToUv( vec3 worldPosition ) {

	vec4 projected = uProjectionMatrix * uViewMatrix * vec4( worldPosition, 1.0 );

	return projected.xy / projected.w * 0.5 + 0.5;

}

void main( void ) {

	vec3 rayPos = texture( sampler0, vUv ).xyz;

	// gBufferが書かれていない画素と、遠すぎる画素は遮蔽なし
	if( dot( rayPos, rayPos ) == 0.0 || length( rayPos - uCameraPosition ) > 100.0 ) {

		outColor = vec4( 0.0, 0.0, 0.0, 1.0 );
		return;

	}

	vec3 normal = texture( sampler1, vUv ).xyz;

	float dist = 0.5;
	float objectDepth = 0.2;

	// 法線まわりの向きをピクセルごとに回す。IGN は隣の画素と値が偏らず、
	// フレーム番号で位相がずれるので、蓄積すると全方向を均等に拾える
	float angle = interleavedGradientNoise( gl_FragCoord.xy, uFrame ) * TPI;

	vec3 up = abs( normal.y ) > 0.99 ? vec3( 1.0, 0.0, 0.0 ) : vec3( 0.0, 1.0, 0.0 );
	vec3 baseTangent = normalize( cross( up, normal ) );
	vec3 baseBitangent = cross( normal, baseTangent );

	vec3 tangent = baseTangent * cos( angle ) + baseBitangent * sin( angle );
	vec3 bitangent = cross( normal, tangent );
	mat3 kernelMatrix = mat3( tangent, bitangent, normal );

	float occlusion = 0.0;

	for( int i = 0; i < SSAO_SAMPLES; i ++ ) {

		vec3 sampleOffset = kernelMatrix * uSSAOKernel[ i ];
		vec3 samplePos = rayPos + sampleOffset * dist;

		vec3 sampledWorld = texture( sampler0, worldToUv( samplePos ) ).xyz;

		float sampledViewZ = ( uViewMatrix * vec4( sampledWorld, 1.0 ) ).z;
		float sampleViewZ = ( uViewMatrix * vec4( samplePos, 1.0 ) ).z;

		if( sampleViewZ < sampledViewZ && sampleViewZ >= sampledViewZ - objectDepth ) {

			occlusion += 1.0 - pow( length( sampleOffset ), 2.0 );

		}

	}

	occlusion /= float( SSAO_SAMPLES );

	// 履歴と突き合わせるため、この画素の面のビュー空間Zも一緒に残す
	float viewZ = ( uViewMatrix * vec4( rayPos, 1.0 ) ).z;

	// この画素の面を前フレームのカメラで見たときの画面位置。そこに前フレームの遮蔽が残っている
	vec4 prevView = uViewMatrixPrev * vec4( rayPos, 1.0 );
	vec4 prevClip = uProjectionMatrixPrev * prevView;
	vec2 prevUv = prevClip.xy / prevClip.w * 0.5 + 0.5;

	vec2 history = texture( uSSAOBackBuffer, prevUv ).xy;

	// 画面上で大きく動いたピクセルは、周りの遮蔽物との位置関係が変わっている
	float motion = length( prevUv - vUv );

	// 前フレームにそこで見えていた面が同じ面なら、前フレームのカメラから見た深度が一致する
	float depthDiff = abs( history.y - prevView.z ) / max( abs( prevView.z ), 0.0001 );

	float alpha = TEMPORAL_BLEND + motion * TEMPORAL_REJECT;
	alpha = mix( alpha, 1.0, smoothstep( DEPTH_REJECT_LOW, DEPTH_REJECT_HIGH, depthDiff ) );

	// 画面の外から来たピクセルには履歴が無い
	if( prevClip.w <= 0.0 || prevUv.x < 0.0 || prevUv.y < 0.0 || prevUv.x > 1.0 || prevUv.y > 1.0 ) {

		alpha = 1.0;

	}

	outColor = vec4( mix( history.x, occlusion, clamp( alpha, 0.0, 1.0 ) ), viewZ, 0.0, 1.0 );

}
