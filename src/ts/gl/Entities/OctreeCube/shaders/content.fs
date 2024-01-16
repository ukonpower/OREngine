#include <common>
#include <packing>
#include <frag_h>

#include <sdf>
#include <noise>
#include <rotate>

uniform vec3 cameraPosition;
uniform mat4 modelMatrixInverse;
uniform float uTime;

// ref: https://www.shadertoy.com/view/stdXWH
// ref: https://www.shadertoy.com/view/dsjGDD

struct GridResult {
	vec3 grid;
	float b;
	float size;
	float noise;
};

const float GRID_INTERVAL = 0.25;

GridResult traverseGrid3D( vec3 ro, vec3 rd ) {

	GridResult result;
	
	for( int i = 0; i < 4; i ++ ) {
	
		float gridSize = GRID_INTERVAL * pow( 0.5, float( i ) ) ; 

	    result.grid = floor( ( ro + rd * 0.01 * gridSize ) / gridSize ) * gridSize + 0.5 * gridSize;

		vec3 src = ( ro - result.grid ) / rd;
		vec3 dst = abs( 0.5 * gridSize / rd );
		vec3 bv = -src + dst;
		
		result.b = min( min( bv.x, bv.y ), bv.z );
		result.size = gridSize;
		result.noise = noise( result.grid * 100.0 );
		
		float n = noise( result.grid * 8.0 + float(i) * 9.0 + uTime * 0.1);

		if( n < 0.5 ) {

			break;

		}

	}
	
    return result;
}

vec2 D( vec3 p, GridResult gridResult) {

	vec2 d = vec2( 0.0 );

	vec3 s = vec3( gridResult.size / 2.0 * 0.6 );

	d = vec2( sdRoundBox( p, s, 0.2 * s.x ), 0.0 );
	
	return d;

}


vec3 N( vec3 pos, GridResult gridResult, float delta ){

    return normalize( vec3(
		D( pos, gridResult ).x - D( vec3( pos.x - delta, pos.y, pos.z ), gridResult ).x,
		D( pos, gridResult ).x - D( vec3( pos.x, pos.y - delta, pos.z ), gridResult ).x,
		D( pos, gridResult ).x - D( vec3( pos.x, pos.y, pos.z - delta ), gridResult ).x
	) );
	
}

void main( void ) {

	#include <frag_in>

	vec3 rayOrigin = ( modelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;
	vec3 rayDir = normalize( ( modelMatrixInverse * vec4( normalize( vPos - cameraPosition ), 0.0 ) ).xyz );
	vec2 rayDirXZ = normalize( rayDir.xz );
	vec3 rayPos = rayOrigin;
	float rayLength = 0.0;
	
	vec3 gridCenter = vec3( 0.0 );
	float lenNextGrid = 0.0;
	
	vec2 dist = vec2( 0.0 );
	bool hit = false;

	vec3 normal;
	GridResult gridResult;
	
	for( int i = 0; i < 64; i++ ) { 

		if( lenNextGrid <= rayLength ) {

			rayLength = lenNextGrid;
			rayPos = rayOrigin + rayLength * rayDir;
			gridResult = traverseGrid3D( rayPos, rayDir );
			gridCenter.xyz = gridResult.grid;

			float lg = length(gridCenter.xyz);
			lenNextGrid += gridResult.b;

		}

		dist = D( rayPos - gridCenter, gridResult );
		rayLength += dist.x;
		rayPos = rayOrigin + rayLength * rayDir;

		if( dist.x < 0.0001 ) {
			hit = true;
			break;
		}
		
		if( abs( rayPos.x ) > 0.5 ) break;
		if( abs( rayPos.z ) > 0.5 ) break;
		if( abs( rayPos.y ) > 0.5 ) break;
		
	}

	if( hit ) {

		vec3 n = N( rayPos - gridCenter, gridResult, 0.001 );
		outNormal = normalize(modelMatrix * vec4( n, 0.0 )).xyz;
		outColor = vec4( 0.05 );
		outColor += smoothstep( 0.3, 0.7,  noise( gridResult.grid * 100.0 ) ) ;

		// outColor.xyz = vec3( n );

		
	} else {

		discard;
		
	}

	outRoughness = 0.0 + fbm( rayPos * 20.0 );
	outMetalic = 0.0;


	outPos = ( modelMatrix * vec4( rayPos, 1.0 ) ).xyz;

	#include <frag_out>

}