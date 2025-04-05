vec3 rayPos = ( modelMatrixInverse * vec4( cameraPosition, 1.0 ) ).xyz;
vec4 clipSpacePos = vec4((gl_FragCoord.xy / uResolution) * 2.0 - 1.0, -1.0, 1.0);
vec4 viewSpacePos = projectionMatrixInverse * clipSpacePos;
viewSpacePos /= viewSpacePos.w;
vec3 viewDir = normalize(viewSpacePos.xyz);
vec3 rayDir = normalize((viewMatrixInverse * vec4(viewDir, 0.0)).xyz);