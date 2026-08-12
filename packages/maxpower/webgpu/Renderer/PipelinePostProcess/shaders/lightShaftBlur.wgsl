// 光の筋のならし。レイマーチのジッタが残したざらつきを消す。縦横で2回かける。
// 筋そのものは低周波なので、手前の面と奥の空間をまたいで滲まないぶんだけ重みを落とせば足りる。
// BLUR_SAMPLES / BLUR_WEIGHTS / BLUR_DIRECTION は buildLightShaftBlurWgsl が前置する
//
// 外から与えられる名前:
//   uBackBuffer0 … ぼかす元（チェーンが繋ぐ前のパスの出力）
//   uGbufferPos … gBufferのワールド座標（NEAREST）

// カメラ距離がこれだけ離れると重みが半分になる
const DEPTH_FALLOFF = 1.0;

// gBufferに何も書かれていない画素の扱い。カメラ位置に依らず一定にしたいので、
// 原点までの距離ではなく決め打ちの遠方を返す（lightShaft がレイを伸ばす距離と同じ）
const BACKGROUND_DEPTH = 100.0;

fn viewDepth( uv: vec2f ) -> f32 {

	let gPos = textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz;

	if ( dot( gPos, gPos ) == 0.0 ) {

		return BACKGROUND_DEPTH;

	}

	return length( gPos - frame.uCameraPosition );

}

fn depthWeight( uv: vec2f, depthBasis: f32 ) -> f32 {

	return 1.0 / ( 1.0 + abs( viewDepth( uv ) - depthBasis ) / DEPTH_FALLOFF );

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let depthBasis = viewDepth( input.uv );

	var sum = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz * BLUR_WEIGHTS[ 0 ];
	var weight = BLUR_WEIGHTS[ 0 ];

	for ( var i = 1; i < BLUR_SAMPLES; i ++ ) {

		let offset = f32( i ) * BLUR_DIRECTION * pp.uPPPixelSize;

		let uvP = input.uv + offset;
		let uvN = input.uv - offset;

		let wP = depthWeight( uvP, depthBasis ) * BLUR_WEIGHTS[ i ];
		let wN = depthWeight( uvN, depthBasis ) * BLUR_WEIGHTS[ i ];

		sum += textureSampleLevel( uBackBuffer0, ppSampler, uvP, 0.0 ).xyz * wP;
		sum += textureSampleLevel( uBackBuffer0, ppSampler, uvN, 0.0 ).xyz * wN;

		weight += wP + wN;

	}

	return vec4f( sum / weight, 1.0 );

}
