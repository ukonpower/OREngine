//[
in vec2 vUv;
in vec3 vNormal;
in vec3 vViewNormal;
in vec3 vPos;
in vec3 vMVPosition;
in vec3 vMVPPosition;
in vec2 vVelocity;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

#ifdef IS_DEPTH
	uniform float cameraNear;
	uniform float cameraFar;
#endif

#ifdef IS_DEFERRED
	layout (location = 0) out vec4 outColor0; // position, depth
	layout (location = 1) out vec4 outColor1; // normal, sscolor
	layout (location = 2) out vec4 outColor2; // albedo, roughness
	layout (location = 3) out vec4 outColor3; // emission, metalic
	layout (location = 4) out vec4 outColor4; // velocity
#endif

#ifdef IS_FORWARD
	uniform sampler2D uDeferredTexture;
#endif
#if defined(IS_FORWARD) || defined(IS_DEPTH)
	layout (location = 0) out vec4 outColor0;
#endif
//]