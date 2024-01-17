#include <common>
#include <vert_h>

layout ( location = 3 ) in float posY;
layout ( location = 4 ) in vec3 id;

out vec3 vId;

uniform sampler2D uAudioWaveTex;
uniform sampler2D uAudioFreqTex;

uniform sampler2D uComPosBuf;
uniform sampler2D uComVelBuf;
uniform vec2 uGPUResolution;
uniform vec4 uMidi;
uniform vec4 uMidi2;
uniform float uVisibility;

#include <rotate>

void main( void ) {

	#include <vert_in>

	vec4 comPosBuffer = texture( uComPosBuf, vec2( posY * 1.0, id.x ) );
	vec4 comVelBuffer = texture( uComVelBuf, vec2( posY * 1.0, id.x ) );
    vec4 nextPosBuffer = texture( uComPosBuf, vec2( posY - 1.0 / uGPUResolution.x, id.x ) );

	float audio = texture( uAudioWaveTex, vec2( vId.y, 0.0 ) ).x;
	
	vec3 offsetPosition = comPosBuffer.xyz;
	
    vec3 delta = ( comPosBuffer.xyz - nextPosBuffer.xyz );
	vec3 vec = normalize( delta );

	outPos.xz *= step( uv.y, uMidi.w * uVisibility ) * id.x;

	mat2 offsetRot = rotate( PI / 2.0 );
	outPos.yz *= offsetRot;
	outNormal.yz *= offsetRot;

	mat3 rot = makeRotationDir(-vec, vec3( 0.0, -1.0, 0.0 ) );
	outPos *= rot;
	outNormal *= rot;

	outPos += offsetPosition;

	vId = id;

	#include <vert_out>
	
}