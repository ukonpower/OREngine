vec3 rayPos = ( uModelMatrixInverse * vec4( uCameraPosition, 1.0 ) ).xyz;
vec4 clipSpacePos = vec4((gl_FragCoord.xy / uResolution) * 2.0 - 1.0, -1.0, 1.0);
vec4 viewSpacePos = uProjectionMatrixInverse * clipSpacePos;
viewSpacePos /= viewSpacePos.w;
vec3 viewDir = normalize(viewSpacePos.xyz);
vec3 rayDir = normalize((uViewMatrixInverse * vec4(viewDir, 0.0)).xyz);