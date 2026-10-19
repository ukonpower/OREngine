// PBRのライティング。webgl側 light.module.glsl ＋ lighting_light.part.glsl ＋ lighting_env.part.glsl 相当。
// シェーディングパス（shading.wgsl）と forward系のマテリアルが同じ関数を呼ぶ。
//
// 外から与えられる名前（シェーディングは shading.ts、マテリアルは Bindings の buildShaderSource が前置する）:
//   envMap / envMapSampler / MAX_ENV_MIP、lights / directionalShadowMap / spotShadowMap と sampleShadow（buildLightWgsl）、
//   frame（view モジュールが読む）

#include <module:view>

const PI = 3.14159265359;

// 反射の計算に使う面の値。albedo と metallic からは surfaceInfo で作る
struct SurfaceInfo {
	diffuseColor: vec3f,
	specularColor: vec3f,
	roughness: f32,
	metallic: f32,
	envIntensity: f32,
};

// metallic で albedo を拡散と鏡面の色に分ける（webgl側 lighting_forwardIn.part.glsl / deferredShading.fs の Material と同じ）
fn surfaceInfo( albedo: vec3f, roughness: f32, metallic: f32, envIntensity: f32 ) -> SurfaceInfo {

	return SurfaceInfo( mix( albedo, vec3f( 0.0 ), metallic ), mix( vec3f( 1.0 ), albedo, metallic ), roughness, metallic, envIntensity );

}

fn ggx( dNH: f32, roughness: f32 ) -> f32 {

	var a2 = roughness * roughness;
	a2 = a2 * a2;

	let dNH2 = dNH * dNH;

	if ( dNH2 <= 0.0 ) {

		return 0.0;

	}

	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0 ) );

}

fn gSchlick( d: f32, k: f32 ) -> f32 {

	if ( d == 0.0 ) {

		return 0.0;

	}

	return d / ( d * ( 1.0 - k ) + k );

}

fn gSmith( dNV: f32, dNL: f32, roughness: f32 ) -> f32 {

	let k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );

	return gSchlick( dNV, k ) * gSchlick( dNL, k );

}

fn fresnel( d: f32 ) -> f32 {

	let f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

// diffuse と specular を分けて持つ（SSS が diffuse だけをぼかすため）
struct Reflectance {
	diffuse: vec3f,
	specular: vec3f,
};

// 1灯ぶんの反射（GGX + Smith + Schlick fresnel）
fn reflectance( normal: vec3f, viewDir: vec3f, surface: SurfaceInfo, direction: vec3f, color: vec3f ) -> Reflectance {

	let lightDir = normalize( direction );
	let halfVec = normalize( viewDir + lightDir );

	let dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );
	let dNH = clamp( dot( normal, halfVec ), 0.0, 1.0 );
	let dNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	let dNL = clamp( dot( normal, lightDir ), 0.0, 1.0 );

	let irradiance = color * dNL;

	let diffuse = surface.diffuseColor / PI * irradiance;

	let D = ggx( dNH, surface.roughness );
	let G = gSmith( dNV, dNL, surface.roughness );
	let F = fresnel( dLH );

	let specular = ( ( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * surface.specularColor ) * irradiance;

	return Reflectance( diffuse * ( 1.0 - F ), specular );

}

// directional / spot すべてのライトの直接光を、影を掛けて足し合わせる
fn directLighting( position: vec3f, normal: vec3f, viewDir: vec3f, surface: SurfaceInfo ) -> Reflectance {

	var diffuse = vec3f( 0.0 );
	var specular = vec3f( 0.0 );

	for ( var i = 0; i < lights.numLightDir; i ++ ) {

		let light = lights.directionalLight[ i ];

		var shadow = 1.0;

		if ( light.useShadow > 0.5 ) {

			shadow = sampleShadow( directionalShadowMap, i, light.shadowMatrix, position );

		}

		let r = reflectance( normal, viewDir, surface, light.direction, light.color * shadow );

		diffuse += r.diffuse;
		specular += r.specular;

	}

	for ( var i = 0; i < lights.numLightSpot; i ++ ) {

		let light = lights.spotLight[ i ];

		var shadow = 1.0;

		if ( light.useShadow > 0.5 ) {

			shadow = sampleShadow( spotShadowMap, i, light.shadowMatrix, position );

		}

		let toLight = light.position - position;
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

	return Reflectance( diffuse, specular );

}

// 直接光（direct）に環境光を混ぜる。鏡面反射に入ってくる光は、SSR が当たった分（ssrColor を ssrWeight の割合）は
// 画面に映っている物、残りは環境マップから取る。SSR の無い forward は ssrWeight を 0 で渡す
fn envLighting( normal: vec3f, viewDir: vec3f, surface: SurfaceInfo, direct: Reflectance, ssrColor: vec3f, ssrWeight: f32 ) -> Reflectance {

	let refDir = reflect( - viewDir, normal );
	let dNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	let EF = mix( fresnel( dNV ), 1.0, surface.metallic );

	// 環境の鏡面反射に置き換わる割合。直接光も含め diffuse / specular を同じ割合で減らす
	let envReflect = EF * surface.specularColor * surface.envIntensity;

	let envSpecular = mix( sampleEnvMap( refDir, surface.roughness ), ssrColor, ssrWeight );

	let diffuse = ( direct.diffuse + sampleEnvMap( normal, 1.0 ) * surface.diffuseColor * surface.envIntensity ) * ( 1.0 - envReflect );
	let specular = mix( direct.specular, envSpecular, envReflect );

	return Reflectance( diffuse, specular );

}

// roughnessに対応する事前フィルタ済みミップを引く（webgl側 roughnessToMip 相当）
fn sampleEnvMap( direction: vec3f, roughness: f32 ) -> vec3f {

	return textureSampleLevel( envMap, envMapSampler, direction, roughness * MAX_ENV_MIP ).xyz;

}
