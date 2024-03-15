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

	vec2 tuv = fract( uv * vec2( 3.0, 2.0 ) );

	if ( face == 0.0 ) {

		vec2 yz = ( vec2( tuv.y, tuv.x ) - 0.5 ) * 2.0;
		
		dir = vec3( 1.0, yz );

	} else if( face == 1.0 ) {

		vec2 xz = ( vec2( - tuv.x, -tuv.y ) + 0.5 ) * 2.0;
		
		dir = vec3( xz.x, 1.0, xz.y );
		
	} else if( face == 2.0 ) {

		vec2 xy = ( vec2( - tuv.x + 0.5, tuv.y - 0.5 ) ) * 2.0;
		
		dir = vec3( xy, 1.0 );
		
	} else if( face == 3.0 ) {

		vec2 zy = ( vec2( - tuv.x + 0.5, tuv.y - 0.5 ) ) * 2.0;
		
		dir = vec3( -1.0, zy.y, zy.x );
		
	} else if( face == 4.0 ) {

		vec2 xz = ( vec2( - tuv.x + 0.5 , tuv.y - 0.5 ) ) * 2.0;
		
		dir = vec3( xz.x, -1.0, xz.y );
		
	} else if( face == 5.0 ) {

		vec2 xy = ( vec2( tuv.x, tuv.y ) - 0.5 ) * 2.0;
		
		dir = vec3( xy, -1.0 );
		
	}

	return normalize( dir );

}