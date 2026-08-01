#version 460

layout(set = 0, binding = 0) uniform Params {
	vec3 uColor;
};

layout(set = 0, binding = 1) uniform texture2D uTex_tex;
layout(set = 0, binding = 2) uniform sampler uTex_smp;

layout(location = 0) in vec2 vUv;

layout(location = 0) out vec4 outColor;

void main(void) {

 outColor = vec4(texture( sampler2D( uTex_tex, uTex_smp ), vUv ).xyz * uColor, 1.0);

}

