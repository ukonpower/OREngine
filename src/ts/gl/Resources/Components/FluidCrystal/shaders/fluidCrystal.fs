#include <common>
#include <packing>
#include <frag_h>

#include <sdf>
#include <noise>
#include <rotate>

#include <light>
#include <pmrem>

uniform float uTimeE;
uniform vec3 cameraPosition;
uniform mat4 modelMatrixInverse;
uniform vec2 uResolution;
uniform float uAspectRatio;

uniform sampler2D uEnvMap;


vec2 D( vec3 p ) {

	vec2 d = vec2( 99999.0, 0.0 );
	
	float n = noiseCyc( p * 1.3 + uTimeE * 0.5 ).x;
	float radius = 0.4 + n * 0.1;
	d = opAdd( d, vec2( sdSphere( p, radius ), 1.0 ) );
	
	return d;

}

#include <rm_normal>

void main( void ) {

	#include <frag_in>
	#include <rm_ray_obj>

	vec2 dist = vec2( 0.0 );
	bool hit = false;
	
	for( int i = 0; i < 32; i++ ) { 

		dist = D( rayPos );		
		rayPos += dist.x * rayDir;

		if( dist.x < 0.01 ) {

			hit = true;
			break;

		}
		
	}

	vec3 normal = N( rayPos, 0.001 );

	if( dist.y == 1.0 ) {
		
		outRoughness = 1.0;
		outMetalic = 0.0;
		outColor.xyz = vec3( 1.0, 1.0, 1.0 );
		
	} else if( dist.y == 0.0 ) {

		outEmission =  vec3( 1.0, 0.7, 0.7 ) * smoothstep( 0.0, 1.0, dot( normal, -rayDir ) );
		
	} 

	outNormal = normalize(modelMatrix * vec4( normal, 0.0 )).xyz;

	if( !hit ) discard;

	outColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#ifdef IS_FORWARD

		vec2 uv = gl_FragCoord.xy / uResolution;

		for( int i = 0; i < 4; i++ ) {

			vec2 v = ( normal.xy ) * float( i + 1 ) / 4.0 * 0.1;
			outColor.x += texture( uDeferredTexture, uv + v * 1.0 ).x;
			outColor.y += texture( uDeferredTexture, uv + v * 1.1 ).y;
			outColor.z += texture( uDeferredTexture, uv + v * 1.2 ).z;

		}

		outColor.xyz /= 4.0;
		outColor.xyz *= vec3( 1.5, 0.2, 0.2 );

		float dNV = clamp( dot( outNormal, -rayDir ), 0.0, 1.0 );
		float fl = fresnel( dNV ) * 2.0 + 0.2;

		vec3 refDir = reflect( -rayDir, outNormal );
		
		outColor.xyz += getPmrem( uEnvMap, refDir, 0.2 ) * fl;
		// outColor.xyz += getPmrem( uEnvMap, outNormal, 1.0) / PI;
		outColor.xyz += refDir * 0.2;

	#endif

	outPos = ( modelMatrix * vec4( rayPos, 1.0 ) ).xyz;
	

	#include <frag_out>

}