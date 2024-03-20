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