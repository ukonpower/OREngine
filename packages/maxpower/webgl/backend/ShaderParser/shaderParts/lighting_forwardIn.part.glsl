Geometry geo = Geometry(
	outPos,
	outNormal,
	0.0,
	viewDirection( outPos, uCameraPosition, uViewMatrix, uProjectionMatrix ),
	vec3( 0.0 ),
	0.0
);

Material mat = Material(
	vec3( 1.0 ),
	outRoughness,
	outMetallic,
	outEmission,
	mix( outColor.xyz, vec3( 0.0, 0.0, 0.0 ), outMetallic ),
	mix( vec3( 1.0, 1.0, 1.0 ), outColor.xyz, outMetallic ),
	outEnv
);

vec3 diffuse = vec3( 0.0 );
vec3 specular = vec3( 0.0 );