// demo-webgl の Shape/shaders/shape.fs と同じ面を作る。
// 前置される名前: VertexOutput / material（uColor / uRoughness / uMetallic / uEmission / uSSS / uOpacity）,
// PASS_DEFERRED / PASS_REFRACTION（index.ts の pass から決まる bool の定数）

// 面の値。deferred と forward で同じものを使う
fn shapeSurface( input: VertexOutput ) -> Surface {

	var surface = defaultSurface( input );

	surface.albedo = material.uColor;
	surface.roughness = material.uRoughness;
	surface.metallic = material.uMetallic;
	surface.emission = material.uColor * material.uEmission;
	surface.sss = material.uSSS;

	return surface;

}

@fragment
fn fsDeferred( input: VertexOutput ) -> GBufferOutput {

	return packGBuffer( input, shapeSurface( input ) );

}

// lighting.wgsl の fresnel と同じ式（マテリアルのシェーダーには前置されない）
fn fresnel( d: f32 ) -> f32 {

	let f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

// 表面からカメラへ向かう単位ベクトル。view.wgsl の viewDirection と同じ式（マテリアルのシェーダーには前置されない）
fn viewDirection( position: vec3f ) -> vec3f {

	return normalize( mix( frame.uCameraPosition - position, frame.uCameraMatrix[ 2 ].xyz, frame.uProjectionMatrix[ 3 ][ 3 ] ) );

}

// refraction で背後を読む位置のずれ（画面の uv。y は上向き）。面の位置の波で揺らし、背後を読んでいることが見て分かるようにする。
// demo-webgl の shape.fs の refractionOffset と同じ式
fn refractionOffset( position: vec3f ) -> vec2f {

	return vec2f( sin( position.y * 25.0 ), sin( position.x * 25.0 ) ) * 0.015;

}

// forward 系の pass の色。envMap フェーズもここを通る
@fragment
fn fsForward( input: VertexOutput ) -> @location(0) vec4f {

	let surface = shapeSurface( input );

	// deferred の Shape がここを通るのは envMap フェーズだけ。demo-webgl と同じく発光だけを書く
	if ( PASS_DEFERRED ) {

		return vec4f( surface.emission, 1.0 );

	}

	if ( PASS_REFRACTION ) {

		// フレームバッファの y は下向きなので、ずれの y を反転して足す
		let offset = refractionOffset( input.worldPosition );
		let uv = input.position.xy / frame.uResolution + vec2f( offset.x, - offset.y );
		let background = textureSampleLevel( refractionTexture, refractionSampler, uv, 0.0 ).xyz;

		return vec4f( background * surface.albedo, material.uOpacity );

	}

	// shading.wgsl の環境光と同じ式。webgpu の forward にはライトとシャドウマップが渡らないので、直接光は当たらない
	let normal = surface.normal;
	let viewDir = viewDirection( input.worldPosition );
	let diffuseColor = mix( surface.albedo, vec3f( 0.0 ), surface.metallic );
	let specularColor = mix( vec3f( 1.0 ), surface.albedo, surface.metallic );

	let refDir = reflect( - viewDir, normal );
	let dNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	let EF = mix( fresnel( dNV ), 1.0, surface.metallic );
	let envReflect = EF * specularColor * surface.envIntensity;

	let diffuse = sampleEnvMap( normal, 1.0 ) * diffuseColor * surface.envIntensity * ( 1.0 - envReflect );
	let specular = sampleEnvMap( refDir, surface.roughness ) * envReflect;

	return vec4f( diffuse + specular + surface.emission, material.uOpacity );

}
