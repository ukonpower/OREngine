#include <module:common>
#include <module:light>

// uniforms

uniform sampler2D uLightShaftBackBuffer;
uniform sampler2D uDepthTexture;

uniform float uTimeEF;
uniform mat4 uCameraMatrix;
uniform mat4 uProjectionMatrixInverse;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

const float MARCH_LENGTH = 60.0;
const float MARCH = 16.0;

#include <module:random>

void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec2 screen = vUv * 2.0 - 1.0;
	mat4 cp = uCameraMatrix * uProjectionMatrixInverse;
	
	float depth = texture( uDepthTexture, vUv ).x;
	vec4 rp = cp * vec4( screen, depth * 2.0 - 1.0, 1.0 );

	// 始点は near 面上の点。並行投影ではカメラ位置から出ないので、画素ごとに near/far 面の点から求める
	vec4 np = cp * vec4( screen, -1.0, 1.0 );
	vec4 fp = cp * vec4( screen, 1.0, 1.0 );
	vec3 rayPos = np.xyz / np.w;
	vec3 rayDir = normalize( fp.xyz / fp.w - rayPos );
	vec3 rayEndPos = rp.xyz / rp.w;

	if( rayEndPos.x + rayEndPos.y + rayEndPos.z == 0.0 ) {
		
		rayEndPos = rayPos + rayDir * 100.0;

	}
	
	vec3 diff = rayEndPos - rayPos;
	float rayLength = length( diff );

	float rayStepLength = MARCH_LENGTH / MARCH;;
	vec3 rayStep = rayDir * rayStepLength;;

	float totalRayLength = random(vUv + fract(uTimeEF)) * 1.0 * rayStepLength;
	rayPos += rayDir * totalRayLength;

	for( int i = 0; i < int( MARCH ); i ++ ) {

		rayPos += rayStep;
		totalRayLength += rayStepLength;

		if( totalRayLength >= rayLength ) break;

		float shadow;

		#if NUM_LIGHT_DIR > 0 

			DirectionalLight dLight;

			#pragma loop_start NUM_LIGHT_DIR

				dLight = directionalLight[ LOOP_INDEX ];

				#if LOOP_INDEX < NUM_SHADOWMAP_DIR

					shadow = getShadow( rayPos, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0 );

				#else

					shadow = 1.0;

				#endif

				lightShaftSum += dLight.color * shadow * rayStepLength * 0.0025;

			#pragma loop_end
		
		#endif

		// spotlight

		#if NUM_LIGHT_SPOT > 0

			SpotLight sLight;
			
			vec3 spotDirection;
			float spotDistance;
			float spotAngleCos;
			float spotAttenuation;

			#pragma loop_start NUM_LIGHT_SPOT

				sLight = uSpotLight[ LOOP_INDEX ];

				spotDirection = normalize(sLight.position - rayPos);
				spotDistance = length( sLight.position - rayPos );
				spotAngleCos = dot( sLight.direction, spotDirection );
				spotAttenuation = 0.0;

				if( spotAngleCos > sLight.angle * -1.0 ) {

					spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );

				}

				#if LOOP_INDEX < NUM_SHADOWMAP_SPOT

					shadow = getShadow( rayPos, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.0 );

				#else

					shadow = 1.0;

				#endif

				lightShaftSum += sLight.color * 
					shadow * 
					spotAttenuation / max( spotDistance * spotDistance, 0.0001 ) *
					rayStepLength * 0.02;

			#pragma loop_end
				
		#endif

	}

	lightShaftSum *= 0.4;

	outColor = vec4( mix( texture( uLightShaftBackBuffer, vUv ).xyz, lightShaftSum, 0.6), 1.0 );

}