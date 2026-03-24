#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	// 電流が走るような頂点アニメーション
	float t = uTimeE;
	float shock = sin( outPos.x * 10.0 + t * 15.0 ) * sin( outPos.z * 8.0 + t * 12.0 ) * 0.03;
	outPos.y += shock;

	#include <vert_out>

}
