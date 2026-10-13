// カメラからの視線をレイマーチしてシャドウマップを引き、光の筋を積む。
// 1フレームぶんのレイマーチはサンプルが足りないので、開始位置をピクセルごとにずらして
// 前フレームの結果へ足し込む。空間方向のならしは lightShaftBlur が担当する。
// webgpu 側の lightShaft.wgsl と同じ処理

#include <module:common>
#include <module:light>

// uniforms

uniform sampler2D uLightShaftBackBuffer;
uniform sampler2D uPosTexture;

// ジッタを回すためのフレーム番号
uniform float uFrame;
uniform mat4 uCameraMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform mat4 uViewMatrixPrev;
uniform mat4 uProjectionMatrixPrev;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

const float MARCH_LENGTH = 60.0;
const int MARCH = 32;

const vec3 LUMA = vec3( 0.299, 0.587, 0.114 );

// 新しい結果の重み。小さいほどノイズは減るが、影の出入りが尾を引く（webgpu 側の既定値と同じ）
const float TEMPORAL_BLEND = 0.3;

// 再投影が画面上で動いた量に対して履歴を捨てる強さ。
// 画面の5%ぶん動いたら履歴を使わなくなる（1.0 / 0.05）
const float TEMPORAL_REJECT = 20.0;

// 明るさの変わり方に対して履歴を捨てる境目（前フレームとの相対差）。
// 遮蔽物が動いた画素は影が丸ごと入れ替わるので大きく振れる。
// 下限はレイマーチのばらつきぶんで、ここを下げすぎると蓄積が効かなくなる
const float CHANGE_LOW = 0.25;
const float CHANGE_HIGH = 1.0;

#include <module:random>

void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec2 screen = vUv * 2.0 - 1.0;
	mat4 cp = uCameraMatrix * uProjectionMatrixInverse;

	// 始点は near 面上の点。並行投影ではカメラ位置から出ないので、画素ごとに near/far 面の点から求める
	vec4 np = cp * vec4( screen, -1.0, 1.0 );
	vec4 fp = cp * vec4( screen, 1.0, 1.0 );
	vec3 rayPos = np.xyz / np.w;
	vec3 rayDir = normalize( fp.xyz / fp.w - rayPos );

	// レイの終端はgBufferのワールド座標。書かれていなければ十分遠くまで進める
	vec3 rayEndPos = texture( uPosTexture, vUv ).xyz;

	if( dot( rayEndPos, rayEndPos ) == 0.0 ) {

		rayEndPos = rayPos + rayDir * 100.0;

	}

	float rayLength = length( rayEndPos - rayPos );

	float rayStepLength = MARCH_LENGTH / float( MARCH );
	vec3 rayStep = rayDir * rayStepLength;

	// 開始位置をステップ1つぶんの範囲で散らして等間隔の縞を崩す
	float totalRayLength = interleavedGradientNoise( gl_FragCoord.xy, uFrame ) * rayStepLength;
	rayPos += rayDir * totalRayLength;

	for( int i = 0; i < MARCH; i ++ ) {

		rayPos += rayStep;
		totalRayLength += rayStepLength;

		if( totalRayLength >= rayLength ) break;

		float shadow;

		#if NUM_LIGHT_DIR > 0

			DirectionalLight dLight;

			#pragma loop_start NUM_LIGHT_DIR

				dLight = directionalLight[ LOOP_INDEX ];

				#if LOOP_INDEX < NUM_SHADOWMAP_DIR

					shadow = getShadow( rayPos, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0 );

				#else

					shadow = 1.0;

				#endif

				lightShaftSum += dLight.color * shadow * rayStepLength * 0.0025;

			#pragma loop_end

		#endif

		// spotlight

		#if NUM_LIGHT_SPOT > 0

			SpotLight sLight;

			vec3 spotDirection;
			float spotDistance;
			float spotAngleCos;
			float spotAttenuation;

			#pragma loop_start NUM_LIGHT_SPOT

				sLight = uSpotLight[ LOOP_INDEX ];

				spotDirection = normalize(sLight.position - rayPos);
				spotDistance = length( sLight.position - rayPos );
				spotAngleCos = dot( sLight.direction, spotDirection );
				spotAttenuation = 0.0;

				if( spotAngleCos > sLight.angle * -1.0 ) {

					spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );

				}

				#if LOOP_INDEX < NUM_SHADOWMAP_SPOT

					shadow = getShadow( rayPos, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.0 );

				#else

					shadow = 1.0;

				#endif

				lightShaftSum += sLight.color *
					shadow *
					spotAttenuation / max( spotDistance * spotDistance, 0.0001 ) *
					rayStepLength * 0.02;

			#pragma loop_end

		#endif

	}

	lightShaftSum *= 0.4;

	// レイの終端を前フレームのカメラで見たときの画面位置。そこに前フレームの筋が残っている
	vec4 prevClip = uProjectionMatrixPrev * uViewMatrixPrev * vec4( rayEndPos, 1.0 );
	vec2 prevUv = prevClip.xy / prevClip.w * 0.5 + 0.5;

	vec3 history = texture( uLightShaftBackBuffer, prevUv ).xyz;

	// 画面上で大きく動いたピクセルは、遮蔽の入れ替わりで前の値が別物になっている
	float motion = length( prevUv - vUv );

	// 遮蔽物だけが動いた場合は再投影では捉えられないので、明るさの変化そのものからも判断する
	float lumSum = dot( lightShaftSum, LUMA );
	float lumHistory = dot( history, LUMA );
	float change = abs( lumSum - lumHistory ) / max( max( lumSum, lumHistory ), 0.0001 );

	float alpha = TEMPORAL_BLEND + motion * TEMPORAL_REJECT;
	alpha = mix( alpha, 1.0, smoothstep( CHANGE_LOW, CHANGE_HIGH, change ) );

	// 画面の外から来たピクセルには履歴が無い
	if( prevClip.w <= 0.0 || prevUv.x < 0.0 || prevUv.y < 0.0 || prevUv.x > 1.0 || prevUv.y > 1.0 ) {

		alpha = 1.0;

	}

	outColor = vec4( mix( history, lightShaftSum, clamp( alpha, 0.0, 1.0 ) ), 1.0 );

}
