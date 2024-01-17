uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 normalMatrix;

uniform mat4 modelMatrixPrev;
uniform mat4 viewMatrixPrev;
uniform mat4 projectionMatrixPrev;

out vec2 vUv;
out vec3 vViewNormal;
out vec3 vNormal;
out vec3 vMVPosition;
out vec3 vMVPPosition;
out vec3 vPos;

out vec2 vVelocity;

layout ( location = 0 ) in vec3 position;
layout ( location = 1 ) in vec2 uv;
layout ( location = 2 ) in vec3 normal;

#ifdef TF_MODELER
	out vec3 o_position;
	out vec3 o_normal;
#endif
