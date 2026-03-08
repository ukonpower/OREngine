precision highp float;

uniform sampler2D uBackBuffer0; // position.xyz, emission.x
uniform sampler2D uBackBuffer1; // normal.xyz, emission.y
uniform sampler2D uBackBuffer2; // albedo
uniform sampler2D uBackBuffer3; // roughness, metalic, SSN, envMapIntensity

uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform vec3 uCameraPosition;

in vec2 vUv;

layout (location = 0) out vec4 glFragOut0;

// ACES tone mapping
const mat3 ACESInputMat = mat3(
	0.59719, 0.07600, 0.02840,
	0.35458, 0.90834, 0.13383,
	0.04823, 0.01566, 0.83777
);
const mat3 ACESOutputMat = mat3(
	1.60475, -0.10208, -0.00327,
	-0.53108, 1.10813, -0.07276,
	-0.07367, -0.00605, 1.07602
);
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFitted( vec3 color ) {
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return clamp( color, 0.0, 1.0 );
}

void main( void ) {

	vec4 tex0 = texture( uBackBuffer0, vUv );
	vec4 tex1 = texture( uBackBuffer1, vUv );
	vec4 tex2 = texture( uBackBuffer2, vUv );
	vec4 tex3 = texture( uBackBuffer3, vUv );

	vec3 pos = tex0.xyz;
	vec3 normal = tex1.xyz;
	vec3 albedo = tex2.xyz;
	float roughness = tex3.x;
	float metalic = tex3.y;
	vec3 emission = vec3( tex0.w, tex1.w, 0.0 );

	// discard background pixels
	if ( dot( normal, normal ) < 0.01 ) {

		glFragOut0 = vec4( 0.15, 0.15, 0.15, 1.0 );
		return;

	}

	vec3 viewDir = normalize( uCameraPosition - pos );

	// diffuse (lambert)
	float NdotL = max( dot( normal, uLightDir ), 0.0 );
	vec3 diffuse = albedo * ( 1.0 - metalic ) * NdotL * uLightColor;

	// specular (blinn-phong)
	vec3 halfDir = normalize( uLightDir + viewDir );
	float NdotH = max( dot( normal, halfDir ), 0.0 );
	float shininess = mix( 8.0, 256.0, 1.0 - roughness );
	float spec = pow( NdotH, shininess );
	vec3 specColor = mix( vec3( 0.04 ), albedo, metalic );
	vec3 specular = specColor * spec * uLightColor;

	// ambient
	vec3 ambient = albedo * 0.15;

	vec3 outColor = diffuse + specular + ambient + emission;

	outColor = ACESFitted( max( vec3( 0.0 ), outColor ) );

	glFragOut0 = vec4( outColor, 1.0 );

}
