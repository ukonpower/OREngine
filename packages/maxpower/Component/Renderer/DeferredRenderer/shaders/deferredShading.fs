#include <common>
#include <packing>
#include <light>
#include <pmrem>

// uniforms

uniform sampler2D sampler0; // position.xyz, emission.x
uniform sampler2D sampler1; // normal.xyz, emission.y
uniform sampler2D sampler2; // albedo, 
uniform sampler2D sampler3; // roughness, metalic, normalSelect, envSelect, 
uniform sampler2D sampler4; // velocity.xy, 0.0, emission.z

uniform sampler2D uSSAOTexture;
uniform sampler2D uLightShaftTexture;
uniform sampler2D uEnvMap;

uniform vec3 uColor;
uniform mat4 uViewMatrix;
uniform mat4 uCameraMatrix;
uniform vec3 uCameraPosition;

// -------------------------

// varyings

in vec2 vUv;

// out

layout (location = 0) out vec4 glFragOut0;
layout (location = 1) out vec4 glFragOut1;

void main( void ) {

	//[

	float occlusion = texture( uSSAOTexture, vUv ).x;

	vec4 tex0 = texture( sampler0, vUv );
	vec4 tex1 = texture( sampler1, vUv );
	vec4 tex2 = texture( sampler2, vUv );
	vec4 tex3 = texture( sampler3, vUv );
	vec4 tex4 = texture( sampler4, vUv );

	vec3 normal = tex1.xyz;
	vec3 color = tex2.xyz;
	float roughness = tex3.x;
	float metalic = tex3.y;
	vec3 emission = vec3( tex0.w, tex1.w, tex4.w );
	float envMapIntensity= tex3.w;

	Geometry geo = Geometry(
		tex0.xyz,
		normal,
		0.0,
		normalize( uCameraPosition - tex0.xyz ),
		vec3( 0.0 ),
		occlusion
	);
	
	Material mat = Material(
		color,
		roughness,
		metalic,
		emission,
		mix( color, vec3( 0.0, 0.0, 0.0 ), metalic ),
		mix( vec3( 1.0, 1.0, 1.0 ), color, metalic ),
		envMapIntensity
	);
	vec3 outColor = vec3( 0.0 );
	//]
	
	// lighting

	#include <lighting_light>

	// env

	#include <lighting_env>
	
	// occlusion

	outColor.xyz *= max( 0.0, 1.0 - geo.occulusion * 1.5 );
	
	// emission

	outColor.xyz += mat.emission;

	
	// light shaft
	
	outColor.xyz += texture( uLightShaftTexture, vUv ).xyz;

	glFragOut0 = glFragOut1 = vec4( outColor, 1.0 );

}