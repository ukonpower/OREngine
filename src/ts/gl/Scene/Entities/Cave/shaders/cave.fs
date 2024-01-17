#include <common>
#include <packing>
#include <frag_h>

#include <sdf>
#include <noise>
#include <rotate>

uniform vec3 cameraPosition;
uniform mat4 modelMatrixInverse;
uniform float uTime;
uniform float uTimeSeq;

// arigatou chat gpt

mat3 rotAtoB(vec3 A, vec3 B) {
  vec3 axis = normalize(cross(A, B));
  float angle = acos(dot(normalize(A), normalize(B)));
  
  float c = cos(angle);
  float s = sin(angle);
  float t = 1.0 - c;
  
  return mat3(
    t * axis.x * axis.x + c,           t * axis.x * axis.y - s * axis.z, t * axis.x * axis.z + s * axis.y,
    t * axis.x * axis.y + s * axis.z, t * axis.y * axis.y + c,           t * axis.y * axis.z - s * axis.x,
    t * axis.x * axis.z - s * axis.y, t * axis.y * axis.z + s * axis.x, t * axis.z * axis.z + c
  );
}

vec2 D( vec3 p ) {

	float n = fbm(p * 0.5 + fbm3(p * 0.5 + uTime * 0.0 ) * 20.0) * 0.5;
	p.z += 0.05 + n * 0.5;

	vec2 d = vec2( sdBox( p, vec3( 2.0, 1.0, 0.1 ) ), 1.0 );

	return d;

}

vec3 N( vec3 pos, float delta ){

    return normalize( vec3(
		D( pos ).x - D( vec3( pos.x - delta, pos.y, pos.z ) ).x,
		D( pos ).x - D( vec3( pos.x, pos.y - delta, pos.z ) ).x,
		D( pos ).x - D( vec3( pos.x, pos.y, pos.z - delta ) ).x
	) );
	
}

void main( void ) {

	#include <frag_in>

	vec3 rayPos = vec3( vUv.xy * 1.0, 0.0 );
	vec3 rayDirWorld = normalize( vPos - cameraPosition );

	mat3 rotLocalZtoNormal = rotAtoB( vec3( 0.0, 0.0, -1.0 ), normalize( -vNormal ) );
	mat3 rotLocalZtoNormalInv = rotAtoB( normalize( -vNormal ), vec3( 0.0, 0.0, -1.0 ) );

	vec3 rayDir = normalize( rotLocalZtoNormal * rayDirWorld );
	vec2 dist = vec2( 0.0 );
	bool hit = false;

	vec3 normal;
	
	for( int i = 0; i < 16; i++ ) { 

		dist = D( rayPos );		
		rayPos += dist.x * rayDir;

		if( dist.x < 0.0001 ) {

			normal = N( rayPos, 0.0001 );

			hit = true;
			break;

		}

	}

	if( !hit ) discard;

	// if( dist.y == 1.0 ) {
		
		outRoughness = 1.0;
		outMetalic = 0.0;
		outColor *= 1.0;
		
	// }
		
	outNormal = normalize( vec4( rotLocalZtoNormalInv * vec3( normal ), 0.0 )).xyz;
	outPos = ( vec4( vPos, 1.0 ) ).xyz;

	#include <frag_out>

}