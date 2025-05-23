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
	float metalic;
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