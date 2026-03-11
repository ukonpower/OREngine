#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	// 呼吸するように膨張収縮
	float t = uTimeE;
	float breath = sin( t * 2.0 ) * 0.15 + 1.0;
	float wave = sin( outPos.y * 5.0 + t * 3.0 ) * 0.08;
	outPos.xyz *= breath;
	outPos.xyz += outNormal * wave;

	#include <vert_out>

}
