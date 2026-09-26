// 並行投影ではレイがカメラ位置から出ないので、画素ごとの near/far 面の点から始点と向きを求める
vec2 rayNdc = ( gl_FragCoord.xy / uResolution ) * 2.0 - 1.0;
vec4 rayNear = uViewMatrixInverse * uProjectionMatrixInverse * vec4( rayNdc, -1.0, 1.0 );
vec4 rayFar = uViewMatrixInverse * uProjectionMatrixInverse * vec4( rayNdc, 1.0, 1.0 );
vec3 rayPos = ( uModelMatrixInverse * vec4( rayNear.xyz / rayNear.w, 1.0 ) ).xyz;
vec3 rayDir = normalize( ( uModelMatrixInverse * vec4( rayFar.xyz / rayFar.w - rayNear.xyz / rayNear.w, 0.0 ) ).xyz );