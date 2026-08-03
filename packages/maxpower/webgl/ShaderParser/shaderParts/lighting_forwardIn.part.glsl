Geometry geo = Geometry(
	outPos,
	outNormal,
	0.0,
	normalize( uCameraPosition - outPos ),
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

outColor.xyz *= 0.0;