// 半球状に散らしたサンプル点で遮蔽を測る。
// 1フレームぶんのサンプルでは足りないので、カーネルの向きをピクセルごと・フレームごとに回して
// 前フレームの結果へ足し込む。空間方向のならしは ssaoBlur が担当する。
//
// 外から与えられる名前:
//   SSAO_SAMPLES / SSAO_KERNEL … 生成時に値が決まるため buildSsaoWgsl が前置する
//   uGbufferPos … gBufferのワールド座標（NEAREST）
//   uGbufferNormal … normalSelector の法線（NEAREST）
//   uSsaoBackBuffer … 前フレームの自分の出力（x: 遮蔽、y: そのときのビュー空間Z）
//   pp.uIntensity … 遮蔽の強さ。0でこのパスの寄与が消える
//   pp.uFrame … ジッタを回すためのフレーム番号
//   pp.uTemporal … 0で時間方向の蓄積をやめ、1フレームぶんの結果をそのまま出す
//   pp.uTemporalBlend … 新しい結果の重み。小さいほどノイズは減るが、遮蔽の変化が尾を引く

#include "./random.wgsl"

// 再投影が画面上で動いた量に対して履歴を捨てる強さ。
// 画面の5%ぶん動いたら履歴を使わなくなる（lightShaft の TEMPORAL_REJECT と同じ値）
const TEMPORAL_REJECT = 20.0;

// 前フレームに同じ場所で見えていた面との深度の食い違い（相対差）に対して履歴を捨てる境目。
// 再投影は静止物の前提なので、物体が動いた画素や遮蔽の入れ替わった画素はここで弾く
const DEPTH_REJECT_LOW = 0.02;
const DEPTH_REJECT_HIGH = 0.1;

// ワールド座標をカメラのクリップ空間へ落としてテクスチャ座標にする
fn worldToUv( worldPosition: vec3f ) -> vec2f {

	let projected = frame.uProjectionMatrix * frame.uViewMatrix * vec4f( worldPosition, 1.0 );

	return ndcToUv( projected.xy / projected.w );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let rayPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, input.uv, 0.0 ).xyz;

	// gBufferが書かれていない画素と、遠すぎる画素は遮蔽なし
	if ( dot( rayPos, rayPos ) == 0.0 || length( rayPos - frame.uCameraPosition ) > 100.0 ) {

		return vec4f( 0.0, 0.0, 0.0, 1.0 );

	}

	let normal = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;

	let dist = 0.5;
	let objectDepth = 0.2;

	// 法線まわりの向きをピクセルごとに回す。IGN は隣の画素と値が偏らず、
	// フレーム番号で位相がずれるので、蓄積すると全方向を均等に拾える
	let angle = interleavedGradientNoise( input.position.xy, pp.uFrame ) * 2.0 * PI;

	let up = select( vec3f( 0.0, 1.0, 0.0 ), vec3f( 1.0, 0.0, 0.0 ), abs( normal.y ) > 0.99 );
	let baseTangent = normalize( cross( up, normal ) );
	let baseBitangent = cross( normal, baseTangent );

	let tangent = baseTangent * cos( angle ) + baseBitangent * sin( angle );
	let bitangent = cross( normal, tangent );
	let kernelMatrix = mat3x3f( tangent, bitangent, normal );

	var occlusion = 0.0;

	for ( var i = 0; i < SSAO_SAMPLES; i ++ ) {

		let sampleOffset = kernelMatrix * SSAO_KERNEL[ i ];
		let samplePos = rayPos + sampleOffset * dist;

		let sampledWorld = textureSampleLevel( uGbufferPos, ppSamplerNearest, worldToUv( samplePos ), 0.0 ).xyz;

		let sampledViewZ = ( frame.uViewMatrix * vec4f( sampledWorld, 1.0 ) ).z;
		let sampleViewZ = ( frame.uViewMatrix * vec4f( samplePos, 1.0 ) ).z;

		if ( sampleViewZ < sampledViewZ && sampleViewZ >= sampledViewZ - objectDepth ) {

			occlusion += 1.0 - pow( length( sampleOffset ), 2.0 );

		}

	}

	occlusion = occlusion / f32( SSAO_SAMPLES ) * pp.uIntensity;

	// 履歴と突き合わせるため、この画素の面のビュー空間Zも一緒に残す
	let viewZ = ( frame.uViewMatrix * vec4f( rayPos, 1.0 ) ).z;

	if ( pp.uTemporal < 0.5 ) {

		return vec4f( occlusion, viewZ, 0.0, 1.0 );

	}

	// この画素の面を前フレームのカメラで見たときの画面位置。そこに前フレームの遮蔽が残っている
	let prevView = frame.uViewMatrixPrev * vec4f( rayPos, 1.0 );
	let prevClip = frame.uProjectionMatrixPrev * prevView;
	let prevUv = ndcToUv( prevClip.xy / prevClip.w );

	let history = textureSampleLevel( uSsaoBackBuffer, ppSampler, prevUv, 0.0 ).xy;

	// 画面上で大きく動いたピクセルは、周りの遮蔽物との位置関係が変わっている
	let motion = length( prevUv - input.uv );

	// 前フレームにそこで見えていた面が同じ面なら、前フレームのカメラから見た深度が一致する
	let depthDiff = abs( history.y - prevView.z ) / max( abs( prevView.z ), 0.0001 );

	var alpha = pp.uTemporalBlend + motion * TEMPORAL_REJECT;
	alpha = mix( alpha, 1.0, smoothstep( DEPTH_REJECT_LOW, DEPTH_REJECT_HIGH, depthDiff ) );

	// 画面の外から来たピクセルには履歴が無い
	let offscreen = prevClip.w <= 0.0 || any( prevUv < vec2f( 0.0 ) ) || any( prevUv > vec2f( 1.0 ) );

	return vec4f( mix( history.x, occlusion, select( clamp( alpha, 0.0, 1.0 ), 1.0, offscreen ) ), viewZ, 0.0, 1.0 );

}
