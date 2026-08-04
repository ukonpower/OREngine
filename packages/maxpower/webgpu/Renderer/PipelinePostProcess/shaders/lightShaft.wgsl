// カメラからの視線をレイマーチしてシャドウマップを引き、光の筋を積む。
// 1フレームぶんのレイマーチはサンプルが足りないので、開始位置をピクセルごとにずらして
// 前フレームの結果へ足し込む。空間方向のならしは lightShaftBlur が担当する。
//
// 外から与えられる名前:
//   uGbufferPos … gBufferのワールド座標（NEAREST）
//   uLightShaftBackBuffer … 前フレームの自分の出力
//   pp.uIntensity … 0でこのパスの寄与を消す
//   pp.uFrame … ジッタを回すためのフレーム番号
//   pp.uTemporal … 0で時間方向の蓄積をやめ、1フレームぶんの結果をそのまま出す
//   pp.uTemporalBlend … 新しい結果の重み。小さいほどノイズは減るが、影の出入りが尾を引く

#include "./random.wgsl"

const MARCH_LENGTH = 60.0;
const MARCH = 32;

const LUMA = vec3f( 0.299, 0.587, 0.114 );

// 再投影が画面上で動いた量に対して履歴を捨てる強さ。
// 画面の5%ぶん動いたら履歴を使わなくなる（1.0 / 0.05）
const TEMPORAL_REJECT = 20.0;

// 明るさの変わり方に対して履歴を捨てる境目（前フレームとの相対差）。
// 遮蔽物が動いた画素は影が丸ごと入れ替わるので大きく振れる。
// 下限はレイマーチのばらつきぶんで、ここを下げすぎると蓄積が効かなくなる
const CHANGE_LOW = 0.25;
const CHANGE_HIGH = 1.0;

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let ndc = uvToNdc( input.uv );

	var rayPos = frame.uCameraPosition;
	let farPoint = frame.uCameraMatrix * frame.uProjectionMatrixInverse * vec4f( ndc, 1.0, 1.0 );
	let rayDir = normalize( farPoint.xyz / farPoint.w - frame.uCameraPosition );

	// レイの終端はgBufferのワールド座標。書かれていなければ十分遠くまで進める
	let gPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;
	let rayEndPos = select( gPos, rayPos + rayDir * 100.0, dot( gPos, gPos ) == 0.0 );

	let rayLength = length( rayEndPos - rayPos );
	let rayStepLength = MARCH_LENGTH / f32( MARCH );
	let rayStep = rayDir * rayStepLength;

	// 開始位置をステップ1つぶんの範囲で散らして等間隔の縞を崩す
	var totalRayLength = interleavedGradientNoise( input.position.xy, pp.uFrame ) * rayStepLength;
	rayPos += rayDir * totalRayLength;

	var sum = vec3f( 0.0 );

	for ( var i = 0; i < MARCH; i ++ ) {

		rayPos += rayStep;
		totalRayLength += rayStepLength;

		if ( totalRayLength >= rayLength ) {

			break;

		}

		for ( var l = 0; l < lights.numLightDir; l ++ ) {

			let light = lights.directionalLight[ l ];
			var shadow = 1.0;

			if ( light.useShadow > 0.5 ) {

				shadow = sampleShadowPoint( directionalShadowMap, l, light.shadowMatrix, rayPos );

			}

			sum += light.color * shadow * rayStepLength * 0.0025;

		}

		for ( var l = 0; l < lights.numLightSpot; l ++ ) {

			let light = lights.spotLight[ l ];
			var shadow = 1.0;

			if ( light.useShadow > 0.5 ) {

				shadow = sampleShadowPoint( spotShadowMap, l, light.shadowMatrix, rayPos );

			}

			let toLight = light.position - rayPos;
			let spotDirection = normalize( toLight );
			let spotDistance = length( toLight );
			let spotAngleCos = dot( light.direction, spotDirection );

			var spotAttenuation = 0.0;

			if ( spotAngleCos > light.angle * - 1.0 ) {

				spotAttenuation = smoothstep( light.angle, light.angle + ( 1.0 - light.angle ) * light.blend, spotAngleCos );

			}

			sum += light.color * shadow * spotAttenuation
				* pow( clamp( 1.0 - spotDistance / light.distance, 0.0, 1.0 ), light.decay * 1.9 )
				* rayStepLength * 0.02;

		}

	}

	sum *= 0.4 * pp.uIntensity;

	if ( pp.uTemporal < 0.5 ) {

		return vec4f( sum, 1.0 );

	}

	// レイの終端を前フレームのカメラで見たときの画面位置。そこに前フレームの筋が残っている
	let prevClip = frame.uProjectionMatrixPrev * frame.uViewMatrixPrev * vec4f( rayEndPos, 1.0 );
	let prevUv = ndcToUv( prevClip.xy / prevClip.w );

	let history = textureSampleLevel( uLightShaftBackBuffer, ppSampler, prevUv, 0.0 ).xyz;

	// 画面上で大きく動いたピクセルは、遮蔽の入れ替わりで前の値が別物になっている
	let motion = length( prevUv - input.uv );

	// 遮蔽物だけが動いた場合は再投影では捉えられないので、明るさの変化そのものからも判断する
	let lumSum = dot( sum, LUMA );
	let lumHistory = dot( history, LUMA );
	let change = abs( lumSum - lumHistory ) / max( max( lumSum, lumHistory ), 0.0001 );

	var alpha = pp.uTemporalBlend + motion * TEMPORAL_REJECT;
	alpha = mix( alpha, 1.0, smoothstep( CHANGE_LOW, CHANGE_HIGH, change ) );

	// 画面の外から来たピクセルには履歴が無い
	let offscreen = prevClip.w <= 0.0 || any( prevUv < vec2f( 0.0 ) ) || any( prevUv > vec2f( 1.0 ) );

	return vec4f( mix( history, sum, select( clamp( alpha, 0.0, 1.0 ), 1.0, offscreen ) ), 1.0 );

}
