//[
#ifdef TF_MODELER
	o_position = outPos;
	o_normal = outNormal;
	return;
#endif

vec4 modelPosition = modelMatrix * vec4(outPos, 1.0);
vec4 mvPosition = viewMatrix * modelPosition;
gl_Position = projectionMatrix * mvPosition;

vec4 modelPositionPrev = modelMatrixPrev * vec4(outPos, 1.0);
vec4 mvPositionPrev = viewMatrixPrev * modelPositionPrev;
vec4 positionPrev = projectionMatrixPrev * mvPositionPrev;

vUv = outUv;
vViewNormal = (normalMatrix * vec4(outNormal, 0.0)).xyz;
vNormal = (modelMatrix * vec4(outNormal, 0.0)).xyz;
vPos = modelPosition.xyz;
vMVPosition = mvPosition.xyz;
vMVPPosition = gl_Position.xyz / gl_Position.w;

vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;

//]