#include <common>
#include <packing>
#include <light_h>
#include <pmrem>

// uniforms

uniform sampler2D sampler0; // position, depth
uniform sampler2D sampler1; // normal, emissionIntensity
uniform sampler2D sampler2; // albedo, roughness
uniform sampler2D sampler3; // emission, metalic
uniform sampler2D sampler4; // velocity, env

uniform sampler2D uSSAOTexture;

uniform sampler2D uLightShaftTexture;

uniform sampler2D uEnvMap;
uniform samplerCube uEnvMapCube;

uniform vec3 uColor;
uniform mat4 viewMatrix;
uniform mat4 cameraMatrix;
uniform vec3 cameraPosition;

// varyings

in vec2 vUv;

// out

layout (location = 0) out vec4 glFragOut0;
layout (location = 1) out vec4 glFragOut1;

// struct Geometry {
// 	vec3 position;
// 	vec3 normal;
// 	float depth;
// 	vec3 viewDir;
// 	vec3 viewDirWorld;
// 	float occulusion;
// };

// struct Material {
// 	vec3 albedo;
// 	float roughness;
// 	float metalic;
// 	vec3 emission;
// 	float emissionIntensity;
// 	vec3 diffuseColor;
// 	vec3 specularColor;
// };

uniform float uOrnamentCol;

//https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L132

#define MAXMIP 8.0

float roughnessToMip( float roughness ) {

	float mip = 0.0;

	mip = roughness * ( MAXMIP - 1.0 );

	return mip;

}

vec3 getPmremMip( sampler2D envMap, vec3 direction, float mip  ) {

	float face = getPmremFace( direction );
	vec2 uv = getPmremUV( direction, face );

	uv.x += mod( face, 3.0 );
	uv.y += floor( face / 3.0) ;
	
	// uv.y *= 0.5;

	// float scale = 1.0 - pow( 2.0, -floor(mip) );
	
	uv.y *= 0.5;
	uv.x /= 3.0;

	// uv.y *= 1.0 - scale;
	// uv.x *= 1.0 - scale;
	// uv.y += scale;

	return texture( envMap, uv ).xyz;

}

vec3 getPmrem( sampler2D envMap, vec3 direction, float roughness ) {

	float mip = roughnessToMip( roughness );
	float mipF = fract( mip );
	float mipInt = floor( mip );

	vec3 color0 = getPmremMip( envMap, direction, mipInt );

	if ( mipF == 0.0 ) {

		return color0;

	} else {

		vec3 color1 = getPmremMip( envMap, direction, mipInt + 1.0 );

		return mix( color0, color1, mipF );

	}

}

void main( void ) {

	//[
	vec4 tex0 = texture( sampler0, vUv );
	vec4 tex1 = texture( sampler1, vUv );
	vec4 tex2 = texture( sampler2, vUv );
	vec4 tex3 = texture( sampler3, vUv );
	vec4 tex4 = texture( sampler4, vUv );

	float occlusion = texture( uSSAOTexture, vUv ).x * 0.4;

	Geometry geo = Geometry(
		tex0.xyz,
		tex1.xyz,
		0.0,
		normalize( cameraPosition - tex0.xyz ),
		vec3( 0.0 ),
		occlusion
	);
	Material mat = Material(
		tex2.xyz,
		tex2.w,
		tex3.w,
		tex3.xyz,
		tex1.w,
		mix( tex2.xyz, vec3( 0.0, 0.0, 0.0 ), tex3.w ),
		mix( vec3( 1.0, 1.0, 1.0 ), tex2.xyz, tex3.w )
	);
	vec3 outColor = vec3( 0.0 );
	//]
	
	// output

	#include <light>

	// env

	float env = tex4.w;

	vec3 refDir = reflect( -geo.viewDir, geo.normal );

	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );

	float EF = mix( fresnel( dNV ), 1.0, mat.metalic );
	
	// outColor += mat.specularColor * getPmrem( uEnvMapCube, refDir, mat.roughness ) * EF * env;
	// outColor += mat.diffuseColor * getPmrem( uEnvMapCube, refDir, 0.5 ) * 2.0;
	// outColor += mat.diffuseColor * getPmrem( uEnvMapCube, refDir, 0.0 ) * env;

	outColor += mat.diffuseColor * getPmrem( uEnvMap, refDir, 0.5 ) * 2.0;

	// outColor.xyz += texture( uEnvMapCube, refDir ).xyz * env;

	// light shaft
	
	outColor.xyz += texture( uLightShaftTexture, vUv ).xyz;


	glFragOut0 = glFragOut1 = vec4( outColor, 1.0 );

}