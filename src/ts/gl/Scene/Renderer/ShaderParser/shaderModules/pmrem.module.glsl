

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
