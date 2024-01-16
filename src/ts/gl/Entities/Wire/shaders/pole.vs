#include <common>
#include <vert_h>
#include <rotate>

uniform vec3 uPosStart;
uniform vec3 uPosEnd;

mat3 makeRotationDir( vec3 direction, vec3 up ) {

	vec3 xaxis = normalize( cross( up, direction ) );
	vec3 yaxis = normalize( cross( direction, xaxis ) );

	return mat3(
		xaxis.x, yaxis.x, direction.x,
		xaxis.y, yaxis.y, direction.y,
		xaxis.z, yaxis.z, direction.z
	);

}

void main( void ) {

	#include <vert_in>

	outPos.y *= 0.0;
	outNormal.yz *= rotate( HPI );
	outPos.yz *= rotate( HPI );
	
	vec3 cPos = mix( uPosStart, uPosEnd, uv.y );
	cPos.y -= sin( uv.y * PI );

	vec3 nPos = mix( uPosStart, uPosEnd, uv.y + 0.01 );
	nPos.y -= sin( (uv.y + 0.01) * PI );

	vec3 dir = normalize( nPos - cPos );

	mat3 rot = makeRotationDir(-dir, vec3( 0.0, -1.0, 0.0 ) );
	outPos *= rot;
	outNormal *= rot;

	outPos += cPos;
	
	#include <vert_out>

}