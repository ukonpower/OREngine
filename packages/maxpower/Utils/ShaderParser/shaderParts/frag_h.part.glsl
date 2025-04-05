in vec2 vUv;
in vec3 vNormal;
in vec3 vViewNormal;
in vec3 vPos;
in vec3 vMVPosition;
in vec3 vMVPPosition;
in vec2 vVelocity;

uniform mat4 modelMatrix;
uniform mat4 modelMatrixInverse;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;
uniform vec2 uResolution;

#ifdef IS_DEPTH
	uniform float cameraNear;
	uniform float cameraFar;
#endif

#ifdef IS_DEFERRED
	layout (location = 0) out vec4 outColor0;
	layout (location = 1) out vec4 outColor1;
	layout (location = 2) out vec4 outColor2;
	layout (location = 3) out vec4 outColor3;
	layout (location = 4) out vec4 outColor4;
#endif

#ifdef IS_FORWARD
	uniform sampler2D uDeferredTexture;
	uniform vec2 uDeferredResolution;
#endif

#if defined(IS_FORWARD) || defined(IS_DEPTH)
	layout (location = 0) out vec4 outColor0;
	layout (location = 1) out vec4 outColor1;
	layout (location = 2) out vec4 outColor2;
#endif