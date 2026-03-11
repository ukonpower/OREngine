#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	// 脈動する柱 - Y軸に沿った波
	float t = uTimeE;
	float wave = sin( outPos.y * 8.0 + t * 4.0 ) * 0.06;
	float bulge = sin( t * 3.0 + outPos.y * 2.0 ) * 0.04;
	outPos.x += wave + bulge;
	outPos.z += cos( outPos.y * 6.0 + t * 3.5 ) * 0.05;

	#include <vert_out>

}
