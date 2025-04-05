Geometry geo = Geometry(
	outPos,
	outNormal,
	0.0,
	normalize( cameraPosition - outPos ),
	vec3( 0.0 ),
	0.0
);

Material mat = Material(
	vec3( 1.0 ),
	outRoughness,
	outMetalic,
	outEmission,
	mix( outColor.xyz, vec3( 0.0, 0.0, 0.0 ), outMetalic ),
	mix( vec3( 1.0, 1.0, 1.0 ), outColor.xyz, outMetalic ),
	outEnv
);

outColor.xyz *= 0.0;