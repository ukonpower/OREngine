//[
#if defined(IS_DEPTH) || defined(IS_DEFERRED)
	vec4 mv = viewMatrix * vec4(outPos, 1.0);
#endif

#ifdef IS_DEPTH
	float depth_z = (-mv.z - cameraNear) / (cameraFar - cameraNear);
	outColor0 = vec4(floatToRGBA( depth_z ));
#endif

#ifdef IS_DEFERRED
	vec4 mvp = projectionMatrix * mv;
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;
	outColor0 = vec4( outPos, 1.0 );
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmissionIntensity );
	outColor2 = vec4( outColor.xyz, outRoughness);
	outColor3 = vec4( outEmission, outMetalic );
	outColor4 = vec4( vVelocity, 0.0, outEnv );
#endif

#ifdef IS_FORWARD
	outColor0 = outColor;
#endif
//]