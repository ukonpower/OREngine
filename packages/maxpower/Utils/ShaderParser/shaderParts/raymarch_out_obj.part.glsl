vec4 worldNormal = normalize(uModelMatrix * vec4( outNormal, 0.0 ));
vec4 viewNormal = normalize(uViewMatrix * worldNormal);
outNormal = worldNormal.xyz;

vec4 modelPosition = uModelMatrix * vec4( rayPos, 1.0 );
vec4 mvpPosition = uProjectionMatrix * uViewMatrix * modelPosition;
outPos = modelPosition.xyz;
gl_FragDepth =  ( mvpPosition.z / mvpPosition.w ) * 0.5 + 0.5;