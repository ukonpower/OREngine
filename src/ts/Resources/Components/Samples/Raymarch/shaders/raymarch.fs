#include <common>
#include <frag_h>
#include <sdf>
#include <rm_h>

SDFResult D( vec3 p ) {

	vec2 d = vec2( 99999.0, 0.0 );

	d = opAdd( d, vec2( sdSphere( p, 0.5 ), 0.0 ) );

	return SDFResult( 
		d.x,
		p,
		d.y
	);

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	bool hit = false;

	SDFResult dist;
	
	for( int i = 0; i < 32; i++ ) { 

		dist = D( rayPos );		
		rayPos += dist.d * rayDir * 0.9;

		if( dist.d < 0.001 ) {

			hit = true;
			break;

		}
		
	}

	if( !hit ) discard;

	outNormal = N( rayPos, 0.01 );

	#include <rm_out_obj>
	#include <frag_out>
	
}