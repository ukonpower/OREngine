#include <common>

#include <noise>

in float aTime;

out float o_left;
out float o_right;

uniform float uDuration;
uniform float uSampleRate;
uniform float uTimeOffset;

const float BPM = 85.0;

/*-------------------------------
	Utils
-------------------------------*/

float whiteNoise(float time)
{
    return fract(sin(dot(vec2( time ), vec2(12.9898,78.233))) * 43758.5453);
}


float saw(float time){

    return fract(-time)*2.-1.;
	
}

float square( float time) {

	return sign( fract( time ) - 0.1 );
	
}

float tri(float time ){
    return abs(2.*fract(time*.5-.25)-1.)*2.-1.;
}

float ssin(float time ) {
	return sin( time * TPI );
}

float s2f( float scale ){

	return 440.0 * pow( 1.06, scale );
	
}

float slope( float value, float slope ) {

	if( value >= 0.0 ) {

		return linearstep( 0.0, 1.0 - slope, value );

	} else {

		return linearstep( 0.0, -1.0 + slope, value ) * -1.0;
		
	}

	return 0.0;
	
}

bool isin( float time, float start, float end ) {

	return start <= time && time <= end;
	
}

/*-------------------------------
	clap
-------------------------------*/

float clap( float time, float loop ) {

	float envTime = fract(loop) * 10.0;

	float o = 0.0;
	
	float env = mix( exp( envTime * - 8.0 ), exp( fract(envTime * 14.0 ) * -5.0), exp( envTime  * -10.0  ) );
	
	o += fbm( envTime * 780.0 ) * env * 1.3;
	
	return o;

}

vec2 clap1( float time, float loop ) {

	vec2 o = vec2( 0.0 );

	float l = loop - 0.5;

	o += clap( time, l ) * float[]( 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0  )[int(l)];
	
	return o * 0.5;

}

/*-------------------------------
	Hihat
-------------------------------*/

float hihat( float time, float loop ) {

	return noise(time * 22000.0) * max(0.0,1.0-min(0.85,loop*4.25)-(loop-0.25)*0.3);

}

vec2 hihat1( float time, float loop ) {
	
	vec2 o = vec2( 0.0 );

	float l4 = loop * 4.0;

	o += hihat( time, fract( l4 ) ) * (step( 0.4, whiteNoise( floor( l4 )) ) * 0.5 + 0.5);
	o += hihat( time, fract( l4 + 0.5 ) ) * step( 0.5, whiteNoise(  floor( l4 + 0.5 ) * 10.0 + 0.1 ) );
	o *= 0.04;
	
	return o;
  
}

/*-------------------------------
	Kick
-------------------------------*/

float kick( float time, float loop ) {

	float envTime = fract( loop );

	float t = time;
	t -= 0.1 * exp( -70.0 * envTime );
	t += 0.1;

	float o = ( smoothstep( -0.5, 0.5, sin( t * 190.0 ) ) * 2.0 - 1.0 ) * smoothstep( 1.0, 0.1, envTime );
	o *= 0.25;

    return o;

}

vec2 kick1( float time, float loop ) {

	vec2 o = vec2( 0.0 );

	float loop2 = loop - 0.25;
	float loop3 = loop - 0.625;

	o += kick( time, loop ) * float[]( 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0  )[int( loop )];
	o += kick( time, loop2 ) * float[]( 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0  )[int( loop2 )];
	o += kick( time, loop3 ) * float[]( 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0 )[int( loop3 )];


	return o;

}

/*-------------------------------
	Mooooon
-------------------------------*/

float moooon( float time, float loop ) {

	float envTime = fract( loop );

	float t = time;
	t -= 1.0 * exp( -7.0 * envTime );

	float o = 0.0;
	o = ( smoothstep( -1.0, 1.0, sin( t * 200.0 ) ) * 2.0 - 1.0 ) * smoothstep( 1.0, 0.0, envTime );
	o *= 0.35;

    return o;

} 

/*-------------------------------
	xylophone
-------------------------------*/

const float xylophoneMelody[] = float[](
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0,
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0,
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0,
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0
);

const float xylophoneMelody2[] = float[](
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0
);

vec2 xylophone1( float time, float loop, float type ) {

	vec2 o = vec2( 0.0 );

	float envTime = fract( loop );

	float t = time;
	t -= 0.02 * exp( -70.0 * envTime );
	t += 0.02;

	float s = xylophoneMelody[int( loop )];

	if( type == 1.0 ) {

		s = xylophoneMelody2[int( loop )];
		
	}

	for(int i = 0; i < 1; i++){

		float fi = float( i ) / 2.0;

		float v = ( smoothstep( -0.5, 0.5, ssin( t * s2f( s + 12.0 * float( i ) ) ) ) * 2.0 - 1.0 ) * smoothstep( 1.0, 0.1, envTime );

		o += v * 0.03 * ( 1.0 - fi * 1.5 );
		
	}

	return o;

}

/*-------------------------------
	dada
-------------------------------*/

vec2 dada( float time, float loop ) {

	int index = int( loop );
	float envTime = fract( loop );
	float w = mod(envTime * 8.0, 2.0);

	vec2 o = vec2( 0.0 );

	for( int i = 0; i < 6; i ++ ) {

		float fi = float( i ) / 6.0;
		float frec = s2f(4.0 + float(i) * 12.0 ) * pow( 0.5, 4.0 ); 

		float v = saw( time * frec + ssin( w * 20.0 ) + TPI * fi ) * abs( pow( sin( w * TPI ), 3.0 ));

		o.x += v * ( sin( fi * TPI ) * 0.5 + 0.5 );
		o.y += v * ( cos( fi * TPI ) * 0.5 + 0.5 );

		frec = s2f(4.0 + float(i) * 12.0 ) * pow( 0.5, 10.0 ); 
		v = tri( time * frec + ssin( w * 21.0 ) + TPI * fi ) * abs( pow( sin( w * TPI ), 1.0 )) * 0.8;

		o.x += v * ( sin( PI / 2.0 + fi * TPI ) * 0.5 + 0.5 );
		o.y += v * ( cos( PI / 2.0 + fi * TPI ) * 0.5 + 0.5 );

	}

	o *= isin(w, 1.0, 2.0 ) && isin(loop, 1.75, 2.0 ) ? 1.0 : 0.0 ;
	
	o *= 0.05;

	return o;
	
}

/*-------------------------------
	faaa
-------------------------------*/

const float mainCord[] = float[](
	4.0, 6.0, 7.0, 6.0,
	7.0, 9.0, 11.0, 6.0,
	11.0, 13.0, 14.0, 13.0
);

vec2 faaa( float time, float loop ) {

	int index = int( loop );
	float envTime = fract( loop );

	vec2 o = vec2( 0.0 );

	for( int i = 0; i < 3; i ++ ) {

		float scale = mainCord[ index + 4 * i ];
		float freq = s2f(scale + 12.0); 

		o += ( sin( time * freq ) + sin( time * freq * 1.007 ) );

	}

	o *= 0.05;

	return o;
	
}

vec2 music( float time ) {

	float t = time * (BPM / 60.0);
	t = max( 0.0, t - 0.0 );

	float loop1 = fract( t );
	
	float loop4 = mod( t, 4.0 );
	float loop4Phase = floor( loop4 );

	float loop8 = mod( t, 8.0 );
	float loop8Phase = floor( loop8 );

	float loop16 = mod( t, 16.0 ); 
	float loop16Phase = loop16 / 16.0;
	
	float loop32 = mod( t, 32.0 );
	float loop32Phase = t / 32.0;

	vec2 o = vec2( 0.0 );

	// click

	o += step( fract( loop4 ), 0.1 ) * ssin( time * s2f(3.0) * 2.0 ) * 0.03;
	o += step( fract( loop4 / 4.0 ), 0.05 ) * ssin( time * s2f(12.0) * 2.0 ) * 0.02;

	return o;
	
}

void main( void ) {

	float time = (aTime + uTimeOffset) / uSampleRate;

	vec2 o = music( time );

	o_left = o.x;
	o_right = o.y;

}