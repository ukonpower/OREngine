vec3 rayPos = ( uModelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;
vec3 rayDir = normalize( ( uModelMatrixInverse * vec4( normalize( vPos - uCameraPosition ), 0.0 ) ).xyz );