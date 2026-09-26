// 肌の拡散プロファイルでの分離可能ブラー（Jimenez 式）。横 → 縦の2回かける。webgl側 sss.fs の移植。
// 横は diffuse をぼかすだけ。縦はシェーディング結果の diffuse を、ぼかした diffuse へ置き換える。
// 境界の扱いは ssaoBlur と同じ（法線と深度が離れたサンプルの重みを下げる）。
// SSS_SAMPLES / SSS_KERNEL / SSS_DIRECTION / SSS_COMPOSITE は buildSssWgsl が、uRadius は pp が前置する

const ALPHA = 32.0;
const BETA = 0.25;

// 深度はgBufferのワールド座標からカメラ距離として求める
fn viewDepth( uv: vec2f ) -> f32 {

	return length( textureSampleLevel( uGbufferPos, ppSamplerNearest, uv, 0.0 ).xyz - frame.uCameraPosition );

}

// 法線・深度の近さと、サンプル先の SSS の強さで決まる重み（SSS の無い面から色を持ち込まない）
fn sssWeight( uv: vec2f, normalBasis: vec3f, depthBasis: f32 ) -> f32 {

	let normalOffset = textureSampleLevel( uGbufferNormal, ppSamplerNearest, uv, 0.0 ).xyz;
	let depthOffset = viewDepth( uv );

	return pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, ALPHA )
		* pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), BETA )
		* textureSampleLevel( uGbufferAlbedo, ppSamplerNearest, uv, 0.0 ).w;

}

@fragment
fn fsMain( input: FullscreenOutput ) -> @location(0) vec4f {

	let diffuse = textureSampleLevel( uBackBuffer0, ppSampler, input.uv, 0.0 ).xyz;
	let sss = textureSampleLevel( uGbufferAlbedo, ppSamplerNearest, input.uv, 0.0 ).w;

	var blurred = diffuse;

	if ( sss > 0.0 ) {

		let normalBasis = textureSampleLevel( uGbufferNormal, ppSamplerNearest, input.uv, 0.0 ).xyz;
		let depthBasis = viewDepth( input.uv );

		// 散乱半径（ワールド単位）を画面の UV の長さへ直す。遠いほど短くなり、SSS の強さに比例して広がる
		let radiusUV = SSS_DIRECTION * pp.uRadius * sss * 0.5 * vec2f( frame.uProjectionMatrix[ 0 ][ 0 ], frame.uProjectionMatrix[ 1 ][ 1 ] ) / depthBasis;

		var weight = SSS_KERNEL[ 0 ].xyz * sssWeight( input.uv, normalBasis, depthBasis );
		var sum = diffuse * weight;

		for ( var i = 1; i < SSS_SAMPLES; i ++ ) {

			let offset = radiusUV * SSS_KERNEL[ i ].w;

			let uvP = input.uv + offset;
			let uvN = input.uv - offset;

			let wP = SSS_KERNEL[ i ].xyz * sssWeight( uvP, normalBasis, depthBasis );
			let wN = SSS_KERNEL[ i ].xyz * sssWeight( uvN, normalBasis, depthBasis );

			sum += textureSampleLevel( uBackBuffer0, ppSampler, uvP, 0.0 ).xyz * wP;
			sum += textureSampleLevel( uBackBuffer0, ppSampler, uvN, 0.0 ).xyz * wN;

			weight += wP + wN;

		}

		blurred = sum / weight;

	}

	if ( SSS_COMPOSITE ) {

		let shading = textureSampleLevel( uShading, ppSamplerNearest, input.uv, 0.0 ).xyz;
		let shadingDiffuse = textureSampleLevel( uShadingDiffuse, ppSamplerNearest, input.uv, 0.0 ).xyz;

		return vec4f( shading - shadingDiffuse + blurred, 1.0 );

	}

	return vec4f( blurred, 1.0 );

}
