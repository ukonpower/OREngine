// demo-webgl の Shape/shaders/shape.fs と同じ面を作る。
// 前置される名前: VertexOutput / material（uColor / uRoughness / uMetallic / uEmission / uSSS / uOpacity）,
// PASS_DEFERRED / PASS_REFRACTION（index.ts の pass から決まる bool の定数）

#include <module:lighting>

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

	// deferred のシェーディング（shading.wgsl）と同じ関数で、ライト・影・環境マップを当てる
	let viewDir = viewDirection( input.worldPosition );
	let info = surfaceInfo( surface.albedo, surface.roughness, surface.metallic, surface.envIntensity );
	let direct = directLighting( input.worldPosition, surface.normal, viewDir, info );

	// SSR は forward の面には当たらないので、鏡面反射は環境マップだけから取る
	let lit = envLighting( surface.normal, viewDir, info, direct, vec3f( 0.0 ), 0.0 );

	return vec4f( lit.diffuse + lit.specular + surface.emission, material.uOpacity );

}
