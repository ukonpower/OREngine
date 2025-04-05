#if defined(IS_DEPTH) || defined(IS_DEFERRED)
	vec4 mv = viewMatrix * vec4(outPos, 1.0);
#endif

#ifdef IS_DEPTH
	float depth_z = (-mv.z - cameraNear) / (cameraFar - cameraNear);
	outColor0 = vec4(floatToRGBA( depth_z ));
#endif

#ifdef IS_DEFERRED

	#ifdef USE_NORMAL_MAP 

		vec3 tangent;
		vec3 bitangent;

		#ifdef USE_TANGENT

			tangent = normalize( vTangent );
			bitangent = normalize( vBitangent );

		#else

			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));
			bitangent = cross(tangent, outNormal);

		#endif

		#ifdef DOUBLE_SIDED

			tangent *= faceDirection;
			bitangent *= faceDirection;
			
		#endif

		mat3 vTBN = mat3( tangent, bitangent, outNormal );
		outNormal = normalize( vTBN * outNormalMap );

	#endif

	vec4 mvp = projectionMatrix * mv;
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;
	outColor0 = vec4( outPos, outEmission.x );
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );
	outColor2 = vec4( outColor.xyz, 0.0 );
	outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );
#endif

#ifdef IS_FORWARD
	outColor0 = outColor;
	outColor1 = vec4(outPos, 1.0);
	outColor2 = vec4(vVelocity, 0.0, 1.0);
#endif