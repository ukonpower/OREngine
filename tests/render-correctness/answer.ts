/*-------------------------------
	答えの計算

	エンジンの光の式を TypeScript へ書き写したもの。テストシーンの画素の値はこれと比べる。
	書き写し元（式を変えたらここも変える）:
	- 1 灯ぶんの反射: webgl `light.module.glsl` の ggx / gSchlick / gSmith / fresnel / RE、webgpu `lighting.wgsl` の reflectance
	- 環境光: webgl `lighting_env.part.glsl`、webgpu `lighting.wgsl` の envLighting
	- 面の値: webgl `deferredShading.fs` の Material、webgpu `lighting.wgsl` の surfaceInfo
-------------------------------*/

export type Vec3 = [ number, number, number ];

// シーンに書いた面の値（Shape の color / roughness / metallic）
export type SurfaceParams = {
	albedo: Vec3;
	roughness: number;
	metallic: number;
	// gBuffer の material.w。Shape は既定の 1 のまま
	envIntensity: number;
};

// 反射を計算する点。normal・viewDir は長さ 1
export type ShadingPoint = {
	normal: Vec3;
	viewDir: Vec3;
};

// 平行光。direction は面から光へ向かう向き、color は色 × intensity
export type DirectionalLight = {
	direction: Vec3;
	color: Vec3;
};

const PI = 3.14159265359;

/*-------------------------------
	Vector
-------------------------------*/

export const dot = ( a: Vec3, b: Vec3 ) => a[ 0 ] * b[ 0 ] + a[ 1 ] * b[ 1 ] + a[ 2 ] * b[ 2 ];

export const add = ( a: Vec3, b: Vec3 ): Vec3 => [ a[ 0 ] + b[ 0 ], a[ 1 ] + b[ 1 ], a[ 2 ] + b[ 2 ] ];

export const sub = ( a: Vec3, b: Vec3 ): Vec3 => [ a[ 0 ] - b[ 0 ], a[ 1 ] - b[ 1 ], a[ 2 ] - b[ 2 ] ];

export const scale = ( a: Vec3, s: number ): Vec3 => [ a[ 0 ] * s, a[ 1 ] * s, a[ 2 ] * s ];

export const mul = ( a: Vec3, b: Vec3 ): Vec3 => [ a[ 0 ] * b[ 0 ], a[ 1 ] * b[ 1 ], a[ 2 ] * b[ 2 ] ];

export const normalize = ( a: Vec3 ): Vec3 => scale( a, 1 / Math.sqrt( dot( a, a ) ) );

export const cross = ( a: Vec3, b: Vec3 ): Vec3 => [
	a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ],
	a[ 2 ] * b[ 0 ] - a[ 0 ] * b[ 2 ],
	a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ],
];

const mixVec = ( a: Vec3, b: Vec3, t: Vec3 ): Vec3 => [
	a[ 0 ] + ( b[ 0 ] - a[ 0 ] ) * t[ 0 ],
	a[ 1 ] + ( b[ 1 ] - a[ 1 ] ) * t[ 1 ],
	a[ 2 ] + ( b[ 2 ] - a[ 2 ] ) * t[ 2 ],
];

const clamp01 = ( v: number ) => Math.min( Math.max( v, 0 ), 1 );

const reflect = ( incident: Vec3, normal: Vec3 ) => sub( incident, scale( normal, 2 * dot( normal, incident ) ) );

/*-------------------------------
	gBuffer
-------------------------------*/

const srgbEncode = ( v: number ) => {

	if ( v <= 0.0031308 ) return v * 12.92;

	return 1.055 * Math.pow( v, 1 / 2.4 ) - 0.055;

};

const srgbDecode = ( v: number ) => {

	if ( v <= 0.04045 ) return v / 12.92;

	return Math.pow( ( v + 0.055 ) / 1.055, 2.4 );

};

// deferred の物は面の値を 8bit の gBuffer に入れてから光を計算するので、同じ丸めを掛ける。
// albedo は sRGB で 8bit（webgl SRGB8_ALPHA8・webgpu rgba8unorm-srgb）、粗さ・金属は線形の 8bit（RGBA8・rgba8unorm）
export const quantizeForGBuffer = ( surface: SurfaceParams ): SurfaceParams => {

	const albedo: Vec3 = [ 0, 0, 0 ];

	for ( let i = 0; i < 3; i ++ ) {

		albedo[ i ] = srgbDecode( Math.round( srgbEncode( clamp01( surface.albedo[ i ] ) ) * 255 ) / 255 );

	}

	return {
		albedo,
		roughness: Math.round( clamp01( surface.roughness ) * 255 ) / 255,
		metallic: Math.round( clamp01( surface.metallic ) * 255 ) / 255,
		envIntensity: Math.round( clamp01( surface.envIntensity ) * 255 ) / 255,
	};

};

/*-------------------------------
	BRDF（light.module.glsl / lighting.wgsl）
-------------------------------*/

// 分布。α = roughness² なので、式の a2 は roughness⁴
export const ggx = ( dNH: number, roughness: number ) => {

	let a2 = roughness * roughness;
	a2 = a2 * a2;

	const dNH2 = dNH * dNH;

	if ( dNH2 <= 0 ) return 0;

	return a2 / ( PI * Math.pow( dNH2 * ( a2 - 1 ) + 1, 2 ) );

};

const gSchlick = ( d: number, k: number ) => {

	if ( d === 0 ) return 0;

	return d / ( d * ( 1 - k ) + k );

};

export const gSmith = ( dNV: number, dNL: number, roughness: number ) => {

	const k = clamp01( roughness * Math.sqrt( 2 / PI ) );

	return gSchlick( dNV, k ) * gSchlick( dNL, k );

};

export const fresnel = ( d: number ) => {

	const f0 = 0.04;

	return f0 + ( 1 - f0 ) * Math.pow( 1 - d, 5 );

};

// metallic で albedo を拡散と鏡面の色に分ける
const diffuseColorOf = ( surface: SurfaceParams ): Vec3 => scale( surface.albedo, 1 - surface.metallic );

const specularColorOf = ( surface: SurfaceParams ): Vec3 => mixVec( [ 1, 1, 1 ], surface.albedo, [ surface.metallic, surface.metallic, surface.metallic ] );

export type Reflectance = {
	diffuse: Vec3;
	specular: Vec3;
};

// 1 灯ぶんの反射（RE / reflectance）
export const reflectance = ( point: ShadingPoint, surface: SurfaceParams, light: DirectionalLight ): Reflectance => {

	const lightDir = normalize( light.direction );
	const halfVec = normalize( add( point.viewDir, lightDir ) );

	const dLH = clamp01( dot( lightDir, halfVec ) );
	const dNH = clamp01( dot( point.normal, halfVec ) );
	const dNV = clamp01( dot( point.normal, point.viewDir ) );
	const dNL = clamp01( dot( point.normal, lightDir ) );

	const irradiance = scale( light.color, dNL );

	const D = ggx( dNH, surface.roughness );
	const G = gSmith( dNV, dNL, surface.roughness );
	const F = fresnel( dLH );

	const diffuse = scale( mul( scale( diffuseColorOf( surface ), 1 / PI ), irradiance ), 1 - F );
	const specular = mul( scale( specularColorOf( surface ), ( D * G * F ) / ( 4 * dNL * dNV + 0.0001 ) ), irradiance );

	return { diffuse, specular };

};

/*-------------------------------
	環境光（lighting_env.part.glsl / envLighting）
-------------------------------*/

// 環境マップから引いた値。direction の向き・粗さ roughness で事前にぼかした放射輝度
export type EnvSampler = ( direction: Vec3, roughness: number ) => Vec3;

// 直接光に環境光を混ぜる。SSR は切ってテストするので、鏡面反射に入る光は環境マップだけ
export const envLighting = ( point: ShadingPoint, surface: SurfaceParams, direct: Reflectance, sampleEnv: EnvSampler ): Reflectance => {

	const refDir = reflect( scale( point.viewDir, - 1 ), point.normal );
	const dNV = clamp01( dot( point.normal, point.viewDir ) );
	const EF = fresnel( dNV ) + ( 1 - fresnel( dNV ) ) * surface.metallic;

	// 環境の鏡面反射に置き換わる割合。直接光も含め diffuse / specular を同じ割合で減らす
	const envReflect = scale( specularColorOf( surface ), EF * surface.envIntensity );
	const keep: Vec3 = [ 1 - envReflect[ 0 ], 1 - envReflect[ 1 ], 1 - envReflect[ 2 ] ];

	const envDiffuse = scale( mul( sampleEnv( point.normal, 1 ), diffuseColorOf( surface ) ), surface.envIntensity );

	const diffuse = mul( add( direct.diffuse, envDiffuse ), keep );
	const specular = mixVec( direct.specular, sampleEnv( refDir, surface.roughness ), envReflect );

	return { diffuse, specular };

};

/*-------------------------------
	Shade
-------------------------------*/

// 平行光と環境光で照らした点の値（シェーディングの結果 diffuse + specular。発光・SSAO・SSR は無い前提）
export const shade = ( point: ShadingPoint, surface: SurfaceParams, lights: DirectionalLight[], sampleEnv: EnvSampler ): Vec3 => {

	let direct: Reflectance = { diffuse: [ 0, 0, 0 ], specular: [ 0, 0, 0 ] };

	for ( const light of lights ) {

		const r = reflectance( point, surface, light );

		direct = { diffuse: add( direct.diffuse, r.diffuse ), specular: add( direct.specular, r.specular ) };

	}

	const lit = envLighting( point, surface, direct, sampleEnv );

	return add( lit.diffuse, lit.specular );

};

/*-------------------------------
	White furnace
-------------------------------*/

// n を z 軸にした正規直交基底
const tangentFrame = ( n: Vec3 ) => {

	let up: Vec3 = [ 0, 0, 1 ];

	if ( Math.abs( n[ 2 ] ) >= 0.999 ) {

		up = [ 1, 0, 0 ];

	}

	const tangentX = normalize( cross( up, n ) );
	const tangentY = cross( n, tangentX );

	return { tangentX, tangentY };

};

const toWorld = ( local: Vec3, n: Vec3, frame: { tangentX: Vec3, tangentY: Vec3 } ): Vec3 => add( add( scale( frame.tangentX, local[ 0 ] ), scale( frame.tangentY, local[ 1 ] ) ), scale( n, local[ 2 ] ) );

// 一様な白い環境（全方向から放射輝度 1）に置いた点の値を、1 灯ぶんの反射の式（reflectance）を半球で積分して出す。
// エンジンは環境光を事前にぼかした環境マップと envLighting の近似で出すので、この答えとは近似の分だけずれる。
// 積分は格子の点で取る（乱数を使わず、毎回同じ値にするため）。
// 鏡面は GGX の分布に沿って半ベクトルを置き、拡散は余弦に沿って光の向きを置く（どちらも PMREM の pmrem.fs と同じ置き方）
export const furnaceIntegral = ( point: ShadingPoint, surface: SurfaceParams, gridSize: number ): Vec3 => {

	const n = point.normal;
	const v = point.viewDir;
	const frame = tangentFrame( n );
	const white: Vec3 = [ 1, 1, 1 ];

	let diffuseSum: Vec3 = [ 0, 0, 0 ];
	let specularSum: Vec3 = [ 0, 0, 0 ];

	const a = surface.roughness * surface.roughness;

	for ( let i = 0; i < gridSize; i ++ ) {

		for ( let j = 0; j < gridSize; j ++ ) {

			const u1 = ( i + 0.5 ) / gridSize;
			const u2 = ( j + 0.5 ) / gridSize;
			const phi = 2 * PI * u1;

			// 鏡面: 半ベクトルを D(h)·(n·h) に比例して置き、光の向きの確率密度 D·(n·h) / (4·v·h) で割る
			const cosThetaH = Math.sqrt( ( 1 - u2 ) / ( 1 + ( a * a - 1 ) * u2 ) );
			const sinThetaH = Math.sqrt( 1 - cosThetaH * cosThetaH );
			const h = toWorld( [ sinThetaH * Math.cos( phi ), sinThetaH * Math.sin( phi ), cosThetaH ], n, frame );
			const vh = dot( v, h );
			const l = sub( scale( h, 2 * vh ), v );

			if ( dot( n, l ) > 0 && vh > 0 ) {

				const pdf = ggx( cosThetaH, surface.roughness ) * cosThetaH / ( 4 * vh );
				const r = reflectance( point, surface, { direction: l, color: white } );

				specularSum = add( specularSum, scale( r.specular, 1 / pdf ) );

			}

			// 拡散: 光の向きを余弦（n·l / π）に比例して置く
			const cosThetaL = Math.sqrt( 1 - u2 );
			const sinThetaL = Math.sqrt( u2 );
			const lDiffuse = toWorld( [ sinThetaL * Math.cos( phi ), sinThetaL * Math.sin( phi ), cosThetaL ], n, frame );
			const pdfDiffuse = cosThetaL / PI;

			if ( pdfDiffuse > 0 ) {

				const r = reflectance( point, surface, { direction: lDiffuse, color: white } );

				diffuseSum = add( diffuseSum, scale( r.diffuse, 1 / pdfDiffuse ) );

			}

		}

	}

	const count = gridSize * gridSize;

	return add( scale( diffuseSum, 1 / count ), scale( specularSum, 1 / count ) );

};
