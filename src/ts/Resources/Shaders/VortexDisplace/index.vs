#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	// 渦巻きディスプレースメント
	float t = uTimeE;
	float angle = atan( outPos.z, outPos.x ) + t * 2.0;
	float dist = length( outPos.xz );
	float twist = sin( angle * 3.0 + dist * 4.0 - t * 5.0 ) * 0.2;
	outPos.y += twist;
	outPos.x += cos( angle + t ) * 0.05;
	outPos.z += sin( angle + t ) * 0.05;

	#include <vert_out>

}
