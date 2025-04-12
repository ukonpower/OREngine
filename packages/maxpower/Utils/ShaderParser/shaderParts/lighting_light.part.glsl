// required common, light,

float shadow;

// direcitonalLight

Light light;
LightCamera lightCamera;

#if NUM_LIGHT_DIR > 0 

	DirectionalLight dLight;

	#pragma loop_start NUM_LIGHT_DIR

		dLight = directionalLight[ LOOP_INDEX ];
		light.direction = dLight.direction;
		light.color = dLight.color;

		// shadow

		#if LOOP_INDEX < NUM_SHADOWMAP_DIR

			shadow = getShadowSmooth( tex0.xyz, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0001 );

		#else

			shadow = 1.0;

		#endif
		
		// lighting

		outColor.xyz += RE( geo, mat, light ) * shadow;

	#pragma loop_end

#endif

#if NUM_LIGHT_SPOT > 0

	SpotLight sLight;
	
	vec3 spotDirection;
	float spotDistance;
	float spotAngleCos;
	float spotAttenuation;
	vec3 radiance;

	#pragma loop_start NUM_LIGHT_SPOT

		// shadow

		#if LOOP_INDEX < NUM_SHADOWMAP_SPOT

			shadow = getShadowSmooth( geo.position, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.001 );

		#else

			shadow = 1.0;

		#endif

		// lighting

		sLight = uSpotLight[ LOOP_INDEX ];

		spotDirection = normalize(sLight.position - geo.position);
		spotDistance = length( sLight.position - geo.position );
		spotAngleCos = dot( sLight.direction, spotDirection );
		spotAttenuation = 0.0;

		if( spotAngleCos > sLight.angle ) {

			spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );

		}

		light.direction = spotDirection;
		light.color = sLight.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay );

		radiance = RE( geo, mat, light );
		outColor.xyz += shadow * radiance;

	#pragma loop_end

#endif