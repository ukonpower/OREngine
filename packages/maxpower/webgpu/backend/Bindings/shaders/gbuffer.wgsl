// マテリアルが書き込む面の情報と、gBufferへの詰め込み。
// 出力先の struct GBufferOutput は Bindings のアタッチメント表から生成して前置される

struct Surface {
	albedo: vec3f,
	normal: vec3f,
	roughness: f32,
	metallic: f32,
	emission: vec3f,
	envIntensity: f32,
	// SSS の強さ（0〜1）。0 なら SSS なし。albedo.w に入る
	sss: f32,
};

// マテリアルが値を上書きする土台
fn defaultSurface( input: VertexOutput ) -> Surface {

	return Surface( vec3f( 0.8 ), normalize( input.normal ), 0.5, 0.0, vec3f( 0.0 ), 1.0, 0.0 );

}

// Surface を gBuffer の5枚へ詰める
fn packGBuffer( input: VertexOutput, surface: Surface ) -> GBufferOutput {

	var output: GBufferOutput;

	output.position = vec4f( input.worldPosition, surface.emission.x );
	output.normal = vec4f( normalize( surface.normal ), surface.emission.y );
	output.albedo = vec4f( surface.albedo, surface.sss );
	output.material = vec4f( surface.roughness, surface.metallic, 0.0, surface.envIntensity );
	output.velocity = vec4f( screenVelocity( input ), 0.0, surface.emission.z );

	return output;

}

// 前フレームのワールド座標を前フレームのカメラで射影する。VertexOutput.positionPrev に入れる
fn projectPrev( worldPositionPrev: vec3f ) -> vec4f {

	return frame.uProjectionMatrixPrev * frame.uViewMatrixPrev * vec4f( worldPositionPrev, 1.0 );

}

// 画面上の移動量。モーションブラーと SSR の再投影が読む。
// 今の位置はこの画素、前の位置は positionPrev を補間してから割ったもの。頂点で割ってから補間すると
// 大きな三角形やカメラの手前をまたぐ三角形で値が歪むので、割り算はフラグメントで行う。
// 値は「NDC の移動量 × 0.2」を uv の向きへ y 反転したもの（読む側は 2.5 倍して uv の移動量へ戻す）
fn screenVelocity( input: VertexOutput ) -> vec2f {

	// 前フレームはカメラの後ろにあった点（positionPrev を書いていないときも w = 0 でここに入る）。戻る先が無いので動かなかったことにする
	if ( input.positionPrev.w <= 0.0 ) {

		return vec2f( 0.0 );

	}

	// フラグメントの position は画素の座標。フレームバッファの行 0 が NDC の y = +1
	let ndc = vec2f( input.position.x / frame.uResolution.x * 2.0 - 1.0, 1.0 - input.position.y / frame.uResolution.y * 2.0 );
	let ndcPrev = input.positionPrev.xy / input.positionPrev.w;
	let ndcVelocity = ndc - ndcPrev;

	return vec2f( ndcVelocity.x, - ndcVelocity.y ) * 0.2;

}
