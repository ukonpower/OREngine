// 値ノイズ。webgl側 shaderModules/noiseValue.module.glsl の移植
// https://www.shadertoy.com/view/4dS3Wd

fn noiseHash( p_in: f32 ) -> f32 {

	var p = fract( p_in * 0.011 );
	p *= p + 7.5;
	p *= p + p;

	return fract( p );

}

fn noiseValue( x: vec3f ) -> f32 {

	let stp = vec3f( 110.0, 241.0, 171.0 );

	let i = floor( x );
	let f = fract( x );

	let n = dot( i, stp );

	let u = f * f * ( 3.0 - 2.0 * f );

	return mix(
		mix(
			mix( noiseHash( n + dot( stp, vec3f( 0.0, 0.0, 0.0 ) ) ), noiseHash( n + dot( stp, vec3f( 1.0, 0.0, 0.0 ) ) ), u.x ),
			mix( noiseHash( n + dot( stp, vec3f( 0.0, 1.0, 0.0 ) ) ), noiseHash( n + dot( stp, vec3f( 1.0, 1.0, 0.0 ) ) ), u.x ),
			u.y
		),
		mix(
			mix( noiseHash( n + dot( stp, vec3f( 0.0, 0.0, 1.0 ) ) ), noiseHash( n + dot( stp, vec3f( 1.0, 0.0, 1.0 ) ) ), u.x ),
			mix( noiseHash( n + dot( stp, vec3f( 0.0, 1.0, 1.0 ) ) ), noiseHash( n + dot( stp, vec3f( 1.0, 1.0, 1.0 ) ) ), u.x ),
			u.y
		),
		u.z
	);

}

fn noiseFbm( x: vec3f ) -> f32 {

	var v = 0.0;
	var a = 0.5;
	var p = x;

	for ( var i = 0; i < 3; i ++ ) {

		v += a * noiseValue( p );
		p = p * 2.0 + vec3f( 100.0 );
		a *= 0.5;

	}

	return v;

}

fn rotate2d( rad: f32 ) -> mat2x2f {

	return mat2x2f( cos( rad ), sin( rad ), - sin( rad ), cos( rad ) );

}
