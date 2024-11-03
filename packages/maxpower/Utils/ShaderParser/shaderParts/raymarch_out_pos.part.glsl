vec4 modelPosition = modelMatrix * vec4( rayPos, 1.0 );
vec4 mvpPosition = projectionMatrix * viewMatrix * modelPosition;
outPos = modelPosition.xyz;
gl_FragDepth =  ( mvpPosition.z / mvpPosition.w ) * 0.5 + 0.5;