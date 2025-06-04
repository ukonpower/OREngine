#ifdef TF_MODELER
		o_position = outPos;
		o_normal = outNormal;
		return;
#endif

vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);
vec4 mvPosition = uViewMatrix * modelPosition;
gl_Position = uProjectionMatrix * mvPosition;

vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;

vUv = outUv;
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;
vPos = modelPosition.xyz;
vMVPosition = mvPosition.xyz;
vMVPPosition = gl_Position.xyz / gl_Position.w;

vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;
vVelocity *= 0.2;