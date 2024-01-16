#include <common>
#include <packing>
#include <light_h>
#include <re>

uniform sampler2D sampler0;

uniform sampler2D uLightShaftTexture;
uniform sampler2D uSSRTexture;
uniform vec3 cameraPosition;
uniform mat4 viewMatrix;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	outColor = texture( sampler0, vUv );

}