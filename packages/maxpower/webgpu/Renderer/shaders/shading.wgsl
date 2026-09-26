// シェーディングパス本体。webgl側 deferredShading.fs の移植。
// gBufferは rgba32float を含み filtering サンプラーで引けないため、
// フルスクリーンパスの画素位置から textureLoad で直接読む（サンプラーを持たない）。
// gBuffer / ライト / envMap の宣言は buildShadingSource が前置する

#include "./lighting.wgsl"
#include "./view.wgsl"

@vertex
fn vsMain( @builtin(vertex_index) index: u32 ) -> @builtin(position) vec4f {

	let x = f32( ( index << 1u ) & 2u );
	let y = f32( index & 2u );

	return vec4f( x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0 );

}

// diffuse は SSS がぼかす入力。color の中の diffuse をぼかしたものへ置き換える
struct ShadingOutput {
	@location(0) color: vec4f,
	@location(1) diffuse: vec4f,
};

@fragment
fn fsMain( @builtin(position) coord: vec4f ) -> ShadingOutput {

	let pixel = vec2i( coord.xy );

	// SSAOは半解像度から拡大されるのでサンプラーで引く
	let occlusion = textureSampleLevel( ssaoTexture, envMapSampler, coord.xy / frame.uResolution, 0.0 ).x;

	let tex0 = textureLoad( gBuffer0, pixel, 0 );
	let tex1 = textureLoad( gBuffer1, pixel, 0 );
	let tex2 = textureLoad( gBuffer2, pixel, 0 );
	let tex3 = textureLoad( gBuffer3, pixel, 0 );
	let tex4 = textureLoad( gBuffer4, pixel, 0 );

	// 法線が書かれていない画素は背景
	if ( dot( tex1.xyz, tex1.xyz ) < 0.5 ) {

		return ShadingOutput( vec4f( 0.0, 0.0, 0.0, 1.0 ), vec4f( 0.0, 0.0, 0.0, 1.0 ) );

	}

	let worldPosition = tex0.xyz;
	let normal = normalize( tex1.xyz );
	let albedo = tex2.xyz;
	let roughness = tex3.x;
	let metallic = tex3.y;
	let envIntensity = tex3.w;
	let emission = vec3f( tex0.w, tex1.w, tex4.w );

	let viewDir = viewDirection( worldPosition );

	var surface: SurfaceInfo;
	surface.diffuseColor = mix( albedo, vec3f( 0.0 ), metallic );
	surface.specularColor = mix( vec3f( 1.0 ), albedo, metallic );
	surface.roughness = roughness;

	var diffuse = vec3f( 0.0 );
	var specular = vec3f( 0.0 );

	for ( var i = 0; i < lights.numLightDir; i ++ ) {

		let light = lights.directionalLight[ i ];

		var shadow = 1.0;

		if ( light.useShadow > 0.5 ) {

			shadow = sampleShadow( directionalShadowMap, i, light.shadowMatrix, worldPosition );

		}

		let r = reflectance( normal, viewDir, surface, light.direction, light.color * shadow );

		diffuse += r.diffuse;
		specular += r.specular;

	}

	for ( var i = 0; i < lights.numLightSpot; i ++ ) {

		let light = lights.spotLight[ i ];

		var shadow = 1.0;

		if ( light.useShadow > 0.5 ) {

			shadow = sampleShadow( spotShadowMap, i, light.shadowMatrix, worldPosition );

		}

		let toLight = light.position - worldPosition;
		let spotDirection = normalize( toLight );
		let spotDistance = length( toLight );
		let spotAngleCos = dot( light.direction, spotDirection );

		var spotAttenuation = 0.0;

		if ( spotAngleCos > light.angle ) {

			spotAttenuation = smoothstep( light.angle, light.angle + ( 1.0 - light.angle ) * light.blend, spotAngleCos );

		}

		// 逆二乗の減衰。光源の位置で 0 除算しないよう下限を置く
		let color = light.color * spotAttenuation / max( spotDistance * spotDistance, 0.0001 );

		let r = reflectance( normal, viewDir, surface, spotDirection, color * shadow );

		diffuse += r.diffuse;
		specular += r.specular;

	}

	// 環境光（webgl側 lighting_env.part.glsl 相当）
	let refDir = reflect( - viewDir, normal );
	let dNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	let EF = mix( fresnel( dNV ), 1.0, metallic );

	// 環境の鏡面反射に置き換わる割合。直接光も含め diffuse / specular を同じ割合で減らす
	let envReflect = EF * surface.specularColor * envIntensity;

	diffuse = ( diffuse + sampleEnvMap( normal, 1.0 ) * surface.diffuseColor * envIntensity ) * ( 1.0 - envReflect );
	specular = mix( specular, sampleEnvMap( refDir, roughness ), envReflect );

	let ao = max( 0.0, 1.0 - occlusion * 1.5 );

	diffuse *= ao;
	specular *= ao;

	var outColor = diffuse + specular + emission;

	// 光の筋（半解像度から拡大）
	outColor += textureSampleLevel( lightShaftTexture, envMapSampler, coord.xy / frame.uResolution, 0.0 ).xyz;

	return ShadingOutput( vec4f( max( vec3f( 0.0 ), outColor ), 1.0 ), vec4f( max( vec3f( 0.0 ), diffuse ), 1.0 ) );

}
