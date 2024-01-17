#include <common>
#include <packing>
#include <frag_h>
#include <light_h>

in float vAlpha;
uniform vec3 cameraPosition;

void main( void ) {

	#include <frag_in>

	float circle = smoothstep( 0.5, 0.0, length( gl_PointCoord.xy - 0.5 ) );
	
	if( circle == 0.0 ) discard;

	Geometry geo = Geometry(
		vPos,
		vec3( 0.0, 0.0, 0.0 ),
		0.0,
		normalize( cameraPosition - vPos ),
		vec3( 0.0 )
	);

	vec3 color = vec3( 0.0 );
	float s = 0.0;

	Light light;

	float shadow;
	
	#if NUM_LIGHT_SPOT > 0

		SpotLight sLight;
		
		vec3 spotDirection;
		float spotDistance;
		float spotAngleCos;
		float spotAttenuation;

		#pragma loop_start NUM_LIGHT_SPOT

			// shadow

			shadow = getShadowSmooth( geo.position, spotLightCamera[ LOOP_INDEX ], spotLightShadowMap[ LOOP_INDEX ] );

			// lighting

			sLight = spotLight[ LOOP_INDEX ];

			spotDirection = normalize(sLight.position - geo.position);
			spotDistance = length( sLight.position - geo.position );
			spotAngleCos = dot( sLight.direction, spotDirection );
			spotAttenuation = 0.0;

			if( spotAngleCos > sLight.angle ) {

				spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );

			}

			s += shadow * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ), sLight.decay );

		#pragma loop_end
	
	#endif

	outColor = vec4( vec3( 1.0 ), s * circle );

	#include <frag_out>

} 