mat2 rotate(float rad) {
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));
}

void rotate( float rad, inout vec2 pos, inout vec2 normal ) {
	
	mat2 rot = rotate( rad );
	
	pos *= rot;
	normal *= rot;

}

mat3 makeRotationDir( vec3 direction, vec3 up ) {

	vec3 xaxis = normalize( cross( up, direction ) );
	vec3 yaxis = normalize( cross( direction, xaxis ) );

	return mat3(
		xaxis.x, yaxis.x, direction.x,
		xaxis.y, yaxis.y, direction.y,
		xaxis.z, yaxis.z, direction.z
	);

}