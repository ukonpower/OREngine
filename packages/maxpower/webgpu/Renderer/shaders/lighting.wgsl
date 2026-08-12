// PBRの反射計算。webgl側 light.module.glsl ＋ lighting_light.part.glsl 相当。
// envMap / envMapSampler と MAX_ENV_MIP は呼び出し側が前置する

const PI = 3.14159265359;

struct SurfaceInfo {
	diffuseColor: vec3f,
	specularColor: vec3f,
	roughness: f32,
};

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

// 1灯ぶんの反射（GGX + Smith + Schlick fresnel）
fn reflectance( normal: vec3f, viewDir: vec3f, surface: SurfaceInfo, direction: vec3f, color: vec3f ) -> vec3f {

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

	return diffuse * ( 1.0 - F ) + specular;

}

// roughnessに対応する事前フィルタ済みミップを引く（webgl側 roughnessToMip 相当）
fn sampleEnvMap( direction: vec3f, roughness: f32 ) -> vec3f {

	return textureSampleLevel( envMap, envMapSampler, direction, roughness * MAX_ENV_MIP ).xyz;

}
