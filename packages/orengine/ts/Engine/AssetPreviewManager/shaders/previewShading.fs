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

	glFragOut0 = vec4( max( vec3( 0.0 ), outColor ), 1.0 );

}
