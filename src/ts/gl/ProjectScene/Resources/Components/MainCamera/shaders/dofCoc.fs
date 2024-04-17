#include <common>

uniform sampler2D backbuffer0;
uniform sampler2D uGbufferPos;
uniform vec4 uParams;
uniform mat4 projectionMatrixInverse;
uniform mat4 viewMatrix;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

float sampleDepth( sampler2D posTex, vec2 uv ) {

	vec4 depth = viewMatrix * vec4( texture( posTex, uv ).xyz, 1.0 );
	
	return depth.z * -1.0;
	
}

//  https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Prefilter.cginc

// Max between three components
float max3(vec3 xyz) { return max(xyz.x, max(xyz.y, xyz.z)); }

// Fragment shader: Downsampling, prefiltering and CoC calculation
void main( void ) {

	float _Distance = uParams.x;
	float _MaxCoC = uParams.y;
	float _RcpMaxCoC = uParams.z;
	float _LensCoeff = uParams.w;

	// Sample source colors.
	vec2 mainTexSize = vec2( 1.0 ) / vec2( textureSize( backbuffer0, 0 ) );
	vec3 duv = mainTexSize.xyx * vec3(0.5, 0.5, -0.5);
	vec3 c0 = texture(backbuffer0, vUv - duv.xy).rgb;
	vec3 c1 = texture(backbuffer0, vUv - duv.zy).rgb;
	vec3 c2 = texture(backbuffer0, vUv + duv.zy).rgb;
	vec3 c3 = texture(backbuffer0, vUv + duv.xy).rgb;

	// Sample linear depths.
	float d0 = sampleDepth(uGbufferPos, vUv - duv.xy);
	float d1 = sampleDepth(uGbufferPos, vUv - duv.zy);
	float d2 = sampleDepth(uGbufferPos, vUv + duv.zy);
	float d3 = sampleDepth(uGbufferPos, vUv + duv.xy);
	float d4 = sampleDepth(uGbufferPos, vUv);
	vec4 depths = vec4(d4, d4, d4, d4);

	// Calculate the radiuses of CoCs at these sample points.
	vec4 cocs = (depths - _Distance) * _LensCoeff / depths;
	cocs = clamp(cocs, -_MaxCoC, _MaxCoC);

	// Premultiply CoC to reduce background bleeding.
	vec4 weights = clamp(abs(cocs) * _RcpMaxCoC, 0.0, 1.0 );

	// #if defined(PREFILTER_LUMA_WEIGHT)
	// 	// Apply luma weights to reduce flickering.
	// 	// Inspired by goo.gl/j1fhLe goo.gl/mfuZ4h
	// 	weights.x *= 1 / (max3(c0) + 1);
	// 	weights.y *= 1 / (max3(c1) + 1);
	// 	weights.z *= 1 / (max3(c2) + 1);
	// 	weights.w *= 1 / (max3(c3) + 1);
	// #endif

	// Weighted average of the color samples
	vec3 avg = c0 * weights.x + c1 * weights.y + c2 * weights.z + c3 * weights.w;
	avg /= dot(weights, vec4(1.0));

	// Output CoC = average of CoCs
	float coc = dot(cocs, vec4(0.25));

	// Premultiply CoC again.
	avg *= smoothstep(0.0, mainTexSize.y * 2.0, abs(coc));

	// #if defined(UNITY_COLORSPACE_GAMMA)
	// 	avg = GammaToLinearSpace(avg);
	// #endif

    outColor = vec4(avg, coc);
	// outColor = vec4( vec3( abs(coc) ), 1.0 );

}
