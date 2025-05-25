#include <common>
#include <vert_h>

layout ( location = 3 ) in float instanceId;

uniform vec2 uDataTexSize;
uniform sampler2D uPositionTexture;
uniform sampler2D uScaleTexture;
uniform sampler2D uRotationTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSortTex;

void fetchData( float index, out vec3 instancePosition, out vec3 instanceScale, out vec3 instanceRotation, out vec4 instanceColor ) {

	float posIdx = index;
    float tx1 = mod(posIdx, uDataTexSize.x);
    float ty1 = floor(posIdx / uDataTexSize.x);
    vec2 uv = vec2(tx1 + 0.5, ty1 + 0.5) / uDataTexSize;

	instancePosition = texture( uPositionTexture, uv ).xyz;
	instanceScale = texture( uScaleTexture, uv ).xyz;
	instanceRotation = texture( uRotationTexture, uv ).xyz;
	instanceColor = texture( uColorTexture, uv );
	
}

float fetchActualIndex( float index ) {

	float posIdx = index;
    float tx1 = mod(posIdx, uDataTexSize.x);
    float ty1 = floor(posIdx / uDataTexSize.x);
    vec2 uv = vec2(tx1 + 0.5, ty1 + 0.5) / uDataTexSize;
	return texture( uSortTex, uv ).x;

}

void main( void ) {

	#include <vert_in>

	vec3 instancePosition;
	vec3 instanceScale;
	vec3 instanceRotation;
	vec4 instanceColor;

	float actualIndex = fetchActualIndex( instanceId );

	fetchData( actualIndex, instancePosition, instanceScale, instanceRotation, instanceColor );

	outPos *= instanceScale * 0.5;
	outPos += instancePosition;
	
	#include <vert_out>
	
}