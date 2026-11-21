#include <module:common>
#include <part:frag_h>

// 色と光は ClipColor が帯に合わせて毎フレーム入れる
uniform vec3 uAlbedo;
uniform vec3 uEmission;

void main( void ) {

	#include <part:frag_in>

	outColor = vec4( uAlbedo, 1.0 );
	outEmission = uEmission;

	#include <part:frag_out>

}
