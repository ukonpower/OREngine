import { ENVMAP_MIP_COUNT, FRAME_FIELDS, GBUFFER_ATTACHMENTS } from '../../Bindings';
import { buildStructWgsl } from '../../resources/UniformBinder';
import { buildLightWgsl } from '../Lights';

/*-------------------------------
	シェーディングパスのWGSL

	webgl側の deferredShading.fs ＋ light.module.glsl ＋ lighting_light.part.glsl を移植したもの。
	gBufferは rgba32float を含み filtering サンプラーで引けないため、
	フルスクリーンパスの画素位置から textureLoad で直接読む（サンプラーを持たない）。
-------------------------------*/

const GBUFFER_BINDINGS = GBUFFER_ATTACHMENTS.map( ( attachment, i ) =>
	`@group(1) @binding(${i}) var gBuffer${i}: texture_2d<f32>;\t// ${attachment.name}`
).join( '\n' );

// gBufferと同じgroupに環境マップを置く（どちらもシェーディングの入力で、寿命も同じ）
export const ENVMAP_BINDING = GBUFFER_ATTACHMENTS.length;
export const ENVMAP_SAMPLER_BINDING = GBUFFER_ATTACHMENTS.length + 1;
export const SSAO_BINDING = GBUFFER_ATTACHMENTS.length + 2;
export const LIGHTSHAFT_BINDING = GBUFFER_ATTACHMENTS.length + 3;

const LIGHTING_WGSL = /* wgsl */`
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

}`;

const SHADING_WGSL = /* wgsl */`
@vertex
fn vsMain( @builtin(vertex_index) index: u32 ) -> @builtin(position) vec4f {

	let x = f32( ( index << 1u ) & 2u );
	let y = f32( index & 2u );

	return vec4f( x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0 );

}

@fragment
fn fsMain( @builtin(position) coord: vec4f ) -> @location(0) vec4f {

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

		return vec4f( 0.0, 0.0, 0.0, 1.0 );

	}

	let worldPosition = tex0.xyz;
	let normal = normalize( tex1.xyz );
	let albedo = tex2.xyz;
	let roughness = tex3.x;
	let metallic = tex3.y;
	let envIntensity = tex3.w;
	let emission = vec3f( tex0.w, tex1.w, tex4.w );

	let viewDir = normalize( frame.uCameraPosition - worldPosition );

	var surface: SurfaceInfo;
	surface.diffuseColor = mix( albedo, vec3f( 0.0 ), metallic );
	surface.specularColor = mix( vec3f( 1.0 ), albedo, metallic );
	surface.roughness = roughness;

	var outColor = vec3f( 0.0 );

	for ( var i = 0; i < lights.numLightDir; i ++ ) {

		let light = lights.directionalLight[ i ];

		var shadow = 1.0;

		if ( light.useShadow > 0.5 ) {

			shadow = sampleShadow( directionalShadowMap, i, light.shadowMatrix, worldPosition );

		}

		outColor += reflectance( normal, viewDir, surface, light.direction, light.color ) * shadow;

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

		let color = light.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / light.distance, 0.0, 1.0 ), light.decay );

		outColor += reflectance( normal, viewDir, surface, spotDirection, color ) * shadow;

	}

	// 環境光（webgl側 lighting_env.part.glsl 相当）
	let refDir = reflect( - viewDir, normal );
	let dNV = clamp( dot( normal, viewDir ), 0.0, 1.0 );
	let EF = mix( fresnel( dNV ), 1.0, metallic );

	outColor += sampleEnvMap( normal, 1.0 ) * surface.diffuseColor * envIntensity;
	outColor = mix( outColor, sampleEnvMap( refDir, roughness ), EF * surface.specularColor * envIntensity );

	outColor *= max( 0.0, 1.0 - occlusion * 1.5 );

	outColor += emission;

	// 光の筋（半解像度から拡大）
	outColor += textureSampleLevel( lightShaftTexture, envMapSampler, coord.xy / frame.uResolution, 0.0 ).xyz;

	return vec4f( max( vec3f( 0.0 ), outColor ), 1.0 );

}`;

// シェーディングパスのWGSL完成形。宣言はBindings / Lights と同じ配列から作る
export const buildShadingSource = () => [
	buildStructWgsl( 'FrameUniforms', FRAME_FIELDS ),
	'@group(0) @binding(0) var<uniform> frame: FrameUniforms;',
	GBUFFER_BINDINGS,
	`@group(1) @binding(${ENVMAP_BINDING}) var envMap: texture_cube<f32>;`,
	`@group(1) @binding(${ENVMAP_SAMPLER_BINDING}) var envMapSampler: sampler;`,
	`@group(1) @binding(${SSAO_BINDING}) var ssaoTexture: texture_2d<f32>;`,
	`@group(1) @binding(${LIGHTSHAFT_BINDING}) var lightShaftTexture: texture_2d<f32>;`,
	`const MAX_ENV_MIP = ${( ENVMAP_MIP_COUNT - 1 ).toFixed( 1 )};`,
	buildLightWgsl( 2 ),
	LIGHTING_WGSL,
	SHADING_WGSL,
].join( '\n\n' );
