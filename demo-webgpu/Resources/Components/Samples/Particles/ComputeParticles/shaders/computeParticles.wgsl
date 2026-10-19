// 粒の描画。instance_index が粒の番号で、計算の結果（particles）から位置を読んで箱を置く。
// demo-webgl の computeParticles.vs / .fs と同じ見た目。
// 前置される名前: LEADERS / PER_LEADER（定数）, particles（array<Particle>）, vColor（VertexOutput の varying）

// 色相 [0,1) を彩度・明度が最大の色にする
fn hueToRgb( hue: f32 ) -> vec3f {

	let k = abs( fract( hue + vec3f( 0.0, 2.0 / 3.0, 1.0 / 3.0 ) ) * 6.0 - 3.0 ) - 1.0;

	return clamp( k, vec3f( 0.0 ), vec3f( 1.0 ) );

}

@vertex
fn vsMain( input: VertexInput, @builtin(instance_index) instanceIndex: u32 ) -> VertexOutput {

	var output: VertexOutput;

	let localPosition = input.position + particles[ instanceIndex ].pos.xyz;
	let worldPosition = object.uModelMatrix * vec4f( localPosition, 1.0 );

	output.position = frame.uProjectionMatrix * frame.uViewMatrix * worldPosition;
	// 前のステップの粒の位置は読まないので、エンティティとカメラの動きだけを乗せる
	output.positionPrev = projectPrev( ( object.uModelMatrixPrev * vec4f( localPosition, 1.0 ) ).xyz );
	output.normal = ( object.uNormalMatrix * vec4f( input.normal, 0.0 ) ).xyz;
	output.uv = input.uv;
	output.worldPosition = worldPosition.xyz;

	// 先頭ごとに色を分ける
	output.vColor = hueToRgb( f32( instanceIndex / PER_LEADER ) / f32( LEADERS ) ) * 0.8;

	return output;

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	surface.albedo = input.vColor;
	surface.roughness = 0.4;

	return packGBuffer( input, surface );

}
