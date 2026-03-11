#include <common>
#include <vert_h>

void main( void ) {

	#include <vert_in>

	// 時間ベースの頂点ディスプレースメント
	float t = uTimeE;
	float pulse = sin( t * 3.0 ) * 0.5 + 0.5;
	float spike = sin( outPos.x * 8.0 + t * 4.0 ) * cos( outPos.y * 7.0 + t * 3.5 ) * sin( outPos.z * 6.0 + t * 2.5 );
	float displacement = spike * 0.15 * pulse + sin( t * 1.5 ) * 0.05;
	outPos.xyz += normalize( outPos.xyz ) * displacement;

	#include <vert_out>

}
