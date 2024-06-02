vec3 rayPos = ( modelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;
vec3 rayDir = normalize( ( modelMatrixInverse * vec4( normalize( vPos - cameraPosition ), 0.0 ) ).xyz );