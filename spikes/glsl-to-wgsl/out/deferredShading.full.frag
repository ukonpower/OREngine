#version 300 es
precision highp float;
#define PI 3.14159265359
#define TPI 6.28318530718
#define HPI 1.57079632679
#define saturate(x) clamp(x,0.,1.)

struct Geometry {
	vec3 position;
	vec3 normal;
	float depth;
	vec3 viewDir;
	vec3 viewDirWorld;
	float occulusion;
};

struct Material {
	vec3 color;
	float roughness;
	float metallic;
	vec3 emission;
	vec3 diffuseColor;
	vec3 specularColor;
	float envMapIntensity;
};

float sinn( float x ) {
	return sin(x - HPI) * 0.5 + 0.5;
}

float atan2(in float y, in float x){

    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);
	
}

#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)

// easing

float easeInOut( float x ) {

	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;

}

float easeOut( float t, float k ) {

	float x = exp( - clamp( t, 0.0, 1.0 ) * k );
	float s0 = 1.0;
	float s1 = exp( -k );
	return ( x - s0 ) / (s1 - s0 );
	
}

float easeIn( float t, float k ) {

	return 1.0 - easeOut( 1.0 - t, k );
	
}

float easeBounce( float t, float b ) {

	t = 1.0 - t;
	return 1.0 - t * t * ( b * t - b + 1.0 );
	
}

// hsv

vec3 hsv2rgb( vec3 hsv ) {

	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;
	
}

// color space conversion

vec3 srgbToLinear( vec3 srgb ) {
	return mix(
		srgb / 12.92,
		pow((srgb + 0.055) / 1.055, vec3(2.4)),
		step(0.04045, srgb)
	);
}

vec3 linearToSrgb( vec3 linear ) {
	return mix(
		linear * 12.92,
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,
		step(0.0031308, linear)
	);
}

// packing

vec4 floatToRGBA( float v ) {
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
	enc = fract(enc);
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
	return enc;
}

float rgbaToFloat( vec4 rgba ) {
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );
}

struct DirectionalLight {
	vec3 direction;
	vec3 color;
};

struct SpotLight {
	vec3 position;
	vec3 direction;
	vec3 color;
	float angle;
	float blend;
	float distance;
	float decay;
};

struct LightCamera {
	float near;
	float far;
	mat4 uViewMatrix;
	mat4 uProjectionMatrix;
	vec2 resolution;
};

struct Light {
	vec3 direction;
	vec3 color;
};

#if 1 > 0 

	uniform DirectionalLight directionalLight[1];
	uniform LightCamera uDirectionalLightCamera[1];
	uniform sampler2D directionalLightShadowMap[1];
	
#endif

#if 0 > 0 

	uniform SpotLight uSpotLight[0];
	uniform LightCamera uSpotLightCamera[0];
	uniform sampler2D uSpotLightShadowMap[0];
	
#endif

// shadowmap

float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {

	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );

	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {

		return step( lightDepth, shadowMapDepth + depthOffset );

	}

	return 1.0;

}

// shadow

void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {
	
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;
	
	float lightNear = camera.near;
	float lightFar = camera.far;
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );

}

float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {

	vec2 shadowCoord;
	float lightDepth;

	setShadowCoord( pos, camera, shadowCoord, lightDepth );

	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );

}

#define SHADOW_SAMPLE_COUNT 2

float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {

	vec2 shadowCoord;
	float lightDepth;

	setShadowCoord( pos, camera, shadowCoord, lightDepth );
	
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );

	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {

		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );

		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );
		
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );

		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );

	}

	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );

}

float ggx( float dNH, float roughness ) {
	
	float a2 = roughness * roughness;
	a2 = a2 * a2;
	float dNH2 = dNH * dNH;

	if( dNH2 <= 0.0 ) return 0.0;

	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );

}

vec3 lambert( vec3 diffuseColor ) {

	return diffuseColor / PI;

}

float gSchlick( float d, float k ) {

	if( d == 0.0 ) return 0.0;

	return d / ( d * ( 1.0 - k ) + k );
	
}

float gSmith( float dNV, float dNL, float roughness ) {

	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );

	return gSchlick( dNV, k ) * gSchlick( dNL, k );
	
}

float fresnel( float d ) {
	
	float f0 = 0.04;

	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );

}

vec3 RE( Geometry geo, Material mat, Light light) {

	vec3 lightDir = normalize( light.direction );
	vec3 halfVec = normalize( geo.viewDir + lightDir );

	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );

	vec3 irradiance = light.color * dNL;

	// diffuse
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;

	// specular
	float D = ggx( dNH, mat.roughness );
	float G = gSmith( dNV, dNL, mat.roughness );
	float F = fresnel( dLH );
	
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; 

	vec3 c = vec3( 0.0 );
	c += diffuse * ( 1.0 - F ) + specular;

	return c;

}
// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15

float getPmremFace( vec3 direction ) {

	vec3 absDirection = abs( direction );

	float face = - 1.0;

	if ( absDirection.x > absDirection.z ) {

		if ( absDirection.x > absDirection.y )

			face = direction.x > 0.0 ? 0.0 : 3.0;

		else

			face = direction.y > 0.0 ? 1.0 : 4.0;

	} else {

		if ( absDirection.z > absDirection.y )

			face = direction.z > 0.0 ? 2.0 : 5.0;

		else

			face = direction.y > 0.0 ? 1.0 : 4.0;

	}

	return face;

}

// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L44

vec2 getPmremUV( vec3 direction, float face ) {

	vec2 uv;

	if ( face == 0.0 ) {

		uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

	} else if ( face == 1.0 ) {

		uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

	} else if ( face == 2.0 ) {

		uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

	} else if ( face == 3.0 ) {

		uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

	} else if ( face == 4.0 ) {

		uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

	} else {

		uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

	}

	return 0.5 * ( uv + 1.0 );

}

vec3 getPmremDir( vec2 uv, float face ) {

	vec3 dir = vec3( 0.0 );

	if ( face == 0.0 ) {

		vec2 yz = ( vec2( uv.y, uv.x ) - 0.5 ) * 2.0;
		
		dir = vec3( 1.0, yz );

	} else if( face == 1.0 ) {

		vec2 xz = ( vec2( - uv.x, -uv.y ) + 0.5 ) * 2.0;
		
		dir = vec3( xz.x, 1.0, xz.y );
		
	} else if( face == 2.0 ) {

		vec2 xy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;
		
		dir = vec3( xy, 1.0 );
		
	} else if( face == 3.0 ) {

		vec2 zy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;
		
		dir = vec3( -1.0, zy.y, zy.x );
		
	} else if( face == 4.0 ) {

		vec2 xz = ( vec2( - uv.x + 0.5 , uv.y - 0.5 ) ) * 2.0;
		
		dir = vec3( xz.x, -1.0, xz.y );
		
	} else if( face == 5.0 ) {

		vec2 xy = ( vec2( uv.x, uv.y ) - 0.5 ) * 2.0;
		
		dir = vec3( xy, -1.0 );
		
	}

	return normalize( dir );

}


//https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L132

#define MAXMIP 5.0

float roughnessToMip( float roughness ) {

	float mip = 0.0;

	mip = roughness * ( MAXMIP - 1.0 );

	return mip;

}

vec3 getPmremMip( sampler2D envMap, vec3 direction, float mip ) {

	float face = getPmremFace( direction );
	vec2 uv = getPmremUV( direction, face );

	vec2 faceRes = vec2(textureSize( envMap, 0 )) * pow( 0.5, floor( mip ) );
	float s = 2.0;
	uv *= faceRes - 2.0 * s;
	uv += 1.0 * s;
	uv /= faceRes;

	uv.x += mod( face, 3.0 );
	uv.y += floor( face / 3.0) ;
	
	uv.y *= 0.5;
	uv.y *= 0.5;
	uv.x /= 3.0;

	float scale = 1.0 - pow( 2.0, -floor(mip) );
	uv.y *= 1.0 - scale;
	uv.x *= 1.0 - scale;
	uv.y += scale;

	vec4 col = textureGrad( envMap, uv, vec2( 0.0 ), vec2( 0.0 )  );

	return col.xyz / col.w;

}

vec3 getPmrem( sampler2D envMap, vec3 direction, float roughness ) {

	float mip = roughnessToMip( roughness );
	float mipF = fract( mip );
	float mipInt = floor( mip );

	vec3 color0 = getPmremMip( envMap, direction, mipInt );

	if ( mipF == 0.0 ) {

		return color0;

	} else {

		vec3 color1 = getPmremMip( envMap, direction, mipInt + 1.0 );

		return mix( color0, color1, mipF );

	}

}

// uniforms

uniform sampler2D sampler0; // position.xyz, emission.x
uniform sampler2D sampler1; // normal.xyz, emission.y
uniform sampler2D sampler2; // albedo, 
uniform sampler2D sampler3; // roughness, metallic, normalSelect, envSelect, 
uniform sampler2D sampler4; // velocity.xy, 0.0, emission.z

uniform sampler2D uSSAOTexture;
uniform sampler2D uLightShaftTexture;
uniform sampler2D uEnvMap;

uniform vec3 uColor;
uniform mat4 uViewMatrix;
uniform mat4 uCameraMatrix;
uniform vec3 uCameraPosition;

// -------------------------

// varyings

in vec2 vUv;

// out

layout (location = 0) out vec4 glFragOut0;
layout (location = 1) out vec4 glFragOut1;

void main( void ) {

	float occlusion = texture( uSSAOTexture, vUv ).x;

	vec4 tex0 = texture( sampler0, vUv );
	vec4 tex1 = texture( sampler1, vUv );
	vec4 tex2 = texture( sampler2, vUv );
	vec4 tex3 = texture( sampler3, vUv );
	vec4 tex4 = texture( sampler4, vUv );

	vec3 normal = tex1.xyz;
	vec3 color = tex2.xyz;
	float roughness = tex3.x;
	float metallic = tex3.y;
	vec3 emission = vec3( tex0.w, tex1.w, tex4.w );
	float envMapIntensity= tex3.w;

	Geometry geo = Geometry(
		tex0.xyz,
		normal,
		0.0,
		normalize( uCameraPosition - tex0.xyz ),
		vec3( 0.0 ),
		occlusion
	);
	
	Material mat = Material(
		color,
		roughness,
		metallic,
		emission,
		mix( color, vec3( 0.0, 0.0, 0.0 ), metallic ),
		mix( vec3( 1.0, 1.0, 1.0 ), color, metallic ),
		envMapIntensity
	);
	vec3 outColor = vec3( 0.0 );

	// lighting

	// required common, light,

float shadow;

// direcitonalLight

Light light;
LightCamera lightCamera;

#if 1 > 0 

	DirectionalLight dLight;

	

		dLight = directionalLight[ 0 ];
		light.direction = dLight.direction;
		light.color = dLight.color;

		// shadow

		#if 0 < 1

			shadow = getShadowSmooth( tex0.xyz, uDirectionalLightCamera[ 0 ], directionalLightShadowMap[ 0 ], 0.0001 );

		#else

			shadow = 1.0;

		#endif
		
		// lighting

		outColor.xyz += RE( geo, mat, light ) * shadow;

	

#endif

#if 0 > 0

	SpotLight sLight;
	
	vec3 spotDirection;
	float spotDistance;
	float spotAngleCos;
	float spotAttenuation;
	vec3 radiance;

	

#endif

	// env

	vec3 refDir = reflect( -geo.viewDir, geo.normal );
float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );
float EF = mix( fresnel( dNV ), 1.0, mat.metallic );
outColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;
outColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );
	
	// occlusion

	outColor.xyz *= max( 0.0, 1.0 - geo.occulusion * 1.5 );
	
	// emission

	outColor.xyz += mat.emission;

	
	// light shaft
	
	outColor.xyz += texture( uLightShaftTexture, vUv ).xyz;

	glFragOut0 = glFragOut1 = vec4( max( vec3( 0.0 ), outColor.xyz ), 1.0 );

}