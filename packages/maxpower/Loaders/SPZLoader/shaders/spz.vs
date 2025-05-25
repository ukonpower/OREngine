#include <common>
#include <vert_h>

layout ( location = 3 ) in float instanceId;

uniform vec2 uDataTexSize;
uniform sampler2D uPositionTexture;
uniform sampler2D uScaleTexture;
uniform sampler2D uRotationTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSortTex;

out vec3 vColor;
out float vAlpha;
out vec2 vNormalizedUV;

vec2 getUV( float index ) {

	float posIdx = index;
    float tx1 = mod(posIdx, uDataTexSize.x);
    float ty1 = floor(posIdx / uDataTexSize.x);
    vec2 uv = vec2(tx1 + 0.5, ty1 + 0.5) / uDataTexSize;
	uv.y = 1.0 - uv.y;

	return uv;

}

void fetchData( float index, out vec3 instancePosition, out vec3 instanceScale, out vec3 instanceRotation, out vec4 instanceColor ) {

	vec2 uv = getUV( index );

	instancePosition = texture( uPositionTexture, uv ).xyz;
	instanceScale = texture( uScaleTexture, uv ).xyz;
	instanceRotation = texture( uRotationTexture, uv ).xyz;
	instanceColor = texture( uColorTexture, uv );
	
}

float fetchActualIndex( float index ) {

	vec2 uv = getUV( index );

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

	outPos *= instanceScale * 0.05;

	outPos += instancePosition;

	vColor = instanceColor.xyz * 8.0;
	vAlpha = instanceColor.w;
	vNormalizedUV = (vUv - 0.5) * 2.0;
	
	#include <vert_out>
	
}