// varyings のサンプル。instance_index から格子上の位置と色を決め、
// 頂点ごとに計算した明るさと一緒に vsMain からフラグメントへ渡す。
// 前置される名前: GRID / BOX_SIZE / SPACING（定数）, vColor / vGlow（VertexOutput の varying）

// 色相 [0,1) を彩度・明度が最大の色にする
fn hueToRgb( hue: f32 ) -> vec3f {

	let k = abs( fract( hue + vec3f( 0.0, 2.0 / 3.0, 1.0 / 3.0 ) ) * 6.0 - 3.0 ) - 1.0;

	return clamp( k, vec3f( 0.0 ), vec3f( 1.0 ) );

}

// 格子の中心からの距離で位相をずらした波。0〜1
fn wave( offset: vec2f, time: f32 ) -> f32 {

	return sin( length( offset ) * 3.0 - time * 3.0 ) * 0.5 + 0.5;

}

@vertex
fn vsMain( input: VertexInput, @builtin(instance_index) instanceIndex: u32 ) -> VertexOutput {

	var output: VertexOutput;

	let cell = vec2f( f32( instanceIndex % GRID ), f32( instanceIndex / GRID ) );
	let offset = ( cell - f32( GRID - 1u ) * 0.5 ) * SPACING;

	let height = wave( offset, frame.uTime );
	let localPosition = input.position + vec3f( offset.x, height * BOX_SIZE * 2.0, offset.y );

	let worldPosition = object.uModelMatrix * vec4f( localPosition, 1.0 );
	let position = frame.uProjectionMatrix * frame.uViewMatrix * worldPosition;

	// 前フレームの時刻で同じ頂点を置き直し、画面上の移動量を出す
	let heightPrev = wave( offset, frame.uTime - frame.uDeltaTime );
	let localPositionPrev = input.position + vec3f( offset.x, heightPrev * BOX_SIZE * 2.0, offset.y );
	let worldPositionPrev = object.uModelMatrixPrev * vec4f( localPositionPrev, 1.0 );
	let positionPrev = frame.uProjectionMatrixPrev * frame.uViewMatrixPrev * worldPositionPrev;

	output.position = position;
	output.normal = ( object.uNormalMatrix * vec4f( input.normal, 0.0 ) ).xyz;
	output.uv = input.uv;
	output.worldPosition = worldPosition.xyz;

	let ndcVelocity = position.xy / position.w - positionPrev.xy / positionPrev.w;
	output.velocity = vec2f( ndcVelocity.x, - ndcVelocity.y ) * 0.2;

	// 色はインスタンスごと、明るさは頂点ごと（箱の上面ほど強く、波の山で光る）に決めて渡す
	output.vColor = hueToRgb( f32( instanceIndex ) / f32( GRID * GRID ) );
	output.vGlow = height * ( input.position.y / BOX_SIZE + 0.5 );

	return output;

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	surface.albedo = input.vColor;
	surface.roughness = 0.3;
	surface.emission = input.vColor * input.vGlow * 2.0;

	return packGBuffer( input, surface );

}

@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	let normal = normalize( input.normal );
	let lightDir = normalize( vec3f( 0.5, 1.0, 0.4 ) );
	let diffuse = max( dot( normal, lightDir ), 0.0 ) * 0.8 + 0.2;

	return vec4f( input.vColor * diffuse + input.vColor * input.vGlow * 2.0, 1.0 );

}
