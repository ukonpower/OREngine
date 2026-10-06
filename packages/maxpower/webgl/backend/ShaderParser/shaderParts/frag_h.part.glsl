// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）
in vec2 vUv;
in vec3 vViewNormal;
in vec3 vNormal;
in vec3 vMVPosition;
in vec3 vMVPPosition;
in vec3 vPos;
in vec2 vVelocity;

uniform mat4 uModelMatrix;
uniform mat4 uModelMatrixInverse;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec2 uResolution;

#ifdef IS_DEPTH
	uniform float uCameraNear;
	uniform float uCameraFar;
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
	uniform sampler2D uGbufferNormal;
	uniform sampler2D uGbufferAlbedo;
	uniform sampler2D uGbufferMaterial;
#endif

// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる
#ifdef IS_PREPASS
	layout (location = 0) out vec4 outColor0;
	layout (location = 1) out vec4 outColor1;
	layout (location = 4) out vec4 outColor4;
#elif defined(IS_FORWARD) || defined(IS_DEPTH)
	layout (location = 0) out vec4 outColor0;
	layout (location = 1) out vec4 outColor1;
	layout (location = 2) out vec4 outColor2;
#endif

uniform float uTime;
uniform float uTimeF;
uniform float uTimeE;
uniform float uTimeEF;