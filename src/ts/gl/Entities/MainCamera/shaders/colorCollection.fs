#include <common>

uniform sampler2D backbuffer0;
uniform sampler2D uBloomTexture[4];

uniform vec3 cameraPosition;
uniform float cameraNear;
uniform float cameraFar;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

//=================================================================================================
//
//  Baking Lab
//  by MJP and David Neubelt
//  http://mynameismjp.wordpress.com/
//
//  All code licensed under the MIT license
//
//=================================================================================================

// The code in this file was originally written by Stephen Hill (@self_shadow), who deserves all
// credit for coming up with this fit and implementing it. Buy him a beer next time you see him. :)

// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT

const mat3 ACESInputMat = mat3(
	0.59719, 0.07600, 0.02840,
	0.35458,  0.90834, 0.13383,
	0.04823, 0.01566, 0.83777
);

// ODT_SAT => XYZ => D60_2_D65 => sRGB
const mat3 ACESOutputMat = mat3( 
	1.60475,  -0.10208,  -0.00327,
	-0.53108, 1.10813, -0.07276,
	-0.07367,  -0.00605, 1.07602
);

vec3 RRTAndODTFit(vec3 v)
{
    vec3 a = v * (v + 0.0245786f) - 0.000090537f;
    vec3 b = v * (0.983729f * v + 0.4329510f) + 0.238081f;
    return a / b;
}

vec3 ACESFitted(vec3 color)
{
    color = ACESInputMat * color;

    // Apply RRT and ODT
    color = RRTAndODTFit(color);

    color = ACESOutputMat * color;

    // Clamp to [0, 1]
    color = clamp(color, 0.0, 1.0 );

    return color;
}

void main( void ) {

    vec3 col = texture( backbuffer0, vUv ).xyz;

    col = ACESFitted( col );

	outColor = vec4( col, 1.0 );

}