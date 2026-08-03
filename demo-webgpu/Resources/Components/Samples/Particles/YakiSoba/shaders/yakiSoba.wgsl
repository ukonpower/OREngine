// トレイルの描画。instance_index がトレイル番号で、頂点のy位置からセグメントを選び
// GPGPU出力（trailPoints）を読んで細長いキューブを軌跡に沿わせる。
// 前置される名前: SEG / TRAILS / CUBE_HEIGHT（定数）, trailPoints（array<TrailPoint>）

// 進行方向をz軸にした回転基底を作る
fn lookRotation( dir: vec3f ) -> mat3x3f {

	let z = normalize( dir );

	var up = vec3f( 0.0, 1.0, 0.0 );

	if ( abs( dot( up, z ) ) > 0.99 ) {

		up = vec3f( 1.0, 0.0, 0.0 );

	}

	let x = normalize( cross( up, z ) );
	let y = cross( z, x );

	return mat3x3f( x, y, z );

}

@vertex
fn vsMain( input: VertexInput, @builtin(instance_index) instanceIndex: u32 ) -> VertexOutput {

	var output: VertexOutput;

	// 頂点のy位置 [±CUBE_HEIGHT/2] → セグメント番号
	let t = clamp( input.position.y / CUBE_HEIGHT + 0.5, 0.0, 1.0 );
	let seg = u32( round( t * f32( SEG - 1u ) ) );
	let base = instanceIndex * SEG;

	let point = trailPoints[ base + seg ];
	let ahead = trailPoints[ base + ( max( seg, 1u ) - 1u ) ];
	let behind = trailPoints[ base + min( seg + 1u, SEG - 1u ) ];

	var dir = ahead.pos.xyz - behind.pos.xyz;

	if ( length( dir ) < 1e-5 ) {

		dir = vec3f( 0.0, 1.0, 0.0 );

	}

	let rot = lookRotation( dir );

	let localPosition = rot * input.position + point.pos.xyz;
	let localNormal = rot * input.normal;

	let worldPosition = object.uModelMatrix * vec4f( localPosition, 1.0 );
	let position = frame.uProjectionMatrix * frame.uViewMatrix * worldPosition;

	output.position = position;
	output.normal = ( object.uNormalMatrix * vec4f( localNormal, 0.0 ) ).xyz;
	output.uv = input.uv;
	output.worldPosition = worldPosition.xyz;
	// 前フレームの粒子位置は持っていないため、モーションブラーには乗せない
	output.velocity = vec2f( 0.0 );

	return output;

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	var surface = defaultSurface( input );

	surface.albedo = vec3f( 1.0 );
	surface.roughness = 0.4;

	return packGBuffer( input, surface );

}
